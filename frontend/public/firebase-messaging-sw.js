importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
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
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.onBackgroundMessage(messaging, (payload) => {
    console.log('Received background message ', payload);

    const { title, body } = payload.notification;
    const options = {
        body: body,
        icon: './logo_96.png',
        badge: './logo_96.png'
    };

    self.registration.showNotification(title, options);
});
self.addEventListener("install", function (e) {
    console.log("fcm sw install..");
    self.skipWaiting();
});

self.addEventListener("activate", function (e) {
    console.log("fcm sw activate..");
});

