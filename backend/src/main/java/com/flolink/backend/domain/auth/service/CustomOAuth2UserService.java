package com.flolink.backend.domain.auth.service;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flolink.backend.domain.auth.dto.response.OAuth.CustomOAuth2UserResponse;
import com.flolink.backend.domain.auth.dto.response.OAuth.GoogleResponse;
import com.flolink.backend.domain.auth.dto.response.OAuth.KakaoResponse;
import com.flolink.backend.domain.auth.dto.response.OAuth.OAuth2Response;
import com.flolink.backend.domain.auth.dto.response.OAuth.UserDTO;
import com.flolink.backend.domain.myroom.entity.MyRoom;
import com.flolink.backend.domain.user.entity.User;
import com.flolink.backend.domain.user.repository.UserRepository;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

	private final UserRepository userRepository;
	private final EntityManager em;

	@Override
	@Transactional
	public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {

		OAuth2User oAuth2User = super.loadUser(request);
		System.out.println(oAuth2User);

		String registrationId = request.getClientRegistration().getRegistrationId();
		OAuth2Response oAuth2Response = null;



		if (registrationId.equals("kakao")) {
			oAuth2Response = new KakaoResponse(oAuth2User.getAttributes());

		} else if (registrationId.equals("google")) {
			oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());

		} else {

			return null;
		}

		String loginId = oAuth2Response.getProvider() + "-" + oAuth2Response.getProviderId();

		if (!userRepository.existsByLoginId(loginId)) {
			MyRoom myRoom = MyRoom.builder()
					.itemStand(0)
					.itemRug(0)
					.itemShelf(0)
					.itemBed(0)
					.itemBigtable(0)
					.itemMinitable(0)
					.itemVase(0)
					.build();

			em.persist(myRoom);
			em.flush();

			User user = User.builder()
				.myRoomId(myRoom.getMyRoomId())
				.loginId(loginId)
				.userName(oAuth2Response.getName())
				.nickname(oAuth2Response.getName())
				.role(oAuth2Response.getRoleType())
				.build();

			userRepository.save(user);

			UserDTO userDTO = UserDTO.builder()
				.username(oAuth2Response.getName())
				.role(oAuth2Response.getProvider())
				.build();

			return new CustomOAuth2UserResponse(userDTO);
		} else {
			UserDTO userDTO = UserDTO.builder()
				.username(oAuth2Response.getName())
				.role(oAuth2Response.getProvider())
				.build();

			return new CustomOAuth2UserResponse(userDTO);
		}
	}
}
