// Service Worker para PWA
self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker ativado');
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Permite que requisições passem normalmente
  event.respondWith(fetch(event.request));
});
