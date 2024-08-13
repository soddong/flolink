package com.flolink.backend.global.util;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.flolink.backend.domain.user.entity.enumtype.RoleType;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.Cookie;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtUtil {

	private SecretKey secretKey;

	public JwtUtil(@Value("${spring.jwt.secret}") String secret) {
		secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8),
			Jwts.SIG.HS256.key().build().getAlgorithm());
	}

	public RoleType getRoleType(String token) {
		Claims claims = Jwts.parser()
			.verifyWith(secretKey) // 비밀키 설정
			.build()
			.parseSignedClaims(token)
			.getPayload();
		// 클레임에서 'role' 값을 문자열로 읽기
		String roleString = claims.get("role", String.class);

		// 문자열을 RoleType으로 변환
		return RoleType.valueOf(roleString);
	}

	public int getUserId(String token) {
		return Jwts.parser()
			.verifyWith(secretKey)
			.build()
			.parseSignedClaims(token)
			.getPayload()
			.get("userId", Integer.class);
	}

	public String getCategory(String token) {
		return Jwts.parser()
			.verifyWith(secretKey)
			.build()
			.parseSignedClaims(token)
			.getPayload()
			.get("category", String.class);
	}

	public Boolean isExpired(String token) {
		return Jwts.parser()
			.verifyWith(secretKey)
			.build()
			.parseSignedClaims(token)
			.getPayload()
			.getExpiration()
			.before(new Date());
	}

	public String getLoginId(String token) {
		return Jwts.parser()
			.verifyWith(secretKey)
			.build()
			.parseSignedClaims(token)
			.getPayload()
			.get("loginId", String.class);
	}

	public String createJwt(String category, int userId, String loginId, RoleType role, Long expiredTime, Date now) {
		return Jwts.builder()
			.claim("category", category)
			.claim("userId", userId)
			.claim("role", role.name())
			.claim("loginId", loginId)
			.issuedAt(now)
			.expiration(new Date(now.getTime() + expiredTime))
			.signWith(secretKey)
			.compact();
	}

	public Cookie createCookies(String key, String value) {
		Cookie cookie = new Cookie(key, value);
		cookie.setMaxAge(24 * 60 * 60);
		cookie.setSecure(true);
		cookie.setHttpOnly(true);

		return cookie;
	}

	public int tempReturnUserId() {
		return 1;
	}

}
