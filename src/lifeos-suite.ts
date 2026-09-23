const LIFEOS_PLUGIN_CATALOG = [
  {
    id: "plain-ledger",
    name: "PlainLedger",
    intro: "专为 Obsidian 开发的记账软件",
    philosophy: "记账不必离开笔记——PlainLedger 把账单、分类、订阅规则保存在 Obsidian 库内，随 iCloud / Git 同步，和日记、复盘同屏共存",
    price: "¥39.9",
    repoUrl: "https://github.com/xileshuo/plain-ledger-obsidian",
  },
  {
    id: "jinianri",
    name: "纪念日",
    intro: "专为 Obsidian 开发的纪念日管理软件",
    philosophy: "记录生日、恋爱、婚姻等重要日期，自动计算「已过时长」与「距离下次还有几天」，支持三档提醒与 iCal 导出",
    price: "¥29.9",
    repoUrl: "https://github.com/xileshuo/jinianri",
  },
  {
    id: "braincore-lifeos",
    name: "BrainCore LifeOS",
    intro: "专为 Obsidian 开发的生活管理控制台",
    philosophy: "Obsidian 知识库的「核心呼吸机」，它由 7 大模块组成，涵盖了时间感知、极速收集、工作流转、习惯养成与知识内化。一切信息从这里输入，最终也会在这里沉淀",
    price: "¥49.9",
    repoUrl: "https://github.com/xileshuo/BrainCore-LifeOS",
  },
];

const LIFEOS_AUTHOR_NAME = "囍樂";
const LIFEOS_COPYRIGHT = "所有版权©囍樂說。保留所有权利。";
const LIFEOS_AUTHOR_HOMEPAGE = "https://xhslink.com/m/3uOoUHv2rI1";

function getLifeOsVaultKey(app, suffix) {
  const vaultName = app.vault?.getName?.() || "UnknownVault";
  return `lifeos:${vaultName}:${suffix}`;
}

function getEnabledLifeOsPlugins(app) {
  const plugins = app.plugins?.plugins || {};
  return LIFEOS_PLUGIN_CATALOG.filter((p) => {
    const inst =
      plugins[p.id] ||
      (p.id === "braincore-lifeos"
        ? plugins["braincore-lifeos-personal"] || plugins["braincore-dashboard"]
        : null);
    return inst && inst._loaded !== false;
  });
}

function getLifeOsPeerNames(app, selfId) {
  const braincoreFamily = new Set(["braincore-lifeos", "braincore-lifeos-personal", "braincore-dashboard"]);
  return getEnabledLifeOsPlugins(app)
    .filter((p) => {
      if (p.id === selfId) return false;
      if (braincoreFamily.has(selfId) && p.id === "braincore-lifeos") return false;
      return true;
    })
    .map((p) => p.name);
}

function maybeShowLifeOsSuitePrompt(app, selfId, selfName) {
  const peers = getLifeOsPeerNames(app, selfId);
  if (peers.length === 0) return;
  const storageKey = getLifeOsVaultKey(app, "suitePromptSeen");
  try {
    if (localStorage.getItem(storageKey) === "1") return;
  } catch { /* ignore */ }
  const peerText = peers.join("、");
  window.setTimeout(() => {
    new Notice(`${selfName} 可与 ${peerText} 并排使用，数据均保存在同一 Obsidian 库内。`, 8000);
    try { localStorage.setItem(storageKey, "1"); } catch { /* ignore */ }
  }, 2200);
}

function openLifeOsExternalUrl(url) {
  if (!url) return;
  try {
    window.open(url, "_blank");
  } catch (err) {
    console.warn("[LifeOS] open external url", err);
  }
}

function injectLifeOsActivationStyles() {
  /* CSS lives in styles.css (community plugin: no runtime <style> injection). */
}

