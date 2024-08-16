package com.flolink.backend.global.config;

import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;

@Configuration
public class FcmConfig {

	private final ClassPathResource firebaseResource = new ClassPathResource(
		"flolint-firebase-adminsdk-w9h2b-6390b9781c.json");

	@Bean
	FirebaseApp firebaseApp() throws IOException {
		FirebaseOptions options = FirebaseOptions.builder()
			.setCredentials(GoogleCredentials.fromStream(
				firebaseResource.getInputStream()))
			.build();

		return FirebaseApp.initializeApp(options);
	}

	@Bean
	FirebaseMessaging firebaseMessaging() throws IOException {
		return FirebaseMessaging.getInstance(firebaseApp());
	}
}
