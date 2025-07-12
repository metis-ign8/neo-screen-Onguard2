// join/join.js
function initJoinForm() {
  const form = document.getElementById('joinForm');
  const modal = document.getElementById('joinModal');
  if (!(form && modal)) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Join Us form submitted!');
    if (typeof closeModal === 'function') {
      closeModal('joinModal');
    } else {
      modal.classList.remove('active');
    }
  });

  modal.querySelectorAll('.form-section').forEach(section => {
    const addBtn = section.querySelector('.add');
    const removeBtn = section.querySelector('.remove');
    const acceptBtn = section.querySelector('.accept-btn');
    const editBtn = section.querySelector('.edit-btn');
    const inputs = section.querySelector('.inputs');
    const title = section.querySelector('h2');
    if (!addBtn || !removeBtn || !acceptBtn || !editBtn || !inputs || !title) return;

    addBtn.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = `Enter ${title.textContent} info`;
      inputs.appendChild(input);
      input.focus();
    });

    removeBtn.addEventListener('click', () => {
      const all = inputs.querySelectorAll('input');
      if (all.length) inputs.removeChild(all[all.length - 1]);
    });

    acceptBtn.addEventListener('click', () => {
      if (!inputs.querySelector('input')) {
        alert('Please add at least one entry.');
        return;
      }
      inputs.querySelectorAll('input').forEach(input => (input.disabled = true));
      acceptBtn.style.display = 'none';
      editBtn.style.display = 'inline-block';
      section.classList.add('completed');
    });

    editBtn.addEventListener('click', () => {
      inputs.querySelectorAll('input').forEach(input => (input.disabled = false));
      acceptBtn.style.display = 'inline-block';
      editBtn.style.display = 'none';
      section.classList.remove('completed');
    });
  });
}

const joinContainer = document.querySelector('div[include-html="join/join.html"]');
if (joinContainer) {
  joinContainer.addEventListener('html-included', initJoinForm);
  if (joinContainer.innerHTML.trim() !== '') {
    initJoinForm();
  }
}
