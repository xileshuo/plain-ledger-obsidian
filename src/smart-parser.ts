// ─── Smart input parser (关键词匹配) ───────────────────────────────────────

/**
 * 常见关联词库：anchor 为概念锚点（如「棋牌」）
 * 匹配顺序：先找同名二级分类 → 再找 anchor 对应的一级/二级 → 最后才兜底
 */
const CATEGORY_ALIAS_GROUPS = {
  棋牌: ["麻将", "扑克", "斗地主", "打牌", "搓麻", "牌局", "德州", "象棋", "围棋", "五子棋"],
  餐饮: ["午饭", "晚饭", "早饭", "外卖", "堂食", "聚餐", "下馆子"],
  交通: ["打车", "滴滴", "地铁", "公交", "高铁", "火车", "机票", "加油"],
};

function findSubcategoryOwner(categories, subName) {
  if (!subName) return null;
  for (const cat of categories || []) {
    if ((cat.subcategories || []).some((s) => subcategoryName(s) === subName)) {
      return { category: cat.name, subcategory: subName, flow: cat.flow || "expense" };
    }
  }
  return null;
}

function resolveAliasTarget(categories, anchorName, alias) {
  const subHit = findSubcategoryOwner(categories, alias);
  if (subHit) return { ...subHit, tier: "sub", kind: "alias-sub" };

  const primary = (categories || []).find((c) => c.name === anchorName);
  if (primary) {
    return {
      category: anchorName,
      subcategory: "",
      flow: primary.flow || "expense",
      tier: "cat",
      kind: "alias-cat",
    };
  }

  const anchorAsSub = findSubcategoryOwner(categories, anchorName);
  if (anchorAsSub) {
    return { ...anchorAsSub, tier: "sub", kind: "alias-sub" };
  }

  return null;
}

function buildKeywordIndex(categories, globalKeywords) {
  const subIndex = [];
  const catIndex = [];

  (categories || []).forEach((cat) => {
    const flow = cat.flow || "expense";
    (cat.subcategories || []).forEach((sub) => {
      const meta = normalizeSubcategory(sub);
      const name = meta.name;
      if (!name) return;
      subIndex.push({
        keyword: name,
        category: cat.name,
        subcategory: name,
        flow,
        len: name.length,
        kind: "subcategory",
      });
      (meta.keywords || []).forEach((kw) => {
        if (!kw) return;
        parseKeywordInput(kw).forEach((token) => {
          if (!token) return;
          subIndex.push({
            keyword: token,
            category: cat.name,
            subcategory: name,
            flow,
            len: token.length,
            kind: "sub-keyword",
          });
        });
      });
    });
    if (cat.name) {
      catIndex.push({
        keyword: cat.name,
        category: cat.name,
        subcategory: "",
        flow,
        len: cat.name.length,
        kind: "category",
      });
    }
    (cat.keywords || []).forEach((kw) => {
      if (!kw) return;
      parseKeywordInput(kw).forEach((token) => {
        if (!token) return;
        catIndex.push({
          keyword: token,
          category: cat.name,
          subcategory: "",
          flow,
          len: token.length,
          kind: "cat-keyword",
        });
      });
    });
  });

  Object.entries(CATEGORY_ALIAS_GROUPS).forEach(([anchorName, aliases]) => {
    aliases.forEach((alias) => {
      const target = resolveAliasTarget(categories, anchorName, alias);
      if (!target) return;
      const entry = {
        keyword: alias,
        category: target.category,
        subcategory: target.subcategory || "",
        flow: target.flow,
        len: alias.length,
        kind: target.kind,
      };
      if (target.tier === "sub") subIndex.push(entry);
      else catIndex.push(entry);
    });
  });

  Object.entries(globalKeywords || {}).forEach(([kw, v]) => {
    if (!kw) return;
    const entry = {
      keyword: kw,
      category: v.category || "",
      subcategory: v.subcategory || "",
      flow: v.flow || "expense",
      len: kw.length,
      kind: "global",
    };
    if (entry.subcategory) subIndex.push(entry);
    else catIndex.push(entry);
  });

  const sorter = (a, b) => b.len - a.len || (a.kind === "subcategory" ? -1 : 0);
  return {
    subIndex: subIndex.sort(sorter),
    catIndex: catIndex.sort(sorter),
  };
}

function amountPattern(amount) {
  const n = Number(amount);
  if (!n) return "";
  if (Number.isInteger(n)) return `${n}(?:\\.0+)?`;
  return String(n).replace(".", "\\.");
}

