#!/usr/bin/env ruby
# frozen_string_literal: true

require "csv"
require "optparse"
require "yaml"

ROOT = File.expand_path("..", __dir__)

SYSTEM_TAXONOMY = File.join(ROOT, "knowledge/data/system-taxonomy.yaml")
FACT_REGISTER = File.join(ROOT, "knowledge/data/fact-register.csv")
CONFIGURATION_REGISTER = File.join(ROOT, "knowledge/data/configuration-register.csv")
PARTS_REGISTER = File.join(ROOT, "knowledge/data/parts-register.csv")
SETTINGS_REGISTER = File.join(ROOT, "knowledge/data/settings-register.csv")
EVIDENCE_GAP_REGISTER = File.join(ROOT, "knowledge/data/evidence-gap-register.csv")
EVALUATION_REGISTER = File.join(ROOT, "knowledge/data/evaluation-register.csv")

options = {
  system: nil,
  format: "markdown"
}

OptionParser.new do |parser|
  parser.banner = "Usage: ruby tools/print-completion-audit.rb [options]"

  parser.on("--system SYSTEM", "Filter by canonical system or alias, e.g. engine or brakes") do |value|
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
  SYSTEM_TAXONOMY,
  FACT_REGISTER,
  CONFIGURATION_REGISTER,
  PARTS_REGISTER,
  SETTINGS_REGISTER,
  EVIDENCE_GAP_REGISTER,
  EVALUATION_REGISTER
].each do |path|
  unless File.file?(path)
    warn "ERROR: missing register: #{path}"
    exit 1
  end
end

taxonomy = YAML.safe_load(File.read(SYSTEM_TAXONOMY))
systems = taxonomy.fetch("canonical_systems")

alias_to_canonical = {}
systems.each do |entry|
  id = entry.fetch("id")
  alias_to_canonical[id] = id
  (entry["aliases"] || []).each { |alias_id| alias_to_canonical[alias_id] = id }
end

def canonical_system(system, aliases)
  aliases.fetch(system, system)
end

facts = CSV.read(FACT_REGISTER, headers: true)
configuration = CSV.read(CONFIGURATION_REGISTER, headers: true)
parts = CSV.read(PARTS_REGISTER, headers: true)
settings = CSV.read(SETTINGS_REGISTER, headers: true)
gaps = CSV.read(EVIDENCE_GAP_REGISTER, headers: true)
evaluations = CSV.read(EVALUATION_REGISTER, headers: true)

id_to_system = {}
facts.each { |row| id_to_system[row["fact_id"]] = canonical_system(row["system"], alias_to_canonical) }
configuration.each { |row| id_to_system[row["item_id"]] = canonical_system(row["system"], alias_to_canonical) }
parts.each { |row| id_to_system[row["part_id"]] = canonical_system(row["system"], alias_to_canonical) }
settings.each { |row| id_to_system[row["setting_id"]] = canonical_system(row["system"], alias_to_canonical) }
gaps.each { |row| id_to_system[row["gap_id"]] = canonical_system(row["system"], alias_to_canonical) }

evaluations_by_system = Hash.new { |hash, key| hash[key] = [] }
evaluations.each do |row|
  systems_for_case = row["required_register_ids"].to_s.split(";").map do |register_id|
    id_to_system[register_id.strip]
  end.compact.uniq
  systems_for_case.each { |system| evaluations_by_system[system] << row }
end

requested_system = options[:system]
requested_system = canonical_system(requested_system, alias_to_canonical) if requested_system
systems = systems.select { |entry| entry.fetch("id") == requested_system } if requested_system

if systems.empty?
  warn "ERROR: no completion-audit rows matched"
  exit 1
end

def mechanic_system?(entry)
  entry.fetch("page").start_with?("knowledge/systems/")
end

def verified_fact_count(rows)
  rows.count { |row| row["label"].to_s.start_with?("verified") }
end

def open_p1_count(rows)
  rows.count { |row| row["priority"] == "P1" && row["status"] == "open" }
end

def blocked_setting_count(rows)
  rows.count { |row| row["current_status"] == "blocked" }
end

def open_identity_count(rows)
  rows.count { |row| %w[unknown open].include?(row["as_found_status"]) || row["label"] == "open" }
end

def system_status(mechanic_system, system_facts, system_configuration, system_parts, system_settings, system_gaps)
  missing = []
  missing << "verified facts" if verified_fact_count(system_facts).zero?
  if mechanic_system
    missing << "configuration evidence gates" if system_configuration.empty?
    missing << "part records" if system_parts.empty?
    missing << "settings governance" if system_settings.empty?
  end
  missing << "open P1 evidence gaps" if open_p1_count(system_gaps).positive?
  missing << "blocked settings" if blocked_setting_count(system_settings).positive?
  missing << "open installed-hardware identity" if open_identity_count(system_configuration + system_parts).positive?

  if missing.empty?
    ["complete", "No missing completion gate was detected for this audit scope."]
  else
    ["not_complete", missing.uniq.join("; ")]
  end
