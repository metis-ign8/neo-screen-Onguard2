// contact/contact.js
function initContactForm() {
  const form = document.getElementById('contactForm');
  const modal = document.getElementById('contactModal'); // Still needed to close it after submit

  if (form && modal) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Contact form submitted!'); // Or actual form submission logic
      if (typeof closeModal === 'function') {
        closeModal('contactModal');
      } else {
        modal.classList.remove('active'); // Fallback if closeModal is not available yet
      }
    });
  }
}

const contactContainer = document.querySelector('div[include-html="contact/contact.html"]');
if (contactContainer) {
  contactContainer.addEventListener('html-included', initContactForm);
  if (contactContainer.innerHTML.trim() !== '') {
    initContactForm();
  }
}
