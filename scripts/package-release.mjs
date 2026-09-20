#!/usr/bin/env node
/**
 * Build and package a PlainLedger release.
 * Usage: node scripts/package-release.mjs personal|public
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const edition = process.argv[2];

if (!edition || !["personal", "public"].includes(edition)) {
  console.error("Usage: node scripts/package-release.mjs personal|public");
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const version = manifest.version;
const releaseDir = path.join(root, "releases", `v${version}-${edition}`);

execSync(`PLG_EDITION=${edition} node scripts/build.mjs`, { cwd: root, stdio: "inherit" });

fs.rmSync(releaseDir, { recursive: true, force: true });
fs.mkdirSync(releaseDir, { recursive: true });

for (const name of ["main.js", "manifest.json", "styles.css", "default-ledger.json"]) {
  fs.copyFileSync(path.join(root, name), path.join(releaseDir, name));
}

const vendorSrc = path.join(root, "vendor");
if (fs.existsSync(vendorSrc)) {
  fs.cpSync(vendorSrc, path.join(releaseDir, "vendor"), { recursive: true });
}

const readme = `# PlainLedger v${version} (${edition === "personal" ? "个人版" : "公版"})

## 安装

复制本目录全部文件到：

\`\`\`text
你的库/.obsidian/plugins/plain-ledger/
\`\`\`

在 Obsidian **设置 → 第三方插件** 中启用 PlainLedger。

${edition === "public" ? "## 激活\n\n公版首次打开需输入激活码。复制面板中的设备指纹发给作者获取 KEY。\n" : "## 说明\n\n个人版无需激活，内置完整账单备份。\n"}

## 还原此版本源码

\`\`\`bash
cd ~/Projects/plain-ledger-obsidian
node scripts/restore-version.mjs ${version}-${edition}
PLG_EDITION=${edition} node scripts/build.mjs
\`\`\`
`;

fs.writeFileSync(path.join(releaseDir, "README.md"), readme);
console.log(`Packaged → releases/v${version}-${edition}/`);
