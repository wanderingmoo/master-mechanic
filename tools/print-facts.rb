#!/usr/bin/env ruby
# frozen_string_literal: true

require "csv"
require "optparse"

ROOT = File.expand_path("..", __dir__)
FACT_REGISTER = File.join(ROOT, "knowledge/data/fact-register.csv")
SOURCE_REGISTER = File.join(ROOT, "sources/source-register.csv")

options = {
  system: nil,
  source_id: nil,
  label: nil,
  query: nil,
  format: "markdown"
}

OptionParser.new do |parser|
  parser.banner = "Usage: ruby tools/print-facts.rb [options]"

  parser.on("--system SYSTEM", "Filter by system, e.g. engine or driveline") do |value|
    options[:system] = value
  end

  parser.on("--source SOURCE_ID", "Filter by source ID, e.g. S015") do |value|
    options[:source_id] = value
  end

  parser.on("--label LABEL", "Filter by label, e.g. verified or lead_only") do |value|
    options[:label] = value
  end

  parser.on("--query TEXT", "Case-insensitive search over fact, applicability, and notes") do |value|
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

unless File.file?(FACT_REGISTER)
  warn "ERROR: missing fact register: #{FACT_REGISTER}"
  exit 1
end

unless File.file?(SOURCE_REGISTER)
  warn "ERROR: missing source register: #{SOURCE_REGISTER}"
  exit 1
end

sources = {}
CSV.foreach(SOURCE_REGISTER, headers: true) do |row|
  sources[row["source_id"]] = row
end

rows = CSV.read(FACT_REGISTER, headers: true)
rows = rows.select { |row| row["system"] == options[:system] } if options[:system]
rows = rows.select { |row| row["label"] == options[:label] } if options[:label]
if options[:source_id]
  rows = rows.select do |row|
    row["source_ids"].to_s.split(";").map(&:strip).include?(options[:source_id])
  end
end
if options[:query]
  rows = rows.select do |row|
    [row["fact"], row["applicability"], row["notes"]].join("\n").downcase.include?(options[:query])
  end
end

if rows.empty?
  warn "ERROR: no facts matched"
  exit 1
end

def value_or_dash(value)
  value.to_s.strip.empty? ? "-" : value
end

def source_summary(source_ids, sources)
  ids = source_ids.to_s.split(";").map(&:strip).reject(&:empty?)
  return "-" if ids.empty?

  ids.map do |source_id|
    source = sources[source_id]
    source ? "#{source_id} #{source['title']}" : source_id
  end.join("; ")
end

if options[:format] == "markdown"
  puts "# GT40 Fact Lookup"
  puts
  puts "Source: `knowledge/data/fact-register.csv` joined to `sources/source-register.csv`."
  puts

  rows.group_by { |row| row["system"] }.sort.each do |system, system_rows|
    puts "## #{system}"
    puts
    system_rows.each do |row|
      puts "### #{row['fact_id']} - #{row['applicability']}"
      puts
      puts "- Label: #{value_or_dash(row['label'])}"
      puts "- Confidence: #{value_or_dash(row['confidence'])}"
      puts "- Sources: #{source_summary(row['source_ids'], sources)}"
      puts "- Fact: #{value_or_dash(row['fact'])}"
      puts "- Notes: #{value_or_dash(row['notes'])}"
      puts
    end
  end
else
  rows.each do |row|
    puts "#{row['fact_id']} - #{row['system']}"
    puts "Applicability: #{value_or_dash(row['applicability'])}"
    puts "Label: #{value_or_dash(row['label'])}"
    puts "Confidence: #{value_or_dash(row['confidence'])}"
    puts "Sources: #{source_summary(row['source_ids'], sources)}"
    puts "Fact: #{value_or_dash(row['fact'])}"
    puts "Notes: #{value_or_dash(row['notes'])}"
    puts
  end
end
