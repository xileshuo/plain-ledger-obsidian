// ─── 农历 / 节假日（轻量，1900–2100）────────────────────────────────────────

const LUNAR_INFO = [
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
];

const LUNAR_DAY_NAMES = [
  "初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
  "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
  "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十",
];

const LUNAR_MONTH_NAMES = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"];

const SOLAR_HOLIDAYS = {
  "01-01": "元旦",
  "02-14": "情人节",
  "03-08": "妇女节",
  "05-01": "劳动节",
  "05-04": "青年节",
  "06-01": "儿童节",
  "07-01": "建党节",
  "08-01": "建军节",
  "09-10": "教师节",
  "10-01": "国庆节",
  "12-25": "圣诞节",
};

const LUNAR_HOLIDAYS = {
  "1-1": "春节",
  "1-15": "元宵",
  "5-5": "端午",
  "7-7": "七夕",
  "8-15": "中秋",
  "9-9": "重阳",
  "12-8": "腊八",
  "12-30": "除夕",
};

function lunarYearDays(y) {
  let sum = 348;
  const info = LUNAR_INFO[y - 1900];
  if (!info) return 348;
  for (let i = 0x8000; i > 0x8; i >>= 1) sum += (info & i) ? 1 : 0;
  return sum + leapDays(y);
}

function leapMonth(y) {
  return LUNAR_INFO[y - 1900] & 0xf;
}

function leapDays(y) {
  if (leapMonth(y)) return (LUNAR_INFO[y - 1900] & 0x10000) ? 30 : 29;
  return 0;
}

function monthDays(y, m) {
  return (LUNAR_INFO[y - 1900] & (0x10000 >> m)) ? 30 : 29;
}

function solarToLunar(y, m, d) {
  const base = new Date(1900, 0, 31);
  const obj = new Date(y, m - 1, d);
  let offset = Math.floor((obj - base) / 86400000);
  if (offset < 0) return { month: 1, day: 1, leap: false };

  let ly = 1900;
  for (; ly < 2101 && offset > 0; ly++) {
    const days = lunarYearDays(ly);
    if (offset < days) break;
    offset -= days;
  }

  let leap = leapMonth(ly);
  let isLeap = false;
  let lm = 1;
  for (; lm < 13 && offset > 0; lm++) {
    if (leap > 0 && lm === leap + 1 && !isLeap) {
      lm--;
      isLeap = true;
      const days = leapDays(ly);
      if (offset < days) break;
      offset -= days;
      isLeap = false;
      lm++;
      continue;
    }
    const days = monthDays(ly, lm);
    if (offset < days) break;
    offset -= days;
  }

  return { year: ly, month: lm, day: offset + 1, leap: isLeap };
}

function getLunarDayLabel(date) {
  const l = solarToLunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
  return LUNAR_DAY_NAMES[l.day - 1] || "";
}

function getLunarMonthDayLabel(date) {
  const l = solarToLunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const mName = LUNAR_MONTH_NAMES[l.month - 1] || String(l.month);
  const dName = LUNAR_DAY_NAMES[l.day - 1] || "";
  return l.day === 1 ? `${mName}月` : dName;
}

function getCnHoliday(dateKey) {
  const parts = dateKey.split("-");
  if (parts.length < 3) return "";
  const m = parts[1];
  const d = parts[2];
  const solar = SOLAR_HOLIDAYS[`${m}-${d}`];
  if (solar) return solar;

  const date = new Date(Number(parts[0]), Number(m) - 1, Number(d));
  const l = solarToLunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
  return LUNAR_HOLIDAYS[`${l.month}-${l.day}`] || "";
}

function getCalCellSubLabel(dateKey) {
  const holiday = getCnHoliday(dateKey);
  if (holiday) return holiday;
  const date = parseDateTime(dateKey + " 12:00");
  return getLunarMonthDayLabel(date);
}

function isWeekendDateKey(dateKey) {
  const d = parseDateTime(dateKey + " 12:00");
  const dow = d.getDay();
  return dow === 0 || dow === 6;
}

function buildCalDayTooltip(info) {
  const parts = [];
  if (info.income > 0) parts.push(`收入 ${fmtMoney(info.income)}`);
  if (info.expense > 0) parts.push(`支出 ${fmtMoney(info.expense)}`);
  if (!parts.length) return "暂无收支";
  const net = info.income - info.expense;
  if (info.income > 0 && info.expense > 0) {
    parts.push(`结余 ${fmtMoney(net)}`);
  }
  if (info.count > 0) parts.push(`笔数${info.count}`);
  return parts.join(" · ");
}

const SUBSCRIPTION_TABS = [
  { id: "all", label: "全部" },
  { id: "video", label: "影音" },
  { id: "music", label: "音乐" },
  { id: "read", label: "阅读" },
  { id: "cloud", label: "云盘" },
  { id: "shop", label: "购物" },
  { id: "office", label: "办公" },
  { id: "ai", label: "AI" },
  { id: "other", label: "其他" },
];

const DEFAULT_SUBSCRIPTION_LEDGER_CATEGORY = "软件续费";
/** 曾误用作入账分类，加载时迁回默认分类 */
const DEPRECATED_SUBSCRIPTION_LEDGER_CATEGORY = "订阅";

function subPreset(name, tab, domain, color, subcategory) {
  return {
    name,
    tab,
    domain,
    color,
    category: DEFAULT_SUBSCRIPTION_LEDGER_CATEGORY,
    subcategory: subcategory || name,
    abbr: subscriptionAbbr(name),
  };
}

