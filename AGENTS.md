# Master-Mechanic Agent Operating Rules

This repository is a standalone evidence-controlled knowledge base for a 1968-era Ford GT40 Mk I configured around a Gurney-Weslake Ford 302.

## Start points

- Start with `knowledge/index.md`.
- Check `knowledge/04-coverage-matrix.md` before treating any system as mechanic-ready.
- Check `sources/source-register.csv` and `knowledge/data/fact-register.csv` before using a source-backed claim.
- Check `knowledge/data/configuration-register.csv`, `knowledge/data/parts-register.csv`, and `knowledge/data/settings-register.csv` before advising on parts, settings, repair, commissioning, or diagnosis.

## Evidence rules

- Use source IDs in answers whenever a fact depends on local source evidence.
- Keep labels meaningful:
  - `verified`: supported by an inspected primary or strong support source.
  - `verified_context_installed_open`: source-backed context exists, but the installed component is not verified.
  - `verified_boundary_installed_open`: the source gives a boundary or prompt, but installed data is missing.
  - `lead_only`: useful as a research lead only.
  - `open`: not yet supported.
  - `assumption`: user-provided or project-control assumption.
- Do not promote secondary, auction, forum, or unsourced web claims into settings.
- Do not treat photographs, rocker covers, paint, livery, or visual similarity as installed-component proof.

## Settings safety

Never invent or infer:

- torque values;
- structural repair dimensions, datum dimensions, material specifications, bonding settings, or welding settings;
- rev limits;
- valve lash;
- ignition timing or curves;
- spark plug type, reach, heat range, or gap;
- Weber jetting, choke size, float level, or fuel pressure;
- Weber pump volume, idle mixture, or linkage synchronization;
- oil type, oil quantity, pressure target, relief setting, or priming procedure;
- coolant quantity, cap pressure, thermostat/restrictor, or bleed method;
- transaxle oil, preload, backlash, ratios, final drive, or selector setup;
- clutch adjustment or release geometry;
- ride height, corner weights, spring rate, damper clicks, anti-roll-bar settings, camber, caster, toe, or bump steer;
- brake bias, master-cylinder sizing, pad bedding, fluid, brake pressure targets, or center-lock torque;
- wheel-bearing or hub preload/end-float settings;
- tire pressure;
- fuse/relay ratings, gauge/sender calibration, warning thresholds, or wiring changes.

These become actionable only when the exact installed component and an applicable source are both known.

## Required workflows

- Use `.github/skills/gt40-mechanic-question-routing/SKILL.md` for mechanic-facing questions.
- Use `.github/skills/gt40-source-triage/SKILL.md` before adding a source.
- Use `.github/skills/gt40-configuration-control/SKILL.md` before advising on originality, compatibility, or chassis-specific setup.
- Use `.github/skills/gt40-component-identification/SKILL.md` before ordering, machining, or applying settings to unknown hardware.
- Use `.github/skills/gt40-settings-governance/SKILL.md` before giving a numeric or procedural setup value.
- Use `.github/skills/gt40-safety-event-readiness/SKILL.md` before track, race, Appendix K, HTP, or event-readiness claims.
- Use `.github/skills/vintage-racecar-diagnostics/SKILL.md` for fault diagnosis and commissioning.

## Portable-index maintenance

When adding evidence:

1. Add or update `sources/source-register.csv`.
2. Add a source note under `sources/notes/` for multi-fact or high-value sources.
3. Add extracted claims to `knowledge/data/fact-register.csv`.
4. Update relevant system pages under `knowledge/systems/`.
5. Update `knowledge/data/configuration-register.csv`, `knowledge/data/parts-register.csv`, and/or `knowledge/data/settings-register.csv` if the evidence changes component or setting gates.
6. Update `knowledge/03-research-backlog.md` and `knowledge/04-coverage-matrix.md` when coverage changes.
7. Update `knowledge/index.md` and `knowledge/manifest.yaml`.
8. Run `ruby tools/validate-portable-index.rb`.

## Repo boundary

This is a separate project/repo named `Master-Mechanic`. Keep repo-specific instructions, local indexes, assistant assets, and source notes here. Do not blend this with unrelated customer-engagement, PRISM, or other local knowledge-base work.
