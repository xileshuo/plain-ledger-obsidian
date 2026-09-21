// ─── Plugin bootstrap (obsidian import in src/00-obsidian.ts) ────────────────

const PLUGIN_VERSION = "4.0.14";
const VIEW_TYPE = "plain-ledger-dashboard";
const ICON_NAME = "wallet";

const DEFAULT_SETTINGS = {
  dataFolder: "Finance/PlainLedger",
  monthlyBudget: 8000,
  lastImportAt: "",
  lastImportFile: "",
  initialized: false,
  onboardingComplete: false,
  onboardingChoice: "",
  dailyNoteOnSave: false,
  dailyNoteFolder: "Daily Notes",
  categoryKeywords: {},
  carryoverEnabled: true,
  carryoverCategoryName: "月结",
  carryoverIntroShown: false,
  showAdvancedSettings: false,
  navIcons: {},
  ocrLangCached: false,
  licenseKey: "",
  publicSampleApplied: false,
  licenseActivated: false,
  trialStartedAt: "",
  trialWelcomeSeen: false,
  trialReminder2hSeen: false,
  trialReminder30mSeen: false,
  welcomeGuideVersion: "",
  usageGuideFileVersion: "",
  lastSeenVersion: "",
  uiState: {
    tab: "home",
    homeSubview: "list",
    period: "month",
    reportFlow: "expense",
    reportTopic: "",
    reportPresetId: "",
    reportGroupMode: "category",
    listCategory: "all",
    listReimburseOnly: false,
    listSearch: "",
    collapsedDays: [],
    pendingDuesExpanded: false,
    pendingDuesShowAll: false,
    settingsSections: {},
  },
};

// ─── Utilities ─────────────────────────────────────────────────────────────

const BALANCE_TERM_MONTHLY = "月度结余";

function ytdBalanceLabel(month) {
  return `年累计结余(1-${month}月)`;
}

function periodBalanceLabel(period) {
  if (period === "all") return "总结余";
  if (period === "year") return "年结余";
  if (period === "week") return "周结余";
  return BALANCE_TERM_MONTHLY;
}

const SETTLE_BALANCE_HELP =
  "按当年真实收支累计（不含月结结转行与转账）。每月 1 日系统自动生成结转账单；预算与图表也不计结转。";

function pad2(n) { return String(n).padStart(2, "0"); }

function openSettleBalanceHelp(app) {
  openPlgOverlay({
    title: "结余说明",
    stack: true,
    build: (body, close) => {
      addClasses(body, "plg-modal");
      body.createEl("p", { text: SETTLE_BALANCE_HELP, cls: "plg-muted" });
      body.createEl("p", {
        text: `· ${BALANCE_TERM_MONTHLY}：当月收入减支出（不含结转）`,
        cls: "plg-muted",
      });
      body.createEl("p", {
        text: `· ${ytdBalanceLabel(12)}：当年 1 月起至所选月份`,
        cls: "plg-muted",
      });
      const row = body.createDiv({ cls: "plg-modal-actions" });
      row.createEl("button", {
        text: "知道了",
        cls: "mod-cta",
        attr: { type: "button" },
      }).onclick = close;
    },
  });
}

function appendBalanceInfoBtn(parent, app) {
  const btn = parent.createEl("button", {
    text: "ⓘ",
    cls: "plg-balance-info-btn",
    attr: { type: "button", "aria-label": "结余说明" },
  });
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    openSettleBalanceHelp(app);
  });
  return btn;
}

const STATS_SCOPE_TIP = "统计与环比 · 不含月结结转\n进行中的月/年/周按「截至今日」同期对比（同比对去年同段，环比对上一同段）";
const REPORT_SCOPE_TIP = "按分类筛选查看支出/收入构成 · 不含月结结转";
const CAL_SCOPE_TIP = "日历热力按日支出统计，不含月结结转";
const PLG_SUMMARY_SCROLL_ROWS = 10;

function appendScopeTipBtn(parent, tip) {
  const tipText = Array.isArray(tip) ? tip.join("\n") : tip;
  const btn = parent.createEl("button", {
    text: "ⓘ",
    cls: "plg-balance-info-btn plg-scope-tip-btn",
    attr: { type: "button", "aria-label": tipText.replace(/\n/g, " ") },
  });
  bindPlgTipIcon(btn, tipText);
  return btn;
}

function fmtYoYPct(cmp) {
  if (!cmp) return "";
  return fmtPct(cmp.pct);
}

/** 环比：月→较上月，年→较上年，周→较上周；总→无 */
function periodSummaryChainCompare(allTx, period, refDate, flow) {
  if (period === "all") return null;
  return periodComparePercent(allTx, period, refDate, flow);
}

function periodYoYRefDate(period, refDate) {
  const prev = new Date(refDate);
  if (period === "year" || period === "month") {
    prev.setFullYear(prev.getFullYear() - 1);
    return prev;
  }
  if (period === "week") {
    prev.setDate(prev.getDate() - 365);
    return prev;
  }
  return null;
}

function periodCompareYoYAmount(allTx, period, refDate, flow) {
  const yoy = periodYoYWindow(period, refDate);
  if (!yoy) return null;
  const cur = flowSumInWindow(allTx, yoy.cur.start, yoy.cur.end, flow);
  const prev = flowSumInWindow(allTx, yoy.start, yoy.end, flow);
  if (prev <= 0) return null;
  return { pct: ((cur - prev) / prev) * 100, label: "同比" };
}

function periodCompareYoYCount(allTx, period, refDate, flow) {
  const yoy = periodYoYWindow(period, refDate);
  if (!yoy) return null;
  const cur = flowCountInWindow(allTx, yoy.cur.start, yoy.cur.end, flow);
  const prev = flowCountInWindow(allTx, yoy.start, yoy.end, flow);
  if (prev <= 0) return null;
  return { pct: ((cur - prev) / prev) * 100, label: "同比" };
}

function buildCalDaySummaryLines(info) {
  const lines = [];
  const row1 = [];
  if (info.income > 0) row1.push(`收入 ${fmtMoney(info.income)}`);
  if (info.expense > 0) row1.push(`支出 ${fmtMoney(info.expense)}`);
  if (row1.length) lines.push(row1.join(" · "));
  const row2 = [];
  if (info.income > 0 && info.expense > 0) {
    row2.push(`结余 ${fmtMoney(info.income - info.expense)}`);
  }
  if (info.count > 0) row2.push(`笔数${info.count}`);
  return lines.length ? lines : ["暂无收支"];
}

function bindPlgTipIcon(el, tip) {
  const tipText = Array.isArray(tip) ? tip.join("\n") : String(tip || "");
  el.setAttr("title", tipText);
  el.setAttr("role", "button");
  el.setAttr("tabindex", "0");
  el.setAttr("aria-label", tipText.replace(/\n/g, " "));
  const showNotice = () => {
    const lines = tipText.split("\n").map((s) => s.trim()).filter(Boolean);
    if (lines.length <= 1) {
      new Notice(tipText, 5000);
      return;
    }
    const frag = document.createDocumentFragment();
    lines.forEach((line, i) => {
      if (i > 0) frag.createEl("br");
      frag.appendChild(document.createTextNode(line));
    });
    new Notice(frag, 5000);
  };
  const show = (e) => {
    e.preventDefault();
    e.stopPropagation();
    showNotice();
  };
  el.addEventListener("click", show);
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") show(e);
  });
}

function compareTagClass(flow, pct) {
  const up = pct >= 0;
  if (flow === "income") return up ? "cmp-neg" : "cmp-pos";
  return up ? "cmp-pos" : "cmp-neg";
}

function buildDonutSliceStats(stats, limit = 8) {
  if (stats.length <= limit) return stats.slice();
  const top = stats.slice(0, limit);
  const rest = stats.slice(limit);
  top.push({
    name: "其他",
    key: "__other__",
    amount: rest.reduce((s, x) => s + (Number(x.amount) || 0), 0),
    pct: rest.reduce((s, x) => s + (Number(x.pct) || 0), 0),
    count: rest.reduce((s, x) => s + (Number(x.count) || 0), 0),
    meta: { color: "#c4b5a5", name: "其他", icon: "" },
  });
  return top;
}

function openCarryoverReadonlyOverlay(app, plugin, tx) {
  openPlgOverlay({
    title: "月结说明",
    stack: true,
    build: (body, close) => {
      addClasses(body, "plg-modal");
      body.createEl("p", { text: tx.note || "系统自动月结", cls: "plg-modal-lead" });
      body.createEl("p", {
        text: `金额 ${fmtMoney(tx.amount)} · ${tx.flow === "income" ? "收入" : "支出"} · 只读`,
        cls: "plg-muted",
      });
      body.createEl("p", {
        text: "由「月结自动结转」生成，关闭后不再新增。日合计「支」不含月结。",
        cls: "plg-muted",
      });
      const row = body.createDiv({ cls: "plg-modal-actions" });
      row.createEl("button", { text: "关闭", attr: { type: "button" } }).onclick = close;
      row.createEl("button", {
        text: "打开设置",
        cls: "mod-cta",
        attr: { type: "button" },
      }).onclick = () => {
        close();
        plugin.openDashboardSettings();
      };
    },
  });
}

function fmtMoney(n) {
  const v = Math.round(Number(n) || 0);
  return v.toLocaleString("zh-CN", { maximumFractionDigits: 0 });
}

function fillBudgetRingInner(ring, pctRaw, over) {
  const text = Number(pctRaw).toFixed(1) + "%";
  const inner = ring.createDiv({
    cls: "plg-ring-inner" + (over ? " over" : "") + (text.length >= 6 ? " is-long" : ""),
    text,
  });
  inner.setAttr("title", text);
  return inner;
}

/** 百分比展示：固定 1 位小数 */
function fmtPct(n) {
  const v = Number(n) || 0;
  const sign = v > 0 ? "+" : "";
  return `${sign}${v.toFixed(1)}%`;
}

function formatSyncTime(isoOrMs) {
  if (isoOrMs == null || isoOrMs === "") return "未知";
  const d = typeof isoOrMs === "number" ? new Date(isoOrMs) : new Date(isoOrMs);
  if (Number.isNaN(d.getTime())) return "未知";
  const diff = Date.now() - d.getTime();
  if (diff < 60000) return "刚刚";
  if (diff < 3600000) return `${Math.floor(diff / 60000)} 分钟前`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} 小时前`;
  return `${d.getMonth() + 1}/${d.getDate()} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

function ledgerSyncSignature(data) {
  if (!data) return "";
  const txs = data.transactions || [];
  let sum = 0;
  for (let i = 0; i < txs.length; i++) {
    sum += Math.round((Number(txs[i].amount) || 0) * 100);
  }
  const first = txs[0]?.id || "";
  const last = txs[txs.length - 1]?.id || "";
  return `${data.exportedAt || ""}|${txs.length}|${sum}|${first}|${last}`;
}

function isTouchLedgerUi() {
  if (typeof isMobileCaptureUi === "function" && isMobileCaptureUi()) return true;
  if (typeof Platform !== "undefined" && Platform.isMobile) return true;
  return false;
}

function parseDateTime(s) {
  if (!s) return new Date();
  const [d, t = "00:00"] = String(s).split(" ");
  const [y, m, day] = d.split("-").map(Number);
  const [hh, mm] = t.split(":").map(Number);
  return new Date(y, m - 1, day, hh || 0, mm || 0);
}

function dateKey(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function formatCalShortAmt(amount) {
  const n = Number(amount) || 0;
  if (n >= 10000) return `${(n / 10000).toFixed(n >= 100000 ? 0 : 1)}w`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(Math.round(n));
}

/** 本月待付/已到期未入账的订阅与周期项（iCost 待办风格） */
function collectPendingDues(data, refDate = new Date()) {
  const today = dateKey(refDate);
  const monthPrefix = `${refDate.getFullYear()}-${pad2(refDate.getMonth() + 1)}`;
  const dues = [];
  const txExists = (item, dateStr, kind) => {
    const day = String(dateStr || "").slice(0, 10);
    return (data.transactions || []).some((t) => {
      if (kind === "subscription" && t.linkedSubscriptionId === item.id && t.datetime.startsWith(day)) return true;
      if (kind === "recurring" && t.linkedRecurringId === item.id && t.datetime.startsWith(day)) return true;
      const category = kind === "recurring" ? item.category : (item.category || "软件续费");
      const sub = item.subcategory || "";
      const amount = item.amount;
      return t.flow === "expense"
        && t.datetime.startsWith(day)
        && t.category === category
        && (t.subcategory || "") === sub
        && amountMatch(t.amount, amount);
    });
  };
  const push = (item, kind) => {
    if (item.active === false) return;
    const nd = item.nextDate;
    if (!nd || !String(nd).startsWith(monthPrefix)) return;
    if (txExists(item, nd, kind)) return;
    const title = kind === "recurring" ? (item.title || item.name || "周期") : (item.name || "订阅");
    dues.push({
      kind,
      id: item.id,
      title,
      date: nd,
      amount: Number(item.amount) || 0,
      category: kind === "recurring" ? item.category : (item.category || "软件续费"),
      subcategory: item.subcategory || "",
      overdue: nd < today,
    });
  };
  (data.subscriptions || []).forEach((s) => push(s, "subscription"));
  (data.recurring || []).forEach((r) => push(r, "recurring"));
  return dues.sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title, "zh"));
}

function reportFilterTrendPoints(flowList, period, refDate) {
  if (!flowList.length) return [];
  if (period === "month") {
    const y = refDate.getFullYear();
    const m = refDate.getMonth() + 1;
    const daysInMonth = new Date(y, m, 0).getDate();
    const dayMap = {};
    flowList.forEach((t) => {
      const d = parseInt(String(t.datetime).slice(8, 10), 10);
      if (!d) return;
      dayMap[d] = (dayMap[d] || 0) + (Number(t.amount) || 0);
    });
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const val = dayMap[day] || 0;
      return {
        label: String(day),
        value: val,
        tip: `${m}月${day}日 ${fmtMoney(val)}`,
      };
    });
  }
  const monthMap = {};
  flowList.forEach((t) => {
    const mk = String(t.datetime).slice(0, 7);
    if (!mk) return;
    monthMap[mk] = (monthMap[mk] || 0) + (Number(t.amount) || 0);
  });
  const keys = Object.keys(monthMap).sort();
  if (period === "year") {
    const y = refDate.getFullYear();
    return Array.from({ length: 12 }, (_, i) => {
      const mk = `${y}-${pad2(i + 1)}`;
      const val = monthMap[mk] || 0;
      return { label: String(i + 1), value: val, tip: `${y}年${i + 1}月 ${fmtMoney(val)}` };
    });
  }
  return keys.slice(-12).map((mk) => {
    const val = monthMap[mk] || 0;
    const mm = parseInt(mk.slice(5, 7), 10);
    return { label: `${mm}月`, value: val, tip: `${mk.replace("-", "年")}月 ${fmtMoney(val)}` };
  });
}

function getRecentManualCategories(transactions, flow, limit = 6) {
  const cutoff = Date.now() - 30 * 86400000;
  const counts = new Map();
  (transactions || []).forEach((t) => {
    if (flow === "income" ? t.flow !== "income" : t.flow === "income") return;
    const ts = parseDateTime(t.datetime);
    if (!ts || ts.getTime() < cutoff) return;
    const key = `${t.category}\0${t.subcategory || ""}`;
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([key]) => {
      const [category, subcategory] = key.split("\0");
      return { category, subcategory: subcategory || "" };
    });
}

function monthRange(year, month) {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59);
  return { start, end };
}

function weekRange(ref) {
  const d = new Date(ref);
  const day = d.getDay() || 7;
  const start = new Date(d);
  start.setDate(d.getDate() - day + 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

function yearRange(year) {
  return { start: new Date(year, 0, 1), end: new Date(year, 11, 31, 23, 59, 59) };
}

function periodWindowEndClipped(period, refDate) {
  const d = refDate || new Date();
  const now = new Date();
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
  if (period === "month") {
    const r = monthRange(d.getFullYear(), d.getMonth() + 1);
    const isCurrent = d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    return {
      start: r.start,
      end: isCurrent ? todayEnd : r.end,
      partial: isCurrent && now.getDate() < r.end.getDate(),
    };
  }
  if (period === "year") {
    const r = yearRange(d.getFullYear());
    const isCurrent = d.getFullYear() === now.getFullYear();
    return {
      start: r.start,
      end: isCurrent ? todayEnd : r.end,
      partial: isCurrent,
    };
  }
  if (period === "week") {
    const r = weekRange(d);
    const inWeek = todayEnd >= r.start && todayEnd <= r.end;
    return {
      start: r.start,
      end: inWeek ? todayEnd : r.end,
      partial: inWeek && todayEnd.getTime() < r.end.getTime(),
    };
  }
  return null;
}

function flowSumInWindow(allTx, start, end, flow) {
  return sumFlow(
    excludeCarryover(allTx.filter((t) => inRange(t.datetime, start, end))),
    flow,
  );
}

function flowCountInWindow(allTx, start, end, flow) {
  return excludeCarryover(allTx.filter((t) => inRange(t.datetime, start, end)))
    .filter((t) => t.flow === flow).length;
}

function periodChainWindow(period, refDate) {
  const cur = periodWindowEndClipped(period, refDate);
  if (!cur) return null;
  if (period === "month") {
    const y = refDate.getFullYear();
    const m = refDate.getMonth();
    const endDay = cur.end.getDate();
    const prevStart = new Date(y, m - 1, 1);
    const prevMonthDays = new Date(y, m, 0).getDate();
    const prevEnd = new Date(y, m - 1, Math.min(endDay, prevMonthDays), 23, 59, 59, 999);
    return { start: prevStart, end: prevEnd, cur };
  }
  if (period === "year") {
    const y = refDate.getFullYear() - 1;
    const start = new Date(y, 0, 1);
    const end = new Date(y, cur.end.getMonth(), cur.end.getDate(), 23, 59, 59, 999);
    return { start, end, cur };
  }
  if (period === "week") {
    const prevStart = new Date(cur.start);
    prevStart.setDate(prevStart.getDate() - 7);
    const prevEnd = new Date(cur.end);
    prevEnd.setDate(prevEnd.getDate() - 7);
    return { start: prevStart, end: prevEnd, cur };
  }
  return null;
}

function periodYoYWindow(period, refDate) {
  if (period !== "month") return null;
  const cur = periodWindowEndClipped(period, refDate);
  if (!cur) return null;
  const y = refDate.getFullYear() - 1;
  const start = new Date(y, cur.start.getMonth(), cur.start.getDate());
  const endDay = cur.end.getDate();
  const endMonth = cur.end.getMonth();
  const maxDay = new Date(y, endMonth + 1, 0).getDate();
  const end = new Date(y, endMonth, Math.min(endDay, maxDay), 23, 59, 59, 999);
  return { start, end, cur };
}

function inRange(dt, start, end) {
  const t = parseDateTime(dt).getTime();
  return t >= start.getTime() && t <= end.getTime();
}

function weekdayLabel(d) {
  return ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][d.getDay()];
}

function todayLabel(d) {
  const now = new Date();
  const same = dateKey(d) === dateKey(now);
  return same ? "今天" : "";
}

function uid() {
  return "tx-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function escapeHtml(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function getFflate() {
  if (typeof __MUMU_FFLATE__ !== "undefined" && __MUMU_FFLATE__) return __MUMU_FFLATE__;
  if (typeof fflate !== "undefined") return fflate;
  throw new Error("fflate unavailable");
}

// ─── XLSX import (Mumu export format) ────────────────────────────────────────

function colLettersToIndex(col) {
  let n = 0;
  for (const c of col) n = n * 26 + (c.charCodeAt(0) - 64);
  return n - 1;
}

function parseSharedStrings(xml) {
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  const out = [];
  doc.querySelectorAll("si").forEach((si) => {
    let t = "";
    si.querySelectorAll("t").forEach((node) => { t += node.textContent || ""; });
    out.push(t);
  });
  return out;
}

function cellValue(c, shared) {
  const t = c.getAttribute("t");
  const vNode = c.querySelector("v");
  if (!vNode) return "";
  const raw = vNode.textContent || "";
  if (t === "s") return shared[parseInt(raw, 10)] ?? "";
  return raw;
}

function parseSheetRows(sheetXml, shared) {
  const doc = new DOMParser().parseFromString(sheetXml, "text/xml");
  const rows = [];
  doc.querySelectorAll("sheetData row").forEach((row) => {
    const cells = {};
    row.querySelectorAll("c").forEach((c) => {
      const ref = c.getAttribute("r") || "";
      const m = ref.match(/^([A-Z]+)/);
      if (!m) return;
      cells[colLettersToIndex(m[1])] = cellValue(c, shared);
    });
    const arr = [];
    const max = Math.max(...Object.keys(cells).map(Number), 0);
    for (let i = 0; i <= max; i++) arr.push(cells[i] ?? "");
    if (arr.some((x) => x !== "")) rows.push(arr);
  });
  return rows;
}

function parseAmount(v) {
  if (v == null || v === "") return 0;
  return Math.abs(parseFloat(String(v).replace(/,/g, ""))) || 0;
}

function rowsToLedger(rows) {
  if (!rows.length) throw new Error("空表格");
  const headers = rows[0];
  const idx = (name) => headers.indexOf(name);
  const required = ["时间", "类型", "分类", "金额"];
  for (const h of required) if (idx(h) < 0) throw new Error("缺少列：" + h);

  const subcats = {};
  const transactions = [];
  let ledger = "";

  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const dt = r[idx("时间")];
    if (!dt) continue;
    const flowRaw = r[idx("类型")];
    let flow = "expense";
    if (flowRaw === "收入") flow = "income";
    else if (flowRaw === "转账") flow = "transfer";
    const cat = r[idx("分类")] || "";
    const sub = idx("二级分类") >= 0 ? (r[idx("二级分类")] || "") : "";
    const amt = parseAmount(r[idx("金额")]);
    if (!ledger && idx("账本") >= 0) ledger = r[idx("账本")] || "";
    if (cat) {
      if (!subcats[cat]) subcats[cat] = new Set();
      if (sub) subcats[cat].add(sub);
    }
    transactions.push({
      id: `plg-${i}`,
      datetime: String(dt).replace(/\//g, "-"),
      flow,
      category: cat,
      subcategory: sub,
      amount: amt,
      ledger: idx("账本") >= 0 ? (r[idx("账本")] || "") : "",
      accountOut: idx("转出账户") >= 0 ? (r[idx("转出账户")] || "") : "",
      accountIn: idx("转入账户") >= 0 ? (r[idx("转入账户")] || "") : "",
      note: idx("备注") >= 0 ? (r[idx("备注")] || "") : "",
      reimburse: idx("报销") >= 0 ? !!r[idx("报销")] : false,
      discount: idx("优惠") >= 0 ? parseAmount(r[idx("优惠")]) : 0,
      tags: [],
      member: idx("成员") >= 0 ? (r[idx("成员")] || "") : "",
      source: "plg-import",
    });
  }

  const categories = buildCategoriesFromTransactions(transactions, subcats);
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    ledger: ledger || "默认账本",
    categories,
    transactions,
  };
}

function parseMumuXlsx(arrayBuffer) {
  const zip = getFflate().unzipSync(new Uint8Array(arrayBuffer));
  const sharedXml = zip["xl/sharedStrings.xml"];
  const sheetXml = zip["xl/worksheets/sheet1.xml"];
  if (!sheetXml) throw new Error("找不到 sheet1");
  const shared = sharedXml ? parseSharedStrings(new TextDecoder().decode(sharedXml)) : [];
  const rows = parseSheetRows(new TextDecoder().decode(sheetXml), shared);
  return rowsToLedger(rows);
}

function parseLedgerJson(text) {
  const data = JSON.parse(text);
  if (!data.transactions || !Array.isArray(data.transactions)) throw new Error("JSON 格式无效");
  if (!data.categories) data.categories = buildCategoriesFromTransactions(data.transactions);
  if (!data.recurring) data.recurring = [];
  if (!data.subscriptions) data.subscriptions = [];
  data.categories.forEach((c) => {
    if (!Array.isArray(c.keywords)) c.keywords = [];
    normalizeCategorySubs(c);
  });
  let dirty = false;
  if (purgeAutoSyncedRecurring(data)) dirty = true;
  if (purgeOrphanRecurringTransactions(data)) dirty = true;
  if (purgeSubscriptionBackfill(data)) dirty = true;
  if (normalizeSubscriptionActivePolicy(data)) dirty = true;
  if (normalizeSubscriptionPhases(data)) dirty = true;
  if (normalizeRecurringPhases(data)) dirty = true;
  if (normalizeSubscriptionLedgerCategory(data)) dirty = true;
  if (pruneSoftwareRenewalSubcategories(data)) dirty = true;
  if (syncSubcategoryDefaults(data)) dirty = true;
  if (syncSubscriptionsFromTransactions(data)) dirty = true;
  if (bootstrapInsuranceRecurring(data)) dirty = true;
  if (bootstrapBillSubcategoryIcons(data)) dirty = true;
  if (dedupeOverlappingAutoTransactions(data)) dirty = true;
  if (dedupeDuplicateTransactions(data)) dirty = true;
  if (dirty) data.__ledgerDirty = true;
  return data;
}

