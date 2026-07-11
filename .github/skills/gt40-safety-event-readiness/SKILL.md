---
name: gt40-safety-event-readiness
description: Assess GT40 safety-system and event-readiness questions against local Appendix K, source registers, installed-equipment evidence, and blocked settings. Use when asked whether the car is safe, track-ready, race-ready, Appendix K compliant, HTP/event ready, or when reviewing belts, fire systems, fuel cells, master switches, batteries, bulkheads, warning lights, mirrors, ROPS/cage, oil catch tanks, or fuel/oil/brake line safety.
---

# GT40 Safety Event Readiness

## Core Rule

Do not declare the car safe, track-ready, race-ready, Appendix K compliant, or event-ready from generic knowledge. Require installed-equipment evidence plus the specific event rule set.

## Required Local Context

Read or query:

- `knowledge/index.md`
- `knowledge/systems/safety-systems.md`
- `sources/notes/S019-fia-appendix-k-2025-updated-2026.md`
- `knowledge/data/fact-register.csv`
- `knowledge/data/configuration-register.csv`
- `knowledge/data/parts-register.csv`
- `knowledge/data/settings-register.csv`
- `knowledge/templates/safety-event-readiness-capture.md` when capturing evidence

Also check related system pages when safety overlaps other systems:

- `knowledge/systems/fuel-oil-cooling.md`
- `knowledge/systems/electrical-instruments.md`
- `knowledge/systems/brakes-wheels-tires.md`
- `knowledge/systems/chassis-body.md`

## Workflow

1. Identify intended use:
   - static restoration
   - first start / recommissioning
   - private test
   - track day
   - FIA Appendix K / HTP event
   - other sanctioning-body event
2. Confirm evidence state:
   - HTP status and event rules
   - belts, seat, anchorages, FHR context
   - extinguisher or fire system
   - fuel tank/cell, foam, filler caps, vents, and lines
   - oil catch tank or retained closed breathing
   - battery, master switch, cable routing, and warning light
   - ROPS/cage/rollover protection and bulkheads
   - mirrors, brake lights, rear warning light, and lamps as applicable
3. Check local registers:
   - configuration row C015
   - parts rows P028, P029, P030 and linked fluid/electrical rows
   - settings rows ST018, ST019, ST020, ST021
   - facts F071 through F081
4. Classify the result:
   - `verified for inspection only`
   - `blocked: installed evidence missing`
   - `blocked: event rules missing`
   - `blocked: component certification/date missing`
   - `unsafe until inspected/replaced`
   - `ready for expert/scrutineer review`
5. If evidence is missing, provide the exact capture items from `knowledge/templates/safety-event-readiness-capture.md`.

## Non-Negotiables

- Do not treat S019 as proof that the installed car is compliant.
- Do not treat a period-correct appearance as proof of safe condition.
- Do not approve belts without standard/date/condition/routing/anchorage evidence.
- Do not approve fuel systems without tank/cell/foam/cap/line/bulkhead evidence.
- Do not approve electrical safety without battery chemistry/location/cover, master-switch behavior, cable routing, and warning-light evidence.
- Do not ignore event supplementary regulations; Appendix K is a baseline, not the whole event rulebook.
- Escalate when a safety change may alter original material or create an originality-versus-safety tradeoff.

## Output Format

```markdown
Safety answer type:

Verified from local KB:

Blocked / missing evidence:

Unsafe or high-risk observations:

Safe next inspection:

Sources / local indexes:
```

## Reference

Load `references/appendix-k-gates.md` when the question involves Appendix K safety evidence, event-readiness, or scrutineering preparation.