function stripAmountFromText(raw, amount) {
  let t = String(raw || "");
  const ap = amountPattern(amount);
  if (ap) {
    t = t.replace(new RegExp(`(?:¥|￥)\\s*${ap}`, "g"), " ");
    t = t.replace(new RegExp(`${ap}\\s*[元块]?`, "g"), " ");
    t = t.replace(new RegExp(`${ap}$`), " ");
    t = t.replace(new RegExp(`^${ap}`), " ");
  }
  t = t.replace(/(?:¥|￥)\s*\d+(?:\.\d{1,2})?/g, " ");
  t = t.replace(/\d+(?:\.\d{1,2})?\s*[元块]/g, " ");
  t = t.replace(/[零〇一二两三四五六七八九十百千万]{1,8}\s*[元块]/g, " ");
  t = t.replace(/([零〇一二两三四五六七八九十百千万]{1,4})\s*$/g, " ");
  t = t.replace(/20\d{2}[-\/.年]\d{1,2}[-\/.月]\d{1,2}日?/g, " ");
  t = t.replace(/昨天|前天|今天|刚才/g, " ");
  t = t.replace(/\d{1,2}月\d{1,2}日?/g, " ");
  t = t.replace(/(?:^|\s)\d{1,2}[.\-/]\d{1,2}日?(?=\s|[^\d]|$)/g, " ");
  t = t.replace(/花了|花费|支出|收入|买了|付了|消费|转账/g, " ");
  return t.replace(/\s+/g, " ").trim();
}

function hasMeaningfulHint(text) {
  const t = String(text || "").replace(/\s+/g, "").trim();
  return t.length >= 2;
}

function textHitsKeyword(text, keyword) {
  if (!text || !keyword) return false;
  if (text === keyword) return true;
  if (text.includes(keyword) || keyword.includes(text)) {
    return Math.min(text.length, keyword.length) >= 2;
  }
  return false;
}

function matchFromIndex(text, index) {
  if (!text) return null;
  for (const item of index) {
    if (item.keyword === text) return item;
  }
  for (const item of index) {
    if (!item.keyword) continue;
    if (textHitsKeyword(text, item.keyword)) return item;
  }
  return null;
}

function matchTiered(textForMatch, raw, subIndex, catIndex) {
  return matchFromIndex(textForMatch, subIndex)
    || matchFromIndex(raw, subIndex)
    || matchFromIndex(textForMatch, catIndex)
    || matchFromIndex(raw, catIndex);
}

function scoreMatch(item, textForMatch, raw) {
  const inHint = textForMatch && textHitsKeyword(textForMatch, item.keyword);
  const inRaw = textHitsKeyword(raw, item.keyword);
  const isSub = !!(item.subcategory || item.kind === "subcategory" || item.kind === "alias-sub");

  if (isSub && (inHint || inRaw)) {
    const label = item.kind === "alias-sub" ? "关联词·二级" : "二级分类";
    return { confidence: inHint ? 0.94 : 0.88, matchReason: "subcategory", matchLabel: label };
  }
  if (item.kind === "keyword" || item.kind === "global" || item.kind === "sub-keyword") {
    const label = item.kind === "sub-keyword" ? "二级关键词" : "关键词";
    return { confidence: inHint ? 0.88 : 0.82, matchReason: "keyword", matchLabel: label };
  }
  if (item.kind === "alias-cat") {
    return { confidence: inHint ? 0.84 : 0.78, matchReason: "category", matchLabel: "关联词·一级" };
  }
  return { confidence: inHint ? 0.8 : 0.74, matchReason: "category", matchLabel: "一级分类" };
}

