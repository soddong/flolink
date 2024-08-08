import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

self.skipWaiting();
clientsClaim();

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-location') {
    event.waitUntil(syncLocation());
  }
});

self.addEventListener('push', event => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/assets/common/setting_icon.png',
    badge: '/assets/common/setting_icon.png'
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

async function syncLocation() {
  try {
    const position = await getPosition();
    const { latitude, longitude } = position.coords;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  } catch (error) {
    console.error('Error getting location:', error);
  }
}

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


