# GT40 Mechanic Answer Routing Checklist

Use this checklist before answering a mechanic-facing question.

## 1. Identify the request type

- Fact lookup
- Configuration check
- Part identification
- Setting or adjustment
- Diagnostic workflow
- Source intake
- Shop evidence capture
- Research gap / source acquisition

## 2. Identify the affected system

- Vehicle identity / provenance
- Regulatory / homologation
- Chassis / body
- Engine / induction
- Driveline / transaxle
- Suspension / steering
- Brakes / wheels / tires
- Fuel / oil / cooling
- Electrical / instruments
- Safety systems
- Assistant / local workflow

## 3. Check local coverage

Read `knowledge/04-coverage-matrix.md`.

- `baseline_captured`: homologation or high-level source baseline exists, but installed-car service settings may still be blocked.
- `component_support_captured`: a component manual or support source exists, but installed component identity must still be confirmed.
- `indexed_placeholder`: the system exists in the index, but enough evidence has not been captured for mechanic-facing advice.
- `settings_blocked`: do not provide setup values until evidence gates are met.
- `mechanic_ready_partial`: the assistant can route questions, but system knowledge is incomplete.

## 4. Check the registers

- `ruby tools/print-system-brief.rb --system <system>` for a combined system brief
- `fact-register.csv` for verified or lead-only facts
- `configuration-register.csv` for installed versus assumed configuration
- `parts-register.csv` for component identity and evidence gates
- `settings-register.csv` for blocked or allowed settings
- `source-register.csv` and `sources/notes/` for source context
- `knowledge/templates/` for system-specific capture forms when the user provides photos, measurements, IDs, or asks what to record next

## 5. Decide the answer class

- Verified: answer directly with source ID and local path.
- Cross-checked: answer with both source IDs and any applicability limitation.
- Boundary: say what the source does and does not establish.
- Blocked: state the missing evidence and safe next inspection.
- Diagnostic: run the vintage racecar diagnostic loop.
- Source acquisition: tell the user exactly what source/photo/measurement would unblock the answer.
- Evidence capture: identify the correct template and the register rows/settings gates it can unblock.

## 6. Safety stop

Stop and ask for direction if the next action would:

- alter original material
- compromise safety-critical systems
- depend on unverified component identity
- require choosing originality versus modern safety compliance
- turn a lead-only or blank-field source into a mechanic-facing setting
