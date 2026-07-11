# Research Backlog

## Purpose

Track missing evidence needed before the knowledge base can become a comprehensive mechanic-facing reference. This backlog keeps source acquisition, part identification, settings, and configuration gaps explicit.

## Highest-priority source targets

| Priority | Target | Why it matters | Current status |
|---|---|---|---|
| P1 | Ford GT40 Mk I FIA homologation/recognition form | Controls Group 4 identity, recognized equipment, dimensions, and weight | Research copy captured as S015; ASN-certified event copy still needed if HTP/event use is in scope |
| P1 | Chassis identity and provenance records | Determines whether the car is original, continuation, replica, rebuilt, or modified | Unknown |
| P1 | Engine build sheet for the installed Gurney-Weslake 302 | Required for bore, stroke, heads, compression, cam, lash, ignition, oiling, and rev limit | Unknown |
| P1 | Transaxle manufacturer/model/serial and service manual | Required for oil, fill quantity, preload, backlash, ratios, and shift adjustment | Hewland LG500/LG600 manual captured as S016 for the S015 LG600 evolution; installed unit remains unknown |
| P1 | Brake hardware and service documentation | Required for master cylinders, bias, pad bedding, fluid, torque, and safety inspection | Unknown |
| P2 | Period Ford/FAV/JWA GT40 service and race-preparation documents | Needed to move from lead-only historical context to period mechanic guidance | Ford Heritage Vault is now captured as S003 and its GT40 search returned 84 records; The Henry Ford Ford Motorsports Records, Dave Friedman Collection, and remote research services are captured as S020-S022 acquisition paths; specific service/prep documents still not obtained |
| P2 | Gurney-Weslake or Weslake cylinder-head documentation | Needed to verify head identity, valve gear, plugs, chambers, and repair limits | S024 official Gurney-Weslake homepage captured for development/versioning and GT40 race-head versus road-head identification context; service drawings, valve data, plug data, chamber volumes, and repair limits remain open |
| P2 | Weber IDA or installed-induction documentation | Needed if Webers are installed; required for model-specific parts, jetting, float, linkage, and fuel-pressure work | Webcon official Weber/IDA support path and 46/48 IDA service-kit product-code leads captured as S018; installed carburetor model and period GT40 jetting remain unknown |
| P2 | ACO/Le Mans official result and entry records for 1968 | Needed to promote race-result context above secondary lead status | S023 captures the official 24H Le Mans / ACO online result path, but the specific 1968 row was not extractable from the static payload; S013 result details remain lead-only until an official row, ACO-licensed source, entry list, or race program is captured |
| P2 | ZF 5DS-25 or installed-transaxle component documentation | Needed if the installed unit is ZF; otherwise replace with the actual component source | Hewland LG500/LG600 captured as S016; ZF base documentation still open and installed unit unknown |

## Rules for closing backlog items

- A backlog item closes only when the source is indexed in `sources/source-register.csv`, any extracted fact is in `knowledge/data/fact-register.csv`, and a source note exists under `sources/notes/` for multi-fact sources.
- Settings remain non-actionable until the exact installed component and applicable source are both verified.
- If a source is only a secondary article, forum post, auction listing, or unsourced web page, mark the related fact `lead_only`.
