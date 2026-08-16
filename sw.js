const CACHE_NAME = 'ayune-oraculos-v6';
const ASSETS = [
  './',
  './index.html',
  './tarot.html',
  './cafeomancia.html',
  './agendamento.html',
  './manifest.json',
  './favicon.ico',
  './img/logo.png',
  './img/cafe_borra.jpeg',
  './img/ayune.jpeg',
  './img/leitura-tarot.jpg',
  './img/cafeomancia.jpg',
  './img/icon-192.png',
  './img/icon-512.png'
];

// Install service worker and cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate service worker and clear old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if found, otherwise perform network request
      return cachedResponse || fetch(event.request);
    })
  );
});
