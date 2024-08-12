package com.flolink.backend.domain.fcm.event;

import org.springframework.context.ApplicationEvent;

import lombok.Getter;

@Getter
public class FcmEvent extends ApplicationEvent {
	private final String title;
	private final String message;
	private final String fcmToken;

	public FcmEvent(Object source, String title, String message, String fcmToken) {
		super(source);
		this.title = title;
		this.message = message;
		this.fcmToken = fcmToken;
	}
}
