// Nombre del cache
const CACHE_NAME = 'app-esmeralda-cache-v1';

// Lista de archivos para cachear (todos los archivos que componen la app)
const urlsToCache = [
  './index.html',
  './styles.css',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './foto1.jpg', // Asegúrate de que este nombre coincida
  './foto2.jpg', // Asegúrate de que este nombre coincida
  // 'mi_cancion_de_amor.mp3' - Opcional: solo cachéalo si es pequeño. Si es grande, mejor cargarlo online.
];

// Evento: Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierto, agregando archivos.');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento: Fetch (sirve los archivos desde el cache)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si hay una respuesta en cache, la devuelve
        if (response) {
          return response;
        }
        // Si no está en cache, va a la red
        return fetch(event.request);
      })
  );
});

// Evento: Activación (limpieza de caches antiguos)
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Elimina caches antiguos
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
