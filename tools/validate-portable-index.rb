#!/usr/bin/env ruby
# frozen_string_literal: true

require "csv"
require "yaml"
require "set"
require "shellwords"

ROOT = File.expand_path("..", __dir__)

def fail_with(message)
  warn "ERROR: #{message}"
  exit 1
end

def assert_file(path)
  full = File.join(ROOT, path)
  fail_with("missing file: #{path}") unless File.file?(full)
  full
end

manifest_path = assert_file("knowledge/manifest.yaml")
manifest = YAML.safe_load(File.read(manifest_path))

%w[indexes control_files source_notes source_archives systems procedures templates assistant_assets tools].each do |key|
  fail_with("manifest missing #{key}") unless manifest.key?(key)
end

[
  manifest.dig("indexes", "human_index"),
  manifest.dig("indexes", "source_register"),
  manifest.dig("indexes", "fact_register"),
  manifest.dig("indexes", "configuration_register"),
  manifest.dig("indexes", "parts_register"),
  manifest.dig("indexes", "settings_register"),
  manifest.dig("indexes", "evidence_gap_register"),
  manifest.dig("indexes", "evaluation_register"),
  manifest.dig("indexes", "system_taxonomy"),
  manifest.dig("indexes", "source_policy")
].compact.each { |path| assert_file(path) }

source_notes_dir = manifest.dig("indexes", "source_notes_dir")
if source_notes_dir
  full = File.join(ROOT, source_notes_dir)
  fail_with("missing source notes directory: #{source_notes_dir}") unless Dir.exist?(full)
end

def manifest_paths(manifest, key)
  (manifest[key] || []).map { |entry| entry.fetch("path") }
end

manifest_paths(manifest, "control_files").each { |path| assert_file(path) }
manifest_paths(manifest, "source_notes").each { |path| assert_file(path) }
manifest_paths(manifest, "systems").each { |path| assert_file(path) }
manifest_paths(manifest, "procedures").each { |path| assert_file(path) }
manifest_paths(manifest, "templates").each { |path| assert_file(path) }
manifest_paths(manifest, "tools").each { |path| assert_file(path) }

def assert_manifest_covers_files(manifest, key, glob)
  expected = manifest_paths(manifest, key).to_set
  actual = Dir[File.join(ROOT, glob)].map { |path| path.delete_prefix("#{ROOT}/") }.to_set
  missing_from_manifest = actual - expected
  stale_manifest_entries = expected - actual
  fail_with("#{key} files missing from manifest: #{missing_from_manifest.to_a.sort.join(', ')}") unless missing_from_manifest.empty?
  fail_with("#{key} manifest entries missing files: #{stale_manifest_entries.to_a.sort.join(', ')}") unless stale_manifest_entries.empty?
end

assert_manifest_covers_files(manifest, "source_notes", "sources/notes/*.md")
assert_manifest_covers_files(manifest, "systems", "knowledge/systems/*.md")
assert_manifest_covers_files(manifest, "procedures", "knowledge/procedures/*.md")
assert_manifest_covers_files(manifest, "templates", "knowledge/templates/*.md")
assert_manifest_covers_files(manifest, "tools", "tools/*.rb")

agent_path = manifest.dig("assistant_assets", "agent")
if agent_path
  agent_full = assert_file(agent_path)
  agent_content = File.read(agent_full)
  agent_match = agent_content.match(/\A---\n(.*?)\n---/m)
  fail_with("missing YAML frontmatter: #{agent_path}") unless agent_match
  agent_frontmatter = YAML.safe_load(agent_match[1])
  %w[name description model tools].each do |field|
    fail_with("agent missing #{field}: #{agent_path}") unless agent_frontmatter[field]
  end
end

manifest_skill_paths = (manifest.dig("assistant_assets", "skills") || [])
actual_skill_paths = Dir[File.join(ROOT, ".github/skills/*/SKILL.md")].map { |path| path.delete_prefix("#{ROOT}/") }.sort
unless manifest_skill_paths.sort == actual_skill_paths
  missing = actual_skill_paths - manifest_skill_paths
  stale = manifest_skill_paths - actual_skill_paths
  fail_with("assistant skill manifest mismatch; missing: #{missing.join(', ')} stale: #{stale.join(', ')}")
