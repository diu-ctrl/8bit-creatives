/**
 * 8Bit Creatives - Production Service Worker
 * High-Traffic Edge & Offline Resilience Engine
 * Strategy: Stale-While-Revalidate for CSS, JS, fonts & images; Network-First for HTML.
 */

const CACHE_NAME = '8bit-static-v1.2';
const CORE_PRECACHE = [
  '/',
  '/styles.css',
  '/app.js',
  '/navbar.js',
  '/preloader.js',
  '/site.webmanifest',
  '/favicon.ico',
  '/images-for-landing-page/logo_2.webp',
  '/images-for-landing-page/hero-monument-bg-v2.webp'
];

// Install: Pre-cache critical visual shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_PRECACHE).catch((err) => {
        console.warn('SW: Precache partial fallback:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up old cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Optimized routing
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Only handle GET requests from same origin or trusted font/CDN domains
  if (request.method !== 'GET') return;

  const isSameOrigin = url.origin === self.location.origin;
  const isCdn = url.hostname.includes('fonts.gstatic.com') ||
                url.hostname.includes('fonts.googleapis.com') ||
                url.hostname.includes('cdn.jsdelivr.net');

  if (!isSameOrigin && !isCdn) return;

  // 1. Navigation requests (HTML documents) -> Network First with Cache fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return networkResponse;
      }).catch(() => {
        return caches.match(request).then((cachedResponse) => {
          return cachedResponse || caches.match('/');
        });
      })
    );
    return;
  }

  // 2. Static Assets (CSS, JS, WebP, PNG, SVG, Fonts) -> Stale-While-Revalidate
  const isStaticAsset = /\.(css|js|webp|png|jpg|jpeg|svg|woff2|ico)$/i.test(url.pathname) || isCdn;

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        }).catch(() => cachedResponse);

        // Return cached instantly if available; otherwise await network
        return cachedResponse || fetchPromise;
      })
    );
  }
});
