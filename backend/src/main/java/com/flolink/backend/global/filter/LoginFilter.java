package com.flolink.backend.global.filter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Date;

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
import com.flolink.backend.global.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

	private final JwtUtil jwtUtil;
	private final RefreshRepository refreshRepository;
	private final AuthenticationManager authenticationManager;
	private final long accessTokenValidityInSeconds = 1000 * 60 * 10L; //10분
	private final long refreshTokenValidityInSeconds = 1000 * 60 * 60 * 24L; //24시간

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

		Integer userId = customUserDetails.getUserId();
		Integer myRoomId = customUserDetails.getMyRoomId();

		//토큰 생성
		String access = jwtUtil.createJwt("access", userId, myRoomId, accessTokenValidityInSeconds, now);
		String refresh = jwtUtil.createJwt("refresh", userId, myRoomId, refreshTokenValidityInSeconds, now);

		//Refresh 토큰 저장
		Refresh refreshEntity = Refresh.builder()
			.refreshToken(refresh)
			.expiredAt(date.plusSeconds(refreshTokenValidityInSeconds))
			// .expiredAt(LocalDateTime.now().plusDays(1))
			.build();
		refreshRepository.save(refreshEntity);

		//응답 설정
		response.addHeader("access", access);
		response.addCookie(jwtUtil.createCookies("refresh", refresh));
		response.setStatus(HttpStatus.OK.value());
	}

	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException failed) throws IOException, ServletException {
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	}

}
