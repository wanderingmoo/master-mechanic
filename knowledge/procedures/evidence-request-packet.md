# Evidence Request Packet

## Purpose

Use this packet to collect the exact evidence needed to move `Master-Mechanic` from a validated source-backed foundation into mechanic-specific settings for a particular GT40.

This is not a generic research wish list. Each request below is tied to a currently blocked setting, component identity, or source-acquisition gap.

## How to use this packet

1. Send the relevant request section to the owner, restorer, archive, component specialist, or event authority.
2. Save returned files under an appropriate local path.
3. Add each new source to `sources/source-register.csv`.
4. Add a source note under `sources/notes/` for multi-fact material.
5. Extract only supported claims into `knowledge/data/fact-register.csv`.
6. Update `knowledge/data/configuration-register.csv`, `knowledge/data/parts-register.csv`, and `knowledge/data/settings-register.csv`.
7. Re-run `ruby tools/validate-portable-index.rb`.

## Owner / shop evidence request

Please provide clear photos, scans, or measurements for:

- chassis plate, tub stampings, title, provenance, prior restoration records, and race/event paperwork;
- engine block casting number, date code, main caps, builder marks, bore, stroke, crank markings, rods, pistons, and any build sheet;
- Gurney-Weslake cylinder-head casting/foundry marks, serials, chamber photos, port photos, valve sizes, plug details, rocker gear, manifold angle, and repair history;
- cam card, lifter type, rocker ratio, pushrod length, spring part numbers, spring installed height, valve-lash notes, and rev-limit notes if supplied by the builder;
- carburetor model/series/serials, choke sizes, jet stacks, emulsion tubes, pump jets, float/needle/seat details, linkage, throttle stops, manifold markings, spacers, gaskets, filters, and fuel-pressure gauge location;
- distributor/trigger system, advance mechanism, coil, ignition box, plug wires, spark plugs, and tach drive;
- fuel tank/cell manufacturer, capacity, date/certification, foam, filler cap, secondary cap retention, vents, pumps, regulator, filters, hose spec/date, and line routing;
- oil-system layout: sump or tank, pump, cooler, filter, thermostat, pressure relief, priming notes, line sizes, breathers, and catch tank;
- cooling layout: radiator, water pump, fans, cap, thermostat/restrictor, coolant type, hose size/date, bleed points, and pressure-test results;
- transaxle manufacturer/model/serial, case marks, gear stack, final drive, LSD identity, cooler/vent, clutch, flywheel, release bearing, slave/master cylinders, linkage, pedal free play, and release travel;
- suspension pickup points, arms, uprights, springs, dampers, anti-roll bars, shim packs, ride height as found, alignment as found, and tire data;
- steering rack, column, joints, supports, steering arms, wheel hub, stops, and bump-steer data if measured;
- calipers, discs, pads, masters, balance mechanism, line routing, hose dates, fluid, ducts, pedal ratio, pressure-test readings, and pad-bedding instructions if supplied;
- wheel make/size/offset, hub/peg condition, bearings, bearing retainers, center-lock nuts, thread directions, retainers, tires, tubes, valves, tire dates, and intended use;
- harness layout, grounds, fuses, relays, connectors, alternator/generator, starter, battery, master switch, instruments, senders, switches, warning thresholds, calibration evidence, and rear warning light;
- seat, belts, anchor plates, extinguisher/fire system, ROPS/cage, mirrors, bulkheads, line protection, battery protection, and current event regulations.
- fastener identification for any disassembled or safety-critical joint: location, thread, grade/material, locking method, lubricant condition, washer/spacer stack, source of torque value, and reuse/replace rule;
- chassis/tub/body repair evidence: material thickness, corrosion, previous welds/bonds/rivets, datum measurements, jig references, panel bonding/welding process records, and repair drawings if available.

## Archive request - Ford / FAV / JWA

Request target:

Period Ford Advanced Vehicles, Ford, John Wyer Automotive Engineering, Gulf-Wyer, or race-preparation material for a 1968-era GT40 Mk I / Group 4 car with a 302 / Gurney-Weslake configuration.

Ask for:

- service manuals, race-preparation sheets, build sheets, parts lists, or engineering drawings;
- 1968 Group 4 GT40 engine, induction, ignition, oiling, cooling, driveline, brake, wheel, suspension, electrical, and body preparation data;
- torque tables, fastener schedules, chassis datum drawings, tub repair drawings, body panel joining methods, and service bulletins;
- documents referencing GT40P/1075, JW Automotive Engineering, Gulf-Wyer, 1968 Le Mans, 1968 World Championship of Makes, Gurney-Weslake heads, Ford 302 / 4942 cc engines, Hewland LG600, ZF 5DS-25, Weber IDA, brake hardware, or center-lock wheel hardware;
- photographs only when they are tied to an identified chassis, event, date, component, or document folder.

