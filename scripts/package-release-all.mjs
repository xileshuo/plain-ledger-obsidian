#!/usr/bin/env node
/**
 * Package PlainLedger personal / public / trial48h into releases/v{version}-*
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const version = manifest.version;

const labels = {
  personal: "个人版",
  public: "公版",
  trial48h: "48小时体验版",
};

function packEdition(buildEdition, outKey) {
  execSync(`PLG_EDITION=${buildEdition} node scripts/build.mjs`, { cwd: root, stdio: "inherit" });
  const releaseDir = path.join(root, "releases", `v${version}-${outKey}`);
  fs.rmSync(releaseDir, { recursive: true, force: true });
  fs.mkdirSync(releaseDir, { recursive: true });

  for (const name of ["main.js", "manifest.json", "styles.css", "default-ledger.json"]) {
    fs.copyFileSync(path.join(root, name), path.join(releaseDir, name));
  }
  const vendorSrc = path.join(root, "vendor");
  if (fs.existsSync(vendorSrc)) {
    fs.cpSync(vendorSrc, path.join(releaseDir, "vendor"), { recursive: true });
  }

  // Ensure trial pack is 48h even if edition source drifts
  if (outKey === "trial48h") {
    let main = fs.readFileSync(path.join(releaseDir, "main.js"), "utf8");
    if (/const PLUGIN_TRIAL_HOURS = \d+;/.test(main)) {
      main = main.replace(/const PLUGIN_TRIAL_HOURS = \d+;/, "const PLUGIN_TRIAL_HOURS = 48;");
    } else {
      main = main.replace(
        /const PLUGIN_REQUIRE_LICENSE = (true|false);/,
        (m) => `${m}\nconst PLUGIN_TRIAL_HOURS = 48;`
      );
    }
    fs.writeFileSync(path.join(releaseDir, "main.js"), main, "utf8");
  }

  const label = labels[outKey] || outKey;
  fs.writeFileSync(
    path.join(releaseDir, "README.txt"),
    `PlainLedger v${version} · ${label}\n\n安装：复制本目录全部内容到 你的库/.obsidian/plugins/plain-ledger/\n`,
    "utf8"
  );
  fs.writeFileSync(
    path.join(releaseDir, "README.md"),
    `# PlainLedger v${version} (${label})\n\n复制到 \`.obsidian/plugins/plain-ledger/\` 并启用。\n`,
    "utf8"
  );
  console.log(`✅ releases/v${version}-${outKey}/`);
}

packEdition("personal", "personal");
packEdition("public", "public");
packEdition("trial24h", "trial48h");

console.log(`\nPlainLedger releases v${version} 完成。`);
