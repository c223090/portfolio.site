// ============================
// Hover tooltip for gallery
// 画像にカーソルを合わせると説明が出る
// ============================
const tooltip = document.getElementById("tooltip");
const ttTitle = document.getElementById("ttTitle");
const ttDesc = document.getElementById("ttDesc");

function showTooltip(card, x, y) {
  const title = card.dataset.title || "";
  const desc = card.dataset.desc || "";

  ttTitle.textContent = title;
  ttDesc.textContent = desc;

  tooltip.setAttribute("aria-hidden", "false");

  // 少し右下に表示（画面端なら内側に）
  const pad = 14;
  const rect = tooltip.getBoundingClientRect();
  let left = x + 18;
  let top = y + 18;

  if (left + rect.width + pad > window.innerWidth) left = window.innerWidth - rect.width - pad;
  if (top + rect.height + pad > window.innerHeight) top = window.innerHeight - rect.height - pad;

  tooltip.style.transform = `translate(${left}px, ${top}px)`;
}

function hideTooltip() {
  tooltip.setAttribute("aria-hidden", "true");
  tooltip.style.transform = "translate(-9999px, -9999px)";
}

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mouseenter", (e) => {
    showTooltip(card, e.clientX, e.clientY);
  });

  card.addEventListener("mousemove", (e) => {
    showTooltip(card, e.clientX, e.clientY);
  });

  card.addEventListener("mouseleave", () => {
    hideTooltip();
  });
});

// ============================
// （任意）背景を少しだけ動かす：方眼が気持ち程度にズレる
// ※派手にしない。スクショの雰囲気維持。
// ============================
let offsetX = 0;
let offsetY = 0;

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  window.addEventListener("scroll", () => {
    // スクロールに合わせてほんの少しだけ背景位置をずらす
    const s = window.scrollY;
    offsetX = (s * 0.02) % 22;
    offsetY = (s * 0.03) % 22;
    document.body.style.backgroundPosition =
      `0 0, ${offsetX}px ${offsetY}px, ${offsetX}px ${offsetY}px, ${offsetX}px ${offsetY}px, ${offsetX}px ${offsetY}px`;
  }, { passive: true });
}

// もし canvas 背景が不要なら、index.htmlの <canvas> を消してOK
// 今回は “控えめ” にしているので、描画はしていません。
// ============================
// work-4: scroll reveal
// ============================
(() => {
  const items = document.querySelectorAll(".reveal-life");
  if (!items.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  }, { threshold: 0.18 });

  items.forEach((el) => io.observe(el));
})();