function renderLifeOsActivationPanel(container, config) {
  injectLifeOsActivationStyles();
  container.empty();
  container.addClass("lifeos-act-panel");
  if (config.extraPanelClass) container.addClass(config.extraPanelClass);

  const wrap = container.createDiv({ cls: "lifeos-act-wrap" });
  const card = wrap.createDiv({ cls: "lifeos-act-card" });

  card.createDiv({ cls: "lifeos-act-title", text: config.pluginName || "LifeOS" });

  const statusText = typeof config.getStatusText === "function" ? config.getStatusText() : "";
  if (statusText) {
    card.createEl("p", { cls: "lifeos-act-status", text: statusText });
  }

  if (config.philosophy) {
    const phil = card.createEl("p", { cls: "lifeos-act-philosophy lifeos-philosophy-intro", text: config.philosophy });
    phil.addClass("lifeos-philosophy-intro");
  }

  if (config.activationPreviewRows?.length) {
    renderLifeOsActivationPreview(card, config.activationPreviewRows, config.activationPreviewNote);
  }

  if (config.showTrialButton && typeof config.onTrialStart === "function") {
    const trialBtn = card.createEl("button", {
      cls: "lifeos-act-trial-btn mod-cta",
      text: config.trialButtonLabel || "开启试用",
      type: "button",
    });
    trialBtn.onclick = () => void config.onTrialStart();
  }

  const fp = typeof config.getFingerprint === "function" ? config.getFingerprint() : "";
  const fpRow = card.createDiv({ cls: "lifeos-act-row" });
  const fpInput = fpRow.createEl("input", {
    type: "text",
    cls: "lifeos-act-input lifeos-act-fp",
    attr: { readonly: "readonly", value: fp, "aria-label": "设备指纹" },
  });
  fpInput.onclick = () => fpInput.select();
  const copyBtn = fpRow.createEl("button", {
    cls: "lifeos-act-btn",
    text: "复制",
    type: "button",
  });
  copyBtn.onclick = () => {
    if (typeof config.onCopyFingerprint === "function") void config.onCopyFingerprint(fp);
  };

  const keyRow = card.createDiv({ cls: "lifeos-act-row" });
  const keyInput = keyRow.createEl("input", {
    type: "text",
    cls: "lifeos-act-input lifeos-act-key",
    attr: { placeholder: "输入激活码", "aria-label": "激活码" },
  });
  if (config.licenseKey) keyInput.value = config.licenseKey;
  const activateBtn = keyRow.createEl("button", {
    cls: "lifeos-act-btn lifeos-act-btn-primary",
    text: config.activateShortLabel || "验证并激活",
    type: "button",
  });

  const msgEl = card.createDiv({ cls: "lifeos-act-msg" });

  const nav = card.createDiv({ cls: "lifeos-act-nav" });
  const row1 = nav.createDiv({ cls: "lifeos-act-nav-row" });
  const row2 = nav.createDiv({ cls: "lifeos-act-nav-row" });
  const mkNav = (parent, label, onClick) => {
    const btn = parent.createEl("button", { cls: "lifeos-act-nav-btn", text: label, type: "button" });
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      void onClick();
    };
  };
  mkNav(row1, "使用说明", () => config.openUsageGuide?.());
  mkNav(row1, "更新日志", () => openLifeOsUpdateNoticeFromPlugin(config.updateNoticeTarget));
  mkNav(row2, "配置", () => config.openSettings?.());

  const activate = () => {
    const key = keyInput.value.trim();
    if (typeof config.onActivate === "function") void config.onActivate(key, msgEl, keyInput);
  };
  activateBtn.onclick = activate;
  keyInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") activate();
  });

  return { keyInput, msgEl, fpInput };
}

function injectLifeOsSettingsSharedStyles() {
  /* CSS lives in styles.css (community plugin: no runtime <style> injection). */
}

function injectLifeOsAboutStyles() {
  injectLifeOsSettingsSharedStyles();
}

const PLAINLEDGER_SHORTCUT_CAPTURE_URL = "obsidian://plainledger?action=capture";
const PLAINLEDGER_SHORTCUTS_GUIDE_PATH = "PlainLedger快捷指令使用指南.md";
const PLAINLEDGER_SHORTCUTS_GUIDE_BODY = `用 iOS「快捷指令」从主屏幕或背面轻点一键打开 PlainLedger「记一笔」，无需先翻找面板。

链接（复制到「打开 URL」）：

\`\`\`text
${PLAINLEDGER_SHORTCUT_CAPTURE_URL}
\`\`\`

---

## 一、部署（装到主屏幕）

在 iPhone 上打开「快捷指令」App：

1. 新建快捷指令
2. 添加操作 **打开 URL**
3. 粘贴上面的链接
4. （可选）名称改成「记一笔」或「PlainLedger」
5. **分享 → 添加到主屏幕**

只需「打开 URL」，不必再套「打开 App → Obsidian」。

链接也可在 Obsidian → 设置 → PlainLedger → **快捷指令** 一键复制。

---

## 二、使用

- **主屏幕图标**：点快捷指令，即可打开「记一笔」面板（默认智能录入）。
- **背面轻点**（免找图标，更快）：
  1. iPhone **设置 → 无障碍 → 触控 → 轻点背面**
  2. 选择 **轻点两下** 或 **轻点三下**
  3. 选中刚建好的快捷指令

---

## 三、说明

- 需已启用 PlainLedger；公版/体验版需在试用期内或已激活。
- 也可绑定 Obsidian 手机「下拉快捷命令」到命令 **记一笔**（与本链接效果类似）。
`;

