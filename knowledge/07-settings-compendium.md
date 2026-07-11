# Settings Compendium

## Purpose

This file is the mechanic-facing settings map for the 1968-era Ford GT40 Mk I / Gurney-Weslake 302 knowledge base. It translates `knowledge/data/settings-register.csv` into a system-by-system working reference.

Current state: every setting below is intentionally blocked until the exact installed component and an applicable source are both known. This is a safety feature, not a missing-value shortcut. Generic Ford 302, generic GT40, replica, Pantera, Weber, ZF, Hewland, or vintage-race practice is not enough to set this car.

Use the CSV register as the machine-readable source of truth:

- Settings: `knowledge/data/settings-register.csv`
- Evidence gaps: `knowledge/data/evidence-gap-register.csv`
- Parts and assemblies: `knowledge/data/parts-register.csv`
- Configuration: `knowledge/data/configuration-register.csv`
- Governance procedure: `knowledge/procedures/settings-governance.md`

## Actionability rule

A setting becomes actionable only when the record has:

1. Exact installed component identity.
2. Applicable source ID.
3. Applicability statement.
4. Unit and condition.
5. Inspection or measurement prerequisite.
6. Reversibility or lockout note when safety-critical.

If any of those are missing, provide inspection and identification steps instead of a numeric value.

## Engine and induction settings

| ID | Setting | Current state | Source basis | Required before value | Safe next action |
|---|---|---|---|---|---|
| ST001 | Ignition advance curve | Blocked | S009 plus S005/S006 leads | Engine build sheet, compression ratio, cam, fuel, distributor/ignition type, dyno or period prep data | Capture engine build and ignition hardware before setting timing. |
| ST002 | Valve lash | Blocked | S024 identifies head context only; S005/S006 are leads | Cam card, lifter type, rocker ratio, head/valvetrain documentation | Inspect cam and valvetrain records before advising lash. |
| ST003 | Spark plug type and gap | Blocked | S024 identifies head context only; S005/S006 are leads | Head plug reach/seat, compression, ignition box/coil, fuel type | Verify head plug specification and ignition system before fitting plugs. |
| ST004 | Weber jetting and choke size | Blocked | S018 supports Weber/IDA documentation and parts path after model verification | Carburetor model/series, choke size, emulsion tubes, jets, fuel pressure, linkage condition, engine build sheet | Document carburetor stack before adjustment; use S018 only after the Weber family is confirmed. |
| ST005 | Fuel pressure | Blocked | S018 supports Weber/IDA source path after component verification | Pump/regulator IDs, carburetor specification, gauge calibration, line routing, leak status | Measure with a known-good gauge only after leak inspection and carburetor identification. |

Do not provide engine or induction values for timing, lash, plug gap, jetting, float level, idle mixture, fuel pressure, rev limit, or torque until the installed build and source applicability are proven.

## Fuel, oil, and cooling settings

| ID | Setting | Current state | Source basis | Required before value | Safe next action |
|---|---|---|---|---|---|
| ST006 | Engine oil type and quantity | Blocked | S015 includes lubrication/capacity fields but leaves actionable values blank | Wet/dry-sump layout, tank/sump, cooler, filter, pump, builder data | Map the oil system before filling or recommending oil. |
| ST007 | Oil pressure target | Blocked | S015 does not provide oil-pressure targets | Engine clearances, pump/relief setup, oiling layout, builder data | Prime and verify pressure only after system identification. |
| ST020 | Fuel fire-safety compliance | Blocked | S019 provides current historic fuel/fire-safety gates | Tank/cell type/date/capacity, foam or safety tank evidence, filler caps, line material/pressure rating, routing, bulkheads, event rules | Inspect and document tank, foam/cell, fillers, vents, lines, and bulkheads before filling or pressure testing. |

Cooling has open component evidence in the gap register, but no numeric coolant capacity, cap pressure, thermostat, restrictor, fan, or bleed setting should be given until the installed cooling layout is documented.

## Driveline and transaxle settings

| ID | Setting | Current state | Source basis | Required before value | Safe next action |
|---|---|---|---|---|---|
| ST008 | Transaxle oil type and fill quantity | Blocked | S016 applies only if LG500/LG600 applicability is verified | Transaxle make/model/serial and service manual applicability | Identify the unit; if Hewland LG600 is confirmed, inspect S016 directly before specifying oil or fill. |
| ST009 | LSD preload, backlash, and gear setup | Blocked | S016 gives LG500/LG600 setup cautions only after unit applicability is verified | Transaxle/differential model, gear stack, differential type, service manual | Do not adjust until the unit is identified and source applicability is confirmed. |

No ratio, preload, backlash, selector, clutch-release, or lubricant recommendation is actionable until the installed transaxle and differential are identified.

## Suspension and steering settings

