'use strict';

const CACHE_NAME = 'dota-app-conteudo';

const FILES_TO_CACHE = [
    'images/icons/favicon.ico',
    'mock/dados.json',
    'css/neumorphism.css',
    'bootstrap/css/bootstrap.min.css',
    'bootstrap/css/bootstrap.min.css.map',
    'bootstrap/js/bootstrap.min.js',
    'bootstrap/js/bootstrap.min.js.map',
    'js/jquery-3.5.1.min.js',
    'js/popper.min.js',
    'js/popper.min.js.map',
    'js/app.js',
    'offline.html'
];

//Instala o service worker no browser
self.addEventListener('install', (evt) => {

    console.log('[ServiceWorker] Instalando...');

    evt.waitUntil(

        caches.open(CACHE_NAME).then((cache) => {

            console.log('[ServiceWorker] Fazendo cache dos arquivos da aplicação');
            return cache.addAll(FILES_TO_CACHE);
        })

    );
    self.skipWaiting();
});

//Gera o CACHE dos arquivos estáticos
self.addEventListener('activate', (evt) => {

    console.log('[ServiceWorker] Ativando...');

    evt.waitUntil(

        caches.keys().then((keylist) => {

            return Promise.all(keylist.map((key) => {

                //console.log('[ServiceWorker] Removendo cache antigo...');
                if(key !== CACHE_NAME){
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});

//Responder a versão offline do app
self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Recebendo', evt.request.url);

    if (evt.request.mode !== 'navigate') {

        return;
    }
    evt.respondWith(
        fetch(evt.request)
            .catch(() => {
                return caches.open(CACHE_NAME)
                    .then((cache) => {
                        return cache.match('offline.html');
                    });
            })
    );

});
