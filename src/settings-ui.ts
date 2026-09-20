// ─── Settings: categories & recurring ────────────────────────────────────────

function fitCompactSettingInput(textComponent) {
  const input = textComponent?.inputEl;
  if (!input) return;
  const sync = () => {
    const text = input.value || input.placeholder || "";
    input.size = Math.min(Math.max(text.length, 3), 40);
  };
  sync();
  input.addEventListener("input", sync);
}

function addSettingsRowActions(parent, handlers = {}) {
  const acts = parent.createDiv({ cls: "plg-cat-row-actions plg-settings-row-actions" });
  acts.createEl("button", { text: "编辑", cls: "plg-btn-plain", attr: { type: "button" } }).onclick = (e) => {
    e.stopPropagation();
    handlers.onEdit?.();
  };
  acts.createEl("button", { text: "删除", cls: "plg-btn-plain", attr: { type: "button" } }).onclick = (e) => {
    e.stopPropagation();
    handlers.onDelete?.();
  };
  return acts;
}

function countCategoryTx(plugin, catName) {
  return plugin.store.data.transactions.filter((t) => t.category === catName).length;
}

function countSubcategoryTx(plugin, catName, subName) {
  return plugin.store.data.transactions.filter((t) => t.category === catName && t.subcategory === subName).length;
}

function buildMigrateTargetPicker(parent, plugin, opts = {}) {
  const wrap = parent.createDiv({ cls: "plg-migrate-picker" });
  const catRow = wrap.createDiv({ cls: "plg-modal-row" });
  catRow.createSpan({ text: "迁移到" });
  const catSel = catRow.createEl("select");
  const subRow = wrap.createDiv({ cls: "plg-modal-row" });
  subRow.createSpan({ text: "二级分类" });
  const subSel = subRow.createEl("select");

  const cats = plugin.store.data.categories.filter((c) => {
    if (opts.excludeCat && c.name === opts.excludeCat) return false;
    if (opts.flow && c.flow !== opts.flow) return false;
    return true;
  });

  const refreshSubs = () => {
    const cat = plugin.store.data.categories.find((c) => c.name === catSel.value);
    const subs = [{ value: "", label: "（无）" }];
    (cat?.subcategories || []).forEach((s) => {
      const name = subcategoryName(s);
      if (opts.excludeSub && catSel.value === (opts.defaultCat || "") && name === opts.excludeSub) return;
      subs.push({ value: name, label: name });
    });
    appendSelectOptions(subSel, subs, opts.defaultSub || "");
  };

  appendSelectOptions(
    catSel,
    cats.map((c) => ({ value: c.name, label: c.name })),
    opts.defaultCat || cats[0]?.name || ""
  );
  catSel.onchange = refreshSubs;
  refreshSubs();

  return {
    getTarget: () => ({ category: catSel.value, subcategory: subSel.value }),
    catSel,
    subSel,
  };
}

function openDeleteCategoryDialog(app, plugin, cat, onDone) {
  const txCount = countCategoryTx(plugin, cat.name);
  openPlgOverlay({
    title: `删除 · ${cat.name}`,
    cls: "plg-cat-edit-modal",
    stack: true,
    build: (body, close) => {
      addClasses(body, "plg-modal");
      let picker = null;
      if (txCount) {
        body.createEl("p", {
          text: `「${cat.name}」下已有 ${txCount} 笔账单，无法直接删除。请先选择迁移目标：`,
        });
        picker = buildMigrateTargetPicker(body, plugin, {
          excludeCat: cat.name,
          flow: cat.flow,
        });
        if (!picker.catSel.options.length) {
          body.createEl("p", { cls: "plg-muted", text: "没有可迁移的其他分类，请先新建分类。" });
        }
      } else {
        body.createEl("p", { text: `确定删除「${cat.name}」吗？` });
      }
      const btnRow = body.createDiv({ cls: "plg-modal-actions" });
      btnRow.createEl("button", { text: "取消", attr: { type: "button" } }).onclick = close;
      const confirmBtn = btnRow.createEl("button", {
        text: txCount ? "迁移并删除" : "删除",
        cls: "plg-btn-danger mod-cta",
        attr: { type: "button" },
      });
      if (txCount && picker && !picker.catSel.options.length) {
        confirmBtn.disabled = true;
      }
      confirmBtn.onclick = async () => {
        try {
          const migrateTo = txCount && picker ? picker.getTarget() : null;
          await plugin.store.deleteCategory(cat.name, migrateTo);
          new Notice(txCount ? `已迁移 ${txCount} 笔并删除分类` : "已删除分类");
          onDone?.();
          close();
        } catch (err) {
          new Notice(err.message || "删除失败");
        }
      };
    },
  });
}

function openDeleteSubcategoryDialog(app, plugin, catName, subMeta, onDone) {
  const subName = subMeta.name;
  const cat = plugin.store.data.categories.find((c) => c.name === catName);
  const txCount = countSubcategoryTx(plugin, catName, subName);
  openPlgOverlay({
    title: `删除 · ${subName}`,
    cls: "plg-cat-edit-modal",
    stack: true,
    build: (body, close) => {
      addClasses(body, "plg-modal");
      let picker = null;
      if (txCount) {
        body.createEl("p", {
          text: `「${subName}」下已有 ${txCount} 笔账单，无法直接删除。请先选择迁移目标：`,
        });
        picker = buildMigrateTargetPicker(body, plugin, {
          excludeSub: subName,
          defaultCat: catName,
          flow: cat?.flow,
        });
      } else {
        body.createEl("p", { text: `确定删除二级分类「${subName}」吗？` });
      }
      const btnRow = body.createDiv({ cls: "plg-modal-actions" });
      btnRow.createEl("button", { text: "取消", attr: { type: "button" } }).onclick = close;
      btnRow.createEl("button", {
        text: txCount ? "迁移并删除" : "删除",
        cls: "plg-btn-danger mod-cta",
        attr: { type: "button" },
      }).onclick = async () => {
        try {
          const migrateTo = txCount && picker ? picker.getTarget() : null;
          await plugin.store.deleteSubcategory(catName, subMeta, migrateTo);
          new Notice(txCount ? `已迁移 ${txCount} 笔并删除二级分类` : "已删除二级分类");
          onDone?.();
          close();
        } catch (err) {
          new Notice(err.message || "删除失败");
        }
      };
    },
  });
}

function buildCategoryIdentityEditor(parent, draft, opts = {}) {
  const app = opts.app;
  const card = parent.createDiv({ cls: "plg-cat-identity-card" });
  const top = card.createDiv({ cls: "plg-cat-identity-top" });
  const previewWrap = top.createDiv({ cls: "plg-cat-icon-preview plg-cat-icon-preview-lg" });

  const fields = top.createDiv({ cls: "plg-cat-identity-fields" });
  const nameRow = fields.createDiv({ cls: "plg-cat-identity-name-row" });
  const nameInput = nameRow.createEl("input", { type: "text", attr: { placeholder: "分类名称" } });
  nameInput.value = draft.name || "";
  nameInput.classList.add("plg-cat-name-inline-input");

  let flowSel;
  if (opts.showFlow) {
    flowSel = nameRow.createEl("select", { cls: "plg-cat-identity-flow-select" });
    appendSelectOptions(
      flowSel,
      [
        { value: "expense", label: "支出" },
        { value: "income", label: "收入" },
      ],
      draft.flow || "expense"
    );
  }

  const tools = card.createDiv({ cls: "plg-cat-identity-tools" });
  const emojiInput = tools.createEl("input", {
    type: "text",
    attr: { placeholder: "Emoji", title: "输入 emoji 作为图标" },
  });
  emojiInput.classList.add("plg-cat-emoji-field");
  emojiInput.value = draft.iconUrl ? "" : (draft.icon || categoryInitialIcon(draft.name));

  let emojiManual = !!(draft.iconUrl ? false : (draft.icon && draft.icon !== categoryInitialIcon(draft.name)));

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/png,image/jpeg,image/webp,image/gif,image/svg+xml";
  fileInput.style.display = "none";
  card.appendChild(fileInput);

  const uploadBtn = tools.createEl("button", { text: "上传图标", cls: "plg-btn-plain", attr: { type: "button" } });
  attachIconfontPickerButton(tools, app, (picked) => {
    draft.iconUrl = picked.iconUrl;
    emojiManual = false;
    emojiInput.value = "";
    fileInput.value = "";
    renderPreview();
  }, draft.name || nameInput.value.trim());
  const clearBtn = tools.createEl("button", { text: "清除图片", cls: "plg-btn-plain", attr: { type: "button" } });
  card.createDiv({
    cls: "plg-muted plg-cat-identity-hint",
    text: "默认使用名称首字；可上传图片、从 iconfont 搜索或输入 emoji，三者互斥",
  });

  const renderPreview = () => {
    previewWrap.empty();
    previewWrap.removeClass("no-bg", "has-svg");
    if (draft.iconUrl) {
      if (isSvgIconUrl(draft.iconUrl)) {
        const svg = decodeSvgDataUrl(draft.iconUrl);
        if (svg) {
          previewWrap.addClass("has-svg");
          const slot = previewWrap.createDiv({ cls: "plg-cat-icon-svg" });
          slot.innerHTML = normalizeIconfontSvg(svg);
          return;
        }
      }
      previewWrap.createEl("img", {
        cls: "plg-cat-icon-img",
        attr: { src: draft.iconUrl, alt: draft.name || "icon" },
      });
    } else {
      previewWrap.addClass("no-bg");
      previewWrap.createDiv({
        cls: "plg-cat-icon",
        text: effectiveCategoryIcon({ name: draft.name, icon: draft.icon, iconUrl: "" }),
      });
    }
  };

  const syncIconFromName = () => {
    draft.name = nameInput.value.trim();
    if (draft.iconUrl || emojiManual) return;
    draft.icon = categoryInitialIcon(draft.name);
    emojiInput.value = draft.icon;
  };

  nameInput.addEventListener("input", () => {
    syncIconFromName();
    renderPreview();
  });

  emojiInput.addEventListener("input", () => {
    emojiManual = true;
    draft.iconUrl = "";
    fileInput.value = "";
    draft.icon = emojiInput.value.trim() || categoryInitialIcon(nameInput.value.trim());
    renderPreview();
  });

  uploadBtn.onclick = () => fileInput.click();
  clearBtn.onclick = () => {
    draft.iconUrl = "";
    fileInput.value = "";
    emojiManual = false;
    draft.icon = categoryInitialIcon(nameInput.value.trim());
    emojiInput.value = draft.icon;
    renderPreview();
  };

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    try {
      draft.iconUrl = await compressIconImageFile(file);
      emojiManual = false;
      emojiInput.value = "";
      renderPreview();
    } catch {
      new Notice("图片处理失败，请换一张试试");
    }
  });

  renderPreview();

  const getIconPayload = () => {
    const name = nameInput.value.trim();
    if (draft.iconUrl) {
      return { icon: draft.icon || categoryInitialIcon(name), iconUrl: draft.iconUrl };
    }
    const icon = emojiInput.value.trim() || categoryInitialIcon(name);
    return { icon, iconUrl: "" };
  };

  return { nameInput, emojiInput, flowSel, getIconPayload, renderPreview };
}

const CYCLE_OPTIONS = [
  { value: "weekly", label: "每周" },
  { value: "monthly", label: "每月" },
  { value: "quarterly", label: "每季" },
  { value: "yearly", label: "每年" },
  { value: "custom", label: "自定义" },
];

function resolveRenewalStoreItem(plugin, api) {
  const id = api.item?.id;
  if (!id) return api.item;
  if (api.kind === "subscription") {
    return (plugin.store.data.subscriptions || []).find((s) => s.id === id) || api.item;
  }
  return (plugin.store.data.recurring || []).find((r) => r.id === id) || api.item;
}

function refreshRenewalApi(plugin, api) {
  const item = resolveRenewalStoreItem(plugin, api);
  return api.kind === "subscription" ? getSubscriptionRenewalApi(item) : getRecurringRenewalApi(item);
}

function billedSubcategoryNames(categoryName, txs) {
  const names = new Set();
  (txs || []).forEach((t) => {
    if (t.flow !== "expense" || t.category !== categoryName) return;
    const sub = (t.subcategory || "").trim();
    if (sub) names.add(sub);
  });
  return names;
}

function collectBillSubcategoryNames(categoryName, categories, txs, extra = []) {
  const names = new Set();
  const cat = (categories || []).find((c) => c.name === categoryName);
  (cat?.subcategories || []).forEach((s) => {
    const n = subcategoryName(s).trim();
    if (n) names.add(n);
  });
  billedSubcategoryNames(categoryName, txs).forEach((n) => names.add(n));
  (extra || []).forEach((n) => {
    const t = String(n || "").trim();
    if (t) names.add(t);
  });
  return [...names].sort((a, b) => a.localeCompare(b, "zh"));
}

function mountBillSubcategoryField(parent, opts) {
  const fieldId = `plg-bill-sub-${uid()}`;
  const input = parent.createEl("input", {
    type: "search",
    cls: "plg-bill-sub-search",
    attr: {
      list: fieldId,
      placeholder: "搜索已有二级，无匹配可输入新建",
      autocomplete: "off",
    },
  });
  const datalist = parent.createEl("datalist", { attr: { id: fieldId } });
  let value = opts.value || "";

  const refresh = () => {
    const names = collectBillSubcategoryNames(
      opts.getCategory(),
      opts.categories,
      opts.txs,
      opts.keep || [],
    );
    datalist.textContent = "";
    names.forEach((name) => {
      const opt = document.createElement("option");
      opt.value = name;
      datalist.appendChild(opt);
    });
    if (value && !input.value) input.value = value;
  };

  input.value = value;
  const emit = () => {
    value = input.value.trim();
    opts.onChange?.(value);
  };
  input.addEventListener("change", emit);
  input.addEventListener("input", emit);
  refresh();

  return {
    refresh,
    getValue: () => input.value.trim(),
    setValue: (v) => {
      value = v || "";
      input.value = value;
    },
  };
}

function bindDateInputQuickFill(input, onChange) {
  input.title = "双击填入今天";
  input.classList.add("plg-date-quick-fill");
  input.addEventListener("dblclick", () => {
    input.value = dateKey(new Date());
    onChange?.();
    input.dispatchEvent(new Event("change"));
  });
}

function mountDateField(parent, opts = {}) {
  const wrap = parent.createDiv({ cls: "plg-date-field-wrap" });
  const input = wrap.createEl("input", { type: "date", cls: "plg-date-field-input" });
  input.value = opts.value ? String(opts.value).slice(0, 10) : "";
  const emit = () => opts.onChange?.(input.value || "");
  bindDateInputQuickFill(input, emit);
  input.addEventListener("change", emit);
  input.addEventListener("input", emit);
  if (opts.optional) {
    wrap.createEl("button", {
      text: "清除",
      cls: "plg-btn-plain plg-date-clear-btn",
      attr: { type: "button" },
    }).onclick = () => {
      input.value = "";
      emit();
    };
  }
  return {
    getValue: () => input.value || "",
    setValue: (v) => { input.value = v ? String(v).slice(0, 10) : ""; },
    setToday: () => { input.value = dateKey(new Date()); emit(); },
    clear: () => { input.value = ""; emit(); },
    input,
  };
}

function mountSubscriptionBatchDateRow(form, label, defaultVal, onChange, rowOpts = {}) {
  const row = form.createDiv({ cls: "plg-bill-form-row plg-date-form-row plg-supplement-date-row" });
  row.createSpan({ cls: "plg-bill-form-label plg-supplement-date-label", text: label });
  const ctrl = row.createDiv({ cls: "plg-bill-form-control" });
  const picker = mountDateField(ctrl, { value: defaultVal, onChange, optional: false });
  const actionBtn = row.createEl("button", {
    text: rowOpts.optional ? "清除" : "今天",
    cls: "plg-btn-plain plg-date-row-action",
    attr: { type: "button" },
  });
  actionBtn.onclick = () => {
    if (rowOpts.optional) picker.clear();
    else picker.setToday();
  };
  return picker;
}

function subscriptionRenewalDayMap(item, txs) {
  const map = new Map();
  txsForSubscriptionRenewalRecords(item, txs).forEach((t) => {
    const d = t.datetime.slice(0, 10);
    if (!map.has(d)) map.set(d, t);
  });
  return map;
}

function splitDatesByExistingDays(dates, existingDays) {
  const toAdd = [];
  let skipped = 0;
  for (const d of dates) {
    if (existingDays.has(d)) skipped++;
    else toAdd.push(d);
  }
  return { toAdd, skipped };
}

function buildSubscriptionRenewalTx(item, dateStr, amount, ledger) {
  return {
    id: uid(),
    datetime: cycleTimeOnDate(dateStr, item),
    flow: "expense",
    category: item.category || DEFAULT_SUBSCRIPTION_LEDGER_CATEGORY,
    subcategory: item.subcategory || item.name || "",
    amount,
    ledger: ledger || "",
    accountOut: "",
    accountIn: "",
    note: item.name || "",
    reimburse: false,
    discount: 0,
    tags: ["订阅"],
    member: "",
    source: "",
    linkedSubscriptionId: item.id,
    linkedRecurringId: "",
  };
}

function patchSubscriptionRenewalTx(tx, item, dateStr, amount) {
  return {
    ...tx,
    amount,
    datetime: cycleTimeOnDate(dateStr, item),
    linkedSubscriptionId: item.id,
    tags: [...new Set([...(tx.tags || []), "订阅"])],
    category: tx.category || item.category || DEFAULT_SUBSCRIPTION_LEDGER_CATEGORY,
    subcategory: tx.subcategory || item.subcategory || item.name || "",
    note: tx.note || item.name || "",
  };
}

async function applySubscriptionBatchSupplement(plugin, item, dates, amount) {
  return applyRenewalBatchSupplement(plugin, getSubscriptionRenewalApi(item), dates, amount);
}

/** 补录 / 修改阶段 — 统一表单（金额、周期、期数、起止日期） */
function buildBillingItemForBatchForm(item, startDate, cycle, cycleIntervalDays) {
  const billingItem = {
    ...item,
    cycle: cycle || item.cycle || "monthly",
    cycleIntervalDays: cycle === "custom" ? (parseInt(cycleIntervalDays, 10) || 0) : 0,
  };
  if (startDate) applyBillingAnchorFromDate(billingItem, startDate);
  return billingItem;
}

function mountSubscriptionBatchForm(form, item, opts = {}) {
  addClasses(form, "plg-supplement-form");
  const mode = opts.mode === "edit" ? "edit" : "add";
  const isNewPhase = opts.intent === "newPhase";
  form.createDiv({
    cls: "plg-muted plg-bill-form-hint plg-bill-form-hint-top",
    text: isNewPhase
      ? "开启新的续费阶段：开始日默认今天；结束日留空则只配置下一笔自动生成，填写结束日可一并补录该区间账单。"
      : (mode === "edit"
        ? "可调整金额、周期或起止日期，下方会预览期数与合计；保存后同步更新该阶段全部账单。"
        : "填写金额、周期与起止日期；系统按周期计算各期扣费日，已有同日账单会自动跳过。"),
  });

  const inferredFromTxs = opts.phaseTxs?.length
    ? resolveBillingItemForPhase(item, opts.phaseTxs)
    : null;
  const initialCycle = opts.defaultCycle || inferredFromTxs?.cycle || item.cycle || "monthly";
  const initialInterval = opts.defaultCycleIntervalDays
    ?? inferredFromTxs?.cycleIntervalDays
    ?? item.cycleIntervalDays
    ?? 0;

  const metaRow = form.createDiv({ cls: "plg-supplement-meta-row" });

  const amountItem = metaRow.createDiv({ cls: "plg-supplement-meta-item" });
  amountItem.createSpan({ cls: "plg-supplement-meta-label", text: "金额" });
  const amountInput = amountItem.createEl("input", {
    type: "number",
    cls: "plg-field-box",
    attr: { step: "0.01" },
  });
  amountInput.value = opts.defaultAmount != null ? String(opts.defaultAmount) : "";

  const cycleItem = metaRow.createDiv({ cls: "plg-supplement-meta-item" });
  cycleItem.createSpan({ cls: "plg-supplement-meta-label", text: "周期" });
  const cycleSelect = cycleItem.createEl("select", { cls: "plg-field-box plg-supplement-cycle-select" });
  fillCycleSelect(cycleSelect, initialCycle);

  const periodsItem = metaRow.createDiv({ cls: "plg-supplement-meta-item" });
  periodsItem.createSpan({ cls: "plg-supplement-meta-label", text: "期数" });
  const periodsVal = periodsItem.createEl("input", {
    type: "number",
    cls: "plg-field-box plg-field-box-readonly",
    attr: { readonly: "true", tabindex: "-1", "aria-readonly": "true", min: "0", step: "1" },
  });
  periodsVal.value = "0";

  const intervalRow = form.createDiv({ cls: "plg-bill-form-row plg-supplement-interval-row" });
  intervalRow.createSpan({ cls: "plg-supplement-interval-label", text: "间隔天数" });
  const intervalInput = intervalRow.createEl("input", {
    type: "number",
    cls: "plg-field-box",
    attr: { min: "1", step: "1", placeholder: "如 30" },
  });
  intervalInput.value = initialInterval ? String(initialInterval) : "";

  function syncIntervalRow() {
    intervalRow.style.display = cycleSelect.value === "custom" ? "" : "none";
  }

  const dateRows = form.createDiv({ cls: "plg-supplement-date-rows" });
  const startDateField = mountSubscriptionBatchDateRow(dateRows, "开始", opts.defaultStart || "", () => updatePreview());
  const endDateField = mountSubscriptionBatchDateRow(
    dateRows,
    "结束",
    opts.defaultEnd ?? "",
    () => updatePreview(),
    { optional: isNewPhase },
  );
  const summaryHint = form.createDiv({ cls: "plg-muted plg-bill-form-hint plg-bill-form-hint-top plg-supplement-summary" });

  const recordLabel = opts.recordLabel || "续费记录";
  const cycleLabel = opts.cycleLabel || "订阅周期";

  function getBillingItem() {
    const start = startDateField?.getValue?.() || "";
    const cycle = cycleSelect.value;
    const interval = cycle === "custom" ? parseInt(intervalInput.value, 10) || 0 : 0;
    return buildBillingItemForBatchForm(item, start, cycle, interval);
  }

  function updatePreview() {
    const start = startDateField?.getValue?.() || "";
    const end = endDateField?.getValue?.() || "";
    const amount = parseFloat(amountInput?.value) || 0;
    const billingItem = getBillingItem();
    const dates = (start && end) ? computeSubscriptionPeriodDates(billingItem, start, end) : [];
    periodsVal.value = String(dates.length);
    const existingDays = opts.getExistingDays?.() || new Set();
    const { toAdd, skipped } = splitDatesByExistingDays(dates, existingDays);
    const cycleHint = ` · ${formatRecurringLabel(billingItem)}`;
    if (!start) {
      summaryHint.textContent = "请选择开始日期";
    } else if (isNewPhase && !end) {
      periodsVal.value = "0";
      summaryHint.textContent = `预览：不补录历史，从 ${start} 起按此周期自动生成下一笔${cycleHint}`;
    } else if (!end) {
      summaryHint.textContent = "请选择结束日期";
    } else if (start > end) {
      summaryHint.textContent = "结束日期不能早于开始日期";
    } else if (cycleSelect.value === "custom" && !(parseInt(intervalInput.value, 10) > 0)) {
      summaryHint.textContent = "请填写自定义间隔天数";
    } else if (!dates.length) {
      summaryHint.textContent = `该区间内没有符合${cycleLabel}的扣费日${cycleHint}`;
    } else if (mode === "edit") {
      summaryHint.textContent = `预览：${dates.length} 笔 · 合计 ${fmtMoney(dates.length * amount)} · 保存后同步更新${cycleHint}`;
    } else if (skipped && !toAdd.length) {
      summaryHint.textContent = `所选区间 ${dates.length} 个扣费日均已有记录，无需补录${cycleHint}`;
    } else if (skipped) {
      summaryHint.textContent = `预览：将补录 ${toAdd.length} 笔（跳过 ${skipped} 笔已有）· 合计 ${fmtMoney(toAdd.length * amount)} · 写入总账本与${recordLabel}${cycleHint}`;
    } else {
      summaryHint.textContent = `预览：将补录 ${toAdd.length} 笔 · 合计 ${fmtMoney(toAdd.length * amount)} · 写入总账本与${recordLabel}${cycleHint}`;
    }
    opts.onPreview?.({ start, end, amount, dates, toAdd, skipped, billingItem });
  }

  amountInput.oninput = updatePreview;
  cycleSelect.onchange = () => { syncIntervalRow(); updatePreview(); };
  intervalInput.oninput = updatePreview;
  syncIntervalRow();
  updatePreview();

  return {
    amountInput,
    startDateField,
    endDateField,
    periodsVal,
    summaryHint,
    cycleSelect,
    intervalInput,
    getBillingItem,
    updatePreview,
  };
}

