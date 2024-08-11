package com.flolink.backend.global.config;

import java.io.FileInputStream;
import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;

@Configuration
public class FcmConfig {

	@Bean
	public FirebaseApp firebaseApp() throws IOException {
		try {
			FileInputStream serviceAccount = new FileInputStream(
				"./src/main/resources/flolint-firebase-adminsdk-w9h2b-6390b9781c.json");

			FirebaseOptions options = FirebaseOptions
				.builder()
				.setCredentials(GoogleCredentials.fromStream(serviceAccount))
				.build();
			return FirebaseApp.initializeApp(options);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	@Bean
	public FirebaseMessaging firebaseMessaging(FirebaseApp firebaseApp) {
		return FirebaseMessaging.getInstance(firebaseApp);
	}
}
