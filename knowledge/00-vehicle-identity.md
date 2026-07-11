# Vehicle Identity Worksheet

## Working Vehicle Definition

The working subject is a 1968-era Ford GT40 Mk I style vehicle configured with a Ford small-block 302 using Gurney-Weslake cylinder heads or a Gurney-Weslake-derived engine package.

This is not yet enough to treat any single specification as authoritative. GT40s varied by chassis number, team, event, later rebuild history, and current restoration state. The assistant must ask for or inspect chassis records before making final recommendations.

## Required Identifiers

| Identifier | Current value | Why it matters |
|---|---|---|
| Chassis number | Unknown | Determines original build spec, race history, body/tub details, and eligibility. |
| Engine block casting and build sheet | Unknown | Separates period 302 GT40, later Ford 302, and reproduction engine builds. |
| Cylinder head casting/markings | Unknown | Confirms Gurney-Weslake heads versus later Weslake-style or other aluminum heads. |
| Induction | Assumed Weber IDA until verified | Jetting, linkage, fuel pressure, and fire risk depend on exact carburetor setup. |
| Transaxle | Unknown; S015 verifies a base ZF 5-speed recognition entry and a 1968 Hewland LG600 / Ford H/D limited-slip evolution | Ratios, oil, preload, and limited-slip settings are transaxle-specific. |
| Brakes | Unknown | Caliper, disc, pad compound, and master cylinder changes alter service settings. |
| Wheels and tires | Unknown | Center-lock hardware, tire construction, pressure, and alignment are coupled. |
| Current use | Unknown | Road, concours, historic racing, and track use require different risk decisions. |

## Applicability Rules

- Treat "1968 GT40" as a period/race-rule context until chassis identity is proven.
- Treat "Gurney-Weslake 302" as an engine-family statement until block, heads, cam, induction, compression, and builder records are proven.
- Do not transfer Mk II, Mk IV, continuation, replica, Pantera, or generic Ford 302 specifications without an explicit compatibility note.
- Do not publish torque values, clearances, jetting, alignment, ride height, brake bias, tire pressures, or fluid quantities as actionable unless tied to an evidence tier 1 or tier 2 source in [01-source-policy.md](01-source-policy.md).

## Known Historical Baseline

The official 24H Le Mans palmarès API now verifies the core 1968 winning-row fields: participant number 9, team JWA, car FORD GT 40, drivers Pedro Rodriguez and Lucien Bianchi, classified first overall and first in category S 3001 cm3 à 5000 cm3.

The Ford Heritage Vault S027 press-release PDF adds Ford-authored historical context that the FIA capped displacement at 5 liters and that, under Gulf Oil sponsorship, Mark I GT40s won Le Mans in 1968 and 1969. This supports Ford program context only; it does not identify the user's chassis, installed engine, lap count, or preparation details.

Secondary sources further describe the 1968 Le Mans-winning GT40 as a Mk I run by J.W. Automotive Engineering/Gulf, chassis GT40P/1075, using a 4.9 L or 302 cu in Ford Windsor-derived V8. They also describe 1968 rule changes that allowed homologated Group 4 sports cars up to 5.0 L while restricting Group 6 prototypes to 3.0 L.

These statements are stored as historical context, not shop settings. S025 verifies only the official race-result row fields listed above. S027 provides Ford press-release context, not event-entry proof or installed-car proof. Engine displacement, lap count, chassis identity, Gulf/JWA preparation, and any installed-engine implications require original homologation papers, Ford/JWA records, official entry/program/scrutineering records, ACO-licensed records, or period service documents before they become mechanic-facing specifications.

## Verified Regulatory Baseline

FIA Appendix J 1968 is now indexed locally as source S009. It verifies the regulation context for Group 4 sportscars, the 50-car recognition threshold, the two-seat sportscar requirement, and the relevant over-3,000 cc to 5,000 cc displacement class for a 302 cu in / about 4.9 L engine.

This regulatory baseline does not identify this specific car. It raises the evidence requirement for chassis identity, homologation form, engine details, driveline hardware, suspension principle, brake system, and minimum weight.

## Configuration Register

The current component-by-component evidence state is tracked in [data/configuration-register.csv](data/configuration-register.csv). Use that register before advising on parts, settings, compatibility, or inspection priorities.
