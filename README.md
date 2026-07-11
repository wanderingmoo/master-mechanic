# Master-Mechanic

Standalone project/repository for a portable local knowledge base and assistant configuration for a 1968-era Ford GT40 Mk I configured around a Gurney-Weslake Ford 302.

Repository name: `Master-Mechanic`

Published GitHub remote: [wanderingmoo/master-mechanic](https://github.com/wanderingmoo/master-mechanic). Local `master` tracks `origin/master`.

## Start Here

- [Knowledge Index](knowledge/index.md) - local navigation for all stored knowledge.
- [Vehicle Identity Worksheet](knowledge/00-vehicle-identity.md) - chassis, engine, transaxle, and build assumptions.
- [Source Policy](knowledge/01-source-policy.md) - evidence tiers and rules for using specs.
- [Source Register](sources/source-register.csv) - indexed list of gathered sources and leads.
- [Coverage Matrix](knowledge/04-coverage-matrix.md) - system-by-system completion and evidence-gap tracker.
- [Phase Handoff](knowledge/05-phase-handoff.md) - current milestone, completed foundation, blocked settings, and next evidence needed.
- [Assistant Evaluation Cases](knowledge/06-assistant-evaluation.md) - acceptance prompts for testing evidence-gated assistant behavior.
- [Agent Test Protocol](knowledge/procedures/agent-test-protocol.md) - repeatable manual regression protocol for testing the local agent.
- [Evaluation Register](knowledge/data/evaluation-register.csv) - machine-readable assistant test cases and expected gates.
- [Settings Compendium](knowledge/07-settings-compendium.md) - mechanic-facing map of all tracked setup values, evidence gates, and safe next actions.
- [Source Archive](sources/archive) - local portable copies of captured source files when available.
- [Configuration Register](knowledge/data/configuration-register.csv) - component-by-component parts/settings gate with evidence state and next actions.
- [Parts Register](knowledge/data/parts-register.csv) - system-by-system part and assembly identification register.
- [Settings Register](knowledge/data/settings-register.csv) - blocked/actionable settings index with required evidence.
- [Evidence Gap Register](knowledge/data/evidence-gap-register.csv) - machine-readable queue of remaining evidence blockers by system; every settings-register item is covered.
- [Data Dictionary](knowledge/data/README.md) - register schema, ID prefixes, labels, confidence meanings, and cross-reference rules.
- [System Taxonomy](knowledge/data/system-taxonomy.yaml) - canonical system IDs, mechanic-facing labels, page mapping, and legacy aliases used by reports.
- [Source Acquisition Procedure](knowledge/procedures/source-acquisition.md) - repeatable workflow for adding primary documents and extracted facts.
- [PDF Source Extraction Procedure](knowledge/procedures/pdf-source-extraction.md) - repeatable `pdfinfo`/`pdftotext`/rendered-page workflow for archived PDFs.
- [JSON / API Source Extraction Procedure](knowledge/procedures/json-api-source-extraction.md) - repeatable workflow for archived API payloads such as official race-result JSON.
- [Evidence Request Packet](knowledge/procedures/evidence-request-packet.md) - ready-to-send evidence requests for the owner, archives, specialists, and event authorities.
- [Capture Templates](knowledge/templates) - portable Markdown forms for source, chassis, engine, driveline, suspension/steering, fuel/oil/cooling, electrical/instruments, brake/wheel/tire, and safety evidence.
- [Portable Manifest](knowledge/manifest.yaml) - machine-readable map of local files, tags, indexes, and assistant assets.
- [Agent Operating Rules](AGENTS.md) - repository-level rules for evidence-controlled agent work.
- [Mechanics Assistant Agent](.github/agents/GT40MasterMechanic.agent.md) - project-local agent definition.

## Portable Format

`Master-Mechanic` stores knowledge in plain text formats:

- Markdown (`.md`) for human-readable notes and system compendia.
- CSV (`.csv`) for source and fact registers.
- CSV (`.csv`) for component/configuration registers.
- CSV (`.csv`) for parts and assembly identification.
- CSV (`.csv`) for settings governance.
- YAML (`.yaml`) for structured configuration and skill metadata.

No database or proprietary file format is required. Search locally with:

```bash
rg "GT40|Gurney|Weslake|302|ZF" .
```

Validate the portable index with:

```bash
ruby tools/validate-portable-index.rb
```

The validator checks manifest coverage, CSV source references, duplicate register IDs, evidence-gap coverage for every setting, archived PDF checksums, assistant agent/skill metadata, GitHub workflow and issue-template YAML, indexed templates/procedures/system files, and accidental non-portable local URI or unfinished placeholder markers.
It also checks the machine-readable evaluation register against the prose assistant evaluation cases.

Run the broader local quality gate before committing or pushing:

```bash
ruby tools/run-quality-gate.rb
```

Print a register-driven coverage audit by system:

```bash
ruby tools/print-coverage-audit.rb
ruby tools/print-coverage-audit.rb --system engine
ruby tools/print-coverage-audit.rb --system brakes
```

Coverage and system-brief tools normalize legacy subsystem labels such as `brakes`, `wheels_tires`, `electrical`, and `suspension` into their canonical mechanic-facing systems so reports stay organized by the current system model.

Print the current assistant regression prompts with:

```bash
ruby tools/print-agent-evaluation-plan.rb
```

Print the current settings gates with:

```bash
ruby tools/print-settings-gates.rb
```

Filter by system or setting when needed:

```bash
ruby tools/print-settings-gates.rb --system engine
ruby tools/print-settings-gates.rb --setting ST033
```

Print focused evidence requests for a gap, system, or priority:

```bash
ruby tools/print-evidence-request.rb --gap G019
ruby tools/print-evidence-request.rb --system engine
ruby tools/print-evidence-request.rb --priority P1 --format text
```

Print a combined system brief for mechanic-assistant routing:

```bash
ruby tools/print-system-brief.rb --system engine
ruby tools/print-system-brief.rb --system general --format text
```

Print verified facts by system, source, label, or keyword:

```bash
ruby tools/print-facts.rb --system engine --label verified
ruby tools/print-facts.rb --source S015
ruby tools/print-facts.rb --query "Hewland"
```

## Current State

This is an evidence-controlled starter package. It establishes the index, source hierarchy, local archives, and assistant behavior before adding unsafe settings. The FIA Ford GT 40 homologation research copy and Hewland LG500/LG600 component manual are now archived locally with checksums. Chassis-specific service settings, torque values, carburetor jetting, alignment, and build clearances must still be tied to the exact installed hardware, original manuals, component maker data, engine build sheets, or measured as-found evidence before being treated as actionable. See [Phase Handoff](knowledge/05-phase-handoff.md) for the current milestone and remaining blockers.

## Contributing Evidence

Use GitHub issue templates to submit future evidence in a way that maps back to the portable registers:

- `Installed vehicle evidence` for photos, IDs, measurements, or as-found notes from the car.
- `Source or archive intake` for manuals, archive scans, build sheets, drawings, race documents, or official source paths.

Every submission still goes through source triage, component identification, settings governance, and `ruby tools/run-quality-gate.rb` before it changes mechanic-facing advice.
