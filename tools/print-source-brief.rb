#!/usr/bin/env ruby
# frozen_string_literal: true

require "csv"
require "optparse"
require "yaml"

ROOT = File.expand_path("..", __dir__)
SOURCE_REGISTER = File.join(ROOT, "sources/source-register.csv")
FACT_REGISTER = File.join(ROOT, "knowledge/data/fact-register.csv")
MANIFEST = File.join(ROOT, "knowledge/manifest.yaml")

options = {
  source_id: nil,
  tier: nil,
  status: nil,
  query: nil,
  format: "markdown"
}

OptionParser.new do |parser|
  parser.banner = "Usage: ruby tools/print-source-brief.rb [options]"

  parser.on("--source SOURCE_ID", "Print one source, e.g. S015") do |value|
    options[:source_id] = value
  end

  parser.on("--tier TIER", "Filter by source tier, e.g. 1 or 4") do |value|
    options[:tier] = value
  end

  parser.on("--status STATUS", "Filter by source status, e.g. verified or lead_only") do |value|
    options[:status] = value
  end

  parser.on("--query TEXT", "Case-insensitive search over title, type, URL/location, notes, and extracted facts") do |value|
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

[SOURCE_REGISTER, FACT_REGISTER, MANIFEST].each do |path|
  unless File.file?(path)
    warn "ERROR: missing file: #{path}"
    exit 1
  end
end

manifest = YAML.safe_load(File.read(MANIFEST))

notes_by_source = (manifest["source_notes"] || []).each_with_object({}) do |entry, index|
  index[entry.fetch("id")] = entry.fetch("path")
end

archives_by_source = (manifest["source_archives"] || []).each_with_object(Hash.new { |hash, key| hash[key] = [] }) do |entry, index|
  index[entry.fetch("id")] << entry.fetch("path")
end

facts_by_source = Hash.new { |hash, key| hash[key] = [] }
CSV.foreach(FACT_REGISTER, headers: true) do |row|
  row["source_ids"].to_s.split(";").map(&:strip).reject(&:empty?).each do |source_id|
    facts_by_source[source_id] << row
  end
end

rows = CSV.read(SOURCE_REGISTER, headers: true)
rows = rows.select { |row| row["source_id"] == options[:source_id] } if options[:source_id]
rows = rows.select { |row| row["tier"].to_s == options[:tier].to_s } if options[:tier]
rows = rows.select { |row| row["status"] == options[:status] } if options[:status]

if options[:query]
  rows = rows.select do |row|
    source_facts = facts_by_source[row["source_id"]].map { |fact| fact["fact"] }.join("\n")
    [
      row["source_id"],
      row["title"],
      row["source_type"],
      row["url_or_location"],
      row["notes"],
      source_facts
    ].join("\n").downcase.include?(options[:query])
  end
end

if rows.empty?
  warn "ERROR: no sources matched"
  exit 1
end

def value_or_dash(value)
  value.to_s.strip.empty? ? "-" : value
end

def facts_summary(facts)
  return "-" if facts.empty?

  facts.map { |fact| "#{fact['fact_id']} [#{fact['system']}, #{fact['label']}]" }.join("; ")
end

if options[:format] == "markdown"
  puts "# GT40 Source Brief"
  puts
  puts "Source: `sources/source-register.csv`, `knowledge/manifest.yaml`, and `knowledge/data/fact-register.csv`."
  puts

  rows.group_by { |row| row["status"] }.sort.each do |status, status_rows|
    puts "## #{status}"
    puts
    status_rows.each do |row|
      source_id = row["source_id"]
      facts = facts_by_source[source_id]
      archives = archives_by_source[source_id]

      puts "### #{source_id} - #{row['title']}"
      puts
      puts "- Type: #{value_or_dash(row['source_type'])}"
      puts "- Tier: #{value_or_dash(row['tier'])}"
      puts "- URL / location: #{value_or_dash(row['url_or_location'])}"
      puts "- Local source note: #{value_or_dash(notes_by_source[source_id])}"
      puts "- Local archive: #{archives.empty? ? '-' : archives.join('; ')}"
      puts "- Extracted facts: #{facts.empty? ? '0' : facts.length}"
      puts "- Fact IDs: #{facts_summary(facts)}"
      puts "- Notes: #{value_or_dash(row['notes'])}"
      puts
    end
  end
else
  rows.each do |row|
    source_id = row["source_id"]
    facts = facts_by_source[source_id]
    archives = archives_by_source[source_id]

    puts "#{source_id} - #{row['title']}"
    puts "Status: #{value_or_dash(row['status'])}"
    puts "Type: #{value_or_dash(row['source_type'])}"
    puts "Tier: #{value_or_dash(row['tier'])}"
    puts "URL / location: #{value_or_dash(row['url_or_location'])}"
    puts "Local source note: #{value_or_dash(notes_by_source[source_id])}"
    puts "Local archive: #{archives.empty? ? '-' : archives.join('; ')}"
    puts "Extracted facts: #{facts.empty? ? '0' : facts.length}"
    puts "Fact IDs: #{facts_summary(facts)}"
    puts "Notes: #{value_or_dash(row['notes'])}"
    puts
  end
end