async function saveSubscriptionPhaseEdit(plugin, item, phase, start, end, amount) {
  return saveRenewalPhaseEdit(plugin, getSubscriptionRenewalApi(item), phase, start, end, amount);
}

function billFormRow(parent, label, buildControl) {
  const row = parent.createDiv({ cls: "plg-bill-form-row" });
  row.createSpan({ cls: "plg-bill-form-label", text: label });
  const ctrl = row.createDiv({ cls: "plg-bill-form-control" });
  buildControl(ctrl);
  return { row, ctrl };
}

function fillCycleSelect(selectEl, value) {
  selectEl.textContent = "";
  CYCLE_OPTIONS.forEach((o) => {
    const opt = document.createElement("option");
    opt.value = o.value;
    opt.textContent = o.label;
    selectEl.appendChild(opt);
  });
  selectEl.value = value || "monthly";
}

function buildBillIdentityEditor(parent, draft, meta = {}) {
  const kind = meta.kind === "recurring" ? "recurring" : "subscription";
  const app = meta.app;
  const card = parent.createDiv({ cls: "plg-cat-identity-card plg-sub-identity-card" });
  const top = card.createDiv({ cls: "plg-cat-identity-top" });
  const previewWrap = top.createDiv({ cls: "plg-cat-icon-preview plg-cat-icon-preview-lg plg-sub-icon-preview-slot" });
  const fields = top.createDiv({ cls: "plg-cat-identity-fields" });
  if (kind === "recurring" && !meta.hideRuleNameLabel) {
    fields.createDiv({ cls: "plg-recurring-rule-name-label", text: "规则名称" });
  }
  const nameRow = fields.createDiv({ cls: "plg-cat-identity-name-row" });
  const nameInput = nameRow.createEl("input", {
    type: "text",
    attr: {
      placeholder: kind === "recurring" ? "如 父亲健康险、房贷、水电" : "如 哔哩哔哩大会员",
    },
  });
  nameInput.value = kind === "recurring" ? (draft.title || "") : (draft.name || "");
  nameInput.classList.add("plg-cat-name-inline-input");

  const readName = () => nameInput.value.trim();

  const resolveDefaultIcon = (name) => {
    if (kind === "recurring") {
      const catIcon = meta.getCategoryIcon?.()?.icon;
      return catIcon || subscriptionAbbr(name);
    }
    return subscriptionAbbr(name);
  };

  const tools = card.createDiv({ cls: "plg-cat-identity-tools" });
  const emojiInput = tools.createEl("input", {
    type: "text",
    attr: { placeholder: "Emoji", title: "输入 emoji 作为图标" },
  });
  emojiInput.classList.add("plg-cat-emoji-field");
  emojiInput.value = draft.iconUrl ? "" : (draft.icon || resolveDefaultIcon(readName()));

  let emojiManual = !!(draft.iconUrl ? false : (
    draft.icon &&
    draft.icon !== subscriptionAbbr(readName()) &&
    !meta.preset?.abbr &&
    !(kind === "recurring" && meta.getCategoryIcon?.()?.icon === draft.icon)
  ));

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/png,image/jpeg,image/webp,image/gif,image/svg+xml";
  fileInput.style.display = "none";
  card.appendChild(fileInput);

  const uploadBtn = tools.createEl("button", { text: "上传图标", cls: "plg-btn-plain", attr: { type: "button" } });
  attachIconfontPickerButton(tools, app, (picked) => {
    draft.iconUrl = picked.iconUrl;
    draft.domain = "";
    emojiManual = false;
    emojiInput.value = "";
    fileInput.value = "";
    renderPreview();
    if (kind === "recurring") meta.onIdentityIconManualEdit?.();
  }, readName() || (kind === "recurring" ? draft.title : draft.name) || "");
  tools.createEl("button", { text: "清除图片", cls: "plg-btn-plain", attr: { type: "button" } }).onclick = () => {
    draft.iconUrl = "";
    fileInput.value = "";
    emojiManual = false;
    if (kind === "subscription") applyPresetForName(readName());
    else {
      draft.icon = resolveDefaultIcon(readName());
      emojiInput.value = draft.icon;
      renderPreview();
    }
    if (kind === "recurring") meta.onIdentityIconManualEdit?.();
  };
  card.createDiv({
    cls: "plg-muted plg-cat-identity-hint",
    text: meta.identityHint || (kind === "recurring"
      ? "先选上方入账位置，再填规则名称；选中二级可继承图标"
      : "默认使用预设或名称首字；可上传图片、从 iconfont 搜索或输入 emoji"),
  });

  const previewItem = () => {
    const name = readName();
    const catMeta = kind === "recurring" ? (meta.getCategoryIcon?.() || {}) : {};
    if (kind === "subscription") {
      const preset = findSubscriptionPreset(name) || meta.preset;
      if (draft.iconUrl) {
        return { name, icon: draft.icon, iconUrl: draft.iconUrl, domain: "", color: draft.color || preset?.color || "" };
      }
      if (emojiManual) {
        return { name, icon: draft.icon || subscriptionAbbr(name), iconUrl: "", domain: "", color: draft.color || preset?.color || "" };
      }
      return {
        name,
        icon: preset?.abbr || draft.icon || subscriptionAbbr(name),
        iconUrl: "",
        domain: preset?.domain || draft.domain || "",
        color: preset?.color || draft.color || "",
      };
    }
    if (draft.iconUrl) {
      return { name, icon: draft.icon, iconUrl: draft.iconUrl, domain: "", color: draft.color || catMeta.color || "" };
    }
    if (emojiManual) {
      return { name, icon: draft.icon || subscriptionAbbr(name), iconUrl: "", domain: "", color: draft.color || catMeta.color || "" };
    }
    return {
      name,
      icon: draft.icon || catMeta.icon || subscriptionAbbr(name),
      iconUrl: "",
      domain: draft.domain || "",
      color: draft.color || catMeta.color || "",
    };
  };

  const renderPreview = () => {
    previewWrap.empty();
    renderSubscriptionIcon(previewWrap, previewItem(), meta.plugin);
  };

  const applyPresetForName = (name) => {
    if (kind !== "subscription") return;
    const preset = findSubscriptionPreset(name);
    meta.preset = preset;
    if (draft.iconUrl || emojiManual) return;
    if (preset) {
      draft.icon = preset.abbr;
      draft.domain = preset.domain || "";
      draft.color = preset.color || "";
      emojiInput.value = "";
    } else {
      draft.icon = subscriptionAbbr(name);
      draft.domain = "";
      emojiInput.value = draft.icon;
    }
    renderPreview();
  };

  nameInput.addEventListener("input", () => {
    if (kind === "recurring") {
      draft.title = readName();
      if (!draft.iconUrl && !emojiManual) {
        draft.icon = resolveDefaultIcon(draft.title);
        emojiInput.value = draft.icon;
        renderPreview();
      }
      return;
    }
    draft.name = readName();
    applyPresetForName(draft.name);
  });

  emojiInput.addEventListener("input", () => {
    emojiManual = true;
    draft.iconUrl = "";
    draft.domain = "";
    fileInput.value = "";
    draft.icon = emojiInput.value.trim() || subscriptionAbbr(readName());
    renderPreview();
    if (kind === "recurring") meta.onIdentityIconManualEdit?.();
  });

  uploadBtn.onclick = () => fileInput.click();

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    try {
      draft.iconUrl = await compressIconImageFile(file);
      draft.domain = "";
      emojiManual = false;
      emojiInput.value = "";
      renderPreview();
      if (kind === "recurring") meta.onIdentityIconManualEdit?.();
    } catch {
      new Notice("图片处理失败，请换一张试试");
    }
  });

  renderPreview();

  return {
    nameInput,
    titleInput: nameInput,
    renderPreview,
    applyIdentity(payload = {}, opts = {}) {
      if (!opts.keepTitle) {
        const name = String(payload.title ?? payload.name ?? readName()).trim();
        if (name || payload.title !== undefined || payload.name !== undefined) {
          if (kind === "recurring") draft.title = name;
          else draft.name = name;
          if (name) nameInput.value = name;
        }
      }
      const displayName = readName();

      if (payload.iconUrl) {
        draft.iconUrl = payload.iconUrl;
        draft.icon = payload.icon || subscriptionAbbr(displayName);
        draft.domain = payload.domain || "";
        draft.color = payload.color || "";
        emojiManual = false;
        emojiInput.value = "";
        fileInput.value = "";
      } else if (payload.icon !== undefined || opts.fromSubcategory) {
        draft.iconUrl = "";
        fileInput.value = "";
        const icon = payload.icon || (displayName ? resolveDefaultIcon(displayName) : draft.icon);
        draft.icon = icon;
        draft.domain = payload.domain ?? draft.domain ?? "";
        draft.color = payload.color ?? draft.color ?? "";
        if (opts.fromSubcategory) emojiManual = false;
        else emojiManual = !!opts.manualIcon;
        emojiInput.value = icon;
      }
      renderPreview();
    },
    getIconPayload: () => {
      const name = readName();
      const item = previewItem();
      return {
        icon: item.icon,
        iconUrl: item.iconUrl || "",
        domain: item.domain || "",
        color: item.color || "",
        name,
      };
    },
  };
}

function buildSubscriptionIdentityEditor(parent, draft, meta = {}) {
  return buildBillIdentityEditor(parent, draft, { ...meta, kind: "subscription" });
}

function enrichRecurringItem(item, categories, storeData = null) {
  const cat = (categories || []).find((c) => c.name === item.category);
  const subName = String(item.subcategory || item.title || "").trim();
  const subMeta = subName ? findSubcategoryMeta(cat, subName) : null;
  const subNorm = subMeta ? normalizeSubcategory(subMeta) : (subName ? { name: subName, icon: "", iconUrl: "" } : null);
  const catMeta = getCategoryMeta(categories, item.category);
  const title = item.title || "";
  const subs = storeData?.subscriptions;
  const recurring = storeData?.recurring;
  const enrichedSub = subNorm
    ? enrichSubcategoryWithPreset(subNorm, item.category, subs, recurring)
    : null;
  const preset = subName
    ? resolveSubscriptionPreset({ name: subName, subcategory: subName, category: item.category })
    : null;
  if (item.iconUrl) {
    return {
      name: title,
      ...item,
      color: item.color || preset?.color || catMeta.color || "",
    };
  }
  return {
    name: title,
    icon: item.icon || enrichedSub?.icon || subNorm?.icon || catMeta.icon || subscriptionAbbr(title),
    iconUrl: enrichedSub?.iconUrl || subNorm?.iconUrl || "",
    domain: item.domain || enrichedSub?.domain || preset?.domain || "",
    color: item.color || enrichedSub?.color || preset?.color || catMeta.color || "",
  };
}

function openSubcategoryEdit(app, subMeta, onSave, opts = {}) {
  const isNew = !!opts.isNew;
  const draft = isNew
    ? { name: "", icon: "", iconUrl: "", keywords: [] }
    : { ...normalizeSubcategory(subMeta), keywords: [...(normalizeSubcategory(subMeta).keywords || [])] };
  const originalName = draft.name;
  openPlgOverlay({
    title: opts.title || (isNew ? "新增二级分类" : `编辑 · ${draft.name}`),
    cls: "plg-cat-edit-modal",
    stack: true,
    build: (body, close) => {
      const { content, actions } = createMobileModalShell(body);
      const editor = buildCategoryIdentityEditor(content, draft, { app });
      content.createEl("h4", { text: "智能关键词" });
      content.createEl("p", {
        cls: "plg-muted",
        text: "本二级分类专用，空格分隔；智能记账时会优先匹配到本二级",
      });
      const kwInput = content.createEl("textarea", {
        cls: "plg-kw-bulk-input",
        attr: { placeholder: "如 斗地主 麻将", rows: "2" },
      });
      kwInput.value = formatKeywordInput(draft.keywords);
      const btnRow = actions || content.createDiv({ cls: "plg-modal-actions" });
      btnRow.createEl("button", { text: "取消", attr: { type: "button" } }).onclick = close;
      btnRow.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).onclick = async () => {
        const name = editor.nameInput.value.trim();
        if (!name) return new Notice("请填写名称");
        const { icon, iconUrl } = editor.getIconPayload();
        const next = { name, icon, iconUrl, keywords: parseKeywordInput(kwInput.value) };
        try {
          await onSave(next, isNew ? null : originalName);
          close();
        } catch (e) {
          new Notice(e.message || "保存失败");
        }
      };
    },
  });
}

function openCategoryEdit(app, plugin, categoryName, flowDefault, onSaved) {
  const isNew = !categoryName;
  const oldName = categoryName || "";
  const cat = categoryName ? plugin.store.data.categories.find((c) => c.name === categoryName) : null;
  const draft = cat
    ? {
      name: cat.name,
      flow: cat.flow,
      icon: cat.iconUrl ? cat.icon : (cat.icon || categoryInitialIcon(cat.name)),
      iconUrl: cat.iconUrl || "",
      keywords: [...(cat.keywords || [])],
      subcategories: (cat.subcategories || []).map((s) => normalizeSubcategory(s)),
    }
    : { name: "", flow: flowDefault || "expense", icon: "", iconUrl: "", keywords: [], subcategories: [] };

  openPlgOverlay({
    title: isNew ? "新增一级分类" : `编辑 · ${oldName}`,
    cls: "plg-cat-edit-modal",
    wide: true,
    stack: true,
    build: (body, close) => {
      const { content, actions } = createMobileModalShell(body);
      const subRenames = new Map();
      const editor = buildCategoryIdentityEditor(content, draft, { showFlow: true, app });

      const subHead = content.createDiv({ cls: "plg-section-head" });
      subHead.createEl("h4", { text: "二级分类" });
      const subList = content.createDiv({ cls: "plg-sub-edit-list" });

      const renderSubs = () => {
        subList.empty();
        if (!draft.subcategories.length) {
          subList.createDiv({ cls: "plg-muted", text: "暂无二级分类" });
          return;
        }
        draft.subcategories.forEach((sub) => {
          const meta = normalizeSubcategory(sub);
          const line = subList.createDiv({ cls: "plg-sub-edit-row" });
          renderCategoryLabel(line, meta, {
            categoryName: draft.name || oldName,
            subscriptions: plugin.store.data.subscriptions,
          });
          const acts = line.createDiv({ cls: "plg-cat-row-actions" });
          acts.createEl("button", { text: "编辑", cls: "plg-btn-plain", attr: { type: "button" } }).onclick = () => {
            openSubcategoryEdit(app, meta, async (next, oldSubName) => {
              if (draft.subcategories.some((x) => subcategoryName(x) === next.name && subcategoryName(x) !== oldSubName)) {
                throw new Error("名称已存在");
              }
              if (isNew) {
                if (oldSubName) {
                  if (next.name !== oldSubName) subRenames.set(oldSubName, next.name);
                  draft.subcategories = draft.subcategories
                    .map((x) => (subcategoryName(x) === oldSubName ? next : x))
                    .sort((a, b) => subcategoryName(a).localeCompare(subcategoryName(b), "zh"));
                } else {
                  draft.subcategories.push(normalizeSubcategory(next));
                  draft.subcategories.sort((a, b) => subcategoryName(a).localeCompare(subcategoryName(b), "zh"));
                }
              } else if (oldSubName) {
                if (next.name !== oldSubName) subRenames.set(oldSubName, next.name);
                await plugin.store.updateSubcategory(oldName, oldSubName, next);
                const freshCat = plugin.store.data.categories.find((c) => c.name === oldName);
                if (freshCat) {
                  draft.subcategories = (freshCat.subcategories || []).map((s) => normalizeSubcategory(s));
                }
                plugin.refreshView?.();
              } else {
                await plugin.store.addSubcategory(oldName, next);
                const freshCat = plugin.store.data.categories.find((c) => c.name === oldName);
                if (freshCat) {
                  draft.subcategories = (freshCat.subcategories || []).map((s) => normalizeSubcategory(s));
                }
                plugin.refreshView?.();
              }
              renderSubs();
            });
          };
          acts.createEl("button", { text: "删除", cls: "plg-btn-plain", attr: { type: "button" } }).onclick = () => {
            draft.subcategories = draft.subcategories.filter((x) => subcategoryName(x) !== meta.name);
            renderSubs();
          };
        });
      };

      subHead.createEl("button", {
        text: "新增",
        cls: "plg-btn-plain",
        attr: { type: "button" },
      }).onclick = () => {
        openSubcategoryEdit(app, { name: "", icon: "", iconUrl: "", keywords: [] }, async (next) => {
          if (draft.subcategories.some((x) => subcategoryName(x) === next.name)) {
            throw new Error("名称已存在");
          }
          draft.subcategories.push(normalizeSubcategory(next));
          draft.subcategories.sort((a, b) => subcategoryName(a).localeCompare(subcategoryName(b), "zh"));
          renderSubs();
        }, { isNew: true });
      };
      renderSubs();

      const kwBlock = content.createDiv({ cls: "plg-cat-kw-block" });
      kwBlock.createDiv({ cls: "plg-muted plg-cat-kw-label", text: "一级分类关键词" });
      const kwInput = kwBlock.createEl("input", {
        type: "text",
        cls: "plg-cat-kw-input",
        attr: { placeholder: "逗号分隔，如：外卖, 美团" },
      });
      kwInput.value = formatKeywordInput(draft.keywords || []);

      const btnRow = actions || content.createDiv({ cls: "plg-modal-actions" });
      btnRow.createEl("button", { text: "取消", attr: { type: "button" } }).onclick = close;
      btnRow.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).onclick = async () => {
        try {
          const { icon, iconUrl } = editor.getIconPayload();
          const payload = {
            name: editor.nameInput.value.trim(),
            flow: editor.flowSel?.value || draft.flow || "expense",
            icon,
            iconUrl,
            keywords: parseKeywordInput(kwInput.value),
            subcategories: draft.subcategories,
          };
          if (!payload.name) return new Notice("请填写分类名称");
          if (!isNew) {
            subRenames.forEach((nextSub, oldSub) => {
              plugin.store.migrateSubcategoryMeta(oldName, oldSub, {
                category: payload.name,
                subcategory: nextSub,
              });
              plugin.store.data.transactions.forEach((t) => {
                const catMatch = t.category === oldName || t.category === payload.name;
                if (catMatch && t.subcategory === oldSub) {
                  if (t.category === oldName && payload.name !== oldName) t.category = payload.name;
                  t.subcategory = nextSub;
                }
              });
            });
          }
          if (isNew) await plugin.store.addCategory(payload);
          else await plugin.store.updateCategory(oldName, payload);
          new Notice("分类已保存");
          plugin.refreshView?.();
          onSaved?.();
          close();
        } catch (e) {
          new Notice(e.message || "保存失败");
        }
      };
    },
  });
}

class CategoryEditModal {
  constructor(app, plugin, categoryName, flowDefault, onSaved) {
    this.app = app;
    this.plugin = plugin;
    this.categoryName = categoryName;
    this.flowDefault = flowDefault;
    this.onSaved = onSaved;
  }
  open() {
    openCategoryEdit(this.app, this.plugin, this.categoryName, this.flowDefault, this.onSaved);
  }
}

class RecurringBillModal {
  constructor(app, plugin, item, onSaved) {
    this.app = app;
    this.plugin = plugin;
    this.item = item;
    this.onSaved = onSaved;
  }
  open() {
    openRecurringBill(this.app, this.plugin, this.item, this.onSaved);
  }
}

function enrichBillSubcategoryMeta(categories, categoryName, subName, subscriptions, recurring) {
  const cat = (categories || []).find((c) => c.name === categoryName);
  const sn = String(subName || "").trim();
  if (!cat || !sn) return null;
  const subMeta = findSubcategoryMeta(cat, sn);
  if (!subMeta) return null;
  return enrichSubcategoryWithPreset(normalizeSubcategory(subMeta), categoryName, subscriptions, recurring);
}

