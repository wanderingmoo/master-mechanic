# S027 - Ford Heritage Vault Racing Heritage GT40 Concept Press-Release Record

## Source

- Source ID: S027
- Title: Racing Heritage: GT40 Concept Builds on a Proud History
- Record URL: https://fordheritagevault.com/scripts/mwimain.dll/144/DESCRIPTION_OPAC3/FORD_DETAIL?sessionsearch&exp=REFD%20AR-74-18056.46.2186
- REFD: AR-74-18056.46.2186
- SISN: 241173
- Type: official Ford archive textual press-release record
- Tier: 1
- Status: verified metadata; archived PDF content not text-extracted
- Date accessed: 2026-07-11
- Local archive: `sources/archive/S027-ford-heritage-vault-racing-heritage-gt40-concept.pdf`
- SHA-256: `adc9ad5d300953633917e53ee913dae2a56472dde13bc6a94a1afbd40d279c0b`

## What was inspected

- Ford Heritage Vault detail record for REFD `AR-74-18056.46.2186`.
- Detail-page metadata exposed in the returned HTML.
- The attached Ford Heritage Vault media asset, downloaded as a PDF and archived locally.

## Extracted record metadata

- The record title is `Racing Heritage: GT40 Concept Builds on a Proud History`.
- The record's media type is `Textual`.
- The detail record's subject links include `press releases`, `North American International Auto Show (NAIAS)`, `GT40`, `GT40 (concept vehicle)`, `Ford, Henry II`, `24 Hours of Le Mans`, and `GT`.
- The record exposes a Ford Heritage Vault media-access link and thumbnail link for the textual asset.
- The media-access response is a PDF with filename `access-ar_74_18056_061_060.pdf`; it is archived locally under the S027 filename listed above.

## Extraction limitation

The downloaded PDF is image-compressed or otherwise not text-readable with the local tools available during this pass. Direct `strings` extraction did not expose meaningful GT40 text, and no local OCR/PDF text library was available. Therefore, S027 currently supports record metadata, archive provenance, and source acquisition only.

Do not promote claims from the PDF body until the PDF has been OCRed or otherwise read and the claims have been extracted into `knowledge/data/fact-register.csv`.

## Mechanic-facing implications

- Use S027 as an official Ford press-release archive anchor for Ford-authored GT40 racing-heritage context.
- Use it to target follow-up OCR or manual reading for GT40/Le Mans historical claims.
- Keep S025 as the stronger official source for the 1968 classified Le Mans winner row.
- Do not use S027 to infer chassis identity, engine displacement, Gurney-Weslake 302 details, race-preparation settings, service settings, or installed-car configuration.

## What this source does not prove

- It does not identify the user's chassis, engine, heads, transaxle, brakes, wheels, tires, or safety equipment.
- It does not provide mechanic-ready service specifications.
- It does not verify the 1968 winner's engine, lap count, chassis number, or preparation details because the PDF body has not yet been extracted.
- It does not unblock any setting in `knowledge/data/settings-register.csv`.