async function openPlainLedgerShortcutsGuide(plugin) {
  const app = plugin?.app;
  if (!app?.vault) {
    new Notice("无法打开快捷指令说明");
    return;
  }
  try {
    const content = PLAINLEDGER_SHORTCUTS_GUIDE_BODY.endsWith("\n")
      ? PLAINLEDGER_SHORTCUTS_GUIDE_BODY
      : PLAINLEDGER_SHORTCUTS_GUIDE_BODY + "\n";
    let file = app.vault.getAbstractFileByPath(PLAINLEDGER_SHORTCUTS_GUIDE_PATH);
    if (!file) {
      const byName = (app.vault.getMarkdownFiles?.() || []).find((f) => f.basename === "PlainLedger快捷指令使用指南");
      if (byName) file = byName;
    }
    if (!file) {
      file = await app.vault.create(PLAINLEDGER_SHORTCUTS_GUIDE_PATH, content);
    } else {
      const old = await app.vault.read(file);
      if (old.trim() !== content.trim()) await app.vault.modify(file, content);
    }
    const leaf = app.workspace.getLeaf("tab");
    await leaf.openFile(file);
    app.workspace.revealLeaf(leaf);
  } catch (e) {
    console.warn("PlainLedger 快捷指令说明打开失败：", e);
    new Notice("无法打开快捷指令使用说明");
  }
}

/** 设置 → 快捷指令 Tab（对齐 BrainCore） */
function renderPlainLedgerShortcutsSettingsPanel(panel, plugin) {
  injectLifeOsSettingsSharedStyles();
  panel.empty();
  const wrap = panel.createDiv({ cls: "lifeos-about-panel lifeos-settings-grid" });
  const block = wrap.createDiv({ cls: "lifeos-settings-block" });
  new Setting(block).setName("快捷指令（iOS）").setHeading();
  block.createEl("p", {
    cls: "lifeos-settings-desc",
    text: "部署：在你的 iPhone 上打开「快捷指令」App：新建→「打开 URL」→粘贴链接→添加到主屏幕（具体可见使用指南）",
  });
  block.createEl("p", {
    cls: "lifeos-settings-desc",
    text: "使用：点击快捷指令，可快速打开「记一笔」；也可在 iPhone：设置→无障碍→触控→轻点背面→绑定该快捷指令",
  });

  const helpRows = block.createDiv();
  const guideRow = helpRows.createDiv({ cls: "lifeos-about-link-row" });
  guideRow.createSpan({ text: "快捷指令使用说明" });
  const guideBtn = guideRow.createEl("button", { text: "打开", type: "button" });
  guideBtn.onclick = () => void openPlainLedgerShortcutsGuide(plugin);

  const copyShortcutUrl = async (url) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        new Notice("链接已复制");
        return;
      }
    } catch (_) { /* fall through */ }
    new Notice("请手动全选复制链接");
  };
  block.createEl("p", { cls: "lifeos-about-meta", text: "记一笔链接" });
  const row = block.createDiv({ cls: "lifeos-act-row" });
  const input = row.createEl("input", {
    type: "text",
    cls: "lifeos-act-input",
    attr: { readonly: "readonly", value: PLAINLEDGER_SHORTCUT_CAPTURE_URL, "aria-label": "记一笔链接" },
  });
  input.onclick = () => input.select();
  const btn = row.createEl("button", { cls: "lifeos-act-btn", text: "复制", type: "button" });
  btn.onclick = () => void copyShortcutUrl(PLAINLEDGER_SHORTCUT_CAPTURE_URL);
}

