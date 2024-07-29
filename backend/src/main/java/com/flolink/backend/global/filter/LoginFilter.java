package com.flolink.backend.global.filter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Iterator;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.flolink.backend.domain.auth.entity.Refresh;
import com.flolink.backend.domain.auth.repository.RefreshRepository;
import com.flolink.backend.domain.user.dto.response.CustomUserDetails;
import com.flolink.backend.global.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

	private final AuthenticationManager authenticationManager;
	private final JwtUtil jwtUtil;
	private final RefreshRepository refreshRepository;
	private final long accessTokenValidityInSeconds = 1000 * 60 * 10L; //10분
	private final long refreshTokenValidityInSeconds = 1000 * 60 * 60 * 24L; //24시간

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws
		AuthenticationException {

		String username = obtainUsername(request);
		String password = obtainPassword(request);

		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password,
			null);

		return authenticationManager.authenticate(authToken);
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
		Authentication authentication) throws IOException, ServletException {

		CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();

		Integer userId = customUserDetails.getUserId();
		Integer myRoomId = customUserDetails.getMyRoomId();

		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
		Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
		GrantedAuthority auth = iterator.next();

		//토큰 생성
		String access = jwtUtil.createJwt("access", userId, myRoomId, accessTokenValidityInSeconds);
		String refresh = jwtUtil.createJwt("refresh", userId, myRoomId, refreshTokenValidityInSeconds);

		//Refresh 토큰 저장
		Refresh refreshEntity = Refresh.builder()
			.userId(userId)
			.refreshToken(refresh)
			.expiredAt(LocalDateTime.now().plusDays(1))
			.build();
		refreshRepository.save(refreshEntity);

		//응답 설정
		response.addHeader("access", access);
		response.addCookie(createCookies("refresh", refresh));
		response.setStatus(HttpStatus.OK.value());
	}

	private Cookie createCookies(String key, String value) {
		Cookie cookie = new Cookie(key, value);
		cookie.setMaxAge(24 * 60 * 60);
		//        cookie.setSecure(true);
		//        cookie.setPath("/");
		cookie.setHttpOnly(true);

		return cookie;
	}

	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException failed) throws IOException, ServletException {
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	}

}
