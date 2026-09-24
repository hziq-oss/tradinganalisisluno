const CACHE_NAME = 'luno-analyzer-v1';
const assetsToCache = [
  'index.html',
  'manifest.json',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// Semasa Pemasangan (Install)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(assetsToCache);
      })
  );
});

// Ambil Cache (Fetch)
self.addEventListener('fetch', event => {
  // Abaikan permintaan rentas sumber (cross-origin) untuk Google Sheet API
  if (event.request.url.includes('google.com')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
