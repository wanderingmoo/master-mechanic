# S027 - Ford Heritage Vault Racing Heritage GT40 Concept Press-Release Record

## Source

- Source ID: S027
- Title: Racing Heritage: GT40 Concept Builds on a Proud History
- Record URL: https://fordheritagevault.com/scripts/mwimain.dll/144/DESCRIPTION_OPAC3/FORD_DETAIL?sessionsearch&exp=REFD%20AR-74-18056.46.2186
- REFD: AR-74-18056.46.2186
- SISN: 241173
- Type: official Ford archive textual press-release record
- Tier: 1
- Status: verified; archived PDF rendered and visually inspected
- Date accessed: 2026-07-11
- Local archive: `sources/archive/S027-ford-heritage-vault-racing-heritage-gt40-concept.pdf`
- SHA-256: `adc9ad5d300953633917e53ee913dae2a56472dde13bc6a94a1afbd40d279c0b`

## What was inspected

- Ford Heritage Vault detail record for REFD `AR-74-18056.46.2186`.
- Detail-page metadata exposed in the returned HTML.
- The attached Ford Heritage Vault media asset, downloaded as a PDF and archived locally.
- Local `pdfinfo` output, which reported 4 pages and Adobe Acrobat Paper Capture metadata.
- Local `pdftotext -layout` extraction after Poppler installation.
- Page images rendered from the archived PDF with `pdftoppm` and visually inspected.

## Extracted record metadata

- The record title is `Racing Heritage: GT40 Concept Builds on a Proud History`.
- The record's media type is `Textual`.
- The detail record's subject links include `press releases`, `North American International Auto Show (NAIAS)`, `GT40`, `GT40 (concept vehicle)`, `Ford, Henry II`, `24 Hours of Le Mans`, and `GT`.
- The record exposes a Ford Heritage Vault media-access link and thumbnail link for the textual asset.
- The media-access response is a PDF with filename `access-ar_74_18056_061_060.pdf`; it is archived locally under the S027 filename listed above.

## Extracted PDF facts

- Page 1 identifies the article as `Racing Heritage: GT40 Concept Builds on a Proud History`, associated with `2002 NAIAS`, and presented as a Ford media article printout.
- Page 1 frames the original GT40 program as a Ford effort under Henry Ford II that reached the top level of international motorsports and remained there for four racing seasons.
- Page 1 says Ford withdrew from the 1957 Automobile Manufacturers Association racing agreement in 1962 and launched a broad racing campaign connected to `Ford Total Performance`.
- Page 2 says Ford needed a 200-mph mid-engined car for Le Mans and then, after Ferrari negotiations failed, formed the Britain-based Ford Advanced Vehicles division.
- Page 2 links Roy Lunn, Ray Geddes, and Donald Frey to the racing effort after the Mustang I work.
- Page 2 says elements of the Lola GT, including a monocoque center section, broad side sills that doubled as fuel tanks, and aerodynamic profile, carried into GT40 development.
- Page 2 describes the April 1964 Ford GT as longer, wider, and sleeker than the Lola, with a rigid steel center section and unstressed front and rear fiberglass body panels.
- Page 2 describes that early Ford GT as using an all-aluminum 4.2-liter Indianapolis V-8, a 4-speed Colotti transaxle, computer-designed double-wishbone suspension, and 11.5-inch disc brakes at each wheel.
- Page 3 says the `GT40` number was added retrospectively with the Mark II and refers to the car's height in inches.
- Page 3 says Carroll Shelby worked on installing a more reliable 7-liter stock-car engine into what became known as the Mark II.
- Page 3 says Ford tested the GT40 Mark II in the wind tunnel and on a special dynamometer simulating a 48-hour Le Mans circuit run.
- Page 3 says Ford achieved a 1-2-3 victory at 1966 Le Mans and describes the 1967 Mark IV as an all-Dearborn creation using aluminum honeycomb bonded with aerospace techniques instead of steel.
- Page 4 says the FIA capped engine displacement at 5 liters and that, under Gulf Oil sponsorship, Mark I GT40s returned to win Le Mans in 1968 and again in 1969.

## Extraction note

The PDF did not expose useful text through raw `strings`, but after Poppler was installed, `pdftotext -layout` extracted usable text. Rendered page images were also inspected to confirm the article structure and page-level content. Do not promote any additional claims from the PDF body until they are checked against the local PDF, text extraction, or rendered pages and added to `knowledge/data/fact-register.csv`.

## Mechanic-facing implications

- Use S027 as an official Ford press-release archive anchor for Ford-authored GT40 racing-heritage context.
- Use it for Ford-authored context around GT40 program origin, early Ford GT prototype attributes, Mark II/Mark IV historical development, and Gulf-era Mark I Le Mans wins.
- Keep S025 as the stronger official source for the 1968 classified Le Mans winner row.
- Do not use S027 to infer the user's chassis identity, installed engine displacement, Gurney-Weslake 302 details, race-preparation settings, service settings, or installed-car configuration.

## What this source does not prove

- It does not identify the user's chassis, engine, heads, transaxle, brakes, wheels, tires, or safety equipment.
- It does not provide mechanic-ready service specifications.
- It does not verify the 1968 winner's driver pair, participant number, lap count, chassis number, or preparation details; keep S025 as the official extracted 1968 winner-row source.
- It does not unblock any setting in `knowledge/data/settings-register.csv`.
