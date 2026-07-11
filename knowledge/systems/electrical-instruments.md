# Electrical and Instruments

## Scope

Battery, master switch, starter/charging, ignition feed, pumps, fans, lighting, dash instruments, warning lamps, senders, harness, fusing, relays, and data additions.

## Current Verified State

No wiring diagram, harness variant, or installed electrical equipment has been captured.

Source S015 contains GT40 No. 224 item-number fields for ignition and electrical accessories, but the inspected copy does not populate actionable values:

- Items 232 through 235 cover ignition-system type, number of distributors, number of ignition coils, and number of spark plugs per cylinder.
- Items 236 through 241 cover generator type/count, generator drive method, generator voltage, battery count, battery location, and battery voltage.

Use S015 as an evidence checklist only. It does not provide a wiring diagram, fuse/relay schedule, master-switch layout, generator/alternator output, battery location/voltage, ignition type, fuel-pump wiring, fan wiring, sender compatibility, or gauge calibration.

## Inspection Priorities

- Photograph all switchgear, fuse/relay panels, connector tags, grounding points, and bulkhead penetrations before disconnecting.
- Identify voltage, alternator/generator type, ignition box, fuel pumps, cooling fans, and fire-system wiring.
- Verify gauge sender compatibility before trusting readings.
- Check for old insulation, heat damage, unsupported harness runs, unfused battery feeds, and poor grounds.

## Linked Part Records

Use [../data/parts-register.csv](../data/parts-register.csv) before energizing, repairing, or trusting readings:

- P025 - harness, fuses, relays, and grounds.
- P026 - battery, alternator/generator, starter, and master switch.
- P027 - gauges, senders, switches, and warning lights.
- P028 - safety wiring where fire-system or cutoff behavior is involved.

Apply [../procedures/component-identification.md](../procedures/component-identification.md) before fuse sizing, charging-output assumptions, gauge interpretation, or master-switch acceptance. A gauge reading is not evidence until the gauge and sender pair are identified.

## 1968 FIA Appendix J Safety Benchmark

Source S009 includes period provisions for a general electric circuit breaker and enclosed batteries in racing-car safety sections. Use this as a prompt to document the master switch, battery enclosure, alternator/generator isolation behavior, pump/fan shutdown behavior, and fire-system wiring. Do not infer a wiring diagram or fuse sizing from the regulation.

Source S019 adds current FIA Appendix K safety gates for battery terminal protection, dry/covered cockpit batteries, lithium-battery prohibition, spark-proof master-switch accessibility and marking, engine-stop behavior, fire-extinguisher circuit exceptions, and rear warning-light function. These are event-readiness checks, not proof that the installed wiring is safe or compliant.

Source S015 does not resolve electrical or instrument settings. The blank fields are evidence boundaries, not permission to substitute generic GT40, Ford small-block, or replica wiring assumptions.

## Electrical Evidence Gate

Before energizing, repairing, or trusting an electrical subsystem, capture:

- Battery: count, chemistry, voltage, location, enclosure, cable gauge/routing, disconnect behavior, and protection from heat/chafe.
- Charging/starting: alternator or generator make/model, regulator, starter, solenoid, drive method, cable routing, and expected output source.
- Ignition: distributor/trigger type, coil/box, ballast/resistor if fitted, plug leads, tach drive, kill-switch behavior, and timing-source evidence.
- Harness/protection: fuse/relay panel, unfused feeds, grounds, bulkhead penetrations, wire gauges, insulation condition, connector IDs, pump/fan circuits, and fire-system or master-switch interactions.
- Instruments: gauge make/range, sender make/range, capillary lines, warning lamps, switch labels, and calibration evidence.

Use [../templates/electrical-instruments-capture.md](../templates/electrical-instruments-capture.md) to capture installed evidence before updating ignition, harness, charging, battery, master-switch, instrument, or warning-light records.

## Do Not Guess

No wiring repair, fuse sizing, alternator output, or gauge interpretation should be finalized until the current harness is mapped.
