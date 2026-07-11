---
name: gt40-configuration-control
description: Control chassis-specific configuration for a GT40 or GT40-style restoration. Use before advising on parts, settings, originality, compatibility, or restoration decisions involving chassis identity, Gurney-Weslake 302 details, transaxle, brakes, suspension, fuel, oil, cooling, electrical, or body systems.
---

# GT40 Configuration Control

## Overview

Use this skill to prevent generic GT40 or Ford 302 information from becoming unsafe advice. It keeps verified configuration, assumptions, and open questions separated.

## Workflow

1. Read `knowledge/00-vehicle-identity.md`.
2. Identify the system being discussed.
3. Check `knowledge/02-regulatory-homologation.md` for FIA Appendix J implications when the question involves period legality, homologation, or Group 4 context.
4. Check `knowledge/data/configuration-register.csv` for component identity, evidence state, and next action.
5. Check `knowledge/data/settings-register.csv` and `knowledge/procedures/settings-governance.md` before giving any setting.
6. Check `knowledge/data/fact-register.csv` for verified facts.
7. If the relevant identifier is unknown, ask for inspection evidence or label the answer `open`.
8. State applicability: exact chassis, Mk I family, Gurney-Weslake 302 family, generic Ford small block, or unknown.
9. Add new confirmed facts to the fact register and update the configuration/settings registers.

## Configuration Gates

Do not provide final settings until these are known:

- Chassis number and current build type.
- Engine block, heads, cam, induction, ignition, and oiling.
- Transaxle manufacturer/model/serial and ratios.
- Brake hardware and wheel/tire package.
- Current use case: road, concours, demonstration, track day, or historic racing.
- Applicable current event or road-use safety requirements when safety equipment is involved.

## Output Format

When answering, use:

- `Verified:`
- `Assumed:`
- `Open:`
- `Safe next checks:`
- `Do not adjust yet:`

## Resources

Read [references/configuration-gates.md](references/configuration-gates.md) for system-specific identifiers.
