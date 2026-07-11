# Knowledge Index

This is the local table of contents for the GT40 mechanics knowledge base. Keep it current whenever new knowledge is added.

## Control Files

| File | Purpose |
|---|---|
| [00-vehicle-identity.md](00-vehicle-identity.md) | Defines the exact car, configuration assumptions, open identity questions, and applicability rules. |
| [01-source-policy.md](01-source-policy.md) | Defines evidence tiers and when a fact is allowed to become mechanic-facing advice. |
| [02-regulatory-homologation.md](02-regulatory-homologation.md) | Captures verified 1968 FIA Appendix J regulation facts and system implications. |
| [03-research-backlog.md](03-research-backlog.md) | Tracks source-acquisition and evidence gaps required for mechanic-facing settings. |
| [04-coverage-matrix.md](04-coverage-matrix.md) | Tracks completeness by system against the final mechanics-assistant objective. |
| [05-phase-handoff.md](05-phase-handoff.md) | Current phase wrap-up, completed foundation, blocked settings, and next evidence needed. |
| [06-assistant-evaluation.md](06-assistant-evaluation.md) | Acceptance cases for testing the mechanics assistant against evidence and settings gates. |
| [07-settings-compendium.md](07-settings-compendium.md) | Mechanic-facing system-by-system map of all tracked settings, status, evidence gates, and safe next actions. |
| [manifest.yaml](manifest.yaml) | Machine-readable portable index of local knowledge files, tags, and assistant assets. |
| [data/README.md](data/README.md) | Data dictionary for portable CSV registers, ID prefixes, labels, confidence, and cross-reference rules. |
| [../sources/source-register.csv](../sources/source-register.csv) | Portable source index with source IDs, URLs, tier, and use status. |
| [data/fact-register.csv](data/fact-register.csv) | Structured fact index with source IDs, applicability, confidence, and system tags. |
| [data/configuration-register.csv](data/configuration-register.csv) | Structured component/configuration register for parts, settings gates, and evidence needs. |
| [data/parts-register.csv](data/parts-register.csv) | System-by-system part and assembly identification register with evidence gates. |
| [data/settings-register.csv](data/settings-register.csv) | Structured register of blocked/actionable settings and required evidence. |
| [data/evidence-gap-register.csv](data/evidence-gap-register.csv) | Machine-readable queue of missing evidence required to unblock systems and settings; every setting ID in the settings register must appear in this gap register. |

## Source Notes

| Source | Local note | Status |
|---|---|---|
| S003 | [../sources/notes/S003-ford-heritage-vault.md](../sources/notes/S003-ford-heritage-vault.md) | Tier 1 official Ford archive/search path; direct GT40 search returned 84 records and useful media/year/model filters for future extraction. |
| S009 | [../sources/notes/S009-fia-appendix-j-1968.md](../sources/notes/S009-fia-appendix-j-1968.md) | Tier 1 regulation source extracted into fact register. |
| S014 | [../sources/notes/S014-fia-cars-list-htp-guidance.md](../sources/notes/S014-fia-cars-list-htp-guidance.md) | Tier 1 FIA source-control guidance for homologation forms and HTP use. |
| S015 | [../sources/notes/S015-fia-ford-gt40-homologation-224.md](../sources/notes/S015-fia-ford-gt40-homologation-224.md) | Tier 1 Ford GT 40 FIA Recognition/Homologation No. 224 Group 4 form and 1968 extensions. |
| S016 | [../sources/notes/S016-hewland-lg500-lg600-manual.md](../sources/notes/S016-hewland-lg500-lg600-manual.md) | Tier 1 Hewland LG500/LG600 component manual relevant to the S015 LG600 evolution if installed hardware is verified. |
| S018 | [../sources/notes/S018-webcon-weber-ida-support.md](../sources/notes/S018-webcon-weber-ida-support.md) | Tier 1 Weber/IDA support path through Webcon for component identification, diagrams, and service parts. |
| S019 | [../sources/notes/S019-fia-appendix-k-2025-updated-2026.md](../sources/notes/S019-fia-appendix-k-2025-updated-2026.md) | Tier 1 current FIA Appendix K source for historic-event safety and HTP/event-readiness gates. |
| S020 | [../sources/notes/S020-the-henry-ford-ford-motorsports-records.md](../sources/notes/S020-the-henry-ford-ford-motorsports-records.md) | Tier 2 official archive collection path for Ford Motorsports Records; acquisition target for period Ford racing, Le Mans, and performance-testing materials. |
| S021 | [../sources/notes/S021-the-henry-ford-dave-friedman-collection.md](../sources/notes/S021-the-henry-ford-dave-friedman-collection.md) | Tier 2 official archive collection path for Dave Friedman racing photographs, race files, car-detail files, programs, and press kits. |
| S022 | [../sources/notes/S022-the-henry-ford-remote-research-services.md](../sources/notes/S022-the-henry-ford-remote-research-services.md) | Tier 2 official archive research-services path for requesting The Henry Ford materials, duplication, production records, and part drawings. |
| S023 | [../sources/notes/S023-aco-24h-lemans-track-record.md](../sources/notes/S023-aco-24h-lemans-track-record.md) | Tier 1 official 24H Le Mans / ACO race-history source path; current extraction did not expose the 1968 result row, so S013 details remain lead-only. |
| S024 | [../sources/notes/S024-gurney-weslake-official-homepage.md](../sources/notes/S024-gurney-weslake-official-homepage.md) | Tier 2 official Gurney-Weslake head-development and GT40 race-head identification context; not a service-settings source. |
| S004 | [../sources/notes/S004-ford-gt40-secondary-leads.md](../sources/notes/S004-ford-gt40-secondary-leads.md) | Lead-only GT40 history/source-acquisition notes. |
| S005 | [../sources/notes/S005-ford-small-block-secondary-leads.md](../sources/notes/S005-ford-small-block-secondary-leads.md) | Lead-only Ford 302/GT40 engine notes. |
| S006 | [../sources/notes/S006-weslake-secondary-leads.md](../sources/notes/S006-weslake-secondary-leads.md) | Lead-only Weslake/Gurney-Weslake notes. |
| S013 | [../sources/notes/S013-1968-le-mans-secondary-results.md](../sources/notes/S013-1968-le-mans-secondary-results.md) | Lead-only 1968 Le Mans result notes. |

