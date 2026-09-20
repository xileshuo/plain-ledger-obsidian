const LIFEOS_UI_STYLE_ID = "lifeos-ui-shared-styles-v9";
const LIFEOS_MOBILE_TOP_INSET_PX = 41;
const LIFEOS_RELEASE = "2026.07.16";

function getLifeOsReleaseLabel() {
  return LIFEOS_RELEASE;
}

function getEditionDisplayName() {
  if (typeof isTrialEdition === "function" && isTrialEdition()) {
    const h = typeof getTrialHoursLabel === "function" ? getTrialHoursLabel() : "";
    return h ? `${h}体验版` : "48小时体验版";
  }
  if (typeof PLUGIN_EDITION === "string" && PLUGIN_EDITION === "public") return "公版";
  if (typeof PLUGIN_EDITION === "string" && PLUGIN_EDITION === "personal") return "个人版";
  return "";
}

function formatLifeOsVersionLine(version, editionLabel) {
  const v = String(version || "").trim() || "0.0.0";
  const ed = editionLabel ? ` · ${editionLabel}` : "";
  return `LifeOS ${LIFEOS_RELEASE} · v${v}${ed}`;
}

function formatPluginSettingsTitle(baseTitle, editionLabel) {
  const edition = editionLabel ? ` · ${editionLabel}` : "";
  const v = typeof PLUGIN_VERSION === "string" ? PLUGIN_VERSION.trim() : "";
  return v ? `${baseTitle}${edition} v${v}` : `${baseTitle}${edition}`;
}

function getPluginVersionDisplayLine() {
  const v = typeof PLUGIN_VERSION === "string" ? PLUGIN_VERSION : "0.0.0";
  return formatLifeOsVersionLine(v, getEditionDisplayName());
}

