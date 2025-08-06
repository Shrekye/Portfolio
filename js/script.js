document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-theme");
  }

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    localStorage.setItem("theme", body.classList.contains("dark-theme") ? "dark" : "light");
    updateCanvasColors();
    drawMatrix();
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

let fontSize = 16;
let columns;
let drops = [];

const lightColors = {
  bgColor: '#ffffff',       
  accentDark: '#660140'    
};

const darkColors = {
  bgColor: '#0d0d0d',       
  accentDark: '#00c2a2'     
};

let currentColors = lightColors;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.querySelector('.hero').offsetHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function hexToRgba(hex, alpha = 1) {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function updateCanvasColors() {
  if (document.body.classList.contains('dark-theme')) {
    currentColors = darkColors;
  } else {
    currentColors = lightColors;
  }
}

function drawMatrix() {
  const bgColor = currentColors.bgColor;
  const accentDark = currentColors.accentDark;

  ctx.fillStyle = hexToRgba(bgColor, 0.1);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = accentDark;
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = Math.random() > 0.5 ? '0' : '1';
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillText(text, x, y);

    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }

  requestAnimationFrame(drawMatrix);
}

drawMatrix();