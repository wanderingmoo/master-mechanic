#!/usr/bin/env ruby
# frozen_string_literal: true

require "csv"
require "optparse"
require "yaml"

ROOT = File.expand_path("..", __dir__)
CONFIGURATION_REGISTER = File.join(ROOT, "knowledge/data/configuration-register.csv")
PARTS_REGISTER = File.join(ROOT, "knowledge/data/parts-register.csv")
EVIDENCE_GAP_REGISTER = File.join(ROOT, "knowledge/data/evidence-gap-register.csv")
SOURCE_REGISTER = File.join(ROOT, "sources/source-register.csv")
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
  status: nil,
  item_id: nil,
  query: nil,
  format: "markdown"
}

OptionParser.new do |parser|
  parser.banner = "Usage: ruby tools/print-parts-config.rb [options]"

  parser.on("--system SYSTEM", "Filter by system, e.g. engine, brakes, or suspension") do |value|
    options[:system] = value
  end

  parser.on("--status STATUS", "Filter by as-found status, e.g. unknown") do |value|
    options[:status] = value
  end

  parser.on("--item ID", "Print one configuration or part item, e.g. C004 or P009") do |value|
    options[:item_id] = value
  end

  parser.on("--query TEXT", "Case-insensitive search over item descriptions, evidence, identifiers, and next actions") do |value|
    options[:query] = value.downcase
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
  CONFIGURATION_REGISTER,
  PARTS_REGISTER,
  EVIDENCE_GAP_REGISTER,
  SOURCE_REGISTER,
  SYSTEM_TAXONOMY
].each do |path|
  unless File.file?(path)
    warn "ERROR: missing register: #{path}"
    exit 1
  end
end

sources = CSV.read(SOURCE_REGISTER, headers: true).each_with_object({}) do |row, index|
  index[row["source_id"]] = row
end

config_rows = CSV.read(CONFIGURATION_REGISTER, headers: true).map do |row|
  {
    type: "configuration",
    id: row["item_id"],
    system: canonical_system(row["system"]),
    original_system: row["system"],
    title: row["component"],
    status: row["as_found_status"],
    label: row["label"],
    confidence: row["confidence"],
    source_ids: row["source_ids"],
    summary: row["expected_or_lead_configuration"],
    required_evidence: row["required_evidence"],
    identifiers: nil,
    next_action: row["next_action"]
  }
end

part_rows = CSV.read(PARTS_REGISTER, headers: true).map do |row|
  {
    type: "part",
    id: row["part_id"],
    system: canonical_system(row["system"]),
    original_system: row["system"],
    title: "#{row['assembly']} / #{row['part_or_area']}",
    status: row["as_found_status"],
    label: row["label"],
    confidence: row["confidence"],
    source_ids: row["source_ids"],
    summary: row["known_or_expected"],
    required_evidence: row["required_evidence"],
    identifiers: row["critical_identifiers"],
    next_action: row["next_action"]
  }
end

rows = config_rows + part_rows
requested_system = options[:system]
rows = rows.select { |row| row[:system] == canonical_system(options[:system]) } if options[:system]
rows = rows.select { |row| row[:status] == options[:status] } if options[:status]
rows = rows.select { |row| row[:id] == options[:item_id] } if options[:item_id]
if options[:query]
  rows = rows.select do |row|
    [
      row[:title],
      row[:summary],
      row[:required_evidence],
      row[:identifiers],
      row[:next_action]
    ].join("\n").downcase.include?(options[:query])
  end
end

if rows.empty?
  warn "ERROR: no configuration or part rows matched"
  exit 1
end

gaps_by_register_id = Hash.new { |hash, key| hash[key] = [] }
CSV.foreach(EVIDENCE_GAP_REGISTER, headers: true) do |gap|
  gap["related_register_ids"].to_s.split(";").map(&:strip).reject(&:empty?).each do |register_id|
    gaps_by_register_id[register_id] << gap
  end
end

def value_or_dash(value)
  value.to_s.strip.empty? ? "-" : value
end

def split_ids(value)
  value.to_s.split(";").map(&:strip).reject(&:empty?)
end

def source_summary(source_ids, sources)
  ids = split_ids(source_ids)
  return "-" if ids.empty?

  ids.map do |source_id|
    source = sources[source_id]
    source ? "#{source_id} #{source['title']}" : source_id
  end.join("; ")
end

def gap_summary(gaps)
  return "-" if gaps.empty?

  gaps.map { |gap| "#{gap['gap_id']} #{gap['blocked_area']} (#{gap['priority']}, #{gap['status']})" }.join("; ")
end

if options[:format] == "markdown"
  puts "# GT40 Parts and Configuration Gates"
  puts
  puts "Source: `knowledge/data/configuration-register.csv`, `knowledge/data/parts-register.csv`, and `knowledge/data/evidence-gap-register.csv`."
  puts "Use this as an identification and evidence-capture guide before ordering parts, machining, applying settings, or treating a configuration as installed."
  puts "Requested system: `#{requested_system}`; canonical system: `#{canonical_system(requested_system)}`." if requested_system && requested_system != canonical_system(requested_system)
  puts

  rows.group_by { |row| row[:system] }.sort.each do |system, system_rows|
    puts "## #{system}"
    puts
    system_rows.group_by { |row| row[:type] }.sort.each do |type, type_rows|
      puts "### #{type == 'part' ? 'Parts and assemblies' : 'Configuration items'}"
      puts
      type_rows.each do |row|
        gaps = gaps_by_register_id[row[:id]]
        puts "#### #{row[:id]} - #{row[:title]}"
        puts
        puts "- Status: #{value_or_dash(row[:status])}"
        puts "- Label: #{value_or_dash(row[:label])}"
        puts "- Confidence: #{value_or_dash(row[:confidence])}"
        puts "- Sources: #{source_summary(row[:source_ids], sources)}"
        puts "- Known or expected configuration: #{value_or_dash(row[:summary])}"
        puts "- Critical identifiers: #{value_or_dash(row[:identifiers])}"
        puts "- Required evidence: #{value_or_dash(row[:required_evidence])}"
        puts "- Related gaps: #{gap_summary(gaps)}"
        puts "- Next action: #{value_or_dash(row[:next_action])}"
        puts
      end
    end
  end
else
  rows.each do |row|
    gaps = gaps_by_register_id[row[:id]]
    puts "#{row[:id]} - #{row[:title]}"
    puts "Type: #{row[:type]}"
    puts "System: #{row[:system]}"
    puts "Status: #{value_or_dash(row[:status])}"
    puts "Label: #{value_or_dash(row[:label])}"
    puts "Confidence: #{value_or_dash(row[:confidence])}"
    puts "Sources: #{source_summary(row[:source_ids], sources)}"
    puts "Known or expected configuration: #{value_or_dash(row[:summary])}"
    puts "Critical identifiers: #{value_or_dash(row[:identifiers])}"
    puts "Required evidence: #{value_or_dash(row[:required_evidence])}"
    puts "Related gaps: #{gap_summary(gaps)}"
    puts "Next action: #{value_or_dash(row[:next_action])}"
    puts
  end
end
