---
name: gt40-mechanic-question-routing
description: Route GT40 mechanic questions through the local index, coverage matrix, evidence registers, and specialist skills before answering.
---

# GT40 Mechanic Question Routing

Use this skill for any direct mechanic question about the 1968-era Ford GT40 Mk I / Gurney-Weslake 302 knowledge base, especially when the user asks for a specification, setting, part, configuration, repair approach, diagnostic path, source interpretation, or next shop action.

## Required Local Context

Before answering, read or query the relevant parts of:

- `knowledge/index.md`
- `knowledge/04-coverage-matrix.md`
- `tools/print-system-brief.rb --system <system>` output for the affected system when a system-specific register brief is useful
- `tools/print-parts-config.rb --system <system>` output when the question depends on component identity, compatibility, ordering, machining, or configuration evidence
- `knowledge/manifest.yaml`
- `sources/source-register.csv`
- `knowledge/data/fact-register.csv`
- `knowledge/data/configuration-register.csv`
- `knowledge/data/parts-register.csv`
- `knowledge/data/settings-register.csv`
- the relevant `knowledge/systems/*.md` file
- the relevant `sources/notes/*.md` file when a cited source ID is used

## Routing Workflow

1. Classify the question by system:
   - identity and provenance
   - regulatory and homologation
   - chassis and body
   - engine and induction
   - driveline and transaxle
   - suspension and steering
   - brakes, wheels, and tires
   - fuel, oil, and cooling
   - electrical and instruments
   - safety systems
   - assistant assets and local workflow
2. Check `knowledge/04-coverage-matrix.md` for the system status before giving an answer.
3. For a system-specific question, run or inspect `ruby tools/print-system-brief.rb --system <system>` to collect facts, configuration items, parts, settings gates, evidence gaps, and related evaluation cases in one brief.
4. For a part, component identity, compatibility, ordering, machining, or configuration question, run or inspect `ruby tools/print-parts-config.rb --system <system>` or `ruby tools/print-parts-config.rb --item <C###|P###>` before answering.
5. Query the fact, configuration, parts, and settings registers for matching rows when the generated briefs are too broad or when exact row text is needed.
6. Classify the answer as one of:
   - verified fact
   - cross-checked fact
   - evidence boundary
   - blocked setting
   - installed-component identification task
   - inspection or commissioning workflow
   - diagnostic workflow
   - source-acquisition task
7. If the question asks for a numeric setup value, adjustment, torque, clearance, jetting, timing, alignment, brake bias, tire pressure, fluid quantity, or material specification, apply `gt40-settings-governance` before answering.
8. If the question depends on an installed part identity, serial number, casting number, stamp, measured dimension, or assembly variant, apply `gt40-component-identification` before answering.
9. If the user supplies a source, document, manual, photo, build sheet, or seller claim, apply `gt40-source-triage` before accepting it into the knowledge base.
10. If the question involves a fault, symptom, first start, recommissioning, brake issue, fuel leak, oil pressure issue, overheating, misfire, or unsafe drivability condition, apply `vintage-racecar-diagnostics`.
11. If the question asks whether the car is safe, track-ready, race-ready, Appendix K compliant, HTP/event ready, or asks about belts, fire systems, fuel cells, master switches, batteries, bulkheads, warning lights, mirrors, ROPS/cage, oil catch tanks, or fuel/oil/brake-line safety, apply `gt40-safety-event-readiness`.
12. If the user provides shop evidence or asks what to record next, choose the matching portable template from `knowledge/templates/` and tell the user which fields unblock the relevant register rows.
13. Return a mechanic-facing answer with local source IDs and local file paths.

## Non-Negotiables

- Do not treat `baseline_captured`, `component_support_captured`, or `indexed_placeholder` coverage status as a complete installed-car service specification.
- Do not convert homologation recognition data into an as-built setting unless the configuration register and settings register support that use.
- Do not give numeric settings unless the setting is verified, cross-checked, or explicitly supported by a confirmed component source.
- When evidence is missing, say `blocked` and state the exact evidence needed to unblock the answer.
- Prefer reversible inspection, measurement, and documentation steps before replacement, machining, or irreversible adjustment.
- Keep all durable evidence in portable Markdown, CSV, and YAML files; do not create database-only or proprietary indexes.
- Keep answers concise enough to use in the shop.

## Output Format

Use this structure unless the user asks for a different format:

```markdown
Answer type:

Verified from local KB:

Blocked / not yet known:

Safe next action:

Sources / local indexes:
```

## Reference

See `references/answer-routing-checklist.md` for a compact routing checklist.
