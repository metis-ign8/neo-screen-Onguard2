// /js/funct/index.js

// DOM elements
const body = document.body;
const langToggle = document.getElementById('lang-toggle');
const themeToggle = document.getElementById('theme-toggle');
const overlay = document.getElementById('modal-overlay');
const cards = document.querySelectorAll('.card');
const modals = document.querySelectorAll('.modal');

// Helpers
function applyLanguage(lang) {
body.setAttribute('data-lang', lang);
document.querySelectorAll('\[data-en]').forEach(el => {
const txt = el.getAttribute(`data-${lang}`);
if (txt) el.textContent = txt;
});
}
function applyTheme(theme) {
body.classList.toggle('theme-light', theme === 'light');
body.classList.toggle('theme-dark', theme === 'dark');
}

// Toggle handlers
langToggle.addEventListener('click', ()=> {
const newLang = body.getAttribute('data-lang') === 'en' ? 'es' : 'en';
applyLanguage(newLang);
});
themeToggle.addEventListener('click', ()=> {
const isDark = body.classList.contains('theme-dark');
applyTheme(isDark ? 'light' : 'dark');
});

// Modal open/close
cards.forEach(card => {
card.addEventListener('click', ()=> {
const id = card.getAttribute('data-modal');
const modal = document.getElementById(id);
overlay.classList.remove('hidden');
modal.classList.remove('hidden');
});
});

modals.forEach(modal => {
modal.querySelector('\[data-action="close"]').addEventListener('click', closeModal);
});

overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
if (e.key === 'Escape') closeModal();
});

function closeModal() {
overlay.classList.add('hidden');
modals.forEach(m => m.classList.add('hidden'));
}

// Initialize defaults
applyLanguage('en');
applyTheme('dark');
