import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyAEE25E246QCHn-D7zPsHCaii1Fj-j8Vko",
    authDomain: "flolint.firebaseapp.com",
    projectId: "flolint",
    storageBucket: "flolint.appspot.com",
    messagingSenderId: "83845980646",
    appId: "1:83845980646:web:e1b2f8b93178e61d5ff627",
    measurementId: "G-K0GBPS0YQM"
};
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const requestPermissionAndGetToken = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            const token = await getToken(messaging, {
                vapidKey: import.meta.env.VITE_FCM_KEY
            });
            if (token) {
                console.log('FCM Token:', token);
                // 토큰을 백엔드로 전송
                await sendTokenToServer(token);
                return token;
            } else {
                alert(
                    "토큰 등록이 불가능 합니다. 생성하려면 권한을 허용해주세요"
                );
            }
        } else if (permission === "denied") {
            alert(
                "web push 권한이 차단되었습니다. 알림을 사용하시려면 권한을 허용해주세요"
            );
        }
    } catch (err) {
        console.error('토큰 가져오다 오류발생', err);
        throw err;
    }
};

// 토큰을 백엔드로 전송하는 함수
const sendTokenToServer = async (token) => {
    try {
        // const response = await fetch('https://your-backend-server.com/api/token', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ token }),
        // });
        // if (!response.ok) {
        //   throw new Error('Failed to send token to server');
        // }
        console.log('Token sent to server successfully');
    } catch (err) {
        console.error('Failed to send token to server:', err);
    }
}; 
onMessage(messaging, (payload) => { //실행중일 때 메시지수신
    
    console.log('Message received. ', payload);

    
});