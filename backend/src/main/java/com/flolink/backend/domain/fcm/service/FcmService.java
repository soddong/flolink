package com.flolink.backend.domain.fcm.service;

import com.google.firebase.messaging.FirebaseMessagingException;

public interface FcmService {

	void sendNotification(final String title, final String body, final String token) throws
		FirebaseMessagingException;

	void saveToken(final Integer userId, final String token);
}
