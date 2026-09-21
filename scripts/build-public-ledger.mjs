#!/usr/bin/env node
/**
 * 公版 default-ledger：完整复制个人版分类树，账单仅 6 笔示意，无订阅/周期。
 * 优先从库内 ledger.json 读分类（作者最新配置），否则用 editions/personal。
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const VAULT_CANDIDATES = [
  process.env.PLG_PERSONAL_LEDGER,
  path.join(
    process.env.HOME || "",
    "Library/Mobile Documents/iCloud~md~obsidian/Documents/日拱一卒/Finance/PlainLedger/ledger.json",
  ),
  path.join(
    process.env.HOME || "",
    "Library/Mobile Documents/iCloud~md~obsidian/Documents/大鹏一日同风起/Finance/PlainLedger/ledger.json",
  ),
].filter(Boolean);

function loadCategorySource() {
  const personalPath = path.join(root, "editions/personal/default-ledger.json");
  const personal = JSON.parse(fs.readFileSync(personalPath, "utf8"));

  for (const vaultPath of VAULT_CANDIDATES) {
    if (!vaultPath || !fs.existsSync(vaultPath)) continue;
    const vault = JSON.parse(fs.readFileSync(vaultPath, "utf8"));
    if (vault.categories?.length) {
      console.log(`Categories from vault: ${vaultPath}`);
      return {
        categories: vault.categories,
        ledgerName: vault.ledger || personal.ledger || "PlainLedger 示例账本",
      };
    }
  }

  console.log("Categories from editions/personal/default-ledger.json");
  return {
    categories: personal.categories,
    ledgerName: "PlainLedger 示例账本",
  };
}

const { categories, ledgerName } = loadCategorySource();

const now = new Date();
const y = now.getFullYear();
const m = String(now.getMonth() + 1).padStart(2, "0");

const sampleTx = [
  { id: "demo-001", datetime: `${y}-${m}-01 08:30`, flow: "expense", category: "生活", subcategory: "家庭聚餐", amount: 28, ledger: "PlainLedger 示例账本", note: "早餐示例", source: "manual" },
  { id: "demo-002", datetime: `${y}-${m}-03 12:15`, flow: "expense", category: "行万里路", subcategory: "公共交通", amount: 6, ledger: "PlainLedger 示例账本", note: "通勤", source: "manual" },
  { id: "demo-003", datetime: `${y}-${m}-05 19:40`, flow: "expense", category: "生活", subcategory: "家庭聚餐", amount: 45, ledger: "PlainLedger 示例账本", note: "晚餐", source: "manual" },
  { id: "demo-004", datetime: `${y}-${m}-08 10:00`, flow: "expense", category: "软件续费", subcategory: "iCloud+", amount: 6, ledger: "PlainLedger 示例账本", note: "云存储", source: "manual" },
  { id: "demo-005", datetime: `${y}-${m}-10 09:00`, flow: "income", category: "其他收入", subcategory: "报销", amount: 120, ledger: "PlainLedger 示例账本", note: "报销示例", source: "manual" },
  { id: "demo-006", datetime: `${y}-${m}-15 09:00`, flow: "income", category: "Work", subcategory: "工资", amount: 8500, ledger: "PlainLedger 示例账本", note: "示例工资", source: "manual" },
];

const out = {
  version: 1,
  exportedAt: new Date().toISOString(),
  ledger: "PlainLedger 示例账本",
  categories: JSON.parse(JSON.stringify(categories)),
  subscriptions: [],
  recurring: [],
  transactions: sampleTx,
};

const dest = path.join(root, "editions/public/default-ledger.json");
fs.writeFileSync(dest, JSON.stringify(out, null, 2));

const bundledJs = path.join(root, "editions/public/bundled-default.js");
fs.writeFileSync(
  bundledJs,
  `const PLUGIN_PUBLIC_DEFAULT_LEDGER = ${JSON.stringify(out)};\n`,
);

const subCount = out.categories.reduce((n, c) => n + (c.subcategories?.length || 0), 0);
console.log(`Wrote ${dest} — ${out.categories.length} 类 · ${subCount} 二级 · ${out.transactions.length} 示意账单 · 0 订阅/周期`);
console.log(`Wrote ${bundledJs} (inlined into main.js)`);
