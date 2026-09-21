import esbuild from "esbuild";
import process from "process";
import { builtinModules } from "module";

/**
 * Optional esbuild entry for community tooling / local typecheck builds.
 * Production releases still use `scripts/build.mjs` (edition concat).
 */
const prod = process.argv[2] === "production";

const context = await esbuild.context({
  entryPoints: ["src/main.ts"],
  bundle: true,
  external: ["obsidian", "electron", ...builtinModules],
  format: "cjs",
  target: "es2018",
  logLevel: "info",
  sourcemap: prod ? false : "inline",
  treeShaking: true,
  outfile: "main.esbuild.js",
});

if (prod) {
  await context.rebuild();
  process.exit(0);
} else {
  await context.watch();
}
