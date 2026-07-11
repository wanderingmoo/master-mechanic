#!/usr/bin/env ruby
# frozen_string_literal: true

require "csv"
require "optparse"
require "set"

ROOT = File.expand_path("..", __dir__)
FACT_REGISTER = File.join(ROOT, "knowledge/data/fact-register.csv")
SETTINGS_REGISTER = File.join(ROOT, "knowledge/data/settings-register.csv")
EVIDENCE_GAP_REGISTER = File.join(ROOT, "knowledge/data/evidence-gap-register.csv")
PARTS_REGISTER = File.join(ROOT, "knowledge/data/parts-register.csv")
CONFIGURATION_REGISTER = File.join(ROOT, "knowledge/data/configuration-register.csv")
EVALUATION_REGISTER = File.join(ROOT, "knowledge/data/evaluation-register.csv")

SYSTEM_ALIASES = {
  "brakes" => "brakes_wheels_tires",
  "wheels_tires" => "brakes_wheels_tires",
  "electrical" => "electrical_instruments",
  "suspension" => "suspension_steering"
}.freeze

def canonical_system(system)
  SYSTEM_ALIASES.fetch(system, system)
end

options = {
  system: nil,
  format: "markdown"
}

OptionParser.new do |parser|
  parser.banner = "Usage: ruby tools/print-coverage-audit.rb [options]"

  parser.on("--system SYSTEM", "Filter by register system, e.g. engine or brakes_wheels_tires") do |value|
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

[
  FACT_REGISTER,
  SETTINGS_REGISTER,
  EVIDENCE_GAP_REGISTER,
  PARTS_REGISTER,
  CONFIGURATION_REGISTER,
  EVALUATION_REGISTER
].each do |path|
  unless File.file?(path)
    warn "ERROR: missing register: #{path}"
    exit 1
  end
end

facts = CSV.read(FACT_REGISTER, headers: true)
settings = CSV.read(SETTINGS_REGISTER, headers: true)
gaps = CSV.read(EVIDENCE_GAP_REGISTER, headers: true)
parts = CSV.read(PARTS_REGISTER, headers: true)
configuration = CSV.read(CONFIGURATION_REGISTER, headers: true)
evaluations = CSV.read(EVALUATION_REGISTER, headers: true)

id_to_system = {}
facts.each { |row| id_to_system[row["fact_id"]] = canonical_system(row["system"]) }
settings.each { |row| id_to_system[row["setting_id"]] = canonical_system(row["system"]) }
gaps.each { |row| id_to_system[row["gap_id"]] = canonical_system(row["system"]) }
parts.each { |row| id_to_system[row["part_id"]] = canonical_system(row["system"]) }
configuration.each { |row| id_to_system[row["item_id"]] = canonical_system(row["system"]) }

evaluation_cases_by_system = Hash.new { |hash, key| hash[key] = Set.new }
evaluations.each do |row|
  row["required_register_ids"].to_s.split(";").map(&:strip).reject(&:empty?).each do |register_id|
    system = id_to_system[register_id]
    evaluation_cases_by_system[system] << row["case_id"] if system
  end
end

systems = (facts.map { |row| canonical_system(row["system"]) } +
           settings.map { |row| canonical_system(row["system"]) } +
           gaps.map { |row| canonical_system(row["system"]) } +
           evaluation_cases_by_system.keys).compact.uniq.sort
options[:system] = canonical_system(options[:system]) if options[:system]
systems = systems.select { |system| system == options[:system] } if options[:system]

if systems.empty?
  warn "ERROR: no coverage rows matched"
  exit 1
end

def count_by(rows, column)
  rows.each_with_object(Hash.new(0)) { |row, counts| counts[row[column].to_s.empty? ? "-" : row[column]] += 1 }
end

def join_counts(counts)
  return "-" if counts.empty?

  counts.sort.map { |key, value| "#{key}: #{value}" }.join("; ")
end