function openRecurringBill(app, plugin, item, onSaved, opts = {}) {
  const cats = plugin.store.data.categories || [];
  const defaultCat = cats.find((c) => c.flow !== "income")?.name || "";
  const isNew = !item;
  const newPhaseMode = !!opts.newPhase;
  const bill = item ? { ...item } : {
    id: uid(),
    title: "",
    icon: "",
    iconUrl: "",
    domain: "",
    color: "",
    amount: 0,
    category: "",
    subcategory: "",
    flow: "expense",
    cycle: "monthly",
    cycleDay: 1,
    cycleMonth: new Date().getMonth() + 1,
    cycleWeekday: new Date().getDay(),
    cycleIntervalDays: 0,
    cycleTime: "12:00",
    billingAnchor: "",
    startDate: "",
    nextDate: "",
    active: true,
    generatedCount: 0,
    note: "",
    pausedAt: "",
    phases: [],
  };
  if (!isNew) normalizeSingleRecurringPhases(bill);
  const activePhase = getActiveRecurringPhase(bill);
  if (newPhaseMode && !isNew) {
    const today = dateKey(new Date());
    bill.startDate = today;
    bill.pausedAt = "";
    bill.active = true;
    if (activePhase) {
      bill.amount = activePhase.amount;
      bill.cycle = activePhase.cycle || "monthly";
      bill.cycleIntervalDays = activePhase.cycleIntervalDays || 0;
    }
    applyBillingAnchorFromDate(bill, today);
  }
  if (bill.active === undefined) bill.active = true;
  if (!bill.category) bill.category = defaultCat;
  if (!bill.cycleTime) bill.cycleTime = "12:00";
  if (isNew && !bill.startDate) {
    bill.startDate = dateKey(new Date());
    applyBillingAnchorFromDate(bill, bill.startDate);
  }

  const iconDraft = {
    title: bill.title || "",
    icon: bill.icon || "",
    iconUrl: bill.iconUrl || "",
    domain: bill.domain || "",
    color: bill.color || "",
  };
  Object.assign(iconDraft, seedBillIconFromSubcategory({
    category: bill.category,
    subcategory: bill.subcategory || bill.title,
    title: bill.title,
    icon: iconDraft.icon,
    iconUrl: iconDraft.iconUrl,
  }, plugin.store.data.categories));

  const state = {
    flow: bill.flow || "expense",
    category: bill.category || defaultCat,
    subcategory: bill.subcategory || "",
    cycle: bill.cycle || "monthly",
    active: bill.active !== false,
  };

  const modalTitle = isNew ? "新增周期" : (newPhaseMode ? `开启新阶段 · ${bill.title}` : `编辑 · ${bill.title}`);

  openPlgOverlay({
    title: modalTitle,
    cls: "plg-recurring-overlay plg-subscription-overlay",
    wide: true,
    stack: true,
    tier: 2,
    build: (body, close) => {
      addClasses(body, "plg-modal", "plg-recurring-form");
      const form = body.createDiv({ cls: "plg-recurring-form-inner plg-recurring-edit-form" });

      let identityEditor;
      let amountInput;
      let flowSelect;
      let catSelect;
      let subField;
      let cycleSelect;
      let intervalInput;
      let intervalRow;
      let hintEl;
      let startDateField;
      let noteInput;
      let identityIconManual = !!bill.iconUrl;
      const storeData = () => plugin.store.data;

      const syncSubcategoryIconToIdentity = () => {
        const subName = (subField?.getValue() || state.subcategory || "").trim();
        state.subcategory = subName;
        const enriched = enrichBillSubcategoryMeta(
          storeData().categories,
          state.category,
          subName,
          storeData().subscriptions,
          storeData().recurring,
        );
        if (!enriched) return false;
        state.subcategory = subcategoryName(enriched);
        if (identityIconManual || !identityEditor) return true;
        identityEditor.applyIdentity({
          icon: enriched.icon,
          iconUrl: enriched.iconUrl || "",
          domain: enriched.domain || "",
          color: enriched.color || "",
        }, { fromSubcategory: true, keepTitle: true });
        return true;
      };

      form.createDiv({ cls: "plg-recurring-section-label", text: "入账位置" });
      const catRow = form.createDiv({ cls: "plg-recurring-cat-row plg-recurring-cat-row-top" });
      const cat1Item = catRow.createDiv({ cls: "plg-recurring-cat-item" });
      cat1Item.createSpan({ cls: "plg-recurring-cat-label", text: "入账一级" });
      catSelect = cat1Item.createEl("select", { cls: "plg-field-box plg-recurring-cat-select" });

      const cat2Item = catRow.createDiv({ cls: "plg-recurring-cat-item plg-recurring-cat-item-sub" });
      cat2Item.createSpan({ cls: "plg-recurring-cat-label", text: "入账二级" });
      const subCtrl = cat2Item.createDiv({ cls: "plg-recurring-cat-sub-wrap" });
      subField = mountBillSubcategoryField(subCtrl, {
        value: state.subcategory || bill.subcategory || "",
        categories: plugin.store.data.categories,
        txs: plugin.store.data.transactions || [],
        keep: [bill.subcategory, bill.title, state.subcategory],
        getCategory: () => state.category,
        onChange: (v) => {
          state.subcategory = v;
          syncSubcategoryIconToIdentity();
        },
      });

      form.createDiv({ cls: "plg-recurring-section-label", text: "规则名称" });
      identityEditor = buildBillIdentityEditor(form, iconDraft, {
        kind: "recurring",
        app,
        plugin,
        hideRuleNameLabel: true,
        getCategoryIcon: () => getCategoryMeta(plugin.store.data.categories, state.category),
        onIdentityIconManualEdit: () => { identityIconManual = true; },
      });

      const metaRow = form.createDiv({ cls: "plg-recurring-meta-row" });

      const flowItem = metaRow.createDiv({ cls: "plg-recurring-meta-item" });
      flowItem.createSpan({ cls: "plg-recurring-meta-label", text: "类型" });
      flowSelect = flowItem.createEl("select", { cls: "plg-field-box plg-recurring-meta-flow" });
      appendSelectOptions(flowSelect, [
        { value: "expense", label: "支出" },
        { value: "income", label: "收入" },
      ], state.flow);

      const amountItem = metaRow.createDiv({ cls: "plg-recurring-meta-item" });
      amountItem.createSpan({ cls: "plg-recurring-meta-label", text: "金额" });
      amountInput = amountItem.createEl("input", {
        type: "number",
        cls: "plg-field-box",
        attr: { step: "0.01", placeholder: "0.00" },
      });
      amountInput.value = bill.amount ? String(bill.amount) : "";

      const cycleItem = metaRow.createDiv({ cls: "plg-recurring-meta-item" });
      cycleItem.createSpan({ cls: "plg-recurring-meta-label", text: "周期" });
      cycleSelect = cycleItem.createEl("select", { cls: "plg-field-box plg-recurring-meta-cycle" });
      fillCycleSelect(cycleSelect, state.cycle);
      cycleSelect.onchange = () => {
        state.cycle = cycleSelect.value;
        if (intervalRow) intervalRow.row.style.display = state.cycle === "custom" ? "" : "none";
        if (hintEl) hintEl.textContent = cycleHintText(state.cycle);
      };

      billFormRow(form, "备注", (ctrl) => {
        noteInput = ctrl.createEl("input", {
          type: "text",
          attr: { placeholder: "匹配历史账单，默认可与规则名称相同" },
        });
        noteInput.value = bill.note || "";
      });

      intervalRow = billFormRow(form, "间隔天数", (ctrl) => {
        intervalInput = ctrl.createEl("input", {
          type: "number",
          attr: { min: "1", step: "1", placeholder: "如 30" },
        });
        intervalInput.value = bill.cycleIntervalDays ? String(bill.cycleIntervalDays) : "";
      });
      intervalRow.row.style.display = state.cycle === "custom" ? "" : "none";

      const statusRow = form.createDiv({ cls: "plg-bill-form-row plg-recurring-status-row" });
      statusRow.createSpan({ cls: "plg-bill-form-label", text: "状态" });
      const statusCtrl = statusRow.createDiv({ cls: "plg-bill-form-control plg-recurring-status-control" });
      const switchLabel = statusCtrl.createEl("label", {
        cls: "plg-slide-switch",
        attr: { "aria-label": "自动生成状态" },
      });
      const toggle = switchLabel.createEl("input", { type: "checkbox" });
      toggle.checked = state.active;
      switchLabel.createSpan({ cls: "plg-slide-track" });
      const statusHint = statusCtrl.createSpan({ cls: "plg-muted plg-recurring-status-hint" });

      function updateStatus() {
        statusHint.textContent = state.active
          ? "生效中 · 将按周期自动生成账单"
          : "已暂停 · 不自动生成，历史记账记录保留";
        statusHint.classList.toggle("paused", !state.active);
      }
      toggle.onchange = () => {
        state.active = toggle.checked;
        updateStatus();
      };

      billFormRow(form, "开始时间", (ctrl) => {
        startDateField = mountDateField(ctrl, {
          value: billingDateValue(bill),
          onChange: (v) => { if (v) applyBillingAnchorFromDate(bill, v); },
        });
      });

      hintEl = form.createDiv({
        cls: "plg-muted plg-bill-form-hint",
        text: "同一二级下可有多条规则（如父亲/母亲健康险）；入账走二级，名称区分各条。续费变更请用「开启新阶段」。",
      });

      updateStatus();

      const refreshCats = () => {
        const list = plugin.store.data.categories.filter((c) =>
          state.flow === "income" ? c.flow === "income" : c.flow !== "income",
        );
        const preferred = bill.category || defaultCat;
        const selected = list.some((c) => c.name === state.category)
          ? state.category
          : (list.some((c) => c.name === preferred) ? preferred : list[0]?.name || "");
        state.category = selected;
        catSelect.textContent = "";
        list.forEach((c) => {
          const opt = document.createElement("option");
          opt.value = c.name;
          opt.textContent = `${c.icon} ${c.name}`;
          catSelect.appendChild(opt);
        });
        catSelect.value = selected;
        subField?.refresh();
        syncSubcategoryIconToIdentity();
      };

      catSelect.onchange = () => {
        state.category = catSelect.value;
        subField?.refresh();
        syncSubcategoryIconToIdentity();
      };

      flowSelect.onchange = () => {
        state.flow = flowSelect.value;
        refreshCats();
      };

      refreshCats();

      const btnRow = body.createDiv({ cls: "plg-modal-actions" });
      btnRow.createEl("button", { text: "取消", cls: "plg-btn-ghost", attr: { type: "button" } }).onclick = close;
      btnRow.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).onclick = async () => {
        const title = identityEditor.titleInput.value.trim();
        const amount = parseFloat(amountInput.value);
        if (!title) return new Notice("请填写名称");
        if (!amount) return new Notice("请填写金额");
        if (!state.category) return new Notice("请选择入账一级");
        const subName = (subField?.getValue() || state.subcategory || title).trim();
        if (!subName) return new Notice("请填写入账二级");
        const startDate = startDateField.getValue();
        if (!startDate) return new Notice("请选择开始时间");
        if (state.cycle === "custom" && !(parseInt(intervalInput.value, 10) > 0)) {
          return new Notice("请填写自定义间隔天数");
        }
        applyBillingAnchorFromDate(bill, startDate);
        const { icon, iconUrl, domain, color } = identityEditor.getIconPayload();
        const formData = {
          amount,
          cycle: cycleSelect.value,
          cycleDay: bill.cycleDay,
          cycleMonth: bill.cycleMonth,
          cycleWeekday: bill.cycleWeekday,
          cycleIntervalDays: cycleSelect.value === "custom" ? parseInt(intervalInput.value, 10) || 0 : 0,
          startDate,
        };
        Object.assign(bill, {
          title,
          icon,
          iconUrl,
          domain,
          color,
          amount,
          category: state.category,
          subcategory: subName,
          flow: state.flow,
          note: noteInput?.value?.trim() || title,
          cycle: formData.cycle,
          cycleIntervalDays: formData.cycleIntervalDays,
          active: state.active,
          startDate,
        });
        if (isNew) {
          bill.phases = [{
            id: uid(),
            ...formData,
            endDate: state.active ? "" : dateKey(new Date()),
          }];
          syncRecurringFromPhase(bill, bill.phases[0]);
        } else if (newPhaseMode || recurringPhaseFormChanged(activePhase, formData)) {
          startRecurringPhase(bill, formData);
          if (!state.active) closeRecurringPhase(bill, dateKey(new Date()));
        } else {
          const phase = getActiveRecurringPhase(bill);
          if (phase) {
            Object.assign(phase, formData);
            if (!state.active && !phase.endDate) phase.endDate = dateKey(new Date());
            syncRecurringFromPhase(bill, phase);
          }
          bill.active = state.active;
        }
        bill.nextDate = computeInitialNextDate(bill, new Date());
        const backfilled = await plugin.store.saveRecurring(bill);
        new Notice(
          newPhaseMode
            ? "已开启新阶段"
            : (isNew && backfilled > 0
              ? `已保存，并补录 ${backfilled} 期账单`
              : (isNew ? "已保存周期规则" : "已保存")),
        );
        onSaved?.();
        close();
      };
    },
  });
}

function openSubscriptionBill(app, plugin, item, preset, onSaved, opts = {}) {
  const defaultCat = "软件续费";
  const isNewSub = !item;
  const newPhaseMode = !!opts.newPhase;
  const sub = item ? { ...item } : {
    id: uid(),
    name: preset?.name || "",
    icon: preset?.abbr || "",
    iconUrl: "",
    domain: preset?.domain || "",
    color: preset?.color || "",
    amount: 0,
    category: preset?.category || defaultCat,
    subcategory: preset?.subcategory || preset?.name || "",
    cycle: "monthly",
    cycleDay: 1,
    cycleMonth: new Date().getMonth() + 1,
    cycleWeekday: new Date().getDay(),
    cycleIntervalDays: 0,
    cycleTime: "12:00",
    billingAnchor: "",
    startDate: "",
    pausedAt: "",
    nextDate: "",
    source: "manual",
    active: true,
    generatedCount: 0,
    phases: [],
  };
  if (!isNewSub) normalizeSingleSubscriptionPhases(sub);
  const activePhase = getActiveSubscriptionPhase(sub);
  if (newPhaseMode && !isNewSub) {
    const today = dateKey(new Date());
    sub.startDate = today;
    sub.pausedAt = "";
    if (activePhase) {
      sub.amount = activePhase.amount;
      sub.cycle = activePhase.cycle || "monthly";
      sub.cycleIntervalDays = activePhase.cycleIntervalDays || 0;
    }
    applySubscriptionStartDate(sub, today);
  }
  if (preset && !item) {
    sub.domain = preset.domain || sub.domain;
    sub.color = preset.color || sub.color;
  }
  if (isNewSub) {
    sub.source = "manual";
    if (sub.active === undefined) sub.active = true;
    if (!sub.startDate) sub.startDate = dateKey(new Date());
    applySubscriptionStartDate(sub, sub.startDate);
  } else if (sub.active === undefined) {
    sub.active = isSubscriptionRenewing(sub);
  }
  if (!sub.cycleTime) sub.cycleTime = "12:00";

  const presetMatch = preset || findSubscriptionPreset(sub.name);
  const iconDraft = {
    name: sub.name || "",
    icon: sub.icon || presetMatch?.abbr || "",
    iconUrl: sub.iconUrl || "",
    domain: sub.iconUrl ? "" : (sub.domain || presetMatch?.domain || ""),
    color: sub.color || presetMatch?.color || "",
  };
  Object.assign(iconDraft, seedBillIconFromSubcategory({
    category: sub.category,
    subcategory: sub.subcategory || sub.name,
    name: sub.name,
    title: sub.name,
    icon: iconDraft.icon,
    iconUrl: iconDraft.iconUrl,
  }, plugin.store.data.categories));
  if (iconDraft.iconUrl) iconDraft.icon = iconDraft.icon || subscriptionAbbr(sub.name);
  const state = {
    category: sub.category || defaultCat,
    subcategory: sub.subcategory || "",
    cycle: sub.cycle || "monthly",
  };
  const modalTitle = isNewSub
    ? "新增订阅"
    : (newPhaseMode ? `新阶段 · ${sub.name}` : `编辑 · ${sub.name}`);

  openPlgOverlay({
    title: modalTitle,
    cls: "plg-recurring-overlay plg-subscription-overlay",
    wide: true,
    stack: true,
    tier: 2,
    build: (body, close) => {
      addClasses(body, "plg-modal", "plg-recurring-form");
      const form = body.createDiv({ cls: "plg-recurring-form-inner" });

      let identityEditor;
      let amountInput;
      let catSelect;
      let subField;
      let cycleSelect;
      let intervalInput;
      let intervalRow;
      let hintEl;

      identityEditor = buildSubscriptionIdentityEditor(form, iconDraft, { preset: presetMatch, app, plugin });

      billFormRow(form, "金额", (ctrl) => {
        amountInput = ctrl.createEl("input", { type: "number", attr: { step: "0.01", placeholder: "0.00" } });
        amountInput.value = sub.amount ? String(sub.amount) : "";
      });

      billFormRow(form, "入账分类", (ctrl) => {
        catSelect = ctrl.createEl("select");
      });

      billFormRow(form, "入账二级", (ctrl) => {
        subField = mountBillSubcategoryField(ctrl, {
          value: state.subcategory || sub.subcategory || "",
          categories: plugin.store.data.categories,
          txs: plugin.store.data.transactions || [],
          keep: [sub.subcategory, sub.name, state.subcategory],
          getCategory: () => state.category,
          onChange: (v) => { state.subcategory = v; },
        });
      });

      const cycleRow = billFormRow(form, "周期", (ctrl) => {
        cycleSelect = ctrl.createEl("select");
        fillCycleSelect(cycleSelect, state.cycle);
        cycleSelect.onchange = () => {
          state.cycle = cycleSelect.value;
          if (intervalRow) intervalRow.row.style.display = state.cycle === "custom" ? "" : "none";
          if (hintEl) hintEl.textContent = cycleHintText(state.cycle);
        };
      });

      intervalRow = billFormRow(form, "间隔天数", (ctrl) => {
        intervalInput = ctrl.createEl("input", {
          type: "number",
          attr: { min: "1", step: "1", placeholder: "如 30" },
        });
        intervalInput.value = sub.cycleIntervalDays ? String(sub.cycleIntervalDays) : "";
      });
      intervalRow.row.style.display = state.cycle === "custom" ? "" : "none";

      const statusRow = form.createDiv({ cls: "plg-bill-form-row" });
      statusRow.createSpan({ cls: "plg-bill-form-label", text: "状态" });
      const statusEl = statusRow.createDiv({ cls: "plg-bill-form-control plg-sub-status-text" });

      let startDateField;
      let pausedDateField;

      function updateStatus() {
        const paused = pausedDateField?.getValue() || "";
        statusEl.textContent = paused
          ? `已暂停（${paused} 起不再自动续费）`
          : "续费中 · 将按当前阶段自动生成账单";
        statusEl.classList.toggle("paused", !!paused);
      }

      billFormRow(form, "开始时间", (ctrl) => {
        startDateField = mountDateField(ctrl, {
          value: subscriptionDateValue(sub, "startDate") || billingDateValue(sub),
          onChange: (v) => { if (v) applySubscriptionStartDate(sub, v); },
        });
      });

      billFormRow(form, "暂停时间", (ctrl) => {
        pausedDateField = mountDateField(ctrl, {
          value: subscriptionDateValue(sub, "pausedAt"),
          optional: true,
          onChange: () => updateStatus(),
        });
      });

      hintEl = form.createDiv({
        cls: "plg-muted plg-bill-form-hint",
        text: "入账分类决定账单在总账本中的位置（默认软件续费，可改）。开始时间决定扣费日；暂停时间留空表示续费中。金额/周期变更将自动保存为新阶段。",
      });

      updateStatus();

      const refreshCats = () => {
        const list = plugin.store.data.categories.filter((c) => c.flow !== "income");
        const preferred = sub.category || defaultCat;
        const selected = list.some((c) => c.name === state.category)
          ? state.category
          : (list.some((c) => c.name === preferred) ? preferred : list[0]?.name || "");
        state.category = selected;
        catSelect.textContent = "";
        list.forEach((c) => {
          const opt = document.createElement("option");
          opt.value = c.name;
          opt.textContent = `${c.icon} ${c.name}`;
          catSelect.appendChild(opt);
        });
        catSelect.value = selected;
        subField?.refresh();
      };

      catSelect.onchange = () => {
        state.category = catSelect.value;
        subField?.refresh();
      };

      refreshCats();

      const btnRow = body.createDiv({ cls: "plg-modal-actions" });
      btnRow.createEl("button", { text: "取消", cls: "plg-btn-ghost", attr: { type: "button" } }).onclick = close;
      btnRow.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).onclick = async () => {
        const name = identityEditor.nameInput.value.trim();
        const amount = parseFloat(amountInput.value);
        if (!name) return new Notice("请填写名称");
        if (!amount) return new Notice("请填写金额");
        const startDate = startDateField.getValue();
        if (!startDate) return new Notice("请选择开始时间");
        const pausedAt = pausedDateField.getValue() || "";
        if (state.cycle === "custom" && !(parseInt(intervalInput.value, 10) > 0)) {
          return new Notice("请填写自定义间隔天数");
        }
        const { icon, iconUrl, domain, color } = identityEditor.getIconPayload();
        applySubscriptionStartDate(sub, startDate);
        const formData = {
          amount,
          cycle: cycleSelect.value,
          cycleDay: sub.cycleDay,
          cycleMonth: sub.cycleMonth,
          cycleWeekday: sub.cycleWeekday,
          cycleIntervalDays: cycleSelect.value === "custom" ? parseInt(intervalInput.value, 10) || 0 : 0,
          startDate,
        };
        Object.assign(sub, {
          name,
          icon,
          iconUrl,
          domain,
          color,
          category: state.category,
          subcategory: subField?.getValue() || state.subcategory || name,
          cycle: formData.cycle,
          cycleIntervalDays: formData.cycleIntervalDays,
        });

        if (isNewSub) {
          sub.phases = [{
            id: uid(),
            ...formData,
            endDate: pausedAt,
          }];
          syncSubscriptionFromPhase(sub, sub.phases[0]);
          sub.source = "manual";
          if (!pausedAt) sub.userActivated = true;
        } else if (newPhaseMode || subscriptionPhaseFormChanged(activePhase, formData)) {
          startSubscriptionPhase(sub, formData);
          if (pausedAt) closeSubscriptionPhase(sub, pausedAt);
          sub.userActivated = true;
        } else {
          const phase = getActiveSubscriptionPhase(sub);
          if (phase) {
            Object.assign(phase, formData);
            phase.endDate = pausedAt;
            syncSubscriptionFromPhase(sub, phase);
          }
          if (!pausedAt) sub.userActivated = true;
        }

        sub.nextDate = computeInitialNextDate(sub, new Date());
        await plugin.store.saveSubscription(sub);
        new Notice(newPhaseMode ? "已保存新阶段" : "已保存订阅");
        onSaved?.();
        close();
      };
    },
  });
}

