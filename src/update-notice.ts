const UPDATE_NOTICE_STYLE_ID = "plg-update-notice-styles";

function getPluginVersionLabel() {
  const v = typeof PLUGIN_VERSION === "string" ? PLUGIN_VERSION : "0.0.0";
  const ed = typeof getEditionDisplayName === "function" ? getEditionDisplayName() : "";
  if (typeof formatLifeOsVersionLine === "function") return formatLifeOsVersionLine(v, ed);
  return `v${v}`;
}

function getPluginVersionSemver() {
  return typeof PLUGIN_VERSION === "string" ? PLUGIN_VERSION : "0.0.0";
}

function getChangelog() {
  return typeof PLUGIN_CHANGELOG !== "undefined" && PLUGIN_CHANGELOG ? PLUGIN_CHANGELOG : {};
}

function compareVersions(a, b) {
  const pa = String(a).split(".").map((x) => parseInt(x, 10) || 0);
  const pb = String(b).split(".").map((x) => parseInt(x, 10) || 0);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i += 1) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

function getPhilosophySubtitle() {
  return typeof PLUGIN_PHILOSOPHY_SUBTITLE === "string" && PLUGIN_PHILOSOPHY_SUBTITLE
    ? PLUGIN_PHILOSOPHY_SUBTITLE
    : "PlainLedger — Obsidian 库内独立记账，数据随库同步。";
}

function getUpdateNoticeTitle() {
  const name = typeof PLUGIN_DISPLAY_NAME === "string" && PLUGIN_DISPLAY_NAME
    ? PLUGIN_DISPLAY_NAME
    : "PlainLedger";
  return `${name} 更新日志`;
}

function renderUpdateNoticeHero(hero) {
  const version = getPluginVersionLabel();
  hero.createDiv({ cls: "plg-update-badge", text: version });
  hero.createEl("h2", { cls: "plg-update-title", text: getUpdateNoticeTitle() });
  const intro = typeof PLUGIN_INTRO === "string" ? PLUGIN_INTRO.trim() : "";
  if (intro) {
    const introEl = hero.createEl("p", { text: intro });
    addClasses(introEl, "plg-update-subtitle", "lifeos-philosophy-intro");
  }
  const philosophy = getPhilosophySubtitle();
  if (philosophy) {
    const subEl = hero.createEl("p", { text: philosophy });
    addClasses(subEl, "plg-update-subtitle", "lifeos-philosophy-intro");
  }
}

