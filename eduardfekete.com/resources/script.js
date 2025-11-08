// script.js — preview + deep-link share
(() => {
  const PREVIEWABLE = new Set(["pdf", "txt", "md", "log"]);
  let currentPreviewUrl = null;

  document.addEventListener("DOMContentLoaded", async () => {
    const list = document.getElementById("resources-list");
    if (list && !list.querySelector("a.resource-link")) {
      await tryBuildFromManifest(list);
    }
    wirePreview();
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

    const lines = text
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter((s) => s && !s.startsWith("#"));
    container.innerHTML = "";
    for (const raw of lines) {
      const url = toUrl(raw, base);
      const name = decodeURIComponent(url.split("/").pop() || raw);
      const ext = fileExt(url);

      const a = document.createElement("a");
      a.href = url;
      a.className = "resource-link";
      a.dataset.preview = "true";

      const tile = document.createElement("div");
      tile.className = "resource";

      const img = document.createElement("img");
      img.alt = ext ? ext.toUpperCase() : "File";
      img.src = iconFor(ext);

      const p = document.createElement("p");
      p.textContent = name;

      tile.append(img, p);
      a.appendChild(tile);
      container.appendChild(a);
    }

    function toUrl(path, base) {
      if (/^https?:\/\//i.test(path)) return path;
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

      const isResource =
        a.classList.contains("resource-link") || !!a.closest(".resource");
      const wantsPreview = a.dataset.preview === "true" || isResource;
      if (!wantsPreview) return;

      const href = a.getAttribute("href");
      if (!href) return;

      const url = new URL(href, window.location.href).toString();
      const ext = fileExt(url);
      if (!PREVIEWABLE.has(ext)) return; // allow normal nav

      e.preventDefault();
      openPreview(url, ext, /*updateHistory*/ true);
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

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closePreview();
    });
  }

  function openPreview(url, ext, updateHistory = true) {
    const backdrop = document.getElementById("preview-backdrop");
    const content = document.getElementById("preview-content");
    const download = document.querySelector(".preview-download");
    if (!backdrop || !content || !download) {
      window.location.href = url;
      return;
    }

    currentPreviewUrl = url;
    content.innerHTML = "";
    download.setAttribute("href", url);

    if (updateHistory) pushPreviewParam(url);

    if (ext === "pdf") {
      const iframe = document.createElement("iframe");
      iframe.title = "PDF preview";
      iframe.src = url + (url.includes("#") ? "" : "#view=FitH");
      content.appendChild(iframe);
      show();
      return;
    }

    if (ext === "txt" || ext === "md" || ext === "log") {
      fetch(url, { cache: "no-cache" })
        .then((r) => {
          if (!r.ok) throw new Error("HTTP " + r.status);
          const ct = (r.headers.get("content-type") || "").toLowerCase();
          if (ct && !(ct.includes("text") || ct.includes("json")))
            throw new Error("not-text");
          return r.text();
        })
        .then((text) => {
          const pre = document.createElement("pre");
          pre.className = "preview-text";
          pre.textContent = text;
          content.appendChild(pre);
          show();
          content.setAttribute("tabindex", "0");
          content.focus();
        })
        .catch(() => {
          window.location.href = url;
        });
      return;
    }

    window.location.href = url;

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
})();