end

skill_names = Set.new
manifest_skill_paths.each do |path|
  full = assert_file(path)
  content = File.read(full)
  match = content.match(/\A---\n(.*?)\n---/m)
  fail_with("missing YAML frontmatter: #{path}") unless match
  frontmatter = YAML.safe_load(match[1])
  allowed_skill_frontmatter = %w[allowed-tools description license metadata name]
  unexpected_skill_keys = frontmatter.keys - allowed_skill_frontmatter
  unless unexpected_skill_keys.empty?
    fail_with("unexpected skill frontmatter key(s) in #{path}: #{unexpected_skill_keys.sort.join(', ')}")
  end
  fail_with("skill missing name: #{path}") unless frontmatter["name"]
  fail_with("skill missing description: #{path}") unless frontmatter["description"]
  fail_with("duplicate skill name #{frontmatter['name']}") if skill_names.include?(frontmatter["name"])
  skill_names.add(frontmatter["name"])

  openai_yaml = path.sub(%r{/SKILL\.md\z}, "/agents/openai.yaml")
  openai_full = assert_file(openai_yaml)
  YAML.safe_load(File.read(openai_full))
end

github_metadata_globs = [
  ".github/workflows/*.yml",
  ".github/workflows/*.yaml",
  ".github/ISSUE_TEMPLATE/*.yml",
  ".github/ISSUE_TEMPLATE/*.yaml"
]

github_metadata_globs.flat_map { |glob| Dir[File.join(ROOT, glob)] }.uniq.each do |full|
  rel = full.delete_prefix("#{ROOT}/")
  begin
    YAML.safe_load(File.read(full))
  rescue Psych::Exception => e
    fail_with("invalid YAML in #{rel}: #{e.message}")
  end
end

[
  "sources/source-register.csv",
  "knowledge/data/fact-register.csv",
  "knowledge/data/configuration-register.csv",
  "knowledge/data/parts-register.csv",
  "knowledge/data/settings-register.csv",
  "knowledge/data/evidence-gap-register.csv",
  "knowledge/data/evaluation-register.csv"
].each do |path|
  full = assert_file(path)
  CSV.foreach(full, headers: true).with_index(2) do |row, line|
    fail_with("blank CSV row at #{path}:#{line}") if row.fields.compact.empty?
  end
end

def assert_unique_ids(path, id_column)
  ids = Set.new
  CSV.foreach(assert_file(path), headers: true).with_index(2) do |row, line|
    id = row[id_column]
    fail_with("missing #{id_column} at #{path}:#{line}") if id.to_s.empty?
    fail_with("duplicate #{id_column} #{id} in #{path}") if ids.include?(id)
    ids.add(id)
  end
  ids
end

source_ids = assert_unique_ids("sources/source-register.csv", "source_id")
fact_ids = assert_unique_ids("knowledge/data/fact-register.csv", "fact_id")
configuration_ids = assert_unique_ids("knowledge/data/configuration-register.csv", "item_id")
part_ids = assert_unique_ids("knowledge/data/parts-register.csv", "part_id")
setting_ids = assert_unique_ids("knowledge/data/settings-register.csv", "setting_id")
gap_ids = assert_unique_ids("knowledge/data/evidence-gap-register.csv", "gap_id")
evaluation_ids = assert_unique_ids("knowledge/data/evaluation-register.csv", "case_id")

(manifest["source_notes"] || []).each do |entry|
  id = entry.fetch("id")
  fail_with("manifest source_note id #{id} is not in source register") unless source_ids.include?(id)
end

(manifest["source_archives"] || []).each do |entry|
  id = entry.fetch("id")
  fail_with("manifest source_archive id #{id} is not in source register") unless source_ids.include?(id)
  path = entry.fetch("path")
  full = assert_file(path)
  expected_sha = entry["sha256"]
  if expected_sha
    actual_sha = `shasum -a 256 #{full.shellescape}`.split.first
    fail_with("sha256 mismatch for #{path}") unless actual_sha == expected_sha
  end
end

