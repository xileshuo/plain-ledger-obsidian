// ─── Capture, edit & OCR modals ──────────────────────────────────────────────

function appendSelectOptions(select, options, selected) {
  select.textContent = "";
  options.forEach(({ value, label }) => {
    const o = document.createElement("option");
    o.value = value;
    o.textContent = label;
    if (value === selected) o.selected = true;
    select.appendChild(o);
  });
}

/** 关联订阅/周期：左侧滑动开关 + 右侧下拉 */
function createLinkToggleRow(parent, label, placeholder, items, selectedId) {
  const row = divCls(parent, "plg-bill-form-row plg-link-inline-row");
  row.createSpan({ cls: "plg-bill-form-label", text: label });
  const ctrl = divCls(row, "plg-bill-form-control plg-link-inline-control");
  const switchLabel = ctrl.createEl("label", { cls: "plg-slide-switch", attr: { "aria-label": label } });
  const checkbox = switchLabel.createEl("input", { type: "checkbox" });
  checkbox.checked = !!selectedId;
  switchLabel.createSpan({ cls: "plg-slide-track" });
  const select = ctrl.createEl("select", { cls: "plg-link-inline-select" });
  appendSelectOptions(
    select,
    [{ value: "", label: placeholder }].concat(items),
    selectedId || ""
  );
  const sync = () => {
    const on = checkbox.checked;
    select.disabled = !on;
    select.toggleClass("is-disabled", !on);
    if (!on) select.value = "";
  };
  sync();
  checkbox.onchange = sync;
  return { checkbox, select };
}

function addClasses(el, ...classes) {
  if (!el) return;
  classes.filter(Boolean).forEach((c) => {
    String(c).trim().split(/\s+/).filter(Boolean).forEach((token) => {
      try { el.addClass(token); } catch (_) { /* iOS WebKit: one class token per addClass */ }
    });
  });
}

/** iOS WebKit rejects space-joined class strings in createDiv/createEl cls. */
function divCls(parent, cls) {
  const el = parent.createDiv();
  if (cls) addClasses(el, cls);
  return el;
}

function elCls(parent, tag, cls, opts = {}) {
  const el = parent.createEl(tag, opts);
  if (cls) addClasses(el, cls);
  return el;
}

function getOverlayHost() {
  if (isMobileCaptureUi()) {
    const settingsModal = document.querySelector(
      ".modal.mod-settings:not(.is-hidden), .modal-container .modal.mod-settings"
    );
    if (settingsModal) return settingsModal;
    const modalHost = document.querySelector(".modal-container");
    if (modalHost?.children?.length) return modalHost;
  }
  const body = document.body;
  if (body && (body.clientHeight > 0 || body.clientWidth > 0)) return body;
  return document.documentElement;
}

/** Mobile-friendly modal body: scroll region + sticky action bar (matches plg-edit-overlay). */
function createMobileModalShell(body, modalCls = "plg-modal") {
  const mobile = isMobileCaptureUi();
  if (mobile) body.addClass("plg-edit-mobile-shell");
  const modal = divCls(body, modalCls);
  if (mobile) modal.addClass("plg-edit-mobile-layout");
  const content = mobile ? modal.createDiv({ cls: "plg-edit-mobile-scroll" }) : modal;
  const actions = mobile
    ? modal.createDiv({ cls: "plg-modal-actions plg-edit-mobile-actions" })
    : null;
  return { modal, content, actions, mobile };
}

function attachOverlayPanelDrag(overlay, panel, head) {
  if (typeof window === "undefined" || isMobileCaptureUi()) return;
  head.addClass("plg-overlay-draggable-head");
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;

  const onDown = (e) => {
    if (e.button != null && e.button !== 0) return;
    if (e.target.closest(".plg-overlay-close, button, input, select, textarea, a, label")) return;
    dragging = true;
    const rect = panel.getBoundingClientRect();
    panel.addClass("plg-overlay-panel-floating");
    applyCssProps(panel, {
      "--plg-drag-left": `${rect.left}px`,
      "--plg-drag-top": `${rect.top}px`,
    });
    startX = e.clientX;
    startY = e.clientY;
    startLeft = rect.left;
    startTop = rect.top;
    head.addClass("dragging");
    e.preventDefault();
  };

  const onMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const maxW = window.innerWidth;
    const maxH = window.innerHeight;
    const rect = panel.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const left = Math.min(Math.max(8, startLeft + dx), Math.max(8, maxW - w - 8));
    const top = Math.min(Math.max(8, startTop + dy), Math.max(8, maxH - h - 8));
    applyCssProps(panel, {
      "--plg-drag-left": `${left}px`,
      "--plg-drag-top": `${top}px`,
    });
  };

  const onUp = () => {
    dragging = false;
    head.removeClass("dragging");
  };

  head.addEventListener("mousedown", onDown);
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onUp);
}

function openPlgOverlay(opts) {
  injectLifeOsSharedStyles();
  const { title, cls = "", wide = false, build, stack = false, tier = 0 } = opts;
  if (!stack) {
    // 只清 PlainLedger 自己的 overlay，勿误关其它 LifeOS 插件弹层
    document.querySelectorAll(".plg-overlay").forEach((el) => el.remove());
  }
  // 始终挂到 body，避免落在 Obsidian 设置滚动容器里被裁切 / 盖住
  const host = document.body || document.documentElement;
  const overlay = host.createDiv({ cls: "plg-overlay" });
  addClasses(overlay, "lifeos-overlay");
  const isCapture = String(cls).includes("plg-capture-overlay");
  const depth = document.querySelectorAll(".lifeos-overlay, .plg-overlay").length;
  const settingsZ = typeof getLifeOsMaxOverlayZIndex === "function" ? getLifeOsMaxOverlayZIndex() : 0;
  const floorZ = isCapture ? 1000050 : 1000000;
  // 二级/三级弹层叠在一级之上；并压过 Obsidian 设置模态
  const tierBoost = Math.max(0, Number(tier) || 0) * 100;
  const baseZ = Math.max(floorZ, settingsZ) + tierBoost;
  applyCssProps(overlay, { "--plg-overlay-z": String(baseZ + depth * 30) });
  if (isCapture && isMobileCaptureUi()) overlay.addClass("plg-capture-sheet-host");
  const panel = overlay.createDiv({ cls: "plg-overlay-panel" });
  addClasses(panel, "lifeos-overlay-panel", cls, wide ? "wide" : "");
  if (tier === 2) panel.addClass("plg-overlay-tier2");
  else if (tier === 3) panel.addClass("plg-overlay-tier3");
  const head = panel.createDiv({ cls: "plg-overlay-head" });
  addClasses(head, "lifeos-overlay-head");
  if (title) head.createEl("h2", { text: title });
  const closeBtn = head.createEl("button", { text: "×", cls: "plg-overlay-close", attr: { type: "button", "aria-label": "关闭" } });
  addClasses(closeBtn, "lifeos-overlay-close");
  const body = panel.createDiv({ cls: "plg-overlay-body" });
  addClasses(body, "lifeos-overlay-body");
  const releaseMobileFit = bindMobileOverlayViewport(overlay, panel, cls);
  const close = () => {
    releaseMobileFit?.();
    overlay.remove();
  };
  head.querySelector(".plg-overlay-close").onclick = close;
  attachOverlayPanelDrag(overlay, panel, head);
  overlay.addEventListener("click", (e) => {
    if (e.target !== overlay) return;
    close();
  });
  panel.addEventListener("click", (e) => e.stopPropagation());
  window.requestAnimationFrame(() => {
    try {
      build(body, close);
      const mobileOverlay = body.closest(".plg-overlay-mobile-fit");
      if (mobileOverlay) scheduleMobileOverlaySync(mobileOverlay);
      else syncMobileCaptureOverlay();
    } catch (err) {
      body.createEl("p", { text: "加载失败：" + (err.message || String(err)) });
      console.error("[PlainLedger]", err);
    }
  });
  return close;
}

function isNativeMobileApp(appOrPlugin) {
  const app = appOrPlugin?.app || appOrPlugin;
  if (app?.isMobile) return true;
  return typeof Platform !== "undefined" && Platform.isMobile;
}

function isMobileCaptureUi() {
  if (typeof Platform !== "undefined" && Platform.isMobile) return true;
  const w = window.innerWidth || document.documentElement.clientWidth || 0;
  if (w > 0 && w <= 520) return true;
  try {
    return window.matchMedia("(max-width: 520px)").matches;
  } catch (_) {
    return false;
  }
}

function captureMobileRegions(card) {
  const inMobileShell = !!card.closest?.(".plg-overlay-mobile-fit")
    || !!card.closest?.(".plg-overlay-panel-mobile-fit");
  const isMobile = inMobileShell || isMobileCaptureModal();
  if (!isMobile) {
    return { scroll: card, footer: card, isMobile: false };
  }
  card.addClass("plg-capture-card-mobile");
  if (isMobileCaptureModal() && !card.closest?.(".plg-overlay-mobile-fit")) {
    return { scroll: card, footer: card, isMobile: true, flat: true };
  }
  return {
    scroll: card.createDiv({ cls: "plg-capture-mobile-scroll" }),
    footer: card.createDiv({ cls: "plg-capture-mobile-footer" }),
    isMobile: true,
    flat: false,
  };
}

function isMobileCaptureModal() {
  return isMobileCaptureUi() && document.body.classList.contains("plg-mobile-force-top");
}

/** 键盘弹出时把输入区滚进可视区域（Modal / overlay 共用） */
function scrollCaptureFieldIntoView(el) {
  if (!el?.getBoundingClientRect) return;
  const scrollRoot = el.closest(".plg-capture-modal-body")
    || el.closest(".plg-capture-mobile-scroll");
  const run = () => {
    const m = measureMobileVisualViewport();
    const pad = 14;
    const viewTop = m.top + pad;
    const viewBottom = m.top + m.vvH - pad;
    const dock = el.closest(".plg-manual-form-dock");
    const saveRow = dock?.querySelector(".plg-manual-save-row");
    const anchor = (saveRow && el.matches?.("input, textarea"))
      ? saveRow
      : el;
    const r = anchor.getBoundingClientRect();
    if (r.bottom <= viewBottom && r.top >= viewTop) return;
    if (scrollRoot) {
      if (r.bottom > viewBottom) scrollRoot.scrollTop += r.bottom - viewBottom + 10;
      else if (r.top < viewTop) scrollRoot.scrollTop -= viewTop - r.top + 10;
    }
    const container = el.closest(".modal-container");
    if (container && r.bottom > viewBottom) {
      container.scrollTop += r.bottom - viewBottom + 10;
    }
  };
  window.requestAnimationFrame(run);
  window.setTimeout(run, 100);
  window.setTimeout(run, 280);
}

/** 手机 Obsidian Modal：键盘弹出时更新可用高度变量 */
function bindMobileCaptureModalKeyboard(modalEl) {
  if (!modalEl || !isMobileCaptureUi()) return () => {};
  let raf = 0;
  const sync = () => {
    const m = measureMobileVisualViewport();
    const topPad = Math.max(m.top, 4);
    const usable = Math.max(m.vvH - topPad - 6, 200);
    applyCssProps(document.documentElement, {
      "--plg-modal-kb-gap": `${m.kbGap}px`,
      "--plg-modal-vv-h": `${usable}px`,
    });
    document.body.toggleClass("plg-capture-kb-open", m.kbGap > 48);
    const active = document.activeElement;
    if (active && modalEl.contains(active) && active.matches?.("input, textarea, select")) {
      scrollCaptureFieldIntoView(active);
    }
  };
  const onVv = () => {
    if (raf) window.cancelAnimationFrame(raf);
    raf = window.requestAnimationFrame(sync);
  };
  const onFocusIn = (e) => {
    if (!e.target?.matches?.("input, textarea, select")) return;
    sync();
    scrollCaptureFieldIntoView(e.target);
  };
  sync();
  const vv = window.visualViewport;
  vv?.addEventListener("resize", onVv);
  vv?.addEventListener("scroll", onVv);
  window.addEventListener("resize", onVv);
  modalEl.addEventListener("focusin", onFocusIn);
  return () => {
    if (raf) window.cancelAnimationFrame(raf);
    vv?.removeEventListener("resize", onVv);
    vv?.removeEventListener("scroll", onVv);
    window.removeEventListener("resize", onVv);
    modalEl.removeEventListener("focusin", onFocusIn);
    document.body.removeClass("plg-capture-kb-open");
    document.documentElement.style.removeProperty("--plg-modal-kb-gap");
    document.documentElement.style.removeProperty("--plg-modal-vv-h");
  };
}

function focusCaptureField(el) {
  if (!el) return;
  try {
    el.focus({ preventScroll: true });
  } catch (_) {
    el.focus();
  }
}

function resetCaptureScrollAnchors(root) {
  if (!root) return;
  [
    root,
    ...root.querySelectorAll?.(
      ".plg-capture-mobile-scroll, .plg-capture-modal-body, .plg-overlay-body, .plg-capture-card-mobile, .plg-manual-cat-grid",
    ) || [],
  ].forEach((el) => {
    if (el && "scrollTop" in el) el.scrollTop = 0;
  });
}

const _captureLayoutLocked = new WeakSet();

