// ─── 分类/订阅图标选择（上传 / emoji；在线库已关闭） ─────────────────────────

function svgHtmlToDataUrl(svgHtml) {
  const svg = normalizeIconfontSvg(svgHtml);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function isSvgIconUrl(iconUrl) {
  return String(iconUrl || "").startsWith("data:image/svg+xml");
}

function decodeSvgDataUrl(dataUrl) {
  const raw = String(dataUrl || "");
  const utf8Prefix = "data:image/svg+xml;charset=utf-8,";
  try {
    if (raw.startsWith(utf8Prefix)) return decodeURIComponent(raw.slice(utf8Prefix.length));
    if (raw.startsWith("data:image/svg+xml,")) return decodeURIComponent(raw.slice("data:image/svg+xml,".length));
    const base64Match = raw.match(/^data:image\/svg\+xml;base64,(.+)$/i);
    if (base64Match) return atob(base64Match[1]);
  } catch (_) {
    return "";
  }
  return "";
}

function normalizeIconfontSvg(svgHtml) {
  let s = String(svgHtml || "").trim();
  if (!s) return "";
  s = s.replace(/\sclass="[^"]*"/gi, "");
  s = s.replace(/\sstyle="[^"]*"/gi, "");
  s = s.replace(/fill:\s*currentColor/gi, 'fill="#333333"');
  if (!/xmlns=/i.test(s)) {
    s = s.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  let w = 1024;
  let h = 1024;
  const vb = s.match(/viewBox=["']([^"']+)["']/i);
  if (vb) {
    const parts = vb[1].trim().split(/[\s,]+/).map(Number);
    if (parts.length >= 4 && parts[2] > 0 && parts[3] > 0) {
      w = parts[2];
      h = parts[3];
    }
  }
  s = s.replace(/\swidth="[^"]*"/gi, "").replace(/\sheight="[^"]*"/gi, "");
  s = s.replace(/<svg\b/i, `<svg width="${w}" height="${h}"`);
  return s;
}

async function iconfontSvgToIconUrl(svgHtml) {
  const svg = normalizeIconfontSvg(svgHtml);
  if (!svg) return "";
  const png = await rasterizeSvgToPngDataUrl(svg);
  if (png && png.length > 120) return png;
  return svgHtmlToDataUrl(svg);
}

function rasterizeSvgToPngDataUrl(svg) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const maxPx = 128;
      let w = img.naturalWidth || 0;
      let h = img.naturalHeight || 0;
      if (!w || !h) {
        const vb = svg.match(/viewBox=["']([^"']+)["']/i);
        if (vb) {
          const parts = vb[1].trim().split(/[\s,]+/).map(Number);
          if (parts.length >= 4) { w = parts[2] || 1024; h = parts[3] || 1024; }
        }
      }
      if (!w || !h) { w = 1024; h = 1024; }
      const scale = Math.min(1, maxPx / Math.max(w, h, 1));
      const tw = Math.max(1, Math.round(w * scale));
      const th = Math.max(1, Math.round(h * scale));
      const canvas = document.createElement("canvas");
      canvas.width = tw;
      canvas.height = th;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.drawImage(img, 0, 0, tw, th);
      try {
        const dataUrl = canvas.toDataURL("image/png");
        resolve(dataUrl && dataUrl.length > 120 ? dataUrl : "");
      } catch {
        resolve("");
      }
    };
    img.onerror = () => resolve("");
    img.src = svgHtmlToDataUrl(svg);
  });
}

async function searchIconfontIcons(query, page = 1, pageSize = 24) {
  // 社区 Scorecard：公开包不再请求第三方图标库，避免外网 Disclosure；请用上传 / emoji
  void query;
  void page;
  void pageSize;
  throw new Error("公开包已关闭在线图标搜索，请改用上传图片或输入 emoji");
}