def assert_source_refs(path, id_column, source_column, source_ids)
  CSV.foreach(assert_file(path), headers: true).with_index(2) do |row, line|
    row_id = row[id_column]
    fail_with("missing #{id_column} at #{path}:#{line}") if row_id.to_s.empty?
    refs = row[source_column].to_s.split(";").map(&:strip).reject(&:empty?)
    refs.each do |source_id|
      fail_with("unknown source #{source_id} referenced by #{path}:#{line}") unless source_ids.include?(source_id)
    end
  end
end

assert_source_refs("knowledge/data/fact-register.csv", "fact_id", "source_ids", source_ids)
assert_source_refs("knowledge/data/configuration-register.csv", "item_id", "source_ids", source_ids)
assert_source_refs("knowledge/data/parts-register.csv", "part_id", "source_ids", source_ids)
assert_source_refs("knowledge/data/settings-register.csv", "setting_id", "source_ids", source_ids)
assert_source_refs("knowledge/data/evidence-gap-register.csv", "gap_id", "source_ids", source_ids)
assert_source_refs("knowledge/data/evaluation-register.csv", "case_id", "required_source_ids", source_ids)

register_ids = fact_ids + configuration_ids + part_ids + setting_ids + gap_ids

def assert_register_refs(path, id_column, ref_column, allowed_ids)
  CSV.foreach(assert_file(path), headers: true).with_index(2) do |row, line|
    row_id = row[id_column]
    refs = row[ref_column].to_s.split(";").map(&:strip).reject(&:empty?)
    refs.each do |register_id|
      fail_with("unknown register id #{register_id} referenced by #{path}:#{line} for #{row_id}") unless allowed_ids.include?(register_id)
    end
  end
end

assert_register_refs(
  "knowledge/data/evidence-gap-register.csv",
  "gap_id",
  "related_register_ids",
  register_ids
)
assert_register_refs(
  "knowledge/data/evaluation-register.csv",
  "case_id",
  "required_register_ids",
  register_ids
)
assert_register_refs(
  "knowledge/data/evaluation-register.csv",
  "case_id",
  "must_block_settings",
  setting_ids
)

CSV.foreach(assert_file("knowledge/data/evaluation-register.csv"), headers: true).with_index(2) do |row, line|
  primary_skill = row["primary_skill"].to_s.strip
  fail_with("missing primary_skill at knowledge/data/evaluation-register.csv:#{line}") if primary_skill.empty?
  unless skill_names.include?(primary_skill)
    fail_with("unknown primary_skill #{primary_skill} at knowledge/data/evaluation-register.csv:#{line} for #{row['case_id']}")
  end
end

gap_related_ids = CSV.read(assert_file("knowledge/data/evidence-gap-register.csv"), headers: true).flat_map do |row|
  row["related_register_ids"].to_s.split(";").map(&:strip).reject(&:empty?)
end.to_set
missing_setting_gap_coverage = setting_ids.reject { |setting_id| gap_related_ids.include?(setting_id) }
unless missing_setting_gap_coverage.empty?
  fail_with("settings missing evidence-gap coverage: #{missing_setting_gap_coverage.sort.join(', ')}")
end

settings_compendium_entry = (manifest["control_files"] || []).find { |entry| entry["id"] == "settings_compendium" }
if settings_compendium_entry
  compendium_path = settings_compendium_entry.fetch("path")
  compendium_content = File.read(assert_file(compendium_path))
  missing_from_compendium = setting_ids.reject { |setting_id| compendium_content.include?(setting_id) }
  unless missing_from_compendium.empty?
    fail_with("settings missing from settings compendium: #{missing_from_compendium.sort.join(', ')}")
  end
end

