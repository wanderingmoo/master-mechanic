# General Workshop and Fastener Control

## Scope

Cross-system workshop controls that apply to chassis, body, engine, induction, driveline, suspension, steering, brakes, wheels, fuel, oil, cooling, electrical, instruments, and safety systems.

This page exists because some mechanic questions are not confined to one vehicle system. Fastener torque and torque sequence requests are the primary current example.

## Current Verified State

The captured source set does not provide a car-wide GT40 torque table. Source S015 is a homologation form, S016 is conditional LG500/LG600 component-manual evidence, S018 is a Weber/IDA support path, and S019 is a current historic safety/event-readiness regulation. None of those sources authorizes a universal GT40 torque chart.

Setting ST023 remains blocked for any chassis, engine, suspension, brake, wheel, driveline, or safety fastener until the exact joint and applicable source are identified.

## Fastener Torque Evidence Gate

Before any torque value, angle, sequence, stretch, preload, or reuse instruction is mechanic-facing, capture:

- Exact fastened joint and system.
- Component make/model/part number and whether it is original, replacement, modified, replica, or unknown.
- Fastener size, thread, pitch, length, grade/specification, material, head/nut style, washer/spacer stack, and markings.
- Female thread material and condition.
- Dry, oiled, plated, anti-seize, thread-locker, sealant, safety-wire, tab-washer, locknut, or other locking condition.
- New/reused status and any one-time-use rule.
- Applicable service manual, drawing, component maker data, event rule, or build sheet.
- Inspection state: damage, corrosion, galling, thread pull, repair inserts, prior over-torque, heat exposure, and safety consequence.

## Mechanic-Facing Rule

If the exact joint or source is unknown, answer with evidence capture steps and keep ST023 blocked. Do not provide generic Ford 302, generic GT40, replica, Pantera, Hewland, Weber, or modern racing torque values.

Use [../templates/fastener-torque-capture.md](../templates/fastener-torque-capture.md) to document a specific fastener question before changing any setting register state.

