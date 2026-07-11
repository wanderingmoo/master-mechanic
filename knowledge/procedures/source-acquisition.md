# Source Acquisition Procedure

## Purpose

Use this procedure when adding any new manual, homologation form, archive page, service bulletin, build sheet, race record, or component document to the knowledge base.

The goal is to keep research portable, source-backed, and safe for mechanic use.

## Acquisition order

1. Search for a primary source before using a secondary source.
2. Record the source in [../../sources/source-register.csv](../../sources/source-register.csv) before extracting facts.
3. If the source contains multiple relevant claims, create a note in [../../sources/notes](../../sources/notes) using [../templates/source-note-template.md](../templates/source-note-template.md).
4. Decide whether the raw source file can be safely committed to a publishable repository. If not, store metadata, page/box identifiers, checksums where available, and extracted facts rather than the full file.
5. For PDF sources, follow [pdf-source-extraction.md](pdf-source-extraction.md) before promoting body claims.
6. For JSON or API sources, follow [json-api-source-extraction.md](json-api-source-extraction.md) before promoting payload fields.
7. Extract only supported claims into [../data/fact-register.csv](../data/fact-register.csv).
8. If the source identifies installed hardware, update [../data/parts-register.csv](../data/parts-register.csv) and [../data/configuration-register.csv](../data/configuration-register.csv).
9. If the source provides a numeric setting, route it through [settings-governance.md](settings-governance.md) before marking it actionable.

## Priority source paths

| Source target | Preferred path | Use |
|---|---|---|
| GT40 FIA homologation / recognition form | FIA Historic Database, national ASN, FIA Historic Technical Passport process | Period identity, dimensions, recognized components, event eligibility. |
| Event-valid homologation copy | ASN-certified copy as described by FIA HTP guidance | Historic-event compliance; research downloads are not event-valid by themselves. |
| Ford / FAV / JWA period documents | Ford archives, Ford Heritage Vault S003, The Henry Ford paths S020-S022 and S028, reputable archive scans, period service bulletins | Chassis, body, race-prep, and service context. |
| Gurney-Weslake engine records | Engine build sheet, Weslake/Gurney-Weslake documents, trusted specialist archive | Bore, stroke, heads, cam, lash, compression, plugs, ignition, oiling, rev limit. |
| Transaxle records | Installed-unit tag plus manufacturer/service documentation | Oil, preload, backlash, ratios, shift adjustment, LSD service. |
| Brake records | Installed caliper/master/disc IDs plus maker documentation | Seal service, bedding, fluid compatibility, bias, pressure checks. |
| Tire records | Current tire manufacturer data for the installed tire | Pressure, age, construction limits, heat-cycle handling. |

## Source status labels

| Label | Meaning |
|---|---|
| `verified` | Source has been inspected and supports the extracted claim. |
| `candidate` | Source path is credible but not yet captured or inspected. |
| `lead_only` | Useful for locating better evidence, not for mechanic-facing settings. |
| `blocked` | Source is unavailable, paywalled, access-controlled, contradictory, or too weak for extraction. |

## Capture note template

For a new multi-fact source, create `sources/notes/S###-short-title.md` with:

- Source ID
- Title
- URL or local archive path
- Source type and tier
- Date accessed
- What was inspected
- Extracted facts
- Mechanic-facing implications
- What the source does not prove

For archived PDFs, also record the extraction method: `text-extracted`, `rendered-inspected`, `metadata-only`, or `archived-not-extracted`.

For archived JSON/API payloads, record the extraction method: `json-archived-parsed`, `json-live-inspected-only`, or `json-metadata-only`.

## Publication-safe archive rule

The repository is intended to be portable and publishable. Do not commit a raw source file just because it is useful. Commit the raw file only when it is public and appropriate to redistribute, user-provided for this repo, or otherwise cleared for repository storage. For restricted archive reproductions, commercial manuals, copyrighted books, or controlled-access scans, create a source note with provenance, request path, page or folder identifiers, and extracted facts, then keep the controlled file outside the public repo unless rights are confirmed.

## Specific caution for the GT40 project

The Ford GT 40 FIA Recognition/Homologation No. 224 research copy is captured as S015. That source provides the GT40 Group 4 recognition baseline and 1968 Weslake/302/gearbox/LSD extensions, but it does not prove this vehicle’s chassis identity, installed hardware, current condition, or setup values. Event use still requires ASN-certified paperwork under S014.

## The Henry Ford / Dave Friedman request targets

Source S028 archives the Dave Friedman Collection finding aid. When requesting remote research from The Henry Ford, use its exact accession and folder paths:

- Accession 2009.158, Ford Motor Company Racing, Box 116, Endurance 1968: 24 Hours of Le Mans; 24 Hours of Daytona; 12 Hours of Sebring; BOAC 500; Watkins Glen 6-Hour; 1000 Km Monza; 1000 Km Nürburgring; 1000 Km Spa.
- Accession 2009.158, Ford Motor Company Racing, Box 117, GT Program: GT 40; 1964 FAV Slough Factory; 1965-1966 General; J-Car; Daytona Track Tests; Riverside Track Tests; Dearborn Testing.
- Accession 2009.158, Research Files / Shelby Racing, Box 160: correspondence and reports, 1962-1968.

Ask first for page counts, item lists, and reproduction availability. Any supplied scan or packet must become its own source record before it supports mechanic-facing facts.
