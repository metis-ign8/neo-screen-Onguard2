// mychatbot/chatbot.js
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('chatbotModal');
  const input = document.getElementById('chatbot-input');
  const form = document.getElementById('chatbot-input-row');
  const log = document.getElementById('chat-log');
  const sendBtn = document.getElementById('chatbot-send');
  const humanCheck = document.getElementById('human-check');

  // Modal trigger
  document.querySelectorAll('[data-modal="chatbotModal"]').forEach(btn =>
    btn.addEventListener('click', () => modal.classList.add('active'))
  );

  modal.querySelector('[data-close]')?.addEventListener('click', () =>
    modal.classList.remove('active')
  );

  window.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('active');
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') modal.classList.remove('active');
  });

  // Enable send only if human verified
  humanCheck.addEventListener('change', () => {
    sendBtn.disabled = !humanCheck.checked;
  });

  // Message handlers
  function addMsg(text, cls) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${cls}`;
    msg.textContent = text;
    log.appendChild(msg);
    log.scrollTop = log.scrollHeight;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = input.value.trim();
    if (!msg || !humanCheck.checked) return;
    addMsg(msg, 'user');
    input.value = '';
    addMsg('…', 'bot');

    try {
      const r = await fetch('https://your-cloudflare-worker.example.com/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message: msg})
      });
      const d = await r.json();
      log.lastChild.textContent = d.reply || 'No reply.';
    } catch {
      log.lastChild.textContent = "Error: Can't reach AI.";
    }
  });
});