function bindDesktopCaptureLayoutResize(bodyEl) {
  let timer = 0;
  const onResize = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      const panel = bodyEl?.closest?.(".plg-overlay-panel.plg-capture-overlay");
      if (!panel || panel.classList.contains("plg-overlay-panel-mobile-fit")) return;
      _captureLayoutLocked.delete(panel);
      syncDesktopCaptureLayout(bodyEl, { force: true });
    }, 150);
  };
  window.addEventListener("resize", onResize);
  return () => {
    window.clearTimeout(timer);
    window.removeEventListener("resize", onResize);
    const panel = bodyEl?.closest?.(".plg-overlay-panel.plg-capture-overlay");
    if (panel) _captureLayoutLocked.delete(panel);
  };
}

function measureManualCaptureAnchor(panel) {
  const manualPane = panel.querySelector(".plg-manual-panel");
  const manualCard = manualPane?.querySelector(":scope > .plg-capture-card");
  if (!manualPane || !manualCard) return 0;

  const paneHidden = manualPane.classList.contains("hidden");
  applyCssProps(manualPane, {
    "--plg-measure-width": panel.clientWidth ? `${panel.clientWidth}px` : "560px",
  });
  manualPane.addClass("plg-measure-offscreen");
  manualPane.classList.remove("hidden");

  const cardStyle = window.getComputedStyle(manualCard);
  let h = parseFloat(cardStyle.paddingTop || 0) + parseFloat(cardStyle.paddingBottom || 0);
  for (const child of manualCard.children) {
    const style = window.getComputedStyle(child);
    if (style.display === "none" || style.visibility === "hidden") continue;
    h += child.offsetHeight
      + parseFloat(style.marginTop || 0)
      + parseFloat(style.marginBottom || 0);
  }

  manualPane.removeClass("plg-measure-offscreen");
  manualPane.classList.toggle("hidden", paneHidden);

  return Math.ceil(h);
}

function measureCaptureContentHeight(panel) {
  // 与 styles.css 桌面记一笔 max-height: min(86vh, 640px) 对齐，并计入提示行，避免底部按钮被裁切
  const maxH = Math.min(Math.round((window.innerHeight || 800) * 0.86), 640);
  const manualH = measureManualCaptureAnchor(panel);
  const cardH = Math.max(manualH, 280);
  if (!cardH) return 420;

  const headH = panel.querySelector(".plg-overlay-head")?.offsetHeight || 0;
  const tabsH = panel.querySelector(".plg-mode-tabs")?.offsetHeight || 0;
  const hintEl = panel.querySelector(".plg-capture-mode-hint-row");
  let hintH = 0;
  if (hintEl) {
    const hs = window.getComputedStyle(hintEl);
    hintH = hintEl.offsetHeight
      + parseFloat(hs.marginTop || 0)
      + parseFloat(hs.marginBottom || 0);
  }
  const overlayBody = panel.querySelector(".plg-overlay-body");
  const bodyPadY = overlayBody
    ? parseFloat(window.getComputedStyle(overlayBody).paddingTop || 0)
      + parseFloat(window.getComputedStyle(overlayBody).paddingBottom || 0)
    : 24;
  const chrome = headH + bodyPadY + tabsH + hintH;
  const available = Math.max(maxH - chrome, 280);
  return Math.min(cardH, available);
}

function scheduleDesktopCaptureLayoutSync(bodyEl) {
  if (!bodyEl || bodyEl.closest?.(".plg-overlay-panel-mobile-fit")) return;
  window.requestAnimationFrame(() => {
    syncDesktopCaptureLayout(bodyEl, { force: true });
  });
}

function restoreCaptureTabVisibility(panel) {
  const mode = panel.dataset.captureMode || "smart";
  applyCaptureTabVisibility({
    smart: panel.querySelector(".plg-smart-panel"),
    manual: panel.querySelector(".plg-manual-panel"),
    ocr: panel.querySelector(".plg-ocr-panel"),
  }, mode);
}

function syncDesktopCaptureLayout(bodyEl, { force = false } = {}) {
  const panel = bodyEl?.closest?.(".plg-overlay-panel.plg-capture-overlay");
  if (!panel || panel.classList.contains("plg-overlay-panel-mobile-fit")) return;
  if (_captureLayoutLocked.has(panel) && !force) return;

  const contentH = measureCaptureContentHeight(panel);
  if (contentH < 280) return;

  panel.style.removeProperty("height");
  panel.style.removeProperty("min-height");
  panel.style.removeProperty("max-height");
  const modalBody = panel.querySelector(".plg-capture-modal-body");
  modalBody?.style.removeProperty("height");
  modalBody?.style.removeProperty("min-height");
  modalBody?.style.removeProperty("max-height");
  applyCssProps(panel, { "--plg-capture-content-h": `${contentH}px` });
  restoreCaptureTabVisibility(panel);
  _captureLayoutLocked.add(panel);
}

function syncMobileCaptureOverlay() {
  document.querySelectorAll(".plg-overlay-mobile-fit").forEach((el) => {
    if (el._mumuSyncViewport) el._mumuSyncViewport();
    else scheduleMobileOverlaySync(el);
  });
}

const _overlaySyncTimers = new WeakMap();

function scheduleMobileOverlaySync(overlay) {
  if (!overlay) return;
  const prev = _overlaySyncTimers.get(overlay);
  if (prev) prev.forEach((id) => window.clearTimeout(id));
  const ids = [0, 80, 220, 420].map((ms) => window.setTimeout(() => {
    overlay._mumuSyncViewport?.();
  }, ms));
  _overlaySyncTimers.set(overlay, ids);
}

/**
 * 手机记一笔壳高（对齐 4.0.1）：
 * - 顶对齐，三 Tab 视觉位置一致
 * - 未出键盘时先按预估键盘高起稿，真键盘到位后再钉死
 * - 切手动/截图/收键盘均保持该锚高，不再二次收缩或拉高
 */
const CAPTURE_SHELL_RATIO = 0.58;
const CAPTURE_ASSUMED_KB_RATIO = 0.42;

let _captureShellHeightLock = null;
let _captureShellKbAnchored = false;

function resetCaptureFixedPanelHeight() {
  _captureShellHeightLock = null;
  _captureShellKbAnchored = false;
}

function applyCapturePanelGeometry(panel, layout, isCapture) {
  panel.addClass("plg-overlay-panel-geom");
  applyCssProps(panel, {
    "--plg-geom-left": isCapture ? "0" : `${layout.left}px`,
    "--plg-geom-width": isCapture ? "100%" : `${layout.vvW}px`,
    "--plg-geom-top": `${layout.panelTop}px`,
    "--plg-geom-bottom": "auto",
    "--plg-geom-height": `${layout.panelHeight}px`,
    "--plg-geom-max-height": `${layout.panelHeight}px`,
    "--plg-geom-min-height": `${layout.panelHeight}px`,
    "--plg-geom-radius": isCapture ? "0" : "16px 16px 0 0",
  });
  return { panelTop: layout.panelTop, panelHeight: layout.panelHeight };
}

function captureKeyboardBottom(m, measuredKb, inputFocused) {
  let kbBottom = Math.max(measuredKb, Math.round(m.ih - m.top - m.vvH));
  if (inputFocused && kbBottom < 140) kbBottom = Math.round(m.ih * CAPTURE_ASSUMED_KB_RATIO);
  if (kbBottom < 120) kbBottom = Math.round(m.ih * CAPTURE_ASSUMED_KB_RATIO);
  return kbBottom;
}

function measureCapturePanelLayout(panelEl) {
  const m = measureMobileVisualViewport();
  const active = document.activeElement;
  const inputFocused = !!(panelEl && active && panelEl.contains(active)
    && active.matches?.("input, textarea, select, [contenteditable='true']"));
  const measuredKb = Math.max(0, Math.round(m.kbGap));
  const keyboardUp = measuredKb >= 40 || m.keyboardOpen || inputFocused;
  const panelTop = Math.max(0, Math.round(m.top || 0));

  if (keyboardUp) {
    const kbBottom = captureKeyboardBottom(m, measuredKb, inputFocused);
    const available = Math.max(260, Math.round(m.ih - kbBottom - panelTop));
    if (!_captureShellKbAnchored) {
      // 首次键盘到位：以此时高度为唯一锚点
      _captureShellHeightLock = available;
      _captureShellKbAnchored = true;
    } else if (_captureShellHeightLock != null && available < _captureShellHeightLock - 8) {
      // 键盘更高时仅允许再钉矮一点，避免二次闪缩后内容溢出
      _captureShellHeightLock = available;
    }
  } else if (_captureShellKbAnchored && _captureShellHeightLock != null) {
    // 键盘收起：允许向下回缩到内容可用高度（阈值防抖），减少底部留白
    const relaxed = Math.max(260, Math.round(m.vvH - 8));
    if (relaxed < _captureShellHeightLock - 24) {
      _captureShellHeightLock = relaxed;
    }
  } else if (_captureShellHeightLock == null) {
    // 未出键盘：先按预估键盘高度起稿，与弹键盘后接近，减少二次收缩
    const assumedKb = Math.round(m.ih * CAPTURE_ASSUMED_KB_RATIO);
    _captureShellHeightLock = Math.max(260, Math.round(m.ih - assumedKb - panelTop));
  }

  const panelHeight = _captureShellHeightLock
    ?? Math.max(300, Math.round(m.ih * CAPTURE_SHELL_RATIO));
  const panelBottom = Math.max(0, Math.round(m.ih - panelTop - panelHeight));

  return {
    ...m,
    kbPad: panelBottom,
    keyboardUp,
    panelBottom,
    panelTop,
    panelHeight,
    useFixedHeight: true,
    useTopAnchor: true,
  };
}

function getMumuTesseract() {
  const g = typeof globalThis !== "undefined" ? globalThis : window;
  if (g.__MUMU_TESSERACT__) return g.__MUMU_TESSERACT__;
  if (g.Tesseract) return g.Tesseract;
  if (typeof self !== "undefined" && self.Tesseract) return self.Tesseract;
  try {
    if (typeof module !== "undefined" && module.exports) {
      if (typeof module.exports.createWorker === "function") return module.exports;
      if (module.exports.Tesseract) return module.exports.Tesseract;
    }
  } catch (_) { /* Obsidian sandbox */ }
  return null;
}

function measureMobileVisualViewport() {
  const vv = window.visualViewport;
  const ih = window.innerHeight || document.documentElement.clientHeight || 640;
  const iw = window.innerWidth || document.documentElement.clientWidth || 360;
  const top = Math.max(0, vv?.offsetTop ?? 0);
  const left = Math.max(0, vv?.offsetLeft ?? 0);
  const vvH = Math.max(vv?.height > 0 ? vv.height : ih, 200);
  const vvW = Math.max(vv?.width > 0 ? vv.width : iw, 280);
  const kbGap = Math.max(0, ih - top - vvH);
  const keyboardOpen = kbGap > 48 || vvH < ih * 0.72;
  return { top, left, vvH, vvW, ih, iw, kbGap, keyboardOpen };
}

function stopCaptureControlBubble(el) {
  if (!el) return;
  ["mousedown", "touchstart", "click"].forEach((evt) => {
    el.addEventListener(evt, (e) => e.stopPropagation());
  });
}

function formatManualTimeDisplay(iso) {
  if (!iso) return "";
  const m = String(iso).match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!m) return String(iso).replace("T", " ").slice(0, 16);
  return `${m[2]}/${m[3]} ${m[4]}:${m[5]}`;
}

function parseManualTimeDisplay(text, refIso) {
  const t = String(text || "").trim();
  if (!t) return refIso || "";
  const now = new Date();
  const y = now.getFullYear();
  const full = t.match(/^(\d{4})[\/\-年.](\d{1,2})[\/\-月.](\d{1,2})[\s日]*(\d{1,2}):(\d{2})/);
  if (full) {
    return `${full[1]}-${pad2(full[2])}-${pad2(full[3])}T${pad2(full[4])}:${full[5]}`;
  }
  const short = t.match(/^(\d{1,2})[\/\-](\d{1,2})\s+(\d{1,2}):(\d{2})/);
  if (short) {
    return `${y}-${pad2(short[1])}-${pad2(short[2])}T${pad2(short[3])}:${short[4]}`;
  }
  return refIso || "";
}

function updateCaptureSheetMode(panel, mode) {
  if (!panel) return;
  const next = mode || "smart";
  panel.dataset.captureMode = next;
  if (panel.classList.contains("plg-overlay-panel-mobile-fit")) return;
  const modalBody = panel.querySelector(".plg-capture-modal-body");
  if (!modalBody) return;
  modalBody.style.removeProperty("height");
  modalBody.style.removeProperty("min-height");
  modalBody.style.removeProperty("max-height");
}

function syncMobileCaptureFooterInset(panel) {
  const visiblePane = panel?.querySelector?.(".plg-capture-tab-pane:not(.hidden)");
  const foot = visiblePane?.querySelector?.(".plg-capture-mobile-footer")
    || panel?.querySelector?.(".plg-capture-mobile-footer");
  if (!foot || foot.offsetParent === null) {
    if (panel) applyCssProps(panel, { "--plg-capture-footer-h": "0px" });
    return;
  }
  const fh = Math.ceil(foot.getBoundingClientRect().height);
  applyCssProps(panel, { "--plg-capture-footer-h": fh > 4 ? `${fh}px` : "0px" });
}