const SUBSCRIPTION_PRESETS = [
  // 影音
  subPreset("腾讯视频", "video", "v.qq.com", "#FF6022"),
  subPreset("优酷", "video", "youku.com", "#00A1D6"),
  subPreset("爱奇艺", "video", "iqiyi.com", "#00BE06"),
  subPreset("哔哩哔哩", "video", "bilibili.com", "#FB7299"),
  subPreset("芒果TV", "video", "mgtv.com", "#FF6600"),
  subPreset("咪咕视频", "video", "miguvideo.com", "#0080FF"),
  subPreset("Netflix", "video", "netflix.com", "#E50914"),
  subPreset("Disney+", "video", "disneyplus.com", "#113CCF"),
  subPreset("YouTube Premium", "video", "youtube.com", "#FF0000"),
  subPreset("抖音会员", "video", "douyin.com", "#161823"),
  subPreset("快手会员", "video", "kuaishou.com", "#FF4906"),
  subPreset("TV+", "video", "apple.com", "#000000", "Apple TV+"),
  // 音乐
  subPreset("QQ音乐", "music", "y.qq.com", "#31C27C"),
  subPreset("酷狗音乐", "music", "kugou.com", "#0090FF"),
  subPreset("酷我音乐", "music", "kuwo.cn", "#FF5040"),
  subPreset("网易云音乐", "music", "music.163.com", "#E60026", "网易云"),
  subPreset("Apple Music", "music", "apple.com", "#FA243C"),
  subPreset("Spotify", "music", "spotify.com", "#1DB954"),
  subPreset("喜马拉雅", "music", "ximalaya.com", "#F86442"),
  subPreset("汽水音乐", "music", "douyin.com", "#FE2C55"),
  subPreset("QQ音乐豪华绿钻", "music", "y.qq.com", "#31C27C", "QQ音乐"),
  // 阅读
  subPreset("微信读书", "read", "weread.qq.com", "#4AB55F"),
  subPreset("得到", "read", "dedao.cn", "#FF6A00"),
  subPreset("Kindle Unlimited", "read", "amazon.cn", "#FF9900", "Kindle"),
  subPreset("知乎盐选", "read", "zhihu.com", "#0066FF"),
  subPreset("QQ阅读", "read", "qq.com", "#12B7F5"),
  subPreset("起点读书", "read", "qidian.com", "#E5353D"),
  subPreset("豆瓣阅读", "read", "douban.com", "#007722"),
  subPreset("帆书", "read", "dushu.io", "#E74C3C"),
  subPreset("掌阅", "read", "zhangyue.com", "#FF6B35"),
  // 云盘
  subPreset("百度网盘", "cloud", "pan.baidu.com", "#2932E1"),
  subPreset("阿里云盘", "cloud", "aliyundrive.com", "#6349FF"),
  subPreset("OneDrive", "cloud", "onedrive.com", "#0078D4"),
  subPreset("坚果云", "cloud", "jianguoyun.com", "#33CC66"),
  subPreset("iCloud+", "cloud", "icloud.com", "#3693F3", "iCould 云"),
  subPreset("夸克网盘", "cloud", "quark.cn", "#000000"),
  subPreset("115网盘", "cloud", "115.com", "#FF6600"),
  subPreset("Google One", "cloud", "google.com", "#4285F4"),
  subPreset("Dropbox", "cloud", "dropbox.com", "#0061FF"),
  subPreset("腾讯微云", "cloud", "weiyun.com", "#12B7F5"),
  subPreset("天翼云盘", "cloud", "cloud.189.cn", "#0099FF"),
  // 购物 / 生活会员
  subPreset("淘宝88VIP", "shop", "taobao.com", "#FF5000"),
  subPreset("京东PLUS", "shop", "jd.com", "#E1251B"),
  subPreset("拼多多省钱月卡", "shop", "pinduoduo.com", "#E02E24", "拼多多"),
  subPreset("美团会员", "shop", "meituan.com", "#FFC300"),
  subPreset("饿了么超级会员", "shop", "ele.me", "#0097FF", "饿了么"),
  subPreset("山姆会员", "shop", "samsclub.cn", "#0060A9", "山姆"),
  subPreset("盒马X会员", "shop", "freshhema.com", "#FF6A00", "盒马"),
  subPreset("Costco会员", "shop", "costco.com.cn", "#E31837", "Costco"),
  subPreset("叮咚买菜会员", "shop", "100.me", "#00B578", "叮咚买菜"),
  subPreset("星巴克星礼卡", "shop", "starbucks.com.cn", "#00704A", "星巴克"),
  // 办公 / 工具
  subPreset("Microsoft 365", "office", "microsoft.com", "#0078D4"),
  subPreset("WPS会员", "office", "wps.cn", "#FF9800", "WPS"),
  subPreset("Notion", "office", "notion.so", "#000000"),
  subPreset("Obsidian Sync", "office", "obsidian.md", "#7C3AED", "Obsidian"),
  subPreset("Adobe Creative Cloud", "office", "adobe.com", "#FF0000", "Adobe"),
  subPreset("Figma", "office", "figma.com", "#F24E1E"),
  subPreset("Canva", "office", "canva.com", "#00C4CC"),
  subPreset("迅雷会员", "office", "xunlei.com", "#2196F3", "迅雷"),
  subPreset("GitHub Copilot", "office", "github.com", "#24292F"),
  subPreset("Cursor", "office", "cursor.com", "#000000"),
  subPreset("JetBrains", "office", "jetbrains.com", "#FE315D"),
  subPreset("1Password", "office", "1password.com", "#0094F5"),
  subPreset("Grammarly", "office", "grammarly.com", "#15C39A"),
  // AI
  subPreset("ChatGPT Plus", "ai", "openai.com", "#10A37F", "ChatGPT"),
  subPreset("Claude Pro", "ai", "anthropic.com", "#D97757", "Claude"),
  subPreset("Midjourney", "ai", "midjourney.com", "#000000"),
  subPreset("Copilot Pro", "ai", "microsoft.com", "#0078D4"),
  subPreset("Gemini Advanced", "ai", "google.com", "#4285F4", "Gemini"),
  subPreset("Poe", "ai", "poe.com", "#6B46FF"),
  subPreset("Perplexity", "ai", "perplexity.ai", "#20B8CD"),
  // 其他常用
  subPreset("Surge", "other", "nssurge.com", "#147EFB"),
  subPreset("Shadowrocket", "other", "shadowrocket.app", "#007AFF"),
  subPreset("Telegram Premium", "other", "telegram.org", "#26A5E4"),
  subPreset("Twitter/X Premium", "other", "x.com", "#000000"),
  subPreset("LinkedIn Premium", "other", "linkedin.com", "#0A66C2"),
  subPreset("Duolingo Super", "other", "duolingo.com", "#58CC02", "多邻国"),
  subPreset("Keep会员", "other", "gotokeep.com", "#FF5722", "Keep"),
  subPreset("Nintendo Switch Online", "other", "nintendo.com", "#E60012"),
  subPreset("PlayStation Plus", "other", "playstation.com", "#003791"),
  subPreset("Xbox Game Pass", "other", "xbox.com", "#107C10"),
  subPreset("Steam", "other", "steampowered.com", "#1B2838"),
];

function findSubscriptionPreset(name) {
  return SUBSCRIPTION_PRESETS.find((p) => p.name === name)
    || SUBSCRIPTION_PRESETS.find((p) => p.subcategory === name);
}

function resolveSubscriptionPreset(item) {
  if (!item) return null;
  const name = (item.name || "").trim();
  const sub = (item.subcategory || "").trim();
  const direct = findSubscriptionPreset(name) || findSubscriptionPreset(sub);
  if (direct) return direct;
  const fromTx = matchTxToSubscriptionPreset({
    note: name,
    subcategory: sub,
    category: item.category || "",
  });
  if (fromTx) return fromTx;
  const blob = `${name} ${sub}`.toLowerCase();
  return SUBSCRIPTION_PRESETS.find((p) => {
    const pn = p.name.toLowerCase();
    const ps = (p.subcategory || "").toLowerCase();
    return (pn.length >= 2 && blob.includes(pn)) || (ps.length >= 2 && blob.includes(ps));
  }) || null;
}

function matchTxToSubscriptionPreset(tx) {
  const sub = (tx.subcategory || "").trim();
  const note = (tx.note || "").trim();
  const blob = `${sub} ${note}`.toLowerCase();
  if (!blob.trim()) return null;
  for (const p of SUBSCRIPTION_PRESETS) {
    const keys = [...new Set([p.name, p.subcategory].filter(Boolean))];
    for (const k of keys) {
      const lk = k.toLowerCase();
      if (sub === k || blob.includes(lk)) return p;
    }
  }
  if (/icloud|icould/i.test(blob)) return findSubscriptionPreset("iCloud+");
  if (/网易云/i.test(blob)) return findSubscriptionPreset("网易云音乐");
  if (/b站|bilibili|哔哩/i.test(blob)) return findSubscriptionPreset("哔哩哔哩");
  if (/腾讯.*视频|video.*腾讯/i.test(blob)) return findSubscriptionPreset("腾讯视频");
  return null;
}

function isAutoSyncedRecurringItem(item) {
  const note = String(item?.note || "");
  return /从\s*\d+\s*笔(历史|周期)?账单同步/.test(note);
}

function purgeAutoSyncedRecurring(data) {
  if (!Array.isArray(data?.recurring) || !data.recurring.length) return false;
  const kept = data.recurring.filter((r) => !isAutoSyncedRecurringItem(r));
  if (kept.length === data.recurring.length) return false;
  data.recurring = kept;
  return true;
}

/** 周期规则已清空时，移除插件自动生成的 recurring 账单（历史误同步残留） */
function purgeOrphanRecurringTransactions(data) {
  if (!Array.isArray(data?.transactions) || !data.transactions.length) return false;
  if ((data.recurring || []).length > 0) return false;
  const before = data.transactions.length;
  data.transactions = data.transactions.filter((t) => t.source !== "recurring");
  return data.transactions.length !== before;
}

