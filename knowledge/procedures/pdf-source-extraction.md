# PDF Source Extraction Procedure

## Purpose

Use this procedure when extracting facts from archived PDF sources such as FIA forms, component manuals, Ford Heritage Vault assets, archive scans, service bulletins, race programs, and period preparation sheets.

The goal is to make PDF extraction repeatable while preventing unread, image-only, or weakly interpreted source material from becoming mechanic-facing advice.

## Required order

1. Confirm the PDF is registered in `sources/source-register.csv`.
2. If the PDF is retained locally, record it in `knowledge/manifest.yaml` under `source_archives` with SHA-256.
3. Run `pdfinfo` to capture page count, encryption state, producer/creator metadata when useful, and basic page information.
4. Run `pdftotext -layout` against the local PDF.
5. If text extraction succeeds, compare the extracted text with at least one rendered page or original visible page before promoting facts.
6. If text extraction is empty, corrupted, or obviously incomplete, render pages with `pdftoppm` and visually inspect the rendered images.
7. Extract only claims visible in the PDF text or rendered page images.
8. Add source-note extraction details before adding facts.
9. Add facts to `knowledge/data/fact-register.csv` with source IDs, system tags, confidence, and applicability boundaries.
10. Update system pages or registers only for claims directly supported by the PDF.
11. Run `ruby tools/validate-portable-index.rb`.

## Standard commands

Use a temporary extraction folder outside the repo for intermediate text or images:

```bash
mkdir -p /private/tmp/master-mechanic-pdf
pdfinfo sources/archive/S###-source-name.pdf
pdftotext -layout sources/archive/S###-source-name.pdf /private/tmp/master-mechanic-pdf/S###.txt
pdftoppm -png -r 200 sources/archive/S###-source-name.pdf /private/tmp/master-mechanic-pdf/S###
```

Do not commit temporary extraction text or rendered page images unless they are intentionally promoted into a source archive with a manifest entry and checksum.

## Extraction labels

Use these phrases in source notes so later work can evaluate reliability:

| Label | Meaning |
|---|---|
| `text-extracted` | `pdftotext -layout` produced usable text and at least one page was visually checked. |
| `rendered-inspected` | Rendered page images were inspected because text extraction was absent, incomplete, or not trustworthy. |
| `metadata-only` | Only the record page, PDF metadata, or archive metadata was inspected; do not cite body claims. |
| `archived-not-extracted` | The PDF is preserved locally but body claims have not been extracted. |

## Promotion rules

- Preserve page, section, or item-number context wherever possible.
- Keep original units visible and add conversions only when the source or an explicit calculation supports them.
- Do not promote OCR noise, partial words, or ambiguous table content.
- Do not treat a photograph, rendered page, or OCR text as installed-car proof.
- Do not unlock settings unless the PDF is applicable to the exact installed component and the value is explicitly present.
- If a PDF contradicts an existing source, record the contradiction instead of smoothing it into a single claim.

## Current project examples

- S027 is `text-extracted` after Poppler installation and was also checked by rendered page inspection.
- S015 is an archived FIA research-copy PDF with many fields already extracted from inspection, but `pdftotext` produces no usable body text. Continue to rely on inspected page content, rendered pages, and source-note boundaries for S015.
- S016 and S019 are archived PDFs with manifest checksums; use this procedure before adding new claims beyond the already indexed facts.