function blurCaptureFocusWithin(root) {
  const active = document.activeElement;
  if (active && root?.contains?.(active) && active.matches?.("input, textarea, select")) {
    active.blur();
  }
}

function applyCaptureTabVisibility(tabRoots, mode) {
  Object.entries(tabRoots).forEach(([id, el]) => {
    if (!el) return;
    el.toggleClass("hidden", id !== mode);
  });
}

function afterCaptureTabSwitch(bodyEl, panel) {
  if (panel) applyCssProps(panel, { "--plg-capture-footer-h": "0px" });
  resetCaptureScrollAnchors(bodyEl);
  if (panel?.classList?.contains?.("plg-overlay-panel-mobile-fit")) {
    syncMobileCaptureFooterInset(panel);
    // 切 Tab 后按锚点壳高重贴（不会升高）
    window.requestAnimationFrame(() => syncMobileCaptureOverlay());
  } else {
    syncDesktopCaptureLayout(bodyEl, { force: true });
  }
}

/** 手机端：半透明悬浮层 + 面板贴 visualViewport（顶栏下、键盘上） */
function bindMobileOverlayViewport(overlay, panel, cls = "") {
  const mobileFit = String(cls).includes("plg-capture-overlay")
    || String(cls).includes("plg-edit-overlay")
    || (isMobileCaptureUi() && (
      String(cls).includes("plg-settings-modal")
      || String(cls).includes("plg-budget-edit-modal")
      || String(cls).includes("plg-subscription-overlay")
      || String(cls).includes("plg-recurring-overlay")
      || String(cls).includes("plg-cat-edit-modal")
    ));
  if (!mobileFit || !isMobileCaptureUi()) return null;

  const isCaptureOverlay = String(cls).includes("plg-capture-overlay");
  overlay.addClass("plg-overlay-mobile-fit");
  panel.addClass("plg-overlay-panel-mobile-fit");
  document.documentElement.classList.add("plg-overlay-scroll-lock");
  if (isCaptureOverlay) document.documentElement.classList.add("plg-capture-overlay-open");

  let pollRaf = 0;
  let lastLayoutIh = window.innerHeight || 0;
  const stopPoll = () => {
    if (pollRaf) window.cancelAnimationFrame(pollRaf);
    pollRaf = 0;
  };
  const pollMs = isCaptureOverlay ? 3200 : 1100;
  const startPoll = () => {
    stopPoll();
    const t0 = Date.now();
    const tick = () => {
      sync();
      if (Date.now() - t0 < pollMs) pollRaf = window.requestAnimationFrame(tick);
      else pollRaf = 0;
    };
    pollRaf = window.requestAnimationFrame(tick);
  };

  const sync = () => {
    const isCapture = String(cls).includes("plg-capture-overlay");
    // 注意：键盘弹起时 innerHeight 也可能跳变，禁止因此清掉壳高锚点（否则切手动会拉高）

    // Static overlay layout lives on `.plg-overlay-mobile-fit` in styles.css.

    let panelTop;
    let panelHeight;
    let kbGap = 0;
    let keyboardUp = false;
    let isCatEditModal = false;

    if (isCapture) {
      const layout = measureCapturePanelLayout(panel);
      kbGap = layout.panelBottom;
      keyboardUp = layout.keyboardUp;
      document.body.toggleClass("plg-capture-kb-open", keyboardUp);
      const frame = applyCapturePanelGeometry(panel, layout, true);
      panelTop = frame.panelTop;
      panelHeight = frame.panelHeight;
      applyCssProps(overlay, {
        "--plg-kb-h": `${kbGap}px`,
        "--plg-panel-h": `${panelHeight}px`,
      });
    } else {
      const m = measureMobileVisualViewport();
      kbGap = m.kbGap;
      keyboardUp = m.keyboardOpen;
      const isSettingsModal = String(cls).includes("plg-settings-modal");
      const isEditOverlay = String(cls).includes("plg-edit-overlay");
      isCatEditModal = String(cls).includes("plg-cat-edit-modal");
      if (m.keyboardOpen) {
        panelTop = m.top;
        panelHeight = m.vvH;
      } else if (isCatEditModal) {
        // 分类编辑内容短：按内容高度贴底，不再强行 92% 视口留出大片空白。
        panelHeight = 0;
        panelTop = m.top;
      } else if (isEditOverlay || isSettingsModal) {
        panelHeight = Math.round(m.vvH * 0.92);
        panelTop = m.top + Math.max(0, m.vvH - panelHeight);
      } else {
        const ratio = 0.78;
        const cap = 560;
        panelHeight = Math.min(Math.round(m.vvH * ratio), cap);
        panelTop = m.top + m.vvH - panelHeight;
      }
    }

    if (!isCapture) {
      const vv = measureMobileVisualViewport();
      panel.addClass("plg-overlay-panel-geom");
      if (isCatEditModal && !keyboardUp) {
        applyCssProps(panel, {
          "--plg-geom-left": `${vv.left}px`,
          "--plg-geom-width": `${vv.vvW}px`,
          "--plg-geom-min-height": "0",
          "--plg-geom-height": "auto",
          "--plg-geom-max-height": `${Math.round(vv.vvH * 0.92)}px`,
          "--plg-geom-bottom": "0",
          "--plg-geom-top": "auto",
          "--plg-geom-radius": "16px 16px 0 0",
        });
      } else {
        applyCssProps(panel, {
          "--plg-geom-left": `${vv.left}px`,
          "--plg-geom-width": `${vv.vvW}px`,
          "--plg-geom-min-height": "0",
          "--plg-geom-top": `${panelTop}px`,
          "--plg-geom-height": `${panelHeight}px`,
          "--plg-geom-max-height": `${panelHeight}px`,
          "--plg-geom-bottom": "auto",
          "--plg-geom-radius": "16px 16px 0 0",
        });
      }
    }

    applyCssProps(overlay, {
      "--plg-vv-height": `${panelHeight}px`,
      "--plg-kb-gap": `${kbGap}px`,
    });
    syncMobileCaptureFooterInset(panel);
  };

  const scheduleCaptureSync = () => {
    sync();
    scheduleMobileOverlaySync(overlay);
  };

  const onFocusIn = (e) => {
    if (!e.target?.matches?.("input, textarea, select")) return;
    window.requestAnimationFrame(() => resetCaptureScrollAnchors(panel));
    scheduleCaptureSync();
    startPoll();
  };

  const onFocusOut = () => window.setTimeout(sync, 140);

  sync();
  overlay._mumuSyncViewport = sync;
  panel.addEventListener("focusin", onFocusIn);
  panel.addEventListener("focusout", onFocusOut);
  const onOrient = () => {
    resetCaptureFixedPanelHeight();
    lastLayoutIh = window.innerHeight || 0;
    scheduleCaptureSync();
  };
  const vv = window.visualViewport;
  vv?.addEventListener("resize", sync);
  vv?.addEventListener("scroll", sync);
  window.addEventListener("orientationchange", onOrient);
  window.addEventListener("resize", sync);
  if (isCaptureOverlay) scheduleCaptureSync();

  return () => {
    stopPoll();
    delete overlay._mumuSyncViewport;
    if (isCaptureOverlay) resetCaptureFixedPanelHeight();
    document.documentElement.classList.remove("plg-overlay-scroll-lock");
    document.documentElement.classList.remove("plg-capture-overlay-open");
    document.body.removeClass("plg-capture-kb-open");
    panel.removeEventListener("focusin", onFocusIn);
    panel.removeEventListener("focusout", onFocusOut);
    vv?.removeEventListener("resize", sync);
    vv?.removeEventListener("scroll", sync);
    window.removeEventListener("orientationchange", onOrient);
    window.removeEventListener("resize", sync);
  };
}

function confirmPlgAction({ title, message, confirmText = "确定", danger = false, onConfirm, stack = true }) {
  openPlgOverlay({
    title: title || "确认",
    stack,
    build: (body, close) => {
      body.createEl("p", { text: message });
      const row = body.createDiv({ cls: "plg-modal-actions" });
      row.createEl("button", { text: "取消", attr: { type: "button" } }).onclick = close;
      row.createEl("button", {
        text: confirmText,
        cls: (danger ? "plg-btn-danger " : "") + "mod-cta",
        attr: { type: "button" },
      }).onclick = () => {
        onConfirm?.();
        close();
      };
    },
  });
}

function openDeleteTransactionDialog(app, plugin, editTx, onDeleted, closeEdit) {
  openPlgOverlay({
    title: "删除账单",
    stack: true,
    build: (body, closeConfirm) => {
      addClasses(body, "plg-modal");
      body.createEl("p", {
        text: "确定删除这条记账吗？也可选择「迁移」修改分类后再保存。",
      });
      const row = divCls(body, "plg-modal-actions plg-modal-actions-triple");
      row.createEl("button", { text: "取消", attr: { type: "button" } }).onclick = closeConfirm;
      row.createEl("button", {
        text: "迁移",
        cls: "mod-cta",
        attr: { type: "button" },
      }).onclick = () => {
        closeConfirm();
        new Notice("请在下方修改分类、二级分类后点保存");
      };
      row.createEl("button", {
        text: "删除",
        cls: "plg-btn-danger",
        attr: { type: "button" },
      }).onclick = async () => {
        await plugin.store.deleteTransaction(editTx.id);
        new Notice("已删除");
        onDeleted?.();
        closeConfirm();
        closeEdit();
      };
    },
  });
}

