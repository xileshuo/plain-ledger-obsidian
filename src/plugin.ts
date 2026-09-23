import { Plugin, Notice } from "obsidian";
import {
  DEFAULT_SETTINGS,
  VIEW_TYPE,
  ICON_NAME,
  type PlainLedgerSettings,
} from "./types";
import {
  getVaultFingerprint,
  isLicenseRequired,
  isPluginAccessAllowed,
} from "./license-mod";

/**
 * Obsidian plugin class (TypeScript module form).
 * The shipped bundle wires the full UI from the concat modules; this class is
 * the reviewable entry surface: settings, license gate, and lifecycle.
 */
export class PlainLedgerPlugin extends Plugin {
  settings: PlainLedgerSettings = { ...DEFAULT_SETTINGS };

  async onload(): Promise<void> {
    await this.loadSettings();
    // 与 4.0.3 一致：使用 Obsidian 内置 wallet，不注册自定义 SVG
    this.addRibbonIcon(ICON_NAME, "PlainLedger", () => {
      void this.activateView();
    });

    this.addCommand({
      id: "open-plain-ledger",
      name: "Open PlainLedger panel",
      callback: () => {
        void this.activateView();
      },
    });

    if (isLicenseRequired() && !isPluginAccessAllowed(this.app, this.settings)) {
      new Notice("PlainLedger: start the 48-hour trial or enter an activation code.");
    }
  }

  onunload(): void {
    // Views/modals cleaned up by Obsidian when the plugin unloads.
  }

  async loadSettings(): Promise<void> {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }

  getFingerprint(): string {
    return getVaultFingerprint(this.app);
  }

  async activateView(): Promise<void> {
    const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE);
    if (leaves.length > 0) {
      await this.app.workspace.revealLeaf(leaves[0]);
      return;
    }
    const leaf = this.app.workspace.getRightLeaf(false);
    if (!leaf) {
      new Notice("PlainLedger: could not open a workspace leaf.");
      return;
    }
    await leaf.setViewState({ type: VIEW_TYPE, active: true });
    await this.app.workspace.revealLeaf(leaf);
  }
}
