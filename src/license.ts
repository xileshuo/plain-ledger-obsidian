function isLicenseRequired() {
  return typeof PLUGIN_REQUIRE_LICENSE === "undefined" ? false : !!PLUGIN_REQUIRE_LICENSE;
}

function isTrialEdition() {
  const hours = Number(typeof PLUGIN_TRIAL_HOURS !== "undefined" ? PLUGIN_TRIAL_HOURS : 0);
  return hours > 0 && isLicenseRequired();
}

function getTrialHoursLabel() {
  const h = Number(typeof PLUGIN_TRIAL_HOURS !== "undefined" ? PLUGIN_TRIAL_HOURS : 0);
  return h > 0 ? `${h} 小时` : "";
}

function getVaultScopedStorageKey(app, suffix) {
  const vaultName = app.vault?.getName?.() || "UnknownVault";
  return `plain-ledger:${vaultName}:${suffix}`;
}

function ensureTrialStarted(app, settings, force = false) {
  if (!isTrialEdition() || syncLicenseState(app, settings)) return;
  if (!force && !settings.trialWelcomeSeen) return;
  const storageKey = getVaultScopedStorageKey(app, "trialStartedAt");
  let started = settings.trialStartedAt || "";
  if (!started) {
    try { started = localStorage.getItem(storageKey) || ""; } catch { /* ignore */ }
  }
  if (!started) {
    started = new Date().toISOString();
    try { localStorage.setItem(storageKey, started); } catch { /* ignore */ }
  }
  if (settings.trialStartedAt !== started) settings.trialStartedAt = started;
}

function getTrialRemainingMs(app, settings) {
  if (!isTrialEdition() || syncLicenseState(app, settings)) return 0;
  ensureTrialStarted(app, settings);
  const started = settings.trialStartedAt;
  if (!started) return 0;
  const elapsed = Date.now() - new Date(started).getTime();
  const total = Number(PLUGIN_TRIAL_HOURS) * 60 * 60 * 1000;
  return Math.max(0, total - elapsed);
}

function isTrialActive(app, settings) {
  return isTrialEdition() && getTrialRemainingMs(app, settings) > 0;
}

function isPluginAccessAllowed(app, settings) {
  if (!isLicenseRequired()) return true;
  if (syncLicenseState(app, settings)) return true;
  return isTrialActive(app, settings);
}

function hashStringToHex(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16).toUpperCase();
}

function getVaultFingerprint(app) {
  const vaultName = app.vault?.getName?.() || "UnknownVault";
  return "PLG-" + hashStringToHex(String(vaultName));
}

function computeExpectedLicenseKeyFromFingerprint(fp) {
  let hash = 0;
  for (let i = 0; i < fp.length; i++) {
    hash = (hash << 5) - hash + fp.charCodeAt(i);
    hash |= 0;
  }
  return "KEY-" + Math.abs(hash ^ 0x8899).toString(16).toUpperCase();
}

function isLicenseValid(app, key) {
  if (!key || !String(key).trim()) return false;
  const normalized = String(key).trim().toUpperCase();
  const expected = computeExpectedLicenseKeyFromFingerprint(getVaultFingerprint(app));
  return normalized === expected;
}

function syncLicenseState(app, settings) {
  const ok = isLicenseValid(app, settings.licenseKey);
  settings.licenseActivated = ok;
  return ok;
}

function isPluginLicensed(app, settings) {
  return isPluginAccessAllowed(app, settings);
}

function bundledSampleHint() {
  return typeof PLUGIN_BUNDLED_SAMPLE_HINT !== "undefined"
    ? PLUGIN_BUNDLED_SAMPLE_HINT
    : "内置示例账单";
}

const LICENSE_FINGERPRINT_LABEL = "PLG-XXXXXXXX";
const LICENSE_FINGERPRINT_HINT = "复制设备专属指纹，发给作者获取激活码。";

async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}
