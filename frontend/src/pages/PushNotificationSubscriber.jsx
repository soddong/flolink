import React from 'react'
import { requestPermission, onMessageListener } from '../service/notification/messaging'

function PushNotificationSubscriber() {
  const subscribeToPushNotifications = async () => {

    try {
      requestPermission();
      onMessageListener();
    }
    catch(error) {
      console.log(error)
    }
  }

  return (
    <button onClick={subscribeToPushNotifications}>
      푸시 알림 구독하기
    </button>
  )
}

export default PushNotificationSubscriber