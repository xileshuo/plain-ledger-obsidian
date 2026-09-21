/**
 * PlainLedger — public TypeScript entry for community review / esbuild.
 * Runtime release `main.js` is still assembled by `scripts/build.mjs` from the
 * ordered modules under this folder (same logic, concat pipeline).
 */
import { Plugin } from "obsidian";
import { PlainLedgerPlugin } from "./plugin";

export default PlainLedgerPlugin;
export { PlainLedgerPlugin };
export type { PlainLedgerSettings } from "./types";
