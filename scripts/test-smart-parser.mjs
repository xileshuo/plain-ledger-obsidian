import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const code = [
  fs.readFileSync(path.join(root, "src/lunar-lite.ts"), "utf8"),
  fs.readFileSync(path.join(root, "src/smart-parser.ts"), "utf8"),
].join("\n");

const sandbox = {
  module: { exports: {} },
  exports: {},
  console,
  require: () => ({}),
  pad2: (n) => String(n).padStart(2, "0"),
  dateKey: (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
};
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const parseSmartInput = sandbox.parseSmartInput;

const categories = [
  {
    name: "餐饮",
    flow: "expense",
    subcategories: [{ name: "午餐", keywords: ["午饭", "午餐"] }],
  },
  {
    name: "交通",
    flow: "expense",
    subcategories: [{ name: "打车", keywords: ["滴滴", "打车"] }],
  },
  {
    name: "工资",
    flow: "income",
    subcategories: [],
  },
];

const tests = [
  {
    name: "午餐金额",
    input: "午餐22",
    expect: (p) => p && !p.error && p.amount === 22 && p.category === "餐饮",
  },
  {
    name: "报销识别",
    input: "打车35报销",
    expect: (p) => p && p.reimburse === true && p.amount === 35,
  },
  {
    name: "空输入报错",
    input: "   ",
    expect: (p) => !p || p.error,
  },
  {
    name: "收入工资",
    input: "工资11000",
    expect: (p) => p && p.flow === "income" && p.amount === 11000,
  },
  {
    name: "中文金额三元",
    input: "可乐三元",
    expect: (p) => p && !p.error && p.amount === 3,
  },
  {
    name: "中文金额十五元",
    input: "打车十五元",
    expect: (p) => p && !p.error && p.amount === 15,
  },
  {
    name: "中文金额无元",
    input: "可乐三",
    expect: (p) => p && !p.error && p.amount === 3,
  },
];

let failed = 0;
for (const t of tests) {
  const parsed = parseSmartInput(t.input, categories, {}, []);
  const ok = t.expect(parsed);
  if (ok) {
    console.log(`✓ ${t.name}`);
  } else {
    failed += 1;
    console.error(`✗ ${t.name}`, parsed);
  }
}

if (failed > 0) {
  process.exit(1);
}
console.log(`\n${tests.length} passed`);
