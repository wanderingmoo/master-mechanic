import assert from "node:assert/strict";
import test from "node:test";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildQuestionContext, classifyQuestion, extractRegisterIds } from "./routing.js";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("routes a valve-lash request through engine settings governance", () => {
  const route = classifyQuestion("What is the valve lash spec for the Gurney-Weslake heads?");
  assert.equal(route.system, "engine");
  assert.equal(route.requestType, "setting_request");
});

test("routes a transaxle identification question", () => {
  const route = classifyQuestion("How do I identify the installed transaxle?");
  assert.equal(route.system, "driveline");
  assert.equal(route.requestType, "part_identification");
});

test("routes a no-start symptom through diagnostics", () => {
  const route = classifyQuestion("The engine will not start. Where should I begin?");
  assert.equal(route.system, "engine");
  assert.equal(route.requestType, "diagnostic");
});

test("routes track readiness through safety", () => {
  const route = classifyQuestion("Is the car safe and ready for a track day?");
  assert.equal(route.system, "safety");
  assert.equal(route.requestType, "safety_check");
});

test("extracts unique register IDs", () => {
  assert.deepEqual(extractRegisterIds("Explain ST002, P006, and ST002 using S015."), ["ST002", "P006", "S015"]);
});

test("loads the declared skill and evidence gate for an active evaluation prompt", async () => {
  const result = await buildQuestionContext(PROJECT_ROOT, "What ignition timing should I run on the Gurney-Weslake 302?");
  assert.equal(result.evaluationCase.id, "E001");
  assert.equal(result.evaluationCase.primarySkill, "gt40-settings-governance");
  assert.ok(result.context.includes("Required source IDs: S009; S015"));
  assert.ok(result.context.includes("Settings that must remain blocked: ST001"));
});
