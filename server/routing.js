import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { parse } from "csv-parse/sync";

const execFileAsync = promisify(execFile);

export const SYSTEM_LABELS = {
  identity: "Identity & Provenance",
  rules: "Regulatory / Homologation",
  chassis_body: "Chassis & Body",
  engine: "Engine",
  induction: "Induction (Weber/IDA)",
  driveline: "Driveline & Transaxle",
  suspension_steering: "Suspension & Steering",
  brakes_wheels_tires: "Brakes, Wheels & Tires",
  electrical_instruments: "Electrical & Instruments",
  fuel_oil_cooling: "Fuel, Oil & Cooling",
  safety: "Safety Systems",
  general: "Workshop & Fasteners",
  history: "Race & Development History",
  sources: "Source Acquisition",
};

const SYSTEM_PATTERNS = [
  ["chassis_body", /chassis|\btub\b|body|panel|fiberglass|door|clip|structur|monocoque/i],
  ["induction", /weber|carb|\bida\b|jet|choke|induction|intake|fuel.?pressure|float|idle|mixture|linkage|throttle/i],
  ["engine", /engine|block|\b302\b|crank|piston|bore|stroke|compression|cam|valve|lash|rocker|rev.?limit|rpm|head|weslake|gurney|cylinder.?head|chamber|port|spark.?plug|ignition.?tim/i],
  ["driveline", /transaxle|transmission|gearbox|gear.?ratio|hewland|\bzf\b|\blsd\b|differential|clutch|halfshaft|driveline|final.?drive/i],
  ["suspension_steering", /suspension|spring|damper|shock|ride.?height|camber|caster|\btoe\b|corner.?weight|anti.?roll|steering|\brack\b|bump.?steer/i],
  ["brakes_wheels_tires", /brake|caliper|disc|pad|bias|master.?cyl|wheel|tire|tyre|center.?lock|hub|bearing/i],
  ["electrical_instruments", /electric|wir(?:e|ing)|harness|fuse|relay|battery|master.?switch|gauge|sender|alternator|starter|warning.?light/i],
  ["fuel_oil_cooling", /fuel|oil|cool|radiator|water.?pump|sump|dry.?sump|thermostat|catch.?tank|coolant/i],
  ["safety", /safe|safety|appendix.?k|\bhtp\b|belt|extinguish|\brops\b|cage|seat|event.?read|race.?read|track.?read|scrutineer/i],
  ["general", /torque|fastener|bolt|nut|thread|locking|workshop/i],
  ["identity", /\bvin\b|chassis.?number|identity|provenance|who.?built|registry|originality/i],
  ["rules", /homolog|appendix.?j|\bfia\b|regulation|group.?4|recognition|legal|permitted/i],
  ["history", /history|le.?mans|race.?result|winner|palmar/i],
  ["sources", /source|archive|manual|document|reference/i],
];

const SETTING_PATTERN = /\bST\d{3}\b|what.?torque|torque|what.*set|how.?much|what.*pressure|what.*gap|what.*clearance|how.*adjust|\bspec(?:ification)?\b|setting|numeric|value|valve.?lash|spark.?plug|jetting|choke.?size|float.?level|fuel.?pressure|oil.?type|oil.?quantity|oil.?pressure|coolant.?quantity|cap.?pressure|rev.?limit|ignition.?tim|preload|backlash|final.?drive|ride.?height|camber|caster|\btoe\b|brake.?bias|tire.?pressure/i;
const DIAGNOSTIC_PATTERN = /diagnos|symptom|won't.?start|will not start|no.?start|misfire|rough|overheat|leak|pull|vibrat|noise|smoke|problem|issue|fault|low.?oil.?pressure|long.?pedal|instability/i;
const PART_PATTERN = /\b[PC]\d{3}\b|what.?part|identify|identification|casting|serial|stamp|mark|what.*installed|which.*model|compatib|order|machin/i;
const SOURCE_PATTERN = /\bS\d{3}\b|source|where.*find|document|manual|reference|archive|seller.?claim|forum|auction/i;
const SAFETY_PATTERN = /can.?i|safe|ready|complian|track.?day|race.?ready|event.?ready|appendix.?k|\bhtp\b|scrutineer|belt|fire.?system|fuel.?cell|master.?switch|\brops\b|cage/i;
const EVIDENCE_PATTERN = /\bG\d{3}\b|what.*record|what.*photograph|capture|evidence.*need|unblock|measurement/i;

export function extractRegisterIds(question) {
  const ids = question.toUpperCase().match(/\b(?:ST|[PCGSFE])\d{3}\b/g) || [];
  return [...new Set(ids)];
}

