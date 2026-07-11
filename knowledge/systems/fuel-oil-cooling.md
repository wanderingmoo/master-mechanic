# Fuel, Oil, and Cooling

## Scope

Fuel tanks/cells, fillers, vents, pumps, filters, regulators, carburetor feed, fire safety, oil tank/sump, coolers, water pump, radiators, fans, thermostat/restrictor, hoses, and heat shielding.

## Current Verified State

No fuel-cell, oil-system, or cooling-system variant has been verified.

Source S015 contains relevant GT40 No. 224 fields, but the inspected copy does not populate actionable values:

- Item 7 for fuel-tank capacity, including reserve, is present but blank.
- Items 151 through 157 for lubrication-system type, lubricant capacity, oil cooler, engine-cooling method, cooling-system capacity, cooling-fan diameter, and cooling-fan blade count are present but blank.
- Items 230 through 231 for fuel-pump type and number fitted are present but blank.

Use S015 as an evidence checklist for what to identify, not as a system specification for fuel capacity, pump type, oil layout, oil quantity, oil cooler, cooling layout, coolant capacity, fan specification, pressure cap, thermostat, restrictor, or hose specification.

## Inspection Priorities

- Confirm fuel tank/cell material, age, certification, foam condition, vent routing, and rollover protection.
- Record fuel pump model, regulator, pressure gauge accuracy, filter micron rating, and hose type/date.
- Map oil tank, pump, scavenge lines, coolers, thermostats, filters, and breathers.
- Pressure-test cooling system only after hose, radiator, and fitting condition are inspected.

## Linked Part Records

Use [../data/parts-register.csv](../data/parts-register.csv) before filling, pressure testing, or energizing pumps:

- P011 - fuel tanks/cells, fillers, and vents.
- P012 - fuel pumps, filters, regulators, and lines.
- P013 - sump or dry-sump tank, pump, cooler, and breather/catch system.
- P014 - radiator, pump, fans, hoses, and bleed points.

Apply [../procedures/component-identification.md](../procedures/component-identification.md) before fuel-pressure, oil-fill, oil-pressure, coolant-cap, thermostat, or restrictor decisions. Treat all aged rubber, fuel foam, and unknown hose as suspect until inspected.

## 1968 FIA Appendix J Safety Benchmark

Source S009 includes period safety provisions for tank isolation, fuel-tank venting, enclosed batteries, and oil catch arrangements in racing-car sections of Appendix J. Treat these as inspection prompts and historical safety context, not as final GT40 Group 4 specifications. Current event rules and modern safety practice may be stricter.

S009's general fuel-tank capacity table listed 140 litres for cars over 3,000 cc and up to 5,000 cc, and it treated any container whose fuel could flow to the main tank or directly to the engine as a fuel tank. This is period regulation context only. It does not override the blank S015 GT40 item 7 fuel-capacity field, prove the installed tank/cell capacity, or authorize filling quantity.

S009 also required fuel filling ports and vents to be outside the passenger compartment and entirely leak-proof. Use this as an inspection prompt for filler necks, caps, vents, bulkheads, and leak paths before adding fuel or pressure-testing the system.

For closed-circuit speed races, S009 required oil-spill prevention equipment and stated 2 litres minimum oil-catching capacity for cars up to 2,000 cc and 3 litres for cars over 2,000 cc. Use this as period oil-containment context only; current Appendix K, event rules, and the installed breather/catch-tank layout still control event-readiness.

Source S019 adds current FIA Appendix K gates for fuel-tank safety foam or safety tank context, maximum capacity limits tied to period rules/homologation, fuel-cap secondary retention, fuel-line fire/fuel resistance and pressure rating, line protection, fireproof bulkheads, extinguishers, and oil catch tanks. These gates require installed-system evidence before any event-readiness claim.

Source S015 does not resolve fuel, oil, or cooling service settings. The blank fields are evidence boundaries, not permission to substitute generic Ford 302 or replica GT40 values.

## Fuel, Oil, and Cooling Evidence Gate

Before any fill, pressure, pump, cap, thermostat, restrictor, or hose recommendation is issued, capture:

- Fuel: tank/cell maker, date/certification, capacity, foam condition, filler/cap, drains, vent valves, vent routing, isolation from cockpit/engine/exhaust areas, pump make/model/count, regulator, filters, hose type/date, hardline routing, and gauge calibration.
- Oil: wet-sump or dry-sump layout, tank/sump, pump/scavenge stages, cooler, thermostat, filter, relief valve, breather/catch-tank routing, hose size/type/date, and builder pressure/temperature targets.
- Cooling: radiator, pump, fan, cap pressure, thermostat or restrictor, bleed points, hose type/date, coolant type, pressure-test limit, and heat shielding.

Use [../templates/fuel-oil-cooling-capture.md](../templates/fuel-oil-cooling-capture.md) to capture installed evidence before updating fuel, oil, cooling, or fire-risk settings.

## Do Not Guess

No fuel pressure, oil fill quantity, coolant pressure cap, thermostat/restrictor, or hose specification is actionable until the installed system is identified.
