// join/join.js
function initJoinForm() {
  const form = document.getElementById('joinForm');
  const modal = document.getElementById('joinModal'); // Still needed to close it after submit

  if (form && modal) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Join Us form submitted!'); // Or actual form submission logic
      if (typeof closeModal === 'function') {
        closeModal('joinModal');
      } else {
        modal.classList.remove('active'); // Fallback
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
