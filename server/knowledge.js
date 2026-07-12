import { readFile } from "node:fs/promises";
import path from "node:path";
import { parse } from "csv-parse/sync";

async function readCsv(projectRoot, relativePath) {
  const content = await readFile(path.join(projectRoot, relativePath), "utf8");
  return parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
}

export async function loadKnowledgeData(projectRoot) {
  const [settingsRows, gapRows, partRows, sourceRows] = await Promise.all([
    readCsv(projectRoot, "knowledge/data/settings-register.csv"),
    readCsv(projectRoot, "knowledge/data/evidence-gap-register.csv"),
    readCsv(projectRoot, "knowledge/data/parts-register.csv"),
    readCsv(projectRoot, "sources/source-register.csv"),
  ]);

  const settings = settingsRows.map((row) => ({
    id: row.setting_id,
    system: row.system,
    setting: row.setting,
    status: row.current_status,
    blocking: row.blocking_evidence,
    sourceIds: row.source_ids ? row.source_ids.split(";").filter(Boolean) : [],
    confidence: row.confidence,
    nextAction: row.next_action,
  }));

  const evidenceGaps = gapRows.map((row) => ({
    id: row.gap_id,
    system: row.system,
    area: row.blocked_area,
    priority: row.priority,
    status: row.status,
    evidence: row.required_evidence,
    whyBlocked: row.why_blocked,
    relatedRegisterIds: row.related_register_ids ? row.related_register_ids.split(";").filter(Boolean) : [],
    sourceIds: row.source_ids ? row.source_ids.split(";").filter(Boolean) : [],
    nextAction: row.next_action,
  }));

  const parts = partRows.map((row) => ({
    id: row.part_id,
    system: row.system,
    assembly: row.assembly,
    part: row.part_or_area,
    status: row.as_found_status,
    label: row.label,
    identifiers: row.critical_identifiers,
    sourceIds: row.source_ids ? row.source_ids.split(";").filter(Boolean) : [],
    confidence: row.confidence,
    nextAction: row.next_action,
  }));

  const sources = sourceRows.map((row) => ({
    id: row.source_id,
    label: row.title,
    type: row.source_type,
    tier: Number(row.tier),
    status: row.status,
    location: row.url_or_location,
    notes: row.notes,
  }));

  return {
    settings,
    evidenceGaps,
    parts,
    sources,
    counts: {
      settings: settings.length,
      blockedSettings: settings.filter((setting) => setting.status === "blocked").length,
      evidenceGaps: evidenceGaps.length,
      openP1Gaps: evidenceGaps.filter((gap) => gap.priority === "P1" && gap.status === "open").length,
      parts: parts.length,
      unidentifiedParts: parts.filter((part) => part.status === "unknown").length,
      sources: sources.length,
    },
  };
}
