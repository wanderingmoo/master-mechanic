#!/usr/bin/env ruby
# frozen_string_literal: true

require "open3"

ROOT = File.expand_path("..", __dir__)

COMMANDS = [
  ["ruby", "tools/validate-portable-index.rb"],
  ["ruby", "tools/print-completion-audit.rb", "--format", "text"],
  ["ruby", "tools/print-coverage-audit.rb", "--system", "engine"],
  ["ruby", "tools/print-system-brief.rb", "--system", "general", "--format", "text"],
  ["ruby", "tools/print-system-brief.rb", "--system", "brakes_wheels_tires", "--format", "text"],
  ["ruby", "tools/print-agent-evaluation-plan.rb", "--case", "E014", "--format", "text"],
  ["ruby", "tools/print-agent-evaluation-plan.rb", "--case", "E018", "--format", "text"],
  ["ruby", "tools/print-agent-evaluation-plan.rb", "--case", "E019", "--format", "text"],
  ["ruby", "tools/print-evidence-request.rb", "--priority", "P1", "--status", "open", "--format", "text"]
].freeze

def run_command(argv)
  puts "## #{argv.join(' ')}"
  stdout, stderr, status = Open3.capture3(*argv, chdir: ROOT)
  puts stdout unless stdout.empty?
  warn stderr unless stderr.empty?
  unless status.success?
    warn "ERROR: command failed with status #{status.exitstatus}: #{argv.join(' ')}"
    exit status.exitstatus || 1
  end
end

puts "# Master-Mechanic Quality Gate"
puts
puts "Runs portable-index validation plus representative assistant-routing checks."
puts

COMMANDS.each { |argv| run_command(argv) }

puts "Quality gate passed"
