package com.flolink.backend.global.utils;

import java.util.UUID;

public class RandomUtils {

	public static String generateRandomUUID() {
		return UUID.randomUUID().toString();
	}
}
