#!/usr/bin/env ruby
# frozen_string_literal: true

require "csv"
require "optparse"

ROOT = File.expand_path("..", __dir__)
SETTINGS_REGISTER = File.join(ROOT, "knowledge/data/settings-register.csv")
EVIDENCE_GAP_REGISTER = File.join(ROOT, "knowledge/data/evidence-gap-register.csv")

options = {
  system: nil,
  status: nil,
  setting_id: nil,
  format: "markdown"
}

OptionParser.new do |parser|
  parser.banner = "Usage: ruby tools/print-settings-gates.rb [options]"

  parser.on("--system SYSTEM", "Filter by system, e.g. engine or driveline") do |value|
    options[:system] = value
  end

  parser.on("--status STATUS", "Filter by status, e.g. blocked") do |value|
    options[:status] = value
  end

  parser.on("--setting SETTING_ID", "Print one setting, e.g. ST033") do |value|
    options[:setting_id] = value
  end

  parser.on("--format FORMAT", "Output format: markdown or text. Default: markdown") do |value|
    unless %w[markdown text].include?(value)
      warn "ERROR: unsupported format #{value.inspect}; use markdown or text"
      exit 1
    end
    options[:format] = value
  end
end.parse!

unless File.file?(SETTINGS_REGISTER)
  warn "ERROR: missing settings register: #{SETTINGS_REGISTER}"
  exit 1
end

unless File.file?(EVIDENCE_GAP_REGISTER)
  warn "ERROR: missing evidence-gap register: #{EVIDENCE_GAP_REGISTER}"
  exit 1
end

gaps_by_setting = Hash.new { |hash, key| hash[key] = [] }
CSV.foreach(EVIDENCE_GAP_REGISTER, headers: true) do |row|
  row["related_register_ids"].to_s.split(";").map(&:strip).reject(&:empty?).each do |register_id|
    gaps_by_setting[register_id] << row
  end
end

rows = CSV.read(SETTINGS_REGISTER, headers: true)
rows = rows.select { |row| row["system"] == options[:system] } if options[:system]
rows = rows.select { |row| row["current_status"] == options[:status] } if options[:status]
rows = rows.select { |row| row["setting_id"] == options[:setting_id] } if options[:setting_id]

if rows.empty?
  warn "ERROR: no settings matched"
  exit 1
end

def value_or_dash(value)
  value.to_s.strip.empty? ? "-" : value
end

def gap_summary(gaps)
  return "-" if gaps.empty?

  gaps.map { |gap| "#{gap['gap_id']} #{gap['blocked_area']}" }.join("; ")
end

if options[:format] == "markdown"
  puts "# GT40 Settings Gates"
  puts
  puts "Source: `knowledge/data/settings-register.csv` plus `knowledge/data/evidence-gap-register.csv`."
  puts "A setting is not actionable until both the installed component and applicable source evidence are verified."
  puts

  rows.group_by { |row| row["system"] }.sort.each do |system, system_rows|
    puts "## #{system}"
    puts
    system_rows.each do |row|
      gaps = gaps_by_setting[row["setting_id"]]
      puts "### #{row['setting_id']} - #{row['setting']}"
      puts
      puts "- Status: #{value_or_dash(row['current_status'])}"
      puts "- Applicability: #{value_or_dash(row['applicability'])}"
      puts "- Source IDs: #{value_or_dash(row['source_ids'])}"
      puts "- Blocking evidence: #{value_or_dash(row['blocking_evidence'])}"
      puts "- Evidence gaps: #{gap_summary(gaps)}"
      puts "- Safe next action: #{value_or_dash(row['next_action'])}"
      puts
    end
  end
else
  rows.each do |row|
    gaps = gaps_by_setting[row["setting_id"]]
    puts "#{row['setting_id']} - #{row['setting']}"
    puts "System: #{row['system']}"
    puts "Status: #{value_or_dash(row['current_status'])}"
    puts "Applicability: #{value_or_dash(row['applicability'])}"
    puts "Source IDs: #{value_or_dash(row['source_ids'])}"
    puts "Blocking evidence: #{value_or_dash(row['blocking_evidence'])}"
    puts "Evidence gaps: #{gap_summary(gaps)}"
    puts "Safe next action: #{value_or_dash(row['next_action'])}"
    puts
  end
end
