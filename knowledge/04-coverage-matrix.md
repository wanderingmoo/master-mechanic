# Coverage Matrix

## Purpose

Track completeness of the GT40 mechanics knowledge base against the full objective: a comprehensive, source-backed, system-organized mechanics assistant for a 1968-era Ford GT40 Mk I with Gurney-Weslake 302 configuration.

This file is the completion-audit control surface. A system is not complete just because a page exists. It needs source-backed facts, component identification gates, part records, settings governance, procedures/templates where useful, and clear unresolved evidence needs.

## Coverage status definitions

- `baseline_captured`: Primary or strong support source captured for period/context baseline.
- `component_support_captured`: Component manual/support path captured, but installed hardware still unverified.
- `indexed_placeholder`: System page/register entries exist, but primary component evidence is still missing.
- `settings_blocked`: Numeric setup values are intentionally blocked pending installed hardware and source evidence.
- `mechanic_ready_partial`: Safe inspection/identification guidance is usable, but service settings remain limited.
- `complete`: All required evidence for the stated scope is captured, indexed, and validated.

## Current system coverage

| System | Current status | Strongest captured sources | What is mechanic-ready now | Blocking gaps before full mechanic settings |
|---|---|---|---|---|
| Identity and provenance | indexed_placeholder | S014, S015 | Chassis identity and homologation-copy rules are defined. | Chassis number, provenance records, build/restoration records, event-use document requirements. |
| Regulatory / homologation | baseline_captured | S009, S014, S015 | 1968 Appendix J context and Ford GT 40 No. 224 baseline are source-backed. | ASN-certified homologation copy if event HTP use is required; any event-specific current rules. |
| Chassis and body | baseline_captured; settings_blocked | S009, S015 | Homologated wheelbase, track, weight context, and material baseline are captured. | Actual chassis identity, tub condition, repair history, material verification, body/clip configuration. |
| Engine short block | baseline_captured; settings_blocked | S009, S015 | 1968 302 evolution bore/stroke/displacement/crank part context is captured. | Installed block/crank IDs, bore/stroke measurement, compression, cam, bearings, clearances, build sheet. |
| Gurney-Weslake heads | baseline_captured; settings_blocked | S015, S024 | Weslake aluminium head variant, part number 3/3710, and Gurney-Weslake official race-head versus road-head identification context are captured. | Installed head markings/foundry marks, valve sizes, chamber data, plug spec, repair limits, lash/cam compatibility. |
| Induction / Weber | component_support_captured; settings_blocked | S018 plus lead-only S004/S013 | Official Weber/IDA support path is captured for diagrams, literature categories, and 46/48 IDA gasket/service/master-rebuild kit leads once carburetor identity is known. | Installed carburetor model/series, choke sizes, jet stack, fuel pressure, linkage, manifold, period GT40 tune data. |
| Ignition | indexed_placeholder; settings_blocked | S009 | Regulation context says ignition was freer than core engine identity. | Distributor/trigger system, curve, coil/box, plugs, fuel, engine build sheet, dyno/road evidence. |
| Exhaust | indexed_placeholder; settings_blocked | S009 | Regulation context says exhaust was freer than core engine identity. | Installed header/collector/silencer design, heat shielding, oxygen/leak checks, tune impact. |
| Fuel, oil, and cooling | baseline_captured; settings_blocked | S009, S015, S019 | Period safety prompts, S015 item-number boundaries for fuel capacity, lubrication/cooling, and fuel pump evidence, current Appendix K fuel/fire-safety gates, and a capture template are indexed. | Tank/cell capacity and certification, fuel pump/regulator/hoses, wet/dry-sump identity, tank/sump/cooler/filter/thermostat/relief layout, oil type/quantity/pressure targets, radiator/fan/cap/bleed data. |
| Driveline / transaxle | component_support_captured; settings_blocked | S009, S015, S016, S017 | Base ZF and 1968 Hewland LG600 evolution are captured; LG500/LG600 manual cautions are indexed. | Installed transaxle ID, serial, gearset, final drive, LSD type, oil/fill, preload/backlash, clutch release geometry. |
| Suspension and steering | baseline_captured; settings_blocked | S009, S015 | Independent/coil-spring recognition context is captured; S015 item numbers 70-74, 78-82, and 60-63 are indexed as suspension/steering capture prompts and evidence boundaries; a suspension/steering capture template and blocked spring/damper/bar setting gate exist. | Actual pickup points, uprights, arms, spring/damper/bar data, shim packs, rack/column/steering-arm IDs, ride height, tires/use case, bump-steer data. |
| Brakes | baseline_captured; settings_blocked | S009, S015 | Hydraulic brake and fail-safe period context is captured; S015 brake item numbers 91-105 and brake/hub photo anchors are indexed as inspection prompts and evidence boundaries. | Calipers, discs, masters, balance bar/proportioning, pads, fluid, bedding, torque values, pressure/bias data. |
| Wheels and tires | baseline_captured; settings_blocked | S015 | S015 wheel item numbers 50-54 and track-change warning are captured; blank wheel-detail fields are explicitly indexed as a boundary. | Wheel make/size/offset, center-lock thread/torque source, hub/peg condition, tire model/date/construction/pressure source. |
| Electrical / instruments | baseline_captured; settings_blocked | S009, S015, S019 | Period battery/circuit-breaker prompts, S015 item-number boundaries for ignition/generator/battery evidence, current Appendix K battery/master-switch/warning-light gates, and an electrical capture template are indexed. | Wiring diagram, harness condition, grounds, fuses/relays, charging system, gauges/senders, master switch layout. |
| Safety systems | baseline_captured; settings_blocked | S009, S014, S019 | Current Appendix K safety/event-readiness baseline is archived and indexed; safety system page exists. | Specific event rules, HTP state, installed belts/fire system/fuel cell/cage/seat/firewall/battery/master switch/warning light condition and dates. |
| Assistant agent and reusable skills | mechanic_ready_partial | Local agent and skill files; S020-S023 | Agent, mechanic-question-routing, source-triage, configuration-control, component-identification, settings-governance, safety-event-readiness, and diagnostics skills are installed locally; official archive and ACO/Le Mans source paths are indexed for deeper Ford/GT40 source requests. | Needs more system-specific source depth before it can answer broad service-setting questions. |