function openEditTransaction(app, plugin, tx, onSaved, onDeleted, opts = {}) {
  opts.onBeforeOpen?.();
  const draft = opts.draft ?? String(tx.source || "").includes("draft");
  const editTx = { ...tx };

  openPlgOverlay({
    title: opts.title || (draft ? "记账" : "修改账单"),
    cls: "plg-edit-overlay",
    build: (body, close) => {
      const mobileEdit = isMobileCaptureUi();
      if (mobileEdit) body.addClass("plg-edit-mobile-shell");
      const modal = divCls(body, "plg-modal plg-edit-modal");
      if (mobileEdit) modal.addClass("plg-edit-mobile-layout");
      const formHost = mobileEdit ? modal.createDiv({ cls: "plg-edit-mobile-scroll" }) : modal;
      const cats = plugin.store.data.categories || [];
      const fields = {};

      const isAutoSubBill = editTx.source === "subscription";
      const isAutoRecBill = editTx.source === "recurring";
      const linkedSubId = String(editTx.linkedSubscriptionId || "").trim();
      const linkedRecId = String(editTx.linkedRecurringId || "").trim();
      const linkedSub = linkedSubId
        ? (plugin.store.data.subscriptions || []).find((s) => s.id === linkedSubId)
        : (isAutoSubBill ? resolveLinkedSubscriptionForTx(plugin, editTx) : null);
      const linkedRec = linkedRecId
        ? (plugin.store.data.recurring || []).find((r) => r.id === linkedRecId)
        : (isAutoRecBill ? resolveLinkedRecurringForTx(plugin, editTx) : null);

      if (isAutoSubBill || isAutoRecBill || linkedSub || linkedRec) {
        const banner = formHost.createDiv({ cls: "plg-tx-source-banner" });
        if (isAutoSubBill) {
          const name = linkedSub?.name || editTx.subcategory || editTx.note || "订阅";
          const btn = banner.createEl("button", {
            text: `📱 订阅 · ${name}`,
            cls: "plg-tx-source-link",
            attr: { type: "button" },
          });
          btn.onclick = () => {
            close();
            if (linkedSub?.id) {
              plugin.openDashboardSettings({ section: "subscription", id: linkedSub.id });
            } else {
              plugin.openDashboardSettings({ section: "subscription" });
            }
          };
          divCls(banner, "plg-muted plg-tx-source-hint").setText("此账单由订阅规则自动生成");
        } else if (linkedSub) {
          banner.createDiv({
            cls: "plg-tx-source-link-static",
            text: `📱 已关联订阅 · ${linkedSub.name}`,
          });
          divCls(banner, "plg-muted plg-tx-source-hint").setText("计入订阅统计与续费阶段记录；在此编辑普通账单");
        }
        if (isAutoRecBill) {
          const title = linkedRec?.title || editTx.note || "周期记账";
          const btn = banner.createEl("button", {
            text: `🔄 周期/分期 · ${title}`,
            cls: "plg-tx-source-link",
            attr: { type: "button" },
          });
          btn.onclick = () => {
            close();
            if (linkedRec?.id) {
              plugin.openDashboardSettings({ section: "recurring", id: linkedRec.id });
            } else {
              plugin.openDashboardSettings({ section: "recurring" });
            }
          };
          divCls(banner, "plg-muted plg-tx-source-hint").setText("此账单由周期规则自动生成");
        } else if (linkedRec) {
          banner.createDiv({
            cls: "plg-tx-source-link-static",
            text: `🔄 已关联周期 · ${linkedRec.title || linkedRec.note || "周期记账"}`,
          });
          divCls(banner, "plg-muted plg-tx-source-hint").setText("计入周期统计，不出现在自动续费记录中；在此编辑普通账单");
        }
      }

      const row = (label, el) => {
        const r = formHost.createDiv({ cls: "plg-modal-row" });
        r.createSpan({ text: label });
        r.appendChild(el);
        return el;
      };

      fields.flow = row("类型", document.createElement("select"));
      const flowOptions = [
        { value: "expense", label: "支出" },
        { value: "income", label: "收入" },
      ];
      if (editTx.flow === "transfer") flowOptions.push({ value: "transfer", label: "转账" });
      appendSelectOptions(fields.flow, flowOptions, editTx.flow || "expense");

      fields.cat = row("分类", document.createElement("select"));
      fields.sub = row("二级", document.createElement("select"));
      fields.amt = row("金额", document.createElement("input"));
      fields.amt.type = "number";
      fields.amt.step = "0.01";
      fields.amt.classList.add("plg-input-num");
      fields.amt.value = String(editTx.amount ?? "");

      fields.time = row("时间", document.createElement("input"));
      fields.time.type = "datetime-local";
      fields.time.value = String(editTx.datetime || "").replace(" ", "T").slice(0, 16);

      fields.note = row("备注", document.createElement("input"));
      fields.note.type = "text";
      fields.note.value = editTx.note || "";

      const reimbRow = divCls(formHost, "plg-bill-form-row plg-edit-reimb-row");
      reimbRow.createSpan({ cls: "plg-bill-form-label", text: "报销" });
      const reimbCtrl = divCls(reimbRow, "plg-bill-form-control plg-link-inline-control");
      const reimbSwitch = reimbCtrl.createEl("label", {
        cls: "plg-slide-switch",
        attr: { "aria-label": "标记报销" },
      });
      fields.reimburse = reimbSwitch.createEl("input", { type: "checkbox" });
      reimbSwitch.createSpan({ cls: "plg-slide-track" });
      fields.reimburse.checked = !!editTx.reimburse;
      const syncReimbVisible = () => {
        reimbRow.toggleClass("plg-is-hidden", fields.flow.value !== "expense");
        if (fields.flow.value !== "expense") fields.reimburse.checked = false;
      };
      syncReimbVisible();

      const subs = plugin.store.data.subscriptions || [];
      const recurs = plugin.store.data.recurring || [];
      let linkSubCheck = null;
      let linkSubSelect = null;
      let linkRecCheck = null;
      let linkRecSelect = null;

      if (!isAutoSubBill && !isAutoRecBill && (subs.length || recurs.length)) {
        divCls(formHost, "plg-muted plg-link-hint").setText(
          "可选：手动关联到订阅或周期/分期。关联订阅后会计入续费阶段与订阅统计。",
        );

        if (subs.length) {
          const linkSubBlock = formHost.createDiv({ cls: "plg-link-form-block" });
          const subLink = createLinkToggleRow(
            linkSubBlock,
            "关联订阅",
            "（选择订阅）",
            subs.map((s) => ({ value: s.id, label: s.name })),
            linkedSubId
          );
          linkSubCheck = subLink.checkbox;
          linkSubSelect = subLink.select;
        }

        if (recurs.length) {
          const linkRecBlock = formHost.createDiv({ cls: "plg-link-form-block" });
          const recLink = createLinkToggleRow(
            linkRecBlock,
            "关联周期",
            "（选择周期/分期）",
            recurs.map((r) => ({
              value: r.id,
              label: r.title || r.note || r.subcategory || r.category || r.id,
            })),
            linkedRecId
          );
          linkRecCheck = recLink.checkbox;
          linkRecSelect = recLink.select;
        }
      }

      const refreshSubs = () => {
        const c = cats.find((x) => x.name === fields.cat.value);
        appendSelectOptions(
          fields.sub,
          [{ value: "", label: "（无）" }].concat((c?.subcategories || []).map((s) => {
            const name = subcategoryName(s);
            return { value: name, label: name };
          })),
          fields.sub.value || editTx.subcategory || ""
        );
      };

      const refreshCats = () => {
        const f = fields.flow.value;
        const list = f === "income"
          ? cats.filter((c) => c.flow === "income")
          : f === "transfer"
            ? [{ name: "转账", icon: "↔️", subcategories: [] }, ...cats.filter((c) => c.flow !== "income")]
            : cats.filter((c) => c.flow !== "income");
        const selected = list.some((c) => c.name === fields.cat.value)
          ? fields.cat.value
          : (editTx.category && list.some((c) => c.name === editTx.category) ? editTx.category : list[0]?.name || "");
        appendSelectOptions(
          fields.cat,
          list.map((c) => ({ value: c.name, label: `${effectiveCategoryIcon(c)} ${c.name}` })),
          selected
        );
        refreshSubs();
      };

      fields.flow.onchange = () => { editTx.category = ""; editTx.subcategory = ""; syncReimbVisible(); refreshCats(); };
      fields.cat.onchange = () => { editTx.subcategory = ""; refreshSubs(); };
      refreshCats();

      const btnRow = modal.createDiv({
        cls: mobileEdit ? "plg-modal-actions plg-edit-mobile-actions" : "plg-modal-actions",
      });
      if (onDeleted) {
        btnRow.createEl("button", { text: "删除", cls: "plg-btn-danger", attr: { type: "button" } }).onclick = () => {
          openDeleteTransactionDialog(app, plugin, editTx, onDeleted, close);
        };
      }
      btnRow.createEl("button", { text: "取消", attr: { type: "button" } }).onclick = close;
      btnRow.createEl("button", {
        text: draft ? "确定" : "保存",
        cls: "mod-cta",
        attr: { type: "button" },
      }).onclick = async () => {
        const amount = parseFloat(fields.amt.value);
        if (!amount) return new Notice("请输入有效金额");
        const dt = fields.time.value.replace("T", " ");
        Object.assign(editTx, {
          flow: fields.flow.value,
          category: fields.cat.value,
          subcategory: fields.sub.value || "",
          amount,
          datetime: dt.length >= 16 ? dt : editTx.datetime,
          note: fields.note.value || "",
          reimburse: fields.flow.value === "expense" ? !!fields.reimburse.checked : false,
        });
        if (!isAutoSubBill) {
          editTx.linkedSubscriptionId = linkSubCheck?.checked ? (linkSubSelect?.value || "") : "";
        }
        if (!isAutoRecBill) {
          editTx.linkedRecurringId = linkRecCheck?.checked ? (linkRecSelect?.value || "") : "";
        }
        if (draft) {
          onSaved?.(editTx);
          close();
          return;
        }
        await plugin.store.updateTransaction(editTx, {
          learnText: fields.note.value || editTx.note || "",
        });
        new Notice("已更新");
        onSaved?.(editTx);
        close();
      };
    },
  });
}

// ─── Shared capture shell (manual-style layout) ─────────────────────────────

function renderCaptureShell(parent, buildContent, panelCls) {
  parent.empty();
  parent.addClass("plg-capture-pane");
  if (panelCls) parent.addClass(panelCls);
  const card = divCls(parent, "plg-capture-card plg-glass-panel");
  buildContent(card);
  return card;
}

/** 金额输入净化：只保留一个小数点，最多两位小数 */
function sanitizeAmountInput(raw) {
  let s = String(raw ?? "").replace(/[^\d.]/g, "");
  const i = s.indexOf(".");
  if (i >= 0) {
    const intPart = s.slice(0, i);
    const decPart = s.slice(i + 1).replace(/\./g, "").slice(0, 2);
    s = `${intPart}.${decPart}`;
  }
  if (s.startsWith(".")) s = `0${s}`;
  return s;
}

