#!/usr/bin/env node
/**
 * Guardrails so local build matches community Release (trial48h flags).
 * Usage: node scripts/release-check.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (name) => fs.readFileSync(path.join(root, name), "utf8");
const json = (name) => JSON.parse(read(name));
const failures = [];

const manifest = json("manifest.json");
const pkg = json("package.json");
const version = manifest.version;

if (pkg.version !== version) failures.push(`package.json=${pkg.version}, manifest=${version}`);
if (pkg.license !== "MIT") failures.push(`package.json license=${pkg.license}, expected MIT`);

const readme = read("README.md");
if (!readme.includes(`**v${version}**`) && !readme.includes(`v${version}`)) {
  failures.push(`README.md 未包含当前版本 ${version}`);
}
if (!readme.includes("## Installation") || !readme.includes("## Usage")) {
  failures.push("README.md 缺少英文 Installation/Usage");
}

const desc = String(manifest.description || "").trim();
if (!desc) {
  failures.push("manifest.description 不能为空");
} else if (!/^[\u4e00-\u9fff]/.test(desc)) {
  // 库内/市场列表介绍用纯中文
  failures.push("manifest.description 应以中文开头（纯中文介绍）");
} else if (!/[.!?]$/.test(desc)) {
  // Scorecard：必须以英文 . ! ? 结尾（中文 。 不算）
  failures.push("manifest.description 须以英文标点 . ! ? 结尾（中文 。 审核不认）");
} else if (/[A-Za-z]{4,}/.test(desc) && !/LifeOS|Moments|iCal|OCR|Tab/.test(desc)) {
  // 允许专有名词；长英文句视为未改干净
  failures.push("manifest.description 应保持纯中文（专有名词除外）");
}

const styles = read("styles.css");
const importantInHidden = (styles.match(/\.plg-capture-tab-pane[^}]*hidden[^}]*!important/g) || []).length;
if (importantInHidden) failures.push("styles.css 记一笔 Tab .hidden 仍含 !important");

const buildSrc = read("scripts/build.mjs");
if (!/ \|\| "trial24h"/.test(buildSrc) && !/ \|\| 'trial24h'/.test(buildSrc)) {
  failures.push('scripts/build.mjs 默认 edition 应为 trial24h（与社区 Release 一致）');
}

if (!fs.existsSync(path.join(root, "main.js"))) {
  failures.push("缺少 main.js（请先 npm run build）");
} else {
  const main = read("main.js");
  if (!main.includes(`const PLUGIN_VERSION = "${version}";`)) {
    failures.push("main.js PLUGIN_VERSION 未与 manifest 同步");
  }
  // trial24h build stamps 48h trial
  if (!/PLUGIN_TRIAL_HOURS\s*=\s*48/.test(main) && !/const PLUGIN_TRIAL_HOURS = 48/.test(main)) {
    // edition file may use different constant names — soft check
    if (!main.includes("48") || !/trial|TRIAL|体验/.test(main)) {
      failures.push("main.js 疑似非 trial48h 构建（未检出 48 小时试用标记）");
    }
  }
}

if (failures.length) {
  console.error(failures.map((f) => `- ${f}`).join("\n"));
  process.exit(1);
}
console.log(`Release check passed: PlainLedger v${version}`);
