# Phase Handoff - Evidence-Controlled Starter Package

## Status

This phase establishes `Master-Mechanic` as a standalone, portable, source-backed GT40 mechanics knowledge base and assistant package.

The package is usable as an evidence-controlled assistant foundation. It is not yet a complete mechanic settings compendium because the installed car and several high-value primary service sources remain unverified.

## What is complete in this phase

- Standalone project identity: `Master-Mechanic`.
- Repository operating rules in `AGENTS.md`.
- Portable formats only: Markdown, CSV, and YAML.
- Human index: `knowledge/index.md`.
- Machine-readable manifest: `knowledge/manifest.yaml`.
- Source register: `sources/source-register.csv`.
- Fact register: `knowledge/data/fact-register.csv`.
- Data dictionary: `knowledge/data/README.md`.
- Settings compendium: `knowledge/07-settings-compendium.md`.
- Configuration, parts, and settings registers:
  - `knowledge/data/configuration-register.csv`
  - `knowledge/data/parts-register.csv`
  - `knowledge/data/settings-register.csv`
  - `knowledge/data/evidence-gap-register.csv`
- Every setting in `knowledge/data/settings-register.csv` is mapped to at least one gap in `knowledge/data/evidence-gap-register.csv`, and `tools/validate-portable-index.rb` enforces that coverage.
- System pages for:
  - chassis and body;
  - engine and induction;
  - driveline and transaxle;
  - suspension and steering;
  - brakes, wheels, and tires;
  - fuel, oil, and cooling;
  - electrical and instruments;
  - safety systems.
- Capture templates for source, chassis/body, engine/induction, driveline/transaxle, suspension/steering, fuel/oil/cooling, electrical/instruments, brakes/wheels/tires, and safety/event readiness.
- Project-local assistant agent: `.github/agents/GT40MasterMechanic.agent.md`.
- Project-local reusable skills:
  - mechanic question routing;
  - source triage;
  - configuration control;
  - component identification;
  - settings governance;
  - safety/event readiness;
  - vintage racecar diagnostics.
- Assistant acceptance/evaluation cases in `knowledge/06-assistant-evaluation.md`.
- Portable validation tool: `tools/validate-portable-index.rb`.

## Strongest captured sources

- S009 - FIA Appendix J 1968.
- S014 - FIA Historic Database cars list / HTP guidance.
- S015 - FIA Ford GT 40 Recognition/Homologation No. 224 Group 4 research copy.
- S016 - Hewland Classic LG500/LG600 manual.
- S018 - Webcon official Weber/IDA support pages.
- S019 - FIA Appendix K 2025 updated 2026.
- S020 - The Henry Ford Ford Motorsports Records collection path.
- S021 - The Henry Ford Dave Friedman Collection path.
- S022 - The Henry Ford remote research-services path.
- S023 - Official 24H Le Mans / ACO track-record source path.
- S024 - Gurney-Weslake official homepage.
- S025 - Official 24H Le Mans palmarès API 1968 winner row.

## Mechanic-ready guidance available now

The assistant can safely support:

- source triage and evidence ranking;
- component-identification checklists;
- chassis/body, engine, driveline, suspension, brake, wheel, tire, fuel, oil, cooling, electrical, and safety evidence capture;
- regulatory and homologation context from FIA sources;
- GT40 No. 224 recognition-form interpretation at a context level;
- Gurney-Weslake head identification prompts;
- Hewland LG500/LG600 manual routing when an installed unit is verified as applicable;
- Weber/IDA documentation and parts-source routing when installed carburetors are verified as applicable;
- safety/event-readiness evidence capture against current Appendix K gates.

## What remains blocked

Do not provide final values for:

