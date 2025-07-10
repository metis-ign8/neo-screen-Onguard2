// expand-nav/nav.js
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('mobileNav');
  const menuToggle = document.getElementById('menuToggle');
  const servicesToggle = document.getElementById('mobile-services-toggle');
  const servicesMenu = document.getElementById('mobile-services-menu');
  const langBtn = document.getElementById('mobile-language-toggle');
  const themeBtn = document.getElementById('mobile-theme-toggle');

  // Show/hide horizontal nav
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

  // Show/hide services menu
  if (servicesToggle && servicesMenu) {
    servicesToggle.addEventListener('click', () => {
      servicesMenu.classList.toggle('active');
      servicesToggle.setAttribute('aria-expanded', servicesMenu.classList.contains('active'));
    });
  }

  // Toggle language
  langBtn?.addEventListener('click', () => {
    const isEN = langBtn.textContent.trim() === 'EN';
    document.querySelectorAll('[data-en]').forEach(el =>
      el.textContent = isEN ? el.dataset.es : el.dataset.en
    );
    langBtn.textContent = isEN ? 'ES' : 'EN';
  });

  // Toggle theme
  themeBtn?.addEventListener('click', () => {
    const isLight = themeBtn.textContent.trim() === 'Light';
    document.body.classList.toggle('dark', isLight);
    themeBtn.textContent = isLight ? 'Dark' : 'Light';
  });
});
