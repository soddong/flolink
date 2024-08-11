package com.flolink.backend.domain.fcm.service;

import org.springframework.stereotype.Service;

import com.flolink.backend.domain.fcm.entity.Fcm;
import com.flolink.backend.domain.fcm.repository.FcmRepository;
import com.flolink.backend.domain.user.entity.User;
import com.flolink.backend.domain.user.repository.UserRepository;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.NotFoundException;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FcmServiceImpl implements FcmService {
	private final FirebaseMessaging firebaseMessaging;
	private final FcmRepository fcmRepository;
	private final UserRepository userRepository;

	@Override
	public void sendNotification(final String title, final String body, final String token) throws
		FirebaseMessagingException {
		Message message = Message.builder()
			.setNotification(Notification.builder()
				.setTitle(title)
				.setBody(body)
				.build())
			.setToken(token)
			.build();
		firebaseMessaging.send(message);
	}

	@Override
	public void saveToken(final Integer userId, final String token) {
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.USER_NOT_FOUND));
		Fcm fcm = Fcm.builder()
			.fcmToken(token)
			.user(user)
			.build();
		fcmRepository.save(fcm);
	}
}
