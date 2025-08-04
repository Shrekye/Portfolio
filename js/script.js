document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-theme");
  }

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    localStorage.setItem("theme", body.classList.contains("dark-theme") ? "dark" : "light");
  });

  let lastScrollTop = 0;
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
      navbar.classList.add("hidden");
    } else {
      navbar.classList.remove("hidden");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });

  const menuToggle = document.getElementById("menu-toggle");
  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("open");
  });
});

const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.querySelector('.hero').offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const fontSize = 16;
const columns = Math.floor(window.innerWidth / fontSize);
let drops = Array(columns).fill(1);

function hexToRgba(hex, alpha = 1) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function drawMatrix() {
  const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
  const digitColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-dark').trim();

  ctx.fillStyle = hexToRgba(bgColor, 0.1);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = digitColor;
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const char = Math.random() > 0.5 ? '0' : '1';
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillText(char, x, y);

    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix, 50);

document.getElementById('theme-toggle').addEventListener('click', () => {
  setTimeout(() => {
    drops = Array(columns).fill(1);
  }, 150);
});
