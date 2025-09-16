const CACHE_NAME = "notelink-v0-2";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json"
  // アイコンがあれば "./icon-192.png","./icon-512.png" を追加
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k === CACHE_NAME ? null : caches.delete(k))))
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return (
        res ||
        fetch(e.request).then((r) => {
          return r;
        })
      );
    })
  );
});
