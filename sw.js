const CACHE_NAME = 'gym-lydia-v2';

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll([
            './index.html'
        ]))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        // Intenta descargar de internet primero (Network first)
        fetch(e.request)
            .then((response) => {
                // Si hay internet, actualiza la copia guardada
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(e.request, responseClone);
                });
                return response;
            })
            .catch(() => {
                // Si no hay internet, saca la versión guardada de la memoria
                return caches.match(e.request);
            })
    );
});
