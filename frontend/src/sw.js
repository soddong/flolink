import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST)

self.skipWaiting()
clientsClaim()

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING')
      self.skipWaiting()
  })self.addEventListener('push', event => {
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
