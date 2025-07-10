// join/join.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('joinForm');
  const modal = document.getElementById('joinModal'); // Still needed to close it after submit

  // Modal open/close listeners (for trigger buttons, ESC, overlay clicks, close buttons)
  // are now handled by the generic modal system in js/funct/index.js.

  if (form && modal) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Join Us form submitted!'); // Or actual form submission logic
      // Close the modal after submission
      if (typeof closeModal === 'function') {
        closeModal('joinModal');
      } else {
        modal.classList.remove('active'); // Fallback
      }
    });
  }
});
