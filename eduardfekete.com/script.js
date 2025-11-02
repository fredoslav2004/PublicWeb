const contentCache = {};

let isMobile = window.innerWidth < 768 || (window.innerWidth / window.innerHeight < 0.8 && window.innerWidth < 1024);

const $content = document.getElementById("content");
const $tabs = Array.from(document.querySelectorAll(".tab-btn"));

async function loadAllContent() {
  const tabs = ['about', 'experience', 'projects', 'contact'];
  for (const tab of tabs) {
    try {
      const response = await fetch(`${tab}.html`);
      contentCache[tab] = await response.text();
    } catch {
      contentCache[tab] = '<p>Error loading content.</p>';
    }
  }
}

function updateMobileStatus() {
  const wasMobile = isMobile;
  isMobile = window.innerWidth < 768 || (window.innerWidth / window.innerHeight < 0.8 && window.innerWidth < 1024);
  
  // Update body class for CSS
  document.body.classList.toggle('mobile-mode', isMobile);
  
  if (wasMobile !== isMobile) {
    if (isMobile) {
      setActive('all');
    } else {
      const currentTab = location.hash.replace("#", "") || localStorage.getItem("activeTab") || "about";
      setActive(currentTab);
    }
  }
}

window.addEventListener('resize', updateMobileStatus);

function setActive(tab) {
  if (isMobile) {
    const order = ['about', 'experience', 'contact', 'projects'];
    const allHtml = order.map(t => contentCache[t]).join('');
    $content.innerHTML = allHtml;
    updateAge();
  } else {
    const html = contentCache[tab] || contentCache.about;
    $content.innerHTML = html;
    $tabs.forEach((btn) =>
      btn.setAttribute("aria-current", btn.dataset.tab === tab ? "page" : "false")
    );
    localStorage.setItem("activeTab", tab);
    // Focus first heading for a11y
    const h = $content.querySelector("h2, .huge");
    if (h) h.setAttribute("tabindex", "-1"), h.focus({ preventScroll: true });
    // Update age if on contact tab
    if (tab === "contact") {
      updateAge();
    }
  }
}

$tabs.forEach((btn) =>
  btn.addEventListener("click", () => {
    if (!isMobile) {
      const t = btn.dataset.tab;
      location.hash = t;
      setActive(t);
    }
  })
);

window.addEventListener("hashchange", () => {
  if (!isMobile) {
    const t = location.hash.replace("#", "");
    setActive(t);
  }
});

// Initial
(async () => {
  await loadAllContent();
  
  // Set initial mobile class
  document.body.classList.toggle('mobile-mode', isMobile);
  
  const initial =
    location.hash.replace("#", "") ||
    localStorage.getItem("activeTab") ||
    "about";
  setActive(initial);
})();

/* ====== THEME SWITCHING ====== */
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector(".theme-icon");

function setTheme(isDark) {
  document.body.classList.toggle("dark-theme", isDark);
  themeIcon.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Load theme on page load
const savedTheme = localStorage.getItem("theme");
const isDark =
  savedTheme === "dark" ||
  (savedTheme === null &&
    window.matchMedia("(prefers-color-scheme: dark)").matches);
setTheme(isDark);

themeToggle.addEventListener("click", () => {
  const isDarkNow = document.body.classList.contains("dark-theme");
  setTheme(!isDarkNow);
});

/* ====== BACKGROUND DOT FIELD (idle) ====== */
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
let W = 0,
  H = 0,
  dots = [],
  mouseX = 0,
  mouseY = 0;

function rand(a, b) {
  return a + Math.random() * (b - a);
}
function resize() {
  W = canvas.width = window.innerWidth * devicePixelRatio;
  H = canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
}
window.addEventListener("resize", resize, { passive: true });
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX * devicePixelRatio;
  mouseY = e.clientY * devicePixelRatio;
});
resize();

function initDots() {
  const count = Math.min(
    160,
    Math.round((window.innerWidth * window.innerHeight) / 9000)
  );
  dots = Array.from({ length: count }, () => ({
    x: rand(0, W),
    y: rand(0, H),
    r: rand(1.5, 3) * devicePixelRatio,
    vx: rand(-0.15, 0.15),
    vy: rand(-0.15, 0.15),
  }));
}
initDots();

function tick() {
  ctx.clearRect(0, 0, W, H);
  const isDark = document.body.classList.contains("dark-theme");
  const color = isDark ? "#fff" : "#000";
  // faint grid for brutalist vibe
  ctx.save();
  ctx.globalAlpha = 0.07;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1 * devicePixelRatio;
  const step = 40 * devicePixelRatio;
  for (let x = 0; x < W; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y < H; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  ctx.restore();

  // dots
  ctx.fillStyle = color;
  for (const d of dots) {
    // Repulsion from cursor
    const dx = d.x - mouseX;
    const dy = d.y - mouseY;
    const dist = Math.hypot(dx, dy);
    if (dist < 150 * devicePixelRatio && dist > 0) {
      const force = 0.5;
      d.vx += (dx / dist) * force;
      d.vy += (dy / dist) * force;
    }

    d.x += d.vx;
    d.y += d.vy;
    if (d.x < 0 || d.x > W) d.vx *= -1;
    if (d.y < 0 || d.y > H) d.vy *= -1;

    // Cap velocity
    d.vx = Math.max(-0.2, Math.min(0.2, d.vx));
    d.vy = Math.max(-0.2, Math.min(0.2, d.vy));

    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();
  }

  // near lines
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.08;
  ctx.lineWidth = 1 * devicePixelRatio;
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const a = dots[i],
        b = dots[j];
      const dx = a.x - b.x,
        dy = a.y - b.y,
        dist = Math.hypot(dx, dy);
      if (dist < 90 * devicePixelRatio) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(tick);
}
tick();

/* ====== QUALITY OF LIFE ====== */
// Space/Enter activates focused tab button (accessibility)
document.addEventListener("keydown", (e) => {
  if (
    (e.key === " " || e.key === "Enter") &&
    document.activeElement.classList.contains("tab-btn")
  ) {
    e.preventDefault();
    document.activeElement.click();
  }
});

/* ====== AGE UPDATER ====== */
const birthDate = new Date(2004, 3, 23, 20, 5); // April 23, 2004, 8:05 PM

function updateAge() {
  const ageElement = document.getElementById("age");
  if (ageElement) {
    const now = new Date();
    const ageMs = now - birthDate;
    const ageYears = ageMs / (1000 * 60 * 60 * 24 * 365.25);
    const ageStr = ageYears.toFixed(8);
    const [integerPart, decimalPart] = ageStr.split('.');
    const firstDecimal = decimalPart.charAt(0);
    const remainingDecimals = decimalPart.slice(1);
    ageElement.innerHTML = `<strong><img src="img/clock_black.svg" class="icon light-icon"><img src="img/clock_white.svg" class="icon dark-icon">Current age:</strong> <span style="font-size: 1em;">${integerPart}.</span><span style="font-size: 0.87em;">${firstDecimal}</span><span style="font-size: 0.8em;">${remainingDecimals}</span> years.`;
  }
}

updateAge();
setInterval(updateAge, 10);
