import type { App } from "obsidian";
import type { PlainLedgerSettings } from "./types";

/** Edition flags are injected by `editions/*/00-edition.js` at bundle time. */
declare const PLUGIN_REQUIRE_LICENSE: boolean | undefined;
declare const PLUGIN_TRIAL_HOURS: number | undefined;

export function isLicenseRequired(): boolean {
  return typeof PLUGIN_REQUIRE_LICENSE === "undefined" ? false : !!PLUGIN_REQUIRE_LICENSE;
}

export function isTrialEdition(): boolean {
  const hours = Number(typeof PLUGIN_TRIAL_HOURS !== "undefined" ? PLUGIN_TRIAL_HOURS : 0);
  return hours > 0 && isLicenseRequired();
}

function hashStringToHex(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16).toUpperCase();
}

export function getVaultFingerprint(app: App): string {
  const vaultName = app.vault?.getName?.() || "UnknownVault";
  return "PLG-" + hashStringToHex(String(vaultName));
}

export function computeExpectedLicenseKeyFromFingerprint(fp: string): string {
  let hash = 0;
  for (let i = 0; i < fp.length; i++) {
    hash = (hash << 5) - hash + fp.charCodeAt(i);
    hash |= 0;
  }
  return "KEY-" + Math.abs(hash ^ 0x8899).toString(16).toUpperCase();
}

export function isLicenseValid(app: App, key: string): boolean {
  if (!key || !String(key).trim()) return false;
  const normalized = String(key).trim().toUpperCase();
  const expected = computeExpectedLicenseKeyFromFingerprint(getVaultFingerprint(app));
  return normalized === expected;
}

export function syncLicenseState(app: App, settings: PlainLedgerSettings): boolean {
  return isLicenseValid(app, settings.licenseKey || "");
}

function getVaultScopedStorageKey(app: App, suffix: string): string {
  const vaultName = app.vault?.getName?.() || "UnknownVault";
  return `plain-ledger:${vaultName}:${suffix}`;
}

export function ensureTrialStarted(app: App, settings: PlainLedgerSettings, force = false): void {
  if (!isTrialEdition() || syncLicenseState(app, settings)) return;
  if (!force && !settings.trialWelcomeSeen) return;
  const storageKey = getVaultScopedStorageKey(app, "trialStartedAt");
  let started = settings.trialStartedAt || "";
  if (!started) {
    try {
      started = localStorage.getItem(storageKey) || "";
    } catch {
      /* ignore */
    }
  }
  if (!started) {
    started = new Date().toISOString();
    try {
      localStorage.setItem(storageKey, started);
    } catch {
      /* ignore */
    }
  }
  if (settings.trialStartedAt !== started) settings.trialStartedAt = started;
}

export function getTrialRemainingMs(app: App, settings: PlainLedgerSettings): number {
  if (!isTrialEdition() || syncLicenseState(app, settings)) return 0;
  ensureTrialStarted(app, settings);
  const started = settings.trialStartedAt;
  if (!started) return 0;
  const elapsed = Date.now() - new Date(started).getTime();
  const total = Number(PLUGIN_TRIAL_HOURS) * 60 * 60 * 1000;
  return Math.max(0, total - elapsed);
}

export function isTrialActive(app: App, settings: PlainLedgerSettings): boolean {
  return isTrialEdition() && getTrialRemainingMs(app, settings) > 0;
}

export function isPluginAccessAllowed(app: App, settings: PlainLedgerSettings): boolean {
  if (!isLicenseRequired()) return true;
  if (syncLicenseState(app, settings)) return true;
  return isTrialActive(app, settings);
}
