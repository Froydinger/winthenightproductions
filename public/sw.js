const CACHE_NAME = 'win-the-night-v3';
const urlsToCache = [
  '/',
  '/updates',
  '/index.html',
  '/icon-192.png',
  '/icon-512.png',
  '/manifest.json'
];

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Never cache API requests (Supabase, external APIs, etc.)
  if (
    url.hostname.includes('supabase') ||
    url.hostname.includes('api.') ||
    url.pathname.startsWith('/api/') ||
    event.request.method !== 'GET'
  ) {
    // Network-only for API requests
    event.respondWith(fetch(event.request));
    return;
  }

  // Cache-first strategy for static assets only
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Only cache static assets (images, fonts, etc.)
          const shouldCache =
            event.request.destination === 'image' ||
            event.request.destination === 'font' ||
            event.request.destination === 'style' ||
            event.request.destination === 'script' ||
            url.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|ico|css|js)$/);

          if (shouldCache) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
          }

          return response;
        }).catch(() => {
          // Return a custom offline page if available
          return caches.match('/index.html');
        });
      })
  );
});