function parsePositiveAmount(raw) {
  const n = parseFloat(sanitizeAmountInput(raw));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

// ─── Manual capture ──────────────────────────────────────────────────────────

class ManualCapturePanel {
  constructor(plugin, callbacks) {
    this.plugin = plugin;
    this.callbacks = callbacks || {};
    this.flow = "expense";
    this.amount = "";
    this.selectedCat = null;
    this.selectedSub = "";
    this.note = "";
    this.reimburse = false;
    this.datetimeLocal = "";
  }

  render(parent) {
    this.rootEl = parent;
    renderCaptureShell(parent, (card) => {
      const { scroll, footer, isMobile } = captureMobileRegions(card);
      const compact = isMobileCaptureUi() || isNativeMobileApp(this.plugin);
      if (compact) card.addClass("plg-manual-mobile-compact");
      const top = scroll;
      const inputRoot = footer;
      if (isMobile) {
        footer.addClass("plg-manual-mobile-form-footer");
      }

      const catZone = divCls(top, "plg-manual-cat-zone");
      let gridCls = "plg-cat-grid plg-cat-grid-manual";
      if (compact) {
        gridCls += " plg-cat-grid-mobile-grid";
      } else {
        gridCls += " plg-cat-grid-desktop-2row";
      }
      const grid = divCls(catZone, gridCls);
      this.renderCategoryGrid(grid);
      // 移动端键盘上方空间紧，不做「常用」；桌面保留
      if (!compact) this.refreshRecentChips(catZone);

      const formDock = inputRoot.createDiv({ cls: "plg-manual-form-dock" });
      if (!compact) formDock.addClass("plg-manual-form-dock-desktop");
      const metaBlock = formDock.createDiv({ cls: "plg-manual-meta-block plg-manual-meta-block-mac" });

      // 顶栏：支出/收入 + 提示 + 标记报销
      const metaRowTop = divCls(metaBlock, "plg-manual-meta-row plg-manual-meta-row-top");
      const flowCell = divCls(metaRowTop, "plg-manual-meta-cell plg-manual-meta-cell-flow");
      const flowBar = divCls(flowCell, "plg-flow-tabs plg-flow-tabs-inline");
      [
        { id: "expense", label: "支出" },
        { id: "income", label: "收入" },
      ].forEach((f) => {
        const btn = flowBar.createEl("button", {
          text: f.label,
          cls: this.flow === f.id ? "active" : "",
          attr: { type: "button" },
        });
        btn.dataset.flow = f.id;
        btn.onclick = () => {
          this.closeSubPopover();
          if (this.flow === f.id) return;
          this.flow = f.id;
          this.refreshFlowGrid();
        };
      });
      this.flowBar = flowBar;

      this.selectionHintEl = metaRowTop.createDiv({
        cls: "plg-manual-selection-hint",
        attr: { "aria-live": "polite" },
      });
      this.updateSelectionHint();

      const reimbCell = divCls(metaRowTop, "plg-manual-meta-cell plg-manual-meta-cell-reimb");
      const reimbLabel = reimbCell.createEl("label", {
        cls: "plg-manual-reimb-check-label",
        attr: { "aria-label": "标记报销" },
      });
      this.reimburseCheck = reimbLabel.createEl("input", {
        type: "checkbox",
        cls: "plg-manual-reimb-check",
      });
      reimbLabel.createSpan({ text: "标记报销", cls: "plg-manual-reimb-label" });
      this.reimburseCheck.checked = this.reimburse;
      this.reimburseCheck.onchange = () => { this.reimburse = this.reimburseCheck.checked; };

      const inlineField = (row, title, cellCls) => {
        const cell = divCls(row, `plg-manual-meta-cell plg-manual-meta-cell-inline ${cellCls}`);
        cell.createSpan({ cls: "plg-manual-field-label", text: title });
        const shell = cell.createDiv({ cls: "plg-manual-field-shell" });
        return { cell, shell };
      };

      // 金额 | 备注
      const metaRowFields = divCls(metaBlock, "plg-manual-meta-row plg-manual-meta-row-fields");
      const { shell: amtShell } = inlineField(metaRowFields, "金额", "plg-manual-meta-cell-amt");
      // 手机：去 ¥，与日期/时间一样格子内居中；桌面保留前缀
      if (!compact) {
        amtShell.createSpan({ cls: "plg-manual-amt-prefix", text: "¥", attr: { "aria-hidden": "true" } });
      }
      this.amountInput = amtShell.createEl("input", {
        type: "text",
        cls: "plg-manual-amt-input",
        attr: {
          placeholder: "0.00",
          inputmode: "decimal",
          autocomplete: "off",
          "aria-label": "金额",
        },
      });
      this.amountInput.value = this.amount;
      this.amountInput.oninput = () => {
        this.amount = sanitizeAmountInput(this.amountInput.value);
        this.amountInput.value = this.amount;
      };
      this.amountInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.save();
        }
      });

      const { shell: noteShell } = inlineField(metaRowFields, "备注", "plg-manual-meta-cell-note");
      const noteInput = noteShell.createEl("input", {
        type: "text",
        cls: "plg-manual-note-input",
        attr: { placeholder: "可选", "aria-label": "备注" },
      });
      noteInput.value = this.note;
      noteInput.oninput = () => { this.note = noteInput.value; };

      const now = new Date();
      if (!this.datetimeLocal) {
        this.datetimeLocal = `${dateKey(now)}T${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
      }
      const [datePart, timePart] = this.datetimeLocal.split("T");

      // 日期 | 时间：统一用壳层 + 原生选择器（隐藏系统图标，避免重影）
      const metaRowDatetime = divCls(metaBlock, "plg-manual-meta-row plg-manual-meta-row-datetime");
      const { shell: dateShell } = inlineField(metaRowDatetime, "日期", "plg-manual-meta-cell-date");
      this.dateInput = dateShell.createEl("input", {
        type: "date",
        cls: "plg-manual-date-input plg-manual-native-picker",
        attr: { "aria-label": "日期" },
      });
      const { shell: timeShell } = inlineField(metaRowDatetime, "时间", "plg-manual-meta-cell-time");
      this.timePartInput = timeShell.createEl("input", {
        type: "time",
        cls: "plg-manual-time-part-input plg-manual-native-picker",
        attr: { "aria-label": "时间" },
      });
      this.dateInput.value = datePart || dateKey(now);
      this.timePartInput.value = (timePart || "12:00").slice(0, 5);
      const syncDateTime = () => {
        if (this.dateInput.value && this.timePartInput.value) {
          this.datetimeLocal = `${this.dateInput.value}T${this.timePartInput.value}`;
        }
      };
      this.dateInput.onchange = syncDateTime;
      this.timePartInput.onchange = syncDateTime;
      this.dateInput.oninput = syncDateTime;
      this.timePartInput.oninput = syncDateTime;
      // 点击壳层也能唤起系统选择器；点面板其他处 blur 关掉
      const openNativePicker = (input) => {
        if (!input) return;
        try {
          if (typeof input.showPicker === "function") input.showPicker();
          else input.focus();
        } catch (_) {
          input.focus();
        }
      };
      [dateShell, timeShell].forEach((shell) => {
        shell.addEventListener("click", (e) => {
          if (e.target?.tagName === "INPUT") return;
          openNativePicker(shell.querySelector("input"));
        });
      });
      // iOS/WebView：日期值偶发不渲染，聚焦时再写回
      this.dateInput.addEventListener("focus", () => {
        const v = this.dateInput.value || (this.datetimeLocal || "").split("T")[0] || dateKey(new Date());
        if (this.dateInput.value !== v) this.dateInput.value = v;
        else {
          this.dateInput.value = "";
          this.dateInput.value = v;
        }
      });
      if (this._pickerDismissOff) {
        document.removeEventListener("pointerdown", this._pickerDismissOff, true);
        this._pickerDismissOff = null;
      }
      this._pickerDismissOff = (e) => {
        const t = e.target;
        if (dateShell.contains(t) || timeShell.contains(t)) return;
        if (this.dateInput === document.activeElement) this.dateInput.blur();
        if (this.timePartInput === document.activeElement) this.timePartInput.blur();
      };
      document.addEventListener("pointerdown", this._pickerDismissOff, true);
      [this.amountInput, noteInput].forEach((el) => {
        stopCaptureControlBubble(el);
      });

      [this.amountInput, this.dateInput, this.timePartInput, noteInput].forEach((el) => {
        el?.addEventListener("focus", () => {
          const overlay = el.closest(".plg-overlay-mobile-fit");
          // 日期/时间：只同步面板高度，避免滚动把表单顶出空白
          if (el.matches?.(".plg-manual-native-picker, [type='date'], [type='time']")) {
            if (overlay) scheduleMobileOverlaySync(overlay);
            return;
          }
          if (el.closest(".plg-overlay-mobile-fit .plg-overlay-panel.plg-capture-overlay")) {
            scrollCaptureFieldIntoView(el);
            return;
          }
          const root = el.closest(".plg-capture-modal-body") || el.closest(".plg-manual-panel");
          window.requestAnimationFrame(() => resetCaptureScrollAnchors(root || document));
          if (overlay) scheduleMobileOverlaySync(overlay);
        });
      });

      const saveRow = formDock.createDiv({ cls: "plg-manual-save-row" });
      // 与智能页「粘贴 / 识别」同套：次要浅底 + 主色 CTA
      elCls(saveRow, "button", "plg-capture-tool plg-manual-save-again", {
        text: "再记",
        attr: { type: "button" },
      }).onclick = () => this.save(true);
      elCls(saveRow, "button", "plg-capture-send mod-cta plg-manual-save", {
        text: "保存",
        attr: { type: "button", title: "保存（⌘↩ / Ctrl+↩）" },
      }).onclick = () => this.save(false);
      this.syncFlowUi();
    }, "plg-manual-panel");
  }

  closeSubPopover() {
    document.querySelectorAll(".plg-sub-popover").forEach((el) => el.remove());
    if (this._subPopoverOff) {
      document.removeEventListener("click", this._subPopoverOff, true);
      this._subPopoverOff = null;
    }
  }

  teardown() {
    this.closeSubPopover();
    if (this._pickerDismissOff) {
      document.removeEventListener("pointerdown", this._pickerDismissOff, true);
      this._pickerDismissOff = null;
    }
  }

  openSubPopover(anchor, subs) {
    this.closeSubPopover();
    const rect = anchor.getBoundingClientRect();
    const overlays = [...document.querySelectorAll(".plg-overlay")];
    const host = overlays.length ? overlays[overlays.length - 1] : document.body;
    const pop = host.createDiv({ cls: "plg-sub-popover plg-sub-popover-anim is-placing" });
    const baseZ = overlays.length
      ? parseInt(overlays[overlays.length - 1].style.zIndex || "1000000", 10)
      : 1000000;
    const maxW = Math.min(260, window.innerWidth - 16);
    const left = Math.max(8, Math.min(rect.left, window.innerWidth - maxW - 8));
    applyCssProps(pop, {
      "--plg-pop-z": String(baseZ + 100),
      "--plg-pop-max-w": `${maxW}px`,
      "--plg-pop-left": `${left}px`,
      "--plg-pop-top": `${rect.bottom + 6}px`,
    });

    subs.forEach((sub) => {
      const meta = normalizeSubcategory(sub);
      const name = subcategoryName(sub);
      const btn = elCls(pop, "button", "plg-sub-pop-item", { attr: { type: "button" } });
      if (this.selectedSub === name) btn.addClass("active");
      renderCategoryIcon(btn, meta, { panelIcon: true });
      btn.createSpan({ text: name });
      btn.onclick = (e) => {
        e.stopPropagation();
        this.selectedSub = this.selectedSub === name ? "" : name;
        this.updateSelectionHint();
        this.closeSubPopover();
        this.rootEl?.querySelectorAll(".plg-cat-cell").forEach((el) => {
          el.toggleClass("active", el.dataset.cat === this.selectedCat);
        });
        window.setTimeout(() => focusCaptureField(this.amountInput), 40);
      };
    });

    const place = () => {
      const popH = Math.max(pop.offsetHeight || 0, 48);
      const below = rect.bottom + 6;
      const above = rect.top - popH - 6;
      const useAbove = below + popH > window.innerHeight - 8 && above >= 8;
      applyCssProps(pop, { "--plg-pop-top": `${useAbove ? above : below}px` });
      pop.removeClass("is-placing");
    };
    window.requestAnimationFrame(place);
    this._subPopoverOff = (e) => {
      if (pop.contains(e.target) || anchor.contains(e.target)) return;
      this.closeSubPopover();
    };
    window.setTimeout(() => document.addEventListener("click", this._subPopoverOff, true), 0);
  }

  categoriesForFlow() {
    const cats = this.plugin.store.data.categories;
    if (this.flow === "income") return cats.filter((c) => c.flow === "income");
    return cats.filter((c) => c.flow !== "income");
  }

  refreshRecentChips(hostEl) {
    const compact = !!this.rootEl?.querySelector?.(".plg-manual-mobile-compact")
      || isMobileCaptureUi()
      || isNativeMobileApp(this.plugin);
    if (compact) {
      // 移动端不展示常用，清掉残留节点
      const host = hostEl
        || this.rootEl?.querySelector?.(".plg-manual-cat-zone")
        || this.rootEl?.querySelector?.(".plg-capture-card");
      host?.querySelectorAll?.(".plg-manual-recent-desktop, .plg-manual-recent-mobile")
        ?.forEach?.((el) => el.remove());
      return;
    }
    const host = hostEl
      || this.rootEl?.querySelector?.(".plg-manual-cat-zone")
      || this.rootEl?.querySelector?.(".plg-capture-card");
    if (!host) return;
    const grid = host.querySelector(".plg-cat-grid-manual");
    let recentRow = host.querySelector(".plg-manual-recent-desktop, .plg-manual-recent-mobile");
    const recent = getRecentManualCategories(
      this.plugin.store.data.transactions,
      this.flow,
      8,
    );
    if (!recent.length) {
      recentRow?.remove();
      return;
    }
    if (!recentRow) {
      recentRow = divCls(host, "plg-manual-recent plg-manual-recent-desktop");
      if (grid && grid.nextSibling) host.insertBefore(recentRow, grid.nextSibling);
      else if (grid) host.appendChild(recentRow);
    }
    let chips = recentRow.querySelector(".plg-manual-recent-chips-grid, .plg-manual-recent-chips-mobile");
    if (!chips) {
      recentRow.empty();
      chips = divCls(recentRow, "plg-manual-recent-chips plg-manual-recent-chips-grid");
    } else {
      chips.empty();
    }
    recent.forEach((pick) => {
      const chip = elCls(chips, "button", "plg-manual-recent-chip", {
        text: pick.subcategory ? `${pick.category}·${pick.subcategory}` : pick.category,
        attr: { type: "button" },
      });
      if (this.selectedCat === pick.category && this.selectedSub === pick.subcategory) chip.addClass("active");
      chip.onclick = () => {
        this.selectedCat = pick.category;
        this.selectedSub = pick.subcategory || "";
        this.closeSubPopover();
        this.updateSelectionHint();
        this.rootEl?.querySelectorAll(".plg-cat-cell").forEach((el) => {
          el.toggleClass("active", el.dataset.cat === pick.category);
        });
        window.setTimeout(() => focusCaptureField(this.amountInput), 40);
      };
    });
  }

  refreshFlowGrid() {
    this.selectedCat = null;
    this.selectedSub = "";
    this.closeSubPopover();
    const grid = this.rootEl?.querySelector?.(".plg-cat-grid-manual");
    if (grid) this.renderCategoryGrid(grid);
    this.refreshRecentChips();
    this.updateSelectionHint();
    this.syncFlowUi();
    // 支出↔收入勿重测壳高：已锁定后 force 重测会因分类变少闪缩
  }

  syncFlowUi() {
    this.rootEl?.querySelectorAll(".plg-flow-tabs-inline button").forEach((btn) => {
      const id = btn.dataset.flow || (btn.textContent.trim() === "支出" ? "expense" : "income");
      btn.toggleClass("active", id === this.flow);
    });
    if (this.flowSelect) this.flowSelect.value = this.flow;
    const showReimb = this.flow === "expense";
    const reimbHost = this.rootEl?.querySelector?.(".plg-manual-meta-cell-reimb");
    if (reimbHost) reimbHost.toggleClass("plg-is-hidden", !showReimb);
    this.rootEl?.querySelector?.(".plg-manual-meta-row-top")
      ?.toggleClass("plg-manual-meta-row-top-income", !showReimb);
    if (!showReimb) {
      this.reimburse = false;
      if (this.reimburseCheck) this.reimburseCheck.checked = false;
    }
  }

  updateSelectionHint() {
    const hint = this.selectionHintEl || this.rootEl?.querySelector?.(".plg-manual-selection-hint");
    if (!hint) return;
    const compact = !!this.rootEl?.querySelector?.(".plg-manual-mobile-compact")
      || isMobileCaptureUi()
      || isNativeMobileApp(this.plugin);
    if (!this.selectedCat) {
      // 移动端未选时不重复占位（顶部 mode hint 已说明）；桌面保留引导文案
      hint.setText(compact ? "" : "请选择一级分类（有二级时点开选择）");
      hint.removeClass("is-selected");
      hint.toggleClass("is-empty", compact);
      return;
    }
    const label = this.selectedSub ? `${this.selectedCat} · ${this.selectedSub}` : this.selectedCat;
    hint.setText(`已选：${label}`);
    hint.addClass("is-selected");
    hint.removeClass("is-empty");
  }

  renderCategoryGrid(grid) {
    grid.empty();
    const cats = this.categoriesForFlow();
    const compact = !!this.rootEl?.querySelector?.(".plg-manual-mobile-compact")
      || isMobileCaptureUi()
      || isNativeMobileApp(this.plugin);
    if (!cats.length) {
      renderLifeOsEmptyState(grid, {
        icon: "◎",
        message: "暂无分类，请先添加",
        ctaLabel: "去添加分类",
        onCta: () => this.plugin.openDashboardSettings({ section: "categories" }),
      });
      return;
    }
    // 移动端：分类少时单行排布，避免「3 个也占两行」
    if (compact) {
      const rows = cats.length <= 5 ? 1 : 2;
      grid.dataset.catRows = String(rows);
      applyCssProps(grid, { "--plg-manual-cat-rows": String(rows) });
      grid.toggleClass("plg-cat-grid-mobile-onerow", rows === 1);
    } else {
      delete grid.dataset.catRows;
      grid.removeClass("plg-cat-grid-mobile-onerow");
    }
    cats.forEach((cat) => {
      const cell = divCls(grid, "plg-cat-cell");
      cell.dataset.cat = cat.name;
      cell.setAttr("role", "button");
      cell.setAttr("tabindex", "0");
      cell.setAttr("aria-pressed", this.selectedCat === cat.name ? "true" : "false");
      if (this.selectedCat === cat.name) cell.addClass("active");
      applyCssProps(cell, { "--cat-color": cat.color || "#ccc" });
      const iconWrap = cell.createDiv({ cls: "plg-cat-cell-icon-wrap" });
      renderCategoryIcon(iconWrap, cat, { panelIcon: true });
      cell.createDiv({ cls: "plg-cat-cell-name", text: cat.name });
      const activate = (e) => {
        e.stopPropagation();
        this.selectedCat = cat.name;
        this.selectedSub = "";
        this.updateSelectionHint();
        grid.querySelectorAll(".plg-cat-cell").forEach((el) => {
          el.removeClass("active");
          el.setAttr("aria-pressed", "false");
        });
        cell.addClass("active");
        cell.setAttr("aria-pressed", "true");
        const subs = cat.subcategories || [];
        if (subs.length) this.openSubPopover(cell, subs);
        else {
          this.closeSubPopover();
          window.setTimeout(() => focusCaptureField(this.amountInput), 40);
        }
      };
      cell.onclick = activate;
      cell.onkeydown = (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        activate(e);
      };
    });
  }

  async save(keepOpen = false) {
    const amount = parsePositiveAmount(this.amount);
    if (!amount) return new Notice("请输入有效金额");
    if (!this.selectedCat) return new Notice("请选择分类");
    if (this.dateInput?.value && this.timePartInput?.value) {
      this.datetimeLocal = `${this.dateInput.value}T${this.timePartInput.value}`;
    }
    if (!this.datetimeLocal) return new Notice("请选择日期和时间");
    const dtTest = new Date(this.datetimeLocal);
    if (Number.isNaN(dtTest.getTime())) return new Notice("日期或时间无效");
    const dtRaw = this.datetimeLocal || "";
    const dt = dtRaw.replace("T", " ");
    const datetime = dt.length >= 16 ? dt : (() => {
      const n = new Date();
      return `${dateKey(n)} ${pad2(n.getHours())}:${pad2(n.getMinutes())}`;
    })();
    const tx = {
      id: uid(),
      datetime,
      flow: this.flow,
      category: this.selectedCat,
      subcategory: this.selectedSub || "",
      amount,
      ledger: this.plugin.store.data.ledger || "",
      accountOut: this.flow === "transfer" ? "默认" : "",
      accountIn: this.flow === "transfer" ? "默认" : "",
      note: this.note || "",
      reimburse: this.flow === "expense" ? !!this.reimburse : false,
      discount: 0,
      tags: [],
      member: "",
      source: "manual",
    };
    try {
      await this.plugin.store.addTransaction(tx, { learnText: this.note || "" });
    } catch (err) {
      console.error(err);
      return new Notice("记账失败，请重试");
    }
    new Notice(`已记账 · ${this.selectedCat}${this.selectedSub ? ` · ${this.selectedSub}` : ""} · ¥${fmtMoney(amount)}`);
    if (keepOpen) {
      this.clearDraft({ keepDatetime: true, silent: true });
      focusCaptureField(this.amountInput);
    }
    this.callbacks.onSaved?.({ keepOpen });
  }

  clearDraft(opts = {}) {
    this.closeSubPopover();
    this.amount = "";
    this.selectedCat = null;
    this.selectedSub = "";
    this.note = "";
    this.reimburse = false;
    if (this.reimburseCheck) this.reimburseCheck.checked = false;
    if (this.amountInput) this.amountInput.value = "";
    const noteInp = this.rootEl?.querySelector?.(".plg-manual-note-input");
    if (noteInp) noteInp.value = "";
    if (!opts.keepDatetime) {
      const now = new Date();
      this.datetimeLocal = `${dateKey(now)}T${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
      const [d, t] = this.datetimeLocal.split("T");
      if (this.dateInput) this.dateInput.value = d;
      if (this.timePartInput) this.timePartInput.value = t;
    }
    const grid = this.rootEl?.querySelector?.(".plg-cat-grid-manual");
    if (grid) this.renderCategoryGrid(grid);
    this.refreshRecentChips();
    this.updateSelectionHint();
    if (!opts.silent) new Notice("已清除草稿");
  }
}

function isCapturePreviewLowConf(parsed) {
  return (parsed.confidence || 0) < 0.5 || parsed.matchReason === "fallback";
}

function patchCaptureParsed(parsed, patch) {
  const next = { ...parsed, ...patch };
  if (patch.category != null || patch.subcategory != null || patch.amount != null) {
    next.confidence = Math.max(next.confidence || 0, 0.88);
    next.matchReason = "manual-fix";
    next.matchLabel = "手动修正";
  }
  return next;
}

function renderCapturePreview(previewEl, parsed, ctx) {
  const {
    plugin, mode, getPreview, setPreview, listEl, draftSource, onConfirm, onClose,
  } = ctx;
  previewEl.empty();
  if (!parsed) {
    previewEl.addClass("hidden");
    listEl?.removeClass("hidden");
    previewEl.closest?.(".plg-capture-card-mobile")?.classList.remove("plg-smart-has-preview");
    return;
  }
  previewEl.removeClass("hidden");
  const lowConf = isCapturePreviewLowConf(parsed);
  previewEl.toggleClass("plg-preview-low-confidence", lowConf);
  const mobilePreview = !!previewEl.closest?.(".plg-overlay-mobile-fit");
  if (mobilePreview && listEl) listEl.addClass("hidden");
  const mobileCard = previewEl.closest?.(".plg-capture-card-mobile");
  mobileCard?.classList.toggle("plg-smart-has-preview", !!parsed);
  syncMobileCaptureFooterInset(previewEl.closest(".plg-overlay-panel"));

  if (lowConf) {
    const quick = previewEl.createDiv({ cls: "plg-preview-quick-fix" });
    quick.createDiv({ cls: "plg-preview-quick-label", text: "快速修正分类与金额" });
    const row = quick.createDiv({ cls: "plg-preview-quick-row" });
    const catSel = row.createEl("select", {
      cls: "plg-preview-quick-cat",
      attr: { "aria-label": "分类" },
    });
    const flowCats = (plugin.store.data.categories || []).filter((c) => (
      parsed.flow === "income" ? c.flow === "income" : c.flow !== "income"
    ));
    flowCats.forEach((c) => {
      const o = catSel.createEl("option", { value: c.name, text: c.name });
      if (c.name === parsed.category) o.selected = true;
    });
    const subSel = row.createEl("select", {
      cls: "plg-preview-quick-sub",
      attr: { "aria-label": "二级分类" },
    });
    const fillSubs = (catName) => {
      subSel.empty();
      subSel.createEl("option", { value: "", text: "无二级" });
      const cat = flowCats.find((c) => c.name === catName);
      (cat?.subcategories || []).forEach((sub) => {
        const name = subcategoryName(sub);
        const o = subSel.createEl("option", { value: name, text: name });
        if (name === (parsed.subcategory || "")) o.selected = true;
      });
    };
    fillSubs(parsed.category || catSel.value);
    const amtInp = row.createEl("input", {
      type: "text",
      cls: "plg-preview-quick-amt",
      attr: { inputmode: "decimal", "aria-label": "金额" },
    });
    amtInp.value = String(parsed.amount || "");
    const applyQuick = () => {
      const next = patchCaptureParsed(getPreview(), {
        category: catSel.value,
        subcategory: subSel.value,
        amount: parseFloat(amtInp.value) || 0,
      });
      setPreview(next);
      renderCapturePreview(previewEl, next, ctx);
    };
    catSel.onchange = () => { fillSubs(catSel.value); applyQuick(); };
    subSel.onchange = applyQuick;
    amtInp.onchange = applyQuick;
  }

  const iconMeta = getTransactionIconMeta(
    plugin.store.data.categories,
    parsed.category,
    parsed.subcategory,
    plugin.store.data.subscriptions,
    plugin.store.data.recurring,
  );
  const head = previewEl.createDiv({ cls: "plg-preview-head" });
  const iconSlot = head.createDiv({ cls: "plg-preview-icon" });
  renderCategoryIcon(iconSlot, iconMeta, { panelIcon: true });
  const info = head.createDiv({ cls: "plg-preview-info" });
  const flowLabel = parsed.flow === "income" ? "收入" : parsed.flow === "transfer" ? "转账" : "支出";
  info.createDiv({
    cls: "plg-preview-title",
    text: parsed.subcategory ? `${parsed.category} · ${parsed.subcategory}` : parsed.category,
  });
  info.createDiv({
    cls: "plg-preview-sub",
    text: `${flowLabel} · ${parsed.datetime || ""} · ${formatMatchHint(parsed)}`,
  });
  if (lowConf) {
    info.createDiv({ cls: "plg-preview-warn", text: "⚠️ 分类置信度较低，请确认或快速修正后再入账" });
  }
  const amtEl = head.createDiv({
    text: (parsed.flow === "income" ? "+" : "-") + fmtMoney(parsed.amount),
  });
  addClasses(amtEl, "plg-preview-amt", parsed.flow === "income" ? "inc" : "exp");

  const actions = previewEl.createDiv({ cls: "plg-preview-actions" });
  actions.createEl("button", { text: "修改", cls: "plg-btn-ghost", attr: { type: "button" } }).onclick = () => {
    const tx = parsedToTransaction(getPreview(), plugin.store.data.ledger, draftSource);
    const raw = getPreview().raw;
    openEditTransaction(plugin.app, plugin, tx, (updated) => {
      plugin.openCaptureModal(mode, txToParsed(updated, { confidence: 1, raw }));
    }, null, { draft: true, onBeforeOpen: () => onClose?.() });
  };
  actions.createEl("button", {
    text: "确认入账",
    cls: "plg-btn-primary",
    attr: { type: "button" },
  }).onclick = () => onConfirm(false);
  actions.createEl("button", {
    text: "再记",
    cls: "plg-btn-ghost",
    attr: { type: "button" },
  }).onclick = () => onConfirm(true);
  window.requestAnimationFrame(() => {
    syncMobileCaptureOverlay();
    scheduleDesktopCaptureLayoutSync(previewEl.closest(".plg-capture-modal-body"));
    if (mobilePreview) {
      const scrollRoot = previewEl.closest(".plg-capture-mobile-scroll");
      const runScroll = () => {
        if (scrollRoot) {
          scrollRoot.scrollTop = Math.max(0, previewEl.offsetTop - 8);
        } else {
          previewEl.scrollIntoView({ block: "nearest" });
        }
      };
      runScroll();
      window.setTimeout(runScroll, 80);
    }
  });
}

// ─── Smart capture ───────────────────────────────────────────────────────────

class SmartCapturePanel {
  constructor(plugin, callbacks) {
    this.plugin = plugin;
    this.callbacks = callbacks || {};
    this.sessionEntries = [];
    this.preview = null;
  }

  render(parent) {
    renderCaptureShell(parent, (card) => {
      const { scroll, footer, isMobile, flat } = captureMobileRegions(card);

      if (isMobile) {
        const host = scroll;
        addClasses(card, "plg-smart-mobile-fill", "plg-smart-mobile-layout");
        this.textarea = host.createEl("textarea", {
          cls: "plg-smart-textarea",
          attr: {
            placeholder: "输入文字，或粘贴账单文字…",
            rows: flat ? "4" : "3",
          },
        });
        this.listEl = host.createDiv({ cls: "plg-capture-list" });
        const toolbar = divCls(host, "plg-capture-toolbar plg-capture-toolbar-bottom plg-capture-toolbar-in-scroll plg-smart-mobile-toolbar");
        this.pasteBtn = elCls(toolbar, "button", "plg-capture-tool", { text: "📋 粘贴", attr: { type: "button" } });
        this.parseBtn = elCls(toolbar, "button", "plg-capture-send mod-cta", { text: "🔍 识别", attr: { type: "button" } });
        this.previewEl = divCls(host, "plg-capture-preview hidden");
        footer.addClass("plg-capture-mobile-footer-empty");
      } else {
        card.addClass("plg-capture-card-desktop-fill");
        const fill = card.createDiv({ cls: "plg-capture-input-box" });
        this.textarea = fill.createEl("textarea", {
          cls: "plg-smart-textarea",
          attr: {
            placeholder: "输入文字，或粘贴账单文字…",
            rows: "1",
          },
        });
        addClasses(this.textarea, "plg-smart-textarea-fill");
        const toolbar = divCls(fill, "plg-capture-toolbar plg-capture-toolbar-bottom plg-capture-toolbar-inbox");
        this.pasteBtn = elCls(toolbar, "button", "plg-capture-tool", { text: "📋 粘贴", attr: { type: "button" } });
        this.parseBtn = elCls(toolbar, "button", "plg-capture-send mod-cta", { text: "🔍 识别", attr: { type: "button" } });
        this.previewEl = divCls(card, "plg-capture-preview hidden");
        this.listEl = card.createDiv({ cls: "plg-capture-list" });
      }

      this.textarea.addEventListener("keydown", (e) => {
        if (e.key !== "Enter" || e.shiftKey) return;
        if (e.isComposing || e.keyCode === 229) return;
        e.preventDefault();
        this.runParse();
      });
      this.parseBtn.onclick = () => this.runParse();
      this.pasteBtn.onclick = () => this.pasteFromClipboard();

      this.renderPreview(null);
      this.renderSessionList();
    }, "plg-smart-panel");
  }

  async pasteFromClipboard() {
    try {
      const items = await navigator.clipboard.read();
      for (const item of items) {
        if (item.types.includes("text/plain")) {
          const blob = await item.getType("text/plain");
          this.textarea.value = await blob.text();
          this.runParse();
          return;
        }
      }
      new Notice("剪贴板无文本");
    } catch (_) {
      new Notice("无法读取剪贴板");
    }
  }

  runParse() {
    const text = this.textarea?.value?.trim();
    if (!text) return new Notice("请输入文字");
    const parsed = parseSmartInput(
      text,
      this.plugin.store.data.categories,
      this.plugin.settings.categoryKeywords,
      this.plugin.store.data.transactions
    );
    if (parsed?.error) return new Notice(parsed.error);
    this.preview = parsed;
    this.renderPreview(parsed);
    syncMobileCaptureOverlay();
    window.setTimeout(syncMobileCaptureOverlay, 120);
    scheduleDesktopCaptureLayoutSync(this.previewEl?.closest(".plg-capture-modal-body"));
  }

  renderPreview(parsed) {
    if (!this.previewEl) return;
    renderCapturePreview(this.previewEl, parsed, {
      plugin: this.plugin,
      mode: "smart",
      draftSource: "smart-draft",
      getPreview: () => this.preview,
      setPreview: (p) => { this.preview = p; },
      listEl: this.listEl,
      onClose: () => this.callbacks.onClose?.(),
      onConfirm: (keepOpen) => this.confirmSave(keepOpen),
    });
  }

  clearDraft() {
    if (this.textarea) this.textarea.value = "";
    this.preview = null;
    this.sessionEntries = [];
    this.renderPreview(null);
    this.renderSessionList();
    focusCaptureField(this.textarea);
    new Notice("已清除草稿");
  }

  async confirmSave(keepOpen = false) {
    if (!this.preview) {
      const text = this.textarea?.value?.trim();
      return new Notice(text ? "请先点「识别」确认这一笔" : "请输入要记的内容");
    }
    const tx = parsedToTransaction(this.preview, this.plugin.store.data.ledger, "smart");
    await this.plugin.store.addTransaction(tx, {
      learnText: this.preview.raw || this.textarea?.value || this.preview.note || "",
    });
    this.sessionEntries.unshift(tx);
    if (this.sessionEntries.length > 8) this.sessionEntries.pop();
    new Notice("已记账");
    if (this.textarea) this.textarea.value = "";
    this.preview = null;
    this.renderPreview(null);
    this.renderSessionList();
    this.callbacks.onSaved?.({ keepOpen });
    if (keepOpen) focusCaptureField(this.textarea);
  }

  renderSessionList() {
    if (!this.listEl) return;
    this.listEl.empty();
    if (!this.sessionEntries.length) return;
    this.listEl.createEl("h4", { text: "本次记录" });
    this.sessionEntries.forEach((t) => {
      const iconMeta = getTransactionIconMeta(this.plugin.store.data.categories, t.category, t.subcategory, this.plugin.store.data.subscriptions, this.plugin.store.data.recurring);
      const row = this.listEl.createDiv({ cls: "plg-capture-row plg-capture-row-static" });
      const iconSlot = row.createDiv({ cls: "plg-tx-icon" });
      renderCategoryIcon(iconSlot, iconMeta, { panelIcon: true });
      const mid = row.createDiv({ cls: "plg-tx-mid" });
      mid.createDiv({
        cls: "plg-tx-title",
        text: buildTransactionDisplayTitle(this.plugin.store.data.categories, t),
      });
      const amtCell = row.createDiv({
        text: (t.flow === "income" ? "+" : "-") + fmtMoney(t.amount),
      });
      addClasses(amtCell, "plg-tx-amt", t.flow === "income" ? "inc" : "exp");
    });
    scheduleDesktopCaptureLayoutSync(this.listEl.closest(".plg-capture-modal-body"));
  }
}

// ─── OCR capture ─────────────────────────────────────────────────────────────

function getFflateGunzip() {
  const lib = typeof __MUMU_FFLATE__ !== "undefined" ? __MUMU_FFLATE__ : null;
  if (lib?.gunzipSync) return lib.gunzipSync.bind(lib);
  return null;
}

const OCR_CACHE_PATH = "plain-ledger-tesseract";
const OCR_LANGS = ["chi_sim", "eng"];

function ocrLangCacheKey(lang) {
  return `${OCR_CACHE_PATH}/${lang}.traineddata`;
}

function idbKeyvalGet(key) {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("keyval-store");
    req.onerror = () => reject(req.error);
    req.onupgradeneeded = (ev) => {
      if (!ev.target.result.objectStoreNames.contains("keyval")) {
        ev.target.result.createObjectStore("keyval");
      }
    };
    req.onsuccess = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("keyval")) {
        resolve(undefined);
        return;
      }
      const tx = db.transaction("keyval", "readonly");
      const getReq = tx.objectStore("keyval").get(key);
      getReq.onsuccess = () => resolve(getReq.result);
      getReq.onerror = () => reject(getReq.error);
    };
  });
}

