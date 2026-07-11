---
name: gt40-source-triage
description: Classify, index, and extract evidence from GT40, Gurney-Weslake, Ford 302, and vintage racecar sources before facts are added to the local knowledge base. Use when evaluating manuals, homologation papers, chassis records, books, web pages, auction files, forum posts, or component documentation.
---

# GT40 Source Triage

## Overview

Use this skill before adding any external fact to the GT40 knowledge base. Its job is to separate primary evidence from leads, extract only supported claims, and update the portable local indexes.

## Workflow

1. Identify source type: original manual, manufacturer document, FIA paper, chassis record, component manual, archive scan, book, auction file, forum, or generic web page.
2. Assign evidence tier using [references/evidence-tiers.md](references/evidence-tiers.md).
3. Extract only claims visible in the source. Do not infer settings from adjacent models.
4. Record the source in `sources/source-register.csv`.
5. Record any usable fact in `knowledge/data/fact-register.csv` with system, applicability, label, source ID, and confidence.
6. If the source contributes several facts, create a concise source note under `sources/notes/` and add it to `knowledge/manifest.yaml`.
7. If the source is tier 3 or tier 4, mark facts `lead_only` unless independently confirmed.

## Extraction Rules

- Keep period, model, chassis, component, and race-event scope attached to every fact.
- Preserve original units and add conversions only as secondary notation.
- Never convert a historical context statement into a shop setting.
- Flag contradictions instead of smoothing them out.
- Prefer "open" over a confident but weakly sourced answer.

## Quality Bar

- A source has an ID before it is cited.
- A fact has a system tag before it is added.
- A multi-fact source has a local note and a manifest entry.
- Safety-critical settings require tier 1 or strong tier 2 evidence.
- Secondary sources are useful for finding manuals, not replacing them.

## Resources

Read [references/evidence-tiers.md](references/evidence-tiers.md) when classifying a source.
