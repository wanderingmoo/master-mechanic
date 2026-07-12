import assert from "node:assert/strict";
import test from "node:test";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadKnowledgeData } from "./knowledge.js";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("loads every dashboard register row from the portable knowledge base", async () => {
  const data = await loadKnowledgeData(PROJECT_ROOT);
  assert.equal(data.settings.length, 33);
  assert.equal(data.evidenceGaps.length, 30);
  assert.equal(data.parts.length, 31);
  assert.equal(data.sources.length, 28);
});

test("includes recently added safety-critical register entries", async () => {
  const data = await loadKnowledgeData(PROJECT_ROOT);
  assert.ok(data.evidenceGaps.some((gap) => gap.id === "G030"));
  assert.ok(data.parts.some((part) => part.id === "P031"));
  assert.ok(data.sources.some((source) => source.id === "S028"));
});
