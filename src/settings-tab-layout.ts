// ─── PlainLedger settings tab layout (align with 纪念日 / BrainCore) ─────────

const PLG_SETTINGS_STYLE_ID = "plg-settings-compact-styles-v3";
const PLG_MOBILE_TOP_INSET_PX = 41;
const PLG_MOBILE_TOP_SPACER_CLASS = "plg-mobile-top-spacer";

function getPlgEditionLabel() {
  if (typeof isTrialEdition === "function" && isTrialEdition()) {
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
  document.querySelectorAll('[id^="plg-settings-compact-styles"]').forEach((el) => el.remove());
  const st = document.createElement("style");
  st.id = PLG_SETTINGS_STYLE_ID;
  st.textContent = `
.plg-settings-compact h2.plg-settings-page-title {
  margin: 0 0 14px !important;
  padding: 0 !important;
  text-align: left !important;
  font-size: 18px !important;
  font-weight: 700 !important;
  line-height: 1.35 !important;
}
.plg-settings-mobile .plg-settings-page-title { display: none !important; }
.plg-settings-intro {
  margin: 0 0 12px !important;
  padding: 0 !important;
  font-size: 12px !important;
  line-height: 1.55 !important;
  color: var(--text-muted) !important;
  opacity: 1 !important;
  text-indent: 2em !important;
}
.plg-settings-compact .plg-settings-block h3 {
  margin: 0 0 4px !important;
  padding: 0 !important;
  font-size: 16px !important;
  font-weight: 700 !important;
  line-height: 1.35 !important;
  color: var(--text-normal) !important;
}
.plg-settings-compact .plg-settings-block > h4 {
  margin: 0 0 8px !important;
  padding: 12px 0 0 !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  line-height: 1.3 !important;
  letter-spacing: 0.04em !important;
  color: var(--text-muted) !important;
  opacity: 1 !important;
  border-top: 1px solid var(--background-modifier-border) !important;
}
.plg-settings-compact .plg-settings-block > p.setting-item-description + h4,
.plg-settings-compact .plg-settings-block > h3 + h4 {
  margin-top: 6px !important;
  padding-top: 0 !important;
  border-top: none !important;
}
.plg-settings-compact .plg-settings-tab-bar {
  display: flex !important;
  flex-wrap: nowrap !important;
  gap: 6px !important;
  width: 100% !important;
  margin: 0 0 14px !important;
  padding: 0 !important;
  box-sizing: border-box !important;
  justify-content: stretch !important;
}
.plg-settings-compact .plg-settings-tab-bar.is-many-tabs {
  flex-wrap: wrap !important;
}
.plg-settings-compact .plg-settings-tab-bar button {
  flex: 1 1 0 !important;
  min-width: 0 !important;
  width: auto !important;
  text-align: center !important;
  padding: 8px 6px !important;
  border-radius: 8px !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  box-sizing: border-box !important;
  white-space: nowrap !important;
  color: var(--text-normal) !important;
  background: var(--background-secondary) !important;
  border: 1px solid var(--background-modifier-border) !important;
  box-shadow: none !important;
}
.plg-settings-compact .plg-settings-tab-bar button:not(.mod-cta) {
  background: var(--background-secondary) !important;
  border: 1px solid var(--background-modifier-border) !important;
  color: var(--text-normal) !important;
}
.plg-settings-compact .plg-settings-tab-bar button.mod-cta {
  font-weight: 700 !important;
  background: color-mix(in srgb, var(--text-accent) 14%, var(--background-secondary)) !important;
  border: 1px solid color-mix(in srgb, var(--text-accent) 42%, transparent) !important;
  color: color-mix(in srgb, var(--text-accent) 88%, var(--text-normal)) !important;
}
.plg-settings-compact .plg-settings-tab-bar.is-many-tabs button {
  font-size: 12px !important;
  padding: 8px 3px !important;
}
.plg-settings-compact .plg-settings-grid {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 0;
  padding-bottom: 20px;
}
.plg-settings-compact .plg-settings-block {
  margin: 0;
  padding: 14px 16px;
  border-radius: 10px;
  border: 1px solid var(--background-modifier-border);
  box-sizing: border-box;
  overflow: visible;
}
.plg-settings-compact .plg-settings-block > p.setting-item-description {
  margin: 0 0 10px !important;
  padding: 0 !important;
  font-size: 12px !important;
  line-height: 1.5 !important;
  color: var(--text-muted) !important;
  opacity: 1 !important;
}
.plg-settings-compact .plg-settings-section-hint {
  display: block !important;
  margin: 0 0 8px !important;
  padding: 0 !important;
  font-size: 12px !important;
  line-height: 1.5 !important;
  color: var(--text-muted) !important;
  opacity: 1 !important;
  white-space: pre-wrap;
  word-break: break-word;
  text-indent: 2em !important;
}
.plg-settings-compact .plg-settings-locked-hint {
  margin: -6px 0 12px !important;
  padding: 0 !important;
  font-size: 12px !important;
  line-height: 1.5 !important;
  color: var(--text-muted) !important;
}
.plg-settings-compact .plg-settings-status-line {
  margin: 8px 0 0 !important;
  padding: 0 !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  color: var(--text-accent) !important;
}
.plg-settings-compact .plg-license-fp-row {
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;
  margin: 6px 0 8px;
}
.plg-settings-compact .plg-license-fp-input {
  flex: 1;
  min-width: 160px;
  font-family: monospace;
  font-size: 11px;
  padding: 5px 8px;
  border-radius: 6px;
  background: var(--background-secondary);
  border: 1px solid var(--background-modifier-border);
  color: var(--text-normal);
}
.plg-settings-compact .plg-settings-inline-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}
.plg-settings-compact .plg-settings-inline-actions button {
  padding: 5px 14px;
}
.plg-settings-compact .plg-settings-foot {
  margin: 4px 0 0;
  padding: 0 0 8px;
}
.plg-settings-compact .plg-settings-foot p {
  margin: 0 0 4px !important;
  font-size: 12px !important;
  line-height: 1.45 !important;
  color: var(--text-muted) !important;
}
.plg-settings-compact .plg-settings-danger-block .setting-item-name {
  color: var(--text-error) !important;
}
.plg-settings-compact .setting-item {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: nowrap !important;
  align-items: center !important;
  gap: 12px !important;
  padding: 9px 0 !important;
  margin: 0 !important;
  width: 100%;
  box-sizing: border-box;
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  border-bottom: 1px solid var(--background-modifier-border) !important;
}
.plg-settings-compact .plg-settings-block .setting-item:last-child {
  border-bottom: none !important;
}
.plg-settings-compact .setting-item-info {
  flex: 0 0 76px !important;
  width: 76px !important;
  min-width: 76px !important;
  max-width: 76px !important;
  padding: 0 !important;
  margin: 0 !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  align-self: center !important;
}
.plg-settings-compact .setting-item-name {
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 1.3 !important;
  padding: 0 !important;
  white-space: nowrap !important;
  color: var(--text-normal) !important;
}
.plg-settings-compact .setting-item .setting-item-description {
  display: none !important;
}
.plg-settings-compact .plg-settings-rich-block .setting-item .setting-item-description {
  display: block !important;
  font-size: 11px !important;
  margin-top: 2px !important;
  color: var(--text-muted) !important;
}
.plg-settings-compact .plg-settings-rich-block .setting-item-info {
  flex: 1 1 auto !important;
  width: auto !important;
  min-width: 0 !important;
  max-width: none !important;
}
.plg-settings-compact .setting-item-control {
  flex: 1 1 auto !important;
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: flex-end !important;
  gap: 8px !important;
  margin: 0 !important;
  padding: 0 !important;
  width: auto !important;
  min-width: 0 !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  align-self: center !important;
}
.plg-settings-compact .setting-item-control input[type="text"],
.plg-settings-compact .setting-item-control input[type="number"] {
  flex: 1 1 auto !important;
  min-width: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
  min-height: 34px !important;
  padding: 7px 10px !important;
  box-sizing: border-box !important;
  background: var(--background-secondary) !important;
  border: 1px solid var(--background-modifier-border) !important;
  border-radius: 8px !important;
  box-shadow: none !important;
  color: var(--text-normal) !important;
  font-size: 14px !important;
}
.plg-settings-compact .setting-item-control .checkbox-container {
  flex-shrink: 0 !important;
  margin: 0 !important;
}
.plg-settings-mobile {
  padding-top: 0 !important;
  padding-inline: max(12px, env(safe-area-inset-left, 0px), env(safe-area-inset-right, 0px)) !important;
  padding-bottom: max(16px, env(safe-area-inset-bottom, 0px)) !important;
  box-sizing: border-box !important;
}
.${PLG_MOBILE_TOP_SPACER_CLASS} {
  display: block;
  flex-shrink: 0;
  width: 100%;
  height: ${PLG_MOBILE_TOP_INSET_PX}px;
  min-height: ${PLG_MOBILE_TOP_INSET_PX}px;
  pointer-events: none;
}
.plg-settings-mobile .${PLG_MOBILE_TOP_SPACER_CLASS} {
  margin-bottom: 0;
}
.is-mobile .vertical-tab-content.plg-settings-mobile-host,
.is-mobile .vertical-tab-content-container.plg-settings-mobile-host {
  padding-top: env(safe-area-inset-top, 0px) !important;
  box-sizing: border-box !important;
}
.plg-settings-mobile .plg-settings-tab-bar {
  display: flex !important;
  flex-wrap: nowrap !important;
  gap: 6px !important;
  width: 100% !important;
  margin-top: 8px !important;
  margin-bottom: 14px !important;
  justify-content: stretch !important;
  overflow: visible !important;
}
.plg-settings-mobile .plg-settings-tab-bar button {
  flex: 1 1 0 !important;
  min-width: 0 !important;
  width: auto !important;
  text-align: center !important;
  padding: 8px 4px !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  white-space: nowrap !important;
}
.plg-settings-mobile .plg-settings-tab-bar button.mod-cta {
  font-weight: 700 !important;
  background: color-mix(in srgb, var(--text-accent) 14%, var(--background-secondary)) !important;
  border-color: color-mix(in srgb, var(--text-accent) 42%, transparent) !important;
  color: color-mix(in srgb, var(--text-accent) 88%, var(--text-normal)) !important;
}
.plg-settings-mobile .plg-settings-tab-bar.is-many-tabs button {
  font-size: 12px !important;
  padding: 8px 2px !important;
}
.plg-settings-compact .plg-settings-block-collapsible {
  padding: 0 !important;
  overflow: hidden;
}
.plg-settings-compact .plg-settings-block-collapsible .plg-settings-block-head {
  padding: 14px 16px 12px;
  cursor: pointer;
  user-select: none;
}
.plg-settings-compact .plg-settings-block-collapsible .plg-settings-block-head:hover {
  background: var(--background-modifier-hover);
}
.plg-settings-compact .plg-settings-block-collapsible .plg-settings-block-head h3 {
  margin: 0 !important;
  display: inline;
  font-size: 16px !important;
}
.plg-settings-compact .plg-settings-block-collapsible .plg-settings-block-head > p.setting-item-description {
  margin: 4px 0 0 !important;
  padding-left: 0;
}
.plg-settings-compact .plg-settings-block-title-row {
  display: flex;
  align-items: center;
  gap: 6px;
}
.plg-settings-compact .plg-settings-block-chevron {
  display: none !important;
}
.plg-settings-compact .plg-settings-block-collapsible .plg-settings-block-body {
  padding: 0 16px 14px;
}
.plg-settings-compact .plg-settings-block-collapsible .plg-settings-block-body.hidden {
  display: none !important;
}
.plg-settings-compact .plg-settings-block-collapsible:not(.open) .plg-settings-block-head > p.setting-item-description {
  display: none !important;
}
@media (min-width: 481px) {
  .plg-settings-compact .setting-item-info {
    flex: 0 0 88px !important;
    width: 88px !important;
    min-width: 88px !important;
    max-width: 88px !important;
  }
}
/* 数据页按钮行：名称在左、操作贴右 */
.plg-settings-compact .plg-settings-action-row,
.plg-settings-mobile .plg-settings-action-row {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 12px !important;
  width: 100% !important;
}
.plg-settings-compact .plg-settings-action-row .setting-item-info,
.plg-settings-mobile .plg-settings-action-row .setting-item-info {
  flex: 1 1 auto !important;
  width: auto !important;
  min-width: 0 !important;
  max-width: none !important;
}
.plg-settings-compact .plg-settings-action-row .setting-item-control,
.plg-settings-mobile .plg-settings-action-row .setting-item-control {
  flex: 0 0 auto !important;
  width: auto !important;
  margin-left: auto !important;
  justify-content: flex-end !important;
}
.plg-settings-compact .plg-global-kw-add-row-grid,
.plg-settings-mobile .plg-global-kw-add-row-grid {
  display: grid !important;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr) minmax(0, 1fr) auto !important;
  gap: 8px !important;
  width: 100% !important;
  align-items: stretch !important;
}
.plg-settings-compact .plg-global-kw-add-row-grid .plg-global-kw-input,
.plg-settings-compact .plg-global-kw-add-row-grid .plg-global-kw-cat-select,
.plg-settings-compact .plg-global-kw-add-row-grid .plg-global-kw-sub-select,
.plg-settings-mobile .plg-global-kw-add-row-grid .plg-global-kw-input,
.plg-settings-mobile .plg-global-kw-add-row-grid .plg-global-kw-cat-select,
.plg-settings-mobile .plg-global-kw-add-row-grid .plg-global-kw-sub-select {
  width: 100% !important;
  flex: none !important;
  min-width: 0 !important;
}
@media (max-width: 560px) {
  .plg-settings-compact .plg-global-kw-add-row-grid,
  .plg-settings-mobile .plg-global-kw-add-row-grid {
    grid-template-columns: 1fr !important;
  }
  .plg-settings-compact .plg-global-kw-add-row-grid .plg-global-kw-input,
  .plg-settings-mobile .plg-global-kw-add-row-grid .plg-global-kw-input,
  .plg-settings-compact .plg-global-kw-add-row-grid .plg-global-kw-cat-select,
  .plg-settings-mobile .plg-global-kw-add-row-grid .plg-global-kw-cat-select,
  .plg-settings-compact .plg-global-kw-add-row-grid .plg-global-kw-sub-select,
  .plg-settings-mobile .plg-global-kw-add-row-grid .plg-global-kw-sub-select,
  .plg-settings-compact .plg-global-kw-add-row-grid .plg-global-kw-add-btn,
  .plg-settings-mobile .plg-global-kw-add-row-grid .plg-global-kw-add-btn {
    grid-column: 1 / -1 !important;
  }
}
@media (max-width: 480px) {
  /* 数据页「选择文件 / 导出」：名称在左、按钮贴右（不要堆成居中） */
  .plg-settings-compact .plg-settings-action-row,
  .plg-settings-mobile .plg-settings-action-row {
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
    justify-content: space-between !important;
  }
  .plg-settings-compact .plg-settings-action-row .setting-item-info,
  .plg-settings-mobile .plg-settings-action-row .setting-item-info {
    flex: 1 1 auto !important;
    width: auto !important;
    max-width: none !important;
  }
  .plg-settings-compact .plg-settings-action-row .setting-item-control,
  .plg-settings-mobile .plg-settings-action-row .setting-item-control {
    flex: 0 0 auto !important;
    width: auto !important;
    margin-left: auto !important;
    justify-content: flex-end !important;
  }
  .plg-settings-compact .plg-settings-action-row .setting-item-control button,
  .plg-settings-mobile .plg-settings-action-row .setting-item-control button {
    min-height: 28px !important;
    height: 28px !important;
    min-width: 0 !important;
    padding: 0 14px !important;
    border-radius: 8px !important;
    font-size: 12px !important;
    line-height: 28px !important;
    margin-left: auto !important;
    margin-right: 0 !important;
    box-sizing: border-box !important;
  }
}
/* 全端统一：设置页「打开/查看」圆角矩形 */
.plg-settings-compact .plg-settings-action-row .setting-item-control button,
.plg-settings-mobile .plg-settings-action-row .setting-item-control button {
  min-height: 28px !important;
  height: 28px !important;
  min-width: 0 !important;
  padding: 0 14px !important;
  border-radius: 8px !important;
  font-size: 12px !important;
  line-height: 28px !important;
  box-sizing: border-box !important;
}
`;
  document.head.appendChild(st);
}

function appendPlgMobileTopSpacer(containerEl) {
  containerEl.createDiv({ cls: PLG_MOBILE_TOP_SPACER_CLASS });
}

function applyPlgMobileSettingsLayout(containerEl, app) {
  document.querySelectorAll(".plg-settings-mobile-host").forEach((el) => {
    el.removeClass("plg-settings-mobile-host");
  });
  const isMobile = app?.isMobile || Platform.isMobileApp;
  if (!isMobile) return;
  injectPlgSettingsCompactStyles();
  const host = containerEl.closest(".vertical-tab-content")
    || containerEl.closest(".vertical-tab-content-container")
    || containerEl.parentElement;
  host?.addClass("plg-settings-mobile-host");
  appendPlgMobileTopSpacer(containerEl);
}

function createPlgSettingsBlock(parent, title, desc) {
  const block = parent.createDiv({ cls: "plg-settings-block" });
  block.createEl("h3", { text: title });
  if (desc) {
    block.createEl("p", { cls: "setting-item-description", text: desc });
  }
  return block;
}

function addPlgSubgroupTitle(block, title) {
  block.createEl("h4", { text: title });
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

  const titleRow = head.createDiv({ cls: "plg-settings-block-title-row" });
  titleRow.createEl("h3", { text: title });
  if (desc) head.createEl("p", { cls: "setting-item-description", text: desc });

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
    panels[t.id].style.display = "none";
  });

  const showTab = (id) => {
    tabDefs.forEach((t) => {
      panels[t.id].style.display = t.id === id ? "block" : "none";
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
