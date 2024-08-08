import React from 'react'

function PushNotificationSubscriber() {
  const subscribeToPushNotifications = async () => {
    try {
        console.log('응애')
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'BLnVk1MBWLE9xVVXNk5UyZFr6bxewPP6u5LrAXnaVH7GCFoGpWXs4jgx49dXD7o2qxT3DvyAbeENGCHHwzKyKFY'
      })
      
      // 서버에 구독 정보 전송
      await fetch('/api/push-subscription', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      console.log('Push notification subscription successful')

      triggerNotification(registration);
    } catch (error) {
      console.error('Error subscribing to push notifications:', error)
    }
  }

  const triggerNotification = async (registration) => {
    try {
      const title = '알림';
      const options = {
        body: '당신의 주말이 삭제되었습니다.',
      };
      registration.showNotification(title, options);
    } catch (error) {
      console.error('Error triggering notification:', error);
    }
  };

  return (
    <button onClick={subscribeToPushNotifications}>
      푸시 알림 구독하기
    </button>
  )
}

export default PushNotificationSubscriber