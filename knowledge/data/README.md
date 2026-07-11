# Data Dictionary

## Purpose

This directory contains the portable machine-readable registers for `Master-Mechanic`.

The registers are CSV files so they can be searched, diffed, edited, and validated without a database or proprietary tool.

## Register overview

| Register | ID prefix | Purpose |
|---|---:|---|
| `../../sources/source-register.csv` | `S` | External and local source inventory. |
| `fact-register.csv` | `F` | Extracted claims, applicability, labels, confidence, and source IDs. |
| `configuration-register.csv` | `C` | Component/configuration state for major assemblies and evidence gates. |
| `parts-register.csv` | `P` | System-by-system part and assembly identification records. |
| `settings-register.csv` | `ST` | Blocked or actionable setting records and the evidence required to use them. |
| `evidence-gap-register.csv` | `G` | Machine-readable queue of remaining evidence blockers by system, including every settings-register ID. |
| `evaluation-register.csv` | `E` | Machine-readable assistant regression cases, expected skills, source IDs, register IDs, blocked settings, and fail conditions. |
| `system-taxonomy.yaml` | n/a | Canonical system IDs, labels, page mapping, and legacy aliases used by report tools and validation. |

## Cross-reference rules

- `source_ids` columns contain semicolon-separated source IDs from `../../sources/source-register.csv`.
- Use canonical mechanic-facing system IDs where possible:
  - `brakes_wheels_tires` for brake, hub, wheel, and tire records;
  - `electrical_instruments` for electrical, charging, starting, lighting, switch, and instrument records;
  - `suspension_steering` for suspension, steering, geometry, damper, spring, bar, rack, and upright records.
- The reporting tools normalize legacy labels `brakes`, `wheels_tires`, `electrical`, and `suspension` into the canonical IDs above so older source extractions remain traceable while mechanic-facing audits stay system-organized.
- `related_register_ids` in `evidence-gap-register.csv` may reference:
  - `C###` configuration items;
  - `P###` part items;
  - `ST###` settings;
  - `F###` facts.
- Every `ST###` setting must appear in at least one `related_register_ids` cell in `evidence-gap-register.csv`.
- Every blocked `ST###` setting must appear in at least one evaluation-register `required_register_ids` or `must_block_settings` cell.
- `required_source_ids` in `evaluation-register.csv` contains semicolon-separated source IDs from `../../sources/source-register.csv`.
- `tools/validate-portable-index.rb` enforces source references, duplicate IDs, evidence-gap and evaluation register-ID references, evaluation-case coverage, evaluation primary-skill references, settings-to-gap coverage, blocked-setting evaluation coverage, manifest coverage for indexed helper scripts, and YAML validity for assistant/GitHub metadata.
- `tools/validate-portable-index.rb` also validates every register `system` value against `system-taxonomy.yaml`.
- `tools/print-coverage-audit.rb` summarizes fact labels, settings states, evidence-gap priorities/statuses, P1 open gaps, and related evaluation cases by system.
- `tools/print-completion-audit.rb` checks every taxonomy system against completion gates for verified facts, mechanic-system configuration/part/settings coverage, blocked settings, open P1 evidence gaps, open installed-hardware identity, and related evaluation cases.
- `tools/print-facts.rb` prints fact-register entries by system, source ID, label, or keyword and joins source titles for mechanic-facing context.
- `tools/print-settings-gates.rb` prints mechanic-facing settings gates from `settings-register.csv` and links each setting to related evidence gaps.
- `tools/print-evidence-request.rb` prints focused evidence requests from `evidence-gap-register.csv` by gap, system, priority, or status.
- `tools/print-agent-evaluation-plan.rb` prints assistant regression prompts from `evaluation-register.csv`.
- `tools/print-system-brief.rb` prints a combined assistant-routing brief for one system, including facts, configuration items, parts, settings gates, evidence gaps, and related evaluation cases.
- `tools/run-quality-gate.rb` runs portable-index validation plus representative coverage, system-brief, evaluation, and evidence-request checks.

## Label meanings

Use these labels consistently:

| Label | Meaning |
|---|---|
| `verified` | Claim or source has been inspected and directly supports the statement. |
| `verified_context_installed_open` | A source-backed context exists, but the installed component is not verified. |
| `verified_boundary_installed_open` | A source gives a boundary or prompt, but installed data is missing. |
| `lead_with_verified_support_source` | A lead remains unverified, but a credible support/source-acquisition path has been captured. |
| `lead_only` | Useful only for finding stronger evidence. Do not use for mechanic-facing settings. |
| `open` | Required evidence is not yet captured. |
| `assumption` | Project or user-provided assumption; not source proof. |

## Confidence meanings

| Confidence | Meaning |
|---|---|
| `high` | Strong source basis or safety-critical control rule. Still obey applicability limits. |
| `medium` | Useful context or support evidence, but not enough for a final setting by itself. |
| `low` | Weak, secondary, or early-stage lead. Use only to guide source acquisition. |

## Priority meanings

| Priority | Meaning |
|---|---|
| `P1` | Blocks safety, component identity, or core mechanic settings. |
| `P2` | Important for completeness or historical/source promotion but less urgent than P1. |

## Adding evidence

When new material arrives:

1. Add the source to `../../sources/source-register.csv`.
2. Add a source note under `../../sources/notes/` if the source has multiple relevant claims.
3. Add extracted claims to `fact-register.csv`.
4. Update `configuration-register.csv` and `parts-register.csv` if hardware identity changes.
5. Update `settings-register.csv` only if a setting changes state.
6. Update `evidence-gap-register.csv` to close, narrow, or replace the relevant gap.
7. Update `evaluation-register.csv` if the change affects assistant behavior, blocked-setting rules, source promotion, or a prior regression case.
8. Run `ruby ../../tools/validate-portable-index.rb` from the repository root.

## Safety rule

A setting is not actionable until both conditions are true:

1. The exact installed component is identified.
2. The setting is supported by an applicable source.

Until then, keep the setting blocked and represented in `evidence-gap-register.csv`.
