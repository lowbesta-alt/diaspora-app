// Service Worker — Espace Diaspora
const CACHE_NAME = 'diaspora-v1';
const OFFLINE_URL = '/offline.html';

const PRECACHE_URLS = [
  '/index.html',
  '/accueil.html',
  '/offline.html',
  '/manifest.json',
  '/config.js',
  '/app.js',
  '/theme.css',
  '/icon-192.png',
  '/icon-512.png'
];

// Installation : pré-cache des fichiers essentiels
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn('[SW] Precache partiel :', err);
      });
    })
  );
  self.skipWaiting();
});

// Activation : nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch : stratégie hybride
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Ne pas intercepter les appels Supabase / Resend / API
  if (url.hostname.includes('supabase.co') ||
      url.hostname.includes('resend.com') ||
      url.hostname.includes('googleapis.com') ||
      url.hostname.includes('jsdelivr.net') ||
      url.hostname.includes('tailwindcss')) {
    return;
  }

  // Pour les pages HTML : réseau d'abord, cache en secours
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then((cached) => {
            return cached || caches.match(OFFLINE_URL);
          });
        })
    );
    return;
  }

  // Pour les autres ressources : cache d'abord, réseau en secours
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        // Ne cacher que les GET réussis
        if (event.request.method === 'GET' && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      }).catch(() => {
        return caches.match(OFFLINE_URL);
      });
    })
  );
});
