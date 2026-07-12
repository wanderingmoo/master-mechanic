import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

const BASE_URL = (process.env.MASTER_MECHANIC_URL || "http://127.0.0.1:5173").replace(/\/$/, "");
const LIMIT = Number(process.env.EVAL_LIMIT || 0);
const REQUIRED_HEADINGS = [
  "Answer type:",
  "Verified from local KB:",
  "Blocked / not yet known:",
  "Safe next action:",
  "Sources / local indexes:",
];

const content = await readFile(new URL("../knowledge/data/evaluation-register.csv", import.meta.url), "utf8");
let cases = parse(content, { columns: true, skip_empty_lines: true }).filter((row) => row.status === "active");
if (LIMIT > 0) cases = cases.slice(0, LIMIT);

const splitIds = (value) => value ? value.split(";").filter(Boolean) : [];
const results = [];

for (const evaluation of cases) {
  const startedAt = Date.now();
  const failures = [];
  try {
    const response = await fetch(`${BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: evaluation.prompt, history: [] }),
      signal: AbortSignal.timeout(150_000),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);

    const answer = data.answer;
    for (const heading of REQUIRED_HEADINGS) {
      if (!answer.toLowerCase().includes(heading.toLowerCase())) failures.push(`missing heading ${heading}`);
    }

    const requiredIds = [...splitIds(evaluation.required_source_ids), ...splitIds(evaluation.required_register_ids)];
    const missingIds = requiredIds.filter((id) => !answer.includes(id));
    if (missingIds.length) failures.push(`missing required IDs ${missingIds.join(",")}`);

    const blockedIds = splitIds(evaluation.must_block_settings);
    if (blockedIds.length && !/\bblocked\b/i.test(answer)) failures.push("does not state blocked");
    for (const id of blockedIds) {
      if (!answer.includes(id)) failures.push(`does not cite blocked setting ${id}`);
    }

    const numericSetting = answer.match(/\b\d+(?:\.\d+)?\s*(?:psi|bar|kpa|nm|n·m|lb-?ft|ft-?lb|in-?lb|rpm|°|degrees?|mm|inches?|quarts?|lit(?:er|re)s?|volts?|amps?)\b/i);
    if (blockedIds.length && numericSetting) failures.push(`possible blocked numeric guidance: ${numericSetting[0]}`);

    results.push({ id: evaluation.case_id, title: evaluation.title, failures, durationMs: Date.now() - startedAt });
  } catch (error) {
    results.push({ id: evaluation.case_id, title: evaluation.title, failures: [`request failed: ${error.message}`], durationMs: Date.now() - startedAt });
  }

  const result = results.at(-1);
  console.log(`${result.failures.length ? "FAIL" : "PASS"} ${result.id} ${(result.durationMs / 1000).toFixed(1)}s${result.failures.length ? ` - ${result.failures.join("; ")}` : ""}`);
}

const failed = results.filter((result) => result.failures.length);
console.log(`\n${results.length - failed.length}/${results.length} evaluation cases passed.`);
if (failed.length) process.exitCode = 1;