const CATEGORY_META = {
  "还贷": { icon: "🏠", color: "#FFB5A7" },
  "生活": { icon: "🛒", color: "#FFBF69" },
  "吞金兽": { icon: "👶", color: "#70D6BF" },
  "人情世故": { icon: "🎁", color: "#9BF6FF" },
  "行万里路": { icon: "🚗", color: "#5B9BD5" },
  "软件续费": { icon: "📱", color: "#FF9CEE" },
  "老有所依": { icon: "👴", color: "#BDB2FF" },
  "黑马王子": { icon: "👤", color: "#FFC6FF" },
  "医疗保健": { icon: "💊", color: "#A8DADC" },
  "恋爱": { icon: "💕", color: "#F4ACB7" },
  "工作": { icon: "💼", color: "#90BE6D" },
  "工作收入": { icon: "💰", color: "#52B788" },
  "其他收入": { icon: "💵", color: "#95D5B2" },
  "上月超支": { icon: "📉", color: "#E5989B" },
  "月结": { icon: "📊", color: "#B5838D" },
  "旅行娱乐": { icon: "✈️", color: "#6DAAF2" },
  "公主骑士": { icon: "👸", color: "#DDA15E" },
  "学习": { icon: "📚", color: "#BC6C25" },
};

function buildCategoriesFromTransactions(transactions, subcatMap) {
  const subs = subcatMap || {};
  const names = new Set();
  transactions.forEach((t) => { if (t.category) names.add(t.category); });
  return [...names].sort().map((name) => {
    const meta = CATEGORY_META[name] || { icon: "📌", color: "#CCCCCC" };
    const flow = (name === "工作收入" || name === "其他收入") ? "income" : "expense";
    const set = subs[name] || new Set();
    transactions.filter((t) => t.category === name && t.subcategory).forEach((t) => set.add(t.subcategory));
    return { name, flow, icon: meta.icon, color: meta.color, subcategories: [...set].sort() };
  });
}

function getCategoryMeta(categories, name) {
  const c = categories.find((x) => x.name === name);
  return c || { name, icon: "📌", color: "#ccc", subcategories: [] };
}

// ─── Analytics ───────────────────────────────────────────────────────────────

function filterTransactions(list, period, refDate) {
  const d = refDate || new Date();
  if (period === "all") return list;
  if (period === "year") {
    const r = yearRange(d.getFullYear());
    return list.filter((t) => inRange(t.datetime, r.start, r.end));
  }
  if (period === "week") {
    const r = weekRange(d);
    return list.filter((t) => inRange(t.datetime, r.start, r.end));
  }
  const r = monthRange(d.getFullYear(), d.getMonth() + 1);
  return list.filter((t) => inRange(t.datetime, r.start, r.end));
}

function isCarryoverTx(t) {
  return t?.source === "carryover";
}

function excludeCarryover(list) {
  return (list || []).filter((t) => !isCarryoverTx(t));
}

function buildPlainLedgerHomeSnapshot(plugin) {
  const data = plugin?.store?.data;
  if (!data?.transactions) return null;
  const now = new Date();
  const monthTx = filterTransactions(data.transactions, "month", now);
  const monthTxBase = excludeCarryover(monthTx);
  const yearTxBase = excludeCarryover(filterTransactions(data.transactions, "year", now));
  const weekTxBase = excludeCarryover(filterTransactions(data.transactions, "week", now));
  const mExp = sumFlow(monthTxBase, "expense");
  const mInc = sumFlow(monthTxBase, "income");
  const balance = mInc - mExp;
  const budget = Number(plugin.settings?.monthlyBudget) || 0;
  const budgetPct = budget > 0 ? Math.min(100, (mExp / budget) * 100) : 0;
  return {
    ts: Date.now(),
    monthLabel: `${now.getMonth() + 1}月`,
    monthExpense: mExp,
    monthIncome: mInc,
    monthBalance: balance,
    monthExpenseFmt: fmtMoney(mExp),
    monthIncomeFmt: fmtMoney(mInc),
    monthBalanceFmt: fmtMoney(balance),
    weekExpense: sumFlow(weekTxBase, "expense"),
    yearExpense: sumFlow(yearTxBase, "expense"),
    budget,
    budgetPct: Number(budgetPct.toFixed(1)),
  };
}

function refreshPlainLedgerHomeCache(plugin) {
  const snap = buildPlainLedgerHomeSnapshot(plugin);
  if (!snap) return null;
  plugin._homeSummaryCache = snap;
  try {
    sessionStorage.setItem("plg-home-cache-f", JSON.stringify(snap));
  } catch (e) { /* ignore */ }
  return snap;
}

function readPlainLedgerHomeCache(plugin) {
  if (plugin?._homeSummaryCache && Date.now() - (plugin._homeSummaryCache.ts || 0) < 3600000) {
    return { ...plugin._homeSummaryCache };
  }
  try {
    const raw = sessionStorage.getItem("plg-home-cache-f");
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return null;
}

function sumCarryoverSigned(list) {
  let net = 0;
  (list || []).filter(isCarryoverTx).forEach((t) => {
    const amt = Number(t.amount) || 0;
    if (t.flow === "income") net += amt;
    else if (t.flow === "expense") net -= amt;
  });
  return net;
}

function formatCarryoverText(net) {
  if (Math.abs(net) < 0.005) return "";
  const sign = net < 0 ? "-" : "+";
  return `结转 ${sign}${fmtMoney(Math.abs(net))}`;
}

function isSettleBaseTx(t) {
  if (!t || isCarryoverTx(t) || t.flow === "transfer") return false;
  return t.flow === "income" || t.flow === "expense";
}

function monthKeyFromDate(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;
}

function monthKeyAddMonths(key, delta) {
  const [y, m] = key.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return monthKeyFromDate(d);
}

function monthSettleBalance(transactions, monthKey) {
  const [y, m] = monthKey.split("-").map(Number);
  const r = monthRange(y, m);
  let income = 0;
  let expense = 0;
  (transactions || []).forEach((t) => {
    if (!isSettleBaseTx(t)) return;
    if (!inRange(t.datetime, r.start, r.end)) return;
    const amt = Number(t.amount) || 0;
    if (t.flow === "income") income += amt;
    else expense += amt;
  });
  return income - expense;
}

function yearToDateSettleBalance(transactions, year, throughMonth) {
  if (!year || !throughMonth || throughMonth < 1) return 0;
  const start = monthRange(year, 1).start;
  const end = monthRange(year, throughMonth).end;
  let income = 0;
  let expense = 0;
  (transactions || []).forEach((t) => {
    if (!isSettleBaseTx(t)) return;
    if (!inRange(t.datetime, start, end)) return;
    const amt = Number(t.amount) || 0;
    if (t.flow === "income") income += amt;
    else expense += amt;
  });
  return income - expense;
}

function yearToDateSettleBalanceThroughDate(transactions, refDate) {
  const d = refDate || new Date();
  const y = d.getFullYear();
  const start = monthRange(y, 1).start;
  const end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
  let income = 0;
  let expense = 0;
  (transactions || []).forEach((t) => {
    if (!isSettleBaseTx(t)) return;
    if (!inRange(t.datetime, start, end)) return;
    const amt = Number(t.amount) || 0;
    if (t.flow === "income") income += amt;
    else expense += amt;
  });
  return income - expense;
}

function carryoverYtdId(year, targetMonth) {
  return `carryover-ytd-${year}-${pad2(targetMonth)}`;
}

function isLegacyCarryoverId(id) {
  return typeof id === "string" && id.startsWith("carryover-") && !id.startsWith("carryover-ytd-");
}

function outgoingCarryoverForMonth(transactions, refMonthKey) {
  const [year, month] = refMonthKey.split("-").map(Number);
  const targetMonth = month + 1;
  if (targetMonth > 12) return null;
  const tx = (transactions || []).find((t) => t.id === carryoverYtdId(year, targetMonth));
  if (tx) {
    return {
      amount: Number(tx.amount) || 0,
      flow: tx.flow,
      balance: tx.carryover?.balance ?? (tx.flow === "income" ? tx.amount : -tx.amount),
    };
  }
  const balance = yearToDateSettleBalance(transactions, year, month);
  if (Math.abs(balance) < 0.005) return null;
  return {
    amount: Math.round(Math.abs(balance) * 100) / 100,
    flow: balance > 0 ? "income" : "expense",
    balance,
  };
}

function carryoverSourceMonthLabel(fromMonthKey) {
  if (!fromMonthKey) return "上月";
  const m = parseInt(String(fromMonthKey).split("-")[1], 10);
  return Number.isFinite(m) ? `${m}月` : "上月";
}

function carryoverNoteText(fromMonthKey, kind, opts = {}) {
  if (opts.ytdThroughMonth && opts.year) {
    const y = opts.year;
    const m = opts.ytdThroughMonth;
    return kind === "surplus"
      ? `${y}年1-${m}月累计结余结转`
      : `${y}年1-${m}月累计超支结转`;
  }
  const [y, m] = fromMonthKey.split("-").map(Number);
  return kind === "surplus"
    ? `${y}年${m}月结余结转`
    : `${y}年${m}月超支结转`;
}

function buildYtdCarryoverTransaction(year, targetMonth, balance, categoryName) {
  const amount = Math.round(Math.abs(balance) * 100) / 100;
  const kind = balance > 0 ? "surplus" : "deficit";
  const ytdThroughMonth = targetMonth - 1;
  return {
    id: carryoverYtdId(year, targetMonth),
    datetime: `${year}-${pad2(targetMonth)}-01 00:00`,
    flow: balance > 0 ? "income" : "expense",
    category: categoryName || "月结",
    subcategory: kind === "surplus" ? "结余结转" : "超支结转",
    amount,
    ledger: "",
    accountOut: "",
    accountIn: "",
    note: carryoverNoteText(null, kind, { year, ytdThroughMonth }),
    reimburse: false,
    discount: 0,
    tags: ["月结"],
    member: "",
    source: "carryover",
    linkedSubscriptionId: "",
    linkedRecurringId: "",
    carryover: { year, ytdThroughMonth, kind, balance },
  };
}

function buildCarryoverTransaction(fromMonthKey, balance, categoryName) {
  const targetMonth = monthKeyAddMonths(fromMonthKey, 1);
  const amount = Math.round(Math.abs(balance) * 100) / 100;
  const kind = balance > 0 ? "surplus" : "deficit";
  return {
    id: `carryover-${fromMonthKey}`,
    datetime: `${targetMonth}-01 00:00`,
    flow: balance > 0 ? "income" : "expense",
    category: categoryName || "月结",
    subcategory: kind === "surplus" ? "结余结转" : "超支结转",
    amount,
    ledger: "",
    accountOut: "",
    accountIn: "",
    note: carryoverNoteText(fromMonthKey, kind),
    reimburse: false,
    discount: 0,
    tags: ["月结"],
    member: "",
    source: "carryover",
    linkedSubscriptionId: "",
    linkedRecurringId: "",
    carryover: { fromMonth: fromMonthKey, kind, balance },
  };
}

function carryoverTxChanged(a, b) {
  if (!a && !b) return false;
  if (!a || !b) return true;
  return a.flow !== b.flow
    || !amountMatch(a.amount, b.amount)
    || a.note !== b.note
    || a.subcategory !== b.subcategory
    || a.datetime !== b.datetime
    || a.carryover?.ytdThroughMonth !== b.carryover?.ytdThroughMonth;
}

function earliestSettleYear(transactions) {
  let minYear = 0;
  (transactions || []).forEach((t) => {
    if (!isSettleBaseTx(t)) return;
    const y = parseInt(String(t.datetime || "").slice(0, 4), 10);
    if (y && (!minYear || y < minYear)) minYear = y;
  });
  return minYear;
}

function sumFlow(list, flow) {
  return list.filter((t) => t.flow === flow).reduce((a, t) => a + (Number(t.amount) || 0), 0);
}

function amountMatch(a, b) {
  return Math.round((Number(a) || 0) * 100) === Math.round((Number(b) || 0) * 100);
}

function monthDailyFlowPoints(allTx, refDate, flow = "expense") {
  const y = refDate.getFullYear();
  const m = refDate.getMonth() + 1;
  const map = dailyFlowMap(allTx, y, m);
  const days = monthRange(y, m).end.getDate();
  const flowLabel = flow === "income" ? "收入" : "支出";
  const points = [];
  for (let d = 1; d <= days; d++) {
    const val = flow === "income" ? map[d].income : map[d].expense;
    points.push({
      value: val,
      label: String(d),
      tip: `${m}月${d}日 ${flowLabel} ${fmtMoney(val)}`,
    });
  }
  return points;
}

function periodFlowSum(allTx, period, refDate, flow = "expense") {
  return sumFlow(excludeCarryover(filterTransactions(allTx, period, refDate)), flow);
}

function periodFlowCount(allTx, period, refDate, flow) {
  return excludeCarryover(filterTransactions(allTx, period, refDate))
    .filter((t) => t.flow === flow).length;
}

function periodCompareCountPercent(allTx, period, refDate, flow) {
  if (period === "all") return null;
  const chain = periodChainWindow(period, refDate);
  if (!chain) return null;
  const labels = { month: "较上月", week: "较上周", year: "较上年" };
  const cur = flowCountInWindow(allTx, chain.cur.start, chain.cur.end, flow);
  const prev = flowCountInWindow(allTx, chain.start, chain.end, flow);
  if (prev <= 0) return null;
  return {
    pct: ((cur - prev) / prev) * 100,
    label: labels[period],
    cur,
    prev,
  };
}

function fmtCompareDelta(cmp) {
  if (!cmp) return "";
  const sign = cmp.pct >= 0 ? "+" : "";
  return `${cmp.label} ${sign}${cmp.pct.toFixed(1)}%`;
}

function periodComparePercent(allTx, period, refDate, flow = "expense") {
  if (period === "all") return null;
  const chain = periodChainWindow(period, refDate);
  if (!chain) return null;
  const labels = { month: "较上月", week: "较上周", year: "较上年" };
  const curSum = flowSumInWindow(allTx, chain.cur.start, chain.cur.end, flow);
  const prevSum = flowSumInWindow(allTx, chain.start, chain.end, flow);
  if (prevSum <= 0) return null;
  return {
    pct: ((curSum - prevSum) / prevSum) * 100,
    label: labels[period],
    curSum,
    prevSum,
  };
}

function monthPeriodMoMPercent(allTx, refDate, flow = "expense") {
  const cmp = periodComparePercent(allTx, "month", refDate, flow);
  return cmp ? cmp.pct : null;
}

function sameMonthPartialDayRatio(refDate) {
  const now = new Date();
  if (refDate.getFullYear() !== now.getFullYear() || refDate.getMonth() !== now.getMonth()) return 1;
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  return now.getDate() / daysInMonth;
}

function fixedAutoExpenseInPeriod(allTx, period, refDate) {
  return filterTransactions(allTx, period, refDate)
    .filter((t) => t.flow === "expense" && (
      t.source === "subscription"
      || t.source === "recurring"
      || (t.tags || []).includes("订阅")
      || (t.tags || []).includes("周期")
    ))
    .reduce((a, t) => a + (Number(t.amount) || 0), 0);
}

function budgetOverrunCategoryHints(list, categories, budgetTotal) {
  const budget = Number(budgetTotal) || 0;
  if (budget <= 0) return [];
  const exp = sumFlow(list, "expense");
  if (exp <= budget) return [];
  const overrun = exp - budget;
  let acc = 0;
  const out = [];
  categoryStats(list, categories, "expense").forEach((s) => {
    if (acc >= overrun) return;
    out.push(s);
    acc += s.amount;
  });
  return out.slice(0, 3);
}

function formatTxDateLabel(datetime) {
  const d = parseDateTime(datetime);
  const y = d.getFullYear();
  const now = new Date();
  if (y === now.getFullYear()) return `${d.getMonth() + 1}月${d.getDate()}日`;
  return `${y}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function buildTxSubline(t, opts = {}) {
  const parts = [];
  if (t.reimburse) parts.push("报销");
  if (opts.dateOnly) parts.push(formatTxDateLabel(t.datetime));
  else parts.push(t.datetime.slice(11, 16));
  if (t.note) parts.push(t.note);
  return parts.join(" · ");
}

function applyUiStateToView(view, uiState) {
  if (!uiState || !view) return;
  if (uiState.tab) view.tab = uiState.tab;
  if (uiState.homeSubview) view.homeSubview = uiState.homeSubview;
  if (uiState.period) view.period = uiState.period;
  if (uiState.reportFlow) view.reportFlow = uiState.reportFlow;
  if (typeof uiState.reportTopic === "string") view.reportTopic = uiState.reportTopic;
  if (uiState.reportPresetId) view._reportPresetId = uiState.reportPresetId;
  if (uiState.reportGroupMode) view.reportGroupMode = uiState.reportGroupMode;
  if (uiState.listCategory) view.listCategory = uiState.listCategory;
  if (typeof uiState.listReimburseOnly === "boolean") view.listReimburseOnly = uiState.listReimburseOnly;
  if (typeof uiState.listSearch === "string") view.listSearch = uiState.listSearch;
  if (Array.isArray(uiState.collapsedDays)) view.collapsedDays = new Set(uiState.collapsedDays);
}

function snapshotUiStateFromView(view) {
  const tab = view.tab === "settings" ? "home" : (view.tab || "home");
  return {
    tab,
    homeSubview: view.homeSubview || "list",
    period: view.period || "month",
    reportFlow: view.reportFlow || "expense",
    reportTopic: view.reportTopic || "",
    reportPresetId: view._reportPresetId || "",
    reportGroupMode: view.reportGroupMode || "category",
    listCategory: view.listCategory || "all",
    listReimburseOnly: !!view.listReimburseOnly,
    listSearch: view.listSearch || "",
    collapsedDays: [...(view.collapsedDays || new Set())],
  };
}

async function persistDashboardUiState(plugin, view) {
  if (!plugin?.settings || !view) return;
  plugin.settings.uiState = snapshotUiStateFromView(view);
  await plugin.saveSettings();
}

function formatPlainLedgerDailyNoteLine(tx) {
  const prefix = tx.flow === "income" ? "+" : tx.flow === "transfer" ? "↔" : "-";
  const cat = tx.subcategory ? `${tx.category}·${tx.subcategory}` : (tx.category || "未分类");
  const note = tx.note ? ` ${tx.note}` : "";
  const reimb = tx.reimburse ? " [报销]" : "";
  return `- ${prefix}${fmtMoney(tx.amount)} ${cat}${note}${reimb}`;
}

async function appendPlainLedgerDailyNote(app, plugin, tx) {
  if (!plugin?.settings?.dailyNoteOnSave || !tx) return;
  const folder = normalizePath(String(plugin.settings.dailyNoteFolder || "Daily Notes").trim() || "Daily Notes");
  const day = String(tx.datetime || "").slice(0, 10) || dateKey(new Date());
  const filePath = normalizePath(`${folder}/${day}.md`);
  const line = `${formatPlainLedgerDailyNoteLine(tx)}\n`;
  const adapter = app.vault.adapter;
  try {
    const parts = folder.split("/").filter(Boolean);
    let acc = "";
    for (const p of parts) {
      acc = acc ? `${acc}/${p}` : p;
      if (!await adapter.exists(acc)) await app.vault.createFolder(acc);
    }
    if (await adapter.exists(filePath)) {
      const prev = await adapter.read(filePath);
      const sep = prev.endsWith("\n") || !prev ? "" : "\n";
      await adapter.write(filePath, `${prev}${sep}${line}`);
    } else {
      await app.vault.create(filePath, `# ${day}\n\n${line}`);
    }
  } catch (err) {
    console.warn("[PlainLedger] daily note append", err);
  }
}

function weekLabel(refDate) {
  const r = weekRange(refDate);
  const d = r.start;
  const day = d.getDay() || 7;
  const th = new Date(d);
  th.setDate(d.getDate() + 4 - day);
  const ys = new Date(th.getFullYear(), 0, 1);
  const wk = Math.ceil((((th - ys) / 86400000) + 1) / 7);
  const fmt = (dt) => `${dt.getMonth() + 1}.${dt.getDate()}`;
  return `WK${wk}（${fmt(r.start)}-${fmt(r.end)}）`;
}

function matchTransactionSearch(t, q) {
  const hay = [
    t.note,
    t.category,
    t.subcategory,
    t.amount,
    t.datetime,
    t.subcategory ? `${t.category}·${t.subcategory}` : t.category,
  ].filter(Boolean).join(" ").toLowerCase();
  return hay.includes(q);
}

function groupByDate(list) {
  const map = new Map();
  list.forEach((t) => {
    const k = t.datetime.slice(0, 10);
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(t);
  });
  return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]));
}

function categoryStats(list, categories, flow) {
  const filtered = list.filter((t) => t.flow === flow);
  const total = sumFlow(filtered, flow) || 1;
  const map = new Map();
  filtered.forEach((t) => {
    const k = t.category || "未分类";
    if (!map.has(k)) map.set(k, { amount: 0, count: 0 });
    const o = map.get(k);
    o.amount += Number(t.amount) || 0;
    o.count += 1;
  });
  return [...map.entries()]
    .map(([name, v]) => ({
      key: name,
      name,
      amount: v.amount,
      count: v.count,
      pct: (v.amount / total) * 100,
      meta: getCategoryMeta(categories, name),
    }))
    .sort((a, b) => b.amount - a.amount);
}

const REPORT_TOPIC_PRESETS = [
  {
    id: "insurance",
    label: "保险",
    terms: ["保险", "保费", "保单", "健康险", "意外险", "宝宝保险"],
  },
  {
    id: "dining",
    label: "餐饮",
    terms: [
      "早餐", "午饭", "午餐", "晚餐", "晚饭", "夜宵", "聚餐", "吃饭", "餐饮",
      "中饭", "早点", "早饭", "家庭聚餐",
    ],
  },
  {
    id: "transport",
    label: "交通",
    terms: ["交通", "地铁", "公交", "打车", "滴滴", "高铁", "火车", "机票", "加油", "停车", "过路费", "出租车"],
  },
  {
    id: "subscription",
    label: "订阅",
    terms: ["订阅", "会员", "续费", "软件续费", "Netflix", "Spotify", "iCloud", "云盘"],
  },
];

function buildTxReportHaystack(t, categories) {
  const parts = [
    t.category,
    t.subcategory,
    t.note,
    ...(t.tags || []),
  ].map((x) => String(x || "").toLowerCase()).filter(Boolean);
  const cat = (categories || []).find((c) => c.name === t.category);
  if (cat) {
    (cat.keywords || []).forEach((k) => parts.push(String(k).toLowerCase()));
    const subRaw = findSubcategoryMeta(cat, t.subcategory);
    if (subRaw) {
      const sub = normalizeSubcategory(subRaw);
      parts.push(subcategoryName(subRaw).toLowerCase());
      (sub.keywords || []).forEach((k) => parts.push(String(k).toLowerCase()));
    } else if (t.subcategory) {
      parts.push(String(t.subcategory).toLowerCase());
    }
  }
  return parts;
}

function resolveReportTopicTerms(topic, presetId) {
  if (presetId) {
    const preset = REPORT_TOPIC_PRESETS.find((p) => p.id === presetId);
    if (preset) return preset.terms.map((x) => x.toLowerCase());
  }
  const q = String(topic || "").trim();
  if (!q) return null;
  const preset = REPORT_TOPIC_PRESETS.find((p) => p.label === q);
  if (preset) return preset.terms.map((x) => x.toLowerCase());
  return q.toLowerCase().split(/\s+/).filter(Boolean);
}

function txMatchesReportTopic(t, categories, terms) {
  if (!terms || !terms.length) return true;
  const haystack = buildTxReportHaystack(t, categories);
  return terms.some((term) => haystack.some((h) => h.includes(term)));
}

function filterByReportTopic(list, categories, topic, presetId) {
  const terms = resolveReportTopicTerms(topic, presetId);
  if (!terms) return list;
  return list.filter((t) => txMatchesReportTopic(t, categories, terms));
}

