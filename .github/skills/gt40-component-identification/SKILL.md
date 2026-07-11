---
name: gt40-component-identification
description: Identify GT40 and Gurney-Weslake 302 parts before ordering, machining, applying settings, or accepting compatibility claims. Use for chassis/body, engine, induction, transaxle, suspension, brakes, wheels, tires, fuel, oil, cooling, electrical, instruments, and safety equipment when installed hardware is unknown, lead-only, newly photographed, or being reconciled against local records.
---

# GT40 Component Identification

## Overview

Use this skill to convert unknown or lead-only GT40 parts into evidence-backed component records. It prevents generic GT40, Ford 302, ZF, Weber, or replica information from becoming shop action without installed-hardware proof.

## Workflow

1. Read `knowledge/procedures/component-identification.md`.
2. Run or inspect `ruby tools/print-parts-config.rb --system <system>` for the affected system, or `ruby tools/print-parts-config.rb --item <C###|P###>` when the relevant register ID is known.
3. Locate the relevant row in `knowledge/data/parts-register.csv`.
4. Check `knowledge/data/configuration-register.csv` for current identity state and required evidence.
5. Check `knowledge/data/settings-register.csv` before any numeric setting, torque, clearance, pressure, jetting, alignment, fluid, or preload advice.
6. Capture identifiers before cleaning or adjustment:
   - casting numbers
   - serial numbers
   - date codes
   - maker marks
   - tags or plates
   - shim stack order
   - linkage positions
   - hose, tire, fuel-cell, belt, and extinguisher dates
7. Record whether the part was disturbed.
8. If a source supports the identification, add it to `sources/source-register.csv` and extract only supported claims into `knowledge/data/fact-register.csv`.
9. Update `knowledge/data/parts-register.csv` and `knowledge/data/configuration-register.csv` only as far as the evidence allows.

## Decision gates

Use these labels:

- `identified`: installed part identity is supported by direct physical evidence and a compatible source or record.
- `probable`: physical evidence points to an identity, but one required corroborating source or measurement is missing.
- `lead_only`: source or photo suggests an identity, but installed hardware is not proven.
- `open`: identity is unknown.
- `blocked`: action would be unsafe, irreversible, or unsupported by evidence.

## Do not authorize

- Machining from a lead-only engine or head identity.
- ZF transaxle oil, preload, backlash, or ratio advice before the installed unit is identified.
- Weber jetting, float level, fuel pressure, or synchronization targets before carburetor model, choke, jet stack, linkage, and fuel system are recorded.
- Brake bias, bedding, pressure, or master-cylinder recommendations before calipers, discs, pads, hydraulics, and wheel/tire package are identified.
- Center-lock torque or handedness before hub, nut, thread direction, and wheel hardware are documented.
- Historic-event eligibility claims without chassis identity and FIA/ASN paperwork.

## Output format

Use:

- `Part/assembly:`
- `Evidence seen:`
- `Current label:`
- `What this proves:`
- `What it does not prove:`
- `Safe next capture:`
- `Blocked actions:`

## Resource

Read [references/system-identifiers.md](references/system-identifiers.md) when the task involves choosing what to photograph, measure, or record for a specific system.
