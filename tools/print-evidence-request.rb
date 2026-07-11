#!/usr/bin/env ruby
# frozen_string_literal: true

require "csv"
require "optparse"
require "yaml"

ROOT = File.expand_path("..", __dir__)
EVIDENCE_GAP_REGISTER = File.join(ROOT, "knowledge/data/evidence-gap-register.csv")
SYSTEM_TAXONOMY = File.join(ROOT, "knowledge/data/system-taxonomy.yaml")

TEMPLATE_BY_SYSTEM = {
  "identity" => "knowledge/00-vehicle-identity.md",
  "chassis_body" => "knowledge/templates/chassis-body-capture.md",
  "engine" => "knowledge/templates/engine-induction-capture.md",
  "induction" => "knowledge/templates/engine-induction-capture.md",
  "driveline" => "knowledge/templates/driveline-transaxle-capture.md",
  "suspension_steering" => "knowledge/templates/suspension-steering-capture.md",
  "brakes_wheels_tires" => "knowledge/templates/brakes-wheels-tires-capture.md",
  "electrical_instruments" => "knowledge/templates/electrical-instruments-capture.md",
  "fuel_oil_cooling" => "knowledge/templates/fuel-oil-cooling-capture.md",
  "safety" => "knowledge/templates/safety-event-readiness-capture.md",
  "general" => "knowledge/templates/fastener-torque-capture.md",
  "history" => "knowledge/templates/source-note-template.md",
  "sources" => "knowledge/templates/source-note-template.md"
}.freeze

def load_system_aliases(path)
  taxonomy = YAML.safe_load(File.read(path))
  (taxonomy["canonical_systems"] || []).each_with_object({}) do |entry, aliases|
    canonical = entry.fetch("id")
    aliases[canonical] = canonical
    (entry["aliases"] || []).each { |alias_id| aliases[alias_id] = canonical }
  end
end

def canonical_system(system)
  SYSTEM_ALIASES.fetch(system, system)
end

options = {
  gap_id: nil,
  system: nil,
  priority: nil,
  status: nil,
  format: "markdown"
}

OptionParser.new do |parser|
  parser.banner = "Usage: ruby tools/print-evidence-request.rb [options]"

  parser.on("--gap GAP_ID", "Print one evidence gap, e.g. G019") do |value|
    options[:gap_id] = value
  end

  parser.on("--system SYSTEM", "Filter by system, e.g. engine or driveline") do |value|
    options[:system] = value
  end

  parser.on("--priority PRIORITY", "Filter by priority, e.g. P1") do |value|
    options[:priority] = value
  end

  parser.on("--status STATUS", "Filter by status, e.g. open") do |value|
    options[:status] = value
  end

  parser.on("--format FORMAT", "Output format: markdown or text. Default: markdown") do |value|
    unless %w[markdown text].include?(value)
      warn "ERROR: unsupported format #{value.inspect}; use markdown or text"
      exit 1
    end
    options[:format] = value
  end
end.parse!

unless File.file?(EVIDENCE_GAP_REGISTER)
  warn "ERROR: missing evidence-gap register: #{EVIDENCE_GAP_REGISTER}"
  exit 1
end

unless File.file?(SYSTEM_TAXONOMY)
  warn "ERROR: missing system taxonomy: #{SYSTEM_TAXONOMY}"
  exit 1
end

SYSTEM_ALIASES = load_system_aliases(SYSTEM_TAXONOMY).freeze

rows = CSV.read(EVIDENCE_GAP_REGISTER, headers: true)
rows = rows.select { |row| row["gap_id"] == options[:gap_id] } if options[:gap_id]
rows = rows.select { |row| canonical_system(row["system"]) == canonical_system(options[:system]) } if options[:system]
rows = rows.select { |row| row["priority"] == options[:priority] } if options[:priority]
rows = rows.select { |row| row["status"] == options[:status] } if options[:status]

if rows.empty?
  warn "ERROR: no evidence gaps matched"
  exit 1
end

def value_or_dash(value)
  value.to_s.strip.empty? ? "-" : value
end

def list_items(value)
  text = value.to_s.strip
  return [] if text.empty?

  if text.include?(";")
    text.split(";").map(&:strip).reject(&:empty?)
  else
    [text]
  end
end

def capture_template_for(system)
  TEMPLATE_BY_SYSTEM.fetch(canonical_system(system), "-")
end

if options[:format] == "markdown"
  puts "# GT40 Evidence Request"
  puts
  puts "Source: `knowledge/data/evidence-gap-register.csv`."
  puts "Use with `knowledge/procedures/evidence-request-packet.md` and the relevant capture template."
  puts

  rows.group_by { |row| row["system"] }.sort.each do |system, system_rows|
    puts "## #{system}"
    puts
    system_rows.each do |row|
      puts "### #{row['gap_id']} - #{row['blocked_area']}"
      puts
      puts "- Priority: #{value_or_dash(row['priority'])}"
      puts "- Status: #{value_or_dash(row['status'])}"
      puts "- Request packet section: #{value_or_dash(row['request_packet_section'])}"
      puts "- Related register IDs: #{value_or_dash(row['related_register_ids'])}"
      puts "- Source IDs: #{value_or_dash(row['source_ids'])}"
      puts "- Capture template / worksheet: #{capture_template_for(row['system'])}"
      puts
      puts "**Why blocked**"
      puts
      puts value_or_dash(row["why_blocked"])
      puts
      puts "**Ask for / required evidence**"
      puts
      list_items(row["required_evidence"]).each { |item| puts "- #{item}" }
      puts
      puts "**Safe next action**"
      puts
      puts value_or_dash(row["next_action"])
      puts
    end
  end
else
  rows.each do |row|
    puts "#{row['gap_id']} - #{row['blocked_area']}"
    puts "System: #{row['system']}"
    puts "Priority: #{value_or_dash(row['priority'])}"
    puts "Status: #{value_or_dash(row['status'])}"
    puts "Request packet section: #{value_or_dash(row['request_packet_section'])}"
    puts "Related register IDs: #{value_or_dash(row['related_register_ids'])}"
    puts "Source IDs: #{value_or_dash(row['source_ids'])}"
    puts "Capture template / worksheet: #{capture_template_for(row['system'])}"
    puts "Why blocked: #{value_or_dash(row['why_blocked'])}"
    puts "Required evidence: #{value_or_dash(row['required_evidence'])}"
    puts "Safe next action: #{value_or_dash(row['next_action'])}"
    puts
  end
end