end

rows = systems.map do |entry|
  system_id = entry.fetch("id")
  system_facts = facts.select { |row| canonical_system(row["system"], alias_to_canonical) == system_id }
  system_configuration = configuration.select { |row| canonical_system(row["system"], alias_to_canonical) == system_id }
  system_parts = parts.select { |row| canonical_system(row["system"], alias_to_canonical) == system_id }
  system_settings = settings.select { |row| canonical_system(row["system"], alias_to_canonical) == system_id }
  system_gaps = gaps.select { |row| canonical_system(row["system"], alias_to_canonical) == system_id }
  system_evaluations = evaluations_by_system[system_id]
  status, reason = system_status(
    mechanic_system?(entry),
    system_facts,
    system_configuration,
    system_parts,
    system_settings,
    system_gaps
  )

  {
    entry: entry,
    mechanic_system: mechanic_system?(entry),
    facts: system_facts.length,
    verified_facts: verified_fact_count(system_facts),
    configuration: system_configuration.length,
    open_configuration: open_identity_count(system_configuration),
    parts: system_parts.length,
    open_parts: open_identity_count(system_parts),
    settings: system_settings.length,
    blocked_settings: blocked_setting_count(system_settings),
    gaps: system_gaps.length,
    open_p1_gaps: open_p1_count(system_gaps),
    evaluations: system_evaluations.map { |row| row["case_id"] }.uniq.sort,
    status: status,
    reason: reason
  }
end

overall_status = rows.any? { |row| row[:status] != "complete" } ? "not_complete" : "complete"

if options[:format] == "markdown"
  puts "# Master-Mechanic Completion Audit"
  puts
  puts "Source: local taxonomy and CSV registers. This report checks whether the current repository evidence proves the full mechanics-assistant objective."
  puts
  puts "- Overall status: #{overall_status}"
  puts "- Systems audited: #{rows.length}"
  puts "- Mechanic systems audited: #{rows.count { |row| row[:mechanic_system] }}"
  puts "- Blocked settings visible: #{rows.sum { |row| row[:blocked_settings] }}"
  puts "- Open P1 evidence gaps visible: #{rows.sum { |row| row[:open_p1_gaps] }}"
  puts

  rows.each do |row|
    entry = row[:entry]
    puts "## #{entry['label']} (`#{entry['id']}`)"
    puts
    puts "- Status: #{row[:status]}"
    puts "- Reason: #{row[:reason]}"
    puts "- Scope: #{row[:mechanic_system] ? 'mechanic system' : 'context / control'}"
    puts "- Page: #{entry['page']}"
    puts "- Facts: #{row[:facts]} total; #{row[:verified_facts]} verified"
    puts "- Configuration gates: #{row[:configuration]} total; #{row[:open_configuration]} open or unknown"
    puts "- Parts records: #{row[:parts]} total; #{row[:open_parts]} open or unknown"
    puts "- Settings: #{row[:settings]} total; #{row[:blocked_settings]} blocked"
    puts "- Evidence gaps: #{row[:gaps]} total; #{row[:open_p1_gaps]} open P1"
    puts "- Evaluation cases: #{row[:evaluations].empty? ? '-' : row[:evaluations].join('; ')}"
    puts
  end
else
  puts "Master-Mechanic Completion Audit"
  puts "Overall status: #{overall_status}"
  puts "Systems audited: #{rows.length}"
  puts "Blocked settings visible: #{rows.sum { |row| row[:blocked_settings] }}"
  puts "Open P1 evidence gaps visible: #{rows.sum { |row| row[:open_p1_gaps] }}"
  puts
  rows.each do |row|
    entry = row[:entry]
    puts "#{entry['id']} - #{entry['label']}"
    puts "Status: #{row[:status]}"
    puts "Reason: #{row[:reason]}"
    puts "Facts: #{row[:facts]} total; #{row[:verified_facts]} verified"
    puts "Configuration: #{row[:configuration]} total; #{row[:open_configuration]} open or unknown"
    puts "Parts: #{row[:parts]} total; #{row[:open_parts]} open or unknown"
    puts "Settings: #{row[:settings]} total; #{row[:blocked_settings]} blocked"
    puts "Evidence gaps: #{row[:gaps]} total; #{row[:open_p1_gaps]} open P1"
    puts "Evaluation cases: #{row[:evaluations].empty? ? '-' : row[:evaluations].join('; ')}"
    puts
  end
end
