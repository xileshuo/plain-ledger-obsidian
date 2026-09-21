#!/usr/bin/env node
/**
 * Restore a archived PlainLedger version (one-click rollback).
 * Usage: node scripts/restore-version.mjs 2.47.4
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const version = process.argv[2];

if (!version) {
  console.error("Usage: node scripts/restore-version.mjs <version>");
  console.error("Example: node scripts/restore-version.mjs 2.47.4");
  process.exit(1);
}

const archiveDir = path.join(root, "archives", `v${version}`);
if (!fs.existsSync(archiveDir)) {
  console.error(`Archive not found: ${archiveDir}`);
  const archivesRoot = path.join(root, "archives");
  const available = fs.existsSync(archivesRoot)
    ? fs.readdirSync(archivesRoot).filter((n) => n.startsWith("v")).join(", ")
    : "(none)";
  console.error("Available:", available || "(none)");
  process.exit(1);
}

const copyFile = (name) => {
  const src = path.join(archiveDir, name);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(root, name));
};

const copyDir = (name) => {
  const src = path.join(archiveDir, name);
  const dest = path.join(root, name);
  if (!fs.existsSync(src)) return;
  fs.rmSync(dest, { recursive: true, force: true });
  fs.cpSync(src, dest, { recursive: true });
};

copyDir("src");
copyDir("editions");
copyFile("styles.css");
copyFile("manifest.json");
copyFile("package.json");
copyFile("README.md");

const edition = version.includes("-public") ? "public" : version.includes("-personal") ? "personal" : "";
console.log(`Restored PlainLedger v${version} from archives/v${version}/`);
if (edition) {
  console.log(`Build with: PLG_EDITION=${edition} node scripts/build.mjs`);
} else {
  console.log("Run: node scripts/build.mjs");
}