export function classifyQuestion(question) {
  const systemEntry = SYSTEM_PATTERNS.find(([, pattern]) => pattern.test(question));
  const system = systemEntry?.[0] || null;

  let requestType = "fact_lookup";
  if (SETTING_PATTERN.test(question)) requestType = "setting_request";
  else if (DIAGNOSTIC_PATTERN.test(question)) requestType = "diagnostic";
  else if (PART_PATTERN.test(question)) requestType = "part_identification";
  else if (SOURCE_PATTERN.test(question)) requestType = "source_acquisition";
  else if (SAFETY_PATTERN.test(question)) requestType = "safety_check";
  else if (EVIDENCE_PATTERN.test(question)) requestType = "evidence_capture";

  return {
    system,
    systemLabel: system ? SYSTEM_LABELS[system] : "Cross-system / unclassified",
    requestType,
    registerIds: extractRegisterIds(question),
  };
}

async function readProjectFile(projectRoot, relativePath, maxChars = 18_000) {
  const absolutePath = path.resolve(projectRoot, relativePath);
  const normalizedRoot = `${path.resolve(projectRoot)}${path.sep}`;
  if (!absolutePath.startsWith(normalizedRoot)) throw new Error("Invalid project path");
  const content = await readFile(absolutePath, "utf8");
  return content.slice(0, maxChars);
}

async function runRuby(projectRoot, script, args = []) {
  const { stdout } = await execFileAsync("ruby", [script, ...args], {
    cwd: projectRoot,
    timeout: 12_000,
    maxBuffer: 1024 * 1024,
  });
  return stdout;
}

async function matchingCsvRows(projectRoot, relativePath, ids) {
  if (!ids.length) return "";
  const content = await readProjectFile(projectRoot, relativePath, 250_000);
  const rows = content.split("\n");
  const header = rows[0];
  const matches = rows.filter((row) => ids.some((id) => row.startsWith(`${id},`)));
  return matches.length ? [header, ...matches].join("\n") : "";
}

async function findEvaluationCase(projectRoot, question) {
  const content = await readProjectFile(projectRoot, "knowledge/data/evaluation-register.csv", 250_000);
  const rows = parse(content, { columns: true, skip_empty_lines: true, trim: true });
  const normalize = (value) => value.trim().replace(/\s+/g, " ").toLowerCase();
  const match = rows.find((row) => row.status === "active" && normalize(row.prompt) === normalize(question));
  if (!match) return null;
  const splitIds = (value) => value ? value.split(";").filter(Boolean) : [];
  return {
    id: match.case_id,
    title: match.title,
    primarySkill: match.primary_skill,
    requiredSourceIds: splitIds(match.required_source_ids),
    requiredRegisterIds: splitIds(match.required_register_ids),
    blockedSettingIds: splitIds(match.must_block_settings),
    requiredBehavior: match.required_behavior,
    forbiddenBehavior: match.forbidden_behavior,
  };
}

const REQUEST_SKILLS = {
  setting_request: ".github/skills/gt40-settings-governance/SKILL.md",
  diagnostic: ".github/skills/vintage-racecar-diagnostics/SKILL.md",
  part_identification: ".github/skills/gt40-component-identification/SKILL.md",
  source_acquisition: ".github/skills/gt40-source-triage/SKILL.md",
  safety_check: ".github/skills/gt40-safety-event-readiness/SKILL.md",
  evidence_capture: ".github/skills/gt40-component-identification/SKILL.md",
};

