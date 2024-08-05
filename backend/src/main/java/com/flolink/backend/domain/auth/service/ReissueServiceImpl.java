package com.flolink.backend.domain.auth.service;

import java.time.LocalDateTime;
import java.util.Date;

import com.flolink.backend.domain.myroom.entity.MyRoom;
import com.flolink.backend.domain.user.entity.enumtype.RoleType;
import org.springframework.data.convert.Jsr310Converters;
import org.springframework.stereotype.Service;

import com.flolink.backend.domain.auth.entity.Refresh;
import com.flolink.backend.domain.auth.repository.RefreshRepository;
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
	private final long accessTokenValidityInSeconds = 1000 * 60 * 10L;
	private final long refreshTokenValidityInSeconds = 1000 * 60 * 60 * 24L;

	@Override
	public void reissue(HttpServletRequest request, HttpServletResponse response) {
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
		MyRoom myRoom = jwtUtil.getMyRoom(refresh);
		RoleType role = jwtUtil.getRoleType(refresh);

		//make new JWT
		String newAccess = jwtUtil.createJwt("access", userId, myRoom, role, accessTokenValidityInSeconds, now);
		String newRefresh = jwtUtil.createJwt("refresh", userId, myRoom, role, refreshTokenValidityInSeconds, now);

		//Refresh 토큰 저장 DB에 기존의 Refresh 토큰 삭제 후 새 Refresh 토큰 저장
		Refresh refreshToken = Refresh.builder()
			.refreshToken(newRefresh)
			.expiredAt(date.plusSeconds(refreshTokenValidityInSeconds))
			.build();
		refreshRepository.deleteByRefreshToken(refresh);
		refreshRepository.save(refreshToken);

		//response
		response.addHeader("Authorization", "Bearer " + newAccess);
		response.addCookie(jwtUtil.createCookies("refresh", newRefresh));
	}
}
