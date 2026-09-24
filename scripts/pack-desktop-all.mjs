#!/usr/bin/env node
/**
 * Pack PlainLedger 两版到 Desktop：个人版 / 公版48小时试用版
 * Usage: node scripts/pack-desktop-all.mjs [outdir]
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const version = manifest.version;
const DESKTOP = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(process.env.HOME || "", "Desktop", `V${version.replace(/^v/i, "")}`);
fs.mkdirSync(DESKTOP, { recursive: true });

const packs = [
  {
    key: "personal",
    buildEdition: "personal",
    folder: `PlainLedger-v${version}-个人版`,
    note: "免激活；首次打开可选示例 / 导入 / 空白。",
    patches: {},
  },
  {
    key: "trial48h",
    buildEdition: "trial24h",
    folder: `PlainLedger-v${version}-公版48小时试用版`,
    note: "公版 48 小时试用；到期后输入激活码继续使用，库内数据不会丢失。",
    patches: { trialHours: 48, requireLicense: true },
  },
];

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
  return code;
}

function packPlainLedgerEdition({ buildEdition, folder, note, patches }) {
  execSync(`PLG_EDITION=${buildEdition} node scripts/build.mjs`, { cwd: root, stdio: "inherit" });

  const dest = path.join(DESKTOP, folder);
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
    `PlainLedger v${version} · ${folder.replace(`PlainLedger-v${version}-`, "")}

${note}

安装：复制本文件夹全部内容到 你的库/.obsidian/plugins/plain-ledger/
然后在 Obsidian 设置 → 第三方插件 中启用 PlainLedger。
`,
    "utf8"
  );
  console.log(`✅ PlainLedger → ${dest}`);
  return dest;
}

const outs = packs.map((p) => packPlainLedgerEdition(p));

execSync("PLG_EDITION=trial24h node scripts/build.mjs", { cwd: root, stdio: "inherit" });

console.log(`\nPlainLedger 两包已输出到 ${DESKTOP}`);
console.log(outs.map((p) => `  - ${path.basename(p)}`).join("\n"));
