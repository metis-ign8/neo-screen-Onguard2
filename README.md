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

## HTTP Security Headers

To protect the site and its users, configure HTTP security headers on your hosting platform. These headers include Content Security Policy (CSP), HTTP Strict Transport Security (HSTS), and other modern protections.

1. **Content Security Policy (CSP)** – restricts where scripts, images, styles, and other resources can be loaded from.
   - Example header:
     ```
     Content-Security-Policy: default-src 'self'; img-src 'self' https://trusted.cdn.com; script-src 'self' https://trusted.cdn.com; style-src 'self' https://trusted.cdn.com
     ```
   - On platforms like Netlify or Cloudflare, add this header in their custom header configuration.

2. **HTTP Strict Transport Security (HSTS)** – forces browsers to use HTTPS.
   - Example header:
     ```
     Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
     ```
   - Configure your hosting provider to serve this header over HTTPS only.

3. **Additional headers**
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `Referrer-Policy: no-referrer-when-downgrade`
   - `Permissions-Policy: geolocation=(), microphone=()`
   - Configure these headers through your hosting platform's custom header settings or your server configuration (for example, in an `.htaccess` file or Nginx server block).

These headers help mitigate cross-site scripting (XSS), clickjacking, and other common web threats.