| ID | Setting | Current state | Source basis | Required before value | Safe next action |
|---|---|---|---|---|---|
| ST010 | Camber, caster, and toe | Blocked | S015 verifies independent/coil suspension only | Chassis identity, pickup points, shims, uprights, tires, ride height, use case | Record as-found geometry before applying targets. |
| ST011 | Ride height and corner weights | Blocked | S015 does not provide ride height, spring rate, damper, anti-roll-bar, or corner-weight values | Chassis identity, spring/damper/bar data, tire data, fuel/driver ballast, use case | Record as-found with known fuel load and ballast. |
| ST017 | Steering ratio and bump-steer setup | Blocked | S015 steering fields are blank | Rack make/ratio, steering-arm geometry, column/joint condition, stops, ride height, wheel/tire package, bump-steer measurement | Document rack, column, upright, and steering-arm identifiers; measure bump steer before adjustment. |
| ST022 | Spring, damper, and anti-roll-bar setup | Blocked | S015 leaves stabiliser and shock-absorber fields blank | Spring rates/free lengths, damper make/model/serial and valving/click positions, anti-roll-bar geometry, motion ratios, corner weights, tire construction, use case | Identify and record springs, dampers, bars, links, and as-found positions before recommending rates, clicks, preload, or bar settings. |

Do not transfer alignment or ride-height numbers from another GT40 or replica. The installed chassis, tires, suspension geometry, event type, and safety state control the setting.

## Brakes, wheels, and tires settings

| ID | Setting | Current state | Source basis | Required before value | Safe next action |
|---|---|---|---|---|---|
| ST012 | Brake bias and master-cylinder sizing | Blocked | S015 confirms hydraulic brakes but leaves dimensions/settings blank | Calipers, discs, pad compound, master cylinders, pedal ratio, balance bar, tire data | Map the brake system before pressure or bias adjustment. |
| ST013 | Center-lock torque | Blocked | S015 does not populate wheel attachment details | Wheel/hub/nut manufacturer, thread direction, lubricant condition, service data | Identify hardware before torque recommendation. |
| ST014 | Tire pressure | Blocked | S015 does not provide tire data | Tire model, age, construction, wheel size, vehicle weight, use case, tire maker data | Record tire details and intended use before pressure guidance. |

Center-lock torque, tire pressure, brake-bias, bedding, fluid, and master-cylinder values are safety-critical. They require installed hardware evidence and an applicable component or event source.

## Electrical and instruments settings

| ID | Setting | Current state | Source basis | Required before value | Safe next action |
|---|---|---|---|---|---|
| ST015 | Fuse/relay ratings and charging output | Blocked | S015 includes generator/battery fields but leaves actionable values blank | Wiring diagram, alternator/generator, loads, wire gauges, protection devices | Map the harness before energizing or resizing protection. |
| ST016 | Master switch/circuit breaker layout | Blocked | S009 provides period context; S015 does not provide layout | Harness map, battery location, alternator/generator, event rules, safety-system documentation | Use FIA period context as prompt, then verify current event requirements. |
| ST019 | Battery and master-switch compliance | Blocked | S019 provides current Appendix K safety gates | Battery chemistry/location/cover/terminal protection, master-switch type/location/marking, charging shutdown behavior, fire-system circuit exception, inside/outside accessibility | Test and document master-switch behavior with installed charging and ignition systems before energizing unknown wiring. |

Do not resize fuses, relays, wire gauges, grounds, battery cables, or charging components from appearance or generic harness practice.

## Safety and event-readiness settings

| ID | Setting | Current state | Source basis | Required before value | Safe next action |
|---|---|---|---|---|---|
| ST018 | Appendix K event safety readiness | Blocked | S019 provides current Appendix K safety and event-readiness context | Current event regulations, HTP/period classification, installed safety equipment IDs/dates, fuel tank/foam/caps/lines, bulkheads, extinguisher/fire system, belts/anchors, ROPS, mirrors, warning light | Build a safety evidence packet and check against the event's current regulations before declaring ready. |
| ST021 | Harness and restraint compliance | Blocked | S019 provides current historic harness and restraint gates | Harness FIA standard/date, manufacturer instructions, routing angles, anchor locations/plates/bolts, seat pass-throughs, chafe points, collision/damage history, event FHR requirement | Photograph and measure belt routing and anchorages; replace any damaged, degraded, rusted, deformed, or imperfectly functioning harness. |

Safety readiness is not a single setting. It is a system-level evidence packet combining event rules, current safety regulations, installed equipment, expiration dates, mounting condition, and functional tests.

## Fast lookup by setting family

| Family | Setting IDs |
|---|---|
| Engine tune | ST001, ST002, ST003 |
| Weber / fuel delivery | ST004, ST005 |
| Oil system | ST006, ST007 |
| Transaxle / differential | ST008, ST009 |
| Alignment / chassis setup | ST010, ST011, ST017, ST022 |
| Brakes / wheels / tires | ST012, ST013, ST014 |
| Electrical / instruments | ST015, ST016, ST019 |
| Fuel and fire safety | ST020 |
| Event safety / restraints | ST018, ST021 |

## How to update this compendium

When a setting moves out of `blocked`:

1. Update `knowledge/data/settings-register.csv`.
2. Update or close the relevant row in `knowledge/data/evidence-gap-register.csv`.
3. Add the applicable source to `sources/source-register.csv`.
4. Add a source note under `sources/notes/` when the source has more than one extracted fact or a mechanic-facing setting.
5. Add extracted facts to `knowledge/data/fact-register.csv`.
6. Update the affected system page under `knowledge/systems/`.
7. Update this compendium with value, unit, conditions, prerequisites, and source IDs.
8. Run `ruby tools/validate-portable-index.rb`.
