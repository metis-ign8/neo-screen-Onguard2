// expand-nav/nav.js
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('mobileNav');
  const menuToggle = document.getElementById('menuToggle'); // This is the FAB button in index.html
  const servicesToggle = document.getElementById('mobile-services-toggle');
  const servicesMenu = document.getElementById('mobile-services-menu');
  // const langBtn = document.getElementById('mobile-language-toggle'); // Logic moved to js/funct/index.js
  // const themeBtn = document.getElementById('mobile-theme-toggle'); // Logic moved to js/funct/index.js

  // Show/hide horizontal nav (mobileNav)
  // This is triggered by the FAB #menuToggle button from index.html
  if (menuToggle && nav) { // Ensure both elements exist
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

  // Show/hide services menu
  if (servicesToggle && servicesMenu) {
    servicesToggle.addEventListener('click', () => {
      const isActive = servicesMenu.classList.toggle('active');
      servicesToggle.setAttribute('aria-expanded', isActive);
      servicesMenu.setAttribute('aria-hidden', !isActive);
    });
  }

  // Language and Theme toggle logic has been moved to js/funct/index.js
  // That script will attach event listeners to 'mobile-language-toggle' and 'mobile-theme-toggle'
  // and will also update their text content.
});
