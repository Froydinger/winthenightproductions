const CACHE_NAME = 'win-the-night-v4';
const urlsToCache = [
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

  // Network-first for JS, CSS, and HTML to ensure fresh code after deployments
  const isCode =
    event.request.destination === 'script' ||
    event.request.destination === 'style' ||
    event.request.destination === 'document' ||
    url.pathname.match(/\.(js|css|html)$/);

  if (isCode) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache the new version for offline use
          if (response && response.status === 200 && response.type === 'basic') {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails (offline mode)
          return caches.match(event.request);
        })
    );
    return;
  }

  // Cache-first strategy for images and fonts only
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

          // Only cache images and fonts
          const shouldCache =
            event.request.destination === 'image' ||
            event.request.destination === 'font' ||
            url.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|ico)$/);

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
