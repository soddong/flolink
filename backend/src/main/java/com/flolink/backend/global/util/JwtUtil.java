package com.flolink.backend.global.util;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.SignatureException;
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

	;

	public int getUserId(String token) {
		return Jwts.parser()
			.verifyWith(secretKey)
			.build()
			.parseSignedClaims(token)
			.getPayload()
			.get("userId", Integer.class);
	}

	public int getMyRoomId(String token) {
		return Jwts.parser()
			.verifyWith(secretKey)
			.build()
			.parseSignedClaims(token)
			.getPayload()
			.get("myRoomId", Integer.class);
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

	public String createJwt(String category, int userId, int myRoomId, Long expiredTime, Date now) {
		System.out.println(new Date(now.getTime() + expiredTime));
		return Jwts.builder()
			.claim("category", category)
			.claim("userId", userId)
			.claim("myRoomId", myRoomId)
			.issuedAt(now)
			.expiration(new Date(now.getTime() + expiredTime))
			.signWith(secretKey)
			.compact();
	}

	public Cookie createCookies(String key, String value) {
		Cookie cookie = new Cookie(key, value);
		cookie.setMaxAge(24 * 60 * 60);
		cookie.setSecure(true);
		// cookie.setPath("/login");
		// cookie.setPath("/reissue");
		// cookie.setPath("/logout");
		cookie.setHttpOnly(true);

		return cookie;
	}

	public Claims decryptToken(String token) {

		try {
			return Jwts.parser()
				.verifyWith(secretKey)
				.build()
				.parseSignedClaims(token)
				.getPayload();
		} catch (SignatureException e) {
			// 서명 검증 실패 시 처리
			throw new RuntimeException("Invalid JWT signature");
		} catch (Exception e) {
			// 토큰 파싱 오류 시 처리
			throw new RuntimeException("Invalid JWT token");
		}
	}

	public int tempReturnUserId() {
		return 1;
	}

}