function subcategoryStats(list, categories, flow) {
  const filtered = list.filter((t) => t.flow === flow);
  const total = sumFlow(filtered, flow) || 1;
  const map = new Map();
  filtered.forEach((t) => {
    const cat = t.category || "未分类";
    const sub = (t.subcategory || "").trim() || "（无二级）";
    const key = `${cat}\0${sub}`;
    if (!map.has(key)) map.set(key, { cat, sub, amount: 0, count: 0 });
    const o = map.get(key);
    o.amount += Number(t.amount) || 0;
    o.count += 1;
  });
  const subCounts = new Map();
  map.forEach((v) => subCounts.set(v.sub, (subCounts.get(v.sub) || 0) + 1));
  return [...map.entries()]
    .map(([key, v]) => {
      const catObj = (categories || []).find((c) => c.name === v.cat);
      const catMeta = getCategoryMeta(categories, v.cat);
      const subRaw = catObj ? findSubcategoryMeta(catObj, v.sub) : null;
      const subNorm = subRaw ? normalizeSubcategory(subRaw) : { name: v.sub };
      const displayName = subCounts.get(v.sub) > 1 ? `${v.cat} · ${v.sub}` : v.sub;
      const meta = {
        ...catMeta,
        name: displayName,
        iconUrl: subNorm.iconUrl || catMeta.iconUrl,
        emoji: subNorm.emoji || catMeta.emoji,
        color: subNorm.color || catMeta.color,
      };
      return {
        key,
        name: displayName,
        cat: v.cat,
        sub: v.sub,
        amount: v.amount,
        count: v.count,
        pct: (v.amount / total) * 100,
        meta,
      };
    })
    .sort((a, b) => b.amount - a.amount);
}

function reportStatsForGroup(list, categories, flow, groupMode) {
  return groupMode === "subcategory"
    ? subcategoryStats(list, categories, flow)
    : categoryStats(list, categories, flow);
}

function txMatchesReportGroup(t, stat, groupMode) {
  if (groupMode === "subcategory") {
    const cat = t.category || "未分类";
    const sub = (t.subcategory || "").trim() || "（无二级）";
    return `${cat}\0${sub}` === stat.key;
  }
  return (t.category || "未分类") === stat.name;
}

function dailyExpenseSeries(list, year, month) {
  const r = monthRange(year, month);
  const days = r.end.getDate();
  const arr = new Array(days).fill(0);
  list.filter((t) => t.flow === "expense").forEach((t) => {
    const d = parseDateTime(t.datetime);
    if (d >= r.start && d <= r.end) arr[d.getDate() - 1] += Number(t.amount) || 0;
  });
  return arr;
}

function monthlyFlowPoints(list, year, flow = "expense") {
  const arr = new Array(12).fill(0);
  list.filter((t) => t.flow === flow).forEach((t) => {
    const d = parseDateTime(t.datetime);
    if (d.getFullYear() === year) arr[d.getMonth()] += Number(t.amount) || 0;
  });
  return arr.map((value, i) => ({
    value,
    label: `${i + 1}月`,
    tip: `${year}年${i + 1}月${flow === "income" ? "收入" : "支出"} ${fmtMoney(value)}`,
  }));
}

function dailyExpensePoints(list, year, month) {
  const series = dailyExpenseSeries(list, year, month);
  const days = series.length;
  const step = days > 20 ? 5 : days > 12 ? 3 : 1;
  const points = [];
  series.forEach((value, i) => {
    if (i % step !== 0 && i !== days - 1) return;
    points.push({
      value,
      label: `${i + 1}日`,
      tip: `${month}月${i + 1}日支出 ${fmtMoney(value)}`,
    });
  });
  return points;
}

function recentWeeklyFlowPoints(allTx, refDate, count = 7, flow = "expense") {
  const wr = weekRange(refDate);
  const weekStart = wr.start;
  const flowLabel = flow === "income" ? "收入" : "支出";
  const points = [];
  for (let i = count - 1; i >= 0; i--) {
    const ws = new Date(weekStart.getTime() - i * 7 * 86400000);
    const we = new Date(ws);
    we.setDate(ws.getDate() + 6);
    we.setHours(23, 59, 59, 999);
    const total = allTx
      .filter((t) => t.flow === flow && inRange(t.datetime, ws, we))
      .reduce((a, t) => a + (Number(t.amount) || 0), 0);
    const day = ws.getDay() || 7;
    const th = new Date(ws);
    th.setDate(ws.getDate() + 4 - day);
    const ys = new Date(th.getFullYear(), 0, 1);
    const wk = Math.ceil((((th - ys) / 86400000) + 1) / 7);
    points.push({
      value: total,
      label: String(wk),
      tip: `${weekLabel(ws)} ${flowLabel} ${fmtMoney(total)}`,
    });
  }
  return points;
}

function weekDailyFlowPoints(allTx, refDate, flow = "expense") {
  const wr = weekRange(refDate);
  const flowLabel = flow === "income" ? "收入" : "支出";
  const weekdayLabels = ["一", "二", "三", "四", "五", "六", "日"];
  const points = [];
  for (let i = 0; i < 7; i++) {
    const ds = new Date(wr.start);
    ds.setDate(wr.start.getDate() + i);
    const de = new Date(ds);
    de.setHours(23, 59, 59, 999);
    const total = allTx
      .filter((t) => t.flow === flow && inRange(t.datetime, ds, de))
      .reduce((a, t) => a + (Number(t.amount) || 0), 0);
    points.push({
      value: total,
      label: weekdayLabels[i],
      tip: `${ds.getMonth() + 1}月${ds.getDate()}日 ${flowLabel} ${fmtMoney(total)}`,
    });
  }
  return points;
}

function buildPeriodAnalysis(list, period, refDate, categories, allTx, opts = {}) {
  const lines = [];
  const exp = sumFlow(list, "expense");
  const inc = sumFlow(list, "income");
  const budget = Number(opts.monthlyBudget) || 0;

  if (period === "year") {
    const y = refDate.getFullYear();
    const monthExp = monthlyFlowPoints(list, y, "expense");
    const monthInc = monthlyFlowPoints(list, y, "income");
    const expVals = monthExp.map((p) => p.value);
    const maxExp = Math.max(...expVals);
    const positiveExp = expVals.filter((v) => v > 0);
    const minExp = positiveExp.length ? Math.min(...positiveExp) : 0;
    if (maxExp > 0) {
      const maxIdx = expVals.indexOf(maxExp);
      lines.push(`${y}年${maxIdx + 1}月支出最高 ${fmtMoney(maxExp)}`);
    }
    if (minExp > 0 && minExp < maxExp) {
      const minIdx = expVals.indexOf(minExp);
      lines.push(`${y}年${minIdx + 1}月支出最低 ${fmtMoney(minExp)}`);
    }
    const incVals = monthInc.map((p) => p.value);
    const maxInc = Math.max(...incVals);
    if (maxInc > 0) {
      const maxIdx = incVals.indexOf(maxInc);
      lines.push(`${y}年${maxIdx + 1}月收入最高 ${fmtMoney(maxInc)}`);
    }
  }

  if (period === "month") {
    const fixed = fixedAutoExpenseInPeriod(allTx, "month", refDate);
    if (exp > 0 && fixed > 0) {
      lines.push(`订阅+周期固定支出 ${fmtMoney(fixed)}（占本月 ${((fixed / exp) * 100).toFixed(1)}%）`);
    }
    if (budget > 0 && exp > budget) {
      lines.push(`⚠️ 本月已超预算 ${fmtMoney(exp - budget)}`);
      const hints = budgetOverrunCategoryHints(list, categories, budget);
      if (hints.length) {
        lines.push(`超支主要来自：${hints.map((s) => `「${s.name}」${fmtMoney(s.amount)}`).join("、")}`);
      }
    }
    const days = monthDailyFlowPoints(excludeCarryover(allTx), refDate, "expense");
    const best = days.reduce((a, d) => (d.value > a.value ? d : a), { value: 0, tip: "" });
    if (best.value > 0) {
      lines.push(`${refDate.getMonth() + 1}月 ${best.tip.split(" 支出")[0]} 支出最高 ${fmtMoney(best.value)}`);
    }
  }

  if (period === "week") {
    const days = weekDailyFlowPoints(excludeCarryover(allTx), refDate, "expense");
    const best = days.reduce((a, d) => (d.value > a.value ? d : a), { value: 0, tip: "" });
    if (best.value > 0) lines.push(`本周 ${best.tip.split(" 支出")[0]} 支出最高 ${fmtMoney(best.value)}`);
  }

  const topExp = categoryStats(list, categories, "expense")[0];
  if (topExp?.amount > 0) {
    lines.push(`支出最多的是「${topExp.name}」${fmtMoney(topExp.amount)}（${topExp.pct.toFixed(1)}%）`);
  }
  const topInc = categoryStats(list, categories, "income")[0];
  if (topInc?.amount > 0 && period !== "week") {
    lines.push(`收入最多的是「${topInc.name}」${fmtMoney(topInc.amount)}（${topInc.pct.toFixed(1)}%）`);
  }

  return lines;
}

function renderInteractiveBarChart(host, points, opts = {}) {
  host.empty();
  if (!points.length) {
    host.createDiv({ cls: "plg-empty", text: "暂无趋势数据" });
    return;
  }
  const wrap = host.createDiv({ cls: "plg-chart-wrap" + (opts.mini ? " mini" : "") });
  const tip = wrap.createDiv({ cls: "plg-chart-tooltip is-empty", text: "悬停查看数值" });
  const chart = wrap.createDiv({ cls: "plg-bar-chart" + (opts.compact ? " compact" : "") + (opts.mini ? " mini" : "") });
  const max = Math.max(...points.map((p) => p.value), 1);
  const avg = points.reduce((a, p) => a + p.value, 0) / points.length;

  const showTip = (text) => {
    tip.removeClass("is-empty");
    tip.setText(text);
  };
  const hideTip = () => {
    tip.addClass("is-empty");
    tip.setText(isTouchLedgerUi() ? "点击查看数值" : "悬停查看数值");
  };

  points.forEach((p) => {
    const col = chart.createDiv({ cls: "plg-bar-col" });
    const bar = col.createDiv({ cls: "plg-bar" });
    applyCssProps(bar, {
      "--plg-bar-h": `${Math.max(4, (p.value / max) * 100)}%`,
      ...(p.color ? { "--plg-bar-bg": p.color } : {}),
    });
    const tipText = p.tip || `${p.label} ${fmtMoney(p.value)}`;
    bar.setAttr("title", tipText);
    bar.addEventListener("mouseenter", () => showTip(tipText));
    bar.addEventListener("mouseleave", hideTip);
    bar.addEventListener("click", () => showTip(tipText));
    col.createDiv({ cls: "plg-bar-label", text: p.label });
  });

  if (!opts.mini) wrap.createDiv({ cls: "plg-chart-avg", text: `均值: ${fmtMoney(avg)}` });
}

function bindDonutHover(donut, segments, tipEl) {
  if (!segments.length) return;
  const ranges = [];
  let acc = 0;
  segments.forEach((s) => {
    ranges.push({ ...s, start: acc, end: acc + s.pct });
    acc += s.pct;
  });

  let lastSeg = segments[0];

  const pick = (e) => {
    const rect = donut.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const outer = rect.width / 2;
    if (dist > outer) return null;
    if (dist < outer * 0.65) return lastSeg;
    let deg = Math.atan2(dx, -dy) * 180 / Math.PI;
    if (deg < 0) deg += 360;
    const pct = (deg / 360) * 100;
    return ranges.find((r) => pct >= r.start && pct < r.end) || ranges[ranges.length - 1];
  };

  const showSeg = (seg) => {
    if (!seg) return;
    lastSeg = seg;
    tipEl.removeClass("is-empty");
    const tipText = `${seg.name} ${seg.pct.toFixed(1)}% · ${fmtMoney(seg.amount)}`;
    tipEl.setText(tipText);
    tipEl.setAttr("title", tipText);
  };

  tipEl.addClass("is-empty");
  tipEl.setText(isTouchLedgerUi() ? "点击查看占比" : "悬停查看占比");

  donut.addEventListener("mousemove", (e) => {
    const seg = pick(e);
    if (seg) showSeg(seg);
  });
  donut.addEventListener("click", (e) => {
    const seg = pick(e);
    if (seg) showSeg(seg);
  });
  donut.addEventListener("mouseleave", () => {
    tipEl.addClass("is-empty");
    tipEl.setText(isTouchLedgerUi() ? "点击查看占比" : "悬停查看占比");
  });
}

function dailyFlowMap(list, year, month) {
  const r = monthRange(year, month);
  const days = r.end.getDate();
  const map = {};
  for (let i = 1; i <= days; i++) map[i] = { expense: 0, income: 0, count: 0 };
  list.forEach((t) => {
    if (isCarryoverTx(t)) return;
    const d = parseDateTime(t.datetime);
    if (d < r.start || d > r.end) return;
    const day = d.getDate();
    const amt = Number(t.amount) || 0;
    if (t.flow === "expense") map[day].expense += amt;
    else if (t.flow === "income") map[day].income += amt;
    map[day].count += 1;
  });
  return map;
}

function periodSummaryForRange(list) {
  const tx = excludeCarryover(list);
  const inc = sumFlow(tx, "income");
  const exp = sumFlow(tx, "expense");
  return { income: inc, expense: exp, balance: inc - exp, count: tx.length };
}

function fmtSummaryCellMoney(n, allowNegative = false) {
  const v = Number(n) || 0;
  if (!allowNegative && Math.abs(v) < 0.005) return "-";
  return fmtMoney(v);
}

function buildStatsPeriodAverage(allTx, period, refDate) {
  if (period === "all") return null;
  if (period === "year") {
    const y = refDate.getFullYear();
    const yearTx = filterTransactions(allTx, "year", refDate);
    const total = periodSummaryForRange(yearTx);
    let activeMonths = 0;
    for (let m = 1; m <= 12; m++) {
      const r = monthRange(y, m);
      if (excludeCarryover(allTx.filter((t) => inRange(t.datetime, r.start, r.end))).length) activeMonths++;
    }
    activeMonths = activeMonths || 1;
    return {
      label: "月均",
      income: total.income / activeMonths,
      expense: total.expense / activeMonths,
      balance: total.balance / activeMonths,
    };
  }
  if (period === "month") {
    const y = refDate.getFullYear();
    const m = refDate.getMonth() + 1;
    const monthTx = filterTransactions(allTx, "month", refDate);
    const total = periodSummaryForRange(monthTx);
    const dayMap = dailyFlowMap(allTx, y, m);
    const activeDays = Object.values(dayMap).filter((d) => d.count > 0).length || 1;
    return {
      label: "日均",
      income: total.income / activeDays,
      expense: total.expense / activeDays,
      balance: total.balance / activeDays,
    };
  }
  const weekTx = filterTransactions(allTx, "week", refDate);
  const total = periodSummaryForRange(weekTx);
  return {
    label: "日均",
    income: total.income / 7,
    expense: total.expense / 7,
    balance: total.balance / 7,
  };
}

function buildStatsSummaryRows(allTx, period, refDate) {
  const rows = [];
  const base = excludeCarryover(allTx || []);

  if (period === "all") {
    const years = new Set();
    base.forEach((t) => {
      const y = parseDateTime(t.datetime).getFullYear();
      if (y) years.add(y);
    });
    [...years].sort((a, b) => b - a).forEach((y) => {
      const r = yearRange(y);
      const slice = allTx.filter((t) => inRange(t.datetime, r.start, r.end));
      rows.push({ label: `${y}年`, ...periodSummaryForRange(slice), meta: "year", year: y });
    });
    return { rows };
  }

  if (period === "year") {
    const y = refDate.getFullYear();
    const now = new Date();
    const endMonth = y === now.getFullYear() ? now.getMonth() + 1 : 12;
    for (let m = endMonth; m >= 1; m--) {
      const r = monthRange(y, m);
      const slice = allTx.filter((t) => inRange(t.datetime, r.start, r.end));
      rows.push({ label: `${m}月`, ...periodSummaryForRange(slice), meta: "month", year: y, month: m });
    }
    return { rows };
  }

  if (period === "month") {
    const y = refDate.getFullYear();
    const m = refDate.getMonth() + 1;
    const dayMap = dailyFlowMap(allTx, y, m);
    const now = new Date();
    const daysInMonth = new Date(y, m, 0).getDate();
    const endDay = (y === now.getFullYear() && m === now.getMonth() + 1) ? now.getDate() : daysInMonth;
    for (let day = endDay; day >= 1; day--) {
      const info = dayMap[day] || { expense: 0, income: 0, count: 0 };
      rows.push({
        label: `${day}日`,
        income: info.income,
        expense: info.expense,
        balance: info.income - info.expense,
        meta: "day",
        year: y,
        month: m,
        day,
      });
    }
    return { rows };
  }

  const wr = weekRange(refDate);
  for (let i = 6; i >= 0; i--) {
    const ds = new Date(wr.start);
    ds.setDate(wr.start.getDate() + i);
    const de = new Date(ds);
    de.setHours(23, 59, 59, 999);
    const slice = allTx.filter((t) => inRange(t.datetime, ds, de));
    rows.push({
      label: `${ds.getMonth() + 1}/${ds.getDate()} ${weekdayLabel(ds)}`,
      ...periodSummaryForRange(slice),
      meta: "day",
      year: ds.getFullYear(),
      month: ds.getMonth() + 1,
      day: ds.getDate(),
    });
  }
  return { rows };
}

// ─── Data store ──────────────────────────────────────────────────────────────

function txSourceRank(t) {
  const src = t?.source || "";
  if (src === "carryover") return 3;
  if (src === "smart" || src === "manual") return 0;
  if (src === "recurring" || src === "subscription") return 2;
  return 1;
}

function autoTxDedupeKey(t) {
  if (!t) return null;
  const isAuto = t.source === "recurring" || t.source === "subscription";
  const dt = isAuto ? (t.datetime?.slice(0, 10) || "") : (t.datetime?.slice(0, 16) || "");
  return [
    dt,
    t.flow || "",
    t.category || "",
    t.subcategory || "",
    t.amount,
    isAuto ? "" : (t.note || ""),
    isAuto ? (t.source || "") : (t.source || ""),
  ].join("|");
}

function sameDayExpenseKey(t) {
  return [
    t.datetime?.slice(0, 10) || "",
    t.category || "",
    t.subcategory || "",
    t.amount,
  ].join("|");
}

/** 同一天已有手动/导入账单时，移除重复的订阅/周期自动生成 */
function dedupeOverlappingAutoTransactions(data) {
  if (!data?.transactions?.length) return false;
  const manualKeys = new Set();
  data.transactions.forEach((t) => {
    if (t.source === "subscription" || t.source === "recurring") return;
    if (t.flow !== "expense") return;
    manualKeys.add(sameDayExpenseKey(t));
  });
  if (!manualKeys.size) return false;
  const before = data.transactions.length;
  data.transactions = data.transactions.filter((t) => {
    if (t.source !== "subscription" && t.source !== "recurring") return true;
    if (t.flow !== "expense") return true;
    return !manualKeys.has(sameDayExpenseKey(t));
  });
  return data.transactions.length !== before;
}

function dedupeDuplicateTransactions(data) {
  if (!data?.transactions?.length) return false;
  const bestByKey = new Map();
  for (const t of data.transactions) {
    const key = autoTxDedupeKey(t);
    const prev = bestByKey.get(key);
    if (!prev || txSourceRank(t) < txSourceRank(prev)) bestByKey.set(key, t);
  }
  if (bestByKey.size === data.transactions.length) return false;
  const keep = new Set(bestByKey.values());
  data.transactions = data.transactions.filter((t) => keep.has(t));
  return true;
}

function countCategoryTree(categories) {
  const cats = categories || [];
  return {
    cats: cats.length,
    subs: cats.reduce((n, c) => n + (c.subcategories?.length || 0), 0),
  };
}

function getEmbeddedPublicDefault() {
  return typeof PLUGIN_PUBLIC_DEFAULT_LEDGER !== "undefined" && PLUGIN_PUBLIC_DEFAULT_LEDGER?.categories?.length
    ? PLUGIN_PUBLIC_DEFAULT_LEDGER
    : null;
}

class LedgerStore {
  constructor(plugin) {
    this.plugin = plugin;
    this.data = { version: 1, ledger: "", categories: [], transactions: [] };
    this._processDueRecurringBusy = false;
    this._processDueSubscriptionsBusy = false;
    this._saveQueue = Promise.resolve();
  }

  folder() {
    return normalizePath(this.plugin.settings.dataFolder);
  }

  filePath() {
    return normalizePath(`${this.folder()}/ledger.json`);
  }

  async ensureFolder() {
    const parts = this.folder().split("/");
    let acc = "";
    for (const p of parts) {
      acc = acc ? `${acc}/${p}` : p;
      if (!await this.plugin.app.vault.adapter.exists(acc)) {
        await this.plugin.app.vault.createFolder(acc);
      }
    }
  }

  async ensurePublicEditionDefaults() {
    const isSampleEdition = typeof PLUGIN_EDITION === "string"
      && (PLUGIN_EDITION === "public" || PLUGIN_EDITION === "trial24h");
    if (!isSampleEdition) return false;
    const bundled = await this.peekBundledDefault();
    if (!bundled?.categories?.length) return false;

    const fpExists = await this.plugin.app.vault.adapter.exists(this.filePath());
    if (!fpExists) return this.importPublicSampleLedger(true);
    if (!(this.data?.categories || []).length) return this.importPublicSampleLedger(true);
    return false;
  }

  async load() {
    await this.ensureFolder();
    const fp = this.filePath();
    const isPublic = typeof PLUGIN_EDITION === "string" && PLUGIN_EDITION === "public";

    if (!await this.plugin.app.vault.adapter.exists(fp)) {
      if (isPublic) {
        await this.importPublicSampleLedger(true);
      } else if (this.plugin.settings.onboardingChoice === "sample") {
        await this.importBundledDefault();
      } else if (this.plugin.settings.onboardingChoice === "blank" || this.plugin.settings.onboardingComplete) {
        this.data = {
          version: 1,
          ledger: "默认账本",
          categories: [],
          transactions: [],
          recurring: [],
          subscriptions: [],
        };
        await this.save();
      } else {
        this.data = {
          version: 1,
          ledger: "默认账本",
          categories: [],
          transactions: [],
          recurring: [],
          subscriptions: [],
        };
      }
      await this.processDueRecurring();
      await this.processDueSubscriptions();
      await this.processCarryovers();
      if (isPublic) {
        this.plugin.settings.onboardingComplete = true;
        this.plugin.settings.onboardingChoice = "sample";
        this.plugin.settings.initialized = true;
        await this.plugin.saveSettings();
      }
      return;
    }

    const raw = await this.plugin.app.vault.adapter.read(fp);
    this.data = parseLedgerJson(raw);
    if (!this.data.recurring) this.data.recurring = [];
    if (!this.data.subscriptions) this.data.subscriptions = [];
    if (this.data.__ledgerDirty) {
      delete this.data.__ledgerDirty;
      await this.save();
    }
    if (!this.data.iconFormatVersion || this.data.iconFormatVersion < 1) {
      try {
        const iconDirty = await normalizeAllStoredIcons(this.data);
        this.data.iconFormatVersion = 1;
        if (iconDirty) await this.save();
      } catch (e) {
        console.warn("[PlainLedger] normalize icons", e);
      }
    }
    if (this.repairOrphanedPendingDues()) await this.save();
    if (isPublic) {
      const seeded = await this.ensurePublicEditionDefaults();
      if (seeded) {
        this.plugin.settings.onboardingComplete = true;
        this.plugin.settings.onboardingChoice = "sample";
        this.plugin.settings.initialized = true;
        await this.plugin.saveSettings();
      }
    }
    await this.processDueRecurring();
    await this.processDueSubscriptions();
    await this.processCarryovers();
    if (!this.plugin.settings.onboardingComplete) {
      const hasData = (this.data.transactions?.length || 0) > 0
        || (this.data.categories?.length || 0) > 0;
      if (hasData) {
        this.plugin.settings.onboardingComplete = true;
        await this.plugin.saveSettings();
      }
    }
  }

  async save() {
    // 串行写盘，避免记账 / due / sync 并发覆盖
    const run = async () => {
      await this.ensureFolder();
      delete this.data.__ledgerDirty;
      this.data.exportedAt = new Date().toISOString();
      this._lastLocalSaveAt = Date.now();
      this._saveSuppressUntil = Date.now() + 1500;
      await this.plugin.app.vault.adapter.write(this.filePath(), JSON.stringify(this.data, null, 2));
    };
    const next = this._saveQueue.then(run, run);
    this._saveQueue = next.catch(() => {});
    return next;
  }

  async flushPendingSave() {
    try {
      await this._saveQueue;
    } catch {
      /* ignore */
    }
  }