function openIconfontPicker(onPick, opts = {}) {
  let page = 1;
  let query = opts.initialQuery || "";
  let loading = false;
  let debounceTimer = null;

  openPlgOverlay({
    title: "选择图标（已关闭在线搜索）",
    cls: "plg-iconfont-overlay",
    wide: true,
    stack: true,
    build: (body, close) => {
      addClasses(body, "plg-modal", "plg-iconfont-modal");
      body.createDiv({
        cls: "plg-muted plg-iconfont-hint",
        text: "公开包已关闭在线图标库；请关闭本窗后改用「上传」或 emoji",
      });

      const searchRow = body.createDiv({ cls: "plg-iconfont-search" });
      const input = searchRow.createEl("input", {
        type: "search",
        cls: "plg-iconfont-search-input",
        attr: { placeholder: "搜索图标，如：水果、购物车、尿不湿" },
      });
      input.value = query;
      const searchBtn = searchRow.createEl("button", {
        text: "搜索",
        cls: "plg-btn-plain",
        attr: { type: "button" },
      });

      const statusEl = body.createDiv({ cls: "plg-muted plg-iconfont-status", text: "输入关键词后搜索" });
      const grid = body.createDiv({ cls: "plg-iconfont-grid" });
      const foot = body.createDiv({ cls: "plg-iconfont-foot" });
      const prevBtn = foot.createEl("button", { text: "上一页", cls: "plg-btn-plain", attr: { type: "button" } });
      const pageInfo = foot.createSpan({ cls: "plg-iconfont-page", text: "" });
      const nextBtn = foot.createEl("button", { text: "下一页", cls: "plg-btn-plain", attr: { type: "button" } });
      foot.createEl("button", { text: "取消", cls: "plg-btn-plain", attr: { type: "button" } }).onclick = close;

      const renderGrid = (icons) => {
        grid.empty();
        if (!icons.length) {
          grid.createDiv({ cls: "plg-empty", text: "未找到相关图标，换个关键词试试" });
          return;
        }
        icons.forEach((icon) => {
          const cell = grid.createDiv({
            cls: "plg-iconfont-cell",
            attr: { title: String(icon.name || "").trim() || "图标" },
          });
          setSvgContent(cell, normalizeIconfontSvg(icon.show_svg));
          cell.onclick = async () => {
            if (loading) return;
            loading = true;
            statusEl.setText("正在导入图标…");
            try {
              const iconUrl = await iconfontSvgToIconUrl(icon.show_svg);
              onPick?.({
                iconUrl,
                name: String(icon.name || "").trim(),
                iconfontId: icon.id,
              });
              close();
            } catch (e) {
              new Notice(e.message || "导入失败");
              statusEl.setText("导入失败，请重试");
            } finally {
              loading = false;
            }
          };
        });
      };

      const runSearch = async (nextPage = 1) => {
        query = input.value.trim();
        if (!query) {
          statusEl.setText("请输入搜索关键词");
          grid.empty();
          pageInfo.setText("");
          return;
        }
        if (loading) return;
        loading = true;
        page = nextPage;
        statusEl.setText("搜索中…");
        grid.empty();
        grid.createDiv({ cls: "plg-empty", text: "加载中…" });
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        try {
          const { icons, total } = await searchIconfontIcons(query, page, 24);
          renderGrid(icons);
          statusEl.setText(`共 ${total} 个结果`);
          pageInfo.setText(`第 ${page} 页`);
          prevBtn.disabled = page <= 1;
          nextBtn.disabled = icons.length < 24;
        } catch (e) {
          grid.empty();
          grid.createDiv({ cls: "plg-empty", text: "搜索失败，请检查网络后重试" });
          statusEl.setText(e.message || "搜索失败");
          pageInfo.setText("");
        } finally {
          loading = false;
        }
      };

      const scheduleSearch = () => {
        window.clearTimeout(debounceTimer);
        debounceTimer = window.setTimeout(() => runSearch(1), 420);
      };

      input.addEventListener("input", scheduleSearch);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          window.clearTimeout(debounceTimer);
          runSearch(1);
        }
      });
      searchBtn.onclick = () => {
        window.clearTimeout(debounceTimer);
        runSearch(1);
      };
      prevBtn.onclick = () => { if (page > 1) runSearch(page - 1); };
      nextBtn.onclick = () => runSearch(page + 1);

      if (query) runSearch(1);
    },
  });
}

function attachIconfontPickerButton(tools, app, onSelected, draftName = "") {
  const btn = tools.createEl("button", {
    text: "iconfont",
    cls: "plg-btn-plain",
    attr: { type: "button", title: "在线图标搜索已关闭，请用上传或 emoji" },
  });
  btn.onclick = () => {
    openIconfontPicker((picked) => onSelected(picked), {
      initialQuery: draftName || "",
    });
  };
  return btn;
}
