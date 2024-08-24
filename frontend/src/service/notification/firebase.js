import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { axiosCommonInstance } from '../../apis/axiosInstance';

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
export const sendTokenToServer = async (token) => {
    try {
        axiosCommonInstance.post(`/fcm/register`,token);
        console.log('Token sent to server successfully');
    } catch (err) {
        console.error('Failed to send token to server:', err);
    }
}; 
onMessage(messaging, (payload) => { //실행중일 때 메시지수신
    
    console.log('Message received. ', payload);

    
});

export const getNoti = async(userRoomId) => {
    const { data } = await axiosCommonInstance.get('/noti', { params: {userRoomId}})
    return data
}