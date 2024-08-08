import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

self.addEventListener('install', function (e) {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {});

const firebaseConfig = {
  apiKey: "AIzaSyB74O7Jjifg-uNmeSgYYVNQPbnHYIfLiHk",
  authDomain: "notification-42bb2.firebaseapp.com",
  projectId: "notification-42bb2",
  storageBucket: "notification-42bb2.appspot.com",
  messagingSenderId: "705740120374",
  appId: "1:705740120374:web:0a2f640971426a83b79397",
  measurementId: "G-Q4N2GMLCT5"
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging();
// Add the public key generated from the console here.
getToken(messaging, {vapidKey: "BGh5HJhBo_zmWulsqj79hthDv0iyHlLvqqPD2U07gxcWXM-Fvf7jV9kcPtkpaXxlNRNXdUqdT5-N64nieExiIE0"});


// messaging.onBackgroundMessage(payload => {
//   // 백그라운드 메세지 핸들러
//   console.log('payload : ', payload.data);
//   const { body, title } = payload.data;
//   const notificationOptions = {
//     body: body, // 매세지 내용
//     icon: '/src/assets/favicon.ico', // 로고 이미지 들어가는곳
//     data: payload.data,
//   };

//   self.registration.showNotification(title, notificationOptions);
// });

// 알림 클릭시
// self.addEventListener('notificationclick', function (event) {
//   const url = '/';
//   event.notification.close();
//   event.waitUntil(clients.openWindow(url));
// });