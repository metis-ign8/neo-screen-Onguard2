// mychatbot/chatbot.js
const CHATBOT_API_URL = window.CHATBOT_API_URL || 'https://example.com/api/chat';

function initChatbot() {
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotHeader = document.getElementById('chatbot-header');
  const closeButton = document.getElementById('close-chatbot');
  const openButton = document.querySelector('.fab-btn[data-modal="chatbotModal"]');
  const input = document.getElementById('chatbot-input');
  const form = document.getElementById('chatbot-input-row');
  const log = document.getElementById('chat-log');
  const sendBtn = document.getElementById('chatbot-send');
  const humanCheck = document.getElementById('human-check');

  let isDragging = false;
  let offsetX, offsetY;

  // Function to show the chatbot
  const showChatbot = () => {
    chatbotContainer.classList.remove('hidden');
  };

  // Function to hide the chatbot
  const hideChatbot = () => {
    chatbotContainer.classList.add('hidden');
  };

  // Event listener for the open button
  if (openButton) {
    openButton.addEventListener('click', showChatbot);
  }

  // Event listener for the close button
  if (closeButton) {
    closeButton.addEventListener('click', hideChatbot);
  }

  // Drag and drop functionality
  if (chatbotHeader) {
    chatbotHeader.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - chatbotContainer.offsetLeft;
      offsetY = e.clientY - chatbotContainer.offsetTop;
      chatbotContainer.style.cursor = 'move';
    });
  }

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    chatbotContainer.style.left = `${e.clientX - offsetX}px`;
    chatbotContainer.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    chatbotContainer.style.cursor = 'default';
  });

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
        const response = await fetch(CHATBOT_API_URL, {
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
}

const chatbotContainer = document.querySelector('div[include-html="mychatbot/chatbot.html"]');
if (chatbotContainer) {
  chatbotContainer.addEventListener('html-included', initChatbot);
  if (chatbotContainer.innerHTML.trim() !== '') {
    initChatbot();
  }
}