## Completion gates

Before the overall goal can be marked complete, each major system must have:

1. A system page under `knowledge/systems/`.
2. Source register entries for every supporting external source.
3. Source notes for every multi-fact source.
4. Fact-register entries for extracted claims.
5. Configuration and parts-register evidence gates for installed hardware.
6. Settings-register state for each relevant numeric/actionable setting.
7. Local archive and checksum for downloaded PDFs/manuals when available.
8. Assistant agent/skill assets, capture templates, source notes, system pages, and procedures indexed in `knowledge/manifest.yaml`.
9. Validation passing through `ruby tools/validate-portable-index.rb`, including duplicate-ID, source-reference, checksum, assistant-asset, template, and portability checks.

## Next recommended research targets

1. Use S020-S022 to request period JWA/Ford GT40 302 engine build, race-preparation, Ford press, performance-testing, production-record, or part-drawing material.
2. Use S023, an ACO-licensed Le Mans history volume, or an official race program/entry list to capture the 1968 Le Mans result row directly before promoting S013 race-result details.
3. Gurney-Weslake cylinder-head service drawings, valve/plug/chamber data, or repair-limit source beyond S024 identification context.
4. Installed car evidence: chassis number, engine/block/head photos, carburetor IDs, transaxle ID, brake hardware, wheel/hub/tire data.
5. ZF 5DS-25 component documentation in case the installed unit is base ZF rather than Hewland.
6. Brake/wheel/center-lock component manuals or period GT40 service references.
