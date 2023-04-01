const CACHE_VERSION = 1;
const CURRENT_CACHES = {
  font: `font-cache-v${CACHE_VERSION}`,
};

self.addEventListener("activate", (event) => {
  const expectedCacheNamesSet = new Set(Object.values(CURRENT_CACHES));
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!expectedCacheNamesSet.has(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open(CURRENT_CACHES.font).then((cache) => {
      return cache
        .match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(event.request.clone()).then((response) => {
            console.log(
              "  Response for %s from network is: %O",
              event.request.url,
              response
            );

            if (
              response.status < 400 &&
              response.headers.has("content-type") &&
              response.headers.get("content-type").match(/^font\//i)
            ) {
              cache.put(event.request, response.clone());
            } else {
              console.log("  Not caching the response to", event.request.url);
            }
            return response;
          });
        })
        .catch((error) => {
          throw error;
        });
    })
  );
});
