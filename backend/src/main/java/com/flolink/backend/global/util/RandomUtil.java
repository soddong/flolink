package com.flolink.backend.global.util;

import java.util.UUID;

public class RandomUtil {

	public static String generateRandomUUID() {
		return UUID.randomUUID().toString();
	}
}
