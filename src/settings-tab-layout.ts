// ─── PlainLedger settings tab layout (align with 纪念日 / BrainCore) ─────────

const PLG_SETTINGS_STYLE_ID = "plg-settings-compact-styles-v3";
const PLG_MOBILE_TOP_INSET_PX = 41;
const PLG_MOBILE_TOP_SPACER_CLASS = "plg-mobile-top-spacer";

function getPlgEditionLabel(plugin) {
  // 体验包激活后按「公版」展示，避免标题仍写「48小时体验版」造成歧义
  if (typeof isTrialEdition === "function" && isTrialEdition()) {
    if (plugin?.settings?.licenseActivated) return "公版";
    const h = typeof getTrialHoursLabel === "function" ? getTrialHoursLabel() : "";
    return h ? `${h}体验版` : "48小时体验版";
  }
  if (typeof PLUGIN_EDITION === "string" && PLUGIN_EDITION === "public") return "公版";
  return "个人版";
}

function resolvePlgSettingsTabFromFocus(focusOpts) {
  if (!focusOpts?.section) return null;
  const map = {
    categories: "categories",
    appearance: "appearance",
    pendingDues: "rules",
    subscription: "rules",
    recurring: "rules",
    globalKeywords: "rules",
  };
  return map[focusOpts.section] || "common";
}

function injectPlgSettingsCompactStyles() {
  /* CSS lives in styles.css (community plugin: no runtime <style> injection). */
}

function appendPlgMobileTopSpacer(containerEl) {
  containerEl.createDiv({ cls: PLG_MOBILE_TOP_SPACER_CLASS });
}

function applyPlgMobileSettingsLayout(containerEl, app) {
  document.querySelectorAll(".plg-settings-mobile-host, .plg-settings-host").forEach((el) => {
    el.removeClass("plg-settings-mobile-host");
    el.removeClass("plg-settings-host");
  });
  injectPlgSettingsCompactStyles();
  const host = containerEl.closest(".vertical-tab-content")
    || containerEl.closest(".vertical-tab-content-container")
    || containerEl.parentElement;
  host?.addClass("plg-settings-host");
  const isMobile = app?.isMobile || Platform.isMobileApp;
  if (!isMobile) return;
  host?.addClass("plg-settings-mobile-host");
  appendPlgMobileTopSpacer(containerEl);
}

function createPlgSettingsBlock(parent, title, desc) {
  const block = parent.createDiv({ cls: "plg-settings-block" });
  const heading = new Setting(block).setName(title).setHeading();
  if (desc) heading.setDesc(desc);
  return block;
}

function addPlgSubgroupTitle(block, title) {
  new Setting(block).setName(title).setHeading().setClass("plg-settings-subgroup");
}

function createPlgCollapsibleBlock(parent, plugin, sectionId, title, desc, buildBody, opts = {}) {
  const uiSections = plugin.settings.uiState?.settingsSections || {};
  let expanded = uiSections[sectionId];
  if (expanded === undefined) expanded = opts.defaultExpanded !== false;
  if (opts.forceOpen) expanded = true;

  const block = parent.createDiv({
    cls: "plg-settings-block plg-settings-block-collapsible" + (expanded ? " open" : ""),
  });
  block.setAttr("data-settings-section", sectionId);

  const head = block.createDiv({ cls: "plg-settings-block-head clickable" });
  head.setAttr("role", "button");
  head.setAttr("tabindex", "0");
  head.setAttr("aria-expanded", expanded ? "true" : "false");

  const heading = new Setting(head).setName(title).setHeading();
  if (desc) heading.setDesc(desc);

  const body = block.createDiv({
    cls: "plg-settings-block-body" + (expanded ? "" : " hidden"),
  });
  buildBody(body);

  const sync = (open) => {
    expanded = open;
    block.toggleClass("open", open);
    body.toggleClass("hidden", !open);
    head.setAttr("aria-expanded", open ? "true" : "false");
  };

  const toggle = () => {
    sync(!expanded);
    plugin.settings.uiState = plugin.settings.uiState || {};
    plugin.settings.uiState.settingsSections = plugin.settings.uiState.settingsSections || {};
    plugin.settings.uiState.settingsSections[sectionId] = expanded;
    plugin.saveSettings();
  };
  head.addEventListener("click", toggle);
  head.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  });

  return block;
}

function buildPlgSettingsTabs(container, plugin, tabDefs, initialTabId) {
  const tabBar = container.createDiv({ cls: "plg-settings-tab-bar" });
  if (tabDefs.length >= 5) tabBar.addClass("is-many-tabs");
  tabBar.setAttr("role", "tablist");
  tabBar.setAttr("aria-label", "PlainLedger 设置");

  const panelsWrap = container.createDiv({ cls: "plg-settings-panels" });
  const panels = {};
  tabDefs.forEach((t) => {
    panels[t.id] = panelsWrap.createDiv({
      cls: "plg-settings-panel",
      attr: {
        role: "tabpanel",
        id: `plg-panel-${t.id}`,
        "aria-labelledby": `plg-tab-${t.id}`,
      },
    });
    panels[t.id].addClass("is-hidden");
  });

  const showTab = (id) => {
    tabDefs.forEach((t) => {
      panels[t.id].toggleClass("is-hidden", t.id !== id);
      panels[t.id].toggleClass("is-active", t.id === id);
    });
    tabBar.querySelectorAll("button").forEach((btn) => {
      const active = btn.dataset.tab === id;
      btn.toggleClass("mod-cta", active);
      btn.setAttr("aria-selected", active ? "true" : "false");
    });
  };

  tabDefs.forEach((t) => {
    const btn = tabBar.createEl("button", { text: t.label });
    btn.dataset.tab = t.id;
    btn.setAttr("role", "tab");
    btn.setAttr("id", `plg-tab-${t.id}`);
    btn.setAttr("aria-controls", `plg-panel-${t.id}`);
    btn.setAttr("aria-selected", "false");
    btn.addEventListener("click", () => showTab(t.id));
  });

  const startId = initialTabId && tabDefs.some((t) => t.id === initialTabId)
    ? initialTabId
    : tabDefs[0]?.id;
  if (startId) showTab(startId);

  return { tabBar, panels, showTab };
}