function parseChineseAmount(str) {
  const map = { 零: 0, 〇: 0, 一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
  const unit = { 十: 10, 百: 100, 千: 1000, 万: 10000 };
  let total = 0;
  let section = 0;
  let number = 0;
  for (const ch of String(str || "")) {
    if (ch in map) number = map[ch];
    else if (ch in unit) {
      const u = unit[ch];
      if (u === 10000) {
        section = (section + number) * u;
        total += section;
        section = 0;
        number = 0;
      } else {
        section += (number || 1) * u;
        number = 0;
      }
    }
  }
  return total + section + number;
}

function extractAmount(text) {
  const raw = String(text || "").replace(/,/g, "");
  const candidates = [];

  const push = (v, score) => {
    const n = parseFloat(v);
    if (!n || n <= 0 || n > 99999999) return;
    candidates.push({ v: n, score });
  };

  const tailCnAmt = raw.match(/([\u4e00-\u9fff]{1,12})(\d+(?:\.\d{1,2})?)\s*$/);
  if (tailCnAmt) push(tailCnAmt[2], 98);

  for (const m of raw.matchAll(/([零〇一二两三四五六七八九十百千万]{1,8})\s*[元块]/g)) {
    const v = parseChineseAmount(m[1]);
    if (v > 0) push(String(v), 96);
  }

  const tailCnHan = raw.match(/([\u4e00-\u9fff]{1,12})([零〇一二两三四五六七八九十百千万]{1,6})\s*$/);
  if (tailCnHan) {
    const v = parseChineseAmount(tailCnHan[2]);
    if (v > 0) push(String(v), 97);
  }

  const tailHanOnly = raw.match(/([零〇一二两三四五六七八九十百千万]{1,4})\s*$/);
  if (tailHanOnly) {
    const v = parseChineseAmount(tailHanOnly[1]);
    if (v > 0 && v <= 99999) push(String(v), 94);
  }

  for (const m of raw.matchAll(/(?:¥|￥)\s*(\d+(?:\.\d{1,2})?)/g)) {
    push(m[1], 100);
  }
  for (const m of raw.matchAll(/(\d+(?:\.\d{1,2})?)\s*[元块]/g)) {
    push(m[1], 95);
  }
  for (const m of raw.matchAll(
    /(?:午餐|早餐|晚餐|早饭|午饭|晚饭|买菜|工资|花了|付了|消费|支出|收入|买了|共计|合计|一共|转账|过路费|停车费)\s*[：:]?\s*(\d+(?:\.\d{1,2})?)/g
  )) {
    push(m[1], 92);
  }

  for (const m of raw.matchAll(/(\d+(?:\.\d{1,2})?)/g)) {
    const token = m[1];
    const v = parseFloat(token);
    if (!v || v <= 0) continue;
    if (looksLikeMdDate(token, raw, m.index ?? 0)) continue;

    let score = 55;
    const idx = m.index ?? 0;
    const tail = raw.slice(idx, idx + 12);
    const before = raw.slice(Math.max(0, idx - 1), idx);
    const after = raw.slice(idx + token.length, idx + token.length + 1);

    if (/^\d+(?:\.\d+)?\s*[个个条款份杯只双]/.test(tail) && v <= 20) score = 15;
    if (/[\u4e00-\u9fff]/.test(before) && !token.includes(".")) score += 22;
    if (idx + token.length >= raw.trim().length - 1 && !token.includes(".")) score += 18;
    if (token.includes(".")) score += 8;
    if (v >= 50) score += 8;
    if (v >= 500) score += 5;
    if (/[\u4e00-\u9fff]/.test(after) && token.includes(".")) score -= 30;
    push(token, score);
  }

  if (!candidates.length) return 0;
  candidates.sort((a, b) => b.score - a.score || b.v - a.v);
  return candidates[0].v;
}

function looksLikeMdDate(token, raw, index) {
  if (!/^\d{1,2}\.\d{1,2}$/.test(token)) return false;
  const [m, d] = token.split(".").map(Number);
  if (m < 1 || m > 12 || d < 1 || d > 31) return false;
  if (index <= 2) return true;
  const after = raw.slice(index + token.length, index + token.length + 1);
  return /[\u4e00-\u9fff]/.test(after);
}

function stripDateTokens(text) {
  return String(text || "")
    .replace(/(?:^|\s)(\d{1,2})[.\-/](\d{1,2})(?:日)?(?=[\u4e00-\u9fff\s]|$)/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseCalendarDate(year, month, day, refNow) {
  const now = refNow || new Date();
  const y = year != null ? year : now.getFullYear();
  const d = new Date(y, month - 1, day, now.getHours(), now.getMinutes());
  if (year == null) {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (d.getTime() > today.getTime()) d.setFullYear(y - 1);
  }
  return d;
}

function parseRelativeDate(text) {
  const now = new Date();
  const raw = String(text || "");
  if (/前天/.test(raw)) {
    const d = new Date(now);
    d.setDate(d.getDate() - 2);
    return d;
  }
  if (/昨天/.test(raw)) {
    const d = new Date(now);
    d.setDate(d.getDate() - 1);
    return d;
  }
  if (/今天|刚才/.test(raw)) return now;

  let m = raw.match(/(20\d{2})[-\/.年](\d{1,2})[-\/.月](\d{1,2})日?/);
  if (m) {
    return parseCalendarDate(parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10), now);
  }

  m = raw.match(/(\d{1,2})月(\d{1,2})日?/);
  if (m) {
    return parseCalendarDate(null, parseInt(m[1], 10), parseInt(m[2], 10), now);
  }

  m = raw.match(/(?:^|\s)(\d{1,2})[.\-/](\d{1,2})(?:日)?(?=\s|[^\d]|$)/);
  if (m) {
    const month = parseInt(m[1], 10);
    const day = parseInt(m[2], 10);
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      return parseCalendarDate(null, month, day, now);
    }
  }

  return now;
}

function detectReimbursement(text) {
  return /报销|待报销|可报销/.test(String(text || ""));
}

function detectFlow(text, matchedFlow) {
  if (/收入|工资|到账|退款|赞助|二手|结余/.test(text)) return "income";
  if (/支出|花了|消费|付款|买了|付了/.test(text)) return "expense";
  if (detectReimbursement(text)) return "expense";
  return matchedFlow === "income" ? "income" : "expense";
}

function learnFromTextHistory(hint, transactions, categories) {
  if (!hint || hint.length < 2) return null;
  const scores = new Map();
  (transactions || []).slice(0, 500).forEach((t) => {
    const note = (t.note || "").trim();
    const sub = (t.subcategory || "").trim();
    const catName = (t.category || "").trim();
    let weight = 0;
    if (sub && textHitsKeyword(sub, hint)) weight += sub === hint ? 6 : 4;
    if (note && textHitsKeyword(note, hint)) weight += note === hint ? 5 : 3;
    if (catName && textHitsKeyword(catName, hint)) weight += 2;
    if (!weight) return;
    const key = `${catName}|${sub}`;
    scores.set(key, (scores.get(key) || 0) + weight);
  });
  let bestKey = null;
  let bestScore = 0;
  scores.forEach((score, key) => {
    if (score > bestScore) {
      bestScore = score;
      bestKey = key;
    }
  });
  if (!bestKey || bestScore < 3) return null;
  const [category, subcategory] = bestKey.split("|");
  const cat = categories.find((c) => c.name === category);
  if (!cat) return null;
  return {
    category,
    subcategory,
    flow: cat.flow || "expense",
    confidence: Math.min(0.72, 0.48 + bestScore * 0.04),
    matchReason: "history-text",
    matchLabel: "历史记录",
    matchedKw: hint,
  };
}

const LEARN_STOP_PREFIX = /^(购买|买了|消费|花了|付款|支付|支出|收入|搞定|来个|一件|一个|一份|今日|今天|昨天|刚才|刚刚)/;
const LEARN_STOP_SUFFIX = /(了|的|钱|块|元)$/;

function extractLearnableKeywords(text, amount) {
  let raw = String(text || "").trim();
  if (!raw) return [];
  raw = stripAmountFromText(raw, amount) || raw;
  raw = raw.replace(/[¥￥.,+\-]/g, " ").replace(/元|块|毛钱/g, " ").replace(/\s+/g, " ").trim();
  raw = raw.replace(LEARN_STOP_PREFIX, "").replace(LEARN_STOP_SUFFIX, "").trim();

  const out = new Set();
  (raw.match(/[\u4e00-\u9fff]{2,8}/g) || []).forEach((chunk) => {
    let token = chunk.replace(LEARN_STOP_PREFIX, "").replace(LEARN_STOP_SUFFIX, "").trim();
    if (token.length >= 2 && token.length <= 8) out.add(token);
  });
  if (raw.length >= 2 && raw.length <= 8 && /[\u4e00-\u9fff]{2,}/.test(raw)) out.add(raw);
  return [...out].slice(0, 2);
}

/** 记账后把商户/商品词写入分类关键词，供下次智能识别 */
function learnKeywordsFromTransaction(data, tx, rawHint) {
  if (!data || !tx?.category || tx?.source === "carryover") return false;
  const hint = String(rawHint || tx.note || "").trim();
  if (!hint) return false;

  const tokens = extractLearnableKeywords(hint, tx.amount);
  if (!tokens.length) return false;

  const cat = (data.categories || []).find((c) => c.name === tx.category);
  if (!cat) return false;

  let dirty = false;
  if (tx.subcategory) {
    const subName = String(tx.subcategory).trim();
    normalizeCategorySubs(cat);
    const idx = cat.subcategories.findIndex((s) => subcategoryName(s) === subName);
    if (idx < 0) return false;
    const sub = normalizeSubcategory(cat.subcategories[idx]);
    tokens.forEach((kw) => {
      if (!kw || kw === subName || kw === cat.name) return;
      if (!(sub.keywords || []).includes(kw)) {
        sub.keywords = [...(sub.keywords || []), kw];
        dirty = true;
      }
    });
    if (dirty) {
      sub.keywords.sort((a, b) => a.localeCompare(b, "zh"));
      cat.subcategories[idx] = sub;
    }
  } else {
    if (!cat.keywords) cat.keywords = [];
    tokens.forEach((kw) => {
      if (!kw || kw === cat.name) return;
      if (!cat.keywords.includes(kw)) {
        cat.keywords.push(kw);
        dirty = true;
      }
    });
    if (dirty) cat.keywords.sort((a, b) => a.localeCompare(b, "zh"));
  }
  return dirty;
}

function applyMatchResult(result, hit, textForMatch, raw) {
  if (!hit) return result;
  result.category = hit.category;
  result.subcategory = hit.subcategory || "";
  result.matchedFlow = hit.flow || "expense";
  result.matchedKw = hit.keyword || hit.matchedKw || "";
  if (hit.confidence != null) {
    result.confidence = hit.confidence;
    result.matchReason = hit.matchReason;
    result.matchLabel = hit.matchLabel;
    return result;
  }
  const scored = scoreMatch(hit, textForMatch, raw);
  result.confidence = scored.confidence;
  result.matchReason = scored.matchReason;
  result.matchLabel = scored.matchLabel;
  return result;
}

function parseSmartInput(text, categories, globalKeywords, transactions) {
  const raw = String(text || "").trim();
  if (!raw) return null;

  const refDate = parseRelativeDate(raw);
  const amountRaw = stripDateTokens(raw);
  const amount = extractAmount(amountRaw);
  if (!amount || amount <= 0) return { error: "未识别到金额，例如：午餐22 或 6.28过路费48" };

  const { subIndex, catIndex } = buildKeywordIndex(categories, globalKeywords);
  const textForMatch = stripAmountFromText(amountRaw, amount);

  const result = {
    category: "",
    subcategory: "",
    matchedFlow: "expense",
    matchedKw: "",
    confidence: 0.22,
    matchReason: "fallback",
    matchLabel: "默认分类",
  };

  // 1) 二级（含关联词·二级、二级名）→ 一级（含关联词·一级、关键词、一级名）
  const hit = matchTiered(textForMatch, raw, subIndex, catIndex);
  if (hit) applyMatchResult(result, hit, textForMatch, raw);

  // 2) 仍无结果 → 查历史文字记录（不用同金额）
  if (!result.category && hasMeaningfulHint(textForMatch)) {
    const learnedText = learnFromTextHistory(textForMatch, transactions, categories);
    if (learnedText) applyMatchResult(result, learnedText, textForMatch, raw);
  }

  // 3) 兜底默认分类
  if (!result.category) {
    const fallback = categories.find((c) => c.name === "生活" && c.flow !== "income")
      || categories.find((c) => c.flow !== "income")
      || categories[0];
    result.category = fallback?.name || "";
    result.subcategory = "";
    result.confidence = 0.22;
    result.matchReason = "fallback";
    result.matchLabel = "默认分类";
  }

  const flow = detectFlow(raw, result.matchedFlow);
  const reimburse = detectReimbursement(raw);
  let note = textForMatch;
  if (result.matchedKw) note = note.replace(result.matchedKw, "");
  note = note.replace(/花了|花费|支出|收入|买了|付了/g, "").replace(/\s+/g, " ").trim();
  if (!note) note = raw.replace(result.matchedKw || "", "").replace(/\d+(?:\.\d+)?/g, "").trim();
  if (!note && result.matchReason === "fallback") note = textForMatch || "";

  const now = new Date();
  const explicitDate = /(?:^|\s)(\d{1,2})[.\-/](\d{1,2})|月|年|昨天|前天/.test(raw);
  const useNoon = explicitDate && dateKey(refDate) !== dateKey(now);
  const timePart = useNoon
    ? "12:00"
    : `${pad2(refDate.getHours())}:${pad2(refDate.getMinutes())}`;

  return {
    flow,
    amount,
    category: result.category,
    subcategory: result.subcategory,
    note,
    datetime: `${dateKey(refDate)} ${timePart}`,
    confidence: result.confidence,
    matchReason: result.matchReason,
    matchLabel: result.matchLabel,
    reimburse,
    raw,
  };
}

function formatMatchHint(parsed) {
  if (!parsed) return "";
  const pct = Math.round((parsed.confidence || 0) * 100);
  if ((parsed.confidence || 0) < 0.5 || parsed.matchReason === "fallback") {
    const base = parsed.matchReason === "fallback"
      ? "未匹配分类 · 请确认"
      : `匹配度偏低 (${pct}%) · 请确认分类`;
    return parsed.reimburse ? `${base} · 已标记报销` : base;
  }
  if (parsed.matchReason === "fallback") {
    return parsed.note
      ? `未匹配分类 · 备注「${parsed.note}」· 已暂归入默认`
      : "未匹配分类 · 已暂归入默认";
  }
  if (parsed.matchReason === "history-text") {
    return `历史记录 · 匹配度 ${pct}%`;
  }
  const via = parsed.matchLabel || "关键词";
  const hint = `${via} · 匹配度 ${pct}%`;
  return parsed.reimburse ? `${hint} · 报销支出` : hint;
}

/** 从支付截图 OCR 文本中提取金额、商户、时间，再交给智能解析 */
function parseOcrReceiptText(text, categories, globalKeywords, transactions) {
  const raw = String(text || "").replace(/\s+/g, " ").trim();
  if (!raw) return null;

  const amountPatterns = [
    /(?:实付|合计|总计|支付|付款|金额|￥|¥)\s*[：:]?\s*(-?\d+(?:\.\d{1,2})?)/,
    /(-?\d+(?:\.\d{1,2})?)\s*元/,
    /[¥￥]\s*(-?\d+(?:\.\d{1,2})?)/,
  ];
  let amount = 0;
  for (const re of amountPatterns) {
    const m = raw.match(re);
    if (m) {
      amount = Math.abs(parseFloat(m[1]) || 0);
      if (amount > 0) break;
    }
  }

  const merchantPatterns = [
    /商户[名称名]?[：:]\s*([^\n，,；;]{2,24})/,
    /收款方[：:]\s*([^\n，,；;]{2,24})/,
    /向\s*([^\s，,；;]{2,20})\s*付款/,
    /付款给\s*([^\s，,；;]{2,20})/,
  ];
  let merchant = "";
  for (const re of merchantPatterns) {
    const m = raw.match(re);
    if (m) {
      merchant = m[1].trim();
      break;
    }
  }

  const datePatterns = [
    /(\d{4})[年/-](\d{1,2})[月/-](\d{1,2})[日号]?/,
    /(\d{1,2})[月/-](\d{1,2})[日号]/,
  ];
  let dateHint = "";
  for (const re of datePatterns) {
    const m = raw.match(re);
    if (m) {
      if (m.length >= 4) dateHint = `${m[1]}-${m[2]}-${m[3]}`;
      else dateHint = `${m[1]}月${m[2]}日`;
      break;
    }
  }

  const parts = [];
  if (merchant) parts.push(merchant);
  if (amount > 0) parts.push(String(amount));
  if (dateHint) parts.push(dateHint);
  const hint = parts.join(" ") || raw.slice(0, 120);
  const parsed = parseSmartInput(hint, categories, globalKeywords, transactions);
  if (!parsed || parsed.error) {
    return parseSmartInput(raw, categories, globalKeywords, transactions);
  }
  if (amount > 0) parsed.amount = amount;
  if (merchant && !parsed.note) parsed.note = merchant;
  else if (merchant && !parsed.note.includes(merchant)) parsed.note = `${merchant} ${parsed.note}`.trim();
  if (dateHint) {
    const ref = parseRelativeDate(dateHint);
    parsed.datetime = `${dateKey(ref)} ${pad2(ref.getHours())}:${pad2(ref.getMinutes())}`;
  }
  parsed.raw = raw;
  return parsed;
}

function parsedToTransaction(parsed, ledger, source) {
  return {
    id: uid(),
    datetime: parsed.datetime,
    flow: parsed.flow,
    category: parsed.category,
    subcategory: parsed.subcategory || "",
    amount: parsed.amount,
    ledger: ledger || "",
    accountOut: "",
    accountIn: "",
    note: parsed.note || "",
    reimburse: !!parsed.reimburse,
    discount: 0,
    tags: [],
    member: "",
    source: source || "smart",
    linkedSubscriptionId: "",
    linkedRecurringId: "",
  };
}

function txToParsed(tx, opts = {}) {
  return {
    flow: tx.flow,
    amount: tx.amount,
    category: tx.category,
    subcategory: tx.subcategory || "",
    note: tx.note || "",
    datetime: tx.datetime,
    confidence: opts.confidence ?? 1,
    matchReason: opts.matchReason || "manual",
    matchLabel: opts.matchLabel || "手动",
    raw: opts.raw || "",
  };
}

function parseCycleTime(timeStr) {
  const [hh, mm] = String(timeStr || "12:00").split(":").map((x) => parseInt(x, 10));
  return { hh: Number.isFinite(hh) ? hh : 12, mm: Number.isFinite(mm) ? mm : 0 };
}

function billingDatetimeValue(item) {
  if (item?.billingAnchor) return String(item.billingAnchor).slice(0, 16);
  const now = new Date();
  const y = now.getFullYear();
  const m = item?.cycleMonth || now.getMonth() + 1;
  const day = item?.cycleDay || 1;
  const { hh, mm } = parseCycleTime(item?.cycleTime);
  return `${y}-${String(m).padStart(2, "0")}-${String(day).padStart(2, "0")}T${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

function applyBillingAnchor(item, dtLocalValue) {
  if (!dtLocalValue) return;
  const d = new Date(dtLocalValue);
  if (Number.isNaN(d.getTime())) return;
  item.cycleDay = d.getDate();
  item.cycleMonth = d.getMonth() + 1;
  item.cycleWeekday = d.getDay();
  item.cycleTime = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  item.billingAnchor = dtLocalValue.slice(0, 16);
  item.startDate = dtLocalValue.slice(0, 10);
}

function applyBillingAnchorFromDate(item, dateStr) {
  if (!dateStr) return;
  const s = String(dateStr).slice(0, 10);
  if (!item.cycleTime) item.cycleTime = "12:00";
  applyBillingAnchor(item, `${s}T${item.cycleTime}`);
}

function billingDateValue(item) {
  if (item?.startDate) return String(item.startDate).slice(0, 10);
  if (item?.billingAnchor) return String(item.billingAnchor).slice(0, 10);
  const now = new Date();
  const y = now.getFullYear();
  const m = item?.cycleMonth || now.getMonth() + 1;
  const day = item?.cycleDay || 1;
  return `${y}-${String(m).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function cycleTimeOnDate(dateStr, item) {
  const { hh, mm } = parseCycleTime(item?.cycleTime);
  return `${dateStr} ${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

function computeNextRecurringDate(item, fromDate) {
  let base;
  if (fromDate) {
    const s = String(fromDate).slice(0, 10);
    const [y, m, day] = s.split("-").map(Number);
    base = new Date(y, m - 1, day);
  } else {
    base = new Date();
  }
  const d = new Date(base);
  if (item.cycle === "custom" && item.cycleIntervalDays > 0) {
    d.setDate(d.getDate() + item.cycleIntervalDays);
    return dateKey(d);
  }
  if (item.cycle === "weekly") {
    d.setDate(d.getDate() + 7);
  } else if (item.cycle === "quarterly") {
    d.setMonth(d.getMonth() + 3);
    const targetDay = item.cycleDay || 1;
    const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    d.setDate(Math.min(targetDay, lastDay));
  } else if (item.cycle === "yearly") {
    const targetMonth = (item.cycleMonth || base.getMonth() + 1) - 1;
    const targetDay = item.cycleDay || 1;
    d.setFullYear(d.getFullYear() + 1);
    d.setMonth(targetMonth);
    const lastDay = new Date(d.getFullYear(), targetMonth + 1, 0).getDate();
    d.setDate(Math.min(targetDay, lastDay));
  } else {
    const targetDay = item.cycleDay || 1;
    d.setMonth(d.getMonth() + 1);
    const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    d.setDate(Math.min(targetDay, lastDay));
  }
  return dateKey(d);
}

/** 新建周期账单时：计算「下一次应入账」日期（不含当天立即入账） */
function computeInitialNextDate(item, ref = new Date()) {
  const today = dateKey(ref);
  const [y, m, d] = today.split("-").map(Number);
  const refDay = new Date(y, m - 1, d).getTime();
  if (item.cycle === "custom" && item.cycleIntervalDays > 0) {
    const anchorStr = (item.startDate || item.billingAnchor || today).slice(0, 10);
    const [ay, am, ad] = anchorStr.split("-").map(Number);
    const candidate = new Date(ay, am - 1, ad);
    while (candidate.getTime() < refDay) {
      candidate.setDate(candidate.getDate() + item.cycleIntervalDays);
    }
    return dateKey(candidate);
  }
  if (item.cycle === "weekly") {
    const targetWd = item.cycleWeekday ?? ref.getDay();
    const candidate = new Date(y, m - 1, d);
    let diff = targetWd - candidate.getDay();
    if (diff < 0) diff += 7;
    candidate.setDate(candidate.getDate() + diff);
    if (candidate.getTime() < refDay) candidate.setDate(candidate.getDate() + 7);
    return dateKey(candidate);
  }
  if (item.cycle === "quarterly") {
    const targetDay = item.cycleDay || 1;
    const anchorMonth = item.cycleMonth || m;
    let month = anchorMonth;
    let year = y;
    const mk = (yy, mm) => {
      const last = new Date(yy, mm, 0).getDate();
      return new Date(yy, mm - 1, Math.min(targetDay, last));
    };
    let candidate = mk(year, month);
    while (candidate.getTime() < refDay) {
      month += 3;
      while (month > 12) { month -= 12; year += 1; }
      candidate = mk(year, month);
    }
    return dateKey(candidate);
  }
  if (item.cycle === "yearly") {
    const targetMonth = item.cycleMonth || m;
    const targetDay = item.cycleDay || 1;
    const mk = (yy) => {
      const last = new Date(yy, targetMonth, 0).getDate();
      return new Date(yy, targetMonth - 1, Math.min(targetDay, last));
    };
    let candidate = mk(y);
    if (candidate.getTime() < refDay) candidate = mk(y + 1);
    return dateKey(candidate);
  }
  const targetDay = item.cycleDay || 1;
  const lastThis = new Date(y, m, 0).getDate();
  let candidate = new Date(y, m - 1, Math.min(targetDay, lastThis));
  if (candidate.getTime() >= refDay) return dateKey(candidate);
  const lastNext = new Date(y, m + 1, 0).getDate();
  candidate = new Date(y, m, Math.min(targetDay, lastNext));
  return dateKey(candidate);
}

/** 补录/阶段编辑：从当前扣费日推下一期（锚定开始日的月/季/年日，而非订阅 cycleDay） */
function computeNextPeriodDateInRange(item, cur, anchorStart) {
  const s = String(cur).slice(0, 10);
  const [y, m, d] = s.split("-").map(Number);
  const base = new Date(y, m - 1, d);
  const anchor = String(anchorStart).slice(0, 10);
  const [ay, am, ad] = anchor.split("-").map(Number);

  if (item.cycle === "custom" && item.cycleIntervalDays > 0) {
    base.setDate(base.getDate() + item.cycleIntervalDays);
    return dateKey(base);
  }
  if (item.cycle === "weekly") {
    base.setDate(base.getDate() + 7);
    return dateKey(base);
  }
  if (item.cycle === "quarterly") {
    base.setMonth(base.getMonth() + 3);
    const lastDay = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();
    base.setDate(Math.min(ad, lastDay));
    return dateKey(base);
  }
  if (item.cycle === "yearly") {
    base.setFullYear(base.getFullYear() + 1);
    base.setMonth(am - 1);
    const lastDay = new Date(base.getFullYear(), am, 0).getDate();
    base.setDate(Math.min(ad, lastDay));
    return dateKey(base);
  }
  base.setMonth(base.getMonth() + 1);
  const lastDay = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();
  base.setDate(Math.min(ad, lastDay));
  return dateKey(base);
}

function daysBetweenDateKeys(a, b) {
  const da = new Date(String(a).slice(0, 10));
  const db = new Date(String(b).slice(0, 10));
  return Math.round((db - da) / 86400000);
}

/** 根据阶段内已有账单间隔推断周期（用于历史阶段期数预览） */
function inferBillingCadenceFromTxs(txs, fallbackItem) {
  const sorted = [...(txs || [])].sort((a, b) => a.datetime.localeCompare(b.datetime));
  const base = {
    ...(fallbackItem || {}),
    cycleTime: fallbackItem?.cycleTime || "12:00",
  };
  if (!sorted.length) {
    return {
      ...base,
      cycle: base.cycle || "monthly",
      cycleDay: base.cycleDay || 1,
      cycleMonth: base.cycleMonth || 1,
      cycleWeekday: base.cycleWeekday ?? 0,
      cycleIntervalDays: base.cycleIntervalDays || 0,
    };
  }
  const firstDate = sorted[0].datetime.slice(0, 10);
  const [y, m, d] = firstDate.split("-").map(Number);
  const anchor = {
    ...base,
    cycleDay: d,
    cycleMonth: m,
    cycleWeekday: new Date(y, m - 1, d).getDay(),
  };
  if (sorted.length < 2) {
    return {
      ...anchor,
      cycle: base.cycle || "monthly",
      cycleIntervalDays: base.cycle === "custom" ? (base.cycleIntervalDays || 0) : 0,
    };
  }
  const gaps = [];
  for (let i = 1; i < sorted.length; i++) {
    gaps.push(daysBetweenDateKeys(sorted[i - 1].datetime.slice(0, 10), sorted[i].datetime.slice(0, 10)));
  }
  gaps.sort((a, b) => a - b);
  const median = gaps[Math.floor(gaps.length / 2)];
  if (median >= 330 && median <= 400) {
    return { ...anchor, cycle: "yearly", cycleIntervalDays: 0 };
  }
  if (median >= 80 && median <= 100) {
    return { ...anchor, cycle: "quarterly", cycleIntervalDays: 0 };
  }
  if (median >= 25 && median <= 35) {
    return { ...anchor, cycle: "monthly", cycleIntervalDays: 0 };
  }
  if (median >= 6 && median <= 8) {
    return { ...anchor, cycle: "weekly", cycleIntervalDays: 0 };
  }
  if (median >= 1 && median <= 45) {
    return { ...anchor, cycle: "custom", cycleIntervalDays: Math.max(1, Math.round(median)) };
  }
  const avg = gaps.reduce((s, g) => s + g, 0) / gaps.length;
  if (avg >= 330) return { ...anchor, cycle: "yearly", cycleIntervalDays: 0 };
  return {
    ...anchor,
    cycle: base.cycle || "monthly",
    cycleIntervalDays: base.cycle === "custom" ? (base.cycleIntervalDays || 0) : 0,
  };
}

function resolveBillingItemForPhase(item, phaseTxs) {
  const inferred = inferBillingCadenceFromTxs(phaseTxs, item);
  const first = phaseTxs?.[0]?.datetime?.slice(0, 10);
  if (first) applyBillingAnchorFromDate(inferred, first);
  return inferred;
}

function resolveBillingItemForPreview(item, start, end, amount, records) {
  if (!start || !end || !records?.length) return item;
  const amt = Number(amount);
  const inRange = records.filter((t) => {
    const d = t.datetime.slice(0, 10);
    if (d < start || d > end) return false;
    if (amt > 0 && Math.abs(Number(t.amount) - amt) > 0.009) return false;
    return true;
  });
  if (inRange.length) return resolveBillingItemForPhase(item, inRange);
  return item;
}

/** 按订阅周期，计算开始～结束之间的各期扣费日（起止日 inclusive，以开始日为锚） */
function computeSubscriptionPeriodDates(item, startDateStr, endDateStr) {
  const start = String(startDateStr || "").slice(0, 10);
  const end = String(endDateStr || "").slice(0, 10);
  if (!start || !end || start > end) return [];
  const dates = [];
  let cur = start;
  let guard = 0;
  while (cur <= end && guard++ < 600) {
    dates.push(cur);
    const next = computeNextPeriodDateInRange(item, cur, start);
    if (!next || next <= cur) break;
    cur = next;
  }
  return dates;
}

function countSubscriptionPeriods(item, startDateStr, endDateStr) {
  return computeSubscriptionPeriodDates(item, startDateStr, endDateStr).length;
}

function formatRecurringLabel(item) {
  const weekNames = ["日", "一", "二", "三", "四", "五", "六"];
  if (item.cycle === "custom" && item.cycleIntervalDays > 0) return `每${item.cycleIntervalDays}天`;
  if (item.cycle === "weekly") return `每周${weekNames[item.cycleWeekday ?? 0]}`;
  if (item.cycle === "quarterly") return `每季${item.cycleDay || 1}日`;
  if (item.cycle === "yearly") return `每年${item.cycleMonth || 1}月${item.cycleDay || 1}日`;
  return `每月${item.cycleDay || 1}日`;
}

function cycleHintText(cycle) {
  if (cycle === "custom") return "将按自定义间隔天数，从开始日起自动生成账单";
  if (cycle === "weekly") return "将在每周该日自动生成账单";
  if (cycle === "quarterly") return "将在每季该日自动生成账单";
  if (cycle === "yearly") return "将在每年该日自动生成账单";
  return "将在每月该日自动生成账单";
}
