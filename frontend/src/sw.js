import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

self.skipWaiting();
clientsClaim();



import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// Firebase 구성 객체를 사용해 Firebase를 초기화합니다.
const firebaseConfig = {
  apiKey: "AIzaSyAEE25E246QCHn-D7zPsHCaii1Fj-j8Vko",
  authDomain: "flolint.firebaseapp.com",
  projectId: "flolint",
  storageBucket: "flolint.appspot.com",
  messagingSenderId: "83845980646",
  appId: "1:83845980646:web:e1b2f8b93178e61d5ff627",
  measurementId: "G-K0GBPS0YQM"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);


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


