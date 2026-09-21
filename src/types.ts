export const VIEW_TYPE = "plain-ledger-dashboard";
export const ICON_NAME = "wallet";

export interface PlainLedgerSettings {
  licenseKey: string;
  trialStartedAt: string;
  trialWelcomeSeen: boolean;
  monthlyBudget: number;
  /** Path to ledger JSON relative to vault root */
  ledgerPath: string;
}

export const DEFAULT_SETTINGS: PlainLedgerSettings = {
  licenseKey: "",
  trialStartedAt: "",
  trialWelcomeSeen: false,
  monthlyBudget: 0,
  ledgerPath: "Finance/PlainLedger/ledger.json",
};