function injectUpdateNoticeStyles() {
  injectLifeOsSharedStyles();
  const old = document.getElementById(UPDATE_NOTICE_STYLE_ID);
  if (old) old.remove();
  const style = document.createElement("style");
  style.id = UPDATE_NOTICE_STYLE_ID;
  style.textContent = `
.modal-container.plg-update-modal-host,
.modal-bg.plg-update-modal-bg {
  z-index: 1000100 !important;
}
.plg-update-modal.modal {
  width: min(680px, calc(100vw - 32px));
  max-width: 680px;
  max-height: calc(100vh - 40px);
  max-height: calc(100dvh - 40px);
  margin: 0 auto !important;
}
.plg-update-modal .modal-close-button { top: 14px; right: 14px; z-index: 2; }
.plg-update-modal .modal-content {
  padding: 0;
  overflow: hidden;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  max-height: calc(100vh - 40px);
  max-height: calc(100dvh - 40px);
}
.plg-update-wrap {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
  max-height: calc(100vh - 40px);
  max-height: calc(100dvh - 40px);
}
.plg-update-hero {
  flex: 0 0 auto;
  padding: 28px 28px 22px;
  background: linear-gradient(135deg, var(--lifeos-accent-soft), rgba(180, 130, 70, 0.06));
  border-bottom: 1px solid var(--background-modifier-border);
}
.plg-update-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--lifeos-accent-soft);
  color: var(--lifeos-accent, #b48246);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.4px;
  margin-bottom: 10px;
}
.plg-update-title {
  margin: 0;
  font-size: 24px;
  font-weight: 900;
  color: var(--text-normal);
  line-height: 1.25;
}
.plg-update-subtitle {
  margin: 10px 0 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-muted);
  text-indent: 2em;
}
.plg-update-body {
  flex: 1 1 auto;
  min-height: 0;
  padding: 18px var(--lifeos-sidebar-inset, 10px) 8px;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
  touch-action: pan-y;
  display: flex;
  flex-direction: column;
  gap: 10px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.plg-update-body::-webkit-scrollbar { display: none; width: 0; height: 0; }
.plg-update-version {
  border: 1px solid var(--background-modifier-border);
  border-radius: 12px;
  overflow: hidden;
  background: var(--background-primary);
  flex-shrink: 0;
}
.plg-update-version-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 14px;
  font-size: 13px;
  font-weight: 800;
  color: var(--lifeos-accent, #b48246);
  background: var(--lifeos-accent-soft);
  border-bottom: 1px solid transparent;
  user-select: none;
}
.plg-update-version.is-open .plg-update-version-head {
  border-bottom-color: var(--background-modifier-border);
}
.plg-update-version.is-latest .plg-update-version-head {
  color: var(--lifeos-accent, #b48246);
  background: var(--lifeos-accent-soft);
}
.plg-update-version:not(.is-latest) .plg-update-version-head {
  cursor: pointer;
}
.plg-update-version:not(.is-latest) .plg-update-version-head:hover {
  background: var(--lifeos-accent-soft);
}
.plg-update-version-chevron {
  flex: 0 0 auto;
  font-size: 16px;
  line-height: 1;
  color: var(--text-muted);
  transition: transform 0.18s ease;
}
.plg-update-version.is-open .plg-update-version-chevron {
  transform: rotate(90deg);
}
.plg-update-version.is-latest .plg-update-version-chevron {
  display: none;
}
.plg-update-version-body {
  display: none;
}
.plg-update-version.is-open .plg-update-version-body {
  display: block;
}
.plg-update-list { list-style: none; margin: 0; padding: 8px 0; }
.plg-update-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 10px 14px;
  border-top: 1px solid rgba(0,0,0,0.03);
  font-size: 14px;
  line-height: 1.55;
  color: var(--text-normal);
  word-break: break-word;
}
.plg-update-item:first-child { border-top: none; }
.plg-update-num {
  flex: 0 0 22px;
  height: 22px;
  border-radius: 7px;
  background: var(--lifeos-accent-soft);
  color: var(--lifeos-accent, #b48246);
  font-size: 12px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
}
.plg-update-foot {
  flex: 0 0 auto;
  padding: 16px 24px 22px;
  padding-bottom: max(22px, env(safe-area-inset-bottom, 0px));
  border-top: 1px solid var(--background-modifier-border);
  display: flex;
  justify-content: flex-end;
  background: var(--background-primary);
}
.plg-update-btn {
  border: none;
  border-radius: 10px;
  padding: 10px 22px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  background: var(--lifeos-accent, #b48246);
  color: #fff;
  box-shadow: 0 6px 18px color-mix(in srgb, var(--lifeos-accent, #b48246) 22%, transparent);
}
.plg-update-btn:hover { filter: brightness(1.05); }
@media (max-width: 768px) {
  .plg-update-modal.modal {
    width: calc(100vw - 16px);
    max-height: calc(100dvh - 12px);
  }
  .plg-update-modal .modal-content,
  .plg-update-wrap {
    max-height: calc(100dvh - 12px);
  }
  .plg-update-hero { padding: 20px 16px 14px; }
  .plg-update-title { font-size: 20px; }
  .plg-update-subtitle { font-size: 13px; }
  .plg-update-body { padding: 12px var(--lifeos-sidebar-inset, 10px) 6px; }
  .plg-update-item { font-size: 13px; padding: 9px 12px; }
  .plg-update-foot { padding: 12px 14px max(14px, env(safe-area-inset-bottom, 14px)); }
  .plg-update-btn { width: 100%; text-align: center; padding: 12px 16px; }
}
`;
  document.head.appendChild(style);
}

