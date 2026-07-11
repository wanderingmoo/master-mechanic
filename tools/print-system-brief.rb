#!/usr/bin/env ruby
# frozen_string_literal: true

require "csv"
require "optparse"
require "yaml"

ROOT = File.expand_path("..", __dir__)
SOURCE_REGISTER = File.join(ROOT, "sources/source-register.csv")
FACT_REGISTER = File.join(ROOT, "knowledge/data/fact-register.csv")
CONFIGURATION_REGISTER = File.join(ROOT, "knowledge/data/configuration-register.csv")
PARTS_REGISTER = File.join(ROOT, "knowledge/data/parts-register.csv")
SETTINGS_REGISTER = File.join(ROOT, "knowledge/data/settings-register.csv")
EVIDENCE_GAP_REGISTER = File.join(ROOT, "knowledge/data/evidence-gap-register.csv")
EVALUATION_REGISTER = File.join(ROOT, "knowledge/data/evaluation-register.csv")
SYSTEM_TAXONOMY = File.join(ROOT, "knowledge/data/system-taxonomy.yaml")

def load_system_aliases(path)
  taxonomy = YAML.safe_load(File.read(path))
  (taxonomy["canonical_systems"] || []).each_with_object({}) do |entry, aliases|
    canonical = entry.fetch("id")
    aliases[canonical] = canonical
    (entry["aliases"] || []).each { |alias_id| aliases[alias_id] = canonical }
  end
end

SYSTEM_ALIASES = load_system_aliases(SYSTEM_TAXONOMY).freeze

def canonical_system(system)
  SYSTEM_ALIASES.fetch(system, system)
end

options = {
  system: nil,
  format: "markdown"
}

OptionParser.new do |parser|
  parser.banner = "Usage: ruby tools/print-system-brief.rb --system SYSTEM [options]"

  parser.on("--system SYSTEM", "Required register system, e.g. engine, driveline, or general") do |value|
    options[:system] = value
  end

  parser.on("--format FORMAT", "Output format: markdown or text. Default: markdown") do |value|
    unless %w[markdown text].include?(value)
      warn "ERROR: unsupported format #{value.inspect}; use markdown or text"
      exit 1
    end
    options[:format] = value
  end
end.parse!

if options[:system].to_s.strip.empty?
  warn "ERROR: --system is required"
  exit 1
end

requested_system = options[:system]
options[:system] = canonical_system(options[:system])

[
  SOURCE_REGISTER,
  FACT_REGISTER,
  CONFIGURATION_REGISTER,
  PARTS_REGISTER,
  SETTINGS_REGISTER,
  EVIDENCE_GAP_REGISTER,
  EVALUATION_REGISTER,
  SYSTEM_TAXONOMY
].each do |path|
  unless File.file?(path)
    warn "ERROR: missing register: #{path}"
    exit 1
  end
end

sources = CSV.read(SOURCE_REGISTER, headers: true)
facts = CSV.read(FACT_REGISTER, headers: true).select { |row| canonical_system(row["system"]) == options[:system] }
configuration = CSV.read(CONFIGURATION_REGISTER, headers: true).select { |row| canonical_system(row["system"]) == options[:system] }
parts = CSV.read(PARTS_REGISTER, headers: true).select { |row| canonical_system(row["system"]) == options[:system] }
settings = CSV.read(SETTINGS_REGISTER, headers: true).select { |row| canonical_system(row["system"]) == options[:system] }
gaps = CSV.read(EVIDENCE_GAP_REGISTER, headers: true).select { |row| canonical_system(row["system"]) == options[:system] }
evaluations = CSV.read(EVALUATION_REGISTER, headers: true)

if [facts, configuration, parts, settings, gaps].all?(&:empty?)
  warn "ERROR: no system brief rows matched #{options[:system].inspect}"
  exit 1
end

source_titles = sources.each_with_object({}) { |row, index| index[row["source_id"]] = row["title"] }

ids_to_system_rows = {}
facts.each { |row| ids_to_system_rows[row["fact_id"]] = true }
configuration.each { |row| ids_to_system_rows[row["item_id"]] = true }
parts.each { |row| ids_to_system_rows[row["part_id"]] = true }
settings.each { |row| ids_to_system_rows[row["setting_id"]] = true }
gaps.each { |row| ids_to_system_rows[row["gap_id"]] = true }

evaluation_rows = evaluations.select do |row|
  row["required_register_ids"].to_s.split(";").map(&:strip).any? { |id| ids_to_system_rows[id] }
end

def value_or_dash(value)
  value.to_s.strip.empty? ? "-" : value
end

def split_ids(value)
  value.to_s.split(";").map(&:strip).reject(&:empty?)
end