## Source Archives

| Source | Local archive | Check |
|---|---|---|
| S015 | [../sources/archive/S015-fia-ford-gt40-homologation-224.pdf](../sources/archive/S015-fia-ford-gt40-homologation-224.pdf) | SHA-256 recorded in [manifest.yaml](manifest.yaml). |
| S016 | [../sources/archive/S016-hewland-lg500-lg600-manual.pdf](../sources/archive/S016-hewland-lg500-lg600-manual.pdf) | SHA-256 recorded in [manifest.yaml](manifest.yaml). |
| S019 | [../sources/archive/S019-fia-appendix-k-2025-updated-2026.pdf](../sources/archive/S019-fia-appendix-k-2025-updated-2026.pdf) | SHA-256 recorded in [manifest.yaml](manifest.yaml). |

## Systems

| System | Local file | Status |
|---|---|---|
| Chassis and body | [systems/chassis-body.md](systems/chassis-body.md) | S015 homologation baseline captured; actual chassis identity and repair state still required. |
| Engine and induction | [systems/engine-induction.md](systems/engine-induction.md) | S015 verifies 1968 Weslake-head and 302 evolution context; S018 adds an official Weber/IDA support path; installed engine and service settings still require evidence. |
| Driveline and transaxle | [systems/driveline-transaxle.md](systems/driveline-transaxle.md) | S015 verifies base ZF and 1968 Hewland/LSD evolution context; S016 archives the Hewland LG500/LG600 manual; installed unit must be identified. |
| Suspension and steering | [systems/suspension-steering.md](systems/suspension-steering.md) | S015 item-number boundaries and independent/coil-spring recognition context are indexed; installed geometry and settings still require evidence. |
| Brakes, wheels, and tires | [systems/brakes-wheels-tires.md](systems/brakes-wheels-tires.md) | S015 verifies hydraulic brake recognition context; no torque, bias, or pressure specs yet. |
| Electrical and instruments | [systems/electrical-instruments.md](systems/electrical-instruments.md) | S015 ignition/generator/battery boundaries and S019 safety gates captured; installed wiring variant still required. |
| Fuel, oil, and cooling | [systems/fuel-oil-cooling.md](systems/fuel-oil-cooling.md) | S015 fuel/oil/cooling boundaries and S019 fuel/fire-safety gates captured; tank, pump, cooler, and plumbing variant still required. |
| Safety systems | [systems/safety-systems.md](systems/safety-systems.md) | S019 current FIA Appendix K safety/event-readiness gates captured; installed safety equipment and event rules still required. |

## Procedures

