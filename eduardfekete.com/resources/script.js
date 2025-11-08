"use strict";

$(function () {
  loadResourcesList("resources.txt");
});

function loadResourcesList(resourceTxtUrl) {
  $.get(resourceTxtUrl)
    .done(function (data) {
      const lines = data
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith("#"));

      let $container = $("#resources-list");
      if (!$container.length) {
        $container = $("<div>", { id: "resources-list" }).appendTo("body");
      } else {
        $container.empty();
      }

      const iconMap = {
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
      };

      lines.forEach(function (raw) {
        const name = raw.split("/").pop().split("\\").pop();
        const url =
          "https://eduardfekete.com/resources/src/" + encodeURIComponent(name);

        const ext = (name.split(".").pop() || "").toLowerCase();
        const iconSrc = iconMap[ext] || "img/file_icon.png";

        const $item = $("<a>", {
          href: url,
          target: "_blank",
          rel: "noopener noreferrer",
        });

        const $resourceDiv = $("<div>", { class: "resource" });
        const $img = $("<img>", {
          src: iconSrc,
          alt: ext ? ext.toUpperCase() : "File",
        });
        const $p = $("<p>").text(name);

        $resourceDiv.append($img, $p);
        $item.append($resourceDiv);
        $container.append($item);
      });
    })
    .fail(function (jqxhr, status, err) {
      console.error("Error loading resources:", status, err);
    });
}
