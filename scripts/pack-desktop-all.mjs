#!/usr/bin/env node
/**
 * Pack PlainLedger 四版到 Desktop/V{version}/
 * Usage: node scripts/pack-desktop-all.mjs
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const version = manifest.version;
const DESKTOP = path.join(process.env.HOME || "", "Desktop", `V${version.replace(/^v/i, "")}`);
fs.mkdirSync(DESKTOP, { recursive: true });

const labels = {
  personal: "个人版",
  public: "公版（商）",
  publicFree: "公版（免激活）",
  trial24h: "48小时体验版",
};
const editionNotes = {
  personal: "免激活；首次打开可选示例 / 导入 / 空白。",
  public: "需激活码；内置示例账单与完整分类。",
  publicFree: "无需激活码，内置示例账单与完整分类，装好即可用。",
  trial24h: "试用 48 小时；到期后输入激活码继续使用，库内数据不会丢失。",
};

function patchBuiltMain(code, { requireLicense, trialHours }) {
  if (typeof requireLicense === "boolean") {
    code = code.replace(
      /const PLUGIN_REQUIRE_LICENSE = (true|false);/,
      `const PLUGIN_REQUIRE_LICENSE = ${requireLicense};`
    );
  }
  if (typeof trialHours === "number") {
    if (/const PLUGIN_TRIAL_HOURS = \d+;/.test(code)) {
      code = code.replace(/const PLUGIN_TRIAL_HOURS = \d+;/, `const PLUGIN_TRIAL_HOURS = ${trialHours};`);
    } else if (trialHours > 0) {
      code = code.replace(
        /const PLUGIN_REQUIRE_LICENSE = (true|false);/,
        (m) => `${m}\nconst PLUGIN_TRIAL_HOURS = ${trialHours};`
      );
    }
  }
  // 公版免激活：edition 仍为 public（数据同公版），仅关闭授权
  return code;
}

function packPlainLedgerEdition(packKey, buildEdition, folderName, patches = {}) {
  execSync(`PLG_EDITION=${buildEdition} node scripts/build.mjs`, { cwd: root, stdio: "inherit" });

  const dest = path.join(DESKTOP, folderName);
  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(dest, { recursive: true });

  let main = fs.readFileSync(path.join(root, "main.js"), "utf8");
  main = patchBuiltMain(main, patches);
  fs.writeFileSync(path.join(dest, "main.js"), main);

  for (const name of ["manifest.json", "styles.css", "default-ledger.json"]) {
    fs.copyFileSync(path.join(root, name), path.join(dest, name));
  }
  const vendorSrc = path.join(root, "vendor");
  if (fs.existsSync(vendorSrc)) {
    fs.cpSync(vendorSrc, path.join(dest, "vendor"), { recursive: true });
  }

  fs.writeFileSync(
    path.join(dest, "README.txt"),
    `PlainLedger v${version} · ${labels[packKey] || packKey}

${editionNotes[packKey] || ""}

安装：复制本文件夹全部内容到 你的库/.obsidian/plugins/plain-ledger/
然后在 Obsidian 设置 → 第三方插件 中启用 PlainLedger。
`,
    "utf8"
  );
  console.log(`✅ PlainLedger ${labels[packKey]} → ${dest}`);
}

packPlainLedgerEdition("personal", "personal", `PlainLedger-v${version}-个人版`);
packPlainLedgerEdition("public", "public", `PlainLedger-v${version}-公版（商）`);
packPlainLedgerEdition("publicFree", "public", `PlainLedger-v${version}-公版（免激活）`, {
  requireLicense: false,
});
packPlainLedgerEdition("trial24h", "trial24h", `PlainLedger-v${version}-48小时体验版`, {
  trialHours: 48,
});

execSync("PLG_EDITION=personal node scripts/build.mjs", { cwd: root, stdio: "inherit" });

console.log(`\nPlainLedger 四包已输出到 ${DESKTOP}`);
