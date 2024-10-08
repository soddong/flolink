package com.flolink.backend.global.auth.service;

import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.convert.Jsr310Converters;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.flolink.backend.domain.user.entity.enumtype.RoleType;
import com.flolink.backend.global.auth.entity.Refresh;
import com.flolink.backend.global.auth.repository.RefreshRepository;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.NotFoundException;
import com.flolink.backend.global.common.exception.UnAuthorizedException;
import com.flolink.backend.global.util.JwtUtil;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReissueServiceImpl implements ReissueService {

	private final JwtUtil jwtUtil;
	private final RefreshRepository refreshRepository;
	@Value("${spring.jwt.expiration.refresh-token}")
	private Long REFRESH_TOKEN_EXPIRATION;
	@Value("${spring.jwt.expiration.access-token}")
	private Long ACCESS_TOKEN_EXPIRATION;

	@Override
	public void reissue(HttpServletRequest request, HttpServletResponse response) throws JsonProcessingException {
		String refresh = null;
		LocalDateTime date = LocalDateTime.now();
		Date now = Jsr310Converters.LocalDateTimeToDateConverter.INSTANCE.convert(date);

		// cookie를 모두 꺼내서 refresh라는 이름이 있는지 확인. 있다면 refresh변수에 저장한다.
		Cookie[] cookies = request.getCookies();

		if (cookies == null) {
			log.info("cookies is null");
			throw new NotFoundException(ResponseCode.NOT_FOUND_ERROR);
		}

		for (Cookie cookie : cookies) {
			if (cookie.getName().equals("refresh")) {
				refresh = cookie.getValue();
			}
		}

		if (refresh == null) {
			//refreshToken 이 존재하지 않습니다.
			throw new UnAuthorizedException(ResponseCode.NO_REFRESHTOKEN);
		}

		//expired check
		try {
			jwtUtil.isExpired(refresh);
		} catch (ExpiredJwtException e) {
			//refreshToken 이 만료되었습니다.
			throw new UnAuthorizedException(ResponseCode.EXPIRED_TOKEN);
		}

		// 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
		String category = jwtUtil.getCategory(refresh);
		if (!category.equals("refresh")) {
			//refreshToken 이 아닙니다.
			throw new UnAuthorizedException(ResponseCode.INVALID_REFRESHTOKEN);
		}

		// DB에 저장되어 있는지 확인
		Boolean isExist = refreshRepository.existsByRefreshToken(refresh);

		if (!isExist) {
			//response body
			throw new NotFoundException(ResponseCode.NOT_FOUND_ERROR);
		}

		int userId = jwtUtil.getUserId(refresh);
		RoleType role = jwtUtil.getRoleType(refresh);
		String loginId = jwtUtil.getLoginId(refresh);

		//make new JWT
		String newAccess = jwtUtil.createJwt("access", userId, loginId, role, ACCESS_TOKEN_EXPIRATION, now);
		String newRefresh = jwtUtil.createJwt("refresh", userId, loginId, role, REFRESH_TOKEN_EXPIRATION, now);

		//Refresh 토큰 저장 DB에 기존의 Refresh 토큰 삭제 후 새 Refresh 토큰 저장
		Refresh refreshToken = Refresh.builder()
			.refreshToken(newRefresh)
			.expiredAt(date.plusSeconds(REFRESH_TOKEN_EXPIRATION))
			.build();
		refreshRepository.deleteByRefreshToken(refresh);
		refreshRepository.save(refreshToken);

		//response
		response.addHeader("Authorization", "Bearer " + newAccess);
		response.addCookie(jwtUtil.createCookies("refresh", newRefresh));
	}
}
