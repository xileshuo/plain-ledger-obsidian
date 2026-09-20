function formatTrialRemaining(ms) {
  if (ms <= 0) return "0 分钟";
  const totalMin = Math.ceil(ms / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h > 0) return `${h} 小时 ${m} 分钟`;
  return `${m} 分钟`;
}

function injectLifeOsTrialStyles() {
  const id = "lifeos-trial-styles-v1";
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
.lifeos-trial-modal .setting-item-description { margin: 0 0 8px; line-height: 1.5; }
.lifeos-trial-actions { display: flex; gap: 8px; margin-top: 14px; }
.lifeos-trial-actions button { flex: 1; border-radius: 10px; font-weight: 700; }
`;
  document.head.appendChild(style);
}

function maybeShowTrialWelcomeModal(plugin, onDone) {
  if (!isTrialEdition() || plugin.settings.trialWelcomeSeen || plugin.settings.licenseActivated) {
    if (typeof onDone === "function") onDone();
    return;
  }
  injectLifeOsSharedStyles();
  injectLifeOsTrialStyles();
  const modal = new Modal(plugin.app);
  modal.modalEl.addClass("lifeos-modal");
  modal.modalEl.addClass("lifeos-trial-modal");
  modal.modalEl.addClass("plg-trial-modal");
  modal.titleEl.setText("开始免费试用");
  modal.contentEl.createEl("p", {
    cls: "setting-item-description",
    text: `您正在使用 PlainLedger ${getTrialHoursLabel()}体验版。确认后将开始全功能试用，到期须激活才能继续记账。`,
  });
  modal.contentEl.createEl("p", {
    cls: "setting-item-description",
    text: "试用期间可随时输入激活码永久绑定本设备；库内账单数据不会丢失。",
  });
  const row = modal.contentEl.createDiv({ cls: "lifeos-trial-actions" });
  const startBtn = row.createEl("button", { text: "开始试用", cls: "mod-cta lifeos-modal-primary" });
  const laterBtn = row.createEl("button", { text: "稍后再说" });
  const finish = async (start) => {
    if (start) {
      plugin.settings.trialWelcomeSeen = true;
      ensureTrialStarted(plugin.app, plugin.settings, true);
      await plugin.saveSettings();
      if (typeof PLUGIN_EDITION === "string" && (PLUGIN_EDITION === "public" || PLUGIN_EDITION === "trial24h")) {
        const seeded = await plugin.store.ensurePublicEditionDefaults();
        plugin.settings.onboardingComplete = true;
        plugin.settings.onboardingChoice = "sample";
        plugin.settings.initialized = true;
        await plugin.saveSettings();
        if (seeded) {
          const cats = plugin.store.data.categories?.length || 0;
          const subs = (plugin.store.data.categories || []).reduce((n, c) => n + (c.subcategories?.length || 0), 0);
          const tx = plugin.store.data.transactions?.length || 0;
          new Notice(`已加载 ${tx} 笔示意账单 · ${cats} 类 · ${subs} 二级`);
        }
      }
      new Notice(`已开始 ${getTrialHoursLabel()} 试用`);
      plugin.refreshView(true);
    }
    modal.close();
    if (typeof onDone === "function") onDone();
  };
  startBtn.onclick = () => void finish(true);
  laterBtn.onclick = () => void finish(false);
  modal.open();
}

function checkTrialExpiryReminders(plugin) {
  if (!isTrialEdition() || plugin.settings.licenseActivated) return;
  if (plugin.settings.trialWelcomeSeen) ensureTrialStarted(plugin.app, plugin.settings, true);
  const remain = getTrialRemainingMs(plugin.app, plugin.settings);
  if (remain <= 0 && plugin.settings.trialStartedAt && plugin.settings.trialWelcomeSeen) {
    maybeShowTrialExpiredModal(plugin);
    return;
  }
  if (remain <= 0) return;
  const twoHours = 2 * 60 * 60 * 1000;
  const thirtyMin = 30 * 60 * 1000;
  if (remain <= twoHours && !plugin.settings.trialReminder2hSeen) {
    plugin.settings.trialReminder2hSeen = true;
    plugin.saveSettings();
    maybeShowTrialRenewModal(plugin, remain, "2h");
  } else if (remain <= thirtyMin && !plugin.settings.trialReminder30mSeen) {
    plugin.settings.trialReminder30mSeen = true;
    plugin.saveSettings();
    maybeShowTrialRenewModal(plugin, remain, "30m");
  }
}

function maybeShowTrialRenewModal(plugin, remainMs, kind) {
  injectLifeOsSharedStyles();
  injectLifeOsTrialStyles();
  const modal = new Modal(plugin.app);
  modal.modalEl.addClass("lifeos-modal");
  modal.modalEl.addClass("lifeos-trial-modal");
  modal.titleEl.setText(kind === "30m" ? "试用即将结束" : "试用剩余不足 2 小时");
  modal.contentEl.createEl("p", {
    cls: "setting-item-description",
    text: `试用剩余 ${formatTrialRemaining(remainMs)}。到期后记账、导入等功能将暂停，库内账单不会丢失。`,
  });
  const row = modal.contentEl.createDiv({ cls: "lifeos-trial-actions" });
  const actBtn = row.createEl("button", { text: "去激活", cls: "mod-cta lifeos-modal-primary" });
  actBtn.onclick = () => {
    modal.close();
    plugin.openDashboard();
  };
  row.createEl("button", { text: "知道了" }).onclick = () => modal.close();
  modal.open();
}

function maybeShowTrialExpiredModal(plugin) {
  if (plugin._trialExpiredModalShown) return;
  if (!isTrialEdition() || isPluginAccessAllowed(plugin.app, plugin.settings)) return;
  plugin._trialExpiredModalShown = true;
  injectLifeOsSharedStyles();
  injectLifeOsTrialStyles();
  const modal = new Modal(plugin.app);
  modal.modalEl.addClass("lifeos-modal");
  modal.modalEl.addClass("lifeos-trial-modal");
  modal.titleEl.setText("试用已到期");
  modal.contentEl.createEl("p", {
    cls: "setting-item-description",
    text: `${getTrialHoursLabel()}免费试用已结束。您的账单与分类均保留在库中，激活后即可继续记账。`,
  });
  const row = modal.contentEl.createDiv({ cls: "lifeos-trial-actions" });
  const actBtn = row.createEl("button", { text: "立即激活", cls: "mod-cta lifeos-modal-primary" });
  actBtn.onclick = () => {
    modal.close();
    plugin.openDashboard();
  };
  row.createEl("button", { text: "稍后" }).onclick = () => modal.close();
  modal.open();
}

function renderTrialBanner(container, plugin) {
  if (!isTrialEdition() || plugin.settings.licenseActivated) return;
  if (!isTrialActive(plugin.app, plugin.settings)) return;
  injectLifeOsSharedStyles();
  injectLifeOsTrialStyles();
  const remain = getTrialRemainingMs(plugin.app, plugin.settings);
  const banner = container.createDiv({ cls: "lifeos-trial-banner" });
  banner.setText(`试用中，剩余 ${formatTrialRemaining(remain)} · 点此激活永久使用`);
  banner.onclick = () => plugin.openDashboardSettings({ section: "license" });
}

async function startTrialFromActivationPanel(plugin) {
  if (!isTrialEdition() || plugin.settings.licenseActivated || plugin.settings.trialWelcomeSeen) return;
  plugin.settings.trialWelcomeSeen = true;
  ensureTrialStarted(plugin.app, plugin.settings, true);
  await plugin.saveSettings();
  if (typeof PLUGIN_EDITION === "string" && (PLUGIN_EDITION === "public" || PLUGIN_EDITION === "trial24h")) {
    const seeded = await plugin.store.ensurePublicEditionDefaults();
    plugin.settings.onboardingComplete = true;
    plugin.settings.onboardingChoice = "sample";
    plugin.settings.initialized = true;
    await plugin.saveSettings();
    if (seeded) {
      const cats = plugin.store.data.categories?.length || 0;
      const subs = (plugin.store.data.categories || []).reduce((n, c) => n + (c.subcategories?.length || 0), 0);
      const tx = plugin.store.data.transactions?.length || 0;
      new Notice(`已加载 ${tx} 笔示意账单 · ${cats} 类 · ${subs} 二级`);
    }
  }
  new Notice(`已开始 ${getTrialHoursLabel()} 试用`);
  plugin.refreshView(true);
}

function runPlainLedgerTrialStartup(plugin, onDone) {
  checkTrialExpiryReminders(plugin);
  if (typeof onDone === "function") onDone();
}

function requirePlainLedgerAccess(plugin, hint) {
  if (!isLicenseRequired()) return true;
  if (plugin.settings.trialWelcomeSeen || !isTrialEdition()) {
    ensureTrialStarted(plugin.app, plugin.settings, !!plugin.settings.trialWelcomeSeen);
  }
  syncLicenseState(plugin.app, plugin.settings);
  if (isPluginAccessAllowed(plugin.app, plugin.settings)) return true;
  if (isTrialEdition() && !plugin.settings.trialWelcomeSeen) {
    new Notice(hint || "请先点击「开启试用」或输入激活码");
  } else if (isTrialEdition() && getTrialRemainingMs(plugin.app, plugin.settings) <= 0) {
    new Notice("试用已到期，请在面板输入激活码");
  } else {
    new Notice(hint || "请先激活 PlainLedger");
  }
  plugin.openDashboard();
  return false;
}
