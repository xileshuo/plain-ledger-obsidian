#!/usr/bin/env node
/**
 * 作者用：根据指纹 PLG-xxx 或库名生成激活码 KEY-xxx
 * 算法与 BrainCore LifeOS / 纪念日 一致（xor 0x8899）
 *
 * 用法：
 *   node scripts/gen-license-key.mjs PLG-4708F398
 *   node scripts/gen-license-key.mjs 大鹏一日同风起
 *   node scripts/gen-license-key.mjs --vault "My Vault"
 */

function hashStringToHex(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16).toUpperCase();
}

function fingerprintFromVaultName(vaultName) {
  return "PLG-" + hashStringToHex(String(vaultName));
}

function licenseKeyFromFingerprint(fp) {
  let hash = 0;
  for (let i = 0; i < fp.length; i++) {
    hash = (hash << 5) - hash + fp.charCodeAt(i);
    hash |= 0;
  }
  return "KEY-" + Math.abs(hash ^ 0x8899).toString(16).toUpperCase();
}

const args = process.argv.slice(2);
if (!args.length || args.includes("-h") || args.includes("--help")) {
  console.log(`用法:
  node scripts/gen-license-key.mjs <指纹 PLG-xxx>
  node scripts/gen-license-key.mjs <Obsidian 库名称>
  node scripts/gen-license-key.mjs --vault "库名"

示例:
  node scripts/gen-license-key.mjs PLG-4708F398
  node scripts/gen-license-key.mjs 大鹏一日同风起`);
  process.exit(args.length ? 0 : 1);
}

let input = args.join(" ").trim();
if (args[0] === "--vault") input = args.slice(1).join(" ").trim();

const fp = input.toUpperCase().startsWith("PLG-")
  ? input.toUpperCase()
  : fingerprintFromVaultName(input);
const key = licenseKeyFromFingerprint(fp);

console.log("指纹：  ", fp);
console.log("激活码：", key);
if (!input.toUpperCase().startsWith("PLG-")) {
  console.log("\n（由库名自动推算指纹；库名须与用户 Obsidian 左侧显示的库名完全一致）");
}