function idbKeyvalSet(key, val) {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("keyval-store");
    req.onerror = () => reject(req.error);
    req.onupgradeneeded = (ev) => {
      if (!ev.target.result.objectStoreNames.contains("keyval")) {
        ev.target.result.createObjectStore("keyval");
      }
    };
    req.onsuccess = () => {
      const db = req.result;
      const tx = db.transaction("keyval", "readwrite");
      tx.objectStore("keyval").put(val, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    };
  });
}

async function readBundledLangGz(plugin, lang) {
  if (typeof Platform === "undefined" || !Platform.isDesktop || !plugin?.manifest?.dir) return null;
  try {
    const rel = normalizePath(`${plugin.manifest.dir}/vendor/lang/${lang}.traineddata.gz`);
    const adapter = plugin.app?.vault?.adapter;
    if (!adapter?.exists || !adapter?.readBinary) return null;
    if (await adapter.exists(rel)) {
      const buf = await adapter.readBinary(rel);
      return buf ? new Uint8Array(buf) : null;
    }
  } catch (_) { /* ignore */ }
  return null;
}

function langDownloadUrls(lang) {
  const base = `@tesseract.js-data/${lang}/4.0.0_best_int/${lang}.traineddata.gz`;
  return [
    `https://cdn.jsdelivr.net/npm/${base}`,
    `https://unpkg.com/${base}`,
    `https://gcore.jsdelivr.net/npm/${base}`,
  ];
}

