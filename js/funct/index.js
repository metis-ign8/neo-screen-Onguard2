// /js/funct/index.js
// File: js/funct/index.js

// DOM elements
const body = document.body;
const desktopLangToggle = document.getElementById('lang-toggle'); // Renamed for clarity
const desktopThemeToggle = document.getElementById('theme-toggle'); // Renamed for clarity
const overlay = document.getElementById('modal-overlay');
const cards = document.querySelectorAll('.card');
const modals = document.querySelectorAll('.modal');

// Centralized Theme and Language Management
function updateAllToggleButtons(lang, theme) {
  // Update desktop buttons
  if (desktopLangToggle) {
    const desktopLangSpan = desktopLangToggle.querySelector('span');
    if (desktopLangSpan) desktopLangSpan.textContent = lang.toUpperCase();
  }
  if (desktopThemeToggle) {
    const desktopThemeSpan = desktopThemeToggle.querySelector('span');
    if (desktopThemeSpan) desktopThemeSpan.textContent = theme === 'dark' ? 'Dark' : 'Light';
  }

  // Update mobile buttons (assuming they become available after HTML include)
  // It's better if these buttons also have unique IDs if direct manipulation is needed often,
  // but for now, we'll query them when functions are called.
  const mobileLangToggle = document.getElementById('mobile-language-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

  if (mobileLangToggle) {
    mobileLangToggle.textContent = lang.toUpperCase(); // Mobile button might show text directly or have a span
     // If mobile button has child spans for text, adjust selector accordingly
     // For now, assuming textContent is sufficient based on expand-nav/nav.html structure for lang
  }
  if (mobileThemeToggle) {
    mobileThemeToggle.textContent = theme === 'dark' ? 'Dark' : 'Light'; // Mobile button shows text directly
  }
}

function applyLanguage(lang, persist = true) {
  body.setAttribute('data-lang', lang);
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.dataset[lang]; // Use dataset for cleaner access
    if (text) el.textContent = text;
  });
  if (persist) {
    localStorage.setItem('lang', lang);
  }
  // Update button texts after applying, using current theme from body or localStorage
  const currentTheme = localStorage.getItem('theme') || 'dark';
  updateAllToggleButtons(lang, currentTheme);
}

function applyTheme(theme, persist = true) {
  body.classList.toggle('theme-dark', theme === 'dark');
  body.classList.toggle('theme-light', theme === 'light');
  if (persist) {
    localStorage.setItem('theme', theme);
  }
  // Update button texts after applying, using current lang from body or localStorage
  const currentLang = localStorage.getItem('lang') || 'en';
  updateAllToggleButtons(currentLang, theme);
}

function toggleLanguage() {
  const currentLang = body.getAttribute('data-lang') === 'en' ? 'es' : 'en';
  applyLanguage(currentLang);
}

function toggleTheme() {
  const isDark = body.classList.contains('theme-dark');
  applyTheme(isDark ? 'light' : 'dark');
}

// Event listeners for desktop toggles
if (desktopLangToggle) {
  desktopLangToggle.addEventListener('click', toggleLanguage);
}
if (desktopThemeToggle) {
  desktopThemeToggle.addEventListener('click', toggleTheme);
}

// Initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // Initial setup for theme and language from localStorage or defaults
  const savedLang = localStorage.getItem('lang') || 'en';
  const savedTheme = localStorage.getItem('theme') || 'dark';

  applyLanguage(savedLang, false); // Apply without re-saving
  applyTheme(savedTheme, false);   // Apply without re-saving

  const mobileLangBtn = document.getElementById('mobile-language-toggle');
  const mobileThemeBtn = document.getElementById('mobile-theme-toggle');

  if (mobileLangBtn) mobileLangBtn.addEventListener('click', toggleLanguage);
  if (mobileThemeBtn) mobileThemeBtn.addEventListener('click', toggleTheme);

  updateAllToggleButtons(savedLang, savedTheme);

  // Initialize Generic Modal Handlers after DOM is ready and HTML includes are likely done
  initializeModalSystem();
});

// --- Generic Modal System ---
const serviceModalIds = ['modal-ops', 'modal-cc', 'modal-it', 'modal-pro']; // Add other service modal IDs here
const componentModalOverlayIds = ['contactModal', 'joinModal', 'chatbotModal']; // Add other component modal overlay IDs here

