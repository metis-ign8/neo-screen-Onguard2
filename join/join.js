// join/join.js
function initJoinForm() {
  const form = document.getElementById('joinForm');
  const modal = document.getElementById('joinModal'); // Still needed to close it after submit

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
        const res = await fetch('/api/join', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error('Request failed');

        showMessage('Thank you! We will be in touch soon.', 'success');
        form.reset();
        setTimeout(() => {
          if (typeof closeModal === 'function') {
            closeModal('joinModal');
          } else {
            modal.classList.remove('active');
          }
        }, 1500);
      } catch (err) {
        console.error(err);
        showMessage('There was an error submitting the form.', 'error');
      }
    });
  }
}

const joinContainer = document.querySelector('div[include-html="join/join.html"]');
if (joinContainer) {
  joinContainer.addEventListener('html-included', initJoinForm);
  if (joinContainer.innerHTML.trim() !== '') {
    initJoinForm();
  }
}
