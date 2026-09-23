#!/usr/bin/env node
/**
 * Build PlainLedger three editions, zip them, and publish GitHub Release.
 * Requires: gh auth login, git initialized, remote set.
 *
 * Usage:
 *   node scripts/deploy-github-releases.mjs
 *   node scripts/deploy-github-releases.mjs --repo owner/plain-ledger-obsidian
 */
import fs from "fs";
import path from "path";
import { execSync, spawnSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const version = manifest.version;

const labels = {
  personal: "个人版",
  public: "公版",
  trial24h: "48小时体验版",
};

const zipNames = {
  personal: `PlainLedger-v${version}-个人版.zip`,
  public: `PlainLedger-v${version}-公版.zip`,
  trial24h: `PlainLedger-v${version}-48小时体验版.zip`,
};

function run(cmd, opts = {}) {
  execSync(cmd, { cwd: root, stdio: "inherit", ...opts });
}

function gh(args) {
  const r = spawnSync("gh", args, { cwd: root, encoding: "utf8" });
  if (r.status !== 0) {
    throw new Error((r.stderr || r.stdout || `gh ${args.join(" ")}`).trim());
  }
  return (r.stdout || "").trim();
}

function zipDir(srcDir, zipPath) {
  fs.mkdirSync(path.dirname(zipPath), { recursive: true });
  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
  run(`ditto -c -k --sequesterRsrc --keepParent "${srcDir}" "${zipPath}"`);
}

function parseRepoArg() {
  const idx = process.argv.indexOf("--repo");
  if (idx >= 0 && process.argv[idx + 1]) return process.argv[idx + 1];
  return process.env.PLG_GITHUB_REPO || "";
}

function ensureGhAuth() {
  try {
    gh(["auth", "status"]);
  } catch (_) {
    console.error("\n未登录 GitHub。请先运行：\n  gh auth login -h github.com -p https -w\n");
    process.exit(1);
  }
}

function ensureRemote(repo) {
  let remote = "";
  try {
    remote = execSync("git remote get-url origin", { cwd: root, encoding: "utf8" }).trim();
  } catch (_) { /* no remote */ }
  if (!remote && repo) {
    run(`git remote add origin "https://github.com/${repo}.git"`);
    return repo;
  }
  if (remote) {
    const m = remote.match(/github\.com[:/](.+?)(?:\.git)?$/);
    return m ? m[1] : repo;
  }
  if (!repo) {
    console.error("请指定仓库：--repo 你的用户名/plain-ledger-obsidian");
    process.exit(1);
  }
  return repo;
}

console.log(`\nPlainLedger v${version} → GitHub Releases\n`);

ensureGhAuth();

execSync("node scripts/package-release-all.mjs", { cwd: root, stdio: "inherit" });

const distDir = path.join(root, "dist", `v${version}`);
fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

const zipPaths = [];
for (const edition of ["personal", "public", "trial24h"]) {
  const src = path.join(root, "releases", `v${version}-${edition}`);
  const zip = path.join(distDir, zipNames[edition]);
  zipDir(src, zip);
  zipPaths.push(zip);
  console.log(`📦 ${zipNames[edition]}`);
}

const tag = `v${version}`;
const repo = ensureRemote(parseRepoArg());

try {
  gh(["release", "view", tag, "--repo", repo]);
  console.log(`\nRelease ${tag} 已存在，上传/更新资产…`);
  for (const zip of zipPaths) {
    run(`gh release upload ${tag} "${zip}" --repo ${repo} --clobber`);
  }
} catch (_) {
  const notes = [
    "## PlainLedger v" + version,
    "",
    "| 包 | 说明 |",
    "|---|---|",
    `| ${zipNames.personal} | 个人版 · 免激活 |`,
    `| ${zipNames.public} | 公版 · 需激活 |`,
    `| ${zipNames.trial24h} | 48 小时体验版 |`,
    "",
    "安装：解压后将文件夹内全部内容复制到 `你的库/.obsidian/plugins/plain-ledger/` 并启用插件。",
  ].join("\n");
  const notesFile = path.join(distDir, "release-notes.md");
  fs.writeFileSync(notesFile, notes, "utf8");
  run(`gh release create ${tag} ${zipPaths.map((z) => `"${z}"`).join(" ")} --repo ${repo} --title "PlainLedger v${version}" --notes-file "${notesFile}"`);
}

console.log(`\n✅ 发布完成：https://github.com/${repo}/releases/tag/${tag}\n`);
