package com.flolink.backend.global.config;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import com.flolink.backend.domain.auth.repository.RefreshRepository;
import com.flolink.backend.domain.auth.service.CustomOAuth2UserService;
import com.flolink.backend.domain.auth.service.ReissueService;
import com.flolink.backend.global.filter.CustomLogoutFilter;
import com.flolink.backend.global.filter.JwtFilter;
import com.flolink.backend.global.filter.LoginFilter;
import com.flolink.backend.global.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final AuthenticationConfiguration authenticationConfiguration;
	private final JwtUtil jwtUtil;
	private final RefreshRepository refreshRepository;
	private final ReissueService reissueService;
	private final DefaultOAuth2UserService customOAuth2UserService;

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
		return configuration.getAuthenticationManager();
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http
			.cors((corsCustomizer) -> corsCustomizer.configurationSource(new CorsConfigurationSource() {
				@Override
				public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
					CorsConfiguration configuration = new CorsConfiguration();

					configuration.setAllowedOrigins(Collections.singletonList("http://localhost:3000")); //프론트앤드 서버
					configuration.setAllowedMethods(Collections.singletonList("*"));
					configuration.setAllowCredentials(true);
					configuration.setAllowedHeaders(Collections.singletonList("*"));
					configuration.setMaxAge(3600L);

					configuration.setExposedHeaders(Collections.singletonList("Authorization"));

					return configuration;
				}
			}));

		//csrf disable
		http
			.csrf((auth) -> auth.disable());

		//From 로그인 방식 disable
		http
			.formLogin((auth) -> auth.disable());

		//http basic 인증 방식 disable
		http
			.httpBasic((auth) -> auth.disable());

		//경로별 인가 작업
		http
			// 모든 경로에 대해 인가작업 미진행 (모두 허가)
			.authorizeHttpRequests((auth) -> auth
				.anyRequest().permitAll());
		// (/, /login, /join) 의 경로에 대해서만 혀가
		// .authorizeHttpRequests((auth) -> auth
		// 	.requestMatchers("/login", "/", "/join").permitAll()
		// 	.requestMatchers("/reissue", "/oauth2/**").permitAll()
		// 	.anyRequest().authenticated());

		//oauth2
//		http
//			.oauth2Login((oauth2) -> oauth2
//				.userInfoEndpoint((userInfoEndpointConfig) -> userInfoEndpointConfig
//					.userService(customOAuth2UserService)));
		http
				.oauth2Login(oauth2 -> oauth2
						.redirectionEndpoint(endpoint -> endpoint.baseUri("/login/oauth2/code/*"))
						.userInfoEndpoint(endpoint -> endpoint.userService(customOAuth2UserService)));


		//jwt 검증 필터
		http
			.addFilterBefore(new JwtFilter(jwtUtil, reissueService), LoginFilter.class);

		// 로그아웃 필터
		http
			.addFilterBefore(new CustomLogoutFilter(jwtUtil, refreshRepository), LogoutFilter.class);

		// 로그인 필터
		http
			.addFilterAt(
				new LoginFilter(jwtUtil, refreshRepository, authenticationManager(authenticationConfiguration)),
				UsernamePasswordAuthenticationFilter.class);

		//세션 설정 (stateless 설정)
		http
			.sessionManagement((session) -> session
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		return http.build();
	}
}
