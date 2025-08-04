document.addEventListener("DOMContentLoaded", () => {
  // 1. Gestion du thème
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-theme");
  }

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    localStorage.setItem("theme", body.classList.contains("dark-theme") ? "dark" : "light");
  });

  // 2. Gérer la navbar qui se cache lors du défilement
  let lastScrollTop = 0;
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Si l'utilisateur défile vers le bas, cacher la navbar
    if (currentScroll > lastScrollTop) {
      navbar.classList.add("hidden");
    } else {
      navbar.classList.remove("hidden");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });

  // 3. Gérer l'ouverture/fermeture du menu mobile
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

const letters = '01';
const fontSize = 14;
const columns = Math.floor(window.innerWidth / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const accentDark = getComputedStyle(document.documentElement).getPropertyValue('--accent-dark').trim();

  ctx.fillStyle = accentDark;
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillText(text, x, y);

    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix, 50);
