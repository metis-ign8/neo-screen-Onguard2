// expand-nav/nav.js
function initMobileNav() {
  const nav = document.getElementById('mobileNav');
  const menuToggle = document.getElementById('menuToggle');
  const servicesToggle = document.getElementById('mobile-services-toggle');
  const servicesMenu = document.getElementById('mobile-services-menu');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

  if (servicesToggle && servicesMenu) {
    servicesToggle.addEventListener('click', () => {
      const isActive = servicesMenu.classList.toggle('active');
      servicesToggle.setAttribute('aria-expanded', isActive);
      servicesMenu.setAttribute('aria-hidden', !isActive);
    });
  }
}

const navContainer = document.querySelector('div[include-html="expand-nav/nav.html"]');
if (navContainer) {
  navContainer.addEventListener('html-included', initMobileNav);
  if (navContainer.innerHTML.trim() !== '') {
    initMobileNav();
  }
}

// Language and Theme toggle logic has been moved to js/funct/index.js