function isSubscriptionTransaction(t) {
  if (t.flow !== "expense") return false;
  return (
    t.source === "subscription"
    || (t.tags || []).includes("订阅")
    || !!String(t.linkedSubscriptionId || "").trim()
  );
}

function subscriptionAlreadyExists(data, key, preset, last) {
  return (data.subscriptions || []).some((s) => {
    if (s.name === key) return true;
    if (preset?.name && s.name === preset.name) return true;
    const sub = (last?.subcategory || "").trim();
    if (sub && (s.subcategory === sub || s.name === sub)) return true;
    return false;
  });
}

function isAutoSyncedSubscriptionItem(item) {
  const note = String(item?.note || "");
  return /从\s*\d+\s*笔历史账单同步/.test(note);
}

function subAliasKey(s) {
  return String(s || "").replace(/\s+/g, "").toLowerCase();
}

function subscriptionAmountMatches(item, t) {
  const expected = Number(item?.amount);
  if (!Number.isFinite(expected) || expected <= 0) return true;
  const got = Number(t?.amount);
  if (!Number.isFinite(got)) return false;
  const diff = Math.abs(got - expected);
  if (diff <= 0.009) return true;
  return diff / expected <= 0.06;
}

function subscriptionTxMatchesExact(item, t) {
  if (!item || !t || t.flow !== "expense") return false;
  const keys = [...new Set([(item.name || "").trim(), (item.subcategory || "").trim()].filter(Boolean))];
  if (!keys.length) return false;
  const sub = (t.subcategory || "").trim();
  const note = (t.note || "").trim();
  const field = note || sub;
  if (!field) return false;
  const fieldKey = subAliasKey(field);
  if (!keys.some((k) => subAliasKey(k) === fieldKey)) return false;
  return subscriptionAmountMatches(item, t);
}

function subscriptionTxMatchesStrict(item, t) {
  if (!item || !t || t.flow !== "expense") return false;
  const name = (item.name || "").trim();
  const subcat = (item.subcategory || "").trim();
  const sub = (t.subcategory || "").trim();
  const note = (t.note || "").trim();
  const preset = findSubscriptionPreset(name) || findSubscriptionPreset(subcat);
  const keys = new Set([name, subcat, preset?.name, preset?.subcategory].filter(Boolean));
  const aliases = new Set([...keys].map(subAliasKey));
  if (keys.has(sub) || aliases.has(subAliasKey(sub))) return true;
  if (note && (keys.has(note) || aliases.has(subAliasKey(note)))) return true;
  const txPreset = matchTxToSubscriptionPreset(t);
  if (txPreset) {
    if (keys.has(txPreset.name) || aliases.has(subAliasKey(txPreset.name))) return true;
    if (txPreset.subcategory && (keys.has(txPreset.subcategory) || aliases.has(subAliasKey(txPreset.subcategory)))) {
      return true;
    }
    if (preset && txPreset.name === preset.name) return true;
  }
  return false;
}

/** 移除「从历史账单同步」订阅时 processDue 批量回填的假账单 */
function purgeSubscriptionBackfill(data) {
  if (!data?.subscriptions?.length || !data?.transactions?.length) return false;
  let changed = false;
  const removeIds = new Set();

  data.subscriptions.forEach((sub) => {
    if (!isAutoSyncedSubscriptionItem(sub)) return;
    data.transactions.forEach((t) => {
      if (t.source === "subscription" && subscriptionTxMatchesStrict(sub, t)) {
        removeIds.add(t.id);
      }
    });
    const real = data.transactions.filter(
      (t) => !removeIds.has(t.id) && t.source !== "subscription" && subscriptionTxMatchesStrict(sub, t)
    );
    if (removeIds.size) changed = true;
    sub.generatedCount = 0;
    sub.note = String(sub.note || "").replace(/从\s*\d+\s*笔历史账单同步/, "").trim();
    sub.source = "matched";
    if (sub.userActivated !== true) sub.active = false;
    if (real.length) {
      const sorted = real.sort((a, b) => b.datetime.localeCompare(a.datetime));
      sub.billingAnchor = sorted[0].datetime.slice(0, 16);
    }
    sub.nextDate = computeInitialNextDate(sub, new Date());
  });

  if (removeIds.size) {
    data.transactions = data.transactions.filter((t) => !removeIds.has(t.id));
  }
  return changed;
}

function isManualSubscriptionItem(item) {
  return item?.source === "manual";
}

function isAutoMatchedSubscriptionItem(item) {
  if (isManualSubscriptionItem(item)) return false;
  if (item?.source === "matched" || item?.autoMatched === true) return true;
  return isAutoSyncedSubscriptionItem(item);
}

/** 历史账单匹配到的订阅默认暂停；仅手动新增且开启的才自动续费 */
function normalizeSubscriptionActivePolicy(data) {
  if ((data.subscriptionActivePolicy || 0) >= 1) return false;
  let changed = false;
  (data.subscriptions || []).forEach((sub) => {
    if (isManualSubscriptionItem(sub)) return;
    if (sub.source !== "matched") {
      sub.source = "matched";
      changed = true;
    }
    if (sub.userActivated === true) return;
    if (sub.active !== false) {
      sub.active = false;
      changed = true;
    }
  });
  data.subscriptionActivePolicy = 1;
  return changed;
}

function applySubscriptionStartDate(item, dateStr) {
  if (!dateStr) return;
  const s = String(dateStr).slice(0, 10);
  const parts = s.split("-").map(Number);
  if (parts.length < 3 || !parts[0]) return;
  const [y, m, d] = parts;
  item.startDate = s;
  item.cycleDay = d;
  item.cycleMonth = m;
  item.cycleWeekday = new Date(y, m - 1, d).getDay();
  if (!item.cycleTime) item.cycleTime = "12:00";
  item.billingAnchor = `${s}T${item.cycleTime}`;
}

function subscriptionDateValue(item, field) {
  const v = item?.[field];
  if (v) return String(v).slice(0, 10);
  if (field === "startDate" && item?.billingAnchor) return String(item.billingAnchor).slice(0, 10);
  return "";
}

function getActiveSubscriptionPhase(item) {
  if (!item?.phases?.length) return null;
  return item.phases.find((p) => !p.endDate) || item.phases[item.phases.length - 1];
}

function syncSubscriptionFromPhase(item, phase) {
  if (!phase) return;
  item.amount = phase.amount;
  item.cycle = phase.cycle || "monthly";
  item.cycleDay = phase.cycleDay;
  item.cycleMonth = phase.cycleMonth;
  item.cycleWeekday = phase.cycleWeekday;
  item.cycleIntervalDays = phase.cycleIntervalDays || 0;
  if (phase.startDate) applySubscriptionStartDate(item, phase.startDate);
  item.pausedAt = phase.endDate || "";
  item.active = !phase.endDate;
}

function normalizeSingleSubscriptionPhases(item) {
  if (!item) return;
  if (Array.isArray(item.phases) && item.phases.length) {
    const active = getActiveSubscriptionPhase(item);
    if (active) syncSubscriptionFromPhase(item, active);
    return;
  }
  const start = subscriptionDateValue(item, "startDate")
    || (item.nextDate ? String(item.nextDate).slice(0, 10) : "")
    || dateKey(new Date());
  const end = subscriptionDateValue(item, "pausedAt");
  item.phases = [{
    id: uid(),
    amount: item.amount || 0,
    cycle: item.cycle || "monthly",
    cycleDay: item.cycleDay || parseInt(start.slice(8), 10) || 1,
    cycleMonth: item.cycleMonth || parseInt(start.slice(5, 7), 10) || 1,
    cycleWeekday: item.cycleWeekday,
    cycleIntervalDays: item.cycleIntervalDays || 0,
    startDate: start,
    endDate: end,
  }];
  syncSubscriptionFromPhase(item, item.phases[0]);
}