function renderLifeOsAboutPanel(panel, plugin, options = {}) {
  injectLifeOsAboutStyles();
  panel.empty();
  const wrap = panel.createDiv({ cls: "lifeos-about-panel lifeos-settings-grid" });

  const helpBlock = wrap.createDiv({ cls: "lifeos-settings-block" });
  new Setting(helpBlock).setName("文档").setHeading();
  const helpRows = helpBlock.createDiv();
  const addLinkRow = (parent, label, onClick) => {
    const row = parent.createDiv({ cls: "lifeos-about-link-row" });
    row.createSpan({ text: label });
    const btn = row.createEl("button", { text: "打开", type: "button" });
    btn.onclick = () => void onClick();
  };
  addLinkRow(helpRows, "使用说明", () => {
    if (typeof options.openUsageGuide === "function") void options.openUsageGuide();
  });
  addLinkRow(helpRows, "更新日志", () => openLifeOsUpdateNoticeFromPlugin(plugin));

  const authorBlock = wrap.createDiv({ cls: "lifeos-settings-block" });
  new Setting(authorBlock).setName("作者").setHeading();
  authorBlock.createEl("p", { cls: "lifeos-about-meta", text: `作者：${LIFEOS_AUTHOR_NAME}` });
  authorBlock.createEl("p", { cls: "lifeos-about-meta", text: `版权信息：${LIFEOS_COPYRIGHT}` });
  const homeRow = authorBlock.createDiv({ cls: "lifeos-about-home-row" });
  homeRow.createSpan({ text: "主页：" });
  const homeLink = homeRow.createEl("a", {
    cls: "lifeos-about-home-link",
    text: LIFEOS_AUTHOR_HOMEPAGE,
    href: LIFEOS_AUTHOR_HOMEPAGE,
  });
  homeLink.onclick = (e) => {
    e.preventDefault();
    openLifeOsExternalUrl(LIFEOS_AUTHOR_HOMEPAGE);
  };

  const worksBlock = wrap.createDiv({ cls: "lifeos-settings-block" });
  new Setting(worksBlock).setName("所有作品").setHeading();
  const enabled = getEnabledLifeOsPlugins(plugin.app);
  const selfId = plugin?.manifest?.id || options.selfId || "";
  worksBlock.createEl("p", {
    cls: "lifeos-suite-badge",
    text: `LifeOS 套装已安装 ${enabled.length}/3`,
  });
  const works = worksBlock.createDiv({ cls: "lifeos-about-works" });
  LIFEOS_PLUGIN_CATALOG.forEach((item) => {
    const itemEl = works.createDiv({ cls: "lifeos-about-work-item" });
    itemEl.createEl("p", { cls: "lifeos-about-work-name", text: item.name });
    itemEl.createEl("p", { cls: "lifeos-about-work-intro", text: item.intro });
    if (item.price) {
      itemEl.createEl("p", {
        cls: "lifeos-about-work-price",
        text: `48 小时试用 · ${item.price} 永久激活`,
      });
    }
    if (item.philosophy) {
      itemEl.createEl("p", { cls: "lifeos-about-work-philosophy", text: item.philosophy });
    }
    const actions = itemEl.createDiv({ cls: "lifeos-about-work-actions" });
    const installed = !!(
      plugin.app?.plugins?.plugins?.[item.id] ||
      (item.id === "braincore-lifeos" &&
        (plugin.app?.plugins?.plugins?.["braincore-lifeos-personal"] ||
          plugin.app?.plugins?.plugins?.["braincore-dashboard"]))
    );
    if (item.id === selfId) {
      actions.createEl("button", { text: "当前插件", type: "button", cls: "is-self" });
    } else if (installed) {
      const btn = actions.createEl("button", { text: "打开设置", type: "button" });
      btn.onclick = () => openLifeOsPluginSettings(plugin.app, item.id);
    } else {
      const btn = actions.createEl("button", { text: "去了解", type: "button" });
      btn.onclick = () => {
        if (item.repoUrl) openLifeOsExternalUrl(item.repoUrl);
        else new Notice(`请先在 Obsidian 设置 → 第三方插件 中启用 ${item.name}`);
      };
    }
  });
}

function renderLifeOsLicenseSettingsPanel(panel, config) {
  injectLifeOsSettingsSharedStyles();
  panel.empty();
  const grid = panel.createDiv({ cls: "lifeos-settings-grid" });
  const card = grid.createDiv({ cls: "lifeos-settings-block" });
  const heading = new Setting(card).setName("授权激活").setHeading();
  if (config.desc) heading.setDesc(config.desc);
  if (config.trialHint) card.createEl("p", { cls: "lifeos-license-trial-hint", text: config.trialHint });

  const fp = config.getFingerprint?.() || "";
  const fpRow = card.createDiv({ cls: "lifeos-act-row" });
  const fpInput = fpRow.createEl("input", {
    type: "text",
    cls: "lifeos-act-input lifeos-act-fp",
    attr: { readonly: "readonly", value: fp, "aria-label": "设备指纹" },
  });
  fpInput.onclick = () => fpInput.select();
  const copyBtn = fpRow.createEl("button", { cls: "lifeos-act-btn", text: "复制", type: "button" });
  copyBtn.onclick = () => void config.onCopyFingerprint?.(fp);

  let keyValue = config.licenseKey || "";
  const keyRow = card.createDiv({ cls: "lifeos-act-row" });
  const keyInput = keyRow.createEl("input", {
    type: "text",
    cls: "lifeos-act-input lifeos-act-key",
    attr: { placeholder: "输入激活码", "aria-label": "激活码" },
  });
  keyInput.value = keyValue;
  keyInput.addEventListener("input", () => { keyValue = keyInput.value.trim(); });
  const activateBtn = keyRow.createEl("button", {
    cls: "lifeos-act-btn lifeos-act-btn-primary",
    text: "验证并激活",
    type: "button",
  });
  activateBtn.onclick = () => void config.onActivate?.(keyValue.trim());
  keyInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") void config.onActivate?.(keyValue.trim());
  });

  if (config.activated) {
    card.createEl("p", { cls: "lifeos-license-status", text: "已激活，永久有效" });
  }
}

