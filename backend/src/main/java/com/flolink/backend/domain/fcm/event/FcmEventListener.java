package com.flolink.backend.domain.fcm.event;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.flolink.backend.domain.fcm.service.FcmService;
import com.google.firebase.messaging.FirebaseMessagingException;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor

public class FcmEventListener {
	private final FcmService fcmService;

	@EventListener
	public void handleFcmNotificationEvent(FcmEvent event) throws FirebaseMessagingException {
		// FCM 메시지 전송
		fcmService.sendNotification(event.getTitle(), event.getMessage(), event.getFcmToken());
	}
}
