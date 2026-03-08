const CACHE_NAME = 'usha-owner-v1';
const ASSETS = [
  './',
  './owner-app.html',
  'https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js',
  'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