export async function buildQuestionContext(projectRoot, question) {
  const route = classifyQuestion(question);
  const evaluationCase = await findEvaluationCase(projectRoot, question);
  const sections = [];
  const contextSources = [];

  const addFile = async (relativePath, maxChars) => {
    sections.push(`===== ${relativePath} =====\n${await readProjectFile(projectRoot, relativePath, maxChars)}`);
    contextSources.push(relativePath);
  };

  const addCommand = async (label, script, args) => {
    sections.push(`===== ${label} =====\n${await runRuby(projectRoot, script, args)}`);
    contextSources.push(label);
  };

  await addFile("AGENTS.md", 8_000);
  await addFile(".github/skills/gt40-mechanic-question-routing/SKILL.md", 8_000);
  await addFile("knowledge/04-coverage-matrix.md", 12_000);

  if (evaluationCase) {
    sections.push(`===== Active evaluation gate ${evaluationCase.id} =====
Title: ${evaluationCase.title}
Primary skill: ${evaluationCase.primarySkill}
Required source IDs: ${evaluationCase.requiredSourceIds.join("; ") || "none"}
Required register IDs: ${evaluationCase.requiredRegisterIds.join("; ") || "none"}
Settings that must remain blocked: ${evaluationCase.blockedSettingIds.join("; ") || "none"}
Required behavior: ${evaluationCase.requiredBehavior}
Forbidden behavior: ${evaluationCase.forbiddenBehavior}`);
    contextSources.push(`knowledge/data/evaluation-register.csv#${evaluationCase.id}`);

    const primarySkillPath = `.github/skills/${evaluationCase.primarySkill}/SKILL.md`;
    if (primarySkillPath !== ".github/skills/gt40-mechanic-question-routing/SKILL.md") {
      await addFile(primarySkillPath, 10_000);
    }

    for (const sourceId of evaluationCase.requiredSourceIds) {
      await addCommand(
        `ruby tools/print-source-brief.rb --source ${sourceId} --format text`,
        "tools/print-source-brief.rb",
        ["--source", sourceId, "--format", "text"],
      );
    }

    const registerFiles = [
      ["knowledge/data/fact-register.csv", evaluationCase.requiredRegisterIds.filter((id) => /^F\d{3}$/.test(id))],
      ["knowledge/data/configuration-register.csv", evaluationCase.requiredRegisterIds.filter((id) => /^C\d{3}$/.test(id))],
      ["knowledge/data/parts-register.csv", evaluationCase.requiredRegisterIds.filter((id) => /^P\d{3}$/.test(id))],
      ["knowledge/data/settings-register.csv", evaluationCase.requiredRegisterIds.filter((id) => /^ST\d{3}$/.test(id))],
      ["knowledge/data/evidence-gap-register.csv", evaluationCase.requiredRegisterIds.filter((id) => /^G\d{3}$/.test(id))],
    ];
    for (const [relativePath, ids] of registerFiles) {
      const rows = await matchingCsvRows(projectRoot, relativePath, ids);
      if (!rows) continue;
      sections.push(`===== ${relativePath} evaluation rows =====\n${rows}`);
      contextSources.push(relativePath);
    }
  }

  const routedSkill = REQUEST_SKILLS[route.requestType];
  if (routedSkill && routedSkill !== `.github/skills/${evaluationCase?.primarySkill}/SKILL.md`) {
    await addFile(routedSkill, 10_000);
  }

  if (route.system) {
    await addCommand(
      `ruby tools/print-system-brief.rb --system ${route.system} --format text`,
      "tools/print-system-brief.rb",
      ["--system", route.system, "--format", "text"],
    );
  } else {
    await addFile("knowledge/index.md", 10_000);
  }

  if (route.requestType === "setting_request") {
    const settingIds = route.registerIds.filter((id) => id.startsWith("ST"));
    if (settingIds.length) {
      for (const id of settingIds.slice(0, 3)) {
        await addCommand(
          `ruby tools/print-settings-gates.rb --setting ${id} --format text`,
          "tools/print-settings-gates.rb",
          ["--setting", id, "--format", "text"],
        );
      }
    } else if (route.system) {
      await addCommand(
        `ruby tools/print-settings-gates.rb --system ${route.system} --format text`,
        "tools/print-settings-gates.rb",
        ["--system", route.system, "--format", "text"],
      );
    }
  }

  if (["part_identification", "evidence_capture"].includes(route.requestType)) {
    const partIds = route.registerIds.filter((id) => /^[PC]\d{3}$/.test(id));
    if (partIds.length) {
      for (const id of partIds.slice(0, 3)) {
        await addCommand(
          `ruby tools/print-parts-config.rb --item ${id} --format text`,
          "tools/print-parts-config.rb",
          ["--item", id, "--format", "text"],
        );
      }
    } else if (route.system) {
      await addCommand(
        `ruby tools/print-parts-config.rb --system ${route.system} --format text`,
        "tools/print-parts-config.rb",
        ["--system", route.system, "--format", "text"],
      );
    }
  }

  const sourceIds = route.registerIds.filter((id) => /^S\d{3}$/.test(id));
  for (const id of sourceIds.slice(0, 3)) {
    await addCommand(
      `ruby tools/print-source-brief.rb --source ${id} --format text`,
      "tools/print-source-brief.rb",
      ["--source", id, "--format", "text"],
    );
  }

  const gapIds = route.registerIds.filter((id) => /^G\d{3}$/.test(id));
  if (gapIds.length) {
    const rows = await matchingCsvRows(projectRoot, "knowledge/data/evidence-gap-register.csv", gapIds);
    if (rows) {
      sections.push(`===== knowledge/data/evidence-gap-register.csv matching rows =====\n${rows}`);
      contextSources.push("knowledge/data/evidence-gap-register.csv");
    }
  }

  const factIds = route.registerIds.filter((id) => /^F\d{3}$/.test(id));
  if (factIds.length) {
    const rows = await matchingCsvRows(projectRoot, "knowledge/data/fact-register.csv", factIds);
    if (rows) {
      sections.push(`===== knowledge/data/fact-register.csv matching rows =====\n${rows}`);
      contextSources.push("knowledge/data/fact-register.csv");
    }
  }

  const MAX_CONTEXT_CHARS = 70_000;
  return {
    route,
    context: sections.join("\n\n").slice(0, MAX_CONTEXT_CHARS),
    contextSources: [...new Set(contextSources)],
    evaluationCase,
  };
}
