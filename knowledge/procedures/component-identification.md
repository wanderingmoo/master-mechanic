# Component Identification Procedure

## Purpose

Use this procedure before ordering parts, applying settings, machining components, or treating a GT40 claim as authoritative. The goal is to convert an unknown or lead-only assembly into an evidence-backed component record.

## Required sequence

1. From the repository root, run `ruby tools/print-parts-config.rb --system <system>`, or run `ruby tools/print-parts-config.rb --item <C###|P###>` when the relevant register ID is known.
2. Use the output to find the relevant `part_id`, configuration item, required evidence, related gaps, and next action.
3. Photograph the part in place before cleaning, disassembly, or adjustment.
4. Record every visible identifier:
   - casting numbers
   - serial numbers
   - date codes
   - maker marks
   - tags or plates
   - safety-wire or locknut patterns
   - shim stack order
   - hose/fuel-cell/belt dates
5. Record the component’s location, orientation, and connected systems.
6. Add or update the row in [../data/configuration-register.csv](../data/configuration-register.csv).
7. If a source supports the identification, add the source to [../../sources/source-register.csv](../../sources/source-register.csv) and any extracted claim to [../data/fact-register.csv](../data/fact-register.csv).
8. Only after identity is proven, consult [settings-governance.md](settings-governance.md) for whether a numeric setting can be given.

## Evidence standard by task

| Task | Minimum evidence |
|---|---|
| Order replacement part | Component make/model plus dimensional confirmation. |
| Reuse original part | Identity plus condition inspection and defect disposition. |
| Machine engine or driveline part | Primary builder/manufacturer data or measured engineering limits. |
| Apply torque/clearance/pressure/alignment | Exact installed component plus applicable source and unit condition. |
| Historic event eligibility | Chassis identity plus ASN/FIA-recognized homologation or HTP documentation. |

## Non-negotiable blocks

- Do not infer GT40 Mk I details from Mk II, Mk IV, modern Ford GT, continuation, or replica records without a compatibility note.
- Do not infer Gurney-Weslake setup values from generic Ford 302 data.
- Do not infer ZF transaxle service settings until the actual transaxle is identified.
- Do not infer brake, wheel, or tire settings from photos alone.
- Do not treat homologation-form photographs as positive component identification. Use them to plan what to photograph and compare, then verify with markings, dimensions, records, and applicable component documentation.

## Shop capture checklist

- Overall view of the assembly installed.
- Close view of each identifier.
- Adjacent routing, brackets, heat shields, and safety locks.
- Measuring tool in frame where dimension matters.
- Written note with date, observer, and whether the part was disturbed.

## Capture templates

Use these templates when turning shop evidence into durable local records:

- [../templates/chassis-body-capture.md](../templates/chassis-body-capture.md)
- [../templates/engine-induction-capture.md](../templates/engine-induction-capture.md)
- [../templates/driveline-transaxle-capture.md](../templates/driveline-transaxle-capture.md)
- [../templates/suspension-steering-capture.md](../templates/suspension-steering-capture.md)
- [../templates/fuel-oil-cooling-capture.md](../templates/fuel-oil-cooling-capture.md)
- [../templates/electrical-instruments-capture.md](../templates/electrical-instruments-capture.md)
- [../templates/brakes-wheels-tires-capture.md](../templates/brakes-wheels-tires-capture.md)
- [../templates/safety-event-readiness-capture.md](../templates/safety-event-readiness-capture.md)
