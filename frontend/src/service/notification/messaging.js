// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

// const firebaseConfig = {
//     apiKey: "AIzaSyB74O7Jjifg-uNmeSgYYVNQPbnHYIfLiHk",
//     authDomain: "notification-42bb2.firebaseapp.com",
//     projectId: "notification-42bb2",
//     storageBucket: "notification-42bb2.appspot.com",
//     messagingSenderId: "705740120374",
//     appId: "1:705740120374:web:0a2f640971426a83b79397",
//     measurementId: "G-Q4N2GMLCT5"
//   };

// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging();
// // Add the public key generated from the console here.
// getToken(messaging, {vapidKey: "BGh5HJhBo_zmWulsqj79hthDv0iyHlLvqqPD2U07gxcWXM-Fvf7jV9kcPtkpaXxlNRNXdUqdT5-N64nieExiIE0"});

// // export const requestPermission = async () => {
// //   try {
// //     const permission = await Notification.requestPermission();
// //     if (permission === "granted") {
// //       console.log("알림 권한 허용");
// //       const token = await getToken(messaging, {
// //         vapidKey: "BGh5HJhBo_zmWulsqj79hthDv0iyHlLvqqPD2U07gxcWXM-Fvf7jV9kcPtkpaXxlNRNXdUqdT5-N64nieExiIE0", // FCM 콘솔에서 발급받은 VAPID 키
// //       });
// //       console.log("FCM 토큰:", token);
// //       // 토큰을 서버에 저장하여 메시지를 보낼 수 있도록 합니다.
// //     } else {
// //       console.log("알림 권한 거부");
// //     }
// //   } catch (error) {
// //     console.error("알림 권한 요청 오류:", error);
// //   }
// // };

// function requestPermission() {
//     console.log('Requesting permission...');
//     Notification.requestPermission().then((permission) => {
//       if (permission === 'granted') {
//         console.log('Notification permission granted.');
//       }})
//     }

// export const onMessageListener = () => {
//   onMessage(messaging, (payload) => {
//     console.log("새로운 메시지 수신:", payload);
//     // 메시지 처리 로직 추가
//   });
// };

// export default {
//   requestPermission,
//   onMessageListener,
// };