function getPlgPluginDisplayName() {
  return typeof PLUGIN_DISPLAY_NAME === "string" && PLUGIN_DISPLAY_NAME ? PLUGIN_DISPLAY_NAME : "PlainLedger";
}

function getPlgActivationStatusText(plugin) {
  if (isTrialEdition() && isTrialActive(plugin.app, plugin.settings)) {
    return `试用中 · 剩余 ${formatTrialRemaining(getTrialRemainingMs(plugin.app, plugin.settings))}`;
  }
  if (isTrialEdition() && plugin.settings.trialWelcomeSeen && getTrialRemainingMs(plugin.app, plugin.settings) <= 0) {
    return `${getTrialHoursLabel()}试用已到期，请输入激活码`;
  }
  return "";
}

function renderActivationPanel(container, plugin) {
  const isPublic = typeof PLUGIN_EDITION === "string" && (PLUGIN_EDITION === "public" || PLUGIN_EDITION === "trial24h");
  const previewRows = isPublic
    ? [
        { label: "示意账单", value: "6 笔" },
        { label: "分类", value: "18 类" },
        { label: "二级分类", value: "117 项" },
      ]
    : null;
  renderLifeOsActivationPanel(container, {
    extraPanelClass: "plg-activation-panel",
    pluginName: getPlgPluginDisplayName(),
    philosophy: typeof PLUGIN_PHILOSOPHY_SUBTITLE !== "undefined" ? PLUGIN_PHILOSOPHY_SUBTITLE : "",
    getStatusText: () => getPlgActivationStatusText(plugin),
    activationPreviewRows: previewRows,
    activationPreviewNote: previewRows ? "激活后可加载公版示意数据，便于体验报表与统计" : undefined,
    showTrialButton: isTrialEdition() && !plugin.settings.trialWelcomeSeen && !plugin.settings.licenseActivated,
    trialButtonLabel: `开启 ${getTrialHoursLabel()} 试用`,
    onTrialStart: () => startTrialFromActivationPanel(plugin),
    getFingerprint: () => getVaultFingerprint(plugin.app),
    licenseKey: plugin.settings.licenseKey,
    activateShortLabel: "激活",
    onCopyFingerprint: async (fp) => {
      const ok = await copyTextToClipboard(fp);
      new Notice(ok ? "设备指纹已复制" : "请手动全选复制指纹");
    },
    onActivate: async (key, msgEl) => {
      if (!key) {
        msgEl.setText("请输入激活码");
        msgEl.addClass("error");
        return;
      }
      msgEl.removeClass("error");
      plugin.settings.licenseKey = key;
      syncLicenseState(plugin.app, plugin.settings);
      if (plugin.settings.licenseActivated) {
        await plugin.saveSettings();
        new Notice("激活成功，之后将永久有效");
        await plugin.onLicenseActivated();
      } else {
        plugin.settings.licenseActivated = false;
        await plugin.saveSettings();
        msgEl.setText("激活码不正确，请核对后再试");
        msgEl.addClass("error");
      }
    },
    openUsageGuide: () => openUsageGuideInNewTab(plugin.app),
    openSettings: () => plugin.openDashboardSettings(),
    updateNoticeTarget: plugin,
  });
}

function injectActivationPanelStyles() {
  injectLifeOsActivationStyles();
}
