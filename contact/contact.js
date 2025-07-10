// contact/contact.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const modal = document.getElementById('contactModal'); // Still needed to close it after submit

  // Modal open/close listeners (for trigger buttons, ESC, overlay clicks, close buttons)
  // are now handled by the generic modal system in js/funct/index.js.
  // [data-modal="contactModal"] buttons will open this modal.
  // [data-close] inside this modal will close it.
  // Clicking on the modal overlay (contactModal itself) will close it.
  // ESC key will close it.

  if (form && modal) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Contact form submitted!'); // Or actual form submission logic
      // Close the modal after submission using the global closeModal or by directly manipulating class
      // Assuming 'contactModal' is a componentModalOverlayId in js/funct/index.js
      if (typeof closeModal === 'function') {
        closeModal('contactModal');
      } else {
        modal.classList.remove('active'); // Fallback if closeModal is not available yet
      }
    });
  }
});