assistant_evaluation_entry = (manifest["control_files"] || []).find { |entry| entry["id"] == "assistant_evaluation" }
if assistant_evaluation_entry
  assistant_evaluation_content = File.read(assert_file(assistant_evaluation_entry.fetch("path")))
  prose_cases = assistant_evaluation_content.scan(/^## Case (\d+) - (.+)$/).map do |number, title|
    [format("E%03d", number.to_i), title.strip]
  end
  fail_with("assistant evaluation case count is zero") if prose_cases.empty?

  register_cases = CSV.read(assert_file("knowledge/data/evaluation-register.csv"), headers: true).map do |row|
    [row.fetch("case_id"), row.fetch("title")]
  end

  unless prose_cases.length == register_cases.length
    fail_with("evaluation-register row count #{register_cases.length} does not match prose case count #{prose_cases.length}")
  end

  prose_case_ids = prose_cases.map(&:first).to_set
  register_case_ids = register_cases.map(&:first).to_set
  missing_from_prose = register_case_ids - prose_case_ids
  missing_from_register = prose_case_ids - register_case_ids
  fail_with("evaluation case IDs missing from prose: #{missing_from_prose.to_a.sort.join(', ')}") unless missing_from_prose.empty?
  fail_with("evaluation case IDs missing from register: #{missing_from_register.to_a.sort.join(', ')}") unless missing_from_register.empty?

  register_titles = register_cases.to_h
  prose_cases.each do |case_id, prose_title|
    register_title = register_titles[case_id]
    unless register_title == prose_title
      fail_with("evaluation case title mismatch for #{case_id}: prose #{prose_title.inspect}, register #{register_title.inspect}")
    end
  end
end

system_taxonomy_path = manifest.dig("indexes", "system_taxonomy")
if system_taxonomy_path
  taxonomy = YAML.safe_load(File.read(assert_file(system_taxonomy_path)))
  canonical_entries = taxonomy.fetch("canonical_systems")
  fail_with("system taxonomy has no canonical systems") if canonical_entries.empty?

  canonical_ids = canonical_entries.map { |entry| entry.fetch("id") }
  duplicate_canonical_ids = canonical_ids.group_by(&:itself).select { |_id, values| values.length > 1 }.keys
  unless duplicate_canonical_ids.empty?
    fail_with("duplicate canonical system id(s): #{duplicate_canonical_ids.sort.join(', ')}")
  end
  canonical_id_set = canonical_ids.to_set
  system_aliases = {}

  canonical_entries.each do |entry|
    id = entry.fetch("id")
    assert_file(entry.fetch("page"))

    if system_aliases.key?(id)
      fail_with("system taxonomy alias collision for #{id}")
    end
    system_aliases[id] = id

    (entry["aliases"] || []).each do |alias_id|
      fail_with("system taxonomy alias #{alias_id} duplicates a canonical id") if canonical_id_set.include?(alias_id)
      fail_with("system taxonomy alias collision for #{alias_id}") if system_aliases.key?(alias_id)
      system_aliases[alias_id] = id
    end
  end

  {
    "knowledge/data/fact-register.csv" => "fact_id",
    "knowledge/data/configuration-register.csv" => "item_id",
    "knowledge/data/parts-register.csv" => "part_id",
    "knowledge/data/settings-register.csv" => "setting_id",
    "knowledge/data/evidence-gap-register.csv" => "gap_id"
  }.each do |path, id_column|
    CSV.foreach(assert_file(path), headers: true).with_index(2) do |row, line|
      system = row["system"].to_s
      next if system.empty? || system_aliases.key?(system)

      fail_with("unknown system #{system.inspect} in #{path}:#{line} for #{row[id_column]}")
    end
  end
end

portable_text_globs = [
  "README.md",
  ".github/agents/*.md",
  ".github/workflows/*.yml",
  ".github/workflows/*.yaml",
  ".github/ISSUE_TEMPLATE/*.yml",
  ".github/ISSUE_TEMPLATE/*.yaml",
  ".github/skills/**/*.md",
  ".github/skills/**/*.yaml",
  "knowledge/**/*.md",
  "knowledge/**/*.csv",
  "knowledge/**/*.yaml",
  "sources/**/*.md",
  "sources/**/*.csv",
  "tools/**/*.rb"
]

non_portable_uri_marker = "file:" + "//"
todo_marker = "TO" + "DO"
bracketed_todo_marker = "[TO" + "DO"

portable_text_globs.flat_map { |glob| Dir[File.join(ROOT, glob)] }.uniq.each do |full|
  rel = full.delete_prefix("#{ROOT}/")
  content = File.read(full)
  fail_with("non-portable file URI in #{rel}") if content.include?(non_portable_uri_marker)
  fail_with("unfinished placeholder marker in #{rel}") if content.include?(todo_marker) || content.include?(bracketed_todo_marker)
end

puts "Portable index validation passed"
