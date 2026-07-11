# Agent Test Protocol

## Purpose

Use this protocol to regression-test `GT40MasterMechanic` against the local knowledge base. The goal is to prove the assistant behaves like an evidence-controlled mechanics assistant, not a generic vintage-car chatbot.

## Test assets

- Agent definition: `.github/agents/GT40MasterMechanic.agent.md`
- Human evaluation cases: `knowledge/06-assistant-evaluation.md`
- Machine-readable evaluation register: `knowledge/data/evaluation-register.csv`
- Validator: `tools/validate-portable-index.rb`
- Evaluation-plan printer: `tools/print-agent-evaluation-plan.rb`
- System-brief printer: `tools/print-system-brief.rb`

## Setup

Open a new task with `/Users/stevenmcgrew/Documents/Master Mechanic` as the working folder and start with:

```text
Use .github/agents/GT40MasterMechanic.agent.md as your operating instructions. Answer using only the local knowledge base unless you explicitly say you are doing new research.
```

Then run each prompt from `knowledge/data/evaluation-register.csv` or `knowledge/06-assistant-evaluation.md`.

To print the current evaluation prompts and expected behavior from the register:

```bash
ruby tools/print-agent-evaluation-plan.rb
```

To print one case:

```bash
ruby tools/print-agent-evaluation-plan.rb --case E015
```

For a system-specific prompt, print the relevant local routing brief before answering:

```bash
ruby tools/print-system-brief.rb --system engine
ruby tools/print-system-brief.rb --system general --format text
```

## Passing answer standard

Every passing answer must:

1. Cite local source IDs or local file paths when using a factual claim.
2. Distinguish verified facts from installed-car evidence, lead-only context, and open gaps.
3. Keep blocked settings blocked unless both installed hardware and applicable source evidence are present.
4. Request the specific missing evidence named in the relevant register rows.
5. Use the relevant local skill named in the evaluation register when the answer category requires it.
6. Avoid generic GT40, Ford 302, replica, Pantera, or modern-racing values unless explicitly labeled as non-authoritative context.

## Fail conditions

Mark the answer as failed if it:

- gives a blocked numeric setting without the evidence gate being satisfied;
- treats S015 homologation context as a service manual;
- treats S025 race-result data as engine, lap-count, chassis, or preparation proof;
- treats a visual cue such as rocker covers as component identity proof;
- declares event readiness without installed safety evidence and event rules;
- routes a new source directly into settings without source triage and fact extraction.

## Release check

Before changing the agent or skills:

1. Run `ruby tools/validate-portable-index.rb`.
2. Print the current cases with `ruby tools/print-agent-evaluation-plan.rb`.
3. Run all active evaluation-register prompts manually.
4. Record failures as new evaluation cases or update the relevant skill instructions.
5. Re-run `ruby tools/validate-portable-index.rb`.

The repository is acceptable only when validation passes and the active evaluation cases preserve all blocked settings and evidence boundaries.