function normalizeSubscriptionPhases(data) {
  let changed = false;
  (data.subscriptions || []).forEach((sub) => {
    const hadPhases = Array.isArray(sub.phases) && sub.phases.length;
    const snap = hadPhases ? JSON.stringify(sub.phases) : "";
    normalizeSingleSubscriptionPhases(sub);
    if (!hadPhases || JSON.stringify(sub.phases) !== snap) changed = true;
  });
  return changed;
}

function closeSubscriptionPhase(item, endDate) {
  normalizeSingleSubscriptionPhases(item);
  const end = (endDate || dateKey(new Date())).slice(0, 10);
  const phase = getActiveSubscriptionPhase(item);
  if (phase && !phase.endDate) phase.endDate = end;
  item.pausedAt = end;
  item.active = false;
}

function startSubscriptionPhase(item, phaseData) {
  normalizeSingleSubscriptionPhases(item);
  const prev = getActiveSubscriptionPhase(item);
  const end = (phaseData.startDate || dateKey(new Date())).slice(0, 10);
  if (prev && !prev.endDate) prev.endDate = end;
  const phase = {
    id: uid(),
    amount: phaseData.amount,
    cycle: phaseData.cycle || "monthly",
    cycleDay: phaseData.cycleDay,
    cycleMonth: phaseData.cycleMonth,
    cycleWeekday: phaseData.cycleWeekday,
    cycleIntervalDays: phaseData.cycleIntervalDays || 0,
    startDate: phaseData.startDate,
    endDate: "",
  };
  if (!item.phases) item.phases = [];
  item.phases.push(phase);
  syncSubscriptionFromPhase(item, phase);
  item.active = true;
  item.pausedAt = "";
}

function subscriptionPhaseFormChanged(phase, form) {
  if (!phase) return true;
  return (
    Number(phase.amount) !== Number(form.amount)
    || phase.cycle !== form.cycle
    || (phase.cycleIntervalDays || 0) !== (form.cycleIntervalDays || 0)
    || String(phase.startDate).slice(0, 10) !== String(form.startDate).slice(0, 10)
  );
}

function isSubscriptionRenewing(item) {
  normalizeSingleSubscriptionPhases(item);
  const phase = getActiveSubscriptionPhase(item);
  return !!(phase && !phase.endDate && item.active !== false);
}

function getActiveRecurringPhase(item) {
  if (!item?.phases?.length) return null;
  return item.phases.find((p) => !p.endDate) || item.phases[item.phases.length - 1];
}

function syncRecurringFromPhase(item, phase) {
  if (!phase) return;
  item.amount = phase.amount;
  item.cycle = phase.cycle || "monthly";
  item.cycleDay = phase.cycleDay;
  item.cycleMonth = phase.cycleMonth;
  item.cycleWeekday = phase.cycleWeekday;
  item.cycleIntervalDays = phase.cycleIntervalDays || 0;
  if (phase.startDate) {
    item.startDate = phase.startDate;
    applyBillingAnchorFromDate(item, phase.startDate);
  }
  item.active = !phase.endDate;
}

function normalizeSingleRecurringPhases(item) {
  if (!item) return;
  if (Array.isArray(item.phases) && item.phases.length) {
    const active = getActiveRecurringPhase(item);
    if (active) syncRecurringFromPhase(item, active);
    return;
  }
  const start = billingDateValue(item) || dateKey(new Date());
  const pausedAt = item.pausedAt ? String(item.pausedAt).slice(0, 10) : "";
  const end = item.active === false ? (pausedAt || "") : "";
  item.phases = [{
    id: uid(),
    amount: item.amount || 0,
    cycle: item.cycle || "monthly",
    cycleDay: item.cycleDay || parseInt(start.slice(8), 10) || 1,
    cycleMonth: item.cycleMonth || parseInt(start.slice(5, 7), 10) || 1,
    cycleWeekday: item.cycleWeekday,
    cycleIntervalDays: item.cycleIntervalDays || 0,
    startDate: start,
    endDate: end,
  }];
  syncRecurringFromPhase(item, item.phases[0]);
}

function normalizeRecurringPhases(data) {
  let changed = false;
  (data.recurring || []).forEach((item) => {
    const hadPhases = Array.isArray(item.phases) && item.phases.length;
    const snap = hadPhases ? JSON.stringify(item.phases) : "";
    normalizeSingleRecurringPhases(item);
    if (!hadPhases || JSON.stringify(item.phases) !== snap) changed = true;
  });
  return changed;
}

function closeRecurringPhase(item, endDate) {
  normalizeSingleRecurringPhases(item);
  const end = (endDate || dateKey(new Date())).slice(0, 10);
  const phase = getActiveRecurringPhase(item);
  if (phase && !phase.endDate) phase.endDate = end;
  item.pausedAt = end;
  item.active = false;
}

function startRecurringPhase(item, phaseData) {
  normalizeSingleRecurringPhases(item);
  const prev = getActiveRecurringPhase(item);
  const end = (phaseData.startDate || dateKey(new Date())).slice(0, 10);
  if (prev && !prev.endDate) prev.endDate = end;
  const phase = {
    id: uid(),
    amount: phaseData.amount,
    cycle: phaseData.cycle || "monthly",
    cycleDay: phaseData.cycleDay,
    cycleMonth: phaseData.cycleMonth,
    cycleWeekday: phaseData.cycleWeekday,
    cycleIntervalDays: phaseData.cycleIntervalDays || 0,
    startDate: phaseData.startDate,
    endDate: "",
  };
  if (!item.phases) item.phases = [];
  item.phases.push(phase);
  syncRecurringFromPhase(item, phase);
  item.active = true;
  item.pausedAt = "";
}

function recurringPhaseFormChanged(phase, form) {
  if (!phase) return true;
  return (
    Number(phase.amount) !== Number(form.amount)
    || phase.cycle !== form.cycle
    || (phase.cycleIntervalDays || 0) !== (form.cycleIntervalDays || 0)
    || String(phase.startDate).slice(0, 10) !== String(form.startDate).slice(0, 10)
  );
}

function isRecurringActive(item) {
  normalizeSingleRecurringPhases(item);
  const phase = getActiveRecurringPhase(item);
  return !!(phase && !phase.endDate && item.active !== false);
}

function normalizeSubscriptionLedgerCategory(data) {
  if (!data?.categories) data.categories = [];
  let changed = false;
  const catName = DEFAULT_SUBSCRIPTION_LEDGER_CATEGORY;

  if (!data.categories.some((c) => c.name === catName)) {
    data.categories.push({
      name: catName,
      icon: "📱",
      color: "#FF9CEE",
      flow: "expense",
      keywords: [],
      subcategories: [],
    });
    changed = true;
  }

  (data.subscriptions || []).forEach((s) => {
    if (!s.category) {
      s.category = catName;
      changed = true;
    } else if (s.category === DEPRECATED_SUBSCRIPTION_LEDGER_CATEGORY) {
      s.category = catName;
      changed = true;
    }
  });

  return changed;
}

/** 软件续费：仅保留账本中已有支出的二级分类 */
function pruneSoftwareRenewalSubcategories(data) {
  const cat = (data.categories || []).find((c) => c.name === DEFAULT_SUBSCRIPTION_LEDGER_CATEGORY);
  if (!cat?.subcategories?.length) return false;

  const billed = new Set();
  (data.transactions || []).forEach((t) => {
    if (t.flow !== "expense" || t.category !== DEFAULT_SUBSCRIPTION_LEDGER_CATEGORY) return;
    const sub = (t.subcategory || "").trim();
    if (sub) billed.add(sub);
  });

  const before = cat.subcategories.length;
  cat.subcategories = cat.subcategories.filter((s) => billed.has(subcategoryName(s)));
  normalizeCategorySubs(cat);
  return cat.subcategories.length !== before;
}

