const { Plugin, ItemView, WorkspaceLeaf, Modal, Notice, PluginSettingTab, Setting, Platform, normalizePath, requestUrl, setCssProps, setCssStyles } = require("obsidian");

function setSvgContent(el, svg) {
  if (!el) return;
  if (typeof el.empty === "function") el.empty();
  else el.replaceChildren();
  const raw = String(svg || "").trim();
  if (!raw) return;
  const doc = new DOMParser().parseFromString(raw, "image/svg+xml");
  const node = doc.documentElement;
  if (node && node.nodeName.toLowerCase() === "svg") {
    el.appendChild(document.importNode(node, true));
  }
}

function applyCssProps(el, props) {
  if (!el || !props) return;
  if (typeof setCssProps === "function") {
    setCssProps(el, props);
    return;
  }
  if (typeof el.setCssProps === "function") {
    el.setCssProps(props);
    return;
  }
  Object.keys(props).forEach((name) => {
    const value = props[name];
    if (value == null || value === "") el.style.removeProperty(name);
    else el.style.setProperty(name, String(value));
  });
}

function applyCssStyles(el, styles) {
  if (!el || !styles) return;
  if (typeof setCssStyles === "function") {
    setCssStyles(el, styles);
    return;
  }
  if (typeof el.setCssStyles === "function") {
    el.setCssStyles(styles);
    return;
  }
  Object.keys(styles).forEach((name) => {
    const value = styles[name];
    const cssName = name.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
    if (value == null || value === "") el.style.removeProperty(cssName);
    else el.style.setProperty(cssName, String(value));
  });
}
