const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/styles.css",
    "/dist/app.bundle.js",
    "/dist/assets/icons/icon_192x192.png",
    "/dist/assets/icons/icon_512x512.png",
    "/dist/manifest.json"
  ];
  
  const STATIC_CACHE = "static-cache-v1";
  
  self.addEventListener("install", event => {
    event.waitUntil(
      caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(FILES_TO_CACHE))
        .then(() => self.skipWaiting())
    );
  });
  
  self.addEventListener("activate", event => {
    const currentCaches = [STATIC_CACHE];
    event.waitUntil(
      caches.keys()
        .then(cacheNames => {
          return cacheNames.filter(
            cacheName => !currentCaches.includes(cacheName)
          );
        })
        .then(cachesToDelete => {
          return Promise.all(
            cachesToDelete.map(cacheToDelete => {
              return caches.delete(cacheToDelete);
            })
          );
        })
        .then(() => self.clients.claim())
    );
  });