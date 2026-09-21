import fs from "fs";

const root = "/Users/xile/Projects/plain-ledger-obsidian";
const parts = ["src/lunar-lite.ts", "src/smart-parser.ts"].map((p) =>
  fs.readFileSync(`${root}/${p}`, "utf8")
);

const fn = new Function(`
  function pad2(n){return String(n).padStart(2,"0")}
  function dateKey(d){return d.getFullYear()+"-"+pad2(d.getMonth()+1)+"-"+pad2(d.getDate())}
  function uid(){return "x"}
  ${parts.join("\n")}
  function sameDayExpenseKey(t){
    return [t.datetime?.slice(0,10)||"", t.category||"", t.subcategory||"", t.amount].join("|");
  }
  function txSourceRank(t){
    const src=t?.source||"";
    if(src==="smart"||src==="manual") return 0;
    if(src==="recurring"||src==="subscription") return 2;
    return 1;
  }
  function dedupeOverlappingAutoTransactions(data){
    const manualKeys=new Set();
    data.transactions.forEach(t=>{
      if(t.source==="subscription"||t.source==="recurring") return;
      if(t.flow!=="expense") return;
      manualKeys.add(sameDayExpenseKey(t));
    });
    if(!manualKeys.size) return 0;
    const before=data.transactions.length;
    data.transactions=data.transactions.filter(t=>{
      if(t.source!=="subscription"&&t.source!=="recurring") return true;
      if(t.flow!=="expense") return true;
      return !manualKeys.has(sameDayExpenseKey(t));
    });
    return before-data.transactions.length;
  }
  return { subscriptionTxMatchesStrict, subscriptionTxMatchesExact, purgeSubscriptionBackfill, dedupeOverlappingAutoTransactions, sameDayExpenseKey, txSourceRank, isAutoSyncedSubscriptionItem };
`);
const api = fn();

const path =
  "/Users/xile/Library/Mobile Documents/iCloud~md~obsidian/Documents/大鹏一日同风起/Finance/PlainLedger/ledger.json";

function statsForSub(sub, txs) {
  const auto = txs.filter((t) => t.source === "subscription" && api.subscriptionTxMatchesExact(sub, t));
  const all = txs.filter((t) => {
    if (String(t.linkedSubscriptionId || "") === sub.id) return true;
    if (t.source === "subscription" && api.subscriptionTxMatchesExact(sub, t)) return true;
    if (t.source === "subscription") return false;
    return api.subscriptionTxMatchesExact(sub, t);
  });
  const dedupe = (list) => {
    const best = new Map();
    list.forEach((t) => {
      const k = api.sameDayExpenseKey(t);
      const p = best.get(k);
      if (!p || api.txSourceRank(t) < api.txSourceRank(p)) best.set(k, t);
    });
    return [...best.values()];
  };
  const kept = dedupe(all);
  const autoKept = dedupe(auto);
  return {
    periods: kept.length,
    autoPeriods: autoKept.length,
    linkedPeriods: kept.length - autoKept.length,
    amount: kept.reduce((s, t) => s + t.amount, 0),
    bySource: kept.reduce((a, t) => {
      a[t.source] = (a[t.source] || 0) + 1;
      return a;
    }, {}),
  };
}

const data = JSON.parse(fs.readFileSync(path, "utf8"));
const subs = data.subscriptions || [];
const d2 = JSON.parse(fs.readFileSync(path, "utf8"));
const rbBefore = d2.transactions.length;
api.purgeSubscriptionBackfill(d2);
const removedBackfill = rbBefore - d2.transactions.length;
const removedOverlap = api.dedupeOverlappingAutoTransactions(d2);

console.log("=== 全量订阅审计 (v2.10.0) ===\n");
console.log(`删除自动回填: ${removedBackfill} 笔 | 同日重复: ${removedOverlap} 笔`);
console.log(`账单: ${data.transactions.length} → ${d2.transactions.length}\n`);

for (const s of subs) {
  const before = statsForSub(s, data.transactions);
  const after = statsForSub(s, d2.transactions);
  console.log(
    `${s.name.padEnd(14)} | 清理前 ${String(s.generatedCount || 0).padStart(2)}/${String(before.periods).padStart(2)} 笔 → 清理后 ${String(after.periods).padStart(2)} 笔 (自动${after.autoPeriods}+关联${after.linkedPeriods}) ¥${after.amount.toFixed(2).padStart(8)} ${JSON.stringify(after.bySource)}`
  );
}