| Procedure | Local file | Status |
|---|---|---|
| Component identification | [procedures/component-identification.md](procedures/component-identification.md) | Evidence workflow for identifying parts before ordering, machining, or applying settings. |
| Source acquisition | [procedures/source-acquisition.md](procedures/source-acquisition.md) | Procedure for adding primary documents, source notes, extracted facts, and setting gates. |
| Evidence request packet | [procedures/evidence-request-packet.md](procedures/evidence-request-packet.md) | Ready-to-send request checklist for owner/shop evidence, archives, component specialists, and event authorities. |
| Evidence-controlled commissioning | [procedures/inspection-commissioning.md](procedures/inspection-commissioning.md) | Starter workflow for first inspection and restart. |
| Settings governance | [procedures/settings-governance.md](procedures/settings-governance.md) | Blocks unsafe settings until component identity and source evidence are present. |

## Capture Templates

| Template | Local file | Use |
|---|---|---|
| Source note | [templates/source-note-template.md](templates/source-note-template.md) | Create a structured source note before extracting multi-fact sources. |
| Chassis and body | [templates/chassis-body-capture.md](templates/chassis-body-capture.md) | Capture chassis/tub/body evidence against S015 and local registers. |
| Engine and induction | [templates/engine-induction-capture.md](templates/engine-induction-capture.md) | Capture Gurney-Weslake 302 evidence against S015 and local registers. |
| Driveline and transaxle | [templates/driveline-transaxle-capture.md](templates/driveline-transaxle-capture.md) | Capture ZF/Hewland/LSD/clutch/halfshaft evidence. |
| Suspension and steering | [templates/suspension-steering-capture.md](templates/suspension-steering-capture.md) | Capture pickup points, arms, uprights, springs, dampers, anti-roll bars, steering rack/column, ride height, alignment, and S015 item evidence. |
| Fuel, oil, and cooling | [templates/fuel-oil-cooling-capture.md](templates/fuel-oil-cooling-capture.md) | Capture tank/cell, pump, oil-system, cooling, and fire-risk evidence against S015/S009/S019. |
| Electrical and instruments | [templates/electrical-instruments-capture.md](templates/electrical-instruments-capture.md) | Capture ignition, generator/charging, battery, harness, instruments, master-switch, and warning-light evidence. |
| Brakes, wheels, and tires | [templates/brakes-wheels-tires-capture.md](templates/brakes-wheels-tires-capture.md) | Capture brake hydraulic, wheel, center-lock, and tire evidence. |
| Safety event-readiness | [templates/safety-event-readiness-capture.md](templates/safety-event-readiness-capture.md) | Capture Appendix K/event-readiness evidence for belts, fire systems, fuel safety, master switch, battery, warning light, mirrors, and ROPS. |

## Local Assistant Assets

| Asset | Purpose |
|---|---|
| [../AGENTS.md](../AGENTS.md) | Repository-level operating rules for agents working in `Master-Mechanic`. |
| [../.github/agents/GT40MasterMechanic.agent.md](../.github/agents/GT40MasterMechanic.agent.md) | Project-local mechanics assistant agent. |
| [../.github/skills/gt40-mechanic-question-routing/SKILL.md](../.github/skills/gt40-mechanic-question-routing/SKILL.md) | Skill for routing mechanic questions through the coverage matrix, registers, evidence gates, and specialist skills before answering. |
| [../.github/skills/gt40-source-triage/SKILL.md](../.github/skills/gt40-source-triage/SKILL.md) | Skill for ranking and extracting source evidence. |
| [../.github/skills/gt40-configuration-control/SKILL.md](../.github/skills/gt40-configuration-control/SKILL.md) | Skill for separating verified configuration from assumptions. |
| [../.github/skills/gt40-component-identification/SKILL.md](../.github/skills/gt40-component-identification/SKILL.md) | Skill for identifying installed GT40 parts before ordering, machining, or applying settings. |
| [../.github/skills/gt40-settings-governance/SKILL.md](../.github/skills/gt40-settings-governance/SKILL.md) | Skill for blocking unsafe setup values until evidence gates are met. |
| [../.github/skills/gt40-safety-event-readiness/SKILL.md](../.github/skills/gt40-safety-event-readiness/SKILL.md) | Skill for blocking safety, track-readiness, race-readiness, Appendix K, and HTP/event claims until installed evidence and event rules are captured. |
| [../.github/skills/vintage-racecar-diagnostics/SKILL.md](../.github/skills/vintage-racecar-diagnostics/SKILL.md) | Skill for safe diagnostic reasoning on vintage racecars. |
