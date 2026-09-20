import { Plugin, Notice, addIcon } from "obsidian";
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
    addIcon(
      ICON_NAME,
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>`
    );

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
