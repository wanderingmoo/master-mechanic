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

## Cross-reference rules

- `source_ids` columns contain semicolon-separated source IDs from `../../sources/source-register.csv`.
- `related_register_ids` in `evidence-gap-register.csv` may reference:
  - `C###` configuration items;
  - `P###` part items;
  - `ST###` settings;
  - `F###` facts.
- Every `ST###` setting must appear in at least one `related_register_ids` cell in `evidence-gap-register.csv`.
- `required_source_ids` in `evaluation-register.csv` contains semicolon-separated source IDs from `../../sources/source-register.csv`.
- `tools/validate-portable-index.rb` enforces source references, duplicate IDs, evaluation-case coverage, settings-to-gap coverage, and manifest coverage for indexed helper scripts.
- `tools/print-facts.rb` prints fact-register entries by system, source ID, label, or keyword and joins source titles for mechanic-facing context.
- `tools/print-settings-gates.rb` prints mechanic-facing settings gates from `settings-register.csv` and links each setting to related evidence gaps.
- `tools/print-agent-evaluation-plan.rb` prints assistant regression prompts from `evaluation-register.csv`.

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