function recurringTitleBase(title) {
  return String(title || "").split("·")[0].trim();
}

function createRecurringItemFromTxStream(spec, title, amount, txs) {
  const sorted = [...txs].sort((a, b) => a.datetime.localeCompare(b.datetime));
  const firstDate = sorted[0].datetime.slice(0, 10);
  const latest = sorted[sorted.length - 1];
  const anchorDate = spec.anchorFromLatest ? latest.datetime.slice(0, 10) : (spec.defaultAnchor || firstDate);
  const [y, m, d] = anchorDate.split("-").map(Number);
  const item = {
    id: uid(),
    title,
    amount,
    category: spec.category,
    subcategory: spec.subcategory || "",
    flow: spec.flow || "expense",
    cycle: "monthly",
    cycleDay: d,
    cycleMonth: m,
    cycleWeekday: new Date(y, m - 1, d).getDay(),
    cycleIntervalDays: 0,
    cycleTime: "12:00",
    billingAnchor: `${anchorDate}T12:00`,
    startDate: firstDate,
    nextDate: "",
    active: true,
    generatedCount: 0,
    note: "",
  };
  item.nextDate = computeInitialNextDate(item, new Date());
  return item;
}

/** 将总账本中典型的保险账单关联到周期规则（仅宝宝保险；多保单请手动建周期 + 用二级名称区分） */
function bootstrapInsuranceRecurring(data) {
  if (!data?.transactions?.length) return false;
  if (!data.recurring) data.recurring = [];
  let dirty = false;

  const spec = {
    title: "宝宝保险",
    category: "吞金兽",
    subcategory: "宝宝保险",
    defaultAmount: 75,
    flow: "expense",
    match: (t) => t.flow === "expense" && (
      (t.category === "吞金兽" && t.subcategory === "宝宝保险") ||
      (Number(t.amount) === 75 && String(t.note || "").includes("宝宝保险"))
    ),
    defaultAnchor: "2024-10-05",
    anchorFromLatest: true,
  };

  const matches = data.transactions.filter(spec.match);
  if (!matches.length) return dirty;

  let item = data.recurring.find((r) => r.title === spec.title && r.category === spec.category);
  if (!item) {
    item = createRecurringItemFromTxStream(
      spec,
      spec.title,
      spec.defaultAmount ?? matches[matches.length - 1].amount,
      matches,
    );
    data.recurring.push(item);
    dirty = true;
  }

  for (const t of matches) {
    if (String(t.linkedRecurringId || "") === item.id) continue;
    t.linkedRecurringId = item.id;
    t.tags = [...new Set([...(t.tags || []), "周期"])];
    dirty = true;
  }
  return dirty;
}

function syncSubscriptionsFromTransactions(_data) {
  // 不再自动从历史账单创建订阅规则（易误匹配并触发批量回填）
  return false;
}

function findSubscriptionItemByName(name, subscriptions) {
  const n = String(name || "").trim();
  if (!n || !subscriptions?.length) return null;
  const direct = subscriptions.find((s) => {
    const sn = String(s.name || "").trim();
    const ss = String(s.subcategory || "").trim();
    return sn === n || ss === n;
  });
  if (direct) return direct;
  return subscriptions.find((s) => {
    const preset = resolveSubscriptionPreset(s);
    const keys = [...new Set([s.name, s.subcategory, preset?.name, preset?.subcategory].filter(Boolean))];
    return keys.some((k) => String(k).trim() === n);
  }) || null;
}

function findRecurringItemByName(name, recurring, categoryName) {
  const n = String(name || "").trim();
  if (!n || !recurring?.length) return null;
  const base = recurringTitleBase(n);
  return recurring.find((r) => {
    if (categoryName && r.category !== categoryName) return false;
    const title = String(r.title || "").trim();
    const sub = String(r.subcategory || "").trim();
    return title === n || sub === n || recurringTitleBase(title) === base;
  }) || null;
}

function billLinksToSubcategory(bill, categoryName, subName) {
  const sn = String(subName || "").trim();
  if (!sn || bill.category !== categoryName) return false;
  const keys = [bill.subcategory, bill.name, bill.title]
    .map((x) => String(x || "").trim())
    .filter(Boolean);
  return keys.includes(sn);
}

function syncSubcategoryIcon(data, categoryName, subName, iconPayload) {
  if (!data?.categories || !categoryName || !subName) return false;
  const cat = data.categories.find((c) => c.name === categoryName);
  if (!cat) return false;
  normalizeCategorySubs(cat);
  const sn = String(subName).trim();
  const idx = cat.subcategories.findIndex((s) => subcategoryName(s) === sn);
  const prev = idx >= 0 ? normalizeSubcategory(cat.subcategories[idx]) : null;
  const next = normalizeSubcategory({
    ...(prev || { name: sn, keywords: [] }),
    name: sn,
    icon: iconPayload.icon ?? prev?.icon ?? "",
    iconUrl: iconPayload.iconUrl ?? prev?.iconUrl ?? "",
  });
  const unchanged = prev
    && prev.icon === next.icon
    && prev.iconUrl === next.iconUrl;
  if (unchanged) return false;
  if (idx >= 0) cat.subcategories[idx] = next;
  else {
    cat.subcategories.push(next);
    cat.subcategories.sort((a, b) => subcategoryName(a).localeCompare(subcategoryName(b), "zh"));
  }
  return true;
}

function syncLinkedBillIcons(data, categoryName, subName, iconPayload) {
  if (!data || !categoryName || !subName) return false;
  let dirty = false;
  const payload = {
    icon: iconPayload.icon ?? "",
    iconUrl: iconPayload.iconUrl ?? "",
  };
  for (const s of data.subscriptions || []) {
    if (!billLinksToSubcategory(s, categoryName, subName)) continue;
    if (s.icon === payload.icon && (s.iconUrl || "") === payload.iconUrl) continue;
    s.icon = payload.icon;
    s.iconUrl = payload.iconUrl;
    if (payload.iconUrl) s.domain = "";
    dirty = true;
  }
  for (const r of data.recurring || []) {
    if (!billLinksToSubcategory(r, categoryName, subName)) continue;
    if (r.icon === payload.icon && (r.iconUrl || "") === payload.iconUrl) continue;
    r.icon = payload.icon;
    r.iconUrl = payload.iconUrl;
    if (payload.iconUrl) r.domain = "";
    dirty = true;
  }
  return dirty;
}

function syncBillIconWithSubcategory(data, bill) {
  if (!data || !bill?.category) return false;
  const subName = String(bill.subcategory || bill.name || bill.title || "").trim();
  if (!subName) return false;
  const payload = { icon: bill.icon || "", iconUrl: bill.iconUrl || "" };
  const a = syncSubcategoryIcon(data, bill.category, subName, payload);
  const b = syncLinkedBillIcons(data, bill.category, subName, payload);
  return a || b;
}

function syncSubcategoryIconWithBills(data, categoryName, subName, iconPayload) {
  const a = syncSubcategoryIcon(data, categoryName, subName, iconPayload);
  const b = syncLinkedBillIcons(data, categoryName, subName, iconPayload);
  return a || b;
}

function seedBillIconFromSubcategory(bill, categories) {
  if (!bill || bill.iconUrl) return bill;
  const cat = (categories || []).find((c) => c.name === bill.category);
  const subName = String(bill.subcategory || bill.name || bill.title || "").trim();
  const subMeta = subName ? findSubcategoryMeta(cat, subName) : null;
  if (!subMeta) return bill;
  const norm = normalizeSubcategory(subMeta);
  if (norm.iconUrl) {
    return { ...bill, icon: norm.icon || bill.icon, iconUrl: norm.iconUrl };
  }
  if (norm.icon && !bill.icon) {
    return { ...bill, icon: norm.icon };
  }
  return bill;
}

