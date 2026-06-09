const CACHE = "horario-v1";
const ASSETS = ["index.html", "/Escolar/manifest.json"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  if (e.request.url.includes("supabase.co")) return; // nunca cacheia requests da sala
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