  async reloadIfNewer() {
    if (this._saveSuppressUntil && Date.now() < this._saveSuppressUntil) return false;
    const fp = this.filePath();
    if (!await this.plugin.app.vault.adapter.exists(fp)) return false;
    try {
      const raw = await this.plugin.app.vault.adapter.read(fp);
      const incoming = parseLedgerJson(raw);
      const curSig = ledgerSyncSignature(this.data);
      const newSig = ledgerSyncSignature(incoming);
      if (newSig === curSig) return false;
      const curTs = this.data?.exportedAt || "";
      const newTs = incoming?.exportedAt || "";
      const curTime = Date.parse(curTs);
      const newTime = Date.parse(newTs);
      const haveTimes = !Number.isNaN(curTime) && !Number.isNaN(newTime);
      if (haveTimes && newTime < curTime) {
        if (this._lastLocalSaveAt && Date.now() - this._lastLocalSaveAt < 300000) {
          this.plugin._pendingSyncConflict = {
            localAt: curTs,
            remoteAt: newTs,
            remoteCount: incoming?.transactions?.length || 0,
            stale: true,
          };
        }
        return false;
      }
      if (
        curTs && newTs && curTs !== newTs
        && this._lastLocalSaveAt
        && Date.now() - this._lastLocalSaveAt < 120000
      ) {
        this.plugin._pendingSyncConflict = {
          localAt: curTs,
          remoteAt: newTs,
          remoteCount: incoming?.transactions?.length || 0,
        };
      }
      this.data = incoming;
      if (!this.data.recurring) this.data.recurring = [];
      if (!this.data.subscriptions) this.data.subscriptions = [];
      if (typeof PLUGIN_EDITION === "string" && PLUGIN_EDITION === "public") {
        await this.ensurePublicEditionDefaults();
      }
      await this.processDueRecurring();
      await this.processDueSubscriptions();
      await this.processCarryovers();
      return true;
    } catch (e) {
      console.warn("[PlainLedger] reloadIfNewer", e);
      return false;
    }
  }

  async readBundledDefaultRaw() {
    const pluginId = this.plugin.manifest.id;
    const pluginRel = normalizePath(`.obsidian/plugins/${pluginId}/default-ledger.json`);
    try {
      if (await this.plugin.app.vault.adapter.exists(pluginRel)) {
        return await this.plugin.app.vault.adapter.read(pluginRel);
      }
    } catch (_) { /* fallback */ }
    const candidates = ["Finance/PlainLedger/default-ledger.json", "Finance/MumuLedger/default-ledger.json"];
    for (const p of candidates) {
      try {
        if (await this.plugin.app.vault.adapter.exists(p)) {
          return await this.plugin.app.vault.adapter.read(p);
        }
      } catch (_) { /* try next */ }
    }
    return null;
  }

  async peekBundledDefault() {
    const embedded = getEmbeddedPublicDefault();
    if (embedded) return embedded;
    const raw = await this.readBundledDefaultRaw();
    if (!raw) return null;
    try {
      return parseLedgerJson(raw);
    } catch (_) {
      return null;
    }
  }

  async importPublicSampleLedger(force = false) {
    const bundled = await this.peekBundledDefault();
    if (!bundled?.categories?.length) {
      if (force) new Notice("未找到内置样例 default-ledger.json");
      return false;
    }
    const sampleTx = [...(bundled.transactions || [])];
    this.data = {
      version: bundled.version || 1,
      ledger: bundled.ledger || "PlainLedger 示例账本",
      categories: JSON.parse(JSON.stringify(bundled.categories)),
      transactions: sampleTx,
      subscriptions: [],
      recurring: [],
      exportedAt: new Date().toISOString(),
    };
    await this.save();
    this.plugin.settings.initialized = true;
    await this.plugin.saveSettings();
    return true;
  }

  async importBundledDefault(force = false) {
    if (typeof PLUGIN_EDITION === "string" && PLUGIN_EDITION === "public") {
      return this.importPublicSampleLedger(force);
    }
    const raw = await this.readBundledDefaultRaw();
    if (raw) {
      this.data = parseLedgerJson(raw);
      await this.save();
      await this.processCarryovers();
      this.plugin.settings.initialized = true;
      await this.plugin.saveSettings();
      return true;
    }
    if (!force) {
      this.data = { version: 1, ledger: "默认账本", categories: [], transactions: [], exportedAt: new Date().toISOString() };
      await this.save();
    } else {
      new Notice("未找到内置样例 default-ledger.json");
    }
    return false;
  }

  async importData(payload, sourceName, opts = {}) {
    const mergeTxOnly = opts.mergeTxOnly === true;
    const preserveRules = opts.preserveRules !== false && mergeTxOnly;
    const beforeCount = (this.data.transactions || []).length;

    if (mergeTxOnly) {
      const existing = { ...this.data, transactions: [...(this.data.transactions || [])], categories: [...(this.data.categories || [])] };
      const incomingTx = payload.transactions || [];
      const existingKeys = new Set(existing.transactions.map((t) => autoTxDedupeKey(t)));
      incomingTx.forEach((t) => {
        const key = autoTxDedupeKey(t);
        if (existingKeys.has(key)) return;
        existing.transactions.unshift(t);
        existingKeys.add(key);
      });
      (payload.categories || []).forEach((incCat) => {
        let cur = existing.categories.find((c) => c.name === incCat.name);
        if (!cur) {
          existing.categories.push(incCat);
          return;
        }
        normalizeCategorySubs(cur);
        (incCat.subcategories || []).forEach((sub) => {
          const name = subcategoryName(sub);
          if (!cur.subcategories.some((s) => subcategoryName(s) === name)) {
            cur.subcategories.push(normalizeSubcategory(sub));
          }
        });
        cur.subcategories.sort((a, b) => subcategoryName(a).localeCompare(subcategoryName(b), "zh"));
      });
      if (payload.ledger) existing.ledger = payload.ledger;
      this.data = existing;
    } else {
      if (opts.preserveRules) {
        payload.recurring = payload.recurring?.length ? payload.recurring : (this.data.recurring || []);
        payload.subscriptions = payload.subscriptions?.length ? payload.subscriptions : (this.data.subscriptions || []);
      }
      if (!payload.recurring) payload.recurring = [];
      if (!payload.subscriptions) payload.subscriptions = [];
      this.data = payload;
    }

    if (!this.data.recurring) this.data.recurring = [];
    if (!this.data.subscriptions) this.data.subscriptions = [];
    if (!this.data.categories?.length) {
      this.data.categories = buildCategoriesFromTransactions(this.data.transactions);
    }
    await this.save();
    this.plugin.settings.initialized = true;
    this.plugin.settings.lastImportAt = new Date().toISOString();
    this.plugin.settings.lastImportFile = sourceName || "";
    await this.plugin.saveSettings();
    await this.processDueRecurring();
    await this.processDueSubscriptions();
    await this.processCarryovers();
    const afterCount = (this.data.transactions || []).length;
    return {
      added: Math.max(0, afterCount - beforeCount),
      total: afterCount,
      merged: mergeTxOnly,
    };
  }

  _ensureCategoryForTx(tx) {
    const cat = tx.category;
    if (cat && !this.data.categories.find((c) => c.name === cat)) {
      const meta = CATEGORY_META[cat] || { icon: "📌", color: "#ccc" };
      this.data.categories.push({
        name: cat,
        flow: tx.flow,
        icon: meta.icon,
        color: meta.color,
        subcategories: tx.subcategory ? [normalizeSubcategory(tx.subcategory)] : [],
        keywords: [],
      });
      this.data.categories.sort((a, b) => a.name.localeCompare(b.name, "zh"));
    } else if (cat && tx.subcategory) {
      const c = this.data.categories.find((x) => x.name === cat);
      if (c) {
        normalizeCategorySubs(c);
        if (!c.subcategories.some((s) => subcategoryName(s) === tx.subcategory)) {
          c.subcategories.push(normalizeSubcategory(tx.subcategory));
          c.subcategories.sort((a, b) => subcategoryName(a).localeCompare(subcategoryName(b), "zh"));
        }
      }
    }
  }

  _purgeLegacyCarryovers() {
    const before = (this.data.transactions || []).length;
    this.data.transactions = (this.data.transactions || []).filter((t) => {
      if (!isCarryoverTx(t)) return true;
      return !isLegacyCarryoverId(t.id);
    });
    return before !== this.data.transactions.length;
  }

  _upsertYtdCarryover(year, targetMonth) {
    const catName = this.plugin.settings.carryoverCategoryName || "月结";
    const balance = yearToDateSettleBalance(this.data.transactions, year, targetMonth - 1);
    const id = carryoverYtdId(year, targetMonth);
    const existingIdx = (this.data.transactions || []).findIndex((t) => t.id === id);
    if (Math.abs(balance) < 0.005) {
      if (existingIdx >= 0) {
        this.data.transactions.splice(existingIdx, 1);
        return true;
      }
      return false;
    }
    const next = buildYtdCarryoverTransaction(year, targetMonth, balance, catName);
    next.ledger = this.data.ledger || "";
    const existing = existingIdx >= 0 ? this.data.transactions[existingIdx] : null;
    if (existing && !carryoverTxChanged(existing, next)) return false;
    this._ensureCategoryForTx(next);
    if (existingIdx >= 0) this.data.transactions[existingIdx] = next;
    else this.data.transactions.unshift(next);
    return true;
  }

  async processCarryovers(refDate = new Date()) {
    if (this.plugin.settings?.carryoverEnabled === false) return false;
    let dirty = this._purgeLegacyCarryovers();
    const currentKey = monthKeyFromDate(refDate);
    const [currentYear, currentMonth] = currentKey.split("-").map(Number);
    const startYear = earliestSettleYear(this.data.transactions) || currentYear;
    for (let year = startYear; year <= currentYear; year += 1) {
      const maxMonth = year === currentYear ? currentMonth : 12;
      for (let month = 2; month <= maxMonth; month += 1) {
        const targetKey = `${year}-${pad2(month)}`;
        if (targetKey > currentKey) break;
        if (this._upsertYtdCarryover(year, month)) {
          dirty = true;
          if (!this.plugin.settings.carryoverIntroShown) {
            this.plugin.settings.carryoverIntroShown = true;
            await this.plugin.saveSettings();
            new Notice("已生成本月结转账单（可在设置关闭自动月结）");
          }
        }
      }
    }
    if (dirty) {
      this.data.carryoverState = {
        lastProcessedMonth: currentKey,
        lastRunAt: new Date().toISOString(),
        mode: "ytd",
      };
      await this.save();
    }
    return dirty;
  }

  _autoTxExists(item, dateStr, source) {
    const day = String(dateStr || "").slice(0, 10);
    const category = source === "recurring" ? item.category : (item.category || "软件续费");
    const sub = item.subcategory || "";
    const amount = item.amount;
    const flow = source === "recurring" ? (item.flow || "expense") : "expense";
    return (this.data.transactions || []).some((t) => {
      if (source === "subscription" && t.linkedSubscriptionId === item.id && t.datetime.startsWith(day)) return true;
      if (source === "recurring" && t.linkedRecurringId === item.id && t.datetime.startsWith(day)) return true;
      return t.flow === flow
        && t.datetime.startsWith(day)
        && t.category === category
        && (t.subcategory || "") === sub
        && amountMatch(t.amount, amount);
    });
  }

  async addTransaction(tx, opts = {}) {
    this.data.transactions.unshift(tx);
    this._ensureCategoryForTx(tx);
    if (opts.learn !== false && !isCarryoverTx(tx)) {
      learnKeywordsFromTransaction(this.data, tx, opts.learnText);
    }
    await this.save();
    if (!isCarryoverTx(tx)) {
      await appendPlainLedgerDailyNote(this.plugin.app, this.plugin, tx);
    }
    await this.processCarryovers();
  }

  async updateTransaction(tx, opts = {}) {
    const i = this.data.transactions.findIndex((t) => t.id === tx.id);
    if (i >= 0) this.data.transactions[i] = tx;
    else this.data.transactions.unshift(tx);
    if (opts.learn !== false && !isCarryoverTx(tx)) {
      learnKeywordsFromTransaction(this.data, tx, opts.learnText || tx.note);
    }
    await this.save();
    await this.processCarryovers();
  }

  _dueDateInMonth(item, monthPrefix) {
    const [y, m] = monthPrefix.split("-").map(Number);
    if (!y || !m) return "";
    const fromNext = String(item.nextDate || "").slice(0, 7) === monthPrefix
      ? String(item.nextDate).slice(8, 10)
      : "";
    const targetDay = item.cycleDay || parseInt(fromNext, 10) || 1;
    const lastDay = new Date(y, m, 0).getDate();
    return `${monthPrefix}-${pad2(Math.min(targetDay, lastDay))}`;
  }

  _matchSubscriptionForTx(tx) {
    const subs = this.data.subscriptions || [];
    return subs.find((s) => {
      if (!amountMatch(s.amount, tx.amount)) return false;
      const sub = s.subcategory || "";
      const note = String(tx.note || "");
      return (sub && sub === (tx.subcategory || ""))
        || (s.name && (note === s.name || note.includes(s.name)));
    }) || null;
  }

  _matchRecurringForTx(tx) {
    const items = this.data.recurring || [];
    return items.find((r) => {
      if (!amountMatch(r.amount, tx.amount)) return false;
      const title = r.title || r.name || "";
      const note = String(tx.note || "");
      return (r.category === tx.category && (r.subcategory || "") === (tx.subcategory || ""))
        || (title && (note === title || note.includes(title)));
    }) || null;
  }

  _revertCycleItemAfterDelete(item, billedDateStr, kind) {
    const source = kind === "subscription" ? "subscription" : "recurring";
    if (this._autoTxExists(item, billedDateStr, source)) return false;
    const expectedNext = computeNextRecurringDate(item, billedDateStr);
    const monthPrefix = billedDateStr.slice(0, 7);
    if (item.nextDate === expectedNext) {
      item.nextDate = billedDateStr;
    } else if (item.nextDate > billedDateStr && billedDateStr.startsWith(monthPrefix)) {
      item.nextDate = billedDateStr;
    } else {
      return false;
    }
    item.generatedCount = Math.max(0, (item.generatedCount || 0) - 1);
    const list = kind === "subscription" ? this.data.subscriptions : this.data.recurring;
    const i = (list || []).findIndex((x) => x.id === item.id);
    if (i >= 0) list[i] = item;
    return true;
  }

  _revertCycleForDeletedTx(tx, billedDate) {
    if (!billedDate) return;
    let item = null;
    let kind = null;
    if (tx.linkedSubscriptionId) {
      item = (this.data.subscriptions || []).find((s) => s.id === tx.linkedSubscriptionId);
      kind = "subscription";
    } else if (tx.linkedRecurringId) {
      item = (this.data.recurring || []).find((r) => r.id === tx.linkedRecurringId);
      kind = "recurring";
    } else if (tx.source === "subscription" || (tx.tags || []).includes("订阅")) {
      item = this._matchSubscriptionForTx(tx);
      kind = "subscription";
    } else if (tx.source === "recurring" || (tx.tags || []).includes("周期")) {
      item = this._matchRecurringForTx(tx);
      kind = "recurring";
    }
    if (item && kind) this._revertCycleItemAfterDelete(item, billedDate, kind);
  }

  repairOrphanedPendingDues(refDate = new Date()) {
    const monthPrefix = `${refDate.getFullYear()}-${pad2(refDate.getMonth() + 1)}`;
    let dirty = false;
    const repair = (item, kind) => {
      if (item.active === false) return;
      const due = this._dueDateInMonth(item, monthPrefix);
      if (!due || !due.startsWith(monthPrefix)) return;
      if (this._autoTxExists(item, due, kind)) return;
      const expectedNext = computeNextRecurringDate(item, due);
      if (item.nextDate === expectedNext) {
        item.nextDate = due;
        dirty = true;
      }
    };
    (this.data.subscriptions || []).forEach((s) => repair(s, "subscription"));
    (this.data.recurring || []).forEach((r) => repair(r, "recurring"));
    return dirty;
  }

  async deleteTransaction(id) {
    const tx = this.data.transactions.find((t) => t.id === id);
    if (!tx) return false;
    const billedDate = String(tx.datetime || "").slice(0, 10);
    this.data.transactions = this.data.transactions.filter((t) => t.id !== id);
    this._revertCycleForDeletedTx(tx, billedDate);
    await this.save();
    await this.processCarryovers();
    return true;
  }

  _applyRecurringGeneration(item, dateStr) {
    if (this._autoTxExists(item, dateStr, "recurring")) {
      item.nextDate = computeNextRecurringDate(item, dateStr);
      return null;
    }
    const tx = {
      id: uid(),
      datetime: cycleTimeOnDate(dateStr, item),
      flow: item.flow || "expense",
      category: item.category,
      subcategory: item.subcategory || "",
      amount: item.amount,
      ledger: this.data.ledger || "",
      accountOut: "",
      accountIn: "",
      note: item.title || item.note || "周期记账",
      reimburse: false,
      discount: 0,
      tags: ["周期"],
      member: "",
      source: "recurring",
      linkedRecurringId: item.id,
      linkedSubscriptionId: "",
    };
    item.generatedCount = (item.generatedCount || 0) + 1;
    item.nextDate = computeNextRecurringDate(item, dateStr);
    const i = this.data.recurring.findIndex((r) => r.id === item.id);
    if (i >= 0) this.data.recurring[i] = item;
    return tx;
  }

  async backfillRecurringToToday(item) {
    const today = dateKey(new Date());
    const start = billingDateValue(item);
    if (!start || item.active === false) return 0;
    if (start > today) {
      item.nextDate = computeInitialNextDate(item, new Date());
      return 0;
    }
    const dates = computeSubscriptionPeriodDates(item, start, today);
    let generated = 0;
    for (const dateStr of dates) {
      const tx = this._applyRecurringGeneration(item, dateStr);
      if (!tx) continue;
      this.data.transactions.unshift(tx);
      this._ensureCategoryForTx(tx);
      generated++;
    }
    if (!dates.length || (generated === 0 && (!item.nextDate || item.nextDate <= today))) {
      item.nextDate = computeInitialNextDate(item, new Date());
    }
    const i = this.data.recurring.findIndex((r) => r.id === item.id);
    if (i >= 0) this.data.recurring[i] = item;
    return generated;
  }

  async processDueRecurring() {
    if (this._processDueRecurringBusy) return 0;
    this._processDueRecurringBusy = true;
    try {
      const today = dateKey(new Date());
      const items = this.data.recurring || [];
      let generated = 0;
      let dirty = false;
      for (const item of items) {
        if (item.active === false) continue;
        const linked = (this.data.transactions || []).filter(
          (t) => t.linkedRecurringId === item.id,
        ).length;
        if (linked === 0 && (item.generatedCount || 0) === 0) {
          const start = billingDateValue(item);
          if (start && start <= today) {
            generated += await this.backfillRecurringToToday(item);
            dirty = true; // 含仅推进 nextDate、未生成流水
            continue;
          }
        }
        if (!item.nextDate) item.nextDate = computeNextRecurringDate(item, today);
        let guard = 0;
        while (item.nextDate && item.nextDate <= today && guard++ < 60) {
          const before = item.nextDate;
          const created = await this._generateRecurringAt(item, item.nextDate, { persist: false });
          if (created) generated++;
          if (item.nextDate !== before) dirty = true;
          // 去重后 continue 追下一期；persist:false 避免每期都写盘
        }
      }
      if (dirty || generated > 0) await this.save();
      return generated;
    } finally {
      this._processDueRecurringBusy = false;
    }
  }

  async _generateRecurringAt(item, dateStr, opts = {}) {
    const persist = opts.persist !== false;
    const tx = this._applyRecurringGeneration(item, dateStr);
    if (!tx) {
      if (persist) await this.save();
      return false;
    }
    this.data.transactions.unshift(tx);
    this._ensureCategoryForTx(tx);
    if (persist) await this.save();
    return true;
  }

  async saveRecurring(item) {
    if (!this.data.recurring) this.data.recurring = [];
    const i = this.data.recurring.findIndex((r) => r.id === item.id);
    const isNew = i < 0;
    if (i >= 0) this.data.recurring[i] = item;
    else this.data.recurring.push(item);
    syncBillIconWithSubcategory(this.data, item);
    await this.save();

    if (item.active === false || !isNew) return 0;
    const backfilled = await this.backfillRecurringToToday(item);
    if (backfilled > 0) await this.save();
    return backfilled;
  }

  async deleteRecurring(id) {
    this.data.recurring = (this.data.recurring || []).filter((r) => r.id !== id);
    await this.save();
  }

  async generateRecurring(id) {
    const item = (this.data.recurring || []).find((r) => r.id === id);
    if (!item || item.active === false) return;
    const dateStr = item.nextDate || dateKey(new Date());
    await this._generateRecurringAt(item, dateStr);
  }

  async recordPendingDue(kind, id) {
    if (kind === "recurring") {
      const item = (this.data.recurring || []).find((r) => r.id === id);
      if (!item || item.active === false) return false;
      const dateStr = item.nextDate || dateKey(new Date());
      return !!(await this._generateRecurringAt(item, dateStr));
    }
    const item = (this.data.subscriptions || []).find((s) => s.id === id);
    if (!item || item.active === false) return false;
    const dateStr = item.nextDate || dateKey(new Date());
    return !!(await this._generateSubscriptionAt(item, dateStr));
  }

  async saveSubscription(item) {
    if (!this.data.subscriptions) this.data.subscriptions = [];
    if (item.source === "manual" && item.active !== false) item.userActivated = true;
    const i = this.data.subscriptions.findIndex((r) => r.id === item.id);
    if (i >= 0) this.data.subscriptions[i] = item;
    else this.data.subscriptions.push(item);
    syncBillIconWithSubcategory(this.data, item);
    await this.save();
  }

  async deleteSubscription(id) {
    this.data.subscriptions = (this.data.subscriptions || []).filter((r) => r.id !== id);
    await this.save();
  }

  async processDueSubscriptions() {
    if (this._processDueSubscriptionsBusy) return 0;
    this._processDueSubscriptionsBusy = true;
    try {
      const today = dateKey(new Date());
      const items = this.data.subscriptions || [];
      let generated = 0;
      let dirty = false;
      for (const item of items) {
        if (item.active === false) continue;
        if (!item.nextDate) item.nextDate = computeInitialNextDate(item);
        let guard = 0;
        while (item.nextDate && item.nextDate <= today && guard++ < 60) {
          const before = item.nextDate;
          const created = await this._generateSubscriptionAt(item, item.nextDate, { persist: false });
          if (created) generated++;
          if (item.nextDate !== before) dirty = true;
        }
      }
      if (dirty || generated > 0) await this.save();
      return generated;
    } finally {
      this._processDueSubscriptionsBusy = false;
    }
  }

  async _generateSubscriptionAt(item, dateStr, opts = {}) {
    const persist = opts.persist !== false;
    if (this._autoTxExists(item, dateStr, "subscription")) {
      item.nextDate = computeNextRecurringDate(item, dateStr);
      const i = this.data.subscriptions.findIndex((r) => r.id === item.id);
      if (i >= 0) this.data.subscriptions[i] = item;
      if (persist) await this.save();
      return false;
    }
    const tx = {
      id: uid(),
      datetime: cycleTimeOnDate(dateStr, item),
      flow: "expense",
      category: item.category || "软件续费",
      subcategory: item.subcategory || "",
      amount: item.amount,
      ledger: this.data.ledger || "",
      accountOut: "",
      accountIn: "",
      note: item.name || item.note || "订阅续费",
      reimburse: false,
      discount: 0,
      tags: ["订阅"],
      member: "",
      source: "subscription",
      linkedSubscriptionId: item.id,
      linkedRecurringId: "",
    };
    item.generatedCount = (item.generatedCount || 0) + 1;
    item.nextDate = computeNextRecurringDate(item, dateStr);
    const i = this.data.subscriptions.findIndex((r) => r.id === item.id);
    if (i >= 0) this.data.subscriptions[i] = item;
    this.data.transactions.unshift(tx);
    this._ensureCategoryForTx(tx);
    if (persist) await this.save();
    return true;
  }

  async addCategory(payload) {
    const name = (payload.name || "").trim();
    if (!name) throw new Error("请填写分类名称");
    if (this.data.categories.find((c) => c.name === name)) throw new Error("分类已存在");
    const meta = CATEGORY_META[name] || { icon: "📌", color: "#ccc" };
    this.data.categories.push({
      name,
      flow: payload.flow || "expense",
      icon: payload.icon || categoryInitialIcon(name) || meta.icon,
      iconUrl: payload.iconUrl || "",
      color: payload.color || meta.color,
      subcategories: (payload.subcategories || []).map((s) => normalizeSubcategory(typeof s === "string" ? { name: s } : s)),
      keywords: [...(payload.keywords || [])],
    });
    this.data.categories.sort((a, b) => a.name.localeCompare(b.name, "zh"));
    await this.save();
  }

  async updateCategory(oldName, payload) {
    const cat = this.data.categories.find((c) => c.name === oldName);
    if (!cat) return;
    const newName = (payload.name || oldName).trim();
    if (newName !== oldName && this.data.categories.some((c) => c.name === newName)) {
      throw new Error("分类名称已存在");
    }
    if (newName !== oldName) {
      this.data.transactions.forEach((t) => {
        if (t.category === oldName) t.category = newName;
      });
      cat.name = newName;
    }
    if (payload.flow !== undefined) cat.flow = payload.flow;
    if (payload.icon !== undefined) cat.icon = payload.icon;
    if (payload.iconUrl !== undefined) cat.iconUrl = payload.iconUrl;
    if (payload.color !== undefined) cat.color = payload.color;
    if (payload.subcategories !== undefined) {
      cat.subcategories = payload.subcategories.map((s) => normalizeSubcategory(typeof s === "string" ? { name: s } : s));
    }
    if (payload.keywords !== undefined) {
      cat.keywords = [...payload.keywords];
    } else if (!cat.keywords) {
      cat.keywords = [];
    }
    await this.save();
  }

