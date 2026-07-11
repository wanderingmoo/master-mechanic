# Source Note S016 - Hewland Classic LG500/LG600 Manual

## Source identity

- Source ID: S016
- Title: Hewland LG500/LG600 manual
- Source URL: https://hewlandclassic.com/assets/manuals/LG500_LG600.pdf
- Related authority/source-control URL: https://hewlandclassic.com/
- Local archive: `sources/archive/S016-hewland-lg500-lg600-manual.pdf`
- SHA-256: `2f91072c884cf834b7ca132f03338d002fced18f99165c1b1a8100e0ec9a4b7e`
- PDF metadata: 19 pages; PDF 1.4; created 2001-05-25; modified 2007-09-11; producer Acrobat Distiller 4.0 for Windows.
- Source tier: Tier 1 under the local source policy because it is a component manual from Hewland Classic, with S017 recording the related Hewland Classic authority/support pages.
- Status: Verified and archived locally.

## Extraction method

- `pdfinfo` verified a 19-page, non-encrypted PDF.
- `pdftotext -layout sources/archive/S016-hewland-lg500-lg600-manual.pdf /private/tmp/master-mechanic-s016/s016.txt` produced usable text for indexing.
- The extracted text has OCR/layout gaps in some page headings, part labels, and torque lines. Numeric torque, backlash, preload, and oil-fill values must therefore be checked against the rendered PDF/manual before they are promoted into settings.

## Why this source matters

S015 verifies a 1968 Ford GT 40 homologation evolution for a Hewland LG600 5-speed gearbox. S016 provides component-level context for LG500/LG600 service, layout, ratio changes, lubrication, differential handling, and rebuild cautions.

This source does not prove that the project car currently has an LG600 installed. Use it only after the installed transaxle is identified by plate, serial, case markings, build sheet, or physical inspection.

## Extracted facts

- The manual covers LG-series transaxle units, specifically LG500 and LG600.
- The LG500/LG600 family is described as intended for 300 to 450 cubic inch competition engines.
- The manual describes one 3.3:1 final-drive ratio for the covered units.
- The gears are straight-cut, non-synchronized, use face dogs, and ratios are changeable without removing the transaxle from the chassis.
- The manual states that all ratios except bottom gear are interchangeable.
- The differential and crown-wheel assembly runs on taper roller bearings, with pre-load adjusted by shims.
- The manual describes caged needle rollers, heat-treated nickel-chrome steel gears and shafts, aluminum-bronze selector forks, and magnesium-alloy casings.
- The gearbox section is lubricated by splash, while the final drive is lubricated by pump through a filter.
- The manual provides for an external oil cooler and strongly recommends oil cooling to keep oil temperature below 110 C / 250 F.
- Gear pairs must be exchanged as matched pairs and checked against etched tooth numbers.
- Selector-fork setup requires high accuracy; the manual strongly recommends the Hewland setting jig.
- The crown wheel and pinion are precision matched and should not be replaced separately.
- The manual contains maintenance cautions including use of genuine spares, new nuts and gaskets, and correct refill through the two filler holes.
- During gear-train stripping, the manual instructs inspection of hubs, clutch rings, gears, selector forks, and fork-to-clutch-ring play; renewed hubs should match original length, and pinion-assembly clearance remains important to avoid overheating, seizure, or excessive wear.
- The selector-fork setup section requires clutch rings to be centered on their hubs, fully engage either gear, and retain clearance between gear and clutch-ring faces when engaged. It also calls for rechecking clearances and movements before installation.
- Main-case service instructions include washing out sludge and confirming no small metallic objects or particles remain in the case.
- Oil-pump and filter instructions call for inspecting pump gears/body for scoring, washing the oil filter, and avoiding over-tightening the filter bung because the filter should still be just turnable with slight hand pressure.
- Crown wheel and pinion setup is described as a matched-pair operation using setting gauges, dummy bearings, shims, backlash measurement, and preload checks; absence of backlash can give a false impression of preload.

## Mechanic-facing implications

- If the installed unit is verified as Hewland LG600, S016 becomes the primary manual for transaxle inspection workflow, ratio-change procedure, lubrication architecture, differential handling, and rebuild cautions.
- Treat S016 as a setup-method source before treating it as a settings source: it identifies the required fixtures, inspections, matched parts, and reassembly discipline even where numeric values remain blocked.
- Do not extract torque, backlash, bearing preload, or oil-fill values from OCR alone. Use direct manual inspection and component condition before turning any value into a setting.
- If the installed transaxle is ZF, Kar-Kraft, Colotti, replica, or a modified Hewland derivative, S016 is context only unless compatibility is proven.

## Open questions

- Installed transaxle make, model, serial number, case type, and gearset are unknown.
- Installed differential type and Ford heavy-duty LSD part identity are unknown.
- Oil type, oil quantity, preload, backlash, shift linkage setup, and clutch release settings remain blocked until hardware identity and manual applicability are confirmed.
