const CACHE_NAME = 'neo-screen-cache-v2';
const OFFLINE_URL = 'offline.html';
const PRECACHE_RESOURCES = [
  '/',
  'index.html',
  'manifest.json',
  'css/design/global.css',
  'contact/contact.html',
  'contact/contact.css',
  'join/join.html',
  'join/join.css',
  'mychatbot/chatbot.html',
  'mychatbot/chatbot.css',
  'expand-nav/nav.html',
  'expand-nav/nav.css',
  'services/modal-ops.html',
  'services/modal-cc.html',
  'services/modal-it.html',
  'services/modal-pro.html',
  'banner/banner.html',
  'banner/banner.css',
  'join/join.js',
  'contact/contact.js',
  'mychatbot/chatbot.js',
  'expand-nav/nav.js',
  'js/funct/index.js',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_RESOURCES))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        return cached;
      }
      return fetch(event.request).catch(err => {
        if (event.request.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }
        return Promise.reject(err);
      });
    })
  );
});
