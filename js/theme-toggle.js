document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const currentTheme = localStorage.getItem("theme") || (prefersDark ? "dark" : "light");

  setTheme(currentTheme);

  toggleBtn.addEventListener("click", () => {
    const newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });

  function setTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      toggleBtn.textContent = "☀️";
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      toggleBtn.textContent = "🌙";
    }
    localStorage.setItem("theme", theme);
  }
});

  let lastScrollTop = 0;
  const navbar = document.querySelector('.navbar');
  
  // Ajouter un écouteur d'événements de défilement
  window.addEventListener('scroll', function () {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Si l'utilisateur défile vers le bas
    if (currentScroll > lastScrollTop) {
      navbar.style.top = "-80px"; // Masquer la navbar
    } else {
      navbar.style.top = "0"; // Réafficher la navbar
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Pour éviter les valeurs négatives
  });

  // Fonction pour ouvrir/fermer le menu de navigation mobile
  const menuToggle = document.querySelector('#menu-toggle');
  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('open');
  });