function bootstrapBillSubcategoryIcons(data) {
  if (!data?.categories) return false;
  let dirty = false;
  for (const cat of data.categories) {
    for (const raw of cat.subcategories || []) {
      const sub = normalizeSubcategory(raw);
      if (!sub.name) continue;
      const bills = [];
      for (const s of data.subscriptions || []) {
        if (billLinksToSubcategory(s, cat.name, sub.name)) bills.push(s);
      }
      for (const r of data.recurring || []) {
        if (billLinksToSubcategory(r, cat.name, sub.name)) bills.push(r);
      }
      if (!bills.length) continue;
      const billWithUrl = bills.find((b) => b.iconUrl);
      const payload = sub.iconUrl
        ? { icon: sub.icon, iconUrl: sub.iconUrl }
        : billWithUrl
          ? { icon: billWithUrl.icon, iconUrl: billWithUrl.iconUrl }
          : null;
      if (!payload) continue;
      if (!sub.iconUrl && billWithUrl) {
        if (syncSubcategoryIcon(data, cat.name, sub.name, payload)) dirty = true;
      }
      if (syncLinkedBillIcons(data, cat.name, sub.name, payload)) dirty = true;
    }
  }
  return dirty;
}

function enrichSubcategoryWithPreset(meta, categoryName, subscriptions, recurring) {
  const m = normalizeSubcategory(meta);
  if (m.iconUrl) return m;

  const linkedSub = findSubscriptionItemByName(m.name, subscriptions);
  if (linkedSub?.iconUrl) {
    const preset = resolveSubscriptionPreset(linkedSub);
    return {
      ...m,
      iconUrl: linkedSub.iconUrl,
      domain: linkedSub.domain || preset?.domain || "",
      color: linkedSub.color || preset?.color || "",
      icon: linkedSub.icon || preset?.abbr || m.icon || subscriptionAbbr(m.name),
    };
  }
  if (linkedSub?.icon && linkedSub.icon !== subscriptionAbbr(m.name)) {
    const preset = resolveSubscriptionPreset(linkedSub);
    return {
      ...m,
      icon: linkedSub.icon || preset?.abbr || m.icon,
      domain: linkedSub.domain || preset?.domain || "",
      color: linkedSub.color || preset?.color || "",
    };
  }

  const linkedRec = findRecurringItemByName(m.name, recurring, categoryName);
  if (linkedRec?.iconUrl) {
    return {
      ...m,
      iconUrl: linkedRec.iconUrl,
      icon: linkedRec.icon || m.icon || subscriptionAbbr(m.name),
    };
  }
  if (linkedRec?.icon && linkedRec.icon !== subscriptionAbbr(m.name)) {
    return {
      ...m,
      icon: linkedRec.icon || m.icon,
    };
  }

  const preset = findSubscriptionPreset(m.name)
    || matchTxToSubscriptionPreset({
      subcategory: m.name,
      category: categoryName || DEFAULT_SUBSCRIPTION_LEDGER_CATEGORY,
      note: m.name,
    });
  if (!preset) return m;
  return {
    ...m,
    domain: preset.domain || "",
    color: preset.color || "",
    icon: preset.abbr || m.icon || subscriptionAbbr(m.name),
  };
}

function subscriptionAbbr(name) {
  const clean = String(name || "").replace(/[^a-zA-Z0-9\u4e00-\u9fff]/g, "");
  if (/^[a-zA-Z]/.test(clean)) return clean.slice(0, 2).toUpperCase();
  return clean.slice(0, 1) || "订";
}

function brandIconDataUri(color, abbr) {
  const safe = String(abbr || "订").replace(/[<>&'"]/g, "").slice(0, 2);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${color || "#c9a88a"}"/><text x="32" y="40" text-anchor="middle" fill="#ffffff" font-size="24" font-family="system-ui,sans-serif" font-weight="700">${safe}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function subscriptionIconLooksLoaded(img) {
  return !!(img && img.complete && img.naturalWidth >= 16 && img.naturalHeight >= 16);
}

function syncSubscriptionIconWrap(wrap, img, fallbackSrc) {
  const src = String(img?.currentSrc || img?.src || "");
  const isBrandFallback = src.startsWith("data:image/svg+xml") || src === fallbackSrc;
  if (isBrandFallback) {
    wrap.removeClass("has-img");
    return;
  }
  if (subscriptionIconLooksLoaded(img)) wrap.addClass("has-img");
  else wrap.removeClass("has-img");
}

async function tryLoadRemoteFavicon(img, _domain, fallbackSrc, wrap) {
  // 社区审核：不请求 DuckDuckGo / Google favicon
  if (img && fallbackSrc) {
    img.src = fallbackSrc;
    syncSubscriptionIconWrap(wrap, img, fallbackSrc);
  }
  return false;
}

function renderSubscriptionIcon(parent, presetOrItem, plugin) {
  const raw = typeof presetOrItem === "string" ? { name: presetOrItem } : (presetOrItem || {});
  const preset = resolveSubscriptionPreset(raw) || findSubscriptionPreset(raw.name) || {};
  const wrap = parent.createDiv({ cls: "plg-sub-app-icon" });
  const color = raw.color || preset.color || "#c9a88a";
  const name = raw.name || preset.name || "";
  const abbr = preset.abbr || raw.icon || subscriptionAbbr(name);
  applyCssProps(wrap, { "--brand": color });

  if (raw.iconUrl && (raw.iconUrl.startsWith("data:") || raw.iconUrl.startsWith("http"))) {
    if (isSvgIconUrl(raw.iconUrl)) {
      const svg = decodeSvgDataUrl(raw.iconUrl);
      if (svg) {
        wrap.addClass("has-img", "has-svg");
        const slot = wrap.createDiv({ cls: "plg-cat-icon-svg" });
        setSvgContent(slot, normalizeIconfontSvg(svg));
        return wrap;
      }
    }
    wrap.createDiv({ cls: "plg-sub-app-icon-fallback", text: abbr });
    const fallbackSrc = brandIconDataUri(color, abbr);
    wrap.addClass("has-img");
    const img = wrap.createEl("img", {
      cls: "plg-sub-app-icon-img",
      attr: { src: raw.iconUrl, alt: name, loading: "lazy", referrerpolicy: "no-referrer" },
    });
    const onCustomIcon = () => syncSubscriptionIconWrap(wrap, img, fallbackSrc);
    img.addEventListener("load", onCustomIcon);
    img.addEventListener("error", () => {
      wrap.removeClass("has-img");
      img.src = fallbackSrc;
      syncSubscriptionIconWrap(wrap, img, fallbackSrc);
    });
    if (img.complete) onCustomIcon();
    return wrap;
  }

  wrap.createDiv({ cls: "plg-sub-app-icon-fallback", text: abbr });
  const domain = raw.domain || preset.domain;
  const fallbackSrc = brandIconDataUri(color, abbr);
  const img = wrap.createEl("img", {
    cls: "plg-sub-app-icon-img",
    attr: {
      src: fallbackSrc,
      alt: name,
      loading: "lazy",
      referrerpolicy: "no-referrer",
    },
  });
  const onImgChange = () => syncSubscriptionIconWrap(wrap, img, fallbackSrc);
  img.addEventListener("load", onImgChange);
  img.addEventListener("error", () => {
    img.src = fallbackSrc;
    syncSubscriptionIconWrap(wrap, img, fallbackSrc);
  });
  onImgChange();
  if (domain) tryLoadRemoteFavicon(img, domain, fallbackSrc, wrap);
  return wrap;
}

function categoryInitialIcon(name) {
  const n = (name || "").trim();
  if (!n) return "·";
  return [...n][0] || "·";
}

function effectiveCategoryIcon(meta) {
  const name = meta?.name || "";
  if (meta?.iconUrl && (meta.iconUrl.startsWith("data:") || meta.iconUrl.startsWith("http"))) {
    return meta.icon || categoryInitialIcon(name);
  }
  const icon = meta?.icon;
  if (!icon || icon === "📌") return categoryInitialIcon(name);
  return icon;
}

function parseKeywordInput(text) {
  return [...new Set(String(text || "").split(/\s+/).map((k) => k.trim()).filter(Boolean))];
}

function formatKeywordInput(keywords) {
  return (keywords || []).join(" ");
}

function subcategoryName(sub) {
  if (!sub) return "";
  return typeof sub === "string" ? sub : (sub.name || "");
}

function normalizeSubcategory(sub) {
  if (!sub) return { name: "", icon: categoryInitialIcon(""), iconUrl: "", keywords: [] };
  if (typeof sub === "string") {
    const name = sub;
    const { icon, iconUrl } = seedSubcategoryIcon(name, "", "");
    return {
      name,
      icon,
      iconUrl: "",
      keywords: seedSubcategoryKeywords(name, []),
    };
  }
  const name = sub.name || "";
  const { icon, iconUrl } = seedSubcategoryIcon(name, sub.icon, sub.iconUrl);
  return {
    name,
    icon: effectiveCategoryIcon({ name, icon, iconUrl }),
    iconUrl: iconUrl || "",
    keywords: seedSubcategoryKeywords(name, sub.keywords || []),
  };
}

function buildDefaultSubIconMap() {
  return {
    水果: "🍎",
    尿不湿: "🧻",
    保险: "🛡️",
    宝宝保险: "🛡️",
    午餐: "🍱",
    早饭: "🍳",
    早餐: "🍳",
    晚饭: "🍽️",
    晚餐: "🍽️",
    茶饮: "🥤",
    奶茶: "🧋",
    咖啡: "☕",
    买菜: "🥬",
    米面粮油: "🌾",
    电费: "💡",
    水费: "🚰",
    物业费: "🏢",
    房贷: "🏠",
    信用卡: "💳",
    理发: "💇",
    手机话费: "📱",
    话费: "📱",
    打的: "🚕",
    停车费: "🅿️",
    奶粉: "🍼",
    玩具: "🧸",
    礼物: "🎁",
    服饰: "👔",
    孝心: "❤️",
    麻将: "🀄",
    斗地主: "🃏",
    棋牌: "🎴",
    维修: "🔧",
    洗护用品: "🧴",
    烟酒茶: "🍷",
    通讯: "📡",
    Ai充值: "🤖",
  };
}

const DEFAULT_SUB_ICONS = buildDefaultSubIconMap();

function isInitialSubIcon(name, icon) {
  const cur = String(icon || "").trim();
  if (!cur || cur === "📌") return true;
  if (cur.length === 1) return true;
  const initial = categoryInitialIcon(name);
  return cur === initial;
}

function seedSubcategoryIcon(name, icon, iconUrl) {
  if (iconUrl) return { icon: icon || categoryInitialIcon(name), iconUrl };
  const preset = DEFAULT_SUB_ICONS[name];
  const cur = String(icon || "").trim();
  if (preset && isInitialSubIcon(name, cur)) {
    return { icon: preset, iconUrl: "" };
  }
  return { icon: cur || categoryInitialIcon(name), iconUrl: "" };
}

/** 上传图标压缩为统一尺寸，展示与 emoji 一致 */
function compressIconImageFile(file, maxPx = 128) {
  return new Promise((resolve, reject) => {
    if (!file || !String(file.type || "").startsWith("image/")) {
      reject(new Error("invalid image"));
      return;
    }
    if (file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(reader.error || new Error("read failed"));
      reader.readAsDataURL(file);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const w = img.naturalWidth || img.width || maxPx;
        const h = img.naturalHeight || img.height || maxPx;
        const scale = Math.min(1, maxPx / Math.max(w, h, 1));
        const tw = Math.max(1, Math.round(w * scale));
        const th = Math.max(1, Math.round(h * scale));
        const canvas = document.createElement("canvas");
        canvas.width = tw;
        canvas.height = th;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(String(reader.result || ""));
          return;
        }
        ctx.drawImage(img, 0, 0, tw, th);
        let dataUrl = "";
        try {
          dataUrl = canvas.toDataURL("image/webp", 0.86);
          if (!dataUrl.startsWith("data:image/webp")) dataUrl = canvas.toDataURL("image/jpeg", 0.86);
        } catch {
          dataUrl = canvas.toDataURL("image/png");
        }
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error("load failed"));
      img.src = String(reader.result || "");
    };
    reader.onerror = () => reject(reader.error || new Error("read failed"));
    reader.readAsDataURL(file);
  });
}

/** 将已存储的 data URL 图标统一压缩为 PNG（maxPx 像素） */
function rasterizeDataUrlToPng(dataUrl, maxPx = 128) {
  return new Promise((resolve) => {
    const raw = String(dataUrl || "").trim();
    if (!raw.startsWith("data:")) {
      resolve(raw);
      return;
    }
    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth || 0;
      const h = img.naturalHeight || 0;
      if (w > 0 && h > 0 && w <= maxPx && h <= maxPx && /^data:image\/png/i.test(raw)) {
        resolve(raw);
        return;
      }
      const sw = w || maxPx;
      const sh = h || maxPx;
      const scale = Math.min(1, maxPx / Math.max(sw, sh, 1));
      const tw = Math.max(1, Math.round(sw * scale));
      const th = Math.max(1, Math.round(sh * scale));
      const canvas = document.createElement("canvas");
      canvas.width = tw;
      canvas.height = th;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(raw);
        return;
      }
      ctx.drawImage(img, 0, 0, tw, th);
      try {
        const png = canvas.toDataURL("image/png");
        resolve(png && png.length > 80 ? png : raw);
      } catch {
        resolve(raw);
      }
    };
    img.onerror = () => resolve(raw);
    img.src = raw;
  });
}

async function normalizeStoredIconUrl(iconUrl, maxPx = 128) {
  const raw = String(iconUrl || "").trim();
  if (!raw || !raw.startsWith("data:")) return raw;
  if (isSvgIconUrl(raw)) {
    const svg = decodeSvgDataUrl(raw);
    if (!svg) return raw;
    const png = await rasterizeSvgToPngDataUrl(normalizeIconfontSvg(svg));
    return png && png.length > 120 ? png : raw;
  }
  return rasterizeDataUrlToPng(raw, maxPx);
}

async function normalizeAllStoredIcons(data, maxPx = 128) {
  let changed = false;
  const touch = async (obj) => {
    if (!obj?.iconUrl || !String(obj.iconUrl).startsWith("data:")) return;
    const next = await normalizeStoredIconUrl(obj.iconUrl, maxPx);
    if (next && next !== obj.iconUrl) {
      obj.iconUrl = next;
      changed = true;
    }
  };
  const jobs = [];
  (data.categories || []).forEach((cat) => {
    jobs.push(touch(cat));
    (cat.subcategories || []).forEach((sub) => jobs.push(touch(normalizeSubcategory(sub))));
  });
  (data.subscriptions || []).forEach((s) => jobs.push(touch(s)));
  await Promise.all(jobs);
  return changed;
}

