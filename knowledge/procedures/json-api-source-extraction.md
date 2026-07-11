# JSON / API Source Extraction Procedure

## Purpose

Use this procedure when extracting facts from an archived JSON or API response, such as the ACO / 24H Le Mans palmarès payload captured as S025.

The goal is to make API extraction repeatable without relying on a live endpoint that may change, disappear, paginate differently, or return newly shaped fields later.

## Required order

1. Register the live endpoint in `sources/source-register.csv`.
2. Save the exact response payload under `sources/archive/` only when the payload is appropriate to store in a publishable repository.
3. Record the archive path and SHA-256 in `knowledge/manifest.yaml` under `source_archives`.
4. Parse the archived local file, not the live endpoint, before promoting facts.
5. Record top-level keys, row count, relevant object path, and capture date in the source note.
6. Extract only fields present in the archived payload.
7. Add facts to `knowledge/data/fact-register.csv` with clear field boundaries.
8. State absent fields explicitly when they matter to the mechanic or history claim.
9. Update system pages or coverage files only for fields directly supported by the archived payload.
10. Run `ruby tools/validate-portable-index.rb`.

## Standard commands

Verify the checksum:

```bash
shasum -a 256 sources/archive/S###-short-name.json
```

Parse and inspect top-level structure:

```bash
ruby -rjson -e 'data = JSON.parse(File.read("sources/archive/S###-short-name.json")); p data.class; p data.keys if data.is_a?(Hash)'
```

Inspect a targeted result row from the local payload:

```bash
ruby -rjson -e 'data = JSON.parse(File.read("sources/archive/S###-short-name.json")); pp data.fetch("results").find { |row| row["ranking"] == 1 }'
```

Do not commit temporary pretty-printed copies unless they are intentionally promoted as the archive copy with a manifest checksum.

## Extraction labels

Use these phrases in source notes so later work can evaluate reliability:

| Label | Meaning |
|---|---|
| `json-archived-parsed` | The exact JSON response was saved locally, checksummed, parsed, and used for extracted facts. |
| `json-live-inspected-only` | The endpoint was inspected live but the response was not archived; do not rely on it for durable facts unless captured later. |
| `json-metadata-only` | Only route, schema, pagination, or metadata was inspected; do not cite result-row facts. |

## Promotion rules

- Treat the archived JSON as the source of truth for extracted fields, not a later live response.
- Preserve field names and original capitalization when useful.
- Preserve array/object paths for nested fields such as `results[0].drivers`.
- Do not infer fields that are absent from the payload.
- Do not promote display helper fields, URLs, IDs, or dates as historical facts unless their meaning is explicit.
- Record API oddities instead of silently correcting them.
- If a later live response differs from the archived payload, create a new source ID or source-note revision rather than overwriting prior facts.

## Current project example

- S025 is `json-archived-parsed`: the official 24H Le Mans palmarès 1968 API payload is archived as `sources/archive/S025-aco-1968-palmares-api.json`, has a manifest checksum, parses with top-level `results` and `pagination`, and supports only the winner-row fields explicitly extracted into S025 / F117-F119 / F163. It does not expose engine displacement, lap count, full entrant legal name, chassis number, or race-preparation detail.