async function fetchLangGz(plugin, url, _timeoutMs = 60000) {
  if (typeof requestUrl !== "function") throw new Error("当前环境不支持网络请求");
  const resp = await requestUrl({ url, method: "GET", throw: false });
  if (resp.status >= 400) throw new Error(`HTTP ${resp.status}`);
  return new Uint8Array(resp.arrayBuffer);
}

async function ensureOcrLangCached(plugin, onProgress) {
  const gunzip = getFflateGunzip();
  if (!gunzip) throw new Error("解压模块不可用");

  for (const lang of OCR_LANGS) {
    const cacheKey = ocrLangCacheKey(lang);
    const cached = await idbKeyvalGet(cacheKey);
    if (cached) continue;

    const label = lang === "chi_sim" ? "中文" : "英文";
    onProgress?.(`正在准备${label}语言包…`);

    let gz = await readBundledLangGz(plugin, lang);
    if (gz) {
      onProgress?.(`正在解压内置${label}语言包…`);
    } else {
      let lastErr = null;
      for (const url of langDownloadUrls(lang)) {
        try {
          onProgress?.(`正在下载${label}语言包…`);
          gz = await fetchLangGz(plugin, url);
          break;
        } catch (e) {
          lastErr = e;
        }
      }
      if (!gz) {
        throw new Error(`语言包下载失败（${label}），请检查网络。${lastErr?.message || ""}`.trim());
      }
    }

    const data = gunzip(gz);
    await idbKeyvalSet(cacheKey, data);
  }
}

function formatOcrError(err) {
  if (err == null) {
    return "OCR 初始化失败，请检查 Obsidian 是否允许插件访问网络（设置 → 社区插件）";
  }
  if (typeof err === "string") {
    if (!err || err === "undefined") {
      return "OCR Worker 无法加载核心模块，请确认网络可用并重试";
    }
    return err;
  }
  const msg = err.message || err.reason || err.status;
  if (msg && msg !== "undefined") return String(msg);
  if (err instanceof ErrorEvent && err.filename) {
    return `OCR Worker 加载失败：${err.filename}`;
  }
  try {
    return JSON.stringify(err);
  } catch (_) {
    return String(err);
  }
}

function buildTesseractOptions(onProgress) {
  const ver = "7.0.0";
  const coreVer = "7.0.0";
  let workerPath = `https://cdn.jsdelivr.net/npm/tesseract.js@v${ver}/dist/worker.min.js`;
  let workerBlobURL = true;
  let localBlobUrl = "";

  if (typeof __MUMU_TESSERACT_WORKER__ === "string" && __MUMU_TESSERACT_WORKER__) {
    localBlobUrl = URL.createObjectURL(new Blob([__MUMU_TESSERACT_WORKER__], { type: "application/javascript" }));
    workerPath = localBlobUrl;
    workerBlobURL = false;
  }

  return {
    localBlobUrl,
    options: {
      workerPath,
      workerBlobURL,
      corePath: `https://cdn.jsdelivr.net/npm/tesseract.js-core@v${coreVer}`,
      cachePath: OCR_CACHE_PATH,
      cacheMethod: "readwrite",
      logger: (m) => {
        if (!onProgress || !m) return;
        if (m.status === "loading tesseract core") {
          onProgress("正在加载 OCR 核心…");
        } else if (m.status === "loading language traineddata") {
          onProgress("正在加载语言包…");
        } else if (m.status === "initializing api") {
          onProgress("正在初始化 OCR…");
        } else if (m.status === "recognizing text" && typeof m.progress === "number") {
          onProgress(`识别中 ${Math.round(m.progress * 100)}%`);
        }
      },
    },
  };
}

async function runTesseractOcr(blob, plugin, onProgress) {
  const Tesseract = getMumuTesseract();
  if (!Tesseract) throw new Error("无法加载 OCR 引擎");

  await ensureOcrLangCached(plugin, onProgress);
  const { localBlobUrl, options } = buildTesseractOptions(onProgress);

  try {
    if (Tesseract.createWorker) {
      let worker;
      try {
        worker = await Tesseract.createWorker("chi_sim+eng", 1, options);
      } catch (e) {
        throw new Error(formatOcrError(e));
      }
      try {
        const { data } = await worker.recognize(blob);
        return data?.text || "";
      } finally {
        await worker.terminate();
      }
    }
    if (Tesseract.recognize) {
      const result = await Tesseract.recognize(blob, "chi_sim+eng", options);
      return result?.data?.text || "";
    }
    throw new Error("OCR API 不可用");
  } catch (e) {
    if (e instanceof Error && e.message && !e.message.includes("OCR")) {
      throw new Error(formatOcrError(e));
    }
    throw e;
  } finally {
    if (localBlobUrl) URL.revokeObjectURL(localBlobUrl);
  }
}

async function preloadOcrLangPack(plugin, onProgress) {
  await ensureOcrLangCached(plugin, onProgress);
  plugin.settings.ocrLangCached = true;
  await plugin.saveSettings();
}

class OcrCapturePanel {
  constructor(plugin, callbacks) {
    this.plugin = plugin;
    this.callbacks = callbacks || {};
    this.preview = null;
    this.pasteHandler = null;
    this._imageBlobUrl = null;
  }

  revokeImageBlobUrl() {
    if (!this._imageBlobUrl) return;
    URL.revokeObjectURL(this._imageBlobUrl);
    this._imageBlobUrl = null;
  }

  render(parent) {
    renderCaptureShell(parent, (card) => {
      const { scroll, footer, isMobile } = captureMobileRegions(card);
      const top = scroll;
      const buildDrop = (container, fillStyle) => {
        const drop = container.createDiv({ cls: "plg-ocr-drop" });
        if (fillStyle) addClasses(drop, "plg-ocr-drop-fill");
        drop.createDiv({ cls: "plg-ocr-drop-icon", text: "📷" });
        drop.createDiv({
          cls: "plg-ocr-drop-text",
          text: "点击上传 / 粘贴截图",
        });
        drop.createDiv({
          cls: "plg-ocr-drop-sub plg-muted",
          text: "支持微信 · 支付宝 · 银行 App",
        });
        this.previewImg = divCls(drop, "plg-ocr-preview-img hidden");
        const fileInput = container.createEl("input", { type: "file", cls: "plg-file-input-hidden", attr: { accept: "image/*" } });
        drop.onclick = () => fileInput.click();
        fileInput.onchange = () => {
          const f = fileInput.files?.[0];
          if (f) this.processImage(f);
        };
        return drop;
      };

      if (isMobile) {
        buildDrop(top, false);
        this.statusEl = divCls(top, "plg-ocr-status plg-muted");
        this.statusEl.setText("");
        this.langRow = top.createDiv({ cls: "plg-ocr-lang-row" });
        this.renderLangRow();
        this.resultEl = divCls(top, "plg-capture-preview hidden");
        footer.addClass("plg-capture-mobile-footer-empty");
      } else {
        card.addClass("plg-capture-card-desktop-fill");
        const fill = card.createDiv({ cls: "plg-capture-input-box" });
        buildDrop(fill, true);
        this.statusEl = divCls(card, "plg-ocr-status plg-muted");
        this.statusEl.setText("");
        this.langRow = card.createDiv({ cls: "plg-ocr-lang-row" });
        this.renderLangRow();
        this.resultEl = divCls(card, "plg-capture-preview hidden");
      }

      if (this.pasteHandler) parent.removeEventListener("paste", this.pasteHandler);
      this.pasteHandler = (e) => {
        const items = e.clipboardData?.items;
        if (!items) return;
        for (const item of items) {
          if (item.type.startsWith("image/")) {
            e.preventDefault();
            this.processImage(item.getAsFile());
            return;
          }
        }
      };
      parent.addEventListener("paste", this.pasteHandler);
    }, "plg-ocr-panel");
  }

