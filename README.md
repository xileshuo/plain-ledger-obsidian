# PlainLedger

> **Paid · 48-hour trial · ¥39.9 permanent unlock**

## Overview

PlainLedger is a paid LifeOS ledger panel for Obsidian. Bills, categories, and subscription rules stay in vault JSON and sync with your vault.

Current public build: **4.0.9** (48-hour trial).

## Pricing

| Item | Details |
| --- | --- |
| Install | Free from Community Plugins (when listed), BRAT, or GitHub Releases |
| Trial | Start a **48-hour full trial** inside the plugin |
| Unlock | **¥39.9** one-time payment, permanent activation per device fingerprint |
| Purchase | Contact the author on Xiaohongshu → pay → paste your device fingerprint → receive an activation code |

## Installation

### Community plugins

Settings → Community plugins → Browse → search **PlainLedger** → Install → Enable.

### BRAT

1. Install and enable **BRAT**
2. Add this repository:

```text
https://github.com/xileshuo/plain-ledger-obsidian
```

3. Enable the plugin; use BRAT to check for updates later.

### Manual install

Download `main.js` and `manifest.json` from the [Latest Release](https://github.com/xileshuo/plain-ledger-obsidian/releases/latest) into `.obsidian/plugins/plain-ledger/`.

## Usage

1. Enable **PlainLedger** and open it from the left ribbon (or the command palette).
2. Start the **48-hour trial** from the in-plugin activation panel when prompted.
3. Use the sidebar / main panel for daily work; full help is also available inside **Settings → Usage guide**.
4. After the trial ends, copy your device fingerprint and unlock with a purchased activation code.

### Links

- Author: https://github.com/xileshuo
- Repository: https://github.com/xileshuo/plain-ledger-obsidian
- Buy / support: Xiaohongshu (order link in the Chinese section below)
---
## 中文
> **付费 · 48 小时试用 · ¥39.9 永久激活**
Obsidian 独立记账面板（LifeOS）。账单、分类、订阅规则保存在库内 JSON，随库同步。
当前公开版本：**4.0.9 · 48 小时试用**
## 定价与购买
| 项目 | 说明 |
| --- | --- |
| **试用** | 插件内开启后 48 小时全功能 |
| **付费** | ¥39.9 一次付费，按设备指纹永久激活 |
| **购买** | 小红书联系作者下单 → 复制设备指纹 → 粘贴激活码 |
作者：[github.com/xileshuo](https://github.com/xileshuo) · 小红书：[下单入口](https://xhslink.com/m/3uOoUHv2rI1)
## 安装

### 社区插件

设置 → 第三方插件 → 浏览 → 搜索 **PlainLedger** → 安装 → 启用。

### BRAT

1. 安装并启用 **BRAT**
2. 添加仓库：

```text
https://github.com/xileshuo/plain-ledger-obsidian
```

3. 启用插件；之后可用 BRAT 检查更新。

### 手动安装

下载 [Latest Release](https://github.com/xileshuo/plain-ledger-obsidian/releases/latest) 的 `main.js`、`manifest.json` 到 `.obsidian/plugins/plain-ledger/`。
## 使用说明
> **PlainLedger** 是运行在 Obsidian 里的独立记账面板——账单、分类、订阅规则都保存在**你的库内 JSON**，随 Obsidian / iCloud / Git 同步，不依赖第三方账 App，也不把数据上传到云端服务。

**和记帐 App 的区别：**

\`\`\`text
记帐 App：数据在 App 里，和笔记割裂
PlainLedger：数据在库里，和日记 / 项目 / 复盘同屏共存
\`\`\`

**核心优势一览：**

| 能力 | 说明 |
|------|------|
| 库内自持 | \`Finance/PlainLedger/ledger.json\` 纯文本，可备份、可 diff、可脚本处理 |
| 三种录入 | 智能一句话、手动表单、截图 OCR（支付宝 / 微信账单截图） |
| 订阅 & 周期 | 续费提醒、待入账、分期 / 周期规则，到期一键入账 |
| 月结结转 | 每月 1 日自动将当年累计净收支结转至当月（可关） |
| 多维视图 | 账本 / 统计 / 报表 五 Tab，口径统一；日历在账本内切换 |
| 日记联动 | 记账后可选追加一行到当日 \`.md\` 笔记 |
| 全平台 | Mac / Windows / iOS / Android Obsidian 同库同步 |

---

## 目录

- 一、PlainLedger 适合谁
- 二、安装与文件说明
- 三、如何打开面板
- 四、公版与体验版激活
- 五、记一笔：三种方式
- 六、账本：一眼看懂本月
- 七、账本 · 统计 · 报表
- 八、订阅 · 待入账 · 周期
- 九、设置页说明
- 十、数据文件与备份
- 十一、更新说明
- 十二、常见问题

---

## 一、PlainLedger 适合谁

- 已经在用 Obsidian 管理生活 / 工作，希望**记账和笔记在同一体系**
- 不想 monthly 再开一个 App，又希望有**预算、趋势、报表、日历**
- 需要**订阅 / 续费 / 分期**提醒，而不是只记流水
- 重视**数据所有权**——JSON 在本地，导出 Excel / CSV 随时可做

---

## 二、安装与文件说明

**最小安装（推荐）：**

\`\`\`text
你的库/.obsidian/plugins/plain-ledger/
├── main.js
├── manifest.json
├── styles.css
└── default-ledger.json   ← 公版样例 / 可选
\`\`\`

**可选：** \`vendor/lang/\` 仅在使用**截图 OCR** 且希望离线识别时需要；不用截图可省略。

**自动生成（无需打包）：**

| 文件 | 说明 |
|------|------|
| \`.obsidian/plugins/plain-ledger/data.json\` | 插件设置（预算、激活码等），Obsidian 首次保存时自动创建 |
| \`Finance/PlainLedger/ledger.json\` | 真实账单数据，首次记账或导入后生成 |

安装后在 **设置 → 第三方插件** 启用 PlainLedger，建议重载一次。

---

## 三、如何打开面板

- 左侧 Ribbon **钱包图标**
- 命令面板：**打开 PlainLedger 面板** / **记一笔**
- 底部 Tab：**账本 · 统计 · 记一笔 · 报表 · 设置**（记一笔为底栏居中按钮）
- **iOS 快捷指令**：主屏幕或背面轻点 → 打开 URL \`obsidian://plainledger?action=capture\`（设置 → **快捷指令** 可复制；说明见《PlainLedger快捷指令使用指南》）

---

## 四、公版与体验版激活

个人版无需激活，首次打开即可使用。

### 公版（需激活码）

1. 安装并启用插件后，**首次打开会自动加载**完整分类（18 类 · 117 二级）与 **6 笔示意账单**
2. 在侧边栏激活页复制设备指纹 \`PLG-XXXXXXXX\`（绑定 **Obsidian 库名称**）
3. 发给作者获取 \`KEY-XXXXXXXX\`，输入激活码并点击 **激活**
4. 激活成功后 **永久有效**（同一库 Mac / iPhone 共享）

### 体验版（48 小时试用）

1. 安装并启用后，在侧边栏激活页点击 **「开启 48 小时试用」**
2. 点击后 **自动注入** 完整分类（18 类 · 117 二级）与 **6 笔示意账单**，无需手动恢复样例
3. 试用期间全功能可用；到期后须输入激活码才能继续记账，**库内数据不会丢失**
4. 试用中可随时输入激活码转为永久版

> **更新日志**与**完整使用说明**不会在启动时自动弹出；请在激活页或 **设置 → 关于** 手动打开。

---

## 五、记一笔：三种方式

### 智能录入（推荐）

输入自然语言，例如：

\`\`\`text
午餐 28 餐饮
打车 35 交通
工资 15000 工作收入
\`\`\`

支持金额、分类关键词、时间词（昨天 / 上周三等）。可在 **设置 → 全局关键词** 定制映射。

### 手动录入

选一级 / 二级分类、金额、时间、备注、是否报销等，适合精确补账。

### 截图 OCR

粘贴支付宝 / 微信账单截图，自动识别金额与商户（首次需准备 OCR 语言包，可离线 \`vendor/lang\` 或联网下载）。

---

## 六、账本：一眼看懂本月

- **本月支出**：当前自然月支出合计，右侧显示收入与月度结余；支出旁显示较上月环比
- **月度结余**：当月真实收支（**不含**月结结转行）
- **年累计结余**：当年 1 月起累计（**不含**结转）
- **预算环**：设置本月预算后显示进度，超支高亮
- **待入账**：订阅 / 周期到期项，一点入账
- **账单列表**：按日分组，支持搜索、分类筛选、报销筛选

**月结行：** 每月 1 日系统自动生成，只读；日合计「支」不含月结。可在 **设置 → 基础与预算 → 月结自动结转** 关闭。

---

## 七、账本 · 统计 · 报表

| Tab | 你能看到什么 |
|-----|----------------|
| **账本** | 本月横幅、预算、待入账、账单列表；可切换 **日历** 热力视图 |
| **统计** | 汇总表（10 行滚动 + 表底总计同/环）· 时间行 ⓘ 提示 · 消费洞察 |
| **记一笔** | 底栏居中按钮，智能 / 手动 / 截图记账 |
| **报表** | 分类占比环图（含「其他」桶）、主题筛选、分类明细；筛选状态会记住；手机端搜索框与收入/支出、一级/二级下拉同排显示 |

各页「结余 / 支出」口径与账本一致，避免不同 Tab 数字对不上。

---

## 八、订阅 · 待入账 · 周期

在 **设置 → 规则** Tab（与常用、分类、数据并列）：

- **订阅服务**：Netflix、iCloud+ 等续费周期，到期进入待入账
- **周期 / 分期**：固定周期扣款或分期计划
- **待入账**：首页与设置均可一键确认入账

适合管理「还没扣款但已知将要发生」的支出，避免月底才发现漏记。

---

## 九、设置页说明

Obsidian **设置 → 第三方插件 → PlainLedger** 与面板激活页 **高级配置** 为同一入口。桌面端标题格式为 **PlainLedger 配置 · 个人版 v4.0.4**（版本号在标题末尾）。

| Tab | 内容 |
|------|------|
| 授权 | 公版 / 体验版指纹 + 激活码（个人版无此项） |
| **常用** | 基础与预算、日记联动 |
| **分类** | 一级 / 二级分类管理 |
| **规则** | 待入账、订阅、周期、全局关键词（点标题折叠 / 展开） |
| **数据** | 导入导出、数据目录、数据文件路径 |
| **快捷指令** | iOS 主屏 / 背面轻点：复制记一笔链接 |
| **关于** | 更新日志、使用说明、作者与套装作品 |

公版首次打开或体验版 **开启试用** 后，内置完整分类体系（18 类 · 117 二级）与 6 笔示意账单；激活后 **分类** Tab 默认展开。

---

## 十、数据文件与备份

| 路径 | 内容 |
|------|------|
| \`Finance/PlainLedger/ledger.json\` | 账单、分类、订阅、周期规则 |
| \`.obsidian/plugins/plain-ledger/data.json\` | 插件设置 |

**建议：** 定期 **设置 → 数据管理 → 导出 JSON**；大改前先导出一版。

导入支持 **PlainLedger JSON**（整包替换）与 **Excel**（默认合并流水，保留订阅 / 周期规则）。

---

## 十一、更新日志

升级后**不会**在启动时自动弹出更新日志。

随时可在 **设置 → 关于 → 更新日志** 或激活页手动打开（本次更新默认展开，历史版本折叠）。

---

## 十二、常见问题

### Q：体验版需要手动导入样例吗？

不需要。点击 **「开启 48 小时试用」** 后会自动写入分类与 6 笔示意账单。

### Q：公版样例数据能删吗？

可以。激活后清空或导入自己的 Excel / JSON 即可。

### Q：为什么没有 data.json？

\`data.json\` 是 Obsidian 在保存设置时**自动生成**的，安装包里没有是正常的。

### Q：vendor 文件夹必须吗？

不必须。只有截图 OCR 且希望离线识别时才需要 \`vendor/lang/\`。

### Q：升级后还会自动弹使用说明或更新日志吗？

不会。启动时不再自动弹出任何引导或更新弹窗；**使用说明**、**更新日志**均在激活页或 **设置 → 关于** 手动打开。

---

## 一句话总结

**Obsidian 是你的知识库，PlainLedger 是你的账本——数据留在库里，记一笔、看统计、管订阅，都在同一个面板完成。**
## 更新日志
### 4.0.9

- 社区审核：minAppVersion 升至 1.7.2（workspace.revealLeaf）
- 文档：README 英中双语（Installation / Usage）

### 4.0.8

- 社区审核：设置页区块标题统一 Setting.setHeading()，消除 scorecard heading Error
- 社区审核：关于/授权/快捷指令与布局 helper 同步改用 setHeading

### 4.0.7

- 社区审核：去掉运行时注入 style / 内联样式 / innerHTML，满足目录 Error 规则
- 构建：公开包 build 固定 trial 版，与 Release main.js 一致

### 4.0.6

- 社区审核：补充 TypeScript 模块入口（src/main.ts），满足目录源码检测
- 文档：公开 README 英文 Installation / Usage 前置

### 4.0.5

- 社区分发：公开包改为 48 小时试用，到期后 ¥39.9 永久激活
- 关于：所有作品互相介绍售价，未安装可跳转 GitHub 了解/安装
- 体验版：试用时长统一为 48 小时（与 BrainCore / 纪念日对齐）

### 4.0.4

- iOS：新增快捷指令入口 obsidian://plainledger?action=capture，一点打开「记一笔」
- 设置：新增「快捷指令」Tab（复制链接 + 使用说明）

### 4.0.3

- 设置·规则：待入账 / 订阅 / 周期 / 关键词恢复点标题折叠，无折叠箭头
- 设置·规则：订阅与周期卡片改为上信息、下操作；指标卡宽窄屏自适应列数
- 关于：所有作品改为纵向排列
- 设置·数据：移除与关于重复的「帮助与更新」；折叠区块去掉箭头、点标题仍可展开收起
- 文档：使用说明中更新日志入口改为「设置 → 关于」

### 4.0.2

- 导入：Excel 取消「合并」时与 JSON 一样需危险确认，避免误清空订阅/周期
- 订阅/周期：补账去重命中后继续追后续期次，不再一次只追一期
- 手机：底 Tab 恢复避让 Obsidian 悬浮导航（safe-area + 导航高度），不再与系统底栏重叠
- 记一笔：手动底栏恢复 Home Indicator safe-area 内边距
- 手机顶距：LIFEOS / 设置统一固定 41px spacer（host 负责 safe-area）
- 设置浮层与账本：safe-area 顶底/左右；窄屏 action-row 可换行；分类 4 列、触控加大
---
## 分发说明
本仓库用于社区插件 / BRAT / GitHub Release 分发与产品介绍，并附带 `src/` 等源码便于社区审核。
仓库：https://github.com/xileshuo/plain-ledger-obsidian
