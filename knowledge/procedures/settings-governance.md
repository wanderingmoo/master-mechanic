# Settings Governance

## Purpose

Prevent generic GT40, Ford 302, Weber, ZF, or vintage-racing settings from becoming unsafe mechanic-facing advice.

## Control register

Use [../data/settings-register.csv](../data/settings-register.csv) before giving or changing any setting. A setting can move from `blocked` only when the exact installed component and applicable source are both known.

## Required rule

Every actionable setting must include:

- Component identity.
- Source ID.
- Applicability statement.
- Unit and condition.
- Inspection or measurement prerequisite.
- Reversibility or lockout note when safety-critical.

## Blocked until proven

The following remain blocked in this knowledge base:

- Ignition advance curve.
- Rev limit.
- Valve lash.
- Spark plug type and gap.
- Weber jetting, choke size, float setting, idle mixture, and fuel pressure.
- Weber pump volume and linkage synchronization.
- Engine oil type, quantity, pressure target, relief setting, and priming procedure.
- Coolant capacity, cap pressure, thermostat/restrictor value, and bleed method.
- Transaxle oil, fill quantity, preload, backlash, gear ratios, final-drive selection, gear setup, and shift linkage settings.
- Clutch adjustment and release geometry.
- Camber, caster, toe, ride height, spring rates, damper settings, and anti-roll-bar settings.
- Brake bias, master-cylinder sizing, pad bedding, fluid, pressure targets, and center-lock torque.
- Wheel-bearing or hub preload/end-float settings.
- Tire pressure.
- Fuse sizing, alternator output, master switch layout, gauge/sender calibration, and warning thresholds.
- Fastener torque values and torque sequences.
- Structural repair dimensions, material specifications, and panel bonding/welding settings.

## Period regulation versus shop setting

Source S009 verifies 1968 FIA regulation context, including Group 4 recognition details and some period safety provisions. It does not provide enough information to set up this specific car. Use it to identify what must be documented, not to fill missing values.