function renderSettingsCategories(container, plugin) {
  const toolbar = container.createDiv({ cls: "plg-cat-toolbar" });
  const flowToggle = toolbar.createDiv({
    cls: "plg-segments plg-seg-capsule plg-seg-capsule-accent plg-cat-flow-toggle",
  });
  let showFlow = "expense";
  const expBtn = flowToggle.createEl("button", { text: "支出", cls: "active" });
  const incBtn = flowToggle.createEl("button", { text: "收入" });
  toolbar.createEl("button", { text: "+ 新增一级", cls: "plg-btn-primary" }).onclick = () => {
    new CategoryEditModal(plugin.app, plugin, null, showFlow === "income" ? "income" : "expense", () => renderList()).open();
  };

  const listEl = container.createDiv({ cls: "plg-settings-cat-list" });
  const expanded = new Set();

  const renderList = () => {
    listEl.empty();
    plugin.store.data.categories
      .filter((c) => (showFlow === "income" ? c.flow === "income" : c.flow !== "income"))
      .forEach((cat) => {
        const block = listEl.createDiv({ cls: "plg-cat-block" + (expanded.has(cat.name) ? " open" : "") });
        const head = block.createDiv({ cls: "plg-settings-cat-row" });
        renderCategoryLabel(head, cat, {
          multiline: true,
          subtitle: (() => {
            const subN = (cat.subcategories || []).length;
            const kw2 = (cat.subcategories || []).reduce(
              (n, s) => n + (normalizeSubcategory(s).keywords?.length || 0),
              0
            );
            return `${subN} 个二级${kw2 ? ` · ${kw2} 个关键词` : ""}`;
          })(),
        });
        head.createEl("button", {
          text: "新增",
          cls: "plg-btn-plain plg-add-sub-btn",
          attr: { type: "button" },
        }).onclick = (e) => {
          e.stopPropagation();
          openSubcategoryEdit(plugin.app, { name: "", icon: "", iconUrl: "", keywords: [] }, async (next) => {
            if ((cat.subcategories || []).some((s) => subcategoryName(s) === next.name)) {
              throw new Error("名称已存在");
            }
            await plugin.store.addSubcategory(cat.name, next);
            expanded.add(cat.name);
            plugin.refreshView();
            renderList();
          }, { isNew: true });
        };
        addSettingsRowActions(head, {
          onEdit: () => new CategoryEditModal(plugin.app, plugin, cat.name, cat.flow, () => renderList()).open(),
          onDelete: () => {
            openDeleteCategoryDialog(plugin.app, plugin, cat, () => {
              expanded.delete(cat.name);
              renderList();
            });
          },
        });

        const toggleExpand = () => {
          if (expanded.has(cat.name)) expanded.delete(cat.name);
          else expanded.add(cat.name);
          renderList();
        };
        head.onclick = (e) => {
          if (e.target.closest(".plg-settings-row-actions, .plg-cat-row-actions, .plg-add-sub-btn")) return;
          toggleExpand();
        };

        if (expanded.has(cat.name)) {
          const body = block.createDiv({ cls: "plg-cat-block-body" });
          const subs = cat.subcategories || [];
          if (subs.length) {
            body.createDiv({ cls: "plg-muted plg-settings-sub-head", text: "二级分类" });
          } else {
            body.createDiv({ cls: "plg-muted plg-settings-sub-head", text: "暂无二级分类，可点「新增」添加" });
          }
          subs.forEach((sub) => {
            const meta = normalizeSubcategory(sub);
            const subRow = body.createDiv({ cls: "plg-settings-sub-row plg-settings-sub-row-clickable" });
            const kwN = (meta.keywords || []).length;
            renderCategoryLabel(subRow, meta, {
              categoryName: cat.name,
              subscriptions: plugin.store.data.subscriptions,
              recurring: plugin.store.data.recurring,
              nameClass: "plg-settings-sub-name",
              subtitle: kwN ? `${kwN} 个关键词` : "",
            });
            addSettingsRowActions(subRow, {
              onEdit: () => {
                expanded.add(cat.name);
                openSubcategoryEdit(plugin.app, meta, async (next, oldName) => {
                  await plugin.store.updateSubcategory(cat.name, oldName, next);
                  expanded.add(cat.name);
                  plugin.refreshView();
                  renderList();
                });
              },
              onDelete: () => {
                openDeleteSubcategoryDialog(plugin.app, plugin, cat.name, meta, () => {
                  expanded.add(cat.name);
                  renderList();
                });
              },
            });
            subRow.onclick = (e) => {
              if (e.target.closest(".plg-settings-row-actions, .plg-cat-row-actions, button")) return;
              openSubcategoryHistory(plugin.app, plugin, cat.name, meta, () => {
                plugin.refreshView();
                renderList();
              });
            };
          });

          const catKwBlock = body.createDiv({ cls: "plg-cat-kw-block" });
          catKwBlock.createDiv({ cls: "plg-muted plg-cat-kw-label", text: "一级分类关键词" });
          const catKwInput = catKwBlock.createEl("input", {
            type: "text",
            cls: "plg-cat-kw-input",
            attr: { placeholder: "多个关键词用逗号分隔" },
          });
          catKwInput.value = formatKeywordInput(cat.keywords || []);
          catKwInput.onchange = async () => {
            try {
              await plugin.store.updateCategory(cat.name, { keywords: parseKeywordInput(catKwInput.value) });
              plugin.refreshView();
            } catch (e) {
              new Notice(e.message || "保存失败");
            }
          };
        }
      });
  };

  expBtn.onclick = () => { showFlow = "expense"; expBtn.addClass("active"); incBtn.removeClass("active"); renderList(); };
  incBtn.onclick = () => { showFlow = "income"; incBtn.addClass("active"); expBtn.removeClass("active"); renderList(); };
  renderList();
}

class PlgSettingsModal {
  constructor(app, plugin, onRefresh) {
    this.app = app;
    this.plugin = plugin;
    this.onRefresh = onRefresh;
  }
  open() {
    openPlgSettings(this.app, this.plugin, this.onRefresh);
  }
}

function openPlgSettings(app, plugin, onRefresh, focusOpts = null) {
  if (focusOpts) {
    plugin._settingsFocus = focusOpts;
    plugin.pendingSettingsTab = resolvePlgSettingsTabFromFocus(focusOpts);
  }
  plugin.openPluginSettings();
  onRefresh?.();
}

function renderPendingDuesPanel(parent, plugin, opts = {}) {
  const dues = collectPendingDues(plugin.store.data);
  if (!dues.length) {
    if (!opts.showEmpty) return null;
    parent.createDiv({
      cls: "plg-empty plg-pending-dues-empty",
      text: "本月暂无待入账项",
    });
    return parent;
  }
  const total = dues.reduce((s, d) => s + d.amount, 0);
  const overdueN = dues.filter((d) => d.overdue).length;
  const limit = opts.limit || 5;
  const collapsible = !!opts.collapsible;
  const expanded = collapsible
    ? !!plugin.settings.uiState?.pendingDuesExpanded
    : true;
  const card = parent.createDiv({
    cls: "plg-pending-dues-card"
      + (opts.compact ? " compact" : "")
      + (opts.variant === "mobile-budget" ? " mobile-budget-slot" : "")
      + (collapsible ? " collapsible" : "")
      + (expanded ? " open" : ""),
  });
  const head = card.createDiv({
    cls: "plg-pending-dues-head" + (collapsible ? " clickable" : ""),
  });
  if (collapsible) {
    head.setAttr("role", "button");
    head.setAttr("tabindex", "0");
    head.setAttr("aria-expanded", expanded ? "true" : "false");
  }
  const titleRow = head.createDiv({ cls: "plg-pending-dues-title-row" });
  titleRow.createSpan({
    cls: "plg-pending-dues-title",
    text: overdueN
      ? `本月待入账 ${dues.length} 笔 · ${overdueN} 笔已到期`
      : `本月待入账 ${dues.length} 笔`,
  });
  head.createDiv({ cls: "plg-pending-dues-total", text: fmtMoney(total) });
  const toggle = () => {
    if (!collapsible) return;
    plugin.settings.uiState = plugin.settings.uiState || {};
    const next = !expanded;
    plugin.settings.uiState.pendingDuesExpanded = next;
    if (!next) plugin.settings.uiState.pendingDuesShowAll = false;
    plugin.saveSettings();
    opts.onRefresh?.();
  };
  if (collapsible) {
    head.addEventListener("click", toggle);
    head.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  }
  const list = (opts.variant === "mobile-budget" && opts.listHost)
    ? opts.listHost.createDiv({ cls: "plg-pending-dues-list" + (collapsible && !expanded ? " hidden" : "") })
    : card.createDiv({ cls: "plg-pending-dues-list" + (collapsible && !expanded ? " hidden" : "") });
  dues.slice(0, limit).forEach((d) => {
    const row = list.createDiv({ cls: "plg-pending-dues-row" + (d.overdue ? " overdue" : "") });
    const top = row.createDiv({ cls: "plg-pending-dues-row-top" });
    top.createDiv({
      cls: "plg-pending-dues-name",
      text: d.title,
      attr: { title: d.title },
    });
    top.createDiv({ cls: "plg-pending-dues-amt", text: fmtMoney(d.amount) });
    const metaParts = [`${d.date.slice(5).replace("-", "/")} · ${d.subcategory || d.category}`];
    if (d.overdue) metaParts.push("已到期");
    const bottom = row.createDiv({ cls: "plg-pending-dues-row-bottom" });
    bottom.createDiv({
      cls: "plg-pending-dues-meta",
      text: metaParts.join(" · "),
    });
    const actions = bottom.createDiv({ cls: "plg-pending-dues-actions" });
    actions.createEl("button", {
      text: "入账",
      cls: "plg-btn-primary plg-pending-dues-record",
      attr: { type: "button" },
    }).onclick = async (e) => {
      e.stopPropagation();
      const ok = await plugin.store.recordPendingDue(d.kind, d.id);
      if (ok) {
        new Notice(`已入账：${d.title}`);
        plugin.refreshView();
        opts.onRefresh?.();
      } else {
        new Notice("入账失败或已存在相同账单");
      }
    };
    actions.createEl("button", {
      text: "详情",
      cls: "plg-btn-ghost plg-pending-dues-detail",
      attr: { type: "button" },
    }).onclick = (e) => {
      e.stopPropagation();
      plugin.openDashboardSettings({
        section: d.kind === "recurring" ? "recurring" : "subscription",
        id: d.id,
      });
    };
  });
  if (dues.length > limit) {
    const moreHost = (opts.variant === "mobile-budget" && opts.listHost) ? opts.listHost : card;
    const more = moreHost.createDiv({
      cls: "plg-pending-dues-more plg-pending-dues-more-link",
      text: `还有 ${dues.length - limit} 笔，查看全部 →`,
    });
    more.onclick = () => {
      plugin.settings.uiState = plugin.settings.uiState || {};
      plugin.settings.uiState.pendingDuesExpanded = true;
      plugin.settings.uiState.pendingDuesShowAll = true;
      plugin.saveSettings();
      plugin.refreshView?.();
      opts.onRefresh?.();
    };
  }
  if (opts.variant === "mobile-budget" && opts.listHost) {
    opts.listHost.toggleClass("has-items", expanded);
  }
  return card;
}

function renderGlobalKeywords(container, plugin, onRefresh) {
  if (!plugin.settings.categoryKeywords) plugin.settings.categoryKeywords = {};
  // 折叠块标题已有说明，这里只留一行短例，避免三段文案叠在一起。
  container.createDiv({
    cls: "plg-muted plg-global-kw-hint",
    text: "例：关键词「瑞幸」→ 餐饮·咖啡。记账时也会自动学习。",
  });
  const listEl = container.createDiv({ cls: "plg-global-kw-list" });

  const renderList = () => {
    listEl.empty();
    const entries = Object.entries(plugin.settings.categoryKeywords || {}).sort((a, b) => a[0].localeCompare(b[0], "zh"));
    if (!entries.length) {
      listEl.createDiv({ cls: "plg-empty", text: "暂无全局关键词" });
      return;
    }
    entries.forEach(([kw, meta]) => {
      const row = listEl.createDiv({ cls: "plg-global-kw-row" });
      row.createDiv({ cls: "plg-global-kw-kw", text: kw });
      const catLabel = meta?.subcategory
        ? `${meta.category || "—"} · ${meta.subcategory}`
        : (meta?.category || "—");
      row.createDiv({ cls: "plg-global-kw-cat", text: catLabel });
      row.createEl("button", {
        text: "删除",
        cls: "plg-btn-ghost plg-global-kw-del",
        attr: { type: "button" },
      }).onclick = async () => {
        delete plugin.settings.categoryKeywords[kw];
        await plugin.saveSettings();
        renderList();
        onRefresh?.();
      };
    });
  };

  const addBox = container.createDiv({ cls: "plg-global-kw-add" });
  const row = addBox.createDiv({ cls: "plg-global-kw-add-row plg-global-kw-add-row-grid" });
  const kwInput = row.createEl("input", {
    type: "text",
    cls: "plg-global-kw-input",
    attr: { placeholder: "关键词，如瑞幸" },
  });
  const catSel = row.createEl("select", { cls: "plg-global-kw-cat-select" });
  catSel.createEl("option", { value: "", text: "选择分类" });
  const subSel = row.createEl("select", { cls: "plg-global-kw-sub-select" });
  subSel.createEl("option", { value: "", text: "二级（可选）" });
  const addBtn = row.createEl("button", {
    text: "添加",
    cls: "plg-btn-primary plg-global-kw-add-btn",
    attr: { type: "button" },
  });

  const refreshSubOptions = () => {
    while (subSel.options.length > 1) subSel.remove(1);
    const cat = plugin.store.data.categories.find((c) => c.name === catSel.value);
    (cat?.subcategories || []).forEach((sub) => {
      const name = subcategoryName(sub);
      subSel.createEl("option", { value: name, text: name });
    });
  };

  plugin.store.data.categories.forEach((cat) => {
    catSel.createEl("option", { value: cat.name, text: cat.name });
  });
  catSel.onchange = () => refreshSubOptions();

  addBtn.onclick = async () => {
    const kw = kwInput.value.trim();
    const category = catSel.value;
    if (!kw) return new Notice("请输入关键词");
    if (!category) return new Notice("请选择分类");
    if (!plugin.settings.categoryKeywords) plugin.settings.categoryKeywords = {};
    const cat = plugin.store.data.categories.find((c) => c.name === category);
    plugin.settings.categoryKeywords[kw] = {
      category,
      subcategory: subSel.value || "",
      flow: cat?.flow || "expense",
    };
    await plugin.saveSettings();
    kwInput.value = "";
    subSel.value = "";
    renderList();
    onRefresh?.();
    new Notice("已添加关键词");
  };

  renderList();
}

async function confirmDataFolderChange(app, plugin, nextFolder) {
  const oldFolder = normalizePath(plugin.settings.dataFolder);
  const target = normalizePath(nextFolder || DEFAULT_SETTINGS.dataFolder);
  if (target === oldFolder) return "same";
  const oldFile = normalizePath(`${oldFolder}/ledger.json`);
  const adapter = app.vault.adapter;
  const hasOld = await adapter.exists(oldFile);
  if (!hasOld) return "switch";

  return new Promise((resolve) => {
    openPlgOverlay({
      title: "更改数据目录",
      stack: true,
      build: (body, close) => {
        addClasses(body, "plg-modal");
        body.createEl("p", {
          cls: "plg-muted",
          text: `当前目录 ${oldFolder} 已有 ledger.json。请选择如何处理：`,
        });
        const actions = body.createDiv({ cls: "plg-modal-actions plg-modal-actions-stack" });
        actions.createEl("button", {
          text: "迁移数据到新目录",
          cls: "mod-cta",
          attr: { type: "button" },
        }).onclick = async () => {
          try {
            const raw = await adapter.read(oldFile);
            plugin.settings.dataFolder = target;
            await plugin.saveSettings();
            await plugin.store.load();
            await adapter.write(plugin.store.filePath(), raw);
            await plugin.store.load();
            new Notice("已迁移数据到新目录");
            resolve("migrate");
            close();
          } catch (err) {
            new Notice("迁移失败：" + (err.message || String(err)));
          }
        };
        actions.createEl("button", {
          text: "仅切换路径（需自行复制文件）",
          attr: { type: "button" },
        }).onclick = async () => {
          plugin.settings.dataFolder = target;
          await plugin.saveSettings();
          await plugin.store.load();
          new Notice("已切换路径；若新目录无 ledger.json 将显示空账本");
          resolve("switch");
          close();
        };
        actions.createEl("button", { text: "取消", attr: { type: "button" } }).onclick = () => {
          resolve("cancel");
          close();
        };
      },
    });
  });
}

function openOnboardingOverlay(app, plugin, onDone) {
  openPlgOverlay({
    title: "欢迎使用 PlainLedger",
    cls: "plg-onboarding-overlay",
    build: (body, close) => {
      addClasses(body, "plg-modal", "plg-onboarding-modal");
      body.createEl("p", {
        cls: "plg-muted",
        text: "数据保存在库内 JSON，可随 Obsidian 库同步。默认开启月结：每月 1 日将当年累计净收支结转至当月（可在设置关闭）。请选择如何开始：",
      });
      const grid = body.createDiv({ cls: "plg-onboarding-grid" });
      const finish = async (choice) => {
        plugin.settings.onboardingChoice = choice;
        plugin.settings.onboardingComplete = true;
        plugin.settings.initialized = true;
        await plugin.saveSettings();
        if (choice === "sample") {
          await plugin.store.importBundledDefault(true);
          new Notice(`已加载示例数据 ${plugin.store.data.transactions.length} 笔`);
        } else if (choice === "blank") {
          plugin.store.data = {
            version: 1,
            ledger: "默认账本",
            categories: [],
            transactions: [],
            recurring: [],
            subscriptions: [],
          };
          await plugin.store.save();
          new Notice("已创建空白账本");
        }
        close();
        onDone?.();
      };

      const mkCard = (title, desc, choice, primary = false) => {
        const card = grid.createDiv({ cls: "plg-onboarding-card" + (primary ? " primary" : "") });
        card.createEl("h3", { text: title });
        card.createEl("p", { text: desc, cls: "plg-muted" });
        card.createEl("button", {
          text: "选择",
          cls: primary ? "mod-cta" : "",
          attr: { type: "button" },
        }).onclick = async () => {
          if (choice === "import") {
            close();
            openImportLedgerOverlay(app, plugin, () => onDone?.(), {
              onSuccess: async () => {
                plugin.settings.onboardingChoice = "import";
                plugin.settings.onboardingComplete = true;
                plugin.settings.initialized = true;
                await plugin.saveSettings();
              },
            });
            return;
          }
          await finish(choice);
        };
      };

      mkCard("使用示例数据", bundledSampleHint() + "，适合快速体验", "sample", true);
      mkCard("导入 Excel / JSON", "PlainLedger Excel 或 JSON；Excel 默认合并流水", "import");
      mkCard("空白开始", "从零记账；启用月结后每月 1 日自动结转累计结余", "blank");
    },
  });
}

function addSettingsTierHeader(container, title, desc) {
  const tier = container.createDiv({ cls: "plg-settings-tier" });
  tier.createEl("h3", { cls: "plg-settings-tier-title", text: title });
  if (desc) tier.createEl("p", { cls: "plg-muted plg-settings-tier-desc", text: desc });
  return tier;
}

function formatSettingsFootStats(plugin) {
  const tx = plugin.store.data.transactions?.length || 0;
  const cats = plugin.store.data.categories?.length || 0;
  const subs = (plugin.store.data.categories || []).reduce((n, c) => n + (c.subcategories?.length || 0), 0);
  const ver = typeof PLUGIN_VERSION !== "undefined" ? PLUGIN_VERSION : "";
  const isPublic = typeof PLUGIN_EDITION === "string" && (PLUGIN_EDITION === "public" || PLUGIN_EDITION === "trial24h");
  if (isPublic && tx <= 10) {
    return `${tx} 笔示意 · ${cats} 类 · ${subs} 二级 · v${ver}`;
  }
  return `${tx} 笔 · ${cats} 类 · ${subs} 二级 · v${ver}`;
}

function addSettingsGroupHeader(container, title, desc) {
  if (title) container.createEl("h4", { cls: "plg-settings-group-title", text: title });
  if (desc) container.createDiv({ cls: "plg-muted plg-settings-group-desc", text: desc });
}

function addCollapsibleSettingsSection(container, plugin, sectionId, title, desc, buildBody, focusOpts, onRefresh) {
  const section = container.createDiv({
    cls: "plg-settings-section plg-settings-section-collapsible",
  });
  section.setAttr("data-settings-section", sectionId);
  const focusOpen = focusOpts?.section === sectionId;
  let expanded = focusOpen || !!plugin.settings.uiState?.settingsSections?.[sectionId];
  if (!expanded && sectionId === "categories" && typeof PLUGIN_EDITION === "string" && PLUGIN_EDITION === "public") {
    expanded = true;
  }
  if (expanded) section.addClass("open");

  const head = section.createDiv({ cls: "plg-settings-section-head clickable" });
  head.setAttr("role", "button");
  head.setAttr("tabindex", "0");
  head.setAttr("aria-expanded", expanded ? "true" : "false");
  const titleRow = head.createDiv({ cls: "plg-settings-section-title-row" });
  titleRow.createEl("h3", { text: title });
  if (desc) head.createEl("p", { text: desc, cls: "plg-muted" });

  const body = section.createDiv({
    cls: "plg-settings-section-body" + (expanded ? "" : " hidden"),
  });
  buildBody(body);

  const sync = (open) => {
    expanded = open;
    section.toggleClass("open", open);
    body.toggleClass("hidden", !open);
    head.setAttr("aria-expanded", open ? "true" : "false");
  };

  const toggle = () => {
    sync(!expanded);
    plugin.settings.uiState = plugin.settings.uiState || {};
    plugin.settings.uiState.settingsSections = plugin.settings.uiState.settingsSections || {};
    plugin.settings.uiState.settingsSections[sectionId] = expanded;
    plugin.saveSettings();
  };
  head.addEventListener("click", toggle);
  head.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  });

  return section;
}

