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

## Local Archive and Publication Rules

- Store local source archives only when doing so is appropriate for a portable, publishable repository.
- Prefer archiving public official PDFs, public API payloads, user-provided documents, and files whose redistribution is permitted or operationally necessary for repeatable extraction.
- For copyrighted manuals, museum scans, archive reproductions, commercial books, or controlled-access documents, store metadata, source notes, checksums, page/box identifiers, and extracted facts instead of committing the full file unless redistribution rights are clear.
- Never use the presence of a local archive as proof that its contents are applicable to the installed vehicle.
- Every committed archive must be listed in `knowledge/manifest.yaml` with a checksum.
- If a source cannot be committed safely, keep the source-register entry and source note explicit about what was inspected, what was extracted, and where the controlled copy is held.
