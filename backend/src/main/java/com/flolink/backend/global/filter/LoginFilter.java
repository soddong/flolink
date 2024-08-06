package com.flolink.backend.global.filter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.convert.Jsr310Converters;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.flolink.backend.domain.auth.entity.Refresh;
import com.flolink.backend.domain.auth.repository.RefreshRepository;
import com.flolink.backend.domain.user.dto.request.LoginUserRequest;
import com.flolink.backend.domain.user.dto.response.CustomUserDetails;
import com.flolink.backend.domain.user.entity.enumtype.RoleType;
import com.flolink.backend.global.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

	private final JwtUtil jwtUtil;
	private final RefreshRepository refreshRepository;
	private final AuthenticationManager authenticationManager;
	private final long accessTokenValidityInSeconds = 1000 * 60 * 10L; //10분
	private final long refreshTokenValidityInSeconds = 1000 * 60 * 60 * 24L; //24시간

	@Value("${spring.login.target-uri}")
	private String targetUrl;

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws
		AuthenticationException {

		UsernamePasswordAuthenticationToken token;
		try {
			LoginUserRequest creds = new ObjectMapper().readValue(request.getInputStream(), LoginUserRequest.class);
			token = new UsernamePasswordAuthenticationToken(creds.getLoginId(), creds.getPassword());
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

		return authenticationManager.authenticate(token);
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
		Authentication authentication) throws IOException, ServletException {
		LocalDateTime date = LocalDateTime.now();
		Date now = Jsr310Converters.LocalDateTimeToDateConverter.INSTANCE.convert(date);

		CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();

		int userId = customUserDetails.getUserId();
		RoleType roleType = customUserDetails.getRoleType();
		log.info("===로그인 성공===");
		//토큰 생성
		String access = jwtUtil.createJwt("access", userId, roleType, accessTokenValidityInSeconds, now);
		String refresh = jwtUtil.createJwt("refresh", userId, roleType, refreshTokenValidityInSeconds, now);

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

	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException failed) throws IOException, ServletException {
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	}

}
