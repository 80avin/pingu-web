var cacheName='Pingu-V1.0.1'; 
var staticAssets =[
'./',
'./index.html', 
'./css/style.css', 
'./css/materialize.css', 
'./css/materialize.min.css', 
'./js/app.js', 
'./js/jquery-3.3.1.min.js',
'./js/materialize.js',
'./js/materialize.min.js',
'./assets/steps-swing.png',
'./assets/steps-jitter.png',
'./assets/steps-flapping.png',
'./assets/steps-moon.png',
'./assets/steps-ascending.png',
'./assets/steps-tiptoe.png',
'./assets/steps-shakeleg.png',
'./assets/steps-bend.png',
'./assets/steps-jump.png',
'./assets/steps-updown.png',
'./assets/steps-crusaito.png',
'./assets/blank-128.png',
'./assets/blank-144.png',
'./assets/blank-152.png',
'./assets/blank-192.png',
'./assets/blank-256.png',
'./assets/blank-512.png',
'./assets/sounds-connect.png',
'./assets/sounds-fart2.png',
'./assets/sounds-surprised.png',
'./assets/sounds-ohooh1.png',
'./assets/sounds-ohooh2.png',
'./assets/sounds-cuddle.png',
'./assets/sounds-sleep.png',
'./assets/sounds-happy.png',
'./assets/sounds-superhappy.png',
'./assets/sounds-happyshort.png',
'./assets/sounds-sad.png',
'./assets/sounds-confused.png'
]; 

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(staticAssets);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
