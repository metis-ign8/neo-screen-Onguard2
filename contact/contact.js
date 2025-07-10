// contact/contact.js
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('contactModal');
  const form = document.getElementById('contactForm');

  document.querySelectorAll('[data-modal="contactModal"]').forEach(btn =>
    btn.addEventListener('click', () => modal.classList.add('active'))
  );

  modal.querySelector('[data-close]').addEventListener('click', () =>
    modal.classList.remove('active')
  );

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Contact form submitted!');
    modal.classList.remove('active');
  });

  window.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('active');
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') modal.classList.remove('active');
  });
});
