# Source Policy

## Evidence Tiers

| Tier | Source type | Allowed use |
|---|---|---|
| Tier 1 | Original Ford Advanced Vehicles, Ford, J.W. Automotive, FIA homologation, component manufacturer manuals, engine build sheets, chassis records, period race prep sheets | Authoritative for facts within its exact scope. Can support actionable settings if applicable. |
| Tier 2 | High-quality scanned period manuals, official museum/archive copies, recognized marque registry records, component maker service bulletins | Usable when provenance is clear; mark any uncertainty. |
| Tier 3 | Specialist books, Haynes/Porter-style manuals, marque experts, auction dossiers with documented provenance | Useful for context and cross-checking; do not use alone for safety-critical settings. |
| Tier 4 | Forums, Wikipedia, unsourced blogs, replica builder notes, parts vendor marketing | Lead generation only unless independently verified. |

## Fact Labels

Use these labels in notes and the fact register:

- `verified`: Directly supported by tier 1 or strong tier 2 evidence.
- `cross_checked`: Supported by multiple independent sources but not yet primary.
- `lead_only`: Useful search lead; not a shop setting.
- `assumption`: Working assumption used to organize research.
- `open`: Needs inspection, measurement, or records.

## Mechanic Advice Rules

- Separate "what is likely" from "what to do next."
- For safety-critical systems, require either primary documentation or physical inspection before final settings.
- Cite source IDs from [../sources/source-register.csv](../sources/source-register.csv) and fact IDs from [data/fact-register.csv](data/fact-register.csv).
- Track component identity, settings gates, and missing evidence in [data/configuration-register.csv](data/configuration-register.csv).
- Store extracted source notes under `../sources/notes/` when a source contributes multiple facts or system implications.
- Distinguish research copies from event-valid documents; FIA HTP use may require ASN-certified homologation-form copies even when a website consultation copy exists.
- Prefer reversible diagnostics before component replacement.
- Preserve as-found evidence before disassembly: photos, casting marks, jet stacks, shim packs, wiring labels, line routing, and fastener markings.