  async deleteCategory(name, migrateTo) {
    const cat = this.data.categories.find((c) => c.name === name);
    if (!cat) return;
    const related = this.data.transactions.filter((t) => t.category === name);
    if (related.length) {
      const targetName = migrateTo?.category?.trim();
      if (!targetName) throw new Error("请选择迁移目标分类");
      if (targetName === name) throw new Error("请选择其他分类");
      const target = this.data.categories.find((c) => c.name === targetName);
      if (!target) throw new Error("目标分类不存在");
      const targetSub = migrateTo?.subcategory || "";
      related.forEach((t) => {
        t.category = targetName;
        t.subcategory = targetSub;
      });
      this.migrateCategoryMeta(name, { category: targetName, subcategory: targetSub });
    }
    this.data.categories = this.data.categories.filter((c) => c.name !== name);
    await this.save();
  }

  migrateCategoryMeta(fromName, to) {
    const { category, subcategory = "" } = to;
    (this.data.recurring || []).forEach((r) => {
      if (r.category === fromName) {
        r.category = category;
        if (subcategory) r.subcategory = subcategory;
      }
    });
    (this.data.subscriptions || []).forEach((s) => {
      if (s.category === fromName) {
        s.category = category;
        if (subcategory) s.subcategory = subcategory;
      }
    });
  }

  migrateSubcategoryMeta(catName, fromSub, to) {
    const destCat = to.category || catName;
    const destSub = to.subcategory ?? "";
    const fromSn = String(fromSub || "").trim();
    if (!fromSn) return;

    const touch = (bill) => {
      if (!billLinksToSubcategory(bill, catName, fromSn)) return;
      const sub = String(bill.subcategory || "").trim();
      const title = String(bill.title || bill.name || "").trim();
      bill.category = destCat;
      bill.subcategory = destSub;
      // 规则名曾与二级同名（旧数据或 1:1 规则）时一并改名
      if (title === fromSn && (!sub || sub === fromSn)) {
        if (bill.title === fromSn) bill.title = destSub;
        if (bill.name === fromSn) bill.name = destSub;
      }
    };

    (this.data.recurring || []).forEach(touch);
    (this.data.subscriptions || []).forEach(touch);
  }

  async addSubcategory(catName, payload) {
    const meta = normalizeSubcategory(payload);
    if (!meta.name) return;
    const cat = this.data.categories.find((c) => c.name === catName);
    if (!cat) return;
    normalizeCategorySubs(cat);
    if (!cat.subcategories.some((s) => subcategoryName(s) === meta.name)) {
      cat.subcategories.push(meta);
      cat.subcategories.sort((a, b) => subcategoryName(a).localeCompare(subcategoryName(b), "zh"));
    }
    syncSubcategoryIconWithBills(this.data, catName, meta.name, { icon: meta.icon, iconUrl: meta.iconUrl });
    await this.save();
  }

  async deleteSubcategory(catName, subRef, migrateTo) {
    const refName = subcategoryName(subRef);
    const cat = this.data.categories.find((c) => c.name === catName);
    if (!cat) return;
    normalizeCategorySubs(cat);
    const related = this.data.transactions.filter((t) => t.category === catName && t.subcategory === refName);
    if (related.length) {
      if (!migrateTo) throw new Error("请选择迁移目标");
      const destCat = migrateTo.category || catName;
      const destSub = migrateTo.subcategory ?? "";
      if (destCat === catName && destSub === refName) throw new Error("请选择其他二级分类");
      related.forEach((t) => {
        t.category = destCat;
        t.subcategory = destSub;
      });
      this.migrateSubcategoryMeta(catName, refName, { category: destCat, subcategory: destSub });
    }
    cat.subcategories = cat.subcategories.filter((s) => subcategoryName(s) !== refName);
    await this.save();
  }

  async updateSubcategory(catName, oldSub, payload) {
    const oldName = subcategoryName(oldSub);
    const next = typeof payload === "string"
      ? { ...normalizeSubcategory(oldSub), name: payload.trim() }
      : {
        ...normalizeSubcategory(oldSub),
        ...normalizeSubcategory(payload),
        name: (payload.name || oldName).trim(),
        keywords: payload.keywords !== undefined
          ? [...(payload.keywords || [])]
          : [...(normalizeSubcategory(oldSub).keywords || [])],
      };
    if (!next.name) throw new Error("请填写名称");
    const cat = this.data.categories.find((c) => c.name === catName);
    if (!cat) return;
    normalizeCategorySubs(cat);
    if (cat.subcategories.some((s) => subcategoryName(s) === next.name && subcategoryName(s) !== oldName)) {
      throw new Error("二级分类已存在");
    }
    const i = cat.subcategories.findIndex((s) => subcategoryName(s) === oldName);
    if (i < 0) throw new Error("二级分类不存在");
    cat.subcategories[i] = next;
    cat.subcategories.sort((a, b) => subcategoryName(a).localeCompare(subcategoryName(b), "zh"));
    if (next.name !== oldName) {
      this.migrateSubcategoryMeta(catName, oldName, { category: catName, subcategory: next.name });
    }
    this.data.transactions.forEach((t) => {
      if (t.category === catName && t.subcategory === oldName) t.subcategory = next.name;
    });
    syncSubcategoryIconWithBills(this.data, catName, next.name, { icon: next.icon, iconUrl: next.iconUrl });
    await this.save();
  }

  async addKeyword(catName, kw) {
    const word = (kw || "").trim();
    if (!word) return;
    const cat = this.data.categories.find((c) => c.name === catName);
    if (!cat) return;
    if (!cat.keywords) cat.keywords = [];
    if (!cat.keywords.includes(word)) cat.keywords.push(word);
    await this.save();
  }

  async updateKeyword(catName, oldKw, newKw) {
    const next = (newKw || "").trim();
    if (!next) throw new Error("请填写关键词");
    const cat = this.data.categories.find((c) => c.name === catName);
    if (!cat) return;
    if (!cat.keywords) cat.keywords = [];
    if (cat.keywords.includes(next) && next !== oldKw) throw new Error("关键词已存在");
    const i = cat.keywords.indexOf(oldKw);
    if (i < 0) throw new Error("关键词不存在");
    cat.keywords[i] = next;
    await this.save();
  }

  async deleteKeyword(catName, kw) {
    const cat = this.data.categories.find((c) => c.name === catName);
    if (!cat?.keywords) return;
    cat.keywords = cat.keywords.filter((k) => k !== kw);
    await this.save();
  }
}

function openImportLedgerOverlay(app, plugin, onDone, opts = {}) {
  openPlgOverlay({
    title: "导入账单",
    stack: true,
    build: (body, close) => {
      addClasses(body, "plg-modal");
      body.createEl("p", {
        text: "支持 PlainLedger Excel 格式或 PlainLedger JSON。.xlsx 默认合并流水并保留订阅/周期规则；.json 整包替换。",
        cls: "plg-muted",
      });
      const input = body.createEl("input", { type: "file", attr: { accept: ".xlsx,.json" } });
      const mergeRow = body.createDiv({ cls: "plg-modal-row" });
      mergeRow.createSpan({ text: "Excel 合并导入（保留订阅/周期）" });
      const mergeChk = mergeRow.createEl("input", { type: "checkbox" });
      mergeChk.checked = true;
      const btnRow = body.createDiv({ cls: "plg-modal-actions" });
      btnRow.createEl("button", { text: "取消", attr: { type: "button" } }).onclick = () => {
        if (opts.onCancel) opts.onCancel();
        close();
      };
      const runImport = async () => {
        const file = input.files?.[0];
        if (!file) return new Notice("请选择文件");
        try {
          let payload;
          const isJson = file.name.endsWith(".json");
          if (isJson) {
            payload = parseLedgerJson(await file.text());
          } else {
            payload = parseMumuXlsx(await file.arrayBuffer());
          }
          const result = await plugin.store.importData(payload, file.name, {
            mergeTxOnly: !isJson && mergeChk.checked,
            preserveRules: !isJson && mergeChk.checked,
          });
          const msg = result?.merged
            ? `已合并 ${result.added} 笔（共 ${result.total} 笔）`
            : `已导入 ${result?.total ?? payload.transactions.length} 笔账单`;
          new Notice(msg);
          if (opts.onSuccess) await opts.onSuccess();
          onDone?.();
          close();
        } catch (e) {
          new Notice("导入失败：" + e.message);
        }
      };
      btnRow.createEl("button", { text: "导入", cls: "mod-cta", attr: { type: "button" } }).onclick = async () => {
        const file = input.files?.[0];
        if (!file) return new Notice("请选择文件");
        const isJson = file.name.endsWith(".json");
        if (isJson) {
          let payload;
          try {
            payload = parseLedgerJson(await file.text());
          } catch (e) {
            return new Notice("导入失败：" + e.message);
          }
          confirmPlgAction({
            title: "确认导入 JSON",
            message: `将用文件中的 ${payload.transactions?.length || 0} 笔账单整包替换当前 ${plugin.store.data.transactions.length} 笔，订阅/周期规则也会被覆盖。建议先导出备份。`,
            danger: true,
            confirmText: "覆盖导入",
            onConfirm: runImport,
          });
          return;
        }
        if (!mergeChk.checked) {
          let payload;
          try {
            payload = parseMumuXlsx(await file.arrayBuffer());
          } catch (e) {
            return new Notice("导入失败：" + e.message);
          }
          confirmPlgAction({
            title: "确认覆盖导入 Excel",
            message: `未勾选「合并导入」。将用文件中的 ${payload.transactions?.length || 0} 笔账单整包替换当前 ${plugin.store.data.transactions.length} 笔，订阅/周期规则会被清空。建议先导出备份。`,
            danger: true,
            confirmText: "覆盖导入",
            onConfirm: runImport,
          });
          return;
        }
        await runImport();
      };
    },
  });
}

function ledgerToMumuRows(data) {
  const headers = ["时间", "类型", "分类", "二级分类", "金额", "账本", "转出账户", "转入账户", "备注", "报销", "优惠", "成员"];
  const rows = [headers];
  (data.transactions || []).forEach((t) => {
    const flowLabel = t.flow === "income" ? "收入" : t.flow === "transfer" ? "转账" : "支出";
    rows.push([
      t.datetime || "",
      flowLabel,
      t.category || "",
      t.subcategory || "",
      String(t.amount ?? ""),
      t.ledger || "",
      t.accountOut || "",
      t.accountIn || "",
      t.note || "",
      t.reimburse ? "是" : "",
      t.discount ? String(t.discount) : "",
      t.member || "",
    ]);
  });
  return rows;
}

function rowsToCsv(rows) {
  return rows.map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
}

async function exportLedgerJson(plugin) {
  const json = JSON.stringify(plugin.store.data, null, 2);
  const name = `ledger-export-${dateKey(new Date())}.json`;
  const path = normalizePath(`${plugin.store.folder()}/${name}`);
  await plugin.store.ensureFolder();
  await plugin.app.vault.adapter.write(path, json);
  new Notice(`已导出 JSON：${path}`);
}

async function exportLedgerMumuCsv(plugin) {
  const csv = "\uFEFF" + rowsToCsv(ledgerToMumuRows(plugin.store.data));
  const name = `plain-ledger-export-${dateKey(new Date())}.csv`;
  const path = normalizePath(`${plugin.store.folder()}/${name}`);
  await plugin.store.ensureFolder();
  await plugin.app.vault.adapter.write(path, csv);
  new Notice(`已导出 CSV：${path}`);
}

const exportLedgerCsv = exportLedgerMumuCsv;

// ─── Import modal (legacy alias) ───────────────────────────────────────────────

class ImportFileModal {
  constructor(app, plugin, onDone) {
    this.app = app;
    this.plugin = plugin;
    this.onDone = onDone;
  }

  open() {
    openImportLedgerOverlay(this.app, this.plugin, this.onDone);
  }
}

// ─── Dashboard view ────────────────────────────────────────────────────────────

let _mumuSafeAreaProbe;

/** 读取 iOS safe-area（Obsidian WebView 内 env() 可用） */
function readMobileSafeAreaInsets() {
  if (typeof document === "undefined") return { top: 0, bottom: 0 };
  if (!_mumuSafeAreaProbe) {
    _mumuSafeAreaProbe = document.createElement("div");
    _mumuSafeAreaProbe.className = "plg-safe-area-probe";
    document.body.appendChild(_mumuSafeAreaProbe);
  }
  const st = getComputedStyle(_mumuSafeAreaProbe);
  return {
    top: parseFloat(st.paddingTop) || 0,
    bottom: parseFloat(st.paddingBottom) || 0,
  };
}

