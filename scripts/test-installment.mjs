import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = fs.readFileSync(path.join(root, "src/main-core.ts"), "utf8");
const start = src.indexOf("function roundMoney(");
const end = src.indexOf("function reportFilterTrendPoints(");
if (start < 0 || end < 0 || end <= start) {
  console.error("helper slice not found");
  process.exit(1);
}

const ctx = {
  fmtMoney: (n) => String(Math.round(Number(n) || 0)),
  pad2: (n) => String(n).padStart(2, "0"),
  dateKey: (d) => {
    const dt = d instanceof Date ? d : new Date();
    const mm = String(dt.getMonth() + 1).padStart(2, "0");
    const dd = String(dt.getDate()).padStart(2, "0");
    return `${dt.getFullYear()}-${mm}-${dd}`;
  },
  amountMatch: () => false,
};
vm.createContext(ctx);
vm.runInContext(src.slice(start, end), ctx);

const assert = (cond, msg) => {
  if (!cond) {
    console.error("FAIL", msg);
    process.exitCode = 1;
  }
};

const {
  computeInstallmentPerAmount,
  addMonthsToDateKey,
  reimbursementOutstanding,
  reimbursementLabel,
  installmentLabel,
  collectPendingDues,
} = ctx;

assert(computeInstallmentPerAmount(1200, 12, "none", 0) === 100, "even split");
assert(computeInstallmentPerAmount(1200, 12, "total", 120) === 110, "total interest spread");
assert(computeInstallmentPerAmount(1200, 12, "fee", 5) === 105, "per-period fee");
assert(addMonthsToDateKey("2026-01-31", 1) === "2026-02-28", "month end clamp");
assert(addMonthsToDateKey("2024-01-31", 1) === "2024-02-29", "leap day clamp");
assert(addMonthsToDateKey("2026-10-08", 1) === "2026-11-08", "next month");

const pending = { reimburse: true, flow: "expense", amount: 100 };
assert(reimbursementOutstanding(pending) === 100, "legacy flag is still outstanding");
assert(reimbursementLabel(pending) === "待报销", "legacy label");
const partial = { ...pending, reimbursedAmount: 40 };
assert(reimbursementOutstanding(partial) === 60, "partial left");
assert(reimbursementLabel(partial).startsWith("待报销"), "partial label");
const done = { ...pending, reimbursedAmount: 100 };
assert(reimbursementOutstanding(done) === 0, "settled");
assert(reimbursementLabel(done) === "已报销", "settled label");
assert(reimbursementOutstanding({ reimburse: true, flow: "income", amount: 80 }) === 0, "income ignored");
assert(installmentLabel({ installmentIndex: 1, installmentPeriods: 12 }) === "分期 1/12", "installment label");

const basePlan = {
  id: "p1",
  active: true,
  posted: 1,
  periods: 12,
  perAmount: 100,
  title: "手机",
  category: "数码",
  subcategory: "",
  startDate: "2026-10-08",
};
const oct = new Date(2026, 9, 8);
const dueNow = collectPendingDues({
  subscriptions: [],
  recurring: [],
  transactions: [],
  installments: [{ ...basePlan, nextDate: "2026-10-08" }],
}, oct);
assert(dueNow.length === 1 && dueNow[0].kind === "installment" && dueNow[0].title.includes("第2/12期"), "due this month");

const later = collectPendingDues({
  subscriptions: [],
  recurring: [],
  transactions: [],
  installments: [{ ...basePlan, nextDate: "2026-11-08" }],
}, oct);
assert(later.length === 0, "future month stays out");

const posted = collectPendingDues({
  subscriptions: [],
  recurring: [],
  transactions: [{ installmentId: "p1", installmentIndex: 2 }],
  installments: [{ ...basePlan, nextDate: "2026-10-08" }],
}, oct);
assert(posted.length === 0, "already posted period hidden");

if (!process.exitCode) console.log("installment tests passed");
