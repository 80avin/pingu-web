const cacheName='pingu1'; 
const staticAssets =[
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
'./assets/steps-flapping.png',
'./assets/steps-moon.png',
'./assets/steps-moon.png',
'./assets/steps-ascending.png',
'./assets/steps-tiptoe.png',
'./assets/steps-shakeleg.png',
'./assets/steps-shakeleg.png',
'./assets/steps-bend.png',
'./assets/steps-bend.png',
'./assets/steps-jump.png',
'./assets/steps-updown.png',
'./assets/steps-crusaito.png',
'./assets/steps-crusaito.png',
'./assets/blank.png',
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
      return cache.addAll([
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
        './assets/steps-flapping.png',
        './assets/steps-moon.png',
        './assets/steps-moon.png',
        './assets/steps-ascending.png',
        './assets/steps-tiptoe.png',
        './assets/steps-shakeleg.png',
        './assets/steps-shakeleg.png',
        './assets/steps-bend.png',
        './assets/steps-bend.png',
        './assets/steps-jump.png',
        './assets/steps-updown.png',
        './assets/steps-crusaito.png',
        './assets/steps-crusaito.png',
        './assets/blank.png',
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
        ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});