function renderChangelogBody(body, currentVersion) {
  const changelog = getChangelog();
  const versions = Object.keys(changelog)
    .filter((v) => changelog[v]?.length)
    .sort((a, b) => compareVersions(b, a));

  if (!versions.length) {
    body.createEl("p", { text: "暂无更新记录。", cls: "plg-update-subtitle" });
    return;
  }

  for (const ver of versions) {
    const items = changelog[ver];
    if (!items?.length) continue;
    const isLatest = ver === currentVersion;
    const block = body.createDiv({
      cls: `plg-update-version${isLatest ? " is-open is-latest" : ""}`,
    });
    const head = block.createDiv({ cls: "plg-update-version-head" });
    head.createSpan({
      text: isLatest ? `✨ 本次更新 · v${ver}` : `v${ver}`,
    });
    head.createSpan({ cls: "plg-update-version-chevron", text: "›" });
    const content = block.createDiv({ cls: "plg-update-version-body" });
    const list = content.createEl("ul", { cls: "plg-update-list" });
    items.forEach((note, idx) => {
      const item = list.createEl("li", { cls: "plg-update-item" });
      item.createSpan({ cls: "plg-update-num", text: String(idx + 1) });
      item.createSpan({ text: note });
    });
    if (!isLatest) {
      head.onclick = () => {
        block.toggleClass("is-open", !block.hasClass("is-open"));
      };
    }
  }
}

function getTopOverlayZIndex() {
  let max = 999999;
  document.querySelectorAll(".plg-overlay").forEach((el) => {
    const raw = el.style.zIndex || window.getComputedStyle(el).zIndex || "0";
    const z = parseInt(raw, 10);
    if (!Number.isNaN(z) && z > max) max = z;
  });
  return max + 30;
}

/** 更新日志 / 使用说明弹窗必须叠在 PlainLedger 设置 overlay 之上 */
function elevateUpdateModalLayer(modal) {
  requestAnimationFrame(() => {
    const z = String(getTopOverlayZIndex());
    const container = modal.modalEl.closest(".modal-container");
    const bg = modal.modalEl.closest(".modal-bg");
    if (container) {
      container.addClass("plg-update-modal-host");
      container.style.zIndex = z;
    }
    if (bg) {
      bg.addClass("plg-update-modal-bg");
      bg.style.zIndex = z;
    }
  });
}

function needsUpdateNotice(lastSeen, current) {
  const seen = String(lastSeen || "").trim();
  const cur = String(current || "").trim();
  if (!cur) return false;
  if (!seen) return true;
  return compareVersions(seen, cur) < 0;
}

function showUpdateNoticeModal(app, plugin, options = {}) {
  const versionLabel = getPluginVersionLabel();
  const versionSemver = getPluginVersionSemver();
  if (!options.force && !needsUpdateNotice(plugin.settings.lastSeenVersion, versionSemver)) return;

  injectUpdateNoticeStyles();

  const modal = new Modal(app);
  addClasses(modal.modalEl, "lifeos-modal", "plg-update-modal");
  modal.titleEl.hide();
  modal.contentEl.empty();

  const wrap = modal.contentEl.createDiv({ cls: "plg-update-wrap" });
  const hero = wrap.createDiv({ cls: "plg-update-hero" });
  renderUpdateNoticeHero(hero);

  const body = wrap.createDiv({ cls: "plg-update-body" });
  renderChangelogBody(body, versionSemver);

  const foot = wrap.createDiv({ cls: "plg-update-foot" });
  const btn = foot.createEl("button", { text: "知道了，开始使用" });
  addClasses(btn, "lifeos-modal-primary", "plg-update-btn");
  btn.onclick = () => {
    plugin.settings.lastSeenVersion = versionSemver;
    void plugin.saveSettings();
    modal.close();
    if (typeof options.onDismiss === "function") options.onDismiss();
  };

  modal.open();
  elevateLifeOsUpdateModal(modal);
  if (typeof elevateUpdateModalLayer === "function") elevateUpdateModalLayer(modal);
}
