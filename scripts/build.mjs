import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const edition = process.env.PLG_EDITION || process.argv[2] || "personal";
const editionDir = path.join(root, "editions", edition);
if (!fs.existsSync(editionDir)) {
  console.error(`Unknown edition "${edition}". Use personal, public, or trial24h.`);
  process.exit(1);
}
const fflate = fs.readFileSync(path.join(root, "node_modules/fflate/umd/index.js"), "utf8");
const bridge = [
  "var __MUMU_FFLATE__ = (typeof fflate !== \"undefined\" ? fflate : null);",
  "if (!__MUMU_FFLATE__ && typeof module !== \"undefined\" && module.exports && module.exports.unzipSync) {",
  "  __MUMU_FFLATE__ = module.exports;",
  "}",
].join("\n");
const partFiles = [
  "src/00-obsidian.ts",
  "src/license.ts",
  "src/lifeos-ui-shared.ts",
  "src/lifeos-trial.ts",
  "src/lifeos-suite.ts",
  "src/usage-guide.ts",
  "src/activation-ui.ts",
  "src/update-sections.ts",
  "src/update-notice.ts",
  "src/settings-tab-layout.ts",
  "src/lunar-lite.ts",
  "src/smart-parser.ts",
  "src/capture-ui.ts",
  "src/iconfont-picker.ts",
  "src/settings-ui.ts",
  "src/plg-nav-icons.ts",
  "src/main-core.ts",
];
const editionChunks = [
  fs.readFileSync(path.join(editionDir, "00-edition.js"), "utf8"),
];
const bundledDefaultPath = path.join(editionDir, "bundled-default.js");
if (fs.existsSync(bundledDefaultPath)) {
  editionChunks.push(fs.readFileSync(bundledDefaultPath, "utf8"));
}
const parts = [
  fs.readFileSync(path.join(root, "src/00-obsidian.ts"), "utf8"),
  ...editionChunks,
  ...partFiles.slice(1).map((p) => fs.readFileSync(path.join(root, p), "utf8")),
];
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
parts[parts.length - 1] = parts[parts.length - 1].replace(
  /const PLUGIN_VERSION = "[^"]+";/,
  `const PLUGIN_VERSION = "${manifest.version}";`
);
const tesseractSrc = path.join(root, "node_modules/tesseract.js/dist/tesseract.min.js");
const tesseractBundle = fs.existsSync(tesseractSrc)
  ? fs.readFileSync(tesseractSrc, "utf8") + "\n"
  : "";
const tessBridge = [
  "var __MUMU_TESSERACT__ = (function(){",
  "  var t = null;",
  "  try {",
  "    if (typeof module !== \"undefined\" && module.exports) {",
  "      if (typeof module.exports.createWorker === \"function\") t = module.exports;",
  "      else if (module.exports.Tesseract) t = module.exports.Tesseract;",
  "    }",
  "  } catch (_) {}",
  "  var g = typeof globalThis !== \"undefined\" ? globalThis : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {};",
  "  if (!t && g.Tesseract) t = g.Tesseract;",
  "  if (!t && typeof self !== \"undefined\" && self.Tesseract) t = self.Tesseract;",
  "  if (t) g.__MUMU_TESSERACT__ = t;",
  "  return t;",
  "})();",
].join("\n");
const workerSrc = path.join(root, "node_modules/tesseract.js/dist/worker.min.js");
const workerEmbed = fs.existsSync(workerSrc)
  ? `var __MUMU_TESSERACT_WORKER__ = ${JSON.stringify(fs.readFileSync(workerSrc, "utf8"))};\n`
  : "var __MUMU_TESSERACT_WORKER__ = \"\";\n";
fs.writeFileSync(
  path.join(root, "main.js"),
  [fflate, bridge, tesseractBundle, tessBridge, workerEmbed, ...parts].join("\n")
);
console.log("Built main.js", edition, (fflate.length + tesseractBundle.length + workerEmbed.length + parts.join("").length) / 1024, "KB");

fs.copyFileSync(
  path.join(editionDir, "default-ledger.json"),
  path.join(root, "default-ledger.json"),
);
console.log(`Copied editions/${edition}/default-ledger.json → default-ledger.json`);

const vendorDir = path.join(root, "vendor");
fs.mkdirSync(vendorDir, { recursive: true });
if (fs.existsSync(tesseractSrc)) {
  fs.copyFileSync(tesseractSrc, path.join(vendorDir, "tesseract.min.js"));
  console.log("Copied tesseract.min.js to vendor/");
} else {
  console.log("tesseract.js not installed — OCR will use CDN fallback");
}
if (fs.existsSync(workerSrc)) {
  fs.copyFileSync(workerSrc, path.join(vendorDir, "worker.min.js"));
  console.log("Copied worker.min.js to vendor/");
}

const coreDir = path.join(root, "node_modules/tesseract.js-core");
const vendorCore = path.join(vendorDir, "tesseract-core");
if (fs.existsSync(coreDir)) {
  fs.mkdirSync(vendorCore, { recursive: true });
  [
    "tesseract-core.wasm.js",
    "tesseract-core-simd.wasm.js",
    "tesseract-core-lstm.wasm.js",
    "tesseract-core-simd-lstm.wasm.js",
    "tesseract-core-relaxedsimd.wasm.js",
    "tesseract-core-relaxedsimd-lstm.wasm.js",
  ].forEach((name) => {
    const src = path.join(coreDir, name);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(vendorCore, name));
    }
  });
  console.log("Copied tesseract.js-core wasm bundles to vendor/tesseract-core/");
}

const langVendorDir = path.join(vendorDir, "lang");
fs.mkdirSync(langVendorDir, { recursive: true });
["chi_sim", "eng"].forEach((lang) => {
  const src = path.join(root, "node_modules", `@tesseract.js-data/${lang}`, "4.0.0_best_int", `${lang}.traineddata.gz`);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(langVendorDir, `${lang}.traineddata.gz`));
  }
});
console.log("Copied OCR language packs to vendor/lang/");
