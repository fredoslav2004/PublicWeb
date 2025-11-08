// script.js — preview + optional manifest-based rendering (no jQuery)
(() => {
  const PREVIEWABLE = new Set(["pdf", "txt", "md", "log"]);

  document.addEventListener("DOMContentLoaded", async () => {
    // 1) If you already have anchors inside #resources-list, don't rebuild.
    const list = document.getElementById("resources-list");
    if (list && !list.querySelector("a.resource-link")) {
      await tryBuildFromManifest(list);  // builds from resources.txt if present
    }
    wirePreview();
    console.log("Preview ready.");
  });

  // ----------------------- Build (optional) -----------------------
  async function tryBuildFromManifest(container) {
    // Optional base folder: <div id="resources-list" data-base="resources/">
    const base = (container?.dataset?.base || "").trim(); // e.g., "resources/"
    const manifestNames = ["resources.txt", "./resources.txt"];

    let text = null;
    for (const name of manifestNames) {
      try {
        const r = await fetch(name, { cache: "no-cache" });
        if (r.ok) { text = await r.text(); break; }
      } catch { /* ignore and try next */ }
    }
    if (!text) {
      console.warn("No resources.txt found. Either add tiles in HTML or create resources.txt.");
      return;
    }

    const lines = text.split(/\r?\n/)
      .map(s => s.trim())
      .filter(s => s && !s.startsWith("#"));

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
      // Absolute http(s) → leave; else join with base, else leave relative to page.
      if (/^https?:\/\//i.test(path)) return path;
      if (base) return base.replace(/\/?$/, "/") + path.replace(/^\//, "");
      return path; // relative to current document
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
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const a = e.target.closest("a");
      if (!a) return;

      const isResource = a.classList.contains("resource-link") || !!a.closest(".resource");
      const wantsPreview = a.dataset.preview === "true" || isResource;
      if (!wantsPreview) return;

      const href = a.getAttribute("href");
      if (!href) return;

      const url = new URL(href, window.location.href).toString();
      const ext = fileExt(url);

      if (!PREVIEWABLE.has(ext)) return; // let normal nav proceed

      e.preventDefault();
      openPreview(url, ext);
    });

    const closeBtn = document.querySelector(".preview-close");
    if (closeBtn) closeBtn.addEventListener("click", closePreview);

    const backdrop = document.getElementById("preview-backdrop");
    if (backdrop) backdrop.addEventListener("click", (evt) => {
      if (evt.target === backdrop) closePreview();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closePreview();
    });
  }

  function openPreview(url, ext) {
    const backdrop = document.getElementById("preview-backdrop");
    const content  = document.getElementById("preview-content");
    const download = document.querySelector(".preview-download");
    if (!backdrop || !content || !download) { window.location.href = url; return; }

    content.innerHTML = "";
    download.setAttribute("href", url);

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
        .then(r => {
          if (!r.ok) throw new Error("HTTP " + r.status);
          const ct = (r.headers.get("content-type") || "").toLowerCase();
          if (ct && !(ct.includes("text") || ct.includes("json"))) throw new Error("not-text");
          return r.text();
        })
        .then(text => {
          const pre = document.createElement("pre");
          pre.className = "preview-text";
          pre.textContent = text;
          content.appendChild(pre);
          show();
          content.setAttribute("tabindex", "0");
          content.focus();
        })
        .catch(() => { window.location.href = url; });
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
    const content  = document.getElementById("preview-content");
    if (content) content.innerHTML = "";
    if (backdrop) backdrop.setAttribute("hidden", "hidden");
    document.documentElement.style.overflow = "";
  }

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
})();
