#!/usr/bin/env node
/**
 * Archive PlainLedger v2.51.6 personal + public editions.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const version = "2.51.6";

const copySnapshot = (archiveName, extraReadme) => {
  const dir = path.join(root, "archives", archiveName);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });

  const copyFile = (name) => {
    const src = path.join(root, name);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(dir, name));
  };
  const copyDir = (name) => {
    const src = path.join(root, name);
    if (fs.existsSync(src)) fs.cpSync(src, path.join(dir, name), { recursive: true });
  };

  copyDir("src");
  copyDir("editions");
  copyFile("styles.css");
  copyFile("manifest.json");
  copyFile("package.json");
  copyFile("README.md");

  fs.mkdirSync(path.join(dir, "data"), { recursive: true });
  fs.writeFileSync(path.join(dir, "README.md"), extraReadme);
  console.log(`Archived → archives/${archiveName}/`);
};

copySnapshot(`v${version}-personal`, `# PlainLedger v${version} 个人版存档

- 源码快照 + \`editions/personal/\` 完整个人账单
- 无需激活码

## 还原

\`\`\`bash
node scripts/restore-version.mjs ${version}-personal
PLG_EDITION=personal node scripts/build.mjs
\`\`\`

个人账单数据：\`data/ledger-personal.json\`（库内 \`Finance/PlainLedger/ledger.json\` 的备份）
`);

const personalData = path.join(root, "archives", `v${version}-personal`, "data", "ledger-personal.json");
if (!fs.existsSync(personalData)) {
  const src = path.join(root, "editions/personal/default-ledger.json");
  if (fs.existsSync(src)) fs.copyFileSync(src, personalData);
}

copySnapshot(`v${version}-public`, `# PlainLedger v${version} 公版存档

- 源码快照 + \`editions/public/\` 样例账单（12 笔 / 3 订阅）
- 需激活码（见 \`src/license.js\` 算法）

## 还原

\`\`\`bash
node scripts/restore-version.mjs ${version}-public
PLG_EDITION=public node scripts/build.mjs
node scripts/package-release.mjs public
\`\`\`
`);

fs.copyFileSync(
  path.join(root, "editions/public/default-ledger.json"),
  path.join(root, "archives", `v${version}-public`, "data", "default-ledger.json"),
);

console.log("Done.");
