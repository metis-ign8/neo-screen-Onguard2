// mychatbot/chatbot.js
document.addEventListener('DOMContentLoaded', () => {
  // const modal = document.getElementById('chatbotModal'); // Modal element itself
  const input = document.getElementById('chatbot-input');
  const form = document.getElementById('chatbot-input-row');
  const log = document.getElementById('chat-log');
  const sendBtn = document.getElementById('chatbot-send');
  const humanCheck = document.getElementById('human-check');

  // Modal open/close listeners (for trigger buttons, ESC, overlay clicks, close buttons)
  // are now handled by the generic modal system in js/funct/index.js.
  // The close button for chatbotModal is not explicitly defined in its HTML,
  // but the generic system will handle ESC and overlay clicks for 'chatbotModal'.
  // If a visual close button is added to chatbot.html with [data-close], it will also work.

  if (humanCheck && sendBtn) {
    humanCheck.addEventListener('change', () => {
      sendBtn.disabled = !humanCheck.checked;
    });
  }

  function addMsg(text, cls) {
    if (!log) return;
    const msg = document.createElement('div');
    msg.className = `chat-msg ${cls}`;
    msg.textContent = text;
    log.appendChild(msg);
    log.scrollTop = log.scrollHeight;
  }

  if (form && input && humanCheck) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const msg = input.value.trim();
      if (!msg || !humanCheck.checked) return;
      addMsg(msg, 'user');
      input.value = '';
      addMsg('…', 'bot'); // Bot thinking indicator

      try {
        // This URL is a placeholder and will not work without a real backend.
        const response = await fetch('https://your-cloudflare-worker.example.com/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: msg })
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (log.lastChild && log.lastChild.classList.contains('bot')) {
          log.lastChild.textContent = data.reply || 'No reply from bot.';
        } else {
          addMsg(data.reply || 'No reply from bot.', 'bot');
        }
      } catch (error) {
        console.error("Chatbot API error:", error);
        if (log.lastChild && log.lastChild.classList.contains('bot')) {
          log.lastChild.textContent = "Error: Couldn't reach the AI assistant.";
        } else {
          addMsg("Error: Couldn't reach the AI assistant.", 'bot');
        }
      }
    });
  }
});
