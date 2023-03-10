'use strict'

const CACHE_NAME = 'notesmanager';
// The files we want to cache
const resourceList = [
  '/',
  'https://thedoggybrad.github.io/notesmanager/index.html',
  'https://cdn.jsdelivr.net/gh/thedoggybrad/notesmanager@main/favicon.png',
  'https://cdn.jsdelivr.net/gh/thedoggybrad/notesmanager@main/style.css',
  'https://cdn.jsdelivr.net/gh/thedoggybrad/notesmanager@main/script.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/marked/1.2.2/marked.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => {
    return cache.addAll(resourceList);
  }));
});

function addToCache(cacheName, resourceList) {
  caches.open(cacheName).then(cache => {
    return cache.addAll(resourceList);
  });
}

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => {
    return response || fetch(event.request);
  }));
});
