# Neo Screen

This repository hosts the static files for the OPS Online Support demo site.

## Configuring the Chatbot Backend

The chatbot script (`mychatbot/chatbot.js`) uses a configurable URL for its backend API. By default, the script points to `https://example.com/api/chat`. To use a different backend, define `window.CHATBOT_API_URL` before including `mychatbot/chatbot.js`.

```html
<script>
  // Example: set the chatbot backend URL
  window.CHATBOT_API_URL = 'https://your-domain.com/chat';
</script>
<script defer src="mychatbot/chatbot.js"></script>
```

Deployments can also modify the `CHATBOT_API_URL` constant directly in `mychatbot/chatbot.js` if embedding the variable is not an option.