  renderLangRow() {
    if (!this.langRow) return;
    this.langRow.empty();
    if (this.plugin.settings.ocrLangCached) {
      this.langRow.createSpan({ cls: "plg-ocr-lang-ready", text: "✓ OCR 语言包已就绪" });
      return;
    }
    this.langRow.createSpan({
      cls: "plg-ocr-lang-note",
      text: "桌面版优先使用内置语言包；首次约需解压/下载 4MB",
    });
    elCls(this.langRow, "button", "plg-btn-ghost plg-ocr-lang-preload", {
      text: "预下载",
      attr: { type: "button" },
    }).onclick = () => this.runLangPreload();
  }

  async runLangPreload() {
    if (!this.statusEl) return;
    try {
      this.statusEl.setText("正在下载语言包…");
      await preloadOcrLangPack(this.plugin, (msg) => {
        if (this.statusEl) this.statusEl.setText(msg);
      });
      new Notice("OCR 语言包已就绪，可粘贴截图识别");
      this.statusEl.setText("语言包已就绪，请粘贴或上传截图");
      this.renderLangRow();
    } catch (e) {
      const msg = formatOcrError(e);
      this.statusEl.setText("下载失败：" + msg);
      new Notice("语言包下载失败：" + msg);
    }
  }

  async processImage(file) {
    if (!file) return;
    this.statusEl.setText("准备识别…");
    this.revokeImageBlobUrl();
    this._imageBlobUrl = URL.createObjectURL(file);
    this.previewImg.empty();
    this.previewImg.removeClass("hidden");
    this.previewImg.createEl("img", { attr: { src: this._imageBlobUrl } });

    try {
      const text = await runTesseractOcr(file, this.plugin, (msg) => {
        if (this.statusEl) this.statusEl.setText(msg);
      });
      if (!text.trim()) {
        this.statusEl.setText("未识别到文字，请换一张更清晰的截图");
        return;
      }
      this.statusEl.setText(`识别文字：${text.slice(0, 80)}${text.length > 80 ? "…" : ""}`);
      const parsed = parseOcrReceiptText(
        text,
        this.plugin.store.data.categories,
        this.plugin.settings.categoryKeywords,
        this.plugin.store.data.transactions
      );
      if (parsed?.error) {
        this.statusEl.setText(parsed.error + " · 可切换到「智能」手动改文字");
        return;
      }
      parsed.note = (parsed.note ? parsed.note + " · " : "") + "截图识别";
      this.preview = parsed;
      if (!this.plugin.settings.ocrLangCached) {
        this.plugin.settings.ocrLangCached = true;
        await this.plugin.saveSettings();
        this.renderLangRow();
      }
      this.renderResult(parsed);
    } catch (e) {
      this.statusEl.setText("OCR 失败：" + formatOcrError(e));
    }
  }

  renderResult(parsed) {
    if (!this.resultEl) return;
    renderCapturePreview(this.resultEl, parsed, {
      plugin: this.plugin,
      mode: "ocr",
      draftSource: "ocr-draft",
      getPreview: () => this.preview,
      setPreview: (p) => { this.preview = p; },
      listEl: null,
      onClose: () => this.callbacks.onClose?.(),
      onConfirm: (keepOpen) => this.confirmSave(keepOpen),
    });
  }

  resetOcrForm() {
    this.preview = null;
    this._lastOcrText = "";
    this.revokeImageBlobUrl();
    this.previewImg?.empty();
    this.previewImg?.addClass("hidden");
    if (this.statusEl) this.statusEl.setText("");
    this.renderResult(null);
  }

  clearDraft() {
    this.resetOcrForm();
    new Notice("已清除草稿");
  }

  async confirmSave(keepOpen = false) {
    if (!this.preview) return new Notice("请先粘贴或上传截图并完成识别");
    const tx = parsedToTransaction(this.preview, this.plugin.store.data.ledger, "ocr");
    await this.plugin.store.addTransaction(tx, {
      learnText: this.preview.raw || this.preview.note || "",
    });
    new Notice("已记账");
    if (keepOpen) this.resetOcrForm();
    this.callbacks.onSaved?.({ keepOpen });
  }
}

// ─── Capture panel entry ───────────────────────────────────────────────────────

function openCapturePanel(plugin, opts = {}) {
  document.querySelectorAll(".modal-container").forEach((container) => {
    if (container.querySelector(".plg-capture-overlay, .plg-capture-modal-wrap")) {
      container.remove();
    }
  });
  document.body.removeClass("plg-mobile-force-top");
  document.body.removeClass("plg-capture-sheet-open");
  document.body.removeClass("plg-capture-kb-open");

  let mode = opts.mode || "smart";
  const initialPreview = opts.initialPreview || null;
  let smartPanel;
  let manualPanel;
  let ocrPanel;
  let modeBar;
  let bodyEl;
  let tabRoots = null;
  let tabsMounted = false;
  let tabSwitchLock = false;

  const allModes = [
    { id: "smart", label: "智能", hint: "例：前天咖啡18、工资11000、6.5午餐30、6月5日买菜42" },
    { id: "manual", label: "手动", hint: "点选分类，有二级时点开选择；再填金额保存" },
    { id: "ocr", label: "截图", hint: "粘贴或上传支付截图，OCR 识别后确认" },
  ];
  const mobileCapture = Platform.isMobile;
  const modes = mobileCapture ? allModes.filter((m) => m.id !== "ocr") : allModes;
  if (mobileCapture && mode === "ocr") mode = "smart";
  if (mode !== "smart" && mode !== "manual" && mode !== "ocr") mode = "smart";

  const modeHints = Object.fromEntries(modes.map((m) => [m.id, m.hint]));
  let modeHintEl;

  const mountCaptureTabs = () => {
    if (tabsMounted || !bodyEl) return;
    tabsMounted = true;
    tabRoots = {
      smart: divCls(bodyEl, "plg-capture-tab-pane"),
      manual: divCls(bodyEl, "plg-capture-tab-pane hidden"),
      ocr: divCls(bodyEl, "plg-capture-tab-pane hidden"),
    };
    Object.entries(tabRoots).forEach(([id, el]) => {
      el.setAttr("role", "tabpanel");
      el.id = `plg-capture-panel-${id}`;
      el.setAttr("aria-labelledby", `plg-capture-tab-${id}`);
    });
    manualPanel.rootEl = tabRoots.manual;
    smartPanel.render(tabRoots.smart);
    manualPanel.render(tabRoots.manual);
    ocrPanel.render(tabRoots.ocr);
    applyCaptureTabVisibility(tabRoots, mode);
  };

  const setMode = (next) => {
    if (next === mode || tabSwitchLock) return;
    tabSwitchLock = true;
    manualPanel?.closeSubPopover?.();
    mountCaptureTabs();

    blurCaptureFocusWithin(bodyEl);
    mode = next;
    modeBar?.querySelectorAll("button").forEach((b) => {
      const on = b.dataset.mode === mode;
      b.toggleClass("active", on);
      b.setAttr("aria-selected", on ? "true" : "false");
      b.setAttr("tabindex", on ? "0" : "-1");
    });
    if (modeHintEl) {
      modeHintEl.setText(
        mobileCapture
          ? `${modeHints[mode] || ""} · 截图 OCR 请在桌面端使用`
          : (modeHints[mode] || "")
      );
    }
    applyCaptureTabVisibility(tabRoots, mode);

    const panel = bodyEl?.closest?.(".plg-overlay-panel");
    updateCaptureSheetMode(panel, mode);
    afterCaptureTabSwitch(bodyEl, panel);
    window.setTimeout(() => { tabSwitchLock = false; }, 120);
  };

  openPlgOverlay({
    title: "记一笔",
    cls: "plg-capture-overlay",
    wide: true,
    build: (body, close) => {
      let releaseDesktopLayout = null;
      const closePanel = () => {
        document.removeEventListener("keydown", onPanelKey, true);
        manualPanel?.teardown?.();
        manualPanel?.closeSubPopover?.();
        ocrPanel?.revokeImageBlobUrl?.();
        releaseDesktopLayout?.();
        close();
      };
      // Esc 关最上层（有二级 popover 时先关它）；⌘↩ / Ctrl+↩ 保存当前这一笔
      const onPanelKey = (e) => {
        if (e.key === "Escape") {
          if (document.querySelector(".plg-sub-popover")) {
            manualPanel?.closeSubPopover?.();
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          e.preventDefault();
          closePanel();
          return;
        }
        if (e.key !== "Enter" || !(e.metaKey || e.ctrlKey)) return;
        if (e.isComposing || e.keyCode === 229) return;
        e.preventDefault();
        e.stopPropagation();
        if (mode === "manual") void manualPanel?.save(false);
        else if (mode === "ocr") void ocrPanel?.confirmSave(false);
        else if (smartPanel?.preview) void smartPanel.confirmSave(false);
        else smartPanel?.runParse();
      };
      document.addEventListener("keydown", onPanelKey, true);
      addClasses(body, "plg-capture-modal");
      const cbs = {
        onSaved: (opts = {}) => {
          plugin.refreshView();
          if (!opts.keepOpen) closePanel();
        },
        onClose: () => closePanel(),
      };
      manualPanel = new ManualCapturePanel(plugin, cbs);
      smartPanel = new SmartCapturePanel(plugin, cbs);
      ocrPanel = new OcrCapturePanel(plugin, {
        ...cbs,
        onSendToSmart: (text) => {
          setMode("smart");
          mountCaptureTabs();
          if (smartPanel.textarea) {
            smartPanel.textarea.value = text || "";
            focusCaptureField(smartPanel.textarea);
            smartPanel.runParse?.();
          }
        },
      });

      modeBar = body.createDiv({ cls: "plg-mode-tabs" });
      modeBar.setAttr("role", "tablist");
      modeBar.setAttr("aria-label", "记账录入方式");
      modes.forEach((m) => {
        const btn = modeBar.createEl("button", {
          text: m.label,
          attr: {
            type: "button",
            id: `plg-capture-tab-${m.id}`,
            title: m.hint,
            role: "tab",
            "aria-selected": mode === m.id ? "true" : "false",
            "aria-controls": `plg-capture-panel-${m.id}`,
            tabindex: mode === m.id ? "0" : "-1",
          },
        });
        if (mode === m.id) btn.addClass("active");
        btn.dataset.mode = m.id;
        btn.onclick = () => setMode(m.id);
      });
      modeBar.addEventListener("keydown", (e) => {
        const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
        if (!keys.includes(e.key)) return;
        e.preventDefault();
        const btns = [...modeBar.querySelectorAll("button[role='tab']")];
        const i = btns.findIndex((b) => b.dataset.mode === mode);
        let next = i;
        if (e.key === "ArrowLeft") next = (i - 1 + btns.length) % btns.length;
        if (e.key === "ArrowRight") next = (i + 1) % btns.length;
        if (e.key === "Home") next = 0;
        if (e.key === "End") next = btns.length - 1;
        setMode(btns[next].dataset.mode);
        btns[next].focus();
      });

      const hintRow = divCls(body, "plg-capture-mode-hint-row");
      modeHintEl = divCls(hintRow, "plg-capture-mode-hint plg-muted");
      modeHintEl.setText(
        mobileCapture
          ? `${modeHints[mode] || ""} · 截图 OCR 请在桌面端使用`
          : (modeHints[mode] || "")
      );
      const clearBtn = elCls(hintRow, "button", "plg-btn-ghost plg-capture-clear-btn", {
        text: "清除",
        attr: { type: "button", title: "清除当前页草稿", "aria-label": "清除当前页草稿" },
      });
      clearBtn.onclick = () => {
        const panel = mode === "ocr" ? ocrPanel : mode === "manual" ? manualPanel : smartPanel;
        panel?.clearDraft?.();
      };

      bodyEl = body.createDiv({ cls: "plg-capture-modal-body" });
      mountCaptureTabs();
      updateCaptureSheetMode(body.closest(".plg-overlay-panel"), mode);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          syncDesktopCaptureLayout(bodyEl);
          releaseDesktopLayout = bindDesktopCaptureLayoutResize(bodyEl);
          resetCaptureScrollAnchors(bodyEl);
          syncMobileCaptureOverlay();
          const panel = body.closest(".plg-overlay-panel");
          if (panel) syncMobileCaptureFooterInset(panel);
          if (mode === "smart") focusCaptureField(smartPanel.textarea);
        });
      });

      if (initialPreview) {
        if (mode === "smart") {
          smartPanel.preview = initialPreview;
          smartPanel.renderPreview(initialPreview);
          if (smartPanel.textarea && initialPreview.raw) {
            smartPanel.textarea.value = initialPreview.raw;
          }
        } else if (mode === "ocr") {
          ocrPanel.preview = initialPreview;
          ocrPanel.renderResult(initialPreview);
        }
        scheduleDesktopCaptureLayoutSync(bodyEl);
      }
    },
  });
}