function openModal(modalId) {
  const modalElement = document.getElementById(modalId);
  if (!modalElement) {
    console.error(`Modal with ID ${modalId} not found.`);
    return;
  }

  if (serviceModalIds.includes(modalId)) {
    // Service modals use the generic 'overlay' and 'hidden' class
    const genericOverlay = document.getElementById('modal-overlay');
    if (genericOverlay) genericOverlay.classList.remove('hidden');
    modalElement.classList.remove('hidden');
  } else if (componentModalOverlayIds.includes(modalId)) {
    // Component modals are overlays themselves and use 'active' class
    modalElement.classList.add('active');
  } else {
    // Default to assuming it's a service-like modal if ID not in componentModalOverlayIds
    // This can be adjusted if a different default behavior is needed.
    const genericOverlay = document.getElementById('modal-overlay');
    if (genericOverlay) genericOverlay.classList.remove('hidden');
    modalElement.classList.remove('hidden'); // Assuming .hidden toggle
    console.warn(`Modal ID ${modalId} not explicitly categorized as service or component overlay. Opened as service-like.`);
  }
}

function closeModal(modalId) {
  const modalElement = document.getElementById(modalId);
  if (!modalElement) {
    console.error(`Modal with ID ${modalId} not found for closing.`);
    return;
  }

  if (serviceModalIds.includes(modalId)) {
    modalElement.classList.add('hidden');
    // Check if other service modals are open before hiding generic overlay
    const anyServiceModalOpen = serviceModalIds.some(id => {
      const el = document.getElementById(id);
      return el && !el.classList.contains('hidden');
    });
    if (!anyServiceModalOpen) {
      const genericOverlay = document.getElementById('modal-overlay');
      if (genericOverlay) genericOverlay.classList.add('hidden');
    }
  } else if (componentModalOverlayIds.includes(modalId)) {
    modalElement.classList.remove('active');
  } else {
     // Default to assuming it's a service-like modal
    modalElement.classList.add('hidden');
    // Similar logic for generic overlay if needed, or rely on closeAllModals for simplicity here.
    console.warn(`Modal ID ${modalId} not explicitly categorized. Closed as service-like.`);
  }
}

function closeAllModals() {
  // Hide component modal overlays
  componentModalOverlayIds.forEach(id => {
    const modalElement = document.getElementById(id);
    if (modalElement) modalElement.classList.remove('active');
  });

  // Hide service modals and the generic overlay
  const genericOverlay = document.getElementById('modal-overlay');
  if (genericOverlay) genericOverlay.classList.add('hidden');

  serviceModalIds.forEach(id => {
    const modalElement = document.getElementById(id);
    if (modalElement) modalElement.classList.add('hidden');
  });

  // Also hide any other modals that might have been opened using the '.modal' class directly
  // This is a fallback for the older system that used querySelectorAll('.modal')
  document.querySelectorAll('.modal').forEach(m => {
    if (!serviceModalIds.includes(m.id) && !componentModalOverlayIds.includes(m.id) && m.id !== 'modal-overlay') {
        // Check if it's a main modal content that might have been shown with .hidden
        if (m.classList.contains('modal-content')) { // e.g. join-modal inside joinModal
            // Let its parent overlay handle it.
        } else if (!m.classList.contains('modal-overlay')) { // Don't hide overlays that are handled above
            m.classList.add('hidden'); // If it was using .hidden
        }
    }
  });
}

function initializeModalSystem() {
  // Event listener for [data-modal] triggers
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-modal]');
    if (trigger) {
      event.preventDefault();
      const modalId = trigger.dataset.modal;
      openModal(modalId);
    }

    // Event listener for [data-close] buttons
    const closeButton = event.target.closest('[data-close]');
    if (closeButton) {
      event.preventDefault();
      // Find the parent modal overlay to close, or close all if not specifically tied
      // For simplicity, current [data-close] buttons are in component modals which have their own overlays
      const parentModalOverlay = event.target.closest('.modal-overlay');
      if (parentModalOverlay && componentModalOverlayIds.includes(parentModalOverlay.id)) {
        closeModal(parentModalOverlay.id);
      } else {
        // If data-close is in a service modal, or not directly in a known overlay, close all.
        closeAllModals();
      }
    }
  });

  // Event listener for ESC key
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeAllModals();
    }
  });

  // Event listener for clicks on component modal overlays (to close them)
  componentModalOverlayIds.forEach(modalId => {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      modalElement.addEventListener('click', event => {
        if (event.target === modalElement) { // Clicked on the overlay itself, not its content
          closeModal(modalId);
        }
      });
    }
  });

  // Event listener for the generic service modal overlay
  const genericOverlay = document.getElementById('modal-overlay');
  if (genericOverlay) {
    genericOverlay.addEventListener('click', event => {
      if (event.target === genericOverlay) { // Clicked on the overlay itself
        closeAllModals(); // Closes all service modals and this overlay
      }
    });
  }
}

// Default initialization was previously here, now handled by DOMContentLoaded.