function addSettingsSection(container, title, desc, buildBody, attrs = null) {
  const section = container.createDiv({ cls: "plg-settings-section" });
  if (attrs) Object.entries(attrs).forEach(([k, v]) => section.setAttr(k, v));
  const head = section.createDiv({ cls: "plg-settings-section-head" });
  head.createEl("h3", { text: title });
  if (desc) head.createEl("p", { text: desc, cls: "plg-muted" });
  const body = section.createDiv({ cls: "plg-settings-section-body" });
  buildBody(body);
  return section;
}

async function openPlgLedgerFile(plugin) {
  const fp = plugin.store.filePath();
  const file = plugin.app.vault.getAbstractFileByPath(fp);
  if (file) {
    await plugin.app.workspace.getLeaf().openFile(file);
    return;
  }
  new Notice(`账本文件：${fp}`);
}

async function openPlgPluginDataFile(plugin) {
  const path = normalizePath(`.obsidian/plugins/${plugin.manifest.id}/data.json`);
  const file = plugin.app.vault.getAbstractFileByPath(path);
  if (file) {
    await plugin.app.workspace.getLeaf().openFile(file);
    return;
  }
  new Notice(`设置文件：${path}`);
}

function renderPlgLicensePanel(panel, plugin, onRefresh) {
  let trialHint = "";
  if (typeof isTrialEdition === "function" && isTrialEdition() && !plugin.settings.licenseActivated) {
    if (isTrialActive(plugin.app, plugin.settings)) {
      trialHint = `试用中 · 剩余 ${formatTrialRemaining(getTrialRemainingMs(plugin.app, plugin.settings))}`;
    } else if (!plugin.settings.trialWelcomeSeen) {
      trialHint = `可在侧边栏点击「开启 ${getTrialHoursLabel()} 试用」`;
    }
  }
  renderLifeOsLicenseSettingsPanel(panel, {
    desc: "本安装包需激活后使用全部功能。",
    trialHint,
    getFingerprint: () => getVaultFingerprint(plugin.app),
    licenseKey: plugin.settings.licenseKey || "",
    activated: plugin.settings.licenseActivated,
    onCopyFingerprint: async (fp) => {
      const ok = await copyTextToClipboard(fp);
      new Notice(ok ? "设备指纹已复制" : "请手动全选复制指纹");
    },
    onActivate: async (key) => {
      const wasActivated = plugin.settings.licenseActivated;
      if (!key) {
        new Notice("请输入激活码");
        return;
      }
      plugin.settings.licenseKey = key;
      syncLicenseState(plugin.app, plugin.settings);
      if (plugin.settings.licenseActivated) {
        new Notice("激活成功，之后将永久有效");
      } else {
        new Notice("激活码无效，请核对后再试");
        await plugin.saveSettings();
        onRefresh?.();
        return;
      }
      await plugin.saveSettings();
      if (!wasActivated) await plugin.onLicenseActivated();
      else plugin.refreshView(true);
      onRefresh?.();
    },
  });
}

function renderPlgCommonPanel(panel, plugin, onRefresh) {
  const grid = panel.createDiv({ cls: "plg-settings-grid" });
  const budgetCard = createPlgSettingsBlock(
    grid,
    "基础与预算",
    "本月预算与月结结转；数据目录在「数据」页管理。"
  );
  new Setting(budgetCard)
    .setName("本月预算")
    .addText((t) => {
      t.setValue(String(plugin.settings.monthlyBudget || ""));
      t.onChange(async (v) => {
        plugin.settings.monthlyBudget = parseFloat(v) || 0;
        await plugin.saveSettings();
        plugin.refreshView?.();
      });
    });
  new Setting(budgetCard)
    .setName("月结结转")
    .addToggle((tg) => tg.setValue(plugin.settings.carryoverEnabled !== false).onChange(async (v) => {
      plugin.settings.carryoverEnabled = v;
      await plugin.saveSettings();
      await plugin.store.processCarryovers();
      plugin.refreshView?.();
    }));
  budgetCard.createEl("p", {
    cls: "plg-settings-section-hint",
    text: "每年 1 月重置；每月 1 日将当年 1 月至上月累计净收支结转至当月。预算与图表不计结转。0 预算表示不启用提醒。",
  });

  const noteCard = createPlgSettingsBlock(
    grid,
    "日记联动",
    "记账后追加一行到当日 Markdown 笔记。"
  );
  new Setting(noteCard)
    .setName("写入日记")
    .addToggle((tg) => tg.setValue(!!plugin.settings.dailyNoteOnSave).onChange(async (v) => {
      plugin.settings.dailyNoteOnSave = v;
      await plugin.saveSettings();
    }));
  new Setting(noteCard)
    .setName("日记目录")
    .addText((t) => {
      t.setValue(plugin.settings.dailyNoteFolder || "Daily Notes");
      t.onChange(async (v) => {
        plugin.settings.dailyNoteFolder = v.trim() || "Daily Notes";
        await plugin.saveSettings();
      });
    });
}