function getLifeOsMaxOverlayZIndex() {
  let max = 100000;
  const nodes = document.querySelectorAll(
    ".modal-container, .modal-bg, .modal, .vertical-tab-content, .vertical-tab-header, .menu, .suggestion-container, .popover, .workspace-leaf-content, .plg-overlay, .lifeos-overlay"
  );
  nodes.forEach((el) => {
    try {
      const raw = el.style?.zIndex || window.getComputedStyle(el).zIndex || "0";
      const z = parseInt(raw, 10);
      if (!Number.isNaN(z) && z > max) max = z;
    } catch (_) { /* ignore */ }
  });
  // 设置页打开时再抬一档，避免个别主题 / 手机端模态 z-index 读偏导致二级弹层被盖
  try {
    if (document.querySelector(".modal-container .vertical-tab-header, .modal-container .vertical-tab-content")) {
      max = Math.max(max, 5000000);
    }
  } catch (_) { /* ignore */ }
  return max + 500;
}

function isObsidianSettingsOpen(app) {
  try {
    const setting = app?.setting;
    if (!setting) return false;
    if (setting.activeTab) return true;
    const el = setting.containerEl;
    if (el?.isConnected && el.offsetParent !== null) return true;
  } catch (_) { /* ignore */ }
  for (const c of document.querySelectorAll(".modal-container")) {
    if (c.querySelector(".vertical-tab-content, .vertical-tab-header")) return true;
  }
  return false;
}

function runLifeOsUpdateNotice(plugin) {
  if (!plugin) return;
  if (typeof plugin.showUpdateNoticeForce === "function") {
    plugin.showUpdateNoticeForce();
    return;
  }
  if (typeof plugin.showUpdateNotice === "function") {
    plugin.showUpdateNotice(true);
    return;
  }
  if (typeof plugin.maybeShowUpdateNotice === "function") {
    plugin.maybeShowUpdateNotice(undefined, true);
  }
}

function openLifeOsUpdateNoticeFromPlugin(plugin) {
  if (!plugin) return;
  const app = plugin.app;
  if (app && isObsidianSettingsOpen(app)) {
    try { app.setting.close(); } catch (_) { /* ignore */ }
    window.setTimeout(() => runLifeOsUpdateNotice(plugin), 120);
    return;
  }
  runLifeOsUpdateNotice(plugin);
}

function elevateLifeOsUpdateModal(modal) {
  const apply = () => {
    if (!modal?.modalEl) return;
    const z = String(getLifeOsMaxOverlayZIndex());
    const container = modal.modalEl.closest(".modal-container");
    if (!container) return;
    container.addClass("lifeos-update-modal-host");
    applyCssProps(container, { "--lifeos-update-z": z });
    try { container.style.setProperty("z-index", z, "important"); } catch (_) { container.style.zIndex = z; }
    const bg = container.querySelector(".modal-bg");
    if (bg) {
      bg.addClass("lifeos-update-modal-bg");
      applyCssProps(bg, { "--lifeos-update-z": z });
      try { bg.style.setProperty("z-index", z, "important"); } catch (_) { bg.style.zIndex = z; }
    }
    applyCssProps(modal.modalEl, { "--lifeos-update-z": z });
    try { modal.modalEl.style.setProperty("z-index", z, "important"); } catch (_) { modal.modalEl.style.zIndex = z; }
  };
  window.requestAnimationFrame(() => {
    apply();
    window.requestAnimationFrame(apply);
  });
  window.setTimeout(apply, 50);
  window.setTimeout(apply, 180);
}
