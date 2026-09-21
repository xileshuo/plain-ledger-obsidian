const __obsidian = require("obsidian");
const Plugin = __obsidian.Plugin;
const ItemView = __obsidian.ItemView;
const WorkspaceLeaf = __obsidian.WorkspaceLeaf;
const Modal = __obsidian.Modal;
const Notice = __obsidian.Notice;
const PluginSettingTab = __obsidian.PluginSettingTab;
const Setting = __obsidian.Setting;
const Platform = __obsidian.Platform;
const normalizePath = __obsidian.normalizePath;
const requestUrl = __obsidian.requestUrl;
const setCssProps = __obsidian.setCssProps;
const setCssStyles = __obsidian.setCssStyles;

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
  try {
    if (typeof setCssProps === "function") {
      setCssProps(el, props);
      return;
    }
  } catch (_) { /* fall through */ }
  try {
    if (typeof el.setCssProps === "function") {
      el.setCssProps(props);
      return;
    }
  } catch (_) { /* fall through */ }
  Object.keys(props).forEach((name) => {
    const value = props[name];
    if (value == null || value === "") el.style.removeProperty(name);
    else el.style.setProperty(name, String(value));
  });
}

function applyCssStyles(el, styles) {
  if (!el || !styles) return;
  try {
    if (typeof setCssStyles === "function") {
      setCssStyles(el, styles);
      return;
    }
  } catch (_) { /* fall through */ }
  try {
    if (typeof el.setCssStyles === "function") {
      el.setCssStyles(styles);
      return;
    }
  } catch (_) { /* fall through */ }
  Object.keys(styles).forEach((name) => {
    const value = styles[name];
    const cssName = name.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
    if (value == null || value === "") el.style.removeProperty(cssName);
    else el.style.setProperty(cssName, String(value));
  });
}
