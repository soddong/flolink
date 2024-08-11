import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

self.skipWaiting();
clientsClaim();




function getPosition() {
  return new Promise((resolve, reject) => {
    self.clients.matchAll().then(clients => {
      if (clients && clients.length) {
        clients[0].postMessage({type: 'GET_POSITION'});
        self.addEventListener('message', (event) => {
          if (event.data && event.data.type === 'POSITION') {
            resolve(event.data.position);
          }
        });
      } else {
        reject(new Error('No clients available'));
      }
    });
  });
}