def source_summary(source_ids, source_titles)
  ids = split_ids(source_ids)
  return "-" if ids.empty?

  ids.map { |id| source_titles[id] ? "#{id} #{source_titles[id]}" : id }.join("; ")
end

def blocked?(settings, gaps)
  settings.any? { |row| row["current_status"] == "blocked" } ||
    gaps.any? { |row| row["priority"] == "P1" && row["status"] == "open" }
end

if options[:format] == "markdown"
  puts "# GT40 System Brief - #{options[:system]}"
  puts
  puts "Source: local CSV registers. Use this as an assistant-routing brief, not as a service specification."
  puts "Requested system: `#{requested_system}`; canonical system: `#{options[:system]}`." if requested_system != options[:system]
  puts
  if blocked?(settings, gaps)
    puts "**Safe interpretation:** Settings remain evidence-gated; provide inspection, identification, and source-acquisition guidance before values."
  else
    puts "**Safe interpretation:** No blocked setting or open P1 gap is visible for this system; still verify source applicability before mechanic advice."
  end
  puts

  unless facts.empty?
    puts "## Facts"
    puts
    facts.each do |row|
      puts "- #{row['fact_id']} [#{row['label']}, #{row['confidence']}]: #{row['fact']} Sources: #{source_summary(row['source_ids'], source_titles)}"
      puts "  - Applicability: #{value_or_dash(row['applicability'])}"
      puts "  - Notes: #{value_or_dash(row['notes'])}"
    end
    puts
  end

  unless configuration.empty?
    puts "## Configuration Items"
    puts
    configuration.each do |row|
      puts "- #{row['item_id']} - #{row['component']}: #{row['as_found_status']} / #{row['label']}"
      puts "  - Expected or lead configuration: #{value_or_dash(row['expected_or_lead_configuration'])}"
      puts "  - Required evidence: #{value_or_dash(row['required_evidence'])}"
      puts "  - Next action: #{value_or_dash(row['next_action'])}"
    end
    puts
  end

  unless parts.empty?
    puts "## Parts and Assemblies"
    puts
    parts.each do |row|
      puts "- #{row['part_id']} - #{row['assembly']} / #{row['part_or_area']}: #{row['as_found_status']} / #{row['label']}"
      puts "  - Critical identifiers: #{value_or_dash(row['critical_identifiers'])}"
      puts "  - Next action: #{value_or_dash(row['next_action'])}"
    end
    puts
  end

  unless settings.empty?
    puts "## Settings Gates"
    puts
    settings.each do |row|
      puts "- #{row['setting_id']} - #{row['setting']}: #{row['current_status']}"
      puts "  - Blocking evidence: #{value_or_dash(row['blocking_evidence'])}"
      puts "  - Safe next action: #{value_or_dash(row['next_action'])}"
    end
    puts
  end

  unless gaps.empty?
    puts "## Evidence Gaps"
    puts
    gaps.each do |row|
      puts "- #{row['gap_id']} - #{row['blocked_area']} (#{row['priority']}, #{row['status']})"
      puts "  - Why blocked: #{value_or_dash(row['why_blocked'])}"
      puts "  - Required evidence: #{value_or_dash(row['required_evidence'])}"
      puts "  - Next action: #{value_or_dash(row['next_action'])}"
    end
    puts
  end

  unless evaluation_rows.empty?
    puts "## Assistant Evaluation Cases"
    puts
    evaluation_rows.each do |row|
      puts "- #{row['case_id']} - #{row['title']}: #{row['prompt']}"
      puts "  - Must block settings: #{value_or_dash(row['must_block_settings'])}"
      puts "  - Forbidden behavior: #{value_or_dash(row['forbidden_behavior'])}"
    end
  end
else
  puts "GT40 System Brief - #{options[:system]}"
  puts "Requested system: #{requested_system}; canonical system: #{options[:system]}" if requested_system != options[:system]
  puts "Safe interpretation: #{blocked?(settings, gaps) ? 'settings remain evidence-gated' : 'verify applicability before mechanic advice'}"
  puts
  facts.each { |row| puts "FACT #{row['fact_id']}: #{row['fact']}" }
  configuration.each { |row| puts "CONFIG #{row['item_id']}: #{row['component']} - #{row['next_action']}" }
  parts.each { |row| puts "PART #{row['part_id']}: #{row['assembly']} / #{row['part_or_area']} - #{row['next_action']}" }
  settings.each { |row| puts "SETTING #{row['setting_id']}: #{row['setting']} - #{row['current_status']} - #{row['next_action']}" }
  gaps.each { |row| puts "GAP #{row['gap_id']}: #{row['blocked_area']} - #{row['priority']} #{row['status']} - #{row['next_action']}" }
  evaluation_rows.each { |row| puts "EVAL #{row['case_id']}: #{row['title']} - #{row['forbidden_behavior']}" }
end
