#!/usr/bin/env ruby
# frozen_string_literal: true

require "csv"
require "optparse"

ROOT = File.expand_path("..", __dir__)
EVALUATION_REGISTER = File.join(ROOT, "knowledge/data/evaluation-register.csv")

options = {
  case_id: nil,
  format: "markdown"
}

OptionParser.new do |parser|
  parser.banner = "Usage: ruby tools/print-agent-evaluation-plan.rb [options]"

  parser.on("--case CASE_ID", "Print only one evaluation case, e.g. E015") do |value|
    options[:case_id] = value
  end

  parser.on("--format FORMAT", "Output format: markdown or text. Default: markdown") do |value|
    unless %w[markdown text].include?(value)
      warn "ERROR: unsupported format #{value.inspect}; use markdown or text"
      exit 1
    end
    options[:format] = value
  end
end.parse!

unless File.file?(EVALUATION_REGISTER)
  warn "ERROR: missing evaluation register: #{EVALUATION_REGISTER}"
  exit 1
end

rows = CSV.read(EVALUATION_REGISTER, headers: true)
rows = rows.select { |row| row["case_id"] == options[:case_id] } if options[:case_id]

if rows.empty?
  warn "ERROR: no evaluation cases matched"
  exit 1
end

def blank_to_dash(value)
  value.to_s.strip.empty? ? "-" : value
end

if options[:format] == "markdown"
  puts "# GT40MasterMechanic Evaluation Plan"
  puts
  puts "Use `.github/agents/GT40MasterMechanic.agent.md` as the operating instructions."
  puts "For each case, ask the prompt, then compare the answer to the expected and forbidden behavior."
  puts

  rows.each do |row|
    puts "## #{row['case_id']} - #{row['title']}"
    puts
    puts "**Prompt**"
    puts
    puts "> #{row['prompt']}"
    puts
    puts "**Primary skill:** #{blank_to_dash(row['primary_skill'])}"
    puts
    puts "**Required source IDs:** #{blank_to_dash(row['required_source_ids'])}"
    puts
    puts "**Required register IDs:** #{blank_to_dash(row['required_register_ids'])}"
    puts
    puts "**Must block settings:** #{blank_to_dash(row['must_block_settings'])}"
    puts
    puts "**Required behavior:** #{blank_to_dash(row['required_behavior'])}"
    puts
    puts "**Forbidden behavior:** #{blank_to_dash(row['forbidden_behavior'])}"
    puts
  end
else
  rows.each do |row|
    puts "#{row['case_id']} - #{row['title']}"
    puts "Prompt: #{row['prompt']}"
    puts "Primary skill: #{blank_to_dash(row['primary_skill'])}"
    puts "Required source IDs: #{blank_to_dash(row['required_source_ids'])}"
    puts "Required register IDs: #{blank_to_dash(row['required_register_ids'])}"
    puts "Must block settings: #{blank_to_dash(row['must_block_settings'])}"
    puts "Required behavior: #{blank_to_dash(row['required_behavior'])}"
    puts "Forbidden behavior: #{blank_to_dash(row['forbidden_behavior'])}"
    puts
  end
end
