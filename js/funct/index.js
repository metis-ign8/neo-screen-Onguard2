// /js/funct/index.js
// File: js/funct/index.js

// DOM elements
const body = document.body;
const langToggle = document.getElementById('lang-toggle');
const themeToggle = document.getElementById('theme-toggle');
const overlay = document.getElementById('modal-overlay');
const cards = document.querySelectorAll('.card');
const modals = document.querySelectorAll('.modal');

// Apply language: writes each element’s data-en/data-es into its textContent
function applyLanguage(lang) {
  body.setAttribute('data-lang', lang);
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text != null) el.textContent = text;
  });
}

// Apply theme: toggles .theme-light / .theme-dark on <body>
function applyTheme(theme) {
  body.classList.toggle('theme-light', theme === 'light');
  body.classList.toggle('theme-dark', theme === 'dark');
}

// Language toggle button
langToggle.addEventListener('click', () => {
  const current = body.getAttribute('data-lang');
  applyLanguage(current === 'en' ? 'es' : 'en');
});

// Theme toggle button
themeToggle.addEventListener('click', () => {
  const isDark = body.classList.contains('theme-dark');
  applyTheme(isDark ? 'light' : 'dark');
});

// Show modal when clicking a card
cards.forEach(card => {
  card.addEventListener('click', () => {
    const id = card.getAttribute('data-modal');
    const modal = document.getElementById(id);
    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
  });
});

// Close buttons inside each modal
modals.forEach(modal => {
  modal.querySelector('.modal-close')
       .addEventListener('click', closeAllModals);
});

// Clicking the backdrop closes
overlay.addEventListener('click', closeAllModals);

// ESC key closes
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAllModals();
});

// Helper to hide everything
function closeAllModals() {
  overlay.classList.add('hidden');
  modals.forEach(m => m.classList.add('hidden'));
}

// Initialize defaults
applyLanguage('en');
applyTheme('dark');
