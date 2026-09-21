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
  /* CSS lives in styles.css (community plugin: no runtime <style> injection). */
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
      applyCssProps(container, { "--plg-update-z": z });
    }
    if (bg) {
      bg.addClass("plg-update-modal-bg");
      applyCssProps(bg, { "--plg-update-z": z });
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
