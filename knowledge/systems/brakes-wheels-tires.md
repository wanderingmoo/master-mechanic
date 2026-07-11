# Brakes, Wheels, and Tires

## Scope

Calipers, discs, pads, master cylinders, balance bar/proportioning, pedal box, lines, reservoirs, cooling ducts, wheels, hubs, center-locks, and tires.

## Current Verified State

Source S015 verifies base GT40 No. 224 recognition context for hydraulic brake operation. No installed brake hardware, wheel hardware, or tire construction has been verified.

The inspected S015 copy contains brake and wheel data fields, but those fields do not provide actionable hardware specifications:

- Brake method of operation is recorded as hydraulic.
- Brake photographs F and G and the front/rear hub-brake close-up photographs provide visual recognition anchors only.
- Brake items 91 through 105 for servo-assistance, hydraulic master-cylinder count, cylinder count per wheel, wheel-cylinder/caliper bores, drum-brake dimensions, disc-brake outside diameter, disc thickness, brake-lining/pad dimensions, pad count, and brake area are not populated in the inspected copy.
- Wheel items 50 through 54 for wheel type, per-wheel weight without tyre, method of attachment, rim diameter, and rim width are not populated in the inspected copy.
- The dimensions page warns that track differences caused by other wheel/rim widths must be stated when recognition is requested for those wheels.

## Inspection Priorities

- Identify calipers, disc dimensions, pad compound, master-cylinder bores, and balance mechanism.
- Photograph line routing, flex lines, bulkhead fittings, and any residual-pressure or proportioning valves.
- Identify wheel manufacturer, dimensions, offsets, center-lock nut orientation, thread condition, and peg drive details.
- Record tire model, construction, date code, heat cycles, static age, and intended operating temperature.

## Linked Part Records

Use [../data/parts-register.csv](../data/parts-register.csv) before service or setup:

- P021 - master cylinders, lines, and balance mechanism.
- P022 - calipers, discs, pads, and ducts.
- P023 - center-lock wheels, hubs, pegs, and nuts.
- P024 - tires, tubes, and valves.

Apply [../procedures/component-identification.md](../procedures/component-identification.md) before brake bias, bedding, center-lock torque, or tire-pressure decisions. Wheel/tire identity is part of brake and alignment safety, not a separate cosmetic detail.

## 1968 FIA Appendix J Implications

Source S009 verifies a regulation baseline for four-wheel braking with retained braking after a partial leakage or failure condition. Use this as a safety inspection principle, not as a substitute for GT40-specific hydraulic layout, master-cylinder bore, pad, disc, bias, fluid, tire-pressure, or center-lock data.

For Group 4 recognition, Appendix J also tied the brake-system type to the recognized minimum series. This means caliper/disc/drum type and hydraulic layout should be documented before any restoration substitution is treated as correct.

Source S015 verifies hydraulic brake operation in the GT40 No. 224 recognition form. It does not provide final brake-bias, pad, disc, master-cylinder, bedding, fluid, tire-pressure, or center-lock torque settings.

S015 should be used as a checklist for what must be identified on the car, not as a specification source for missing values.

Source S027 adds Ford press-release historical context that the April 1964 Ford GT had 11.5-inch disc brakes at each wheel. This is early Ford GT design context only. It does not identify the user's brake hardware, verify GT40 No. 224 brake dimensions, or unblock brake bias, pad, disc, master-cylinder, bedding, fluid, tire-pressure, or center-lock settings.

## Brake and Wheel Evidence Gate

Before any adjustment or service setting is issued, capture:

- Brake: master-cylinder bores, pedal ratio, balance mechanism, caliper make/model, piston sizes, disc diameter/thickness, pad shape/compound, ducting, line routing, hose dates, and fluid currently present.
- Wheel: make, material, diameter, width, offset/backspace, peg-drive arrangement, center-lock nut markings, thread direction, thread condition, retainers, and torque source.
- Tire: make/model, size, construction, date code, tube status, valve type, heat-cycle history, and intended use.

When comparing against S015, explicitly record whether the installed parts match, differ from, or cannot be compared to photographs F and G and to the front/rear hub-brake close-ups. Treat any visual comparison as preliminary until supported by physical markings and measurements.

If any of these are unknown, keep brake bias, bedding, fluid, center-lock torque, and tire pressure blocked in [../data/settings-register.csv](../data/settings-register.csv).

## Do Not Guess

No brake bias, pad bedding, center-lock torque, tire pressure, or fluid recommendation is actionable until hardware is identified.
