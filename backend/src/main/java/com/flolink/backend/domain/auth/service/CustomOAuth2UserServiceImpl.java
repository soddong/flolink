package com.flolink.backend.domain.auth.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.flolink.backend.domain.myroom.entity.MyRoom;
import com.flolink.backend.domain.user.entity.User;
import com.flolink.backend.domain.user.entity.enumtype.RoleType;
import com.flolink.backend.domain.user.repository.UserRepository;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserServiceImpl extends DefaultOAuth2UserService implements CustomOAuth2UserService {

	private final UserRepository userRepository;
	private final EntityManager em;

	@Override
	@Transactional
	public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {

		OAuth2User oAuth2User = super.loadUser(request);
		String oauthClientName = request.getClientRegistration().getClientName();

		try {
			System.out.println(new ObjectMapper().writeValueAsString(oAuth2User.getAttributes()));
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		String loginId = null;
		String userName = null;

		User user = User.builder()
			.point(BigDecimal.ZERO)
			.createdAt(LocalDateTime.now())
			.useYn(true)
			.build();

		if (oauthClientName.equals("kakao")) {
			loginId = "kakao_" + oAuth2User.getAttributes().get("id");
			Map<String, Object> kakaoAccount = (Map<String, Object>)oAuth2User.getAttributes().get("kakao_account");

			// `profile` 객체를 가져옵니다.
			Map<String, Object> profile = (Map<String, Object>)kakaoAccount.get("profile");

			// `nickname` 값을 가져옵니다.
			userName = (String)profile.get("nickname");

			user.setRole(RoleType.KAKAO);
		} else if (oauthClientName.equals("google")) {
			loginId = "google_" + oAuth2User.getAttributes().get("id");
			userName = (String)oAuth2User.getAttributes().get("name");
			user.setRole(RoleType.GOOGLE);
		}

		boolean isExists = userRepository.existsByLoginId(loginId);
		if (!isExists) {
			MyRoom myRoom = MyRoom.builder()
				.itemTable(0)
				.itemChair(0)
				.itemPot(0)
				.itemPhotoFrame(0)
				.build();

			em.persist(myRoom);
			em.flush();

			user.setMyRoomId(myRoom.getMyRoomId());
			user.setLoginId(loginId);
			user.setNickname(userName);
			user.setUserName(userName);

			userRepository.save(user);
		}

		return oAuth2User;
	}

}
