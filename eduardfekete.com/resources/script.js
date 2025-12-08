// script.js — preview + deep-link share
(() => {
  const PREVIEWABLE = new Set(["pdf", "txt", "md", "log"]);
  let currentPreviewUrl = null;
  let MANIFEST_TREE = null;
  let CURRENT_PATH = []; // array of numeric indices representing current folder

  document.addEventListener("DOMContentLoaded", async () => {
    const list = document.getElementById("resources-list");
    if (list && !list.querySelector("a.resource-link")) {
      await tryBuildFromManifest(list);
    }
    wirePreview();
    initThemeToggle();
    // Deep-link: open if ?preview=<url> present
    const fromParam = getPreviewParam();
    if (fromParam)
      openPreview(fromParam, fileExt(fromParam), /*updateHistory*/ false);
  });

  // ----------------------- Build (optional) -----------------------
  async function tryBuildFromManifest(container) {
    const base = (container?.dataset?.base || "").trim();
    const manifestNames = ["resources.txt", "./resources.txt"];
    let text = null;
    for (const name of manifestNames) {
      try {
        const r = await fetch(name, { cache: "no-cache" });
        if (r.ok) {
          text = await r.text();
          break;
        }
      } catch {
        /* ignore */
      }
    }
    if (!text) return;

    // Build a nested tree using indentation levels.
    const rawLines = text.split(/\r?\n/);
    const root = [];
    const stack = [{ indent: -1, children: root }];

    function toUrl(path, base) {
      // Accept absolute URLs (http:, https:, data:, etc.) and protocol-relative URLs.
      // Also accept other schemes (mailto:, data:, etc.) so full web URLs are preserved.
      if (/^[a-z][a-z0-9+.-]*:/i.test(path)) return path; // scheme:...
      // Protocol-relative URLs like //example.com/path -> preserve with current protocol
      if (/^\/\//.test(path)) return window.location.protocol + path;
      if (base) return base.replace(/\/?$/, "/") + path.replace(/^\//, "");
      return path;
    }
    function iconFor(ext) {
      const map = {
        pdf: "img/pdf_icon.png",
        png: "img/image_icon.png",
        jpg: "img/image_icon.png",
        jpeg: "img/image_icon.png",
        gif: "img/image_icon.png",
        svg: "img/image_icon.png",
        doc: "img/docs_icon.png",
        docx: "img/docs_icon.png",
        ppt: "img/presentation_icon.png",
        pptx: "img/presentation_icon.png",
        txt: "img/docs_icon.png",
        md: "img/docs_icon.png",
        log: "img/docs_icon.png",
      };
      return map[ext] || "img/file_icon.png";
    }

    for (const raw of rawLines) {
      if (!raw) continue;
      const leading = raw.match(/^\s*/)[0].length;
      const trimmed = raw.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      // Pop to the correct parent based on indentation
      while (leading <= stack[stack.length - 1].indent) stack.pop();

      if (trimmed.endsWith("/")) {
        // Folder node
        const folderName = trimmed.replace(/\/$/, "").trim();
        const folderNode = { type: "folder", name: decodeSafe(folderName), children: [] };
        stack[stack.length - 1].children.push(folderNode);
        // New context for this folder's children
        stack.push({ indent: leading, children: folderNode.children });
      } else {
        // File node: "<name> <path>" (last token = path)
        const parts = trimmed.split(/\s+/);
        let givenName = null;
        let pathPart = null;
        if (parts.length === 1) {
          pathPart = parts[0];
        } else {
          pathPart = parts[parts.length - 1];
          givenName = parts.slice(0, parts.length - 1).join(" ").trim() || null;
        }
        const url = toUrl(pathPart, base);
        let name = givenName;
        if (!name) {
          try {
            name = decodeURIComponent(new URL(url, window.location.href).pathname.split("/").pop() || pathPart);
          } catch {
            name = pathPart;
          }
        } else {
          try { name = decodeURIComponent(name); } catch { /* keep given */ }
        }
        const ext = fileExt(url);
        const fileNode = { type: "file", name: name, url: url, ext: ext };
        stack[stack.length - 1].children.push(fileNode);
      }
    }

    // Save manifest tree and render root
    MANIFEST_TREE = root;
    CURRENT_PATH = [];
    renderNodes(container, MANIFEST_TREE, []);

    function decodeSafe(s) {
      try { return decodeURIComponent(s); } catch { return s; }
    }
  }

  // Render helpers and folder navigation
  function renderNodes(container, nodes, pathIndices) {
    container.innerHTML = "";

    // If not root, add an "Up" tile to go to parent
    if (pathIndices.length > 0) {
      const parentPath = pathIndices.slice(0, -1).join(",");
      const upA = document.createElement("a");
      upA.href = "#";
      upA.className = "resource-link resource-up";
      upA.dataset.preview = "folder";
      upA.dataset.folderPath = parentPath;

      const tile = document.createElement("div");
      tile.className = "resource";
      const img = document.createElement("img");
      img.alt = "Back";
      img.src = "img/folder_icon.png";
      const p = document.createElement("p");
      p.textContent = "Back";
      tile.append(img, p);
      upA.appendChild(tile);
      container.appendChild(upA);
    }

    nodes.forEach((node, idx) => {
      const a = document.createElement("a");
      a.className = "resource-link";
      // expose metadata for click handler (helps for absolute / external URLs)
      if (node.type === "file") {
        a.dataset.ext = node.ext || "";
        a.dataset.url = node.url || "";
      }
      const tile = document.createElement("div");
      tile.className = "resource";
      const img = document.createElement("img");
      const p = document.createElement("p");

      if (node.type === "folder") {
        a.dataset.preview = "folder";
        const newPath = pathIndices.concat(idx);
        a.dataset.folderPath = newPath.join(",");
        a.href = "#";
        img.alt = "Folder";
        img.src = "img/folder_icon.png";
        p.textContent = node.name || "Folder";
      } else {
        a.dataset.preview = "true";
        a.href = node.url;
        // If this file URL is a YouTube link, show the YouTube icon; otherwise fall back to ext-based icon.
        if (isYouTube(node.url)) {
          img.alt = "YouTube";
          img.src = "img/youtube_icon.png";
        } else if (isWebsitePreviewable(node.url, node.ext)) {
          // Try to use the site's favicon, fall back to docs icon if it fails.
          try {
            const u = new URL(node.url, window.location.href);
            const fav = u.origin.replace(/\/$/, "") + "/favicon.ico";
            img.alt = "Website";
            img.src = fav;
            img.onerror = () => {
              img.onerror = null;
              img.src = "img/docs_icon.png";
            };
          } catch {
            img.alt = "Website";
            img.src = "img/docs_icon.png";
          }
        } else {
          img.alt = node.ext ? node.ext.toUpperCase() : "File";
          // use existing icon map fallback
          img.src = (function (ext) {
            const map = {
              pdf: "img/pdf_icon.png",
              png: "img/image_icon.png",
              jpg: "img/image_icon.png",
              jpeg: "img/image_icon.png",
              gif: "img/image_icon.png",
              svg: "img/image_icon.png",
              doc: "img/docs_icon.png",
              docx: "img/docs_icon.png",
              ppt: "img/presentation_icon.png",
              pptx: "img/presentation_icon.png",
              txt: "img/docs_icon.png",
              md: "img/docs_icon.png",
              log: "img/docs_icon.png",
            };
            return map[ext] || "img/file_icon.png";
          })(node.ext);
        }
        p.textContent = node.name || node.url;
      }

      tile.append(img, p);
      a.appendChild(tile);
      container.appendChild(a);
    });
  }

  function openFolderByPath(container, pathStr) {
    const path = pathStr === "" ? [] : pathStr.split(",").filter(Boolean).map((n) => parseInt(n, 10));
    const node = getNodeByPath(path);
    if (!node) return;
    const nodesToRender = node === MANIFEST_TREE ? MANIFEST_TREE : (node.children || []);
    CURRENT_PATH = path.slice();
    renderNodes(container, nodesToRender, CURRENT_PATH);
  }

  function getNodeByPath(path) {
    if (!MANIFEST_TREE) return null;
    if (!path || path.length === 0) return MANIFEST_TREE;
    let cur = { children: MANIFEST_TREE };
    for (const idx of path) {
      if (!cur.children || !cur.children[idx]) return null;
      cur = cur.children[idx];
    }
    return cur;
  }

  // ----------------------- Preview wiring -----------------------
  function wirePreview() {
    document.addEventListener("click", (e) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const a = e.target.closest("a");
      if (!a) return;

      // Allow opt-out anchors (e.g. site header/home link) to navigate normally
      if (a.classList.contains("no-preview")) return;

      // Folder navigation: anchors created for folders carry dataset.preview="folder"
      if (a.dataset.preview === "folder") {
        e.preventDefault();
        const list = document.getElementById("resources-list");
        const path = a.dataset.folderPath || ""; // "" = root
        openFolderByPath(list, path);
        return;
      }

      // If there's no href and no data-url, nothing to do
      const href = a.getAttribute("href");
      const metaUrl = a.dataset.url;
      if (!href && !metaUrl) return;

      // Prefer metadata provided by renderNodes (robust for absolute/external links)
      let resolvedUrl = metaUrl || href;
      try {
        // normalize to absolute form
        resolvedUrl = new URL(resolvedUrl, window.location.href).toString();
      } catch {
        // if URL constructor fails, try using href directly (will likely be navigated normally)
        resolvedUrl = metaUrl || href;
      }

      // Prefer data-ext when present; otherwise derive via fileExt
      const metaExt = (a.dataset.ext || "").toLowerCase();
      const ext = metaExt || fileExt(resolvedUrl);

      const isResource =
        a.classList.contains("resource-link") || !!a.closest(".resource");
      // Decide: previewable OR YouTube OR website-like => preview, otherwise open in a new tab.
      const wantsPreview =
        a.dataset.preview === "true" ||
        isResource ||
        PREVIEWABLE.has(ext) ||
        isYouTube(resolvedUrl) ||
        isWebsitePreviewable(resolvedUrl, ext);

      if (!wantsPreview) {
        // Not a previewable resource — open in new tab so current tab remains on the site.
        e.preventDefault();
        window.open(resolvedUrl, "_blank", "noopener");
        return;
      }

      // If it's previewable (PDF/TXT/MD/LOG), YouTube, or website-like, prevent default and open the preview.
      if (PREVIEWABLE.has(ext) || isYouTube(resolvedUrl) || isWebsitePreviewable(resolvedUrl, ext)) {
        e.preventDefault();
        openPreview(resolvedUrl, ext, /*updateHistory*/ true);
      }
    });

    const closeBtn = document.querySelector(".preview-close");
    if (closeBtn) closeBtn.addEventListener("click", closePreview);

    const backdrop = document.getElementById("preview-backdrop");
    if (backdrop)
      backdrop.addEventListener("click", (evt) => {
        if (evt.target === backdrop) closePreview();
      });

    const shareBtn = document.querySelector(".preview-share");
    if (shareBtn) {
      shareBtn.addEventListener("click", async () => {
        if (!currentPreviewUrl) return;
        const link = buildPreviewLink(currentPreviewUrl);
        try {
          await copyToClipboard(link);
          flashShareFeedback(shareBtn, "Copied!");
        } catch {
          flashShareFeedback(shareBtn, "Copy failed");
        }
      });
    }

    const rawShareBtn = document.querySelector(".preview-share-raw");
    if (rawShareBtn) {
      rawShareBtn.addEventListener("click", async () => {
        if (!currentPreviewUrl) return;
        const raw = buildRawLink(currentPreviewUrl);
        try {
          await copyToClipboard(raw);
          flashShareFeedback(rawShareBtn, "Copied!");
        } catch {
          flashShareFeedback(rawShareBtn, "Copy failed");
        }
      });
    }

    // Prevent the download link(s) from navigating if they're marked disabled.
    const downloadCtrls = Array.from(document.querySelectorAll(".preview-download"));
    for (const d of downloadCtrls) {
      d.addEventListener("click", (ev) => {
        if (d.getAttribute("aria-disabled") === "true") {
          ev.preventDefault();
        }
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closePreview();
    });
  }

  function openPreview(url, ext, updateHistory = true) {
    const backdrop = document.getElementById("preview-backdrop");
    const content = document.getElementById("preview-content");
    const downloads = Array.from(document.querySelectorAll(".preview-download"));
    if (!backdrop || !content || !downloads.length) {
      // No preview UI available — open resource in a new tab instead of navigating current tab.
      window.open(url, "_blank", "noopener");
      return;
    }

    currentPreviewUrl = url;
    content.innerHTML = "";

    // Set or remove download link depending on content type (YouTube or website-like => no download)
    const isYT = isYouTube(url);
    const isWebsite = isWebsitePreviewable(url, ext);
    if (isYT || isWebsite) {
      for (const d of downloads) {
        d.removeAttribute("href");
        d.removeAttribute("download");
        d.setAttribute("aria-disabled", "true");
        d.classList.add("disabled");
        d.style.pointerEvents = "none";
        d.style.opacity = "0.45";
        d.setAttribute("tabindex", "-1");
      }
    } else {
      for (const d of downloads) {
        d.setAttribute("href", url);
        d.setAttribute("download", "");
        d.removeAttribute("aria-disabled");
        d.classList.remove("disabled");
        d.style.pointerEvents = "";
        d.style.opacity = "";
        d.removeAttribute("tabindex");
      }
    }
    if (updateHistory) pushPreviewParam(url);

    // Handle YouTube embeds
    if (isYouTube(url)) {
      const embed = youtubeEmbedUrl(url);
      if (!embed) {
        // Can't build an embed -> open in a new tab
        window.open(url, "_blank", "noopener");
        return;
      }
      const iframe = document.createElement("iframe");
      iframe.title = "YouTube preview";
      iframe.src = embed;
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
      iframe.setAttribute("allowfullscreen", "");
      content.appendChild(iframe);
      show();
      return;
    }

    if (ext === "pdf") {
      const iframe = document.createElement("iframe");
      iframe.title = "PDF preview";
      iframe.src = url + (url.includes("#") ? "" : "#view=FitH");
      content.appendChild(iframe);
      show();
      return;
    }

    if (ext === "txt" || ext === "md" || ext === "log") {
      const iframe = document.createElement("iframe");
      iframe.title = "Text preview";
      iframe.src = url;
      content.appendChild(iframe);
      show();
      return;
    }

    // Treat website-like resources (no ext or html/htm) as embeddable websites
    if (isWebsitePreviewable(url, ext)) {
      const iframe = document.createElement("iframe");
      iframe.title = "Website preview";
      iframe.src = url;
      iframe.setAttribute("frameborder", "0");
      // allow same set of features as YouTube embed where reasonable
      iframe.setAttribute("allow", "clipboard-write; encrypted-media; picture-in-picture");
      content.appendChild(iframe);
      show();
      return;
    }

    // Unknown/unhandled type — open in a new tab.
    window.open(url, "_blank", "noopener");

    function show() {
      backdrop.removeAttribute("hidden");
      document.documentElement.style.overflow = "hidden";
    }
  }

  function closePreview() {
    const backdrop = document.getElementById("preview-backdrop");
    const content = document.getElementById("preview-content");
    if (content) content.innerHTML = "";
    if (backdrop) backdrop.setAttribute("hidden", "hidden");

    // Clean up download link state when closing
    const downloads = Array.from(document.querySelectorAll(".preview-download"));
    for (const d of downloads) {
      d.removeAttribute("href");
      d.removeAttribute("aria-disabled");
      d.classList.remove("disabled");
      d.removeAttribute("download");
      d.style.pointerEvents = "";
      d.style.opacity = "";
      d.removeAttribute("tabindex");
    }

    document.documentElement.style.overflow = "";
    currentPreviewUrl = null;
    popPreviewParam(); // clean URL
  }

  // ----------------------- Deep-link helpers -----------------------
  function buildPreviewLink(fileUrl) {
    const u = new URL(window.location.href);
    // Prefer absolute URL to the resource but keep same-origin paths compact
    const absFile = new URL(fileUrl, window.location.origin).toString();
    u.searchParams.set("preview", absFile);
    return u.toString();
  }

  // Build an absolute direct link to the resource (no preview param)
  function buildRawLink(fileUrl) {
    return new URL(fileUrl, window.location.origin).toString();
  }

  function pushPreviewParam(fileUrl) {
    const u = new URL(window.location.href);
    const absFile = new URL(fileUrl, window.location.origin).toString();
    u.searchParams.set("preview", absFile);
    history.pushState({ preview: absFile }, "", u.toString());
  }

  function popPreviewParam() {
    const u = new URL(window.location.href);
    if (!u.searchParams.has("preview")) return;
    u.searchParams.delete("preview");
    history.replaceState({}, "", u.toString());
  }

  function getPreviewParam() {
    const u = new URL(window.location.href);
    const p = u.searchParams.get("preview");
    return p ? p : null;
  }

  // ----------------------- Utilities -----------------------
  function fileExt(url) {
    try {
      const u = new URL(url, window.location.href);
      const p = u.pathname.toLowerCase();
      const i = p.lastIndexOf(".");
      return i >= 0 ? p.slice(i + 1) : "";
    } catch {
      const m = /\.([a-z0-9]+)(?:\?|#|$)/i.exec(url);
      return m ? m[1].toLowerCase() : "";
    }
  }

  // New: detect YouTube URLs
  function isYouTube(url) {
    try {
      const u = new URL(url, window.location.href);
      const host = u.hostname.toLowerCase();
      return host === "youtu.be" || host.endsWith(".youtube.com");
    } catch {
      return false;
    }
  }

  // New: build an embed URL for a YouTube link, or return null if none
  function youtubeEmbedUrl(url) {
    try {
      const u = new URL(url, window.location.href);
      const host = u.hostname.toLowerCase();
      let id = null;
      if (host === "youtu.be") {
        id = u.pathname.slice(1);
      } else if (host.endsWith("youtube.com")) {
        id = u.searchParams.get("v");
        if (!id) {
          const m = u.pathname.match(/\/(embed|v)\/([^/?]+)/);
          if (m) id = m[2];
        }
      }
      if (!id) return null;
      return "https://www.youtube.com/embed/" + encodeURIComponent(id) + "?rel=0";
    } catch {
      return null;
    }
  }

  // New: detect plain website links (no known extension or explicit html) that should be previewed
  function isWebsitePreviewable(url, ext) {
    try {
      const u = new URL(url, window.location.href);
      if (!/^https?:$/i.test(u.protocol)) return false;
      // treat explicit html extensions as websites, and treat empty extension (paths ending with / or no dot) as websites
      const normalizedExt = (ext || "").toLowerCase();
      if (normalizedExt === "html" || normalizedExt === "htm" || normalizedExt === "") return true;
      return false;
    } catch {
      return false;
    }
  }

  async function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    if (!ok) throw new Error("execCommand failed");
  }

  function flashShareFeedback(btn, msg) {
    const orig = btn.textContent;
    btn.textContent = msg;
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = orig;
      btn.disabled = false;
    }, 1200);
  }

  // ----------------------- Theme toggle -----------------------
  const THEME_KEY = "resources-theme"; // "dark" or "light"
  function initThemeToggle() {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    const saved = localStorage.getItem(THEME_KEY);
    applyTheme(saved === "dark");
    btn.addEventListener("click", () => {
      const nowDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem(THEME_KEY, nowDark ? "dark" : "light");
      updateThemeButton(btn, nowDark);
    });
  }
  function applyTheme(isDark) {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    const btn = document.getElementById("theme-toggle");
    if (btn) updateThemeButton(btn, isDark);
  }
  function updateThemeButton(btn, isDark) {
    btn.setAttribute("aria-pressed", isDark ? "true" : "false");
    btn.textContent = isDark ? "Light mode" : "Dark mode";
  }
  // ----------------------- end theme toggle -----------------------
})();