def ids(rows, column)
  rows.map { |row| row[column] }.compact.reject(&:empty?).sort
end

def safe_state(system_settings, system_gaps)
  blocked_settings = system_settings.count { |row| row["current_status"] == "blocked" }
  open_p1_gaps = system_gaps.count { |row| row["priority"] == "P1" && row["status"] == "open" }

  if blocked_settings.positive? || open_p1_gaps.positive?
    "Settings remain evidence-gated; give inspection, identification, and source-acquisition guidance before values."
  else
    "No open P1 gap or blocked setting is visible in the registers; verify applicability before treating the system as mechanic-ready."
  end
end

if options[:format] == "markdown"
  puts "# GT40 Coverage Audit"
  puts
  puts "Source: local CSV registers in `knowledge/data/`."
  puts "Use this as a planning and assistant-routing aid, not as a service specification."
  puts
  puts "- Fact rows: #{facts.length}"
  puts "- Settings rows: #{settings.length}"
  puts "- Evidence gaps: #{gaps.length}"
  puts "- Evaluation cases: #{evaluations.length}"
  puts

  systems.each do |system|
    system_facts = facts.select { |row| canonical_system(row["system"]) == system }
    system_settings = settings.select { |row| canonical_system(row["system"]) == system }
    system_gaps = gaps.select { |row| canonical_system(row["system"]) == system }
    system_cases = evaluation_cases_by_system[system].to_a.sort
    source_systems = (system_facts + system_settings + system_gaps).map { |row| row["system"] }.uniq.sort

    puts "## #{system}"
    puts
    puts "- Facts: #{system_facts.length} (labels: #{join_counts(count_by(system_facts, 'label'))})"
    puts "- Settings: #{system_settings.length} (states: #{join_counts(count_by(system_settings, 'current_status'))})"
    puts "- Evidence gaps: #{system_gaps.length} (priorities: #{join_counts(count_by(system_gaps, 'priority'))}; statuses: #{join_counts(count_by(system_gaps, 'status'))})"
    puts "- P1 open gaps: #{ids(system_gaps.select { |row| row['priority'] == 'P1' && row['status'] == 'open' }, 'gap_id').join('; ').then { |value| value.empty? ? '-' : value }}"
    puts "- Evaluation cases: #{system_cases.empty? ? '-' : system_cases.join('; ')}"
    puts "- Source labels included: #{source_systems.join('; ')}" if source_systems.length > 1
    puts "- Safe interpretation: #{safe_state(system_settings, system_gaps)}"
    puts
  end
else
  systems.each do |system|
    system_facts = facts.select { |row| canonical_system(row["system"]) == system }
    system_settings = settings.select { |row| canonical_system(row["system"]) == system }
    system_gaps = gaps.select { |row| canonical_system(row["system"]) == system }
    system_cases = evaluation_cases_by_system[system].to_a.sort
    source_systems = (system_facts + system_settings + system_gaps).map { |row| row["system"] }.uniq.sort

    puts system
    puts "Facts: #{system_facts.length} (labels: #{join_counts(count_by(system_facts, 'label'))})"
    puts "Settings: #{system_settings.length} (states: #{join_counts(count_by(system_settings, 'current_status'))})"
    puts "Evidence gaps: #{system_gaps.length} (priorities: #{join_counts(count_by(system_gaps, 'priority'))}; statuses: #{join_counts(count_by(system_gaps, 'status'))})"
    p1_open_gap_ids = ids(system_gaps.select { |row| row["priority"] == "P1" && row["status"] == "open" }, "gap_id")
    puts "P1 open gaps: #{p1_open_gap_ids.empty? ? '-' : p1_open_gap_ids.join('; ')}"
    puts "Evaluation cases: #{system_cases.empty? ? '-' : system_cases.join('; ')}"
    puts "Source labels included: #{source_systems.join('; ')}" if source_systems.length > 1
    puts "Safe interpretation: #{safe_state(system_settings, system_gaps)}"
    puts
  end
end
