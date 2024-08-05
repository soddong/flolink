package com.flolink.backend.domain.auth.handler;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;

import com.flolink.backend.domain.myroom.entity.MyRoom;
import com.flolink.backend.domain.user.entity.enumtype.RoleType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.convert.Jsr310Converters;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.flolink.backend.domain.auth.dto.response.OAuth.CustomOAuth2UserResponse;
import com.flolink.backend.domain.auth.entity.Refresh;
import com.flolink.backend.domain.auth.repository.RefreshRepository;
import com.flolink.backend.global.util.JwtUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomSuccessHandler implements AuthenticationSuccessHandler {

	private final long accessTokenValidityInSeconds = 1000 * 60 * 10L; //10분
	private final long refreshTokenValidityInSeconds = 1000 * 60 * 60 * 24L; //24시간

	private final JwtUtil jwtUtil;
	private final RefreshRepository refreshRepository;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException, ServletException {

		log.info("===Oauth2 Login 성공===");
		//OAuth2User
		CustomOAuth2UserResponse customUserDetails = (CustomOAuth2UserResponse)authentication.getPrincipal();

		int userId = customUserDetails.getUserId();
		MyRoom myRoomId = customUserDetails.getMyRoom();
        RoleType role = customUserDetails.getRoleType();

		//현재 시간
		LocalDateTime date = LocalDateTime.now();
		Date now = Jsr310Converters.LocalDateTimeToDateConverter.INSTANCE.convert(date);

		//토큰 생성
		String access = jwtUtil.createJwt("access", userId, myRoomId, role, accessTokenValidityInSeconds, now);
		String refresh = jwtUtil.createJwt("refresh", userId, myRoomId, role, refreshTokenValidityInSeconds, now);

		//Refresh 토큰 저장
		Refresh refreshEntity = Refresh.builder()
			.refreshToken(refresh)
			.expiredAt(date.plusSeconds(refreshTokenValidityInSeconds))
			.build();
		refreshRepository.save(refreshEntity);

		//응답 설정
		response.addHeader("Authorization", "Bearer " + access);
		response.addCookie(jwtUtil.createCookies("refresh", refresh));
		response.setStatus(HttpStatus.OK.value());
	}
}