function injectLifeOsSharedStyles() {
  if (document.getElementById(LIFEOS_UI_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = LIFEOS_UI_STYLE_ID;
  style.textContent = `
:root {
  --lifeos-accent: #b48246;
  --lifeos-accent-soft: rgba(180, 130, 70, 0.12);
  --lifeos-accent-border: rgba(180, 130, 70, 0.28);
  --lifeos-error: var(--text-error, #c44);
  --lifeos-mobile-top-inset: ${LIFEOS_MOBILE_TOP_INSET_PX}px;
  --lifeos-sidebar-inset: 10px;
}
.theme-dark {
  --lifeos-accent: #d4a574;
  --lifeos-accent-soft: rgba(212, 165, 116, 0.14);
  --lifeos-accent-border: rgba(212, 165, 116, 0.32);
}
.lifeos-overlay,
.plg-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000000;
}
.lifeos-overlay-panel,
.plg-overlay-panel {
  width: min(520px, calc(100vw - 24px));
  max-height: min(860px, calc(100vh - 32px));
  max-height: min(860px, calc(100dvh - 32px));
  border-radius: 16px;
  overflow: hidden;
  background: var(--background-primary);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.22);
}
.lifeos-overlay-panel.wide,
.plg-overlay-panel.wide { width: min(680px, calc(100vw - 24px)); }
.lifeos-overlay-head,
.plg-overlay-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--background-modifier-border);
}
.lifeos-overlay-head h2,
.plg-overlay-head h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
}
.lifeos-overlay-close,
.plg-overlay-close {
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  flex-shrink: 0;
}
.lifeos-overlay-close:hover,
.plg-overlay-close:hover {
  color: var(--text-normal);
  background: var(--background-modifier-hover);
}
.lifeos-overlay-body,
.plg-overlay-body {
  padding: 12px 16px 16px;
  overflow: auto;
}
.lifeos-mobile-top-spacer,
.plg-mobile-top-spacer,
.jnr-mobile-top-spacer,
.bc-mobile-top-spacer {
  display: block;
  flex-shrink: 0;
  height: var(--lifeos-mobile-top-inset);
  min-height: var(--lifeos-mobile-top-inset);
  pointer-events: none;
}
.lifeos-modal.modal,
.plg-update-modal.modal,
.jnr-update-modal.modal,
.bc-update-modal.modal,
.plg-trial-modal.modal {
  width: min(680px, calc(100vw - 32px));
  max-width: 680px;
  max-height: calc(100vh - 40px);
  max-height: calc(100dvh - 40px);
}
.lifeos-modal .modal-content,
.plg-update-modal .modal-content,
.jnr-update-modal .modal-content,
.bc-update-modal .modal-content {
  border-radius: 16px;
  overflow: hidden;
}
.lifeos-modal .lifeos-modal-primary,
.plg-update-btn,
.jnr-update-btn,
.bc-update-btn {
  border-radius: 10px;
  font-weight: 700;
  background: var(--lifeos-accent) !important;
  color: #fff !important;
  border: none !important;
}
.lifeos-philosophy-intro,
.plg-update-subtitle,
.plg-settings-intro,
.jnr-update-subtitle,
.bc-update-subtitle,
.bc-settings-intro {
  text-indent: 2em;
}
.lifeos-error,
.plg-activation-status.error,
.jnr-activation-status.error,
.bc-activation-status.error {
  color: var(--lifeos-error) !important;
}
.lifeos-family-foot {
  margin-top: 18px;
  padding-top: 12px;
  border-top: 1px solid var(--background-modifier-border);
  text-align: center;
  font-size: 11px;
  color: var(--text-faint);
  letter-spacing: 0.04em;
}
.lifeos-family-foot-link {
  color: var(--lifeos-accent);
  text-decoration: none;
  cursor: pointer;
}
.lifeos-family-foot-link:hover {
  text-decoration: underline;
}
.plg-activation-preview,
.jnr-activation-preview,
.bc-activation-preview {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 12px;
  border-radius: 12px;
  background: var(--lifeos-accent-soft);
  border: 1px solid var(--lifeos-accent-border);
}
.plg-activation-preview-row,
.jnr-activation-preview-row,
.bc-activation-preview-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: var(--text-muted);
}
.plg-activation-preview-row strong,
.jnr-activation-preview-row strong,
.bc-activation-preview-row strong {
  font-size: 14px;
  color: var(--lifeos-accent);
  font-weight: 800;
}
.plg-activation-preview-note,
.jnr-activation-preview-note,
.bc-activation-preview-note {
  margin: 2px 0 0;
  font-size: 10px;
  line-height: 1.4;
  color: var(--text-faint);
  text-align: center;
}
.plg-ledger-root {
  --plg-accent: var(--lifeos-accent);
}
.lifeos-sidebar-inset {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  padding: var(--lifeos-sidebar-inset, 10px) var(--lifeos-sidebar-inset, 10px) 0;
}
.lifeos-sidebar-inset > .jnr-card-list,
.lifeos-sidebar-inset > .plg-page-split {
  flex: 1;
  min-height: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.lifeos-sidebar-inset > .jnr-card-list {
  overflow-y: auto;
  padding-bottom: 28px;
}
.lifeos-trial-banner,
.bc-trial-banner {
  margin: 0 0 8px;
  padding: 8px 10px;
  border-radius: 10px;
  font-size: 12px;
  line-height: 1.45;
  text-indent: 2em;
  background: var(--lifeos-accent-soft);
  border: 1px solid var(--lifeos-accent-border);
  color: var(--text-normal);
  cursor: pointer;
  box-sizing: border-box;
  width: auto;
  align-self: stretch;
}
.sb-container.lifeos-sidebar-inset {
  padding: var(--lifeos-sidebar-inset, 10px) var(--lifeos-sidebar-inset, 10px) 28px;
}
.lifeos-trial-banner strong,
.bc-trial-banner strong {
  color: var(--lifeos-accent, var(--text-accent));
}
.lifeos-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px 16px;
  text-align: center;
  border-radius: 12px;
  border: 1px dashed var(--background-modifier-border);
  background: var(--background-secondary);
}
.lifeos-empty-icon { font-size: 28px; line-height: 1; opacity: 0.85; }
.lifeos-empty-msg { margin: 0; font-size: 13px; line-height: 1.5; color: var(--text-muted); }
.lifeos-empty-cta {
  margin-top: 4px;
  border: none;
  border-radius: 10px;
  padding: 8px 14px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  background: var(--lifeos-accent, var(--interactive-accent)) !important;
  color: #fff !important;
}
.lifeos-first-run-card {
  margin: 0 0 10px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--lifeos-accent-border);
  background: var(--lifeos-accent-soft);
}
.lifeos-first-run-title { margin: 0 0 8px; font-size: 13px; font-weight: 800; color: var(--text-normal); }
.lifeos-first-run-list { margin: 0 0 10px; padding-left: 1.2em; font-size: 12px; line-height: 1.55; color: var(--text-muted); }
.lifeos-first-run-actions { display: flex; gap: 8px; }
.lifeos-first-run-actions button {
  flex: 1;
  border-radius: 10px;
  padding: 8px 10px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid var(--background-modifier-border);
  background: var(--background-primary);
  color: var(--text-normal);
}
.lifeos-first-run-actions button.lifeos-first-run-primary {
  background: var(--lifeos-accent, var(--interactive-accent)) !important;
  color: #fff !important;
  border: none !important;
}
@media (min-width: 520px) {
  .lifeos-first-run-card {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 20px;
    padding: 14px 16px;
  }
  .lifeos-first-run-title {
    flex: 1 1 100%;
    margin: 0;
  }
  .lifeos-first-run-list {
    flex: 1 1 240px;
    margin: 0;
    min-width: 0;
  }
  .lifeos-first-run-actions {
    flex: 0 0 auto;
    margin-left: auto;
    white-space: nowrap;
  }
}
.lifeos-suite-badge {
  margin: 0 0 10px;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  color: var(--lifeos-accent, var(--text-accent));
  background: var(--lifeos-accent-soft);
  border: 1px solid var(--lifeos-accent-border);
}
.lifeos-about-work-item {
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--background-modifier-border);
  background: var(--background-secondary);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.lifeos-about-works {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 4px;
}
.lifeos-settings-version {
  margin: -6px 0 12px;
  font-size: 12px;
  line-height: 1.4;
  color: var(--text-muted);
}
.lifeos-about-work-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 10px;
  flex-wrap: wrap;
  align-items: center;
  min-height: 28px;
}
.lifeos-about-work-actions button {
  border-radius: 8px;
  padding: 5px 12px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid var(--background-modifier-border);
  background: var(--background-modifier-hover);
  color: var(--text-muted);
  min-height: 28px;
  height: 28px;
  line-height: 1;
  box-sizing: border-box;
}
.lifeos-about-work-actions button.is-self { opacity: 0.55; cursor: default; }
.lifeos-mobile-topbar-unified {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px 6px;
  flex-shrink: 0;
}
.lifeos-mobile-topbar-unified .lifeos-mobile-top-title {
  flex: 1 1 auto;
  min-width: 0;
  font-size: 16px;
  font-weight: 800;
  color: var(--text-normal);
}
.lifeos-mobile-topbar-unified .lifeos-mobile-top-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}
.lifeos-mobile-topbar-unified button.clickable-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
}
`;
  document.head.appendChild(style);
}

function renderLifeOsEmptyState(parent, options = {}) {
  injectLifeOsSharedStyles();
  parent.empty();
  const wrap = parent.createDiv({ cls: "lifeos-empty-state" });
  if (options.icon) wrap.createDiv({ cls: "lifeos-empty-icon", text: options.icon });
  wrap.createEl("p", { cls: "lifeos-empty-msg", text: options.message || "暂无内容" });
  if (options.ctaLabel && typeof options.onCta === "function") {
    const btn = wrap.createEl("button", { cls: "lifeos-empty-cta", text: options.ctaLabel, type: "button" });
    btn.onclick = () => void options.onCta();
  }
  return wrap;
}

function showLifeOsFirstRunCard(container, app, storageKey, options = {}) {
  injectLifeOsSharedStyles();
  try {
    if (localStorage.getItem(storageKey) === "1") return null;
  } catch { /* ignore */ }
  const card = container.createDiv({ cls: "lifeos-first-run-card" });
  card.createEl("p", { cls: "lifeos-first-run-title", text: options.title || "欢迎使用 LifeOS" });
  const list = card.createEl("ul", { cls: "lifeos-first-run-list" });
  (options.bullets || []).forEach((line) => list.createEl("li", { text: line }));
  const actions = card.createDiv({ cls: "lifeos-first-run-actions" });
  const dismiss = () => {
    try { localStorage.setItem(storageKey, "1"); } catch { /* ignore */ }
    card.remove();
  };
  if (options.primaryLabel) {
    const primary = actions.createEl("button", {
      cls: "lifeos-first-run-primary",
      text: options.primaryLabel,
      type: "button",
    });
    primary.onclick = () => {
      dismiss();
      if (typeof options.onPrimary === "function") void options.onPrimary();
    };
  }
  const later = actions.createEl("button", { text: options.laterLabel || "知道了", type: "button" });
  later.onclick = dismiss;
  return card;
}

function renderLifeOsActivationPreview(card, rows, note) {
  injectLifeOsSharedStyles();
  const preview = card.createDiv({ cls: "plg-activation-preview lifeos-activation-preview" });
  (rows || []).forEach((row) => {
    const line = preview.createDiv({ cls: "plg-activation-preview-row" });
    line.createSpan({ text: row.label });
    line.createEl("strong", { text: row.value });
  });
  if (note) preview.createEl("p", { cls: "plg-activation-preview-note", text: note });
  return preview;
}

function openLifeOsPluginSettings(app, pluginId) {
  if (!app?.setting) return;
  const openTab = () => {
    try {
      if (typeof app.setting.openTabById === "function") {
        app.setting.openTabById(pluginId);
        return true;
      }
      const tab = app.setting.pluginTabs?.find?.((t) => t.id === pluginId);
      if (tab && typeof app.setting.openTab === "function") {
        app.setting.openTab(tab);
        return true;
      }
    } catch { /* ignore */ }
    return false;
  };
  try { app.setting.open(); } catch { /* ignore */ }
  if (openTab()) return;
  window.setTimeout(() => {
    if (!openTab()) new Notice(`无法打开插件设置，请手动进入 设置 → 第三方插件`);
  }, 80);
}

function renderLifeOsFamilyFoot(container, app, selfId) {
  injectLifeOsSharedStyles();
  const foot = container.createDiv({ cls: "lifeos-family-foot" });
  foot.createSpan({ text: "LifeOS 插件族 · " });
  const catalog = typeof LIFEOS_PLUGIN_CATALOG !== "undefined" ? LIFEOS_PLUGIN_CATALOG : [];
  const peers = catalog.filter((p) => p.id !== selfId);
  peers.forEach((item, idx) => {
    if (idx > 0) foot.createSpan({ text: " · " });
    const link = foot.createEl("a", { text: item.name, href: "#", cls: "lifeos-family-foot-link" });
    link.onclick = (e) => {
      e.preventDefault();
      const plugin = app?.plugins?.plugins?.[item.id];
      if (!plugin) {
        new Notice(`未检测到 ${item.name}，请先在设置中启用对应插件`);
        return;
      }
      openLifeOsPluginSettings(app, item.id);
    };
  });
}