function buildDefaultSubKeywordMap() {
  const map = {};
  SUBSCRIPTION_PRESETS.forEach((p) => {
    const sub = p.subcategory || p.name;
    const tokens = [...new Set([p.name, p.subcategory].filter(Boolean))];
    map[sub] = [...new Set([...(map[sub] || []), ...tokens])];
  });
  const extra = {
    买菜: ["买菜", "菜市场", "超市", "菜场"],
    水果: ["水果", "果切"],
    电费: ["电费", "缴电费", "电力"],
    米面粮油: ["米面", "粮油", "大米", "面粉"],
    午餐: ["午餐", "午饭", "中饭"],
    晚饭: ["晚餐", "晚饭", "夜宵"],
    早饭: ["早餐", "早饭", "早点"],
    茶饮: ["奶茶", "咖啡", "茶饮", "饮料"],
    打的: ["打车", "滴滴", "出租", "网约车"],
    停车费: ["停车", "停车费"],
    房贷: ["房贷", "月供", "按揭"],
    信用卡: ["信用卡", "还款"],
    保险: ["保险", "保费", "保单"],
    尿不湿: ["尿不湿", "纸尿裤", "拉拉裤", "尿片"],
    宝宝保险: ["宝宝保险", "少儿保险", "儿童保险"],
    奶粉: ["奶粉", "配方奶"],
    玩具: ["玩具", "积木"],
    礼物: ["礼物", "礼品"],
    服饰: ["衣服", "服饰", "童装"],
    孝心: ["孝心", "孝敬"],
    维修: ["维修", "修理"],
    洗护用品: ["洗护", "洗衣液", "沐浴露"],
    烟酒茶: ["烟酒", "茶叶", "香烟"],
    通讯: ["话费", "流量", "宽带"],
    物业费: ["物业费", "物业"],
    水费: ["水费", "自来水"],
    Ai充值: ["Ai充值", "AI充值", "Cursor", "ChatGPT", "Claude", "Gemini"],
    手工素材: ["手工", "素材", "文具"],
    理发: ["理发", "剪发", "美发"],
    手机话费: ["话费", "充值", "流量"],
    麻将: ["麻将", "搓麻", "打牌"],
    斗地主: ["斗地主", "扑克"],
    棋牌: ["棋牌", "麻将", "斗地主", "扑克"],
  };
  Object.entries(extra).forEach(([k, v]) => {
    map[k] = [...new Set([...(map[k] || []), ...v])];
  });
  return map;
}

const DEFAULT_SUB_KEYWORDS = buildDefaultSubKeywordMap();

function seedSubcategoryKeywords(name, existing) {
  const list = [...new Set((existing || []).filter(Boolean))];
  const defaults = DEFAULT_SUB_KEYWORDS[name] || [];
  return [...new Set([...list, ...defaults])];
}

function syncSubcategoryDefaults(data) {
  if (!data?.categories?.length) return false;
  let changed = false;
  data.categories.forEach((cat) => {
    if (!cat.subcategories?.length) return;
    const nextSubs = cat.subcategories.map((sub) => {
      const raw = typeof sub === "string" ? { name: sub } : { ...sub };
      const norm = normalizeSubcategory(raw);
      const before = JSON.stringify(sub);
      const after = JSON.stringify(norm);
      if (before !== after) changed = true;
      return norm;
    });
    cat.subcategories = nextSubs;
  });
  return changed;
}

function normalizeCategorySubs(cat) {
  if (!cat.subcategories) cat.subcategories = [];
  cat.subcategories = cat.subcategories.map(normalizeSubcategory);
  cat.subcategories.sort((a, b) => subcategoryName(a).localeCompare(subcategoryName(b), "zh"));
}

function renderIconUrlContent(wrap, iconUrl, alt = "") {
  if (!iconUrl) return false;
  if (isSvgIconUrl(iconUrl)) {
    const svg = decodeSvgDataUrl(iconUrl);
    if (svg) {
      wrap.addClass("has-img", "has-svg");
      const slot = wrap.createDiv({ cls: "plg-cat-icon-svg" });
      setSvgContent(slot, normalizeIconfontSvg(svg));
      return true;
    }
  }
  if (iconUrl.startsWith("data:") || iconUrl.startsWith("http")) {
    wrap.addClass("has-img");
    wrap.createEl("img", {
      cls: "plg-cat-icon-img",
      attr: { src: iconUrl, alt: alt || "" },
    });
    return true;
  }
  return false;
}

function renderCategoryIcon(parent, cat, opts = {}) {
  const meta = cat || {};
  const slotCls = opts.panelIcon ? " plg-panel-icon-slot" : "";
  if (!meta.iconUrl && meta.domain) {
    const slot = parent.createDiv({ cls: "plg-cat-icon-wrap has-sub-brand" + slotCls });
    renderSubscriptionIcon(slot, meta);
    return slot;
  }
  const wrap = parent.createDiv({ cls: "plg-cat-icon-wrap" + slotCls });
  if (renderIconUrlContent(wrap, meta.iconUrl, meta.name)) {
    return wrap;
  }
  wrap.addClass("no-bg");
  wrap.createDiv({ cls: "plg-cat-icon", text: effectiveCategoryIcon(meta) });
  return wrap;
}

function findSubcategoryMeta(cat, subName) {
  const name = String(subName || "").trim();
  if (!cat || !name) return null;
  const subs = cat.subcategories || [];
  const exact = subs.find((s) => subcategoryName(s) === name);
  if (exact) return exact;
  const lower = name.toLowerCase();
  return subs.find((s) => subcategoryName(s).toLowerCase() === lower) || null;
}

function buildTransactionDisplayTitle(categories, t) {
  const cat = (categories || []).find((c) => c.name === t.category);
  const catName = cat?.name || t.category || "";
  const subRaw = String(t.subcategory || "").trim();
  if (!subRaw) return catName;
  const subMeta = findSubcategoryMeta(cat, subRaw);
  const subName = subMeta ? subcategoryName(subMeta) : subRaw;
  return `${catName}·${subName}`;
}

/** 入账预览/列表：优先二级分类图标，否则用一级（含 iconUrl） */
function getTransactionIconMeta(categories, categoryName, subName, subscriptions, recurring) {
  const cat = (categories || []).find((c) => c.name === categoryName);
  if (!cat) return { name: categoryName || "", icon: "📌", iconUrl: "" };
  const sub = findSubcategoryMeta(cat, subName);
  if (sub) return enrichSubcategoryWithPreset(sub, categoryName, subscriptions, recurring);
  if (String(subName || "").trim()) {
    return enrichSubcategoryWithPreset(
      { name: String(subName).trim(), icon: "", iconUrl: "" },
      categoryName,
      subscriptions,
      recurring,
    );
  }
  return {
    name: cat.name,
    icon: cat.icon,
    iconUrl: cat.iconUrl || "",
  };
}

function renderCategoryLabel(parent, meta, opts = {}) {
  const label = parent.createDiv({ cls: "plg-cat-label" });
  const displayMeta = enrichSubcategoryWithPreset(
    normalizeSubcategory(meta),
    opts.categoryName || "",
    opts.subscriptions || [],
    opts.recurring || [],
  );
  renderCategoryIcon(label, displayMeta);
  if (opts.multiline) {
    const info = label.createDiv({ cls: "plg-cat-info" });
    info.createDiv({ cls: "plg-cat-name", text: displayMeta.name || opts.name || "" });
    if (opts.subtitle) info.createDiv({ cls: "plg-muted", text: opts.subtitle });
    return { label, info };
  }
  const textCol = label.createDiv({ cls: "plg-cat-label-text" });
  textCol.createEl("span", {
    cls: opts.nameClass || "plg-cat-label-name",
    text: displayMeta.name || opts.name || "",
  });
  if (opts.subtitle) textCol.createDiv({ cls: "plg-muted plg-cat-label-sub", text: opts.subtitle });
  return { label, nameEl: textCol };
}