function renderPlgCategoriesPanel(panel, plugin, focusOpts) {
  const grid = panel.createDiv({ cls: "plg-settings-grid" });
  const card = createPlgSettingsBlock(
    grid,
    "分类管理",
    "一级 / 二级分类、图标与关键词。"
  );
  card.addClass("plg-settings-rich-block");
  card.setAttr("data-settings-section", "categories");
  renderSettingsCategories(card, plugin);
  if (focusOpts?.section === "categories") {
    requestAnimationFrame(() => {
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

function renderPlgRulesPanel(panel, plugin, onRefresh, focusOpts) {
  const grid = panel.createDiv({ cls: "plg-settings-grid plg-rules-grid" });
  const focusSection = focusOpts?.section || "";

  const pending = createPlgCollapsibleBlock(
    grid,
    plugin,
    "pendingDues",
    "待入账",
    "订阅与周期待付项；首页也可快捷入账。",
    (body) => {
      body.addClass("plg-settings-rich-block");
      renderPendingDuesPanel(body, plugin, {
        limit: 20,
        collapsible: false,
        compact: true,
        showEmpty: true,
        onRefresh,
      });
    },
    { forceOpen: focusSection === "pendingDues" },
  );
  pending.addClass("plg-rules-section");

  const subscription = createPlgCollapsibleBlock(
    grid,
    plugin,
    "subscription",
    "订阅服务",
    "续费周期、支出统计与服务列表。",
    (body) => {
      body.addClass("plg-settings-rich-block");
      renderSettingsSubscriptions(body, plugin, focusOpts);
    },
    { forceOpen: focusSection === "subscription" },
  );
  subscription.addClass("plg-rules-section");

  const recurring = createPlgCollapsibleBlock(
    grid,
    plugin,
    "recurring",
    "周期 / 分期",
    "固定周期自动记账规则。",
    (body) => {
      body.addClass("plg-settings-rich-block");
      renderSettingsRecurring(body, plugin, focusOpts);
    },
    { forceOpen: focusSection === "recurring" },
  );
  recurring.addClass("plg-rules-section");

  const keywords = createPlgCollapsibleBlock(
    grid,
    plugin,
    "globalKeywords",
    "全局关键词",
    "跨分类统一映射商户词，优先于分类内关键词。",
    (body) => {
      body.addClass("plg-settings-rich-block");
      renderGlobalKeywords(body, plugin, onRefresh);
    },
    { forceOpen: focusSection === "globalKeywords" },
  );
  keywords.addClass("plg-rules-section");

  if (focusSection) {
    requestAnimationFrame(() => {
      panel.querySelector(`[data-settings-section="${focusSection}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

function renderPlgDataPanel(panel, plugin, onRefresh) {
  const grid = panel.createDiv({ cls: "plg-settings-grid" });

  createPlgCollapsibleBlock(
    grid,
    plugin,
    "dataImportExport",
    "数据管理",
    "导入与导出备份；建议定期导出 JSON。",
    (body) => {
      new Setting(body)
        .setName("导入账单")
        .setClass("plg-settings-action-row")
        .addButton((b) => b.setButtonText("选择文件").onClick(() => {
          openImportLedgerOverlay(plugin.app, plugin, () => {
            plugin.refreshView();
            onRefresh?.();
          });
        }));
      if (plugin.settings.lastImportFile) {
        body.createEl("p", {
          cls: "plg-settings-section-hint",
          text: `上次导入：${plugin.settings.lastImportFile}`,
        });
      }
      new Setting(body)
        .setName("导出 JSON")
        .setClass("plg-settings-action-row")
        .addButton((b) => b.setButtonText("导出").onClick(() => exportLedgerJson(plugin)));
      new Setting(body)
        .setName("导出 CSV")
        .setClass("plg-settings-action-row")
        .addButton((b) => b.setButtonText("导出").onClick(() => exportLedgerMumuCsv(plugin)));
    },
  );

  createPlgCollapsibleBlock(
    grid,
    plugin,
    "dataFolder",
    "数据目录",
    "账单 JSON 与导出文件存放位置；更改时会提示迁移或仅切换。",
    (body) => {
      let folderInput;
      new Setting(body)
        .setName("目录路径")
        .addText((t) => {
          folderInput = t;
          t.setValue(plugin.settings.dataFolder);
          t.onChange(async (v) => {
            const next = v || DEFAULT_SETTINGS.dataFolder;
            const action = await confirmDataFolderChange(plugin.app, plugin, next);
            if (action === "cancel" || action === "same") {
              folderInput.setValue(plugin.settings.dataFolder);
              return;
            }
            if (action === "migrate" || action === "switch") {
              folderInput.setValue(plugin.settings.dataFolder);
              onRefresh?.();
              plugin.refreshView?.();
            }
          });
        });
    },
  );

  createPlgCollapsibleBlock(
    grid,
    plugin,
    "dataFiles",
    "数据文件",
    "插件设置与账本 JSON 路径（随库 / iCloud 同步）。",
    (body) => {
      const ledgerPath = plugin.store.filePath();
      const settingsPath = normalizePath(`.obsidian/plugins/${plugin.manifest.id}/data.json`);
      new Setting(body)
        .setName("ledger.json")
        .setClass("plg-settings-action-row")
        .addButton((b) => b.setButtonText("打开").onClick(() => void openPlgLedgerFile(plugin)));
      body.createEl("p", {
        cls: "plg-settings-section-hint",
        text: `全部账单、分类、订阅与周期规则。\n${ledgerPath}`,
      });
      new Setting(body)
        .setName("data.json")
        .setClass("plg-settings-action-row")
        .addButton((b) => b.setButtonText("打开").onClick(() => void openPlgPluginDataFile(plugin)));
      body.createEl("p", {
        cls: "plg-settings-section-hint",
        text: `预算、数据目录、激活状态等插件设置。\n${settingsPath}`,
      });
    },
  );

  if (typeof PLUGIN_EDITION === "string" && PLUGIN_EDITION === "public") {
    createPlgCollapsibleBlock(
      grid,
      plugin,
      "dataDanger",
      "危险操作",
      "不可逆，请先导出 JSON 备份。",
      (body) => {
        body.addClass("plg-settings-danger-block");
        new Setting(body)
          .setName("恢复样例")
          .addButton((b) => {
            b.setButtonText("恢复");
            b.setClass("mod-warning");
            b.onClick(() => {
              confirmPlgAction({
                title: "恢复内置样例",
                message: `${bundledSampleHint()}。将覆盖当前 ${plugin.store.data.transactions.length} 笔账单与订阅/周期，分类树完整保留。`,
                danger: true,
                confirmText: "确认恢复",
                onConfirm: async () => {
                  await plugin.store.importBundledDefault(true);
                  const cats = plugin.store.data.categories?.length || 0;
                  const subs = (plugin.store.data.categories || []).reduce((n, c) => n + (c.subcategories?.length || 0), 0);
                  new Notice(`已恢复 ${plugin.store.data.transactions.length} 笔示意账单 · ${cats} 类 · ${subs} 二级`);
                  plugin.refreshView();
                  onRefresh?.();
                },
              });
            });
          });
        body.createEl("p", { cls: "plg-settings-section-hint", text: bundledSampleHint() });
      },
      { defaultExpanded: false },
    );
  }

  const foot = panel.createDiv({ cls: "plg-settings-foot" });
  const isPublic = typeof PLUGIN_EDITION === "string" && (PLUGIN_EDITION === "public" || PLUGIN_EDITION === "trial24h");
  foot.createEl("p", { text: formatSettingsFootStats(plugin) });
  if (isPublic) {
    foot.createEl("p", { text: "公版为示意数据；完整个人账单请使用个人版或独立库。" });
  }
}

function renderPluginSettings(container, plugin, onRefresh, focusOpts = null) {
  container.empty();
  container.removeClass("plg-settings-panel");
  injectPlgSettingsCompactStyles();

  const isMobile = plugin.app.isMobile || Platform.isMobileApp;
  container.addClass("plg-settings-compact");
  container.toggleClass("plg-settings-mobile", isMobile);
  applyPlgMobileSettingsLayout(container, plugin.app);

  if (!isMobile) {
    container.createEl("h2", {
      cls: "plg-settings-page-title",
      text: typeof formatPluginSettingsTitle === "function"
        ? formatPluginSettingsTitle("PlainLedger 配置", getPlgEditionLabel())
        : `PlainLedger 配置 · ${getPlgEditionLabel()}`,
    });
  }
  container.createEl("p", {
    cls: "plg-settings-intro",
    text: typeof PLUGIN_PHILOSOPHY_SUBTITLE !== "undefined"
      ? PLUGIN_PHILOSOPHY_SUBTITLE
      : "记账不必离开笔记——PlainLedger 把账单保存在 Obsidian 库内，随 iCloud / Git 同步。",
  });

  const licenseRequired = typeof isLicenseRequired === "function" && isLicenseRequired();
  const locked = licenseRequired && !isPluginLicensed(plugin.app, plugin.settings);
  const tabDefs = [];
  if (licenseRequired) tabDefs.push({ id: "license", label: "授权" });
  if (!locked) {
    tabDefs.push(
      { id: "common", label: "常用" },
      { id: "appearance", label: "外观" },
      { id: "categories", label: "分类" },
      { id: "rules", label: "规则" },
    );
  }
  tabDefs.push({ id: "data", label: "数据" });
  tabDefs.push({ id: "shortcuts", label: "快捷指令" });
  tabDefs.push({ id: "about", label: "关于" });

  const pendingTab = plugin.pendingSettingsTab || resolvePlgSettingsTabFromFocus(focusOpts);
  plugin.pendingSettingsTab = null;
  const { panels } = buildPlgSettingsTabs(container, plugin, tabDefs, pendingTab);

  if (licenseRequired) renderPlgLicensePanel(panels.license, plugin, () => renderPluginSettings(container, plugin, onRefresh, focusOpts));
  if (!locked) {
    renderPlgCommonPanel(panels.common, plugin, onRefresh);
    renderPlgNavAppearancePanel(panels.appearance, plugin, focusOpts);
    renderPlgCategoriesPanel(panels.categories, plugin, focusOpts);
    renderPlgRulesPanel(panels.rules, plugin, onRefresh, focusOpts);
  }
  renderPlgDataPanel(panels.data, plugin, onRefresh);
  renderPlainLedgerShortcutsSettingsPanel(panels.shortcuts, plugin);
  renderLifeOsAboutPanel(panels.about, plugin, {
    openUsageGuide: () => openUsageGuideInNewTab(plugin.app, plugin.settings, () => plugin.saveSettings()),
  });
}

/** @deprecated use renderPluginSettings */
function renderBasicPluginSettings(container, plugin, onRefresh) {
  renderPluginSettings(container, plugin, onRefresh);
}

/** @deprecated use renderPluginSettings */
function renderDashboardSettings(container, plugin, onRefresh, focusOpts = null) {
  renderPluginSettings(container, plugin, onRefresh, focusOpts);
}

function recurringTxFilter(txs, items) {
  return attributeRecurringTxs(txs, items).map((x) => x.tx);
}

/** 将账单归属到具体周期规则（优先 linkedRecurringId，否则选匹配度最高的一条） */
function attributeRecurringTxs(txs, items) {
  const rules = items || [];
  const expenses = (txs || []).filter((t) => t.flow === "expense");
  const out = [];

  for (const t of expenses) {
    const tid = t.id || `${t.datetime}\0${t.amount}\0${t.note}\0${t.subcategory}`;
    const lid = String(t.linkedRecurringId || "").trim();
    if (lid) {
      const item = rules.find((r) => r.id === lid);
      if (item) {
        out.push({
          tx: t,
          ruleTitle: item.title || "周期",
          ruleId: item.id,
          category: item.category || t.category || "",
          subcategory: item.subcategory || t.subcategory || "",
        });
        continue;
      }
    }

    let best = null;
    for (const item of rules) {
      if (txIsAutoRecurringBill(item, t)) {
        const pick = {
          score: 900,
          ruleTitle: item.title || "周期",
          ruleId: item.id,
          category: item.category || t.category || "",
          subcategory: item.subcategory || t.subcategory || "",
        };
        if (!best || pick.score > best.score) best = pick;
        continue;
      }
      if (!recurringTxMatchesExact(item, t)) continue;

      let score = 10;
      const note = (t.note || "").trim();
      const title = (item.title || "").trim();
      const ruleNote = (item.note || "").trim();
      if (note === title || note === ruleNote) score = 100;
      else if (ruleNote && note.includes(ruleNote)) score = 85;
      else if (title && note.includes(title)) score = 70;
      else if ((t.subcategory || "").trim() === (item.subcategory || "").trim()) score = 40;

      const pick = {
        score,
        ruleTitle: item.title || "周期",
        ruleId: item.id,
        category: item.category || t.category || "",
        subcategory: item.subcategory || t.subcategory || "",
      };
      if (!best || pick.score > best.score) best = pick;
    }

    if (best) {
      out.push({
        tx: t,
        ruleTitle: best.ruleTitle,
        ruleId: best.ruleId,
        category: best.category,
        subcategory: best.subcategory,
      });
    }
  }

  return out;
}

/** 周期支出弹层：按入账二级汇总（同一二级下多条规则合并） */
function recurringExpenseBreakdown(attributed, predicate) {
  const filtered = (attributed || []).filter(({ tx }) => predicate(tx));
  const total = filtered.reduce((s, { tx }) => s + tx.amount, 0);
  const map = new Map();
  filtered.forEach(({ tx, category, subcategory }) => {
    const cat = (category || tx.category || "").trim();
    const sub = (subcategory || tx.subcategory || "").trim() || "（无二级）";
    const key = `${cat}\0${sub}`;
    map.set(key, (map.get(key) || 0) + tx.amount);
  });
  const items = [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([key, amt]) => {
      const [cat, sub] = key.split("\0");
      const name = cat ? `${cat}·${sub}` : sub;
      return {
        name,
        amt,
        pct: total > 0 ? Math.round((amt / total) * 1000) / 10 : 0,
      };
    });
  return { total, items };
}

function recurringCardSubMeta(item) {
  const sub = (item.subcategory || "").trim() || "（无二级）";
  return `${sub} · ${fmtMoney(item.amount)} · ${formatRecurringLabel(item)}`;
}

function subscriptionCardSubMeta(item) {
  const sub = (item.subcategory || "").trim() || item.name || "（无二级）";
  return `${sub} · ${fmtMoney(item.amount)} · ${formatRecurringLabel(item)}`;
}

function renderSettingsRecurring(container, plugin, focusOpts = null) {
  const headRow = container.createDiv({ cls: "plg-sub-head-row" });
  const searchInput = headRow.createEl("input", {
    type: "search",
    cls: "plg-sub-search-input",
    attr: { placeholder: "搜索周期名称" },
  });
  headRow.createEl("button", {
    text: "+ 新增周期",
    cls: "plg-btn-primary",
    attr: { type: "button" },
  }).onclick = () => {
    openRecurringBill(plugin.app, plugin, null, () => {
      plugin.refreshView();
      renderAll();
    });
  };

  const searchResults = container.createDiv({ cls: "plg-sub-search-results" });
  searchResults.style.display = "none";

  const overview = container.createDiv({ cls: "plg-sub-overview" });
  const listEl = container.createDiv({ cls: "plg-sub-list plg-recurring-list", attr: { id: "plg-rec-list-anchor" } });

  const renderSearch = () => {
    const q = searchInput.value.trim().toLowerCase();
    searchResults.empty();
    if (!q) {
      searchResults.style.display = "none";
      return;
    }
    const items = (plugin.store.data.recurring || []).filter((r) =>
      (r.title || "").toLowerCase().includes(q) ||
      (r.category || "").toLowerCase().includes(q),
    );
    if (!items.length) {
      searchResults.createDiv({ cls: "plg-empty", text: "未找到匹配的周期规则" });
      searchResults.style.display = "block";
      return;
    }
    items.forEach((item) => {
      const enriched = enrichRecurringItem(item, plugin.store.data.categories, plugin.store.data);
      const cell = searchResults.createDiv({ cls: "plg-sub-search-cell", attr: { title: item.title } });
      renderSubscriptionIcon(cell, enriched, plugin);
      cell.createDiv({ cls: "plg-sub-search-name", text: item.title });
      cell.onclick = () => {
        openRecurringBill(plugin.app, plugin, { ...item }, () => {
          plugin.refreshView();
          renderAll();
        });
      };
    });
    searchResults.style.display = "grid";
  };

  searchInput.addEventListener("input", renderSearch);

  const renderAll = () => {
    renderOverview();
    renderList();
    renderSearch();
  };

  const renderOverview = () => {
    overview.empty();
    const metricsGrid = overview.createDiv({ cls: "plg-sub-metrics-grid" });
    const items = plugin.store.data.recurring || [];
    const attributed = attributeRecurringTxs(plugin.store.data.transactions, items);
    const recTxs = attributed.map((x) => x.tx);
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${pad2(now.getMonth() + 1)}`;
    const yearKey = `${now.getFullYear()}-`;
    const monthBreak = recurringExpenseBreakdown(attributed, (tx) => tx.datetime.startsWith(monthKey));
    const yearBreak = recurringExpenseBreakdown(attributed, (tx) => tx.datetime.startsWith(yearKey));
    const totalBreak = recurringExpenseBreakdown(attributed, () => true);
    const firstDate = recTxs.length
      ? recTxs.map((t) => parseDateTime(t.datetime)).sort((a, b) => a - b)[0]
      : null;
    const days = firstDate ? Math.max(1, Math.ceil((now - firstDate) / 86400000)) : 1;
    const daily = totalBreak.total / days;
    const activeItems = items.filter((r) => isRecurringActive(r));
    const pausedItems = items.filter((r) => !isRecurringActive(r));
    const allTxs = plugin.store.data.transactions || [];

    [
      {
        label: "总支出",
        val: fmtMoney(totalBreak.total),
        cls: "green",
        icon: "💳",
        popLines: totalBreak.items.map((i) => ({ name: i.name, amt: i.amt, pct: i.pct })),
        popEmpty: "暂无周期支出",
      },
      {
        label: "本年支出",
        val: fmtMoney(yearBreak.total),
        cls: "teal",
        icon: "🗓️",
        popLines: yearBreak.items.map((i) => ({ name: i.name, amt: i.amt, pct: i.pct })),
        popEmpty: "本年暂无周期支出",
      },
      {
        label: "本月支出",
        val: fmtMoney(monthBreak.total),
        cls: "blue",
        icon: "📅",
        popLines: monthBreak.items.map((i) => ({ name: i.name, amt: i.amt, pct: i.pct })),
        popEmpty: "本月暂无周期支出",
      },
      {
        label: "日均支出",
        val: fmtMoney(daily),
        cls: "orange",
        icon: "📈",
        popLines: totalBreak.items.map((i) => ({
          name: i.name,
          amt: i.amt,
          pct: i.pct,
          sub: `日均 ${fmtMoney(i.amt / days)}`,
        })),
        popEmpty: "暂无周期支出",
      },
      {
        label: "生效规则",
        val: String(activeItems.length),
        cls: "purple",
        icon: "🔄",
        popLines: [
          ...activeItems.map((r) => ({
            name: r.title,
            amtText: fmtMoney(r.amount),
            sub: formatRecurringLabel(r),
          })),
          ...pausedItems.map((r) => {
            const st = recurringRenewalDisplayStats(r, allTxs);
            return {
              name: r.title,
              amtText: fmtMoney(st.amount),
              sub: "已暂停 · 不自动生成",
            };
          }),
        ],
        popEmpty: "暂无生效中的周期",
        onClick: () => listEl.scrollIntoView({ behavior: "smooth", block: "start" }),
      },
    ].forEach((m) => {
      const card = metricsGrid.createDiv({ cls: `plg-sub-metric ${m.cls}` + (m.popLines ? " has-pop" : "") });
      card.createDiv({ cls: "plg-sub-metric-icon", text: m.icon });
      card.createDiv({ cls: "plg-sub-metric-label", text: m.label });
      card.createDiv({ cls: "plg-sub-metric-val", text: m.val });
      renderSubMetricPop(card, m.popLines, m.popEmpty);
      if (m.onClick) {
        card.addClass("clickable");
        card.onclick = m.onClick;
      }
    });
  };

  const renderList = () => {
    listEl.empty();
    const items = plugin.store.data.recurring || [];
    const allTxs = plugin.store.data.transactions || [];
    if (!items.length) {
      listEl.createDiv({ cls: "plg-empty", text: "暂无周期账单，点击上方「新增」" });
      return;
    }
    items.forEach((item) => {
      normalizeSingleRecurringPhases(item);
      const enriched = enrichRecurringItem(item, plugin.store.data.categories, plugin.store.data);
      const isActive = isRecurringActive(item);
      const stats = recurringRenewalDisplayStats(item, allTxs);
      const renewalRecords = txsForRecurringRenewalRecords(item, allTxs);
      const derivedPhases = buildSubscriptionRenewalPhases(renewalRecords);
      const phaseHint = derivedPhases.length > 1 ? `${derivedPhases.length} 阶段 · ` : "";
      const card = listEl.createDiv({
        cls: "plg-recurring-card plg-sub-card plg-sub-card-clickable plg-sub-card-v2" + (isActive ? "" : " paused"),
      });
      card.dataset.recId = item.id;

      const top = card.createDiv({ cls: "plg-sub-card-top" });
      const identity = top.createDiv({ cls: "plg-sub-card-identity" });
      const label = identity.createDiv({ cls: "plg-recurring-icon plg-cat-label plg-sub-cat-label" });
      renderCategoryIcon(label, enriched);
      const textCol = label.createDiv({ cls: "plg-cat-label-text" });
      const nameRow = textCol.createDiv({ cls: "plg-sub-card-name-row" });
      nameRow.createSpan({ cls: "plg-recurring-title plg-sub-card-name", text: item.title || "周期" });
      nameRow.createSpan({
        cls: "plg-sub-card-badge" + (isActive ? " is-active" : " is-paused"),
        text: isActive ? "生效中" : "已暂停",
      });
      textCol.createDiv({
        cls: "plg-sub-card-meta plg-muted",
        text: recurringCardSubMeta(item),
      });
      textCol.createDiv({
        cls: "plg-sub-card-stats",
        text: isActive
          ? `${phaseHint}开始 ${stats.start} · 已记 ${stats.periods} 期 · ${fmtMoney(stats.amount)}`
          : `${phaseHint}开始 ${stats.start} · ${stats.periods} 笔 · 累计 ${fmtMoney(stats.amount)}`,
      });

      const side = top.createDiv({ cls: "plg-sub-card-side" });
      if (isActive) {
        side.createDiv({ cls: "plg-sub-card-next", text: `下一笔 ${item.nextDate || "—"}` });
      } else {
        side.createDiv({
          cls: "plg-sub-card-next paused",
          text: stats.amount > 0 ? `累计 ${fmtMoney(stats.amount)}` : "暂无记录",
        });
        side.createDiv({ cls: "plg-sub-card-side-hint", text: "已暂停 · 不自动生成" });
      }
      side.onclick = (e) => {
        e.stopPropagation();
        openRecurringPhaseHistory(plugin.app, plugin, item, () => renderAll());
      };

      card.onclick = (e) => {
        if (e.target.closest("button, .plg-sub-card-actions, .plg-sub-card-side")) return;
        openRecurringPhaseHistory(plugin.app, plugin, item, () => renderAll());
      };

      const actions = card.createDiv({ cls: "plg-recurring-actions plg-sub-card-actions" });
      actions.createEl("button", {
        text: "记录",
        cls: "plg-btn-ghost",
        attr: { type: "button" },
      }).onclick = (e) => {
        e.stopPropagation();
        openRecurringPhaseHistory(plugin.app, plugin, item, () => renderAll());
      };
      actions.createEl("button", { text: "生成", cls: "plg-btn-primary", attr: { type: "button" } }).onclick = async (e) => {
        e.stopPropagation();
        await plugin.store.generateRecurring(item.id);
        new Notice("已生成本期账单");
        plugin.refreshView();
        renderAll();
      };
      actions.createEl("button", {
        text: isActive ? "暂停" : "开启新阶段",
        cls: isActive ? "plg-btn-ghost" : "plg-btn-primary",
        attr: {
          type: "button",
          title: isActive
            ? "暂停自动生成，当前阶段保留在记账记录中"
            : "从今天起新建一个续费阶段（金额、周期可在此设置）",
        },
      }).onclick = async (e) => {
        e.stopPropagation();
        if (isActive) {
          closeRecurringPhase(item, dateKey(new Date()));
          await plugin.store.saveRecurring(item);
          plugin.refreshView?.();
          renderAll();
        } else {
          openStartNewRecurringPhase(plugin.app, plugin, item, () => renderAll());
        }
      };
      actions.createEl("button", { text: "编辑", cls: "plg-btn-ghost", attr: { type: "button" } }).onclick = (e) => {
        e.stopPropagation();
        openRecurringBill(plugin.app, plugin, { ...item }, () => renderAll());
      };
      actions.createEl("button", { text: "删除", cls: "plg-btn-ghost", attr: { type: "button" } }).onclick = (e) => {
        e.stopPropagation();
        confirmPlgAction({
          title: "删除周期规则",
          message: "确定删除这条周期记账规则吗？已入账的历史账单不会被删除。",
          confirmText: "删除",
          danger: true,
          onConfirm: async () => {
            await plugin.store.deleteRecurring(item.id);
            renderAll();
          },
        });
      };
    });
  };

  renderAll();
  if (focusOpts?.section === "recurring" && focusOpts.id) {
    requestAnimationFrame(() => {
      const el = listEl.querySelector(`[data-rec-id="${focusOpts.id}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.addClass("plg-settings-focus-highlight");
        window.setTimeout(() => el.removeClass("plg-settings-focus-highlight"), 2400);
      }
    });
  }
}

function txsForSubcategory(catName, subName, txs) {
  const cat = (catName || "").trim();
  const sub = (subcategoryName(subName) || "").trim();
  return (txs || []).filter((t) => {
    if ((t.category || "").trim() !== cat) return false;
    if (!sub) return !(t.subcategory || "").trim();
    return (t.subcategory || "").trim() === sub;
  });
}

function openTransactionHistoryDialog(app, plugin, opts) {
  openPlgOverlay({
    title: opts.title,
    cls: "plg-tx-history-overlay wide",
    wide: true,
    stack: true,
    tier: 3,
    build: (body, close) => {
      addClasses(body, "plg-modal");
      const summaryEl = body.createDiv({ cls: "plg-sub-history-summary plg-muted" });
      const listEl = body.createDiv({ cls: "plg-sub-history-list" });
      const emptyEl = body.createDiv({ cls: "plg-empty", text: "暂无历史账单" });

      const refreshList = () => {
        listEl.empty();
        const matched = (opts.getTransactions() || []).sort((a, b) => b.datetime.localeCompare(a.datetime));
        if (!matched.length) {
          summaryEl.addClass("hidden");
          listEl.addClass("hidden");
          emptyEl.removeClass("hidden");
          return;
        }
        summaryEl.removeClass("hidden");
        listEl.removeClass("hidden");
        emptyEl.addClass("hidden");
        const total = matched.reduce((s, t) => s + t.amount, 0);
        summaryEl.setText(`共 ${matched.length} 笔 · 合计 ${fmtMoney(total)}`);
        matched.forEach((t) => {
          const row = listEl.createDiv({ cls: "plg-sub-history-row plg-tx-history-row-clickable" });
          row.createSpan({ cls: "plg-sub-history-date", text: t.datetime.slice(0, 16) });
          row.createSpan({ cls: "plg-sub-history-amt", text: fmtMoney(t.amount) });
          const detail = [t.note].filter((x) => x && x !== opts.title).join(" · ");
          if (detail) row.createSpan({ cls: "plg-sub-history-note plg-muted", text: detail });
          const editBtn = row.createEl("button", {
            text: "修改",
            cls: "plg-btn-ghost plg-history-edit-btn",
            attr: { type: "button" },
          });
          const openEdit = () => {
            openEditTransaction(app, plugin, { ...t }, () => {
              opts.onRefresh?.();
              refreshList();
            }, () => {
              opts.onRefresh?.();
              refreshList();
            });
          };
          editBtn.onclick = (e) => {
            e.stopPropagation();
            openEdit();
          };
          row.onclick = (e) => {
            if (e.target.closest("button")) return;
            openEdit();
          };
        });
      };

      refreshList();

      const btnRow = body.createDiv({ cls: "plg-modal-actions" });
      btnRow.createEl("button", { text: "关闭", cls: "mod-cta", attr: { type: "button" } }).onclick = close;
    },
  });
}

function openSubcategoryHistory(app, plugin, catName, subMeta, onRefresh) {
  const subName = subcategoryName(subMeta);
  openTransactionHistoryDialog(app, plugin, {
    title: `${catName} · ${subName}`,
    getTransactions: () => txsForSubcategory(catName, subName, plugin.store.data.transactions),
    onRefresh,
  });
}

function resolveLinkedSubscriptionForTx(plugin, tx) {
  const id = String(tx.linkedSubscriptionId || "").trim();
  if (id) {
    return (plugin.store.data.subscriptions || []).find((s) => s.id === id) || null;
  }
  if (tx.source === "subscription") {
    return (plugin.store.data.subscriptions || []).find((s) => subscriptionTxMatchesStrict(s, tx)) || null;
  }
  return null;
}

function resolveLinkedRecurringForTx(plugin, tx) {
  const id = String(tx.linkedRecurringId || "").trim();
  if (id) {
    return (plugin.store.data.recurring || []).find((r) => r.id === id) || null;
  }
  if (tx.source === "recurring") {
    return (plugin.store.data.recurring || []).find((r) =>
      r.category === tx.category
      && (r.subcategory || "") === (tx.subcategory || "")
      && r.amount === tx.amount
    ) || null;
  }
  return null;
}

function subscriptionTxFilter(txs, subs) {
  const items = subs || [];
  return (txs || []).filter((t) => items.some((s) => txBelongsToSubscriptionStats(s, t)));
}

function enrichSubscriptionItem(item, storeData = null) {
  const categories = storeData?.categories;
  const subscriptions = storeData?.subscriptions;
  const preset = resolveSubscriptionPreset(item);
  let enriched = {
    ...item,
    name: item.name,
    domain: item.iconUrl ? "" : (item.domain || preset?.domain || ""),
    color: item.color || preset?.color || "",
    icon: item.icon || preset?.abbr || subscriptionAbbr(item.name),
    iconUrl: item.iconUrl || preset?.iconUrl || "",
  };
  enriched = seedBillIconFromSubcategory({
    ...enriched,
    category: item.category,
    subcategory: item.subcategory || item.name,
    title: item.name,
  }, categories);
  if (enriched.iconUrl) {
    return { ...enriched, domain: "" };
  }
  const cat = (categories || []).find((c) => c.name === item.category);
  const subMeta = findSubcategoryMeta(cat, item.subcategory || item.name);
  if (subMeta) {
    const fromSub = enrichSubcategoryWithPreset(
      normalizeSubcategory(subMeta),
      item.category,
      subscriptions,
      storeData?.recurring,
    );
    if (fromSub.iconUrl) {
      return {
        ...enriched,
        iconUrl: fromSub.iconUrl,
        icon: fromSub.icon || enriched.icon,
        domain: "",
        color: fromSub.color || enriched.color,
      };
    }
    if (!enriched.domain && fromSub.domain) {
      enriched.domain = fromSub.domain;
      enriched.color = fromSub.color || enriched.color;
    }
  }
  return enriched;
}

function txIsAutoSubscriptionBill(item, tx) {
  return tx.source === "subscription" && (
    String(tx.linkedSubscriptionId || "") === item.id
    || subscriptionTxMatchesExact(item, tx)
  );
}

function dedupeTxsByDay(txs) {
  const bestByDay = new Map();
  (txs || []).forEach((t) => {
    const key = sameDayExpenseKey(t);
    const prev = bestByDay.get(key);
    if (!prev || txSourceRank(t) < txSourceRank(prev)) bestByDay.set(key, t);
  });
  return [...bestByDay.values()];
}

function txBelongsToSubscriptionStats(item, t) {
  if (!item || !t || t.flow !== "expense") return false;
  if (String(t.linkedSubscriptionId || "") === item.id) return true;
  if (txIsAutoSubscriptionBill(item, t)) return true;
  if (t.source === "subscription") return false;
  return subscriptionTxMatchesExact(item, t);
}

/** 订阅统计：自动续费 + 手动关联 + 字段完全一致的真实账单 */
function txsForSubscriptionStats(item, txs) {
  const matched = (txs || []).filter((t) => txBelongsToSubscriptionStats(item, t));
  return dedupeTxsByDay(matched);
}

/** 订阅详情列表：仅自动续费记录，不含手动关联 */
function txsForSubscriptionHistory(item, txs) {
  const matched = (txs || []).filter((t) => txIsAutoSubscriptionBill(item, t));
  return dedupeTxsByDay(matched);
}

function txsForSubscription(item, txs) {
  return txsForSubscriptionStats(item, txs);
}

function subscriptionItemStats(item, txs) {
  const auto = txsForSubscriptionHistory(item, txs);
  const all = txsForSubscriptionStats(item, txs);
  const linkedCount = all.filter((t) => String(t.linkedSubscriptionId || "") === item.id).length;
  const exactCount = Math.max(0, all.length - auto.length - linkedCount);
  if (all.length) {
    return {
      start: all.map((t) => t.datetime).sort()[0].slice(0, 10),
      periods: all.length,
      amount: all.reduce((s, t) => s + t.amount, 0),
      autoPeriods: auto.length,
      linkedPeriods: linkedCount,
      exactPeriods: exactCount,
    };
  }
  return {
    start: item.billingAnchor ? String(item.billingAnchor).slice(0, 10) : (item.nextDate || "—"),
    periods: 0,
    amount: 0,
    autoPeriods: 0,
    linkedPeriods: 0,
    exactPeriods: 0,
  };
}

/** 与续费记录弹窗一致的统计（列表卡片展示用） */
function subscriptionRenewalDisplayStats(item, txs) {
  const records = txsForSubscriptionRenewalRecords(item, txs);
  if (!records.length) {
    const fallback = subscriptionItemStats(item, txs);
    return {
      start: fallback.start,
      periods: fallback.periods,
      amount: fallback.amount,
    };
  }
  const sorted = records.map((t) => t.datetime).sort();
  return {
    start: sorted[0].slice(0, 10),
    periods: records.length,
    amount: records.reduce((s, t) => s + t.amount, 0),
  };
}

/** 续费记录：自动续费 + 手动补录/关联 + 名称/金额一致的历史账单 */
function txsForSubscriptionRenewalRecords(item, txs) {
  return dedupeTxsByDay((txs || []).filter((t) => {
    if (!item || !t || t.flow !== "expense") return false;
    if (String(t.linkedSubscriptionId || "") === item.id) return true;
    if (txIsAutoSubscriptionBill(item, t)) return true;
    if (t.source === "subscription") return false;
    return subscriptionTxMatchesExact(item, t);
  }));
}

// ─── 周期记账：阶段 / 补录 / 关联（与订阅平行，入账分类自选） ───

function txIsAutoRecurringBill(item, tx) {
  return tx.source === "recurring" && (
    String(tx.linkedRecurringId || "") === item.id
    || recurringTxMatchesExact(item, tx)
  );
}

function recurringMatchKeys(item) {
  const title = (item.title || "").trim();
  const baseTitle = recurringTitleBase(title);
  const ruleNote = (item.note || "").trim();
  return [...new Set([title, baseTitle, ruleNote].filter(Boolean))];
}

function recurringTxMatchesExact(item, t) {
  if (!item || !t) return false;
  if ((item.category || "") !== (t.category || "")) return false;
  const keys = recurringMatchKeys(item);
  const title = (item.title || "").trim();
  const note = (t.note || "").trim();
  const sub = (item.subcategory || "").trim();
  if (sub && (t.subcategory || "").trim() !== sub) {
    if (!keys.some((k) => note && note.includes(k))) return false;
  }
  if (!title && !keys.length) return true;
  const tSub = (t.subcategory || "").trim();
  if (keys.some((k) => note === k || tSub === k)) return true;
  if (keys.some((k) => note && note.includes(k))) return true;
  if (!note && sub) return true;
  return false;
}

function recurringTxMatchesLoose(item, t) {
  if (!item || !t) return false;
  if ((item.category || "") !== (t.category || "")) return false;
  const keys = recurringMatchKeys(item);
  if (!keys.length) return true;
  const note = (t.note || "").trim();
  const sub = (t.subcategory || "").trim();
  return keys.some((k) => note === k || sub === k || (note && note.includes(k)));
}

function txsForRecurringRenewalRecords(item, txs) {
  const flow = item.flow || "expense";
  return dedupeTxsByDay((txs || []).filter((t) => {
    if (!item || !t || t.flow !== flow) return false;
    if (String(t.linkedRecurringId || "") === item.id) return true;
    if (txIsAutoRecurringBill(item, t)) return true;
    if (t.source === "recurring") return false;
    return recurringTxMatchesExact(item, t);
  }));
}

function recurringRenewalDayMap(item, txs) {
  const map = new Map();
  txsForRecurringRenewalRecords(item, txs).forEach((t) => {
    const d = t.datetime.slice(0, 10);
    if (!map.has(d)) map.set(d, t);
  });
  return map;
}

function buildRecurringRenewalTx(item, dateStr, amount, ledger) {
  return {
    id: uid(),
    datetime: cycleTimeOnDate(dateStr, item),
    flow: item.flow || "expense",
    category: item.category || "",
    subcategory: item.subcategory || "",
    amount,
    ledger: ledger || "",
    accountOut: "",
    accountIn: "",
    note: item.note || item.title || "周期记账",
    reimburse: false,
    discount: 0,
    tags: ["周期"],
    member: "",
    source: "",
    linkedRecurringId: item.id,
    linkedSubscriptionId: "",
  };
}

function patchRecurringRenewalTx(tx, item, dateStr, amount) {
  return {
    ...tx,
    amount,
    datetime: cycleTimeOnDate(dateStr, item),
    flow: item.flow || tx.flow || "expense",
    linkedRecurringId: item.id,
    tags: [...new Set([...(tx.tags || []), "周期"])],
    category: tx.category || item.category || "",
    subcategory: tx.subcategory || item.subcategory || "",
    note: tx.note || item.note || item.title || "",
  };
}

function recurringItemStats(item, txs) {
  const records = txsForRecurringRenewalRecords(item, txs);
  if (records.length) {
    const sorted = records.map((t) => t.datetime).sort();
    return {
      start: sorted[0].slice(0, 10),
      periods: records.length,
      amount: records.reduce((s, t) => s + t.amount, 0),
    };
  }
  return {
    start: item.billingAnchor ? String(item.billingAnchor).slice(0, 10) : (item.nextDate || "—"),
    periods: 0,
    amount: 0,
  };
}

function recurringRenewalDisplayStats(item, txs) {
  const records = txsForRecurringRenewalRecords(item, txs);
  if (!records.length) return recurringItemStats(item, txs);
  const sorted = records.map((t) => t.datetime).sort();
  return {
    start: sorted[0].slice(0, 10),
    periods: records.length,
    amount: records.reduce((s, t) => s + t.amount, 0),
  };
}

function findLinkableRecurringCandidates(item, txs) {
  const flow = item.flow || "expense";
  const included = new Set(txsForRecurringRenewalRecords(item, txs).map((t) => t.id));
  const occupiedDays = new Set(recurringRenewalDayMap(item, txs).keys());
  return (txs || []).filter((t) => {
    if (t.flow !== flow) return false;
    if (included.has(t.id)) return false;
    if (occupiedDays.has(t.datetime.slice(0, 10))) return false;
    if (String(t.linkedRecurringId || "")) return false;
    if (t.source === "recurring") return false;
    return recurringTxMatchesExact(item, t) || recurringTxMatchesLoose(item, t);
  }).sort((a, b) => b.datetime.localeCompare(a.datetime));
}

function getSubscriptionRenewalApi(item) {
  return {
    kind: "subscription",
    item,
    displayName: item.name || "订阅",
    phaseTitle: "续费阶段",
    recordLabel: "续费记录",
    supplementTitle: `补录 · ${item.name}`,
    linkTitle: `${item.name} · 关联已有账单`,
    linkHint: "选择总账本中尚未计入续费阶段的账单，关联后将出现在续费记录里。",
    emptyText: "暂无续费记录",
    getRecords: (txs) => txsForSubscriptionRenewalRecords(item, txs),
    getDayMap: (txs) => subscriptionRenewalDayMap(item, txs),
    buildTx: (d, amt, ledger) => buildSubscriptionRenewalTx(item, d, amt, ledger),
    patchTx: (tx, d, amt) => patchSubscriptionRenewalTx(tx, item, d, amt),
    defaultStart: (txs) => {
      const stats = subscriptionRenewalDisplayStats(item, txs);
      if (stats.start && stats.start !== "—") return stats.start;
      return subscriptionDateValue(item, "startDate") || billingDateValue(item);
    },
    defaultAmount: () => item.amount || "",
    getTxTag: (t) => (
      String(t.linkedSubscriptionId || "") === item.id && t.source !== "subscription"
        ? "补录"
        : (t.source === "subscription" ? "自动" : "")
    ),
    linkPatch: (t) => ({
      ...t,
      linkedSubscriptionId: item.id,
      tags: [...new Set([...(t.tags || []), "订阅"])],
    }),
    findLinkable: (txs) => findLinkableSubscriptionCandidates(item, txs),
    deleteConfirmMsg: (periods) => `确定删除该阶段 ${periods} 笔续费记录？此操作不可恢复。`,
    deleteNotice: (periods) => `已删除 ${periods} 笔续费记录`,
    supplementDoneMsg: (added, skipped) => (
      skipped > 0
        ? `已补录 ${added} 笔，跳过 ${skipped} 笔已有记录`
        : `已补录 ${added} 笔续费账单`
    ),
  };
}

function getRecurringRenewalApi(item) {
  const title = item.title || "周期";
  return {
    kind: "recurring",
    item,
    displayName: title,
    phaseTitle: "记账阶段",
    recordLabel: "记录",
    supplementTitle: `补录 · ${title}`,
    linkTitle: `${title} · 关联已有账单`,
    linkHint: "选择总账本中尚未计入记账阶段的账单，关联后将出现在记账记录里。",
    emptyText: "暂无记账记录",
    getRecords: (txs) => txsForRecurringRenewalRecords(item, txs),
    getDayMap: (txs) => recurringRenewalDayMap(item, txs),
    buildTx: (d, amt, ledger) => buildRecurringRenewalTx(item, d, amt, ledger),
    patchTx: (tx, d, amt) => patchRecurringRenewalTx(tx, item, d, amt),
    defaultStart: (txs) => {
      const stats = recurringRenewalDisplayStats(item, txs);
      if (stats.start && stats.start !== "—") return stats.start;
      if (item.billingAnchor) return String(item.billingAnchor).slice(0, 10);
      return billingDateValue(item);
    },
    defaultAmount: () => item.amount || "",
    getTxTag: (t) => (
      String(t.linkedRecurringId || "") === item.id && t.source !== "recurring"
        ? "补录"
        : (t.source === "recurring" ? "自动" : "")
    ),
    linkPatch: (t) => ({
      ...t,
      linkedRecurringId: item.id,
      tags: [...new Set([...(t.tags || []), "周期"])],
    }),
    findLinkable: (txs) => findLinkableRecurringCandidates(item, txs),
    deleteConfirmMsg: (periods) => `确定删除该阶段 ${periods} 笔记账记录？此操作不可恢复。`,
    deleteNotice: (periods) => `已删除 ${periods} 笔记账记录`,
    supplementDoneMsg: (added, skipped) => (
      skipped > 0
        ? `已补录 ${added} 笔，跳过 ${skipped} 笔已有记录`
        : `已补录 ${added} 笔周期账单`
    ),
  };
}

async function applyRenewalBatchSupplement(plugin, api, dates, amount) {
  const txs = [...(plugin.store.data.transactions || [])];
  const renewalByDay = api.getDayMap(txs);
  const { toAdd, skipped } = splitDatesByExistingDays(dates, new Set(renewalByDay.keys()));

  if (!toAdd.length) {
    return {
      added: 0,
      skipped,
      message: skipped
        ? `所选扣费日均已有记录（${skipped} 笔），无需补录`
        : "没有需要补录的账单",
    };
  }

  const ledger = plugin.store.data.ledger || "";
  for (const d of toAdd) {
    const newTx = api.buildTx(d, amount, ledger);
    plugin.store._ensureCategoryForTx(newTx);
    txs.unshift(newTx);
  }

  plugin.store.data.transactions = txs;
  await plugin.store.save();

  return {
    added: toAdd.length,
    skipped,
    message: api.supplementDoneMsg(toAdd.length, skipped),
  };
}

async function saveRenewalPhaseEdit(plugin, api, phase, start, end, amount, billingItem) {
  const item = api.item;
  const cycleItem = billingItem || resolveBillingItemForPhase(item, phase.txs || []);
  const targetDates = computeSubscriptionPeriodDates(cycleItem, start, end);
  if (!targetDates.length) return { error: "该区间内没有符合周期的扣费日" };

  const targetSet = new Set(targetDates);
  const phaseTxs = phase.txs || [];
  const phaseIds = new Set(phaseTxs.map((t) => t.id).filter(Boolean));
  const phaseByDay = new Map(phaseTxs.map((t) => [t.datetime.slice(0, 10), t]));

  let txs = [...(plugin.store.data.transactions || [])];
  let removed = 0;
  txs = txs.filter((t) => {
    if (!phaseIds.has(t.id)) return true;
    if (!targetSet.has(t.datetime.slice(0, 10))) {
      removed++;
      return false;
    }
    return true;
  });

  const renewalByDay = api.getDayMap(txs);
  let added = 0;
  let updated = 0;
  const ledger = plugin.store.data.ledger || "";

  for (const d of targetDates) {
    const phaseTx = phaseByDay.get(d);
    let idx = phaseTx ? txs.findIndex((t) => t.id === phaseTx.id) : -1;
    if (idx >= 0) {
      txs[idx] = api.patchTx(txs[idx], d, amount);
      updated++;
      continue;
    }
    const existing = renewalByDay.get(d);
    if (existing) {
      idx = txs.findIndex((t) => t.id === existing.id);
      if (idx >= 0) {
        txs[idx] = api.patchTx(txs[idx], d, amount);
        updated++;
        continue;
      }
    }
    const newTx = api.buildTx(d, amount, ledger);
    plugin.store._ensureCategoryForTx(newTx);
    txs.unshift(newTx);
    renewalByDay.set(d, newTx);
    added++;
  }

  plugin.store.data.transactions = txs;
  await plugin.store.save();

  const parts = [];
  if (added) parts.push(`新增 ${added} 笔`);
  if (updated) parts.push(`更新 ${updated} 笔`);
  if (removed) parts.push(`移除 ${removed} 笔`);
  return {
    message: parts.length ? `已保存：${parts.join("，")}` : "已保存该阶段",
    added,
    updated,
    removed,
  };
}

function openSupplementRenewalBill(app, plugin, api, onSaved) {
  if (api.kind === "subscription") normalizeSingleSubscriptionPhases(api.item);
  if (api.kind === "recurring") normalizeSingleRecurringPhases(api.item);
  const item = api.item;
  const allTxs = plugin.store.data.transactions || [];
  const defaultStart = api.defaultStart(allTxs);
  const defaultEnd = dateKey(new Date());
  const cycleLabel = api.kind === "recurring" ? "周期" : "订阅周期";

  openPlgOverlay({
    title: api.supplementTitle,
    cls: "plg-recurring-overlay plg-subscription-overlay",
    wide: true,
    stack: true,
    tier: 3,
    build: (body, close) => {
      addClasses(body, "plg-modal", "plg-recurring-form");
      const form = body.createDiv({ cls: "plg-recurring-form-inner" });
      const fields = mountSubscriptionBatchForm(form, item, {
        mode: "add",
        defaultAmount: api.defaultAmount(),
        defaultStart,
        defaultEnd,
        recordLabel: api.recordLabel,
        cycleLabel,
        getRecords: () => api.getRecords(plugin.store.data.transactions || []),
        getExistingDays: () => new Set(
          api.getDayMap(plugin.store.data.transactions || []).keys(),
        ),
      });

      const btnRow = body.createDiv({ cls: "plg-modal-actions" });
      btnRow.createEl("button", { text: "取消", cls: "plg-btn-ghost", attr: { type: "button" } }).onclick = close;
      const confirmBtn = btnRow.createEl("button", { text: "确定", cls: "mod-cta", attr: { type: "button" } });
      confirmBtn.onclick = async () => {
        if (confirmBtn.disabled) return;
        const amount = parseFloat(fields.amountInput.value);
        const start = fields.startDateField.getValue();
        const end = fields.endDateField.getValue();
        if (!amount) return new Notice("请填写金额");
        if (!start || !end) return new Notice("请选择开始与结束日期");
        if (start > end) return new Notice("结束日期不能早于开始日期");
        if (fields.cycleSelect.value === "custom" && !(parseInt(fields.intervalInput.value, 10) > 0)) {
          return new Notice("请填写自定义间隔天数");
        }
        const dates = computeSubscriptionPeriodDates(fields.getBillingItem(), start, end);
        if (!dates.length) return new Notice(`该区间内没有符合${cycleLabel}的扣费日`);

        confirmBtn.disabled = true;
        confirmBtn.textContent = "处理中…";
        try {
          const result = await applyRenewalBatchSupplement(plugin, api, dates, amount);
          new Notice(result.message);
          if (result.added > 0) {
            plugin.refreshView?.();
            onSaved?.();
            close();
          }
        } catch (err) {
          console.error("[PlainLedger] supplement", err);
          new Notice("补录失败：" + (err.message || String(err)));
        } finally {
          confirmBtn.disabled = false;
          confirmBtn.textContent = "确定";
        }
      };
    },
  });
}

async function confirmStartNewRenewalPhase(plugin, api, start, end, amount, billingItem) {
  const item = resolveRenewalStoreItem(plugin, api);
  const liveApi = refreshRenewalApi(plugin, api);
  const today = dateKey(new Date());

  if (api.kind === "subscription") normalizeSingleSubscriptionPhases(item);
  else normalizeSingleRecurringPhases(item);

  const phaseData = {
    amount,
    cycle: billingItem.cycle || "monthly",
    cycleDay: billingItem.cycleDay,
    cycleMonth: billingItem.cycleMonth,
    cycleWeekday: billingItem.cycleWeekday,
    cycleIntervalDays: billingItem.cycleIntervalDays || 0,
    startDate: start,
  };

  if (api.kind === "subscription") {
    if (isSubscriptionRenewing(item)) closeSubscriptionPhase(item, today);
    startSubscriptionPhase(item, phaseData);
  } else {
    if (isRecurringActive(item)) closeRecurringPhase(item, today);
    startRecurringPhase(item, phaseData);
  }

  const dates = (end && start && start <= end)
    ? computeSubscriptionPeriodDates(billingItem, start, end)
    : [];
  let supplementMsg = "";
  if (dates.length) {
    const result = await applyRenewalBatchSupplement(plugin, liveApi, dates, amount);
    supplementMsg = result.added > 0 ? `，已入账 ${result.added} 笔` : "";
  }

  item.nextDate = computeInitialNextDate(item, new Date());
  item.active = true;

  if (api.kind === "subscription") await plugin.store.saveSubscription(item);
  else await plugin.store.saveRecurring(item);

  return { nextDate: item.nextDate, supplementMsg };
}

function openStartNewRenewalPhase(app, plugin, api, onSaved) {
  const liveApi = refreshRenewalApi(plugin, api);
  const item = liveApi.item;
  if (liveApi.kind === "subscription") normalizeSingleSubscriptionPhases(item);
  else normalizeSingleRecurringPhases(item);

  const today = dateKey(new Date());
  const cycleLabel = liveApi.kind === "recurring" ? "周期" : "订阅周期";
  const presetAmount = item.amount || liveApi.defaultAmount() || "";
  const presetCycle = item.cycle || "monthly";

  openPlgOverlay({
    title: `开启新阶段 · ${liveApi.displayName}`,
    cls: "plg-recurring-overlay plg-subscription-overlay",
    wide: true,
    stack: true,
    tier: 3,
    build: (body, close) => {
      addClasses(body, "plg-modal", "plg-recurring-form");
      const form = body.createDiv({ cls: "plg-recurring-form-inner" });
      const fields = mountSubscriptionBatchForm(form, item, {
        mode: "add",
        intent: "newPhase",
        defaultAmount: presetAmount,
        defaultStart: today,
        defaultEnd: "",
        defaultCycle: presetCycle,
        defaultCycleIntervalDays: item.cycleIntervalDays || 0,
        recordLabel: liveApi.recordLabel,
        cycleLabel,
        getExistingDays: () => new Set(
          liveApi.getDayMap(plugin.store.data.transactions || []).keys(),
        ),
      });

      const btnRow = body.createDiv({ cls: "plg-modal-actions" });
      btnRow.createEl("button", { text: "取消", cls: "plg-btn-ghost", attr: { type: "button" } }).onclick = close;
      const confirmBtn = btnRow.createEl("button", { text: "开启", cls: "mod-cta", attr: { type: "button" } });
      confirmBtn.onclick = async () => {
        if (confirmBtn.disabled) return;
        const amount = parseFloat(fields.amountInput.value);
        const start = fields.startDateField.getValue();
        const end = fields.endDateField.getValue();
        if (!amount) return new Notice("请填写金额");
        if (!start) return new Notice("请选择开始日期");
        if (end && start > end) return new Notice("结束日期不能早于开始日期");
        if (fields.cycleSelect.value === "custom" && !(parseInt(fields.intervalInput.value, 10) > 0)) {
          return new Notice("请填写自定义间隔天数");
        }
        const billingItem = fields.getBillingItem();
        if (end) {
          const dates = computeSubscriptionPeriodDates(billingItem, start, end);
          if (!dates.length) return new Notice(`该区间内没有符合${cycleLabel}的扣费日`);
        }

        confirmBtn.disabled = true;
        confirmBtn.textContent = "处理中…";
        try {
          const result = await confirmStartNewRenewalPhase(
            plugin,
            liveApi,
            start,
            end,
            amount,
            billingItem,
          );
          plugin.refreshView?.();
          onSaved?.();
          close();
          new Notice(`已开启新阶段，下一笔 ${result.nextDate || "—"}${result.supplementMsg || ""}`);
        } catch (err) {
          console.error("[PlainLedger] new phase", err);
          new Notice("开启失败：" + (err.message || String(err)));
        } finally {
          confirmBtn.disabled = false;
          confirmBtn.textContent = "开启";
        }
      };
    },
  });
}

function openStartNewSubscriptionPhase(app, plugin, item, onSaved) {
  openStartNewRenewalPhase(app, plugin, getSubscriptionRenewalApi(item), onSaved);
}

function openStartNewRecurringPhase(app, plugin, item, onSaved) {
  openStartNewRenewalPhase(app, plugin, getRecurringRenewalApi(item), onSaved);
}

function openSupplementSubscriptionBill(app, plugin, item, onSaved) {
  openSupplementRenewalBill(app, plugin, getSubscriptionRenewalApi(item), onSaved);
}

function openSupplementRecurringBill(app, plugin, item, onSaved) {
  openSupplementRenewalBill(app, plugin, getRecurringRenewalApi(item), onSaved);
}

function findLinkableSubscriptionCandidates(item, txs) {
  const included = new Set(txsForSubscriptionRenewalRecords(item, txs).map((t) => t.id));
  const occupiedDays = new Set(subscriptionRenewalDayMap(item, txs).keys());
  return (txs || []).filter((t) => {
    if (t.flow !== "expense") return false;
    if (included.has(t.id)) return false;
    if (occupiedDays.has(t.datetime.slice(0, 10))) return false;
    if (String(t.linkedSubscriptionId || "")) return false;
    if (t.source === "subscription") return false;
    return subscriptionTxMatchesExact(item, t) || subscriptionTxMatchesStrict(item, t);
  }).sort((a, b) => b.datetime.localeCompare(a.datetime));
}

function openLinkExistingRenewalBills(app, plugin, api, onSaved) {
  openPlgOverlay({
    title: api.linkTitle,
    cls: "plg-tx-history-overlay",
    wide: true,
    stack: true,
    tier: 3,
    build: (body, close) => {
      addClasses(body, "plg-modal");
      body.createDiv({
        cls: "plg-muted plg-bill-form-hint",
        text: api.linkHint,
      });
      const listEl = body.createDiv({ cls: "plg-sub-link-candidate-list" });

      const refresh = () => {
        listEl.empty();
        const candidates = api.findLinkable(plugin.store.data.transactions || []);
        if (!candidates.length) {
          listEl.createDiv({ cls: "plg-empty", text: "暂无可关联的账单" });
          return;
        }
        candidates.forEach((t) => {
          const row = listEl.createDiv({ cls: "plg-sub-history-row plg-tx-history-row-clickable" });
          row.createSpan({ cls: "plg-sub-history-date", text: t.datetime.slice(0, 16) });
          row.createSpan({ cls: "plg-sub-history-amt", text: fmtMoney(t.amount) });
          const detail = [t.subcategory, t.note].filter(Boolean).join(" · ");
          if (detail) row.createSpan({ cls: "plg-sub-history-note plg-muted", text: detail });
          row.createEl("button", {
            text: "关联",
            cls: "plg-btn-primary plg-sub-link-btn",
            attr: { type: "button" },
          }).onclick = async (e) => {
            e.stopPropagation();
            await plugin.store.updateTransaction(api.linkPatch(t));
            new Notice("已关联");
            plugin.refreshView?.();
            refresh();
            onSaved?.();
          };
        });
      };

      refresh();
      const btnRow = body.createDiv({ cls: "plg-modal-actions" });
      btnRow.createEl("button", { text: "完成", cls: "mod-cta", attr: { type: "button" } }).onclick = close;
    },
  });
}

function openLinkExistingSubscriptionBills(app, plugin, item, onSaved) {
  openLinkExistingRenewalBills(app, plugin, getSubscriptionRenewalApi(item), onSaved);
}

function openLinkExistingRecurringBills(app, plugin, item, onSaved) {
  openLinkExistingRenewalBills(app, plugin, getRecurringRenewalApi(item), onSaved);
}

const SUBSCRIPTION_PHASE_GAP_DAYS = 45;

function buildSubscriptionRenewalPhases(txs) {
  const sorted = dedupeTxsByDay(txs || []).sort((a, b) => a.datetime.localeCompare(b.datetime));
  if (!sorted.length) return [];

  const byAmount = new Map();
  sorted.forEach((t) => {
    const k = Number(t.amount).toFixed(2);
    if (!byAmount.has(k)) byAmount.set(k, []);
    byAmount.get(k).push(t);
  });

  const phases = [];
  const splitByGap = (list, unitAmount) => {
    if (!list.length) return;
    let chunk = [list[0]];
    for (let i = 1; i < list.length; i++) {
      const prev = new Date(list[i - 1].datetime.slice(0, 10));
      const cur = new Date(list[i].datetime.slice(0, 10));
      const gap = (cur - prev) / 86400000;
      if (gap > SUBSCRIPTION_PHASE_GAP_DAYS) {
        phases.push(finalizeSubscriptionPhase(chunk, unitAmount));
        chunk = [list[i]];
      } else {
        chunk.push(list[i]);
      }
    }
    phases.push(finalizeSubscriptionPhase(chunk, unitAmount));
  };

  byAmount.forEach((list, amtKey) => splitByGap(list, parseFloat(amtKey)));
  phases.sort((a, b) => a.start.localeCompare(b.start));
  return phases;
}

function finalizeSubscriptionPhase(txs, unitAmount) {
  const sorted = [...txs].sort((a, b) => a.datetime.localeCompare(b.datetime));
  const billingItem = resolveBillingItemForPhase({ cycle: "monthly" }, sorted);
  return {
    start: sorted[0].datetime.slice(0, 10),
    end: sorted[sorted.length - 1].datetime.slice(0, 10),
    periods: sorted.length,
    amount: sorted.reduce((s, t) => s + t.amount, 0),
    unitAmount,
    txs: sorted,
    billingItem,
    cycleLabel: formatRecurringLabel(billingItem),
  };
}

function openEditRenewalPhase(app, plugin, api, phase, phaseIndex, onSaved) {
  const item = api.item;
  const cycleLabel = api.kind === "recurring" ? "周期" : "订阅周期";
  openPlgOverlay({
    title: `修改 · 阶段 ${phaseIndex + 1}`,
    cls: "plg-recurring-overlay plg-subscription-overlay",
    wide: true,
    stack: true,
    tier: 3,
    build: (body, close) => {
      addClasses(body, "plg-modal", "plg-recurring-form");
      const form = body.createDiv({ cls: "plg-recurring-form-inner" });
      const fields = mountSubscriptionBatchForm(form, item, {
        mode: "edit",
        defaultAmount: phase.unitAmount,
        defaultStart: phase.start,
        defaultEnd: phase.end,
        defaultCycle: phase.billingItem?.cycle,
        defaultCycleIntervalDays: phase.billingItem?.cycleIntervalDays,
        recordLabel: api.recordLabel,
        cycleLabel,
        phaseTxs: phase.txs,
      });

      const btnRow = body.createDiv({ cls: "plg-modal-actions" });
      btnRow.createEl("button", { text: "取消", cls: "plg-btn-ghost", attr: { type: "button" } }).onclick = close;
      const saveBtn = btnRow.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } });
      saveBtn.onclick = async () => {
        if (saveBtn.disabled) return;
        const amount = parseFloat(fields.amountInput.value);
        const start = fields.startDateField.getValue();
        const end = fields.endDateField.getValue();
        if (!amount) return new Notice("请填写金额");
        if (!start || !end) return new Notice("请选择开始与结束日期");
        if (start > end) return new Notice("结束日期不能早于开始日期");
        if (fields.cycleSelect.value === "custom" && !(parseInt(fields.intervalInput.value, 10) > 0)) {
          return new Notice("请填写自定义间隔天数");
        }
        saveBtn.disabled = true;
        saveBtn.textContent = "保存中…";
        try {
          const result = await saveRenewalPhaseEdit(
            plugin,
            api,
            phase,
            start,
            end,
            amount,
            fields.getBillingItem(),
          );
          if (result.error) {
            new Notice(result.error);
            return;
          }
          plugin.refreshView?.();
          onSaved?.();
          close();
          new Notice(result.message);
        } catch (err) {
          console.error("[PlainLedger] save phase", err);
          new Notice("保存失败：" + (err.message || String(err)));
        } finally {
          saveBtn.disabled = false;
          saveBtn.textContent = "保存";
        }
      };
    },
  });
}

function openRenewalPhaseHistory(app, plugin, api, onOuterRefresh) {
  const item = api.item;
  openPlgOverlay({
    title: `${api.displayName} · ${api.phaseTitle}`,
    cls: "plg-tx-history-overlay plg-sub-phase-overlay wide",
    wide: true,
    stack: true,
    tier: 2,
    build: (body, close) => {
      addClasses(body, "plg-modal");
      const header = body.createDiv({ cls: "plg-sub-phase-header" });
      const summaryEl = header.createDiv({ cls: "plg-sub-phase-summary" });
      const headerActions = header.createDiv({ cls: "plg-sub-phase-header-actions" });
      headerActions.createEl("button", {
        text: "补录",
        cls: "plg-btn-ghost",
        attr: { type: "button", title: "补录过往账单" },
      }).onclick = () => {
        openSupplementRenewalBill(app, plugin, refreshRenewalApi(plugin, api), () => {
          refreshList();
          onOuterRefresh?.();
        });
      };
      headerActions.createEl("button", {
        text: "开启新阶段",
        cls: "plg-btn-primary",
        attr: { type: "button", title: "从今天起新建续费阶段" },
      }).onclick = () => {
        openStartNewRenewalPhase(app, plugin, api, () => {
          refreshList();
          onOuterRefresh?.();
        });
      };
      headerActions.createEl("button", {
        text: "关联已有",
        cls: "plg-btn-ghost",
        attr: { type: "button", title: "从总账本关联历史账单" },
      }).onclick = () => {
        openLinkExistingRenewalBills(app, plugin, refreshRenewalApi(plugin, api), () => {
          refreshList();
          onOuterRefresh?.();
        });
      };

      const listEl = body.createDiv({ cls: "plg-sub-phase-list" });
      const emptyEl = body.createDiv({ cls: "plg-empty", text: api.emptyText });

      const refreshList = () => {
        listEl.empty();
        summaryEl.empty();
        const allTxs = plugin.store.data.transactions || [];
        const records = api.getRecords(allTxs);
        const phases = buildSubscriptionRenewalPhases(records)
          .sort((a, b) => a.start.localeCompare(b.start));
        if (!phases.length) {
          summaryEl.addClass("hidden");
          listEl.addClass("hidden");
          emptyEl.removeClass("hidden");
          return;
        }
        summaryEl.removeClass("hidden");
        listEl.removeClass("hidden");
        emptyEl.addClass("hidden");
        const totalAmt = phases.reduce((s, p) => s + p.amount, 0);
        const totalPeriods = phases.reduce((s, p) => s + p.periods, 0);
        summaryEl.createSpan({ text: `共 ${phases.length} 个阶段 · ${totalPeriods} 笔 · 合计 ` });
        summaryEl.createSpan({ cls: "plg-sub-phase-summary-amt", text: fmtMoney(totalAmt) });

        phases.forEach((phase, idx) => {
          const block = listEl.createDiv({ cls: "plg-sub-phase-block" });
          const bodyRow = block.createDiv({ cls: "plg-sub-phase-body" });
          const bodyMain = bodyRow.createDiv({ cls: "plg-sub-phase-body-main" });
          const headMain = bodyMain.createDiv({ cls: "plg-sub-phase-head-main" });
          headMain.createSpan({ cls: "plg-sub-phase-title", text: `阶段 ${idx + 1}` });
          const range = phase.start === phase.end ? phase.start : `${phase.start} — ${phase.end}`;
          headMain.createSpan({ cls: "plg-sub-phase-range", text: range });
          const stats = bodyMain.createDiv({ cls: "plg-sub-phase-stats" });
          stats.createSpan({ cls: "plg-sub-phase-stat-unit", text: `单价 ${fmtMoney(phase.unitAmount)}` });
          stats.createSpan({ cls: "plg-sub-phase-stat-sep", text: "·" });
          if (phase.cycleLabel) {
            stats.createSpan({ cls: "plg-sub-phase-stat-cycle", text: phase.cycleLabel });
            stats.createSpan({ cls: "plg-sub-phase-stat-sep", text: "·" });
          }
          stats.createSpan({ cls: "plg-sub-phase-stat-periods", text: `${phase.periods} 笔` });
          stats.createSpan({ cls: "plg-sub-phase-stat-sep", text: "·" });
          stats.createSpan({ cls: "plg-sub-phase-stat-total", text: `合计 ${fmtMoney(phase.amount)}` });
          const headActions = bodyRow.createDiv({ cls: "plg-sub-phase-actions" });
          headActions.createEl("button", {
            text: "修改",
            cls: "plg-btn-plain plg-sub-phase-btn",
            attr: { type: "button" },
          }).onclick = (e) => {
            e.stopPropagation();
            openEditRenewalPhase(app, plugin, api, phase, idx, () => {
              refreshList();
              onOuterRefresh?.();
            });
          };
          headActions.createEl("button", {
            text: "删除",
            cls: "plg-btn-plain plg-sub-phase-btn plg-sub-phase-btn-danger",
            attr: { type: "button" },
          }).onclick = (e) => {
            e.stopPropagation();
            confirmPlgAction({
              title: `删除 · 阶段 ${idx + 1}`,
              message: api.deleteConfirmMsg(phase.periods),
              confirmText: "删除",
              danger: true,
              onConfirm: async () => {
                for (const t of phase.txs) {
                  await plugin.store.deleteTransaction(t.id);
                }
                plugin.refreshView?.();
                refreshList();
                onOuterRefresh?.();
                new Notice(api.deleteNotice(phase.periods));
              },
            });
          };
          const detail = block.createDiv({ cls: "plg-sub-phase-detail hidden" });
          phase.txs.slice().sort((a, b) => a.datetime.localeCompare(b.datetime)).forEach((t) => {
            const row = detail.createDiv({ cls: "plg-sub-history-row plg-sub-phase-tx-row plg-tx-history-row-clickable" });
            row.createSpan({ cls: "plg-sub-history-date", text: t.datetime.slice(0, 16) });
            row.createSpan({ cls: "plg-sub-history-amt", text: fmtMoney(t.amount) });
            const tag = api.getTxTag(t);
            if (tag) row.createSpan({ cls: "plg-sub-phase-tx-tag", text: tag });
            if (t.note) row.createSpan({ cls: "plg-sub-history-note plg-muted", text: t.note });
            row.onclick = () => {
              openEditTransaction(app, plugin, { ...t }, () => {
                plugin.refreshView?.();
                refreshList();
                onOuterRefresh?.();
              }, async () => {
                await plugin.store.deleteTransaction(t.id);
                plugin.refreshView?.();
                refreshList();
                onOuterRefresh?.();
              });
            };
          });
          headMain.onclick = () => {
            detail.toggleClass("hidden");
            block.toggleClass("open");
          };
        });
      };

      refreshList();
      body.createDiv({ cls: "plg-modal-actions" }).createEl("button", {
        text: "关闭",
        attr: { type: "button" },
      }).onclick = close;
    },
  });
}

function openSubscriptionPhaseHistory(app, plugin, item, onOuterRefresh) {
  openRenewalPhaseHistory(app, plugin, getSubscriptionRenewalApi(item), onOuterRefresh);
}

function openRecurringPhaseHistory(app, plugin, item, onOuterRefresh) {
  openRenewalPhaseHistory(app, plugin, getRecurringRenewalApi(item), onOuterRefresh);
}

function openSubscriptionHistory(app, plugin, item, mode = "auto") {
  if (mode === "auto") {
    openSubscriptionPhaseHistory(app, plugin, item);
    return;
  }
  const allTxs = plugin.store.data.transactions || [];
  openTransactionHistoryDialog(app, plugin, {
    title: `${item.name} · 全部账单`,
    getTransactions: () => txsForSubscriptionStats(item, allTxs),
    onRefresh: () => plugin.refreshView(),
  });
}

function subscriptionExpenseBreakdown(txs, predicate) {
  const filtered = (txs || []).filter((t) => t.flow === "expense" && predicate(t));
  const total = filtered.reduce((s, t) => s + t.amount, 0);
  const map = new Map();
  filtered.forEach((t) => {
    const key = (t.note || t.subcategory || "其他").trim() || "其他";
    map.set(key, (map.get(key) || 0) + t.amount);
  });
  const items = [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, amt]) => ({
      name,
      amt,
      pct: total > 0 ? Math.round((amt / total) * 1000) / 10 : 0,
    }));
  return { total, items };
}

function renderSubMetricPop(parent, lines, emptyText) {
  const pop = parent.createDiv({ cls: "plg-sub-metric-pop" });
  if (!lines.length) {
    pop.createDiv({ cls: "plg-sub-metric-pop-empty", text: emptyText || "暂无数据" });
    return;
  }
  lines.forEach((line) => {
    const row = pop.createDiv({ cls: "plg-sub-metric-pop-row" });
    row.createSpan({ cls: "plg-sub-metric-pop-name", text: line.name });
    row.createSpan({ cls: "plg-sub-metric-pop-amt", text: line.amtText || fmtMoney(line.amt) });
    if (line.pct != null) row.createSpan({ cls: "plg-sub-metric-pop-pct", text: `${line.pct}%` });
    if (line.sub) row.createSpan({ cls: "plg-sub-metric-pop-sub", text: line.sub });
  });
}

function renderSettingsSubscriptions(container, plugin, focusOpts = null) {
  const headRow = container.createDiv({ cls: "plg-sub-head-row" });
  const searchInput = headRow.createEl("input", {
    type: "search",
    cls: "plg-sub-search-input",
    attr: { placeholder: "搜索订阅服务名称" },
  });
  headRow.createEl("button", {
    text: "+ 新增订阅",
    cls: "plg-btn-primary",
    attr: { type: "button" },
  }).onclick = () => {
    openSubscriptionBill(plugin.app, plugin, null, null, () => {
      plugin.refreshView();
      renderAll();
    });
  };

  const searchResults = container.createDiv({ cls: "plg-sub-search-results" });
  searchResults.style.display = "none";

  const overview = container.createDiv({ cls: "plg-sub-overview" });
  const listEl = container.createDiv({ cls: "plg-sub-list", attr: { id: "plg-sub-list-anchor" } });

  const openPreset = (p) => {
    const existing = (plugin.store.data.subscriptions || []).find((s) => s.name === p.name);
    openSubscriptionBill(plugin.app, plugin, existing ? { ...existing } : null, p, () => {
      plugin.refreshView();
      renderAll();
    });
  };

  const renderSearch = () => {
    const q = searchInput.value.trim().toLowerCase();
    searchResults.empty();
    if (!q) {
      searchResults.style.display = "none";
      return;
    }
    const presets = SUBSCRIPTION_PRESETS.filter((p) =>
      p.name.toLowerCase().includes(q) || (p.subcategory || "").toLowerCase().includes(q)
    );
    const custom = (plugin.store.data.subscriptions || []).filter((s) =>
      s.name.toLowerCase().includes(q) && !presets.some((p) => p.name === s.name)
    );
    if (!presets.length && !custom.length) {
      searchResults.createDiv({ cls: "plg-empty", text: "未找到匹配的订阅服务" });
      searchResults.style.display = "block";
      return;
    }
    presets.forEach((p) => {
      const cell = searchResults.createDiv({ cls: "plg-sub-search-cell", attr: { title: p.name } });
      renderSubscriptionIcon(cell, p, plugin);
      cell.createDiv({ cls: "plg-sub-search-name", text: p.name });
      cell.onclick = () => openPreset(p);
    });
    custom.forEach((s) => {
      const cell = searchResults.createDiv({ cls: "plg-sub-search-cell", attr: { title: s.name } });
      renderSubscriptionIcon(cell, enrichSubscriptionItem(s, plugin.store.data), plugin);
      cell.createDiv({ cls: "plg-sub-search-name", text: s.name });
      cell.onclick = () => {
        openSubscriptionBill(plugin.app, plugin, { ...s }, null, () => {
          plugin.refreshView();
          renderAll();
        });
      };
    });
    searchResults.style.display = "grid";
  };

  searchInput.addEventListener("input", renderSearch);

  const renderAll = () => {
    renderOverview();
    renderList();
    renderSearch();
  };

  const renderOverview = () => {
    overview.empty();
    const metricsGrid = overview.createDiv({ cls: "plg-sub-metrics-grid" });
    const subs = plugin.store.data.subscriptions || [];
    const subTxs = subscriptionTxFilter(plugin.store.data.transactions, subs);
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${pad2(now.getMonth() + 1)}`;
    const yearKey = `${now.getFullYear()}-`;
    const monthBreak = subscriptionExpenseBreakdown(subTxs, (t) => t.datetime.startsWith(monthKey));
    const yearBreak = subscriptionExpenseBreakdown(subTxs, (t) => t.datetime.startsWith(yearKey));
    const totalBreak = subscriptionExpenseBreakdown(subTxs, () => true);
    const firstDate = subTxs.length
      ? subTxs.map((t) => parseDateTime(t.datetime)).sort((a, b) => a - b)[0]
      : null;
    const days = firstDate ? Math.max(1, Math.ceil((now - firstDate) / 86400000)) : 1;
    const daily = totalBreak.total / days;
    const activeSubs = subs.filter((s) => isSubscriptionRenewing(s));
    const pausedSubs = subs.filter((s) => !isSubscriptionRenewing(s));
    const allTxs = plugin.store.data.transactions || [];

    [
      {
        label: "总支出",
        val: fmtMoney(totalBreak.total),
        cls: "green",
        icon: "💳",
        popLines: totalBreak.items.map((i) => ({ name: i.name, amt: i.amt, pct: i.pct })),
        popEmpty: "暂无订阅支出",
      },
      {
        label: "本年支出",
        val: fmtMoney(yearBreak.total),
        cls: "teal",
        icon: "🗓️",
        popLines: yearBreak.items.map((i) => ({ name: i.name, amt: i.amt, pct: i.pct })),
        popEmpty: "本年暂无订阅支出",
      },
      {
        label: "本月支出",
        val: fmtMoney(monthBreak.total),
        cls: "blue",
        icon: "📅",
        popLines: monthBreak.items.map((i) => ({ name: i.name, amt: i.amt, pct: i.pct })),
        popEmpty: "本月暂无订阅支出",
      },
      {
        label: "日均支出",
        val: fmtMoney(daily),
        cls: "orange",
        icon: "📈",
        popLines: totalBreak.items.map((i) => ({
          name: i.name,
          amt: i.amt,
          pct: i.pct,
          sub: `日均 ${fmtMoney(i.amt / days)}`,
        })),
        popEmpty: "暂无订阅支出",
      },
      {
        label: "自动续费",
        val: String(activeSubs.length),
        cls: "purple",
        icon: "🔄",
        popLines: [
          ...activeSubs.map((s) => ({
            name: s.name,
            amtText: fmtMoney(s.amount),
            sub: formatRecurringLabel(s),
          })),
          ...pausedSubs.map((s) => {
            const st = subscriptionItemStats(s, allTxs);
            return {
              name: s.name,
              amtText: fmtMoney(st.amount),
              sub: "已暂停 · 不计入自动续费",
            };
          }),
        ],
        popEmpty: "暂无生效中的订阅",
        onClick: () => listEl.scrollIntoView({ behavior: "smooth", block: "start" }),
      },
    ].forEach((m) => {
      const card = metricsGrid.createDiv({ cls: `plg-sub-metric ${m.cls}` + (m.popLines ? " has-pop" : "") });
      card.createDiv({ cls: "plg-sub-metric-icon", text: m.icon });
      card.createDiv({ cls: "plg-sub-metric-label", text: m.label });
      card.createDiv({ cls: "plg-sub-metric-val", text: m.val });
      renderSubMetricPop(card, m.popLines, m.popEmpty);
      if (m.onClick) {
        card.addClass("clickable");
        card.onclick = m.onClick;
      }
    });
  };

  const renderList = () => {
    listEl.empty();
    const items = plugin.store.data.subscriptions || [];
    const allTxs = plugin.store.data.transactions || [];
    if (!items.length) {
      listEl.createDiv({ cls: "plg-empty", text: "暂无订阅，可搜索服务名称或点「新增订阅」" });
      return;
    }
    items.forEach((item) => {
      normalizeSingleSubscriptionPhases(item);
      const renewing = isSubscriptionRenewing(item);
      const enriched = enrichSubscriptionItem(item, plugin.store.data);
      const stats = subscriptionRenewalDisplayStats(item, allTxs);
      const card = listEl.createDiv({
        cls: "plg-sub-card plg-recurring-card plg-sub-card-clickable plg-sub-card-v2" + (renewing ? "" : " paused"),
      });
      card.dataset.subId = item.id;

      const openAllHistory = () => openSubscriptionHistory(plugin.app, plugin, item, "all");

      const top = card.createDiv({ cls: "plg-sub-card-top" });
      const identity = top.createDiv({ cls: "plg-sub-card-identity" });
      const label = identity.createDiv({ cls: "plg-recurring-icon plg-cat-label plg-sub-cat-label" });
      renderCategoryIcon(label, enriched);
      const textCol = label.createDiv({ cls: "plg-cat-label-text" });
      const nameRow = textCol.createDiv({ cls: "plg-sub-card-name-row" });
      nameRow.createSpan({ cls: "plg-sub-card-name", text: item.name });
      nameRow.createSpan({
        cls: "plg-sub-card-badge" + (renewing ? " is-active" : " is-paused"),
        text: renewing ? "续费中" : "已暂停",
      });
      textCol.createDiv({
        cls: "plg-sub-card-meta plg-muted",
        text: subscriptionCardSubMeta(item),
      });
      const statsParts = [];
      const fullStats = subscriptionItemStats(item, allTxs);
      if (fullStats.periods > stats.periods) {
        statsParts.push(`含 ${fullStats.periods - stats.periods} 笔未计入续费记录`);
      }
      const statsHint = statsParts.length ? ` · ${statsParts.join(" · ")}` : "";
      textCol.createDiv({
        cls: "plg-sub-card-stats",
        text: renewing
          ? `开始 ${stats.start} · 已扣 ${stats.periods} 期 · ${fmtMoney(stats.amount)}${statsHint}`
          : `开始 ${stats.start} · ${stats.periods} 笔 · 累计 ${fmtMoney(stats.amount)}${statsHint}`,
      });

      const side = top.createDiv({ cls: "plg-sub-card-side" });
      if (renewing) {
        side.createDiv({ cls: "plg-sub-card-next", text: `下一笔 ${item.nextDate || "—"}` });
      } else {
        const pauseHint = item.pausedAt ? `已于 ${item.pausedAt} 暂停` : "已暂停 · 不自动续费";
        side.createDiv({
          cls: "plg-sub-card-next paused",
          text: stats.amount > 0 ? `累计 ${fmtMoney(stats.amount)}` : "暂无支出",
        });
        side.createDiv({ cls: "plg-sub-card-side-hint", text: pauseHint });
      }
      side.onclick = (e) => {
        e.stopPropagation();
        openSubscriptionPhaseHistory(plugin.app, plugin, item, () => renderAll());
      };

      card.onclick = (e) => {
        if (e.target.closest("button, .plg-sub-card-actions, .plg-sub-card-side")) return;
        openAllHistory();
      };

      const actions = card.createDiv({ cls: "plg-sub-card-actions" });
      actions.createEl("button", {
        text: "续费记录",
        cls: "plg-btn-ghost",
        attr: { type: "button" },
      }).onclick = (e) => {
        e.stopPropagation();
        openSubscriptionPhaseHistory(plugin.app, plugin, item, () => renderAll());
      };
      actions.createEl("button", { text: "编辑", cls: "plg-btn-ghost", attr: { type: "button" } }).onclick = (e) => {
        e.stopPropagation();
        openSubscriptionBill(plugin.app, plugin, { ...item }, null, () => renderAll());
      };
      actions.createEl("button", {
        text: renewing ? "暂停" : "开启新阶段",
        cls: renewing ? "plg-btn-ghost" : "plg-btn-primary",
        attr: { type: "button" },
      }).onclick = async (e) => {
        e.stopPropagation();
        if (renewing) {
          closeSubscriptionPhase(item, dateKey(new Date()));
          await plugin.store.saveSubscription(item);
          plugin.refreshView?.();
          renderAll();
        } else {
          openStartNewSubscriptionPhase(plugin.app, plugin, item, () => renderAll());
        }
      };
      actions.createEl("button", { text: "删除", cls: "plg-btn-ghost", attr: { type: "button" } }).onclick = (e) => {
        e.stopPropagation();
        confirmPlgAction({
          title: "删除订阅规则",
          message: "确定删除这条订阅规则吗？已入账的历史账单不会被删除。",
          confirmText: "删除",
          danger: true,
          onConfirm: async () => {
            await plugin.store.deleteSubscription(item.id);
            renderAll();
          },
        });
      };
    });
  };

  renderAll();
  if (focusOpts?.section === "subscription" && focusOpts.id) {
    requestAnimationFrame(() => {
      listEl.scrollIntoView({ behavior: "smooth", block: "start" });
      const el = listEl.querySelector(`[data-sub-id="${focusOpts.id}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.addClass("plg-settings-focus-highlight");
        window.setTimeout(() => el.removeClass("plg-settings-focus-highlight"), 2400);
      }
    });
  }
}
