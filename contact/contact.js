// contact/contact.js
function initContactForm() {
  const form = document.getElementById('contact-form');
  const modal = document.getElementById('contactModal'); // Still needed to close it after submit

  if (form && modal) {
    const showMessage = (msg, type) => {
      let box = form.querySelector('.form-message');
      if (!box) {
        box = document.createElement('div');
        box.className = 'form-message';
        box.setAttribute('aria-live', 'polite');
        box.style.marginBottom = '1rem';
        form.prepend(box);
      }
      box.textContent = msg;
      box.style.color = type === 'success' ? 'green' : type === 'error' ? 'red' : '';
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      showMessage('Submitting...', 'info');

      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error('Request failed');

        showMessage('Message sent successfully!', 'success');
        form.reset();
        setTimeout(() => {
          if (typeof closeModal === 'function') {
            closeModal('contactModal');
          } else {
            modal.classList.remove('active');
          }
        }, 1500);
      } catch (err) {
        console.error(err);
        showMessage('Unable to send message. Please try again later.', 'error');
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