Do not ask the archive for generic "GT40 information" without the component/system list above.

## Archive request - ACO / Le Mans

Request target:

Official 1968 24 Hours of Le Mans result, entry, scrutineering, race program, or ACO-licensed record that directly identifies the GT40 entries and winning car.

Ask for:

- official result row for the winning 1968 entry;
- entry list with car number, entrant, drivers, class, chassis if listed, engine description, and displacement;
- scrutineering or technical-control record if available;
- race program pages listing GT40 entries;
- ACO-licensed publication page references if direct archive records are not available.

Use this to promote or correct S013 lead-only race-result details only after direct evidence is captured.

## Specialist request - Gurney-Weslake / Weslake heads

Request target:

Cylinder-head specification and service evidence for period Gurney-Weslake / Weslake Ford small-block heads used in GT40 race applications.

Ask for:

- head version identification criteria for Mark I, II, III, IV, GT40 race heads, road-car heads, and later conversions;
- casting/foundry marks and serial-number patterns;
- valve sizes, valve angles, plug reach/seat, plug heat-range guidance, chamber volume, chamber shape, port dimensions, rocker gear, pushrod/rocker geometry, and manifold angle;
- valve-lash guidance only when tied to cam/lifter/rocker package;
- repair limits, welding/machining cautions, pressure-test practices, and known failure areas;
- any period drawings, service notes, or build sheets.

Do not accept rocker covers or external appearance as proof of period GT40 race-head identity.

## Specialist request - engine builder / Gurney-Weslake 302

Request target:

Installed engine build, safe operating envelope, and source-backed service data.

Ask for:

- bore, stroke, crank, rods, pistons, compression ratio, ring package, bearing clearances, and fastener specifications;
- cam card, lifter type, rocker ratio, valve springs, installed heights, coil-bind clearance, retainer/lock data, and pushrod length;
- valve lash, ignition timing/curve, spark plug, rev limit, oil pressure, oil relief, priming, and break-in guidance only when tied to the installed build;
- cylinder-head compatibility notes for the installed Gurney-Weslake / Weslake heads;
- dyno sheets, fuel used, oil used, and any builder cautions about heat, detonation, oil temperature, or sustained RPM.

Do not use generic Ford 302, Shelby, Boss, or small-block Windsor settings unless the builder or source explicitly proves applicability to the installed Gurney-Weslake package.

## Specialist request - transaxle

Request target:

Installed transaxle identity and service data.

Ask for:

- manufacturer/model/serial confirmation;
- case photographs and tag/stamp interpretation;
- gearbox family: ZF 5DS-25, Hewland LG500/LG600, or other;
- gear ratios, final drive, crownwheel/pinion identity, differential/LSD type, selector mechanism, clutch/input-shaft compatibility, clutch adjustment/free play/release travel, oil type, fill quantity, backlash, preload, wear limits, and service tooling;
- any rebuild records, crack inspection, magnetic-plug findings, and oil history.

Apply S016 only if the installed unit is verified as Hewland LG500/LG600 or directly compatible.

## Specialist request - brakes, wheels, hubs, and tires

Request target:

Installed brake/wheel/hub/tire identity and service data.

Ask for:

- caliper make/model, piston sizes, seal kit, pad shape/compound, disc diameter/thickness, disc material, rotor mounting, ducting, master-cylinder sizes, pedal ratio, balance-bar/proportioning details, fluid compatibility, bedding procedure, pressure-test method, and pressure/bias guidance;
- wheel make, rim size, offset, peg-drive pattern, center-lock nut markings, thread direction, washer/retainer details, hub/bearing identity, bearing preload or end-float rule, lubrication rule, and torque source;
- tire make/model/size/date/construction, tube status, valve type, pressure guidance, age limits, and heat-cycle guidance for intended use.

Do not infer center-lock torque or tire pressure from generic GT40 or replica practice.

## Event authority request - historic eligibility and safety

Request target:

Current event rules, HTP requirements, and safety-equipment acceptance criteria.

Ask for:

- event-specific Appendix K interpretation;
- HTP/ASN-certified homologation-form requirement;
- allowed safety-tank/cell type, foam requirements, capacity restrictions, fuel-line requirements, extinguisher/fire-system requirements, harness standard/date, ROPS/cage expectations, battery/master-switch requirements, warning-light requirements, mirrors, and oil-catch requirements;
- inspection forms or scrutineering checklist.

Do not treat the FIA website research copy as event-valid paperwork unless the event/ASN confirms it.

## Intake checklist for returned material

For every returned item, record:

- who provided it;
- date received;
- whether it is original, scan, photo, reproduction, extract, or verbal note;
- source chain / provenance;
- component or chassis applicability;
- pages/photos inspected;
- any conflicting information;
- whether it changes a blocked setting gate.

Then add it to the portable indexes before using it for advice.
