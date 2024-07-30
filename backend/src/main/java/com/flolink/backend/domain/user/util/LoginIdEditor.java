package com.flolink.backend.domain.user.util;

import org.springframework.stereotype.Component;

@Component
public class LoginIdEditor {

	public String maskId(String loginId) {
		if (loginId == null || loginId.length() < 6) {
			throw new IllegalArgumentException("ID must be at least 6 characters long");
		}

		// 앞의 3자리와 뒤의 3자리 추출
		String prefix = loginId.substring(0, 3);
		String suffix = loginId.substring(loginId.length() - 3);

		// 가운데 부분의 별표 수 계산
		int maskLength = loginId.length() - 6;
		StringBuilder maskedMiddle = new StringBuilder();
		for (int i = 0; i < maskLength; i++) {
			maskedMiddle.append('*');
		}

		// 결과 문자열 구성
		return prefix + maskedMiddle + suffix;
	}
}