class LedgerDashboardView extends ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    const ui = Object.assign({}, DEFAULT_SETTINGS.uiState, plugin.settings.uiState || {});
    if (ui.tab === "settings") ui.tab = "home";
    if (ui.tab === "calendar") { ui.tab = "home"; ui.homeSubview = "calendar"; }
    if (ui.tab === "year") { ui.tab = "reports"; ui.period = "year"; }
    this.tab = ui.tab;
    this.homeSubview = ui.homeSubview || "list";
    this.period = ui.period;
    this.refDate = new Date();
    this.reportFlow = ui.reportFlow || "expense";
    this.listSearch = ui.listSearch || "";
    this.listCategory = ui.listCategory || "all";
    this.listReimburseOnly = !!ui.listReimburseOnly;
    this.listGroupLimit = 20;
    this._billGroupTotal = 0;
    this._billScrollHandler = null;
    this.collapsedDays = new Set(ui.collapsedDays || []);
    this.expandedReportCats = new Set();
    this.reportTopic = ui.reportTopic || "";
    this._reportPresetId = ui.reportPresetId || null;
    this._reportTopicTimer = null;
    this.reportGroupMode = ui.reportGroupMode || "category";
    this.calendarMonth = new Date();
    this.selectedDay = null;
  }

  getViewType() { return VIEW_TYPE; }
  getDisplayText() { return "PlainLedger"; }
  getIcon() { return ICON_NAME; }

  async onOpen() {
    this.containerEl.empty();
    this.root = this.containerEl.createDiv({ cls: "plg-ledger-root" });
    if (typeof isMobileCaptureUi === "function" ? isMobileCaptureUi() : Platform.isMobile) {
      this.root.addClass("plg-mobile");
      this.root.addClass("plg-mobile-tab");
    }
    applyCssProps(this.root, { ["--plg-top-inset"]: Platform.isMobile ? "10px" : "0px" });
    applyCssProps(this.root, { ["--plg-bottom-inset"]: Platform.isMobile ? "72px" : "72px" });
    this.insetHandler = () => this.syncMobileInsets();
    window.addEventListener("resize", this.insetHandler);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", this.insetHandler);
      window.visualViewport.addEventListener("scroll", this.insetHandler);
    }
    this.insetObserver = new ResizeObserver(() => this.syncMobileInsets());
    this.insetObserver.observe(this.containerEl);
    const observeInsetTargets = Platform.isMobile
      ? ".status-bar, .app-container, .mobile-toolbar, .navbar-action-bar, .mobile-navbar"
      : ".status-bar, .app-container";
    document.querySelectorAll(observeInsetTargets).forEach((el) => {
      try { this.insetObserver.observe(el); } catch (_) { /* ignore */ }
    });
    await this.render();
    if (Platform.isMobile) {
      [0, 120, 320, 640].forEach((ms) => {
        window.setTimeout(() => this.syncMobileInsets(), ms);
      });
    }
  }

  async onClose() {
    await persistDashboardUiState(this.plugin, this);
    if (this.insetHandler) {
      window.removeEventListener("resize", this.insetHandler);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", this.insetHandler);
        window.visualViewport.removeEventListener("scroll", this.insetHandler);
      }
    }
    this.insetObserver?.disconnect();
    this.containerEl.empty();
  }

  syncMobileInsets() {
    if (!this.root) return;
    if (this._insetTimer) window.clearTimeout(this._insetTimer);
    this._insetTimer = window.setTimeout(() => {
      // 真机才走 safe-area + Obsidian 悬浮导航计算
      if (Platform.isMobile) this._applyMobileLayout();
      else this._applyBottomInset();
    }, 80);
  }

  /** 真机专用：按 safe-area 与 Obsidian 悬浮导航算动态 top/bottom inset */
  _applyMobileLayout() {
    if (!Platform.isMobile || !this.root) return;

    const ih = window.innerHeight || document.documentElement.clientHeight || 640;
    const safe = readMobileSafeAreaInsets();
    const leaf = this.containerEl?.closest(".workspace-leaf-content");
    const lr = leaf?.getBoundingClientRect();
    const leafTop = lr?.top ?? 0;
    const m = typeof measureMobileVisualViewport === "function"
      ? measureMobileVisualViewport()
      : null;

    // 清除此前错误的根视图缩放（曾导致搜索顶栏叠状态栏、底栏消失）
    this.root.removeClass("plg-kb-open");
    this.root.style.removeProperty("height");
    this.root.style.removeProperty("max-height");
    this.root.style.removeProperty("margin-top");

    // 顶栏：Obsidian 已下移 leaf 时不再叠加完整 safe-area
    let topInset;
    if (leafTop >= Math.max(safe.top, 24) - 8) {
      topInset = 10;
    } else if (leafTop > 10) {
      topInset = Math.max(8, Math.round(safe.top - leafTop + 12));
    } else {
      topInset = Math.max(14, Math.round(safe.top + 12));
    }
    topInset = Math.min(52, topInset);
    // 搜索收起英雄区后：若 leaf 贴顶，必须让出状态栏（safe-area 偶发为 0 时用 47）
    if (this.root.hasClass("plg-search-focus-root")) {
      const statusFloor = Math.max(safe.top || 0, 44);
      if (leafTop < 24) {
        topInset = Math.max(topInset, Math.round(statusFloor + 8));
      } else {
        topInset = Math.max(topInset, 14);
      }
    }

    // 底栏：Obsidian 悬浮导航 + home indicator；搜索时也保留底栏
    // （4.0.2 曾误改为 safe+8，导致 Tab 与 Obsidian 底栏叠在一起）
    let bottomInset = Math.max(64, Math.round(safe.bottom + 56));
    if (m && !m.keyboardOpen && m.kbGap > 16) {
      bottomInset = Math.max(bottomInset, Math.ceil(m.kbGap + safe.bottom + 10));
    }
    // 键盘弹起：抬高底 inset 给键盘，但预留底栏高度，绝不隐藏 Tab
    if (m?.keyboardOpen && m.kbGap > 48) {
      const leafBottom = lr?.bottom ?? ih;
      const gapBelowLeaf = Math.max(0, ih - leafBottom);
      bottomInset = Math.max(56, Math.ceil(m.kbGap - gapBelowLeaf + 8));
      bottomInset = Math.min(bottomInset, Math.round(ih * 0.5));
    }
    // 保证 body+Tab 仍有可见高度（避免键盘 inset 过大把底栏顶出视口）
    {
      const tabReserve = 72;
      const bodyMin = 96;
      const maxBot = Math.max(56, Math.round(ih - topInset - tabReserve - bodyMin));
      bottomInset = Math.min(bottomInset, maxBot);
    }

    document.querySelectorAll(
      ".status-bar, .mobile-toolbar, .navbar-action-bar, .mobile-navbar, .mobile-nav"
    ).forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.height < 4 || r.width < 36) return;
      if (r.bottom >= ih - 2 && r.top > ih * 0.35) {
        bottomInset = Math.max(bottomInset, Math.ceil(ih - r.top + 12));
      }
    });

    const tabbar = this.root.querySelector(".plg-tabbar");
    if (tabbar) {
      const tr = tabbar.getBoundingClientRect();
      if (tr.bottom > ih - 4) {
        bottomInset = Math.max(bottomInset, Math.ceil(tr.bottom - ih + 14));
      }
    }

    bottomInset = Math.min(220, Math.max(56, bottomInset));

    const topStr = `${topInset}px`;
    const botStr = `${bottomInset}px`;
    if (this.root.style.getPropertyValue("--plg-top-inset") !== topStr) {
      applyCssProps(this.root, { ["--plg-top-inset"]: topStr });
    }
    if (this.root.style.getPropertyValue("--plg-bottom-inset") !== botStr) {
      applyCssProps(this.root, { ["--plg-bottom-inset"]: botStr });
    }
  }

  _applyBottomInset() {
    if (!this.root) return;
    const tabbar = this.root.querySelector(".plg-tabbar");
    if (!tabbar) return;

    let inset = 0;
    const tr = tabbar.getBoundingClientRect();
    // 紧凑布局（含窄桌面侧栏）用手机版底栏高度做下限，否则 Tab 会压到内容上
    const compact = this.root.hasClass("plg-mobile");
    const floor = compact ? 56 : 22;
    const cap = compact ? 88 : 40;

    document.querySelectorAll(
      ".status-bar, .mobile-navbar, .navbar-action-bar, .mobile-toolbar, .app-container > .status-bar"
    ).forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.height < 4 || r.width < 40) return;
      if (r.top < tr.bottom - 1 && r.bottom > tr.top + 1) {
        inset = Math.max(inset, tr.bottom - r.top + 6);
      }
    });

    const leaf = this.containerEl?.closest(".workspace-leaf-content");
    if (leaf) {
      const lr = leaf.getBoundingClientRect();
      if (tr.bottom > lr.bottom - 1) {
        inset = Math.max(inset, tr.bottom - lr.bottom + 6);
      }
    }

    if (compact && tr.bottom > window.innerHeight - 1) {
      inset = Math.max(inset, tr.bottom - window.innerHeight + 6);
    }

    const next = `${Math.max(floor, Math.min(cap, Math.round(inset)))}px`;
    const cur = this.root.style.getPropertyValue("--plg-bottom-inset");
    if (cur !== next) {
      applyCssProps(this.root, { ["--plg-bottom-inset"]: next });
    }
  }

  openBudgetEditor() {
    const plugin = this.plugin;
    const isMobile = this.root?.hasClass("plg-mobile")
      || (typeof Platform !== "undefined" && Platform.isMobile);
    openPlgOverlay({
      title: "本月预算",
      cls: isMobile ? "plg-budget-edit-modal" : "plg-budget-edit-modal",
      build: (body, close) => {
        addClasses(body, "plg-modal", "plg-budget-edit-modal");
        body.createDiv({ cls: "plg-muted", text: "填 0 表示不设预算，界面不再显示剩余额度与超支" });
        const inp = body.createEl("input", {
          type: "text",
          cls: "plg-budget-edit-input",
          attr: { placeholder: "例如 8000", inputmode: "decimal", autocomplete: "off" },
        });
        inp.value = plugin.settings.monthlyBudget > 0 ? String(plugin.settings.monthlyBudget) : "";
        const focusInput = () => {
          inp.focus({ preventScroll: true });
          if (typeof inp.setSelectionRange === "function") {
            const len = inp.value.length;
            inp.setSelectionRange(len, len);
          }
        };
        inp.addEventListener("touchend", (e) => {
          e.stopPropagation();
          focusInput();
        }, { passive: true });
        window.requestAnimationFrame(() => focusInput());
        const row = body.createDiv({ cls: "plg-modal-actions" });
        row.createEl("button", { text: "取消", attr: { type: "button" } }).onclick = close;
        row.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).onclick = async () => {
          const next = parseFloat(String(inp.value).replace(/[^\d.]/g, "")) || 0;
          plugin.settings.monthlyBudget = next;
          await plugin.saveSettings();
          new Notice(next > 0 ? `本月预算已设为 ¥${fmtMoney(next)}` : "已取消本月预算");
          this.render();
          close();
        };
      },
    });
  }

  beginSplitPage(parent, opts = {}) {
    const glassFixed = opts.glassFixed !== false;
    parent.addClass("plg-page-split");
    const fixedCls = glassFixed ? "plg-page-fixed plg-glass-panel" : "plg-page-fixed";
    return {
      fixed: parent.createDiv({ cls: fixedCls }),
      scroll: parent.createDiv({ cls: "plg-page-scroll" }),
    };
  }

  syncTabBarActive(tabbar) {
    const tabs = ["home", "stats", "capture", "reports", "settings"];
    tabbar.querySelectorAll(".plg-tab").forEach((btn) => {
      const tabId = btn.getAttr("data-tab");
      btn.toggleClass("active", tabId === this.tab && tabId !== "settings" && tabId !== "capture");
    });
  }

  async render() {
    if (!this.root) return;
    if (typeof isLicenseRequired === "function" && isLicenseRequired()
      && !isPluginLicensed(this.app, this.plugin.settings)) {
      this.root.empty();
      this.root.removeClass("plg-activation-panel");
      renderActivationPanel(this.root, this.plugin);
      if (Platform.isMobile || this.root.hasClass("plg-mobile")) this.syncMobileInsets();
      return;
    }

    if (this.root.querySelector(".plg-activation-wrap") || !this.root.querySelector(".plg-tabbar")) {
      this.root.empty();
      this.root.removeClass("plg-activation-panel");
    }

    const prevScroll = this.root.querySelector(".plg-page-scroll");
    const scrollTop = prevScroll?.scrollTop || 0;
    const tabbar = this.root.querySelector(".plg-tabbar");
    const prevBody = this.root.querySelector(".plg-body");

    if (prevBody && tabbar && (this.tab === "stats" || this.tab === "reports")) {
      const inset = prevBody.querySelector(".plg-sidebar-inset") || prevBody.querySelector(".lifeos-sidebar-inset");
      const blockId = `${this.tab}-page`;
      if (inset?.querySelector(`[data-plg-block="${blockId}"]`)) {
        if (this.tab === "stats") this.renderStats(inset, { patch: true });
        else this.renderReports(inset, { patch: true });
        this.syncTabBarActive(tabbar);
        const newScroll = prevBody.querySelector(".plg-page-scroll");
        if (newScroll && scrollTop > 0) newScroll.scrollTop = scrollTop;
        if (Platform.isMobile || this.root.hasClass("plg-mobile")) this.syncMobileInsets();
        return;
      }
    }

    this.root.querySelector(".plg-body")?.remove();

    const body = this.root.createDiv({ cls: "plg-body plg-body-split" });
    if (tabbar) this.root.insertBefore(body, tabbar);

    const inset = body.createDiv({ cls: "lifeos-sidebar-inset plg-sidebar-inset" });
    if (typeof renderTrialBanner === "function") renderTrialBanner(inset, this.plugin);

    if (this.tab === "home") this.renderHome(inset);
    else if (this.tab === "stats") this.renderStats(inset);
    else if (this.tab === "reports") this.renderReports(inset);
    else this.renderHome(inset);

    if (!tabbar) this.renderTabBar(this.root);
    else this.syncTabBarActive(tabbar);
    const newScroll = this.root.querySelector(".plg-page-scroll");
    if (newScroll && scrollTop > 0) newScroll.scrollTop = scrollTop;
    if (Platform.isMobile || this.root.hasClass("plg-mobile")) this.syncMobileInsets();
  }

  renderTxRow(listEl, t, data, opts = {}) {
    const stacked = !!opts.stacked;
    const carryover = isCarryoverTx(t);
    const iconMeta = getTransactionIconMeta(data.categories, t.category, t.subcategory, data.subscriptions, data.recurring);
    const row = listEl.createDiv({
      cls: "plg-tx-row plg-tx-row-interactive"
        + (stacked ? " plg-tx-row-stacked" : "")
        + (carryover ? " plg-tx-row-carryover" : ""),
    });
    const title = buildTransactionDisplayTitle(data.categories, t);
    const subline = buildTxSubline(t, { dateOnly: stacked || opts.dateOnly });
    const amtCls = t.flow === "income" ? "inc" : t.flow === "transfer" ? "xfer" : "exp";
    const prefix = t.flow === "income" ? "+" : t.flow === "transfer" ? "↔" : "-";

    if (stacked) {
      renderCategoryIcon(row, iconMeta, { panelIcon: true });
      const content = row.createDiv({ cls: "plg-tx-row-content" });
      content.createDiv({ cls: "plg-tx-title", text: title });
      const subWrap = content.createDiv({ cls: "plg-tx-sub" });
      if (subline) subWrap.setText(subline);
      if (carryover) subWrap.createSpan({ cls: "plg-tx-tag", text: "月结" });
      row.createDiv({ cls: `plg-tx-amt ${amtCls}`, text: prefix + fmtMoney(t.amount) });
    } else {
      renderCategoryIcon(row, iconMeta, { panelIcon: true });
      const mid = row.createDiv({ cls: "plg-tx-mid" });
      mid.createDiv({ cls: "plg-tx-title", text: title });
      const subWrap = mid.createDiv({ cls: "plg-tx-sub" });
      if (subline) subWrap.setText(subline);
      if (carryover) subWrap.createSpan({ cls: "plg-tx-tag", text: "月结" });
      row.createDiv({ cls: `plg-tx-amt ${amtCls}`, text: prefix + fmtMoney(t.amount) });
    }

    row.addEventListener("click", () => {
      if (carryover) {
        openCarryoverReadonlyOverlay(this.app, this.plugin, t);
        return;
      }
      openEditTransaction(
        this.app,
        this.plugin,
        { ...t },
        () => this.render(),
        () => this.render()
      );
    });
  }

  renderSettingsPanel(_parent) {
    /* 设置统一在 overlay 弹窗 + Obsidian 设置 → PlainLedger，面板内不再渲染设置页 */
  }

  renderPageToolbar(parent, opts = {}) {
    const toolbar = parent.createDiv({ cls: "plg-report-toolbar" + (opts.embedded ? " is-embedded" : "") });
    const glassRow = toolbar.createDiv({ cls: "plg-toolbar-glass" + (opts.embedded ? " is-embedded" : "") });
    const topRow = glassRow.createDiv({
      cls: "plg-toolbar-glass-top" + (opts.flowToggle ? "" : " is-period-only"),
    });
    const left = topRow.createDiv({ cls: "plg-toolbar-glass-left" });
    const periodSegs = left.createDiv({ cls: "plg-segments plg-seg-capsule plg-segments-period" });
    [
      { id: "all", label: "总" },
      { id: "year", label: "年" },
      { id: "month", label: "月" },
      { id: "week", label: "周" },
    ].forEach((it) => {
      const b = periodSegs.createEl("button", { text: it.label, cls: this.period === it.id ? "active" : "" });
      b.onclick = () => {
        this.period = it.id;
        persistDashboardUiState(this.plugin, this);
        this.render();
      };
    });
    const right = topRow.createDiv({ cls: "plg-toolbar-glass-right" });
    if (opts.flowToggle) {
      const flowSegs = right.createDiv({ cls: "plg-segments plg-seg-capsule plg-seg-capsule-accent plg-segments-flow" });
      ["expense", "income"].forEach((f) => {
        const b = flowSegs.createEl("button", {
          text: f === "expense" ? "支出" : "收入",
          cls: this.reportFlow === f ? "active" : "",
        });
        b.onclick = () => { this.reportFlow = f; persistDashboardUiState(this.plugin, this); this.render(); };
      });
    }
    if (this.period !== "all") {
      const navRow = glassRow.createDiv({ cls: "plg-toolbar-glass-nav-row" });
      this.renderPeriodNav(navRow, { scopeTip: opts.scopeTip });
    }
  }

  renderPeriodNav(parent, opts = {}) {
    const bar = parent.createDiv({ cls: "plg-period-nav-bar" });
    const nav = bar.createDiv({ cls: "plg-month-nav plg-toolbar-period-nav" });
    nav.createEl("button", { text: "‹" }).onclick = () => {
      if (this.period === "month") this.refDate = new Date(this.refDate.getFullYear(), this.refDate.getMonth() - 1, 1);
      else if (this.period === "year") this.refDate = new Date(this.refDate.getFullYear() - 1, 0, 1);
      else this.refDate = new Date(this.refDate.getTime() - 7 * 86400000);
      this.render();
    };
    const label = nav.createSpan({ cls: "plg-month-label" });
    if (this.period === "month") label.setText(`${this.refDate.getFullYear()}年 ${this.refDate.getMonth() + 1}月`);
    else if (this.period === "year") label.setText(`${this.refDate.getFullYear()}年`);
    else label.setText(weekLabel(this.refDate));
    nav.createEl("button", { text: "›" }).onclick = () => {
      if (this.period === "month") this.refDate = new Date(this.refDate.getFullYear(), this.refDate.getMonth() + 1, 1);
      else if (this.period === "year") this.refDate = new Date(this.refDate.getFullYear() + 1, 0, 1);
      else this.refDate = new Date(this.refDate.getTime() + 7 * 86400000);
      this.render();
    };
    if (opts.scopeTip) appendScopeTipBtn(bar, opts.scopeTip);
  }

  renderLedgerSubviewBar(parent) {
    const bar = parent.createDiv({ cls: "plg-ledger-subnav plg-ledger-subnav-immersive" });
    [
      { id: "list", label: "账单", iconKey: "bill" },
      { id: "calendar", label: "日历", iconKey: "calendar" },
    ].forEach((item) => {
      const btn = bar.createDiv({
        cls: "plg-ledger-subnav-btn" + (this.homeSubview === item.id ? " active" : ""),
        attr: { "data-subview": item.id },
      });
      renderPlgNavIcon(btn.createSpan({ cls: "plg-ledger-subnav-icon" }), item.iconKey, { settings: this.plugin.settings });
      btn.createSpan({ text: item.label });
      btn.setAttr("role", "button");
      btn.setAttr("tabindex", "0");
      const switchSubview = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.homeSubview === item.id) return;
        this.homeSubview = item.id;
        if (item.id === "calendar") {
          this.calendarMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
          this.selectedDay = new Date().getDate();
        }
        persistDashboardUiState(this.plugin, this);
        this.render();
      };
      btn.addEventListener("click", switchSubview);
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") switchSubview(e);
      });
    });
  }

  renderHome(parent) {
    const data = this.plugin.store.data;
    const now = new Date();
    const { fixed, scroll } = this.beginSplitPage(parent, { glassFixed: false });
    fixed.addClass("plg-has-glass-child");
    const immersive = fixed.createDiv({ cls: "plg-home-immersive plg-glass-panel" });
    this.renderLedgerSubviewBar(immersive);
    if (this.homeSubview === "calendar") {
      this.renderCalendarInto(immersive, scroll);
      return;
    }
    const isMobileHome = this.root?.hasClass("plg-mobile");
    this.renderHomeSummary(immersive, data, now);
    if (!isMobileHome) {
      renderPendingDuesPanel(immersive, this.plugin, {
        limit: this.plugin.settings.uiState?.pendingDuesShowAll ? 50 : 4,
        collapsible: true,
        onRefresh: () => this.render(),
      });
    }
    const listCard = scroll.createDiv({ cls: "plg-card plg-home-list-card" });
    this.renderHomeBillSection(listCard, data, now);
  }

  renderHomeSummary(hero, data, now) {
    const monthTx = filterTransactions(data.transactions, "month", now);
    const monthTxBase = excludeCarryover(monthTx);
    const yearTxBase = excludeCarryover(filterTransactions(data.transactions, "year", now));
    const weekTxBase = excludeCarryover(filterTransactions(data.transactions, "week", now));

    const mExp = sumFlow(monthTxBase, "expense");
    const mInc = sumFlow(monthTxBase, "income");
    const balance = mInc - mExp;
    const budgetExp = mExp;
    const budget = Number(this.plugin.settings.monthlyBudget) || 0;
    // 预算填 0 = 不启用；此时不算百分比、超支、剩余，避免把「未设置」显示成大红负数
    const budgetSet = budget > 0;
    const budgetPctRaw = budgetSet ? (budgetExp / budget) * 100 : 0;
    const budgetOver = budgetSet && budgetExp > budget;
    const budgetPct = budgetSet ? Math.min(100, budgetPctRaw) : 0;
    const budgetOverAmt = budgetOver ? budgetExp - budget : 0;
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const dayOfMonth = now.getDate();
    const dailyAvg = dayOfMonth > 0 ? budgetExp / dayOfMonth : 0;
    const remainDays = daysInMonth - dayOfMonth + 1;
    const remainDaily = budgetSet && remainDays > 0 ? (budget - budgetExp) / remainDays : 0;
    const remainAmt = budgetSet ? budget - budgetExp : 0;
    const ytdBal = yearToDateSettleBalanceThroughDate(data.transactions, now);
    const ytdMonth = now.getMonth() + 1;

    const banner = hero.createDiv({ cls: "plg-banner plg-banner-in-hero" });
    const tagRow = banner.createDiv({ cls: "plg-banner-tag-row" });
    tagRow.createDiv({ cls: "plg-banner-tag", text: `${now.getMonth() + 1}月 · 支出` });
    const syncBadge = tagRow.createDiv({
      cls: "plg-sync-badge",
      attr: { role: "button", tabindex: "0" },
    });
    const ledgerUpdated = formatSyncTime(this.plugin.store.data?.exportedAt);
    const syncChecked = formatSyncTime(this.plugin._lastSyncCheckedAt || Date.now());
    syncBadge.setText(`同步 · ${syncChecked}`);
    syncBadge.setAttr("title", `点击刷新同步 · 账本更新 ${ledgerUpdated}`);
    syncBadge.setAttr("aria-label", `刷新同步，账本更新 ${ledgerUpdated}`);
    const refreshSync = () => this.plugin.syncFromExternalSources(true);
    syncBadge.addEventListener("click", refreshSync);
    syncBadge.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        refreshSync();
      }
    });
    const expChain = periodSummaryChainCompare(data.transactions, "month", now, "expense");
    const mainRow = banner.createDiv({ cls: "plg-banner-main-row" });
    const amountWrap = mainRow.createDiv({ cls: "plg-banner-amount-wrap" });
    amountWrap.createDiv({ cls: "plg-banner-amount", text: fmtMoney(mExp) });
    if (expChain) {
      const sign = expChain.pct > 0 ? "+" : "";
      amountWrap.createSpan({
        cls: `plg-banner-exp-cmp ${compareTagClass("expense", expChain.pct)}`,
        text: `环${sign}${expChain.pct.toFixed(1)}%`,
      });
    }
    const sideStats = mainRow.createDiv({ cls: "plg-banner-side-stats" });
    const incLine = sideStats.createDiv({ cls: "plg-banner-side-line" });
    incLine.createSpan({ cls: "plg-banner-side-label", text: "收入" });
    incLine.createSpan({ cls: "plg-banner-side-val inc", text: fmtMoney(mInc) });
    const balLine = sideStats.createDiv({ cls: "plg-banner-side-line" });
    balLine.createSpan({ cls: "plg-banner-side-label", text: BALANCE_TERM_MONTHLY });
    balLine.createSpan({
      cls: "plg-banner-side-val " + (balance >= 0 ? "inc" : "over"),
      text: fmtMoney(balance),
    });
    const sub = banner.createDiv({ cls: "plg-banner-sub" });
    const ytdInline = sub.createDiv({ cls: "plg-banner-ytd-inline" });
    ytdInline.createSpan({
      text: `${ytdBalanceLabel(ytdMonth)} ${fmtMoney(ytdBal)}`,
      cls: ytdBal >= 0 ? "inc" : "over",
    });
    appendBalanceInfoBtn(ytdInline, this.app);

    const isMobileHome = this.root?.hasClass("plg-mobile");
    const metricsAlign = isMobileHome ? hero.createDiv({ cls: "plg-home-metrics-align" }) : null;
    const cardsParent = metricsAlign || hero;
    const cards = cardsParent.createDiv({
      cls: "plg-summary-cards plg-home-mini-row" + (isMobileHome ? " plg-metrics-align-cards" : ""),
    });
    const goReportPeriod = (period) => {
      this.tab = "reports";
      this.period = period;
      this.refDate = new Date();
      persistDashboardUiState(this.plugin, this);
      this.render();
    };
    // 三卡一律可点可键盘激活；日历仍由账本子导航进入
    [
      {
        label: "本年", iconKey: "year", hint: "查看本年报表",
        inc: sumFlow(yearTxBase, "income"), exp: sumFlow(yearTxBase, "expense"),
        activate: () => goReportPeriod("year"),
      },
      {
        label: "本月", iconKey: "month", hint: "查看本月报表",
        inc: mInc, exp: mExp,
        activate: () => goReportPeriod("month"),
      },
      {
        label: "本周", iconKey: "week", hint: "查看本周报表",
        inc: sumFlow(weekTxBase, "income"), exp: sumFlow(weekTxBase, "expense"),
        activate: () => goReportPeriod("week"),
      },
    ].forEach((c) => {
      const card = cards.createDiv({ cls: "plg-mini-card plg-home-period-card plg-mini-card-link" });
      card.setAttr("role", "button");
      card.setAttr("tabindex", "0");
      card.setAttr("aria-label", `${c.label} · ${c.hint}`);
      card.setAttr("title", c.hint);
      renderPlgNavIcon(card.createDiv({ cls: "plg-mini-icon" }), c.iconKey, { settings: this.plugin.settings });
      // 三卡保留图标与收支数，不显示「本年 / 本月 / 本周」文字
      card.createDiv({ cls: "plg-mini-inc", text: "+" + fmtMoney(c.inc) });
      card.createDiv({ cls: "plg-mini-exp", text: "-" + fmtMoney(c.exp) });
      const activate = (e) => {
        e.preventDefault();
        e.stopPropagation();
        c.activate();
      };
      card.addEventListener("click", activate);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") activate(e);
      });
    });

    const budgetParent = metricsAlign || hero;
    const budgetCard = budgetParent.createDiv({
      cls: "plg-budget-card plg-compact plg-budget-mobile-stack"
        + (isMobileHome ? " plg-metrics-align-budget" : "")
        + (budgetSet ? "" : " plg-budget-unset")
        + (budgetOver ? " plg-budget-over" : ""),
    });

    const wireMobileBudgetInput = (host, inputCls) => {
      const budgetInp = host.createEl("input", {
        type: "text",
        cls: inputCls || "plg-budget-val-inline",
        attr: { inputmode: "decimal", autocomplete: "off", "aria-label": "本月预算" },
      });
      budgetInp.value = budget > 0 ? String(budget) : "";
      let budgetSaveTimer = null;
      const commitBudget = async () => {
        const v = parseFloat(String(budgetInp.value).replace(/[^\d.]/g, "")) || 0;
        if (v === this.plugin.settings.monthlyBudget) return;
        this.plugin.settings.monthlyBudget = v;
        await this.plugin.saveSettings();
        this.render();
      };
      budgetInp.oninput = () => {
        window.clearTimeout(budgetSaveTimer);
        budgetSaveTimer = window.setTimeout(commitBudget, 500);
      };
      budgetInp.onblur = () => commitBudget();
      budgetInp.onkeydown = (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          budgetInp.blur();
        }
      };
      return budgetInp;
    };

    budgetCard.createDiv({ cls: "plg-budget-mobile-title-rule" });
    const bh = budgetCard.createDiv({ cls: "plg-budget-mobile-title" });
    bh.createSpan({
      cls: "plg-budget-mobile-title-text plg-budget-title-align-year",
      text: "本月预算",
    });
    const titleInputWrap = bh.createDiv({
      cls: "plg-budget-title-input-wrap plg-budget-title-align-week",
    });
    wireMobileBudgetInput(titleInputWrap, "plg-budget-val-inline plg-budget-mobile-amt-input plg-budget-title-input");

    const mobileRow = budgetCard.createDiv({ cls: "plg-budget-mobile-row" });

    const colRing = mobileRow.createDiv({ cls: "plg-budget-col-ring" });
    const ring = colRing.createDiv({
      cls: "plg-ring" + (budgetOver ? " over" : "") + (budgetSet ? "" : " is-unset"),
    });
    if (!budgetSet) {
      applyCssProps(ring, {
        "--plg-ring-bg": "conic-gradient(var(--background-modifier-border) 100%, var(--background-modifier-border) 0)",
      });
      ring.createDiv({ cls: "plg-ring-inner is-unset", text: "—" }).setAttr("aria-hidden", "true");
    } else {
      applyCssProps(ring, {
        "--plg-ring-bg": budgetOver
          ? "conic-gradient(var(--plg-budget-ring-over) 100%, var(--background-modifier-border) 0)"
          : `conic-gradient(var(--plg-budget-ring) ${budgetPct}%, var(--background-modifier-border) 0)`,
      });
      fillBudgetRingInner(ring, budgetPctRaw, budgetOver);
    }

    const stats = mobileRow.createDiv({
      cls: "plg-budget-mobile-stats" + (budgetSet ? "" : " is-unset"),
    });
    const addStatCol = (label, value, numCls, labelCls) => {
      const col = stats.createDiv({ cls: "plg-budget-amt-block" });
      col.createDiv({ cls: "lbl" + (labelCls ? ` ${labelCls}` : ""), text: label });
      col.createDiv({ cls: "num" + (numCls ? ` ${numCls}` : ""), text: value });
    };
    addStatCol("已消费", fmtMoney(budgetExp), "exp", "exp");
    if (budgetSet) {
      const overCls = budgetOverAmt > 0 ? "warn" : "is-weak";
      const remainCls = remainAmt < 0 ? "warn" : "inc";
      addStatCol("已超支", fmtMoney(budgetOverAmt), overCls, overCls);
      addStatCol("剩余额度", fmtMoney(remainAmt), remainCls, remainCls);
    }

    const dailyRow = budgetCard.createDiv({ cls: "plg-budget-mobile-daily" });
    const dailyLeft = dailyRow.createDiv({ cls: "plg-budget-inline-line is-left" });
    dailyLeft.createSpan({ cls: "lbl", text: "本月日均消费" });
    dailyLeft.createSpan({ cls: "num", text: fmtMoney(dailyAvg) });
    if (budgetSet) {
      const dailyRight = dailyRow.createDiv({
        cls: "plg-budget-inline-line is-right" + (remainDaily < 0 ? " over" : " inc"),
      });
      dailyRight.createSpan({ cls: "lbl", text: "剩余每日可消费" });
      dailyRight.createSpan({ cls: "num", text: fmtMoney(remainDaily) });
    }

    if (!budgetSet) {
      renderLifeOsEmptyState(budgetCard.createDiv({ cls: "plg-budget-unset-empty" }), {
        message: "还没设本月预算，设一个就能看到剩余额度和每日可花",
        ctaLabel: "设置预算",
        onCta: () => this.openBudgetEditor(),
      });
    }

    if (isMobileHome) {
      const pendingBottom = budgetCard.createDiv({ cls: "plg-budget-pending-bottom" });
      const expandSlot = budgetCard.createDiv({ cls: "plg-budget-pending-expand" });
      renderPendingDuesPanel(pendingBottom, this.plugin, {
        limit: this.plugin.settings.uiState?.pendingDuesShowAll ? 50 : 4,
        collapsible: true,
        compact: true,
        variant: "mobile-budget",
        listHost: expandSlot,
        onRefresh: () => this.render(),
      });
    }
  }

  renderHomeBillSection(listCard, data, now) {
    const lh = listCard.createDiv({ cls: "plg-card-head plg-list-head" });
    lh.createSpan({ text: "账单列表" });
    const catSel = lh.createEl("select", { cls: "plg-list-cat-inline" });
    catSel.createEl("option", { value: "all", text: "全部分类" });
    data.categories.forEach((c) => {
      const o = catSel.createEl("option", { value: c.name, text: c.name });
      if (c.name === this.listCategory) o.selected = true;
    });

    const toolbar = listCard.createDiv({ cls: "plg-list-toolbar" });
    const searchInput = toolbar.createEl("input", {
      type: "text",
      cls: "plg-list-search",
      attr: { placeholder: "搜索备注/分类…", autocomplete: "off" },
    });
    searchInput.value = this.listSearch;

    const listContainer = listCard.createDiv({ cls: "plg-tx-list" });
    const resetAndRefresh = () => {
      this.listGroupLimit = 20;
      this.fillBillList(listContainer, data, now);
    };

    const reimbCount = data.transactions.filter((t) => !!t.reimburse).length;
    const reimbBtn = toolbar.createEl("button", {
      text: reimbCount ? `报销 · ${reimbCount}` : "报销",
      cls: "plg-list-filter-chip" + (this.listReimburseOnly ? " active" : ""),
      attr: { type: "button" },
    });
    reimbBtn.onclick = () => {
      this.listReimburseOnly = !this.listReimburseOnly;
      reimbBtn.toggleClass("active", this.listReimburseOnly);
      resetAndRefresh();
      persistDashboardUiState(this.plugin, this);
    };

    let searchDebounceTimer = null;
    searchInput.addEventListener("input", () => {
      this.listSearch = searchInput.value;
      if (searchDebounceTimer) window.clearTimeout(searchDebounceTimer);
      searchDebounceTimer = window.setTimeout(() => {
        resetAndRefresh();
        persistDashboardUiState(this.plugin, this);
      }, 200);
    });
    catSel.onchange = () => {
      this.listCategory = catSel.value;
      resetAndRefresh();
      persistDashboardUiState(this.plugin, this);
    };

    this.bindBillListScroll(listContainer, data, now);
    resetAndRefresh();
  }

  bindBillListScroll(listContainer, data, now) {
    const scrollEl = listContainer.closest(".plg-page-scroll");
    if (!scrollEl) return;
    if (this._billScrollHandler) {
      scrollEl.removeEventListener("scroll", this._billScrollHandler);
    }
    this._billScrollHandler = () => {
      if (this.tab !== "home") return;
      if (scrollEl.scrollTop + scrollEl.clientHeight < scrollEl.scrollHeight - 96) return;
      if (this.listGroupLimit >= this._billGroupTotal) return;
      this.listGroupLimit += 15;
      this.fillBillList(listContainer, data, now);
    };
    scrollEl.addEventListener("scroll", this._billScrollHandler, { passive: true });
  }

  fillBillList(list, data, now) {
    list.empty();
    let recent = [...data.transactions];
    if (this.listCategory !== "all") {
      recent = recent.filter((t) => t.category === this.listCategory);
    }
    if (this.listSearch.trim()) {
      const q = this.listSearch.trim().toLowerCase();
      recent = recent.filter((t) => matchTransactionSearch(t, q));
    }
    if (this.listReimburseOnly) {
      recent = recent.filter((t) => !!t.reimburse);
    }

    const allGroups = groupByDate(recent);
    const totalTxCount = recent.length;
    this._billGroupTotal = allGroups.length;
    const groups = allGroups.slice(0, this.listGroupLimit);
    if (!groups.length) {
      const totalAll = data.transactions?.length || 0;
      const hasFilter = this.listCategory !== "all" || this.listSearch.trim() || this.listReimburseOnly;
      if (totalAll === 0 && !hasFilter) {
        renderLifeOsEmptyState(list, {
          icon: "◎",
          message: "还没有账单，点底部「记一笔」开始第一笔",
          ctaLabel: "记一笔",
          onCta: () => this.plugin.openCaptureModal("smart"),
        });
      } else if (hasFilter) {
        renderLifeOsEmptyState(list, {
          icon: "◎",
          message: "暂无匹配账单",
          ctaLabel: "清除筛选",
          onCta: () => {
            this.listCategory = "all";
            this.listSearch = "";
            this.listReimburseOnly = false;
            persistDashboardUiState(this.plugin, this);
            this.render();
          },
        });
      } else {
        list.createDiv({ cls: "plg-empty", text: "暂无匹配账单" });
      }
      return;
    }
    let shownTxCount = 0;
    groups.forEach(([day, items]) => {
      shownTxCount += items.length;
      const d = parseDateTime(day + " 12:00");
      const dayExp = items
        .filter((t) => t.flow === "expense" && !isCarryoverTx(t))
        .reduce((a, t) => a + t.amount, 0);
      const dayInc = items
        .filter((t) => t.flow === "income" && !isCarryoverTx(t))
        .reduce((a, t) => a + t.amount, 0);
      const collapsed = this.collapsedDays.has(day);
      const gh = list.createDiv({ cls: "plg-tx-group-head" + (collapsed ? " collapsed" : "") });
      gh.createSpan({
        cls: "plg-group-date",
        text: `${todayLabel(d)} ${d.getMonth() + 1}月${d.getDate()}日 ${weekdayLabel(d)}`.trim(),
      });
      const totals = gh.createDiv({ cls: "plg-group-totals" });
      totals.createSpan({ text: `收入 ${fmtMoney(dayInc)}`, cls: "plg-group-inc" });
      totals.createSpan({ text: `支出 ${fmtMoney(dayExp)}`, cls: "plg-group-exp" });
      const carryoverAmt = items
        .filter(isCarryoverTx)
        .reduce((a, t) => a + (Number(t.amount) || 0), 0);
      if (dayExp < 0.005 && carryoverAmt > 0.005) {
        totals.createSpan({
          text: `含月结 ${fmtMoney(carryoverAmt)}`,
          cls: "plg-group-carryover",
        });
      }
      const groupBody = list.createDiv({ cls: "plg-tx-group-body" + (collapsed ? " hidden" : "") });
      gh.onclick = () => {
        const nowCollapsed = !groupBody.hasClass("hidden");
        groupBody.toggleClass("hidden", nowCollapsed);
        gh.toggleClass("collapsed", nowCollapsed);
        if (nowCollapsed) this.collapsedDays.add(day);
        else this.collapsedDays.delete(day);
        persistDashboardUiState(this.plugin, this);
      };
      items.sort((a, b) => b.datetime.localeCompare(a.datetime)).forEach((t) => {
        this.renderTxRow(groupBody, t, data, { stacked: true });
      });
    });

    if (groups.length < allGroups.length) {
      list.createDiv({
        cls: "plg-list-load-hint",
        text: `已显示 ${shownTxCount}/${totalTxCount} 笔 · 上滑加载更多`,
      });
    } else if (totalTxCount > 0) {
      list.createDiv({ cls: "plg-list-load-hint", text: `已显示全部账单 ${totalTxCount} 笔` });
    }
  }

  renderSummaryCompareInline(parent, period, allTx, refDate, flow) {
    const spans = [];
    if (period === "month") {
      const yoy = periodCompareYoYAmount(allTx, period, refDate, flow);
      if (yoy) spans.push({ prefix: "同", pct: yoy.pct });
    }
    if (period === "month" || period === "year" || period === "week") {
      const chain = periodSummaryChainCompare(allTx, period, refDate, flow);
      if (chain) spans.push({ prefix: "环", pct: chain.pct });
    }
    if (!spans.length) return;
    const sub = parent.createDiv({ cls: "plg-summary-foot-sub" });
    spans.forEach((s, i) => {
      if (i > 0) sub.createSpan({ cls: "plg-summary-cmp-sep", text: " · " });
      const cls = compareTagClass(flow, s.pct);
      const sign = s.pct > 0 ? "+" : "";
      sub.createSpan({ cls: `plg-summary-cmp-tag ${cls}`, text: `${s.prefix}${sign}${s.pct.toFixed(1)}%` });
    });
  }

  renderSummaryTotalLine(parent, label, count, amount, flow, period, allTx, refDate) {
    const row = parent.createDiv({ cls: "plg-summary-total-line" });
    const main = row.createDiv({ cls: "plg-summary-total-main" });
    main.createSpan({ cls: "lbl", text: label });
    main.createSpan({ cls: "cnt", text: `${count}笔` });
    main.createSpan({ cls: `amt ${flow}`, text: fmtSummaryCellMoney(amount) });
    const cmp = row.createDiv({ cls: "plg-summary-total-cmp" });
    this.renderSummaryCompareInline(cmp, period, allTx, refDate, flow);
  }

  renderSummaryBalanceLine(parent, balance, period) {
    const row = parent.createDiv({ cls: "plg-summary-total-line is-balance-summary" });
    const main = row.createDiv({ cls: "plg-summary-total-main" });
    main.createSpan({ cls: "lbl", text: "总结余" });
    const balCls = balance < 0 ? "over" : balance > 0 ? "inc" : "";
    main.createSpan({ cls: `amt ${balCls}`, text: fmtSummaryCellMoney(balance, true) });
  }

  renderSummaryTotalFoot(tfoot, data) {
    const period = this.period;
    const refDate = this.refDate;
    const listAll = filterTransactions(data.transactions, period, refDate);
    const total = periodSummaryForRange(listAll);
    const incCount = periodFlowCount(data.transactions, period, refDate, "income");
    const expCount = periodFlowCount(data.transactions, period, refDate, "expense");

    const block = tfoot.createDiv({ cls: "plg-summary-total-infoot" });
    this.renderSummaryTotalLine(block, "收入", incCount, total.income, "income", period, data.transactions, refDate);
    this.renderSummaryTotalLine(block, "支出", expCount, total.expense, "expense", period, data.transactions, refDate);
    if (period === "all") {
      this.renderSummaryBalanceLine(block, total.balance, period);
    }
  }

  renderPeriodSummaryTable(parent, data) {
    const { rows } = buildStatsSummaryRows(data.transactions, this.period, this.refDate);
    const avg = buildStatsPeriodAverage(data.transactions, this.period, this.refDate);

    const table = parent.createDiv({ cls: "plg-summary-table" });
    const thead = table.createDiv({ cls: "plg-summary-table-head" });
    ["日期", "收入", "支出", "结余"].forEach((h) => thead.createSpan({ text: h }));

    const scrollable = (this.period === "year" || this.period === "month") && rows.length > PLG_SUMMARY_SCROLL_ROWS;
    const tbody = table.createDiv({
      cls: "plg-summary-table-body" + (scrollable ? " is-scrollable" : ""),
    });

    if (!rows.length) {
      tbody.createDiv({ cls: "plg-summary-table-empty", text: "暂无明细" });
    }

    rows.forEach((row) => {
      const tr = tbody.createDiv({
        cls: "plg-summary-table-row"
          + (row.meta === "year" || row.meta === "month" || row.meta === "day" ? " is-link" : ""),
      });
      const dateCell = tr.createSpan({ cls: "plg-summary-date" });
      dateCell.createSpan({ text: row.label });
      if (row.meta === "year" || row.meta === "month" || row.meta === "day") {
        dateCell.createSpan({ cls: "plg-drill-hint", text: "›" });
      }
      tr.createSpan({ cls: "plg-summary-inc", text: fmtSummaryCellMoney(row.income) });
      tr.createSpan({ cls: "plg-summary-exp", text: fmtSummaryCellMoney(row.expense) });
      const balCls = row.balance < 0 ? "over" : row.balance > 0 ? "inc" : "";
      tr.createSpan({
        cls: `plg-summary-bal ${balCls}`,
        text: fmtSummaryCellMoney(row.balance, true),
      });
      if (row.meta === "year") {
        tr.onclick = () => {
          this.period = "year";
          this.refDate = new Date(row.year, 0, 1);
          persistDashboardUiState(this.plugin, this);
          this.render();
        };
      } else if (row.meta === "month") {
        tr.onclick = () => {
          this.period = "month";
          this.refDate = new Date(row.year, row.month - 1, 1);
          persistDashboardUiState(this.plugin, this);
          this.render();
        };
      } else if (row.meta === "day" && (this.period === "month" || this.period === "week")) {
        tr.onclick = () => {
          this.tab = "home";
          this.homeSubview = "calendar";
          this.calendarMonth = new Date(row.year, row.month - 1, 1);
          this.selectedDay = row.day;
          persistDashboardUiState(this.plugin, this);
          this.render();
        };
      }
    });

    const tfoot = table.createDiv({ cls: "plg-summary-table-foot" });
    if (avg) {
      const avgTr = tfoot.createDiv({ cls: "plg-summary-table-row is-aggregate" });
      avgTr.createSpan({ cls: "plg-summary-date", text: avg.label });
      avgTr.createSpan({ cls: "plg-summary-inc", text: fmtSummaryCellMoney(avg.income) });
      avgTr.createSpan({ cls: "plg-summary-exp", text: fmtSummaryCellMoney(avg.expense) });
      const avgBalCls = avg.balance < 0 ? "over" : avg.balance > 0 ? "inc" : "";
      avgTr.createSpan({
        cls: `plg-summary-bal ${avgBalCls}`,
        text: fmtSummaryCellMoney(avg.balance, true),
      });
    }

    this.renderSummaryTotalFoot(tfoot, data);
  }

  renderStats(parent, opts = {}) {
    const data = this.plugin.store.data;
    if (opts.patch) {
      const page = parent.querySelector('[data-plg-block="stats-page"]');
      if (page) {
        const summaryHost = page.querySelector('[data-plg-block="stats-summary"]');
        if (summaryHost) {
          summaryHost.empty();
          this.renderPeriodSummaryTable(summaryHost, data);
        }
        const scrollHost = page.querySelector(".plg-page-scroll");
        if (scrollHost) {
          scrollHost.empty();
          this.renderStatsAnalysis(scrollHost, data);
        }
        return;
      }
    }

    parent.querySelector('[data-plg-block="stats-page"]')?.remove();
    const pageHost = parent.createDiv({ attr: { "data-plg-block": "stats-page" } });
    pageHost.addClass("plg-page-split");
    const fixedCls = "plg-page-fixed plg-has-glass-child";
    const fixed = pageHost.createDiv({ cls: fixedCls });
    const scroll = pageHost.createDiv({ cls: "plg-page-scroll" });
    const immersive = fixed.createDiv({ cls: "plg-stats-immersive plg-glass-panel" });
    this.renderPageToolbar(immersive, { embedded: true, scopeTip: STATS_SCOPE_TIP });
    const summaryHost = immersive.createDiv({ attr: { "data-plg-block": "stats-summary" } });
    this.renderPeriodSummaryTable(summaryHost, data);
    this.renderStatsAnalysis(scroll, data);
  }

  renderStatsAnalysis(scroll, data) {
    const listAll = filterTransactions(data.transactions, this.period, this.refDate);
    const list = excludeCarryover(listAll);
    const analysisCard = scroll.createDiv({ cls: "plg-card plg-analysis-card" });
    analysisCard.createDiv({ cls: "plg-card-title", text: "消费洞察" });
    const lines = buildPeriodAnalysis(list, this.period, this.refDate, data.categories, data.transactions, {
      monthlyBudget: this.plugin.settings.monthlyBudget,
    });
    if (!lines.length) {
      analysisCard.createDiv({ cls: "plg-empty", text: "暂无足够数据生成分析" });
    } else {
      lines.forEach((line) => {
        const row = analysisCard.createDiv({ cls: "plg-analysis-line" });
        renderPlgNavIcon(row.createSpan({ cls: "plg-analysis-icon" }), "insight", { settings: this.plugin.settings });
        row.createSpan({ cls: "plg-analysis-text", text: line });
      });
    }
  }

  renderReportTopicBar(parent) {
    const bar = parent.createDiv({ cls: "plg-report-topic-bar plg-glass-surface" });
    const inputRow = bar.createDiv({ cls: "plg-report-topic-input-row" });
    const input = inputRow.createEl("input", {
      type: "search",
      cls: "plg-report-topic-input",
      attr: { placeholder: "保险、餐饮、聚餐…" },
    });
    input.value = this.reportTopic || "";
    input.oninput = () => {
      window.clearTimeout(this._reportTopicTimer);
      this._reportTopicTimer = window.setTimeout(() => {
        this.reportTopic = input.value.trim();
        this._reportPresetId = null;
        this.expandedReportCats.clear();
        persistDashboardUiState(this.plugin, this);
        this.render();
      }, 350);
    };

    const selectRow = inputRow.createDiv({ cls: "plg-report-topic-select-row" });
    const flowSelect = selectRow.createEl("select", {
      cls: "plg-report-filter-select plg-report-flow-select",
      attr: { "aria-label": "收入或支出" },
    });
    [
      { id: "expense", label: "支出" },
      { id: "income", label: "收入" },
    ].forEach(({ id, label }) => {
      const opt = flowSelect.createEl("option", { text: label, value: id });
      if (this.reportFlow === id) opt.selected = true;
    });
    flowSelect.onchange = () => {
      const next = flowSelect.value;
      if (this.reportFlow === next) return;
      this.reportFlow = next;
      this.expandedReportCats.clear();
      persistDashboardUiState(this.plugin, this);
      this.render();
    };

    const groupSelect = selectRow.createEl("select", {
      cls: "plg-report-filter-select plg-report-group-select",
      attr: { "aria-label": "分类层级" },
    });
    [
      { id: "category", label: "一级" },
      { id: "subcategory", label: "二级" },
    ].forEach(({ id, label }) => {
      const opt = groupSelect.createEl("option", { text: label, value: id });
      if (this.reportGroupMode === id) opt.selected = true;
    });
    groupSelect.onchange = () => {
      const next = groupSelect.value;
      if (this.reportGroupMode === next) return;
      this.reportGroupMode = next;
      this.expandedReportCats.clear();
      persistDashboardUiState(this.plugin, this);
      this.render();
    };

    const chipRow = bar.createDiv({ cls: "plg-report-topic-chips" });
    const presetHost = chipRow.createDiv({ cls: "plg-report-topic-chips-presets" });
    REPORT_TOPIC_PRESETS.forEach((preset) => {
      const chip = presetHost.createEl("button", {
        text: preset.label,
        cls: "plg-report-topic-chip" + (this._reportPresetId === preset.id ? " active" : ""),
        attr: { type: "button" },
      });
      chip.onclick = () => {
        this._reportPresetId = this._reportPresetId === preset.id ? null : preset.id;
        this.reportTopic = "";
        input.value = "";
        this.expandedReportCats.clear();
        persistDashboardUiState(this.plugin, this);
        this.render();
      };
    });
  }

  renderReportPeriodMiniCards(parent, data) {
    const listAll = filterTransactions(data.transactions, this.period, this.refDate);
    const list = excludeCarryover(listAll);
    const inc = sumFlow(list, "income");
    const exp = sumFlow(list, "expense");
    const bal = inc - exp;
    const cards = parent.createDiv({ cls: "plg-summary-cards plg-report-period-mini" });
    [
      { title: "收入", val: fmtMoney(inc), iconKey: "income", valCls: "plg-mini-inc" },
      { title: "支出", val: fmtMoney(exp), iconKey: "expense", valCls: "plg-mini-exp" },
      { title: "结余", val: fmtMoney(bal), iconKey: "balance", valCls: bal >= 0 ? "plg-mini-inc" : "plg-mini-exp" },
    ].forEach((c) => {
      const mini = cards.createDiv({ cls: "plg-mini-card" });
      renderPlgNavIcon(mini.createDiv({ cls: "plg-mini-icon" }), c.iconKey, { settings: this.plugin.settings });
      mini.createDiv({ cls: "plg-mini-title", text: c.title });
      mini.createDiv({ cls: c.valCls, text: c.val });
    });
  }

  renderReports(parent, opts = {}) {
    const data = this.plugin.store.data;
    if (opts.patch) {
      const page = parent.querySelector('[data-plg-block="reports-page"]');
      if (page) {
        const head = page.querySelector(".plg-report-head-unified");
        if (head) {
          head.querySelector(".plg-report-period-mini")?.remove();
          this.renderReportPeriodMiniCards(head, data);
        }
        page.querySelector('[data-plg-block="reports-charts"]')?.empty();
        const chartsHost = page.querySelector('[data-plg-block="reports-charts"]');
        const scrollHost = page.querySelector(".plg-page-scroll");
        if (chartsHost) this.renderReportsCharts(chartsHost, data);
        if (scrollHost) {
          scrollHost.empty();
          this.renderReportsList(scrollHost, data);
        }
        return;
      }
    }

    parent.querySelector('[data-plg-block="reports-page"]')?.remove();
    const pageHost = parent.createDiv({ attr: { "data-plg-block": "reports-page" } });
    pageHost.addClass("plg-page-split");
    const fixed = pageHost.createDiv({ cls: "plg-page-fixed plg-has-glass-child" });
    const scroll = pageHost.createDiv({ cls: "plg-page-scroll" });

    const immersive = fixed.createDiv({ cls: "plg-report-immersive plg-glass-panel" });
    const head = immersive.createDiv({ cls: "plg-report-head-unified" });
    this.renderPageToolbar(head, { scopeTip: REPORT_SCOPE_TIP, embedded: true });
    this.renderReportPeriodMiniCards(head, data);
    this.renderReportTopicBar(head);
    const chartsHost = immersive.createDiv({ attr: { "data-plg-block": "reports-charts" } });
    this.renderReportsCharts(chartsHost, data);
    this.renderReportsList(scroll, data);
  }

  renderReportsCharts(immersive, data) {
    const periodAll = filterTransactions(data.transactions, this.period, this.refDate);
    const periodList = excludeCarryover(periodAll);
    const topicActive = Boolean(this.reportTopic || this._reportPresetId);
    const list = filterByReportTopic(
      periodList,
      data.categories,
      this.reportTopic,
      this._reportPresetId,
    );
    const stats = reportStatsForGroup(list, data.categories, this.reportFlow, this.reportGroupMode);
    const flowList = list.filter((t) => t.flow === this.reportFlow);
    const total = sumFlow(flowList, this.reportFlow);

    const donutCard = immersive.createDiv({ cls: "plg-card plg-report-donut-card" });
    const donutWrap = donutCard.createDiv({ cls: "plg-donut-wrap" });
    const donutTip = donutWrap.createDiv({ cls: "plg-donut-tooltip is-empty", text: "悬停查看占比" });
    let acc = 0;
    const sliceStats = buildDonutSliceStats(stats, 8);
    const stops = sliceStats.map((s) => {
      const start = acc;
      acc += s.pct;
      return `${s.meta.color} ${start}% ${acc}%`;
    }).join(", ");
    const donut = donutWrap.createDiv({ cls: "plg-donut" });
    if (stops) applyCssProps(donut, { "--plg-donut-bg": `conic-gradient(${stops})` });
    donut.createDiv({ cls: "plg-donut-hole" });
    const center = donut.createDiv({ cls: "plg-donut-center" });
    center.createDiv({ text: "合计" });
    center.createDiv({ text: fmtMoney(total), cls: "big" });
    if (topicActive && flowList.length) {
      const periodTotal = sumFlow(
        periodList.filter((t) => t.flow === this.reportFlow),
        this.reportFlow,
      ) || 1;
      center.createDiv({
        cls: "plg-donut-sub",
        text: `${((total / periodTotal) * 100).toFixed(1)}%`,
      });
    }
    bindDonutHover(donut, sliceStats.map((s) => ({
      name: s.name,
      pct: s.pct,
      amount: s.amount,
    })), donutTip);

    if (topicActive && flowList.length) {
      const trendCard = immersive.createDiv({ cls: "plg-card plg-report-trend-card" });
      const trendTitle = this.period === "month" ? "本月趋势" : "按月趋势";
      trendCard.createDiv({ cls: "plg-card-title", text: trendTitle });
      const trendHost = trendCard.createDiv({ cls: "plg-report-trend-host" });
      const trendPoints = reportFilterTrendPoints(flowList, this.period, this.refDate);
      renderInteractiveBarChart(trendHost, trendPoints, { compact: true, mini: true });
    }
  }

  renderReportsList(scroll, data) {
    const periodAll = filterTransactions(data.transactions, this.period, this.refDate);
    const periodList = excludeCarryover(periodAll);
    const topicActive = Boolean(this.reportTopic || this._reportPresetId);
    const list = filterByReportTopic(
      periodList,
      data.categories,
      this.reportTopic,
      this._reportPresetId,
    );
    const stats = reportStatsForGroup(list, data.categories, this.reportFlow, this.reportGroupMode);
    const flowList = list.filter((t) => t.flow === this.reportFlow);
    const total = sumFlow(flowList, this.reportFlow);
    const topicLabel = this.reportTopic
      || REPORT_TOPIC_PRESETS.find((p) => p.id === this._reportPresetId)?.label
      || "";

    const listCard = scroll.createDiv({ cls: "plg-card plg-report-list-card" });
    stats.forEach((s) => {
      const rowKey = s.key || s.name;
      const expanded = this.expandedReportCats.has(rowKey);
      const block = listCard.createDiv({ cls: "plg-report-cat-block" + (expanded ? " open" : "") });
      const row = block.createDiv({ cls: "plg-cat-row" });
      renderCategoryIcon(row, s.meta, { panelIcon: true });
      const info = row.createDiv({ cls: "plg-cat-info" });
      const rowLabel = topicActive
        ? s.name
        : `${s.name} (${s.pct.toFixed(1)}%, ${s.count}笔)`;
      info.createDiv({ cls: "plg-cat-name", text: rowLabel });
      const bar = info.createDiv({ cls: "plg-cat-bar" });
      bar.createDiv({ cls: "fill", attr: { style: `width:${s.pct}%;background:${s.meta.color}` } });
      row.createDiv({ cls: "plg-cat-amt", text: fmtMoney(s.amount) });
      row.onclick = () => {
        if (this.expandedReportCats.has(rowKey)) this.expandedReportCats.delete(rowKey);
        else this.expandedReportCats.add(rowKey);
        this.render();
      };
      if (expanded) {
        const detail = block.createDiv({ cls: "plg-cat-detail" });
        list
          .filter((t) => t.flow === this.reportFlow && txMatchesReportGroup(t, s, this.reportGroupMode))
          .sort((a, b) => b.datetime.localeCompare(a.datetime))
          .forEach((t) => this.renderTxRow(detail, t, data, { stacked: true }));
        if (!detail.childElementCount) {
          detail.createDiv({ cls: "plg-empty", text: "该分类暂无明细" });
        }
      }
    });
    if (!stats.length) {
      listCard.createDiv({
        cls: "plg-empty",
        text: topicActive ? "当前筛选条件下暂无数据，试试换关键词或调整时段" : "该时段暂无数据",
      });
    }
    if (topicActive && topicLabel) {
      listCard.createDiv({
        cls: "plg-report-filter-summary",
        text: `${topicLabel} · ${flowList.length}笔 合计${fmtMoney(total)}元`,
      });
    }
  }

  renderCalendar(parent) {
    const { fixed, scroll } = this.beginSplitPage(parent);
    this.renderCalendarInto(fixed, scroll);
  }

  renderCalendarInto(fixed, scroll) {
    const data = this.plugin.store.data;
    const y = this.calendarMonth.getFullYear();
    const m = this.calendarMonth.getMonth() + 1;
    const monthTxAll = filterTransactions(data.transactions, "month", this.calendarMonth);
    const monthTx = excludeCarryover(monthTxAll);
    const dayMap = dailyFlowMap(data.transactions, y, m);
    const maxExp = Math.max(...Object.values(dayMap).map((d) => d.expense), 1);

    const navBar = fixed.createDiv({ cls: "plg-period-nav-bar" });
    const nav = navBar.createDiv({ cls: "plg-month-nav" });
    nav.createEl("button", { text: "‹" }).onclick = () => {
      this.calendarMonth = new Date(y, m - 2, 1);
      this.selectedDay = null;
      this.render();
    };
    nav.createSpan({ cls: "plg-month-label", text: `${y}年 ${m}月` });
    nav.createEl("button", { text: "›" }).onclick = () => {
      this.calendarMonth = new Date(y, m, 1);
      this.selectedDay = null;
      this.render();
    };
    appendScopeTipBtn(navBar, CAL_SCOPE_TIP);

    const weekdays = fixed.createDiv({ cls: "plg-cal-weekdays" });
    ["一", "二", "三", "四", "五", "六", "日"].forEach((w, i) => {
      weekdays.createDiv({ cls: "plg-cal-wd" + (i >= 5 ? " weekend" : ""), text: w });
    });

    const grid = fixed.createDiv({ cls: "plg-cal-grid" });
    let calTooltip = document.querySelector(".plg-cal-tooltip-global");
    if (!calTooltip) {
      calTooltip = document.body.createDiv({ cls: "plg-cal-tooltip plg-cal-tooltip-global hidden" });
    }
    const first = new Date(y, m - 1, 1);
    const startPad = (first.getDay() || 7) - 1;
    const daysInMonth = new Date(y, m, 0).getDate();
    const today = dateKey(new Date());

    const placeTooltip = (e, text) => {
      if (!text || text === "暂无收支") {
        calTooltip.addClass("hidden");
        return;
      }
      calTooltip.setText(text);
      calTooltip.removeClass("hidden");
      let x = e.clientX;
      let y = e.clientY - 12;
      applyCssProps(calTooltip, { "--plg-tip-left": `${x}px`, "--plg-tip-top": `${y}px` });
      window.requestAnimationFrame(() => {
        const rect = calTooltip.getBoundingClientRect();
        if (rect.left < 8) x += 8 - rect.left;
        if (rect.right > window.innerWidth - 8) x -= rect.right - window.innerWidth + 8;
        if (rect.top < 8) y = e.clientY + 18;
        applyCssProps(calTooltip, { "--plg-tip-left": `${x}px`, "--plg-tip-top": `${y}px` });
      });
    };
    const hideTooltip = () => calTooltip.addClass("hidden");

    for (let i = 0; i < startPad; i++) grid.createDiv({ cls: "plg-cal-cell empty" });

    for (let day = 1; day <= daysInMonth; day++) {
      const info = dayMap[day] || { expense: 0, income: 0, count: 0 };
      const cell = grid.createDiv({ cls: "plg-cal-cell" });
      const dk = `${y}-${pad2(m)}-${pad2(day)}`;
      const isFuture = dk > today;
      if (dk === today) cell.addClass("today");
      if (this.selectedDay === day) cell.addClass("selected");
      if (isFuture) cell.addClass("future");
      if (isWeekendDateKey(dk)) cell.addClass("weekend");
      if (getCnHoliday(dk)) cell.addClass("holiday");
      if (info.expense > 0) {
        const intensity = Math.min(1, info.expense / maxExp);
        applyCssProps(cell, { "--heat": String(0.15 + intensity * 0.55) });
        cell.addClass("has-expense");
        cell.createDiv({ cls: "plg-cal-exp-badge", text: formatCalShortAmt(info.expense) });
      }
      if (info.income > 0) cell.addClass("has-income");

      const dayEl = cell.createDiv({ cls: "plg-cal-day" });
      if (dk === today) dayEl.createSpan({ cls: "plg-cal-today-tag", text: "今" });
      dayEl.createSpan({ cls: "plg-cal-solar", text: String(day) });

      const subLabel = getCalCellSubLabel(dk);
      if (subLabel) {
        const isHoliday = !!getCnHoliday(dk);
        cell.createDiv({
          cls: "plg-cal-lunar" + (isHoliday ? " holiday-label" : "") + (isFuture ? " future" : ""),
          text: subLabel,
        });
      }

      const tipText = buildCalDayTooltip(info);
      cell.addEventListener("mouseenter", (e) => placeTooltip(e, tipText));
      cell.addEventListener("mousemove", (e) => placeTooltip(e, tipText));
      cell.addEventListener("mouseleave", hideTooltip);
      cell.addEventListener("click", (e) => {
        if (isTouchLedgerUi() && info.count > 0) {
          placeTooltip(e, tipText);
          window.setTimeout(hideTooltip, 2200);
        }
        hideTooltip();
        this.selectedDay = this.selectedDay === day ? null : day;
        this.render();
      });
    }

    grid.addEventListener("mouseleave", hideTooltip);

    const mExp = sumFlow(monthTx, "expense");
    const mInc = sumFlow(monthTx, "income");
    const mBal = mInc - mExp;
    const summary = fixed.createDiv({ cls: "plg-cal-month-summary" });
    const row1 = summary.createDiv({ cls: "plg-cal-sum-line-row" });
    row1.createSpan({ cls: "plg-cal-sum-line inc", text: `收入 ${fmtMoney(mInc)}` });
    row1.createSpan({ cls: "plg-cal-sum-line exp", text: `支出 ${fmtMoney(mExp)}` });
    if (mBal < 0) {
      const overspend = -mBal;
      const pct = mInc > 0 ? ((overspend / mInc) * 100).toFixed(1) : "—";
      summary.createDiv({
        cls: "plg-cal-sum-line bal over",
        text: `超支 ${fmtMoney(overspend)}${pct !== "—" ? ` · ${pct}%` : ""}`,
      });
    } else {
      summary.createDiv({ cls: "plg-cal-sum-line bal", text: `结余 ${fmtMoney(mBal)}` });
    }

    if (this.selectedDay) {
      const dk = `${y}-${pad2(m)}-${pad2(this.selectedDay)}`;
      const dayItems = monthTxAll.filter((t) => t.datetime.startsWith(dk));
      const dayInfo = dayMap[this.selectedDay] || { expense: 0, income: 0, count: dayItems.length };
      const detail = scroll.createDiv({ cls: "plg-card plg-cal-detail plg-cal-day-sheet" });
      const head = detail.createDiv({ cls: "plg-cal-day-sheet-head" });
      head.createDiv({ cls: "plg-card-title", text: `${m}月${this.selectedDay}日` });
      head.createEl("button", {
        text: "收起",
        cls: "plg-btn-plain plg-cal-collapse-btn",
        attr: { type: "button" },
      }).onclick = () => {
        this.selectedDay = null;
        this.render();
      };
      const summary = detail.createDiv({ cls: "plg-cal-day-summary" });
      buildCalDaySummaryLines(dayInfo).forEach((line) => {
        summary.createDiv({ cls: "plg-cal-day-summary-line", text: line });
      });
      if (!dayItems.length) {
        detail.createDiv({ cls: "plg-empty", text: "当天无账单" });
      } else {
        const list = detail.createDiv({ cls: "plg-tx-list" });
        dayItems.sort((a, b) => b.datetime.localeCompare(a.datetime)).forEach((t) => {
          this.renderTxRow(list, t, data, { stacked: true });
        });
      }
    }
  }

  renderTabBar(parent) {
    const bar = parent.createDiv({ cls: "plg-tabbar plg-tabbar-fab-layout" });
    const plugin = this.plugin;

    const mkTab = (container, t) => {
      const btn = container.createDiv({
        cls: "plg-tab" + (this.tab === t.id ? " active" : ""),
        attr: { "data-tab": t.id },
      });
      renderPlgNavIcon(btn.createDiv({ cls: "plg-tab-icon" }), t.iconKey, { settings: this.plugin.settings });
      btn.createDiv({ cls: "plg-tab-label", text: t.label });
      btn.setAttr("role", "button");
      btn.setAttr("tabindex", "0");
      btn.setAttr("aria-label", t.aria);
      const activate = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (t.id === "settings") {
          plugin.openDashboardSettings();
          return;
        }
        this.tab = t.id;
        if (t.id === "home" && !this.homeSubview) this.homeSubview = "list";
        persistDashboardUiState(plugin, this);
        this.render();
      };
      btn.addEventListener("click", activate);
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") activate(e);
      });
      return btn;
    };

    const left = bar.createDiv({ cls: "plg-tabbar-group" });
    mkTab(left, { id: "home", label: "账本", iconKey: "ledger", aria: "账本" });
    mkTab(left, { id: "stats", label: "统计", iconKey: "stats", aria: "统计" });

    const fabSlot = bar.createDiv({ cls: "plg-tabbar-fab-slot" });
    const fab = fabSlot.createEl("button", {
      cls: "plg-tab-fab",
      attr: { type: "button", "aria-label": "记一笔，打开记账" },
    });
    renderPlgNavIcon(fab.createSpan({ cls: "plg-tab-fab-icon" }), "add", { settings: this.plugin.settings });
    fabSlot.createDiv({ cls: "plg-tab-fab-label", text: "记一笔" });
    fab.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      plugin.openCaptureModal("smart");
    });

    const right = bar.createDiv({ cls: "plg-tabbar-group" });
    mkTab(right, { id: "reports", label: "报表", iconKey: "reports", aria: "报表" });
    mkTab(right, { id: "settings", label: "设置", iconKey: "settings", aria: "PlainLedger 设置" });
  }

  clearHomeSummary(immersive) {
    if (!immersive) return;
    immersive.querySelectorAll(":scope > *:not(.plg-ledger-subnav-immersive)").forEach((el) => el.remove());
  }

  refreshHomeBillList() {
    if (!this.root || this.tab !== "home" || this.homeSubview === "calendar") return false;
    if (this._homeBillRefreshLock) return true;
    this._homeBillRefreshLock = true;
    const data = this.plugin.store.data;
    const listContainer = this.root.querySelector(".plg-tx-list");
    if (!listContainer) {
      this._homeBillRefreshLock = false;
      return false;
    }
    const immersive = this.root.querySelector(".plg-home-immersive");
    if (immersive) {
      this.clearHomeSummary(immersive);
      const now = new Date();
      this.renderHomeSummary(immersive, data, now);
      refreshPlainLedgerHomeCache(this.plugin);
    }
    const now = new Date();
    this.fillBillList(listContainer, data, now);
    const catSel = this.root.querySelector(".plg-list-cat-inline");
    if (catSel) {
      const selected = this.listCategory;
      while (catSel.options.length > 1) catSel.remove(1);
      (data.categories || []).forEach((c) => {
        const o = catSel.createEl("option", { value: c.name, text: c.name });
        if (c.name === selected) o.selected = true;
      });
    }
    this._homeBillRefreshLock = false;
    return true;
  }
}

