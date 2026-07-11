# S023 - 24H Le Mans Official Track-Record Page

## Source

- Source ID: S023
- Title: 24H Le Mans Winners and Records official track-record page
- Type: official 24H Le Mans / ACO race-history page
- Evidence tier: 1
- URL: https://www.24h-lemans.com/en/track-record
- Local status: verified source path; official API path identified and indexed as S025
- Capture date: 2026-07-11

## Why this matters

This is the official online path for Le Mans winners, records, lap records, and race results. It is therefore the correct first target for promoting the 1968 Le Mans result context above the secondary S013 lead.

## Extracted facts

- The page title identifies the page as Le Mans winners, all-time results, and race records.
- The page metadata describes the page as the official all-time race-history source since 1923.
- The rendered page identifies the section as Winners and Records / Track Record.
- The page is published under the 24H Le Mans site with ACO organization metadata in the page payload.

## API route found

Inspection of the page payload and JavaScript route identified the official palmarès API pattern used by the page. The 1968 year endpoint is indexed separately as S025 and verifies the core 1968 winning row.

## Extraction boundary

The accessible static HTML itself does not expose text for 1968, Rodriguez, Bianchi, Ford, GT40, or JWA. Those fields were captured from the official API route behind the page and are indexed as S025. Engine displacement, lap count, full entrant legal name, chassis number, and preparation details remain outside S023/S025.

## Mechanic implications

- Use this source as the official online acquisition path for Le Mans result verification, with S025 as the extracted 1968 API row.
- Do not treat it as a service specification, race-preparation sheet, engine build sheet, or GT40 component source.
- Promote only the row fields verified in S025. Do not promote engine or lap-count claims from S013 until an official entry list, race program, scrutineering document, JWA/Ford record, or ACO-licensed publication is inspected directly.

## Next acquisition step

Inspect an ACO-licensed Le Mans annual/history volume, race program, entry list, or archive record that lists the 1968 winning GT40 entry with lap count, engine, chassis, and preparation details.
