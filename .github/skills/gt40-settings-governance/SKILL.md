---
name: gt40-settings-governance
description: Govern whether GT40 restoration and race-preparation settings can be given as actionable values. Use when a request involves ignition timing, valve lash, Weber jetting, fuel pressure, oil pressure, oil quantity, transaxle oil, gear setup, alignment, ride height, brake bias, center-lock torque, tire pressure, wiring/fuse values, or any other setup value for a 1968-era Ford GT40 or Gurney-Weslake 302 configuration.
---

# GT40 Settings Governance

## Overview

Use this skill to prevent unsourced setup values from entering the Master-Mechanic GT40 knowledge base or shop guidance. A setting is actionable only when the exact installed component and applicable source are both known.

## Workflow

1. Read `knowledge/data/settings-register.csv`.
2. Identify the requested setting and system.
3. Check `knowledge/data/configuration-register.csv` for component identity.
4. Check `knowledge/data/fact-register.csv` and `sources/source-register.csv` for supporting source IDs.
5. If component identity or source evidence is missing, keep the setting `blocked`.
6. If evidence exists, state applicability, value, unit, source ID, and prerequisite inspection.
7. Update the settings register if a setting moves from `blocked` to `verified` or `cross_checked`.

## Non-negotiable gates

- Do not infer values from generic Ford 302, generic GT40, replica, Pantera, or modern race-car practice.
- Do not convert FIA regulation context into a shop setting.
- Do not use secondary sources alone for safety-critical settings.
- Do not provide a numeric setting without source ID, applicability, and current component identity.
- If the user needs an immediate shop action and evidence is missing, provide inspection steps, not values.

## Output format

Use:

- `Setting:`
- `Status: blocked | verified | cross_checked | lead_only`
- `Why:`
- `Required evidence:`
- `Safe next action:`

## Resources

Read [references/settings-evidence-gates.md](references/settings-evidence-gates.md) when deciding what evidence is required for a setting.
