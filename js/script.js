document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  // Applique le thème si un choix a été sauvegardé dans localStorage
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-theme");
  }

  // Change de thème au clic et sauvegarde la préférence dans localStorage
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    localStorage.setItem("theme", body.classList.contains("dark-theme") ? "dark" : "light");

    // Redessine le canvas après le changement de thème
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

// Canvas
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let fontSize = 16;
let columns;
let drops = [];

// Redimensionne le canvas en fonction de la taille de la fenêtre
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.querySelector('.hero').offsetHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Convertir une couleur HEX CSS en rgba
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

// Dessiner la matrice sur le canvas
function drawMatrix() {
  const styles = getComputedStyle(document.documentElement);
  const bgColor = styles.getPropertyValue('--bg').trim();
  const accentDark = styles.getPropertyValue('--accent-dark').trim();

  ctx.fillStyle = hexToRgba(bgColor, 0.1);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = accentDark;
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = Math.random() > 0.5 ? '0' : '1';
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillText(text, x, y);

    // Redémarre certaines gouttes
    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }

  requestAnimationFrame(drawMatrix);
}

// Lancer le dessin initial du canvas
drawMatrix();