// ─── Settings ──────────────────────────────────────────────────────────────────

class PlainLedgerSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    void this.renderSettings();
  }

  async renderSettings() {
    if (typeof PLUGIN_EDITION === "string" && PLUGIN_EDITION === "public") {
      const seeded = await this.plugin.store.ensurePublicEditionDefaults();
      if (seeded) this.plugin.refreshView(true);
    }
    const focus = this.plugin._settingsFocus || null;
    this.plugin._settingsFocus = null;
    renderPluginSettings(this.containerEl, this.plugin, () => this.display(), focus);
  }
}

function isPlgWorkspaceSidebarLeaf(app, leaf) {
  try {
    const left = app.workspace.getLeftLeaf(false);
    const right = app.workspace.getRightLeaf(false);
    if (leaf === left || leaf === right) return true;
  } catch (_) { /* ignore */ }
  const el = leaf?.containerEl;
  if (!el) return false;
  return !!el.closest(".mod-sidedock, .workspace-drawer, .workspace-drawer-inner, .mobile-drawer");
}

function scorePlgDashboardLeaf(app, leaf) {
  if (!leaf) return -Infinity;
  let score = 0;
  if (!isPlgWorkspaceSidebarLeaf(app, leaf)) score += 1e6;
  const host = leaf.containerEl?.closest(".workspace-leaf");
  const rect = host?.getBoundingClientRect?.();
  if (rect) score += Math.min(rect.width * rect.height, 5e5);
  return score;
}

function pickPlainLedgerLeaf(app) {
  const leaves = app.workspace.getLeavesOfType(VIEW_TYPE);
  if (!leaves.length) return null;
  let best = leaves[0];
  let bestScore = scorePlgDashboardLeaf(app, best);
  for (let i = 1; i < leaves.length; i++) {
    const s = scorePlgDashboardLeaf(app, leaves[i]);
    if (s > bestScore) {
      best = leaves[i];
      bestScore = s;
    }
  }
  return best;
}

function dedupePlainLedgerLeaves(app, keep) {
  app.workspace.getLeavesOfType(VIEW_TYPE).forEach((leaf) => {
    if (leaf === keep) return;
    try { leaf.detach(); } catch (_) { /* ignore */ }
  });
}

// ─── Plugin ────────────────────────────────────────────────────────────────────

module.exports = class PlainLedgerPlugin extends Plugin {
  async onload() {
    try {
      await this._onloadSafe();
    } catch (err) {
      console.error("[PlainLedger] onload failed:", err);
      try {
        new Notice(`PlainLedger 加载失败：${err && err.message ? err.message : err}`);
      } catch (_) { /* ignore */ }
      throw err;
    }
  }

  async _onloadSafe() {
    // 协议尽早挂上：Obsidian 冷启动时 deep link 可能先于 settings/store 就绪
    this._deepLinkReady = false;
    this._pendingDeepLink = null;
    try {
      this.registerObsidianProtocolHandler("plainledger", async (params) => {
        const action = String(params?.action || params?.a || "capture").toLowerCase();
        if (!this._deepLinkReady) {
          this._pendingDeepLink = action;
          return;
        }
        await this.handlePlainLedgerDeepLink(action);
      });
    } catch (err) {
      console.warn("[PlainLedger] protocol handler:", err);
    }

    await this.loadSettings();
    this.store = new LedgerStore(this);
    try {
      await this.store.load();
    } catch (err) {
      console.error("[PlainLedger] store.load:", err);
      this.store.data = {
        version: 1,
        ledger: "默认账本",
        categories: [],
        transactions: [],
        recurring: [],
        subscriptions: [],
      };
    }
    if (typeof PLUGIN_EDITION === "string" && PLUGIN_EDITION === "public") {
      try {
        await this.store.ensurePublicEditionDefaults();
      } catch (err) {
        console.warn("[PlainLedger] ensurePublicEditionDefaults:", err);
      }
    }

    this._deepLinkReady = true;
    if (this._pendingDeepLink) {
      const pending = this._pendingDeepLink;
      this._pendingDeepLink = null;
      void this.handlePlainLedgerDeepLink(pending);
    }

    this.registerInterval(window.setInterval(async () => {
      try {
        const n = await this.store.processDueRecurring();
        const m = await this.store.processDueSubscriptions();
        if (n > 0 || m > 0) this.refreshView();
      } catch (err) {
        console.warn("[PlainLedger] due jobs:", err);
      }
    }, 3600000));

    this.registerView(VIEW_TYPE, (leaf) => new LedgerDashboardView(leaf, this));

    try {
      if (typeof addIcon === "function") {
        addIcon(ICON_NAME, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><circle cx="17" cy="14" r="1"/></svg>`);
      }
    } catch (_) { /* ignore */ }
    try {
      this.addRibbonIcon(ICON_NAME, "打开 PlainLedger", () => this.openDashboard());
    } catch (err) {
      console.warn("[PlainLedger] ribbon icon:", err);
      try {
        this.addRibbonIcon("wallet", "打开 PlainLedger", () => this.openDashboard());
      } catch (_) {
        try { this.addRibbonIcon("dice", "打开 PlainLedger", () => this.openDashboard()); } catch (__) { /* ignore */ }
      }
    }

    this.addCommand({
      id: "open-dashboard",
      name: "打开 PlainLedger 面板",
      callback: () => this.openDashboard(),
    });
    this.addCommand({
      id: "add-transaction",
      name: "记一笔",
      callback: () => {
        if (!requirePlainLedgerAccess(this)) return;
        this.openCaptureModal();
      },
    });
    this.addCommand({
      id: "open-ios-capture",
      name: "打开 PlainLedger 记一笔（快捷指令）",
      callback: () => {
        if (!requirePlainLedgerAccess(this)) return;
        this.openCaptureModal("smart");
      },
    });
    this.addCommand({
      id: "import-ledger",
      name: "导入账单",
      callback: () => {
        if (!requirePlainLedgerAccess(this)) return;
        new ImportFileModal(this.app, this, () => this.refreshView()).open();
      },
    });

    this.plainLedgerSettingTab = new PlainLedgerSettingTab(this.app, this);
    this.addSettingTab(this.plainLedgerSettingTab);

    this.addCommand({ id: "open-update-notice", name: "打开 PlainLedger 更新日志", callback: () => this.showUpdateNotice(true) });

    this.app.workspace.onLayoutReady(() => {
      checkTrialExpiryReminders(this);
      maybeShowLifeOsSuitePrompt(this.app, this.manifest.id, this.manifest.name);
      const isPersonal = typeof PLUGIN_EDITION === "string" && PLUGIN_EDITION === "personal";
      const txCount = this.store?.data?.transactions?.length || 0;
      if (isPersonal && !this.settings.onboardingComplete && txCount === 0 && !isLicenseRequired()) {
        window.setTimeout(() => {
          openOnboardingOverlay(this.app, this, () => this.refreshView(true));
        }, 400);
      }
    });

    this.registerSyncWatchers();
  }

  async handlePlainLedgerDeepLink(action) {
    const a = String(action || "capture").toLowerCase();
    if (a === "open" || a === "dashboard" || a === "panel") {
      await this.openDashboard();
      return;
    }
    // capture / add / smart / 默认：记一笔
    if (!requirePlainLedgerAccess(this)) return;
    this.openCaptureModal("smart");
  }

  async syncFromExternalSources(manual = false) {
    let changed = false;
    let ledgerChanged = false;
    const prevBudget = this.settings?.monthlyBudget;
    const prevSettingsJson = JSON.stringify(this.settings || {});
    try {
      await this.loadSettings();
      if (JSON.stringify(this.settings) !== prevSettingsJson) changed = true;
      if (this.settings.monthlyBudget !== prevBudget) changed = true;
    } catch (e) {
      console.warn("[PlainLedger] reload settings", e);
    }
    try {
      if (await this.store.reloadIfNewer()) {
        changed = true;
        ledgerChanged = true;
      }
    } catch (e) {
      console.warn("[PlainLedger] sync ledger", e);
    }
    if (ledgerChanged) {
      try {
        if (await this.store.processCarryovers()) changed = true;
      } catch (e) {
        console.warn("[PlainLedger] carryover", e);
      }
    }
    if (this._pendingSyncConflict) {
      const c = this._pendingSyncConflict;
      delete this._pendingSyncConflict;
      if (c.stale) {
        new Notice("检测到库内账本文件版本较旧，已保留你刚保存的数据");
      } else {
        new Notice(`检测到其他设备更新了账本（${c.remoteCount} 笔），已加载库内最新版本`);
      }
    }
    if (changed || manual) {
      this._lastSyncCheckedAt = Date.now();
    }
    if (changed) this.refreshView(true);
    refreshPlainLedgerHomeCache(this);
  }

  registerSyncWatchers() {
    this._syncTimer = null;
    const scheduleSync = () => {
      if (this._syncTimer) window.clearTimeout(this._syncTimer);
      this._syncTimer = window.setTimeout(() => this.syncFromExternalSources(false), 450);
    };

    const ledgerPath = () => this.store.filePath();
    const pluginDataPath = () => normalizePath(`.obsidian/plugins/${this.manifest.id}/data.json`);
    const isSyncPath = (p) => p === ledgerPath() || p === pluginDataPath();

    this.registerEvent(this.app.vault.on("modify", (file) => {
      if (isSyncPath(file?.path)) scheduleSync();
    }));
    this.registerEvent(this.app.vault.on("create", (file) => {
      if (isSyncPath(file?.path)) scheduleSync();
    }));

    this.registerDomEvent(document, "visibilitychange", () => {
      if (document.visibilityState === "visible") {
        scheduleSync();
        void (async () => {
          try {
            await this.store.processDueRecurring();
            await this.store.processDueSubscriptions();
          } catch (e) {
            console.warn("[PlainLedger] visibility due", e);
          }
        })();
      }
    });
    this.registerDomEvent(window, "focus", scheduleSync);

    this.registerInterval(window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      if (!this.app.workspace.getLeavesOfType(VIEW_TYPE).length) return;
      scheduleSync();
    }, 30000));
  }

  async onunload() {
    try {
      await this.store?.flushPendingSave?.();
    } catch {
      /* ignore */
    }
    // 与纪念日一致：禁用时勿同步 detach leaf（手机端易卡/报无法禁用）
    try {
      document.getElementById(LIFEOS_UI_STYLE_ID)?.remove();
      document.getElementById("lifeos-ui-shared-styles-v8")?.remove();
    } catch {
      /* ignore */
    }
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.settings.uiState = Object.assign({}, DEFAULT_SETTINGS.uiState, this.settings.uiState || {});
    this.settings.navIcons = normalizeNavIcons(this.settings.navIcons);
    if (typeof syncLicenseState === "function") syncLicenseState(this.app, this.settings);
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  refreshView(forceFull = false) {
    this.app.workspace.getLeavesOfType(VIEW_TYPE).forEach((leaf) => {
      const v = leaf.view;
      if (!(v instanceof LedgerDashboardView)) return;
      if (!forceFull && v.tab === "home" && v.refreshHomeBillList()) return;
      v.render();
    });
  }

  openCaptureModal(mode = "smart", initialPreview = null) {
    if (!requirePlainLedgerAccess(this)) return;
    openCapturePanel(this, { mode, initialPreview });
  }

  openDashboardSettings(focusOpts) {
    if (focusOpts) {
      this._settingsFocus = focusOpts;
      this.pendingSettingsTab = resolvePlgSettingsTabFromFocus(focusOpts);
    }
    this.app.setting.open();
    this.app.setting.openTabById(this.manifest.id);
  }

  maybeShowUpdateNotice() {
    showUpdateNoticeModal(this.app, this);
  }

  showUpdateNotice(force = false) {
    showUpdateNoticeModal(this.app, this, { force });
  }

  showUpdateNoticeForce() {
    this.showUpdateNotice(true);
  }

  async onLicenseActivated() {
    const isPublic = typeof PLUGIN_EDITION === "string" && (PLUGIN_EDITION === "public" || PLUGIN_EDITION === "trial24h");
    if (isPublic) {
      await this.store.ensurePublicEditionDefaults();
      this.settings.onboardingComplete = true;
      this.settings.onboardingChoice = "sample";
      this.settings.initialized = true;
      this.settings.uiState = this.settings.uiState || {};
      this.settings.uiState.settingsSections = this.settings.uiState.settingsSections || {};
      this.settings.uiState.settingsSections.categories = true;
      this._settingsFocus = { section: "categories" };
      this.pendingSettingsTab = "categories";
      await this.saveSettings();
      const cats = this.store.data.categories?.length || 0;
      const subs = (this.store.data.categories || []).reduce((n, c) => n + (c.subcategories?.length || 0), 0);
      new Notice(`已加载 ${cats} 类 · ${subs} 二级分类，请在设置 → 分类 查看`);
    } else {
      const txCount = this.store?.data?.transactions?.length || 0;
      if (txCount === 0) {
        await this.store.importBundledDefault(true);
        this.settings.onboardingComplete = true;
        this.settings.onboardingChoice = "sample";
        this.settings.initialized = true;
        await this.saveSettings();
      }
    }
    this.refreshView(true);
  }

  openPluginSettings(focusOpts = null) {
    this.openDashboardSettings(focusOpts);
  }

  async openDashboard(opts = {}) {
    const { workspace } = this.app;
    const mobile = Platform.isMobile;

    let leaf = pickPlainLedgerLeaf(this.app);
    if (leaf) dedupePlainLedgerLeaves(this.app, leaf);

    if (!leaf) {
      if (mobile) {
        leaf = workspace.getLeaf("tab");
      } else {
        const right = workspace.getRightLeaf(false);
        leaf = right || workspace.getLeaf(true);
      }
      await leaf.setViewState({ type: VIEW_TYPE, active: true });
    } else if (mobile && isPlgWorkspaceSidebarLeaf(this.app, leaf)) {
      const main = workspace.getLeavesOfType(VIEW_TYPE)
        .find((l) => l !== leaf && !isPlgWorkspaceSidebarLeaf(this.app, l));
      if (main) {
        try { leaf.detach(); } catch (_) { /* ignore */ }
        leaf = main;
      }
    }

    await workspace.revealLeaf(leaf);

    if (isTrialEdition() && !this.settings.trialWelcomeSeen && !this.settings.licenseActivated) {
      maybeShowTrialWelcomeModal(this);
    }

    const view = leaf.view;
    if (view instanceof LedgerDashboardView) {
      const preserveTab = opts.landing === "preserve" || opts.preserveTab === true;
      if (!preserveTab && (mobile || opts.landing === "home")) {
        view.tab = "home";
        view.homeSubview = "list";
        await persistDashboardUiState(this, view);
        await view.render();
      }
    }
  }
};
