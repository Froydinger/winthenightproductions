const CACHE_NAME = 'win-the-night-v5';
const urlsToCache = [
  '/',
  '/index.html',
  '/icon-192.png',
  '/icon-512.png',
  '/manifest.json'
];

// Install: pre-cache app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate: clear old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle same-origin GET requests. Everything else: let the browser do it.
  if (req.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // Never intercept API / dynamic endpoints
  if (
    url.hostname.includes('supabase') ||
    url.hostname.includes('api.') ||
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/~') ||
    url.pathname.startsWith('/functions/')
  ) {
    return;
  }

  // Navigation requests (page loads / SPA route refreshes):
  // network-first, fall back to cached index.html. NEVER return undefined.
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          return fresh;
        } catch {
          const cached =
            (await caches.match(req)) ||
            (await caches.match('/index.html')) ||
            (await caches.match('/'));
          return (
            cached ||
            new Response(
              '<!doctype html><title>Offline</title><h1>Offline</h1>',
              { headers: { 'Content-Type': 'text/html' }, status: 503 }
            )
          );
        }
      })()
    );
    return;
  }

  // JS / CSS: network-first, cache for offline
  const isCode =
    req.destination === 'script' ||
    req.destination === 'style' ||
    /\.(js|css)$/.test(url.pathname);

  if (isCode) {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(req);
          if (res && res.status === 200 && res.type === 'basic') {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, clone));
          }
          return res;
        } catch {
          const cached = await caches.match(req);
          if (cached) return cached;
          return new Response('', { status: 504, statusText: 'Offline' });
        }
      })()
    );
    return;
  }

  // Images / fonts: cache-first
  event.respondWith(
    (async () => {
      const cached = await caches.match(req);
      if (cached) return cached;
      try {
        const res = await fetch(req);
        const shouldCache =
          req.destination === 'image' ||
          req.destination === 'font' ||
          /\.(png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|ico)$/.test(url.pathname);
        if (shouldCache && res && res.status === 200 && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, clone));
        }
        return res;
      } catch {
        return new Response('', { status: 504, statusText: 'Offline' });
      }
    })()
  );
});
