package com.flolink.backend.global.filter;

import com.flolink.backend.domain.auth.service.ReissueService;
import com.flolink.backend.domain.user.dto.response.CustomUserDetails;
import com.flolink.backend.domain.user.entity.User;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.util.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;

@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

	private final JwtUtil jwtUtil;
	private final ReissueService reissueService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {
		// 헤더에서 access키에 담긴 토큰을 꺼냄
		String accessToken = request.getHeader("Authorization");

		// 토큰이 없다면 다음 필터로 넘김
		if (accessToken == null) {
			filterChain.doFilter(request, response);
			return;
		}

		// Bearer 일 경구 prefix
		if (accessToken.startsWith("Bearer ")) {
			accessToken = accessToken.substring(7);
		}

		// 토큰 만료 여부 확인, 만료시 재발급(reissue)
		try {
			jwtUtil.isExpired(accessToken);
		} catch (ExpiredJwtException e) {
			//response body
			PrintWriter writer = response.getWriter();
			writer.print("access token expired");

			//response status code
			response.setStatus(ResponseCode.EXPIRED_TOKEN.getStatus());
			return;
		}

		// 토큰이 access인지 확인 (발급시 페이로드에 명시)
		String category = jwtUtil.getCategory(accessToken);

		if (!category.equals("access")) {

			//response body
			PrintWriter writer = response.getWriter();
			writer.print("invalid access token");

			//response status code
			response.setStatus(ResponseCode.EXPIRED_TOKEN.getStatus());
			return;
		}

		// userId, myRoomId 값을 획득
		int userId = jwtUtil.getUserId(accessToken);

		User user = User.builder()
			.userId(userId)
			.build();

		CustomUserDetails customUserDetails = new CustomUserDetails(user);

		Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, accessToken,
			customUserDetails.getAuthorities());
		SecurityContextHolder.getContext().setAuthentication(authToken);

		filterChain.doFilter(request, response);
	}
}