- torque;
- rev limit;
- valve lash;
- ignition timing or distributor curve;
- spark plug type, reach, heat range, or gap;
- Weber jetting, choke size, float setting, pump volume, idle mixture, linkage synchronization, or fuel pressure;
- oil type, fill quantity, pressure target, relief setting, or priming procedure;
- coolant capacity, cap pressure, thermostat/restrictor value, or bleed method;
- transaxle oil, fill quantity, gear ratios, differential preload, backlash, or selector setup;
- clutch adjustment;
- ride height, corner weights, spring rates, damper settings, anti-roll-bar settings, camber, caster, toe, or bump-steer settings;
- brake bias, master-cylinder sizing, pad bedding, fluid, pressure targets, or center-lock torque;
- tire pressure;
- wheel-bearing or hub preload/end-float settings;
- fuse/relay ratings, gauge/sender calibration, warning thresholds, or wiring changes;
- structural repair dimensions, material specifications, bonding settings, or welding settings.

These remain blocked until exact installed hardware and applicable source evidence are both available.

## Installed evidence needed from the car

Collect and index:

- chassis plate, tub stampings, title/provenance records, and restoration records;
- engine block casting/date, main-cap arrangement, bore/stroke measurements, crankshaft markings, rods, pistons, and builder marks;
- Gurney-Weslake head casting/foundry marks, serials, port form, chamber form, valve sizes, plug details, rocker details, manifold angle, and repair history;
- cam card, rocker ratio, pushrods, springs, installed heights, and lifter type;
- carburetor body model/series/serials, choke sizes, jet stacks, emulsion tubes, pump jets, linkage, manifold marks, spacers, and fuel-pressure gauge location;
- ignition distributor/trigger system, coil/box, plug wires, plugs, and tach drive;
- fuel tank/cell type, date, foam, capacity, filler caps, vents, pumps, regulator, filters, hose spec/date, and line routing;
- oil sump/tank/pump/cooler/filter/thermostat/relief/breather/catch-tank layout;
- radiator, water pump, fans, cap, thermostat/restrictor, hose age, bleed points, and pressure-test results;
- transaxle manufacturer, model, serial, case marks, gear stack, final drive, LSD identity, cooler/vent, and clutch/release details;
- suspension pickup points, arms, uprights, springs, dampers, anti-roll bars, shim packs, ride height, alignment as found, and tire data;
- steering rack, column, joints, supports, steering arms, stops, wheel hub, and bump-steer measurement;
- brake calipers, discs, pads, masters, balance mechanism, lines, hose dates, fluid, ducts, and pedal ratio;
- wheels, hubs, peg drives, center-lock nuts, thread directions, retainers, wheel sizes/offsets, tires, tubes, valves, and tire dates;
- harness, grounds, fuses, relays, connectors, alternator/generator, starter, battery, master switch, instruments, senders, switches, and warning lights;
- belts, seat, anchors, extinguisher/fire system, fuel/fire bulkheads, ROPS/cage, mirrors, rear warning light, battery protection, line protection, and event regulations.

## Source acquisition still needed

Highest-value next sources:

1. Period Ford/FAV/JWA GT40 service, race-preparation, engine-build, or parts documentation.
2. Gurney-Weslake or Weslake cylinder-head drawings/specifications: valve sizes, chamber volume, plug spec, repair limits, rocker/valvetrain data.
3. Engine build sheet for the installed 302.
4. Official 1968 Le Mans race program, entry list, scrutineering record, Ford/JWA record, chassis record, or ACO-licensed source for engine, lap count, full entrant name, chassis, and preparation details beyond the S025 winner row.
5. ZF 5DS-25 documentation if the installed unit is base ZF rather than Hewland.
6. Brake, wheel, hub, center-lock, and tire documentation for installed hardware.

Use `knowledge/procedures/evidence-request-packet.md` to request these items from owners, shops, archives, component specialists, and event authorities in a structured way.

## Validation command

Run:

```bash
ruby tools/validate-portable-index.rb
```

Expected result:

```text
Portable index validation passed
```

## Recommended wrap-up action

Before pausing this phase, confirm validation passes and optionally commit the repository. The current package should remain open for future source and installed-hardware evidence rather than being marked complete against the full mechanic-settings objective.
