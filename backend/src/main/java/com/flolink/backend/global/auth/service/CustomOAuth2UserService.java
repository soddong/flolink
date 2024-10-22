package com.flolink.backend.global.auth.service;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flolink.backend.domain.myroom.entity.MyRoom;
import com.flolink.backend.domain.myroom.repository.MyRoomRepository;
import com.flolink.backend.domain.user.entity.User;
import com.flolink.backend.domain.user.entity.enumtype.RoleType;
import com.flolink.backend.domain.user.repository.UserRepository;
import com.flolink.backend.global.auth.dto.response.OAuth.CustomOAuth2UserResponse;
import com.flolink.backend.global.auth.dto.response.OAuth.GoogleResponse;
import com.flolink.backend.global.auth.dto.response.OAuth.KakaoResponse;
import com.flolink.backend.global.auth.dto.response.OAuth.OAuth2Response;
import com.flolink.backend.global.auth.dto.response.OAuth.UserDTO;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.NotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

	private final UserRepository userRepository;
	private final MyRoomRepository myRoomRepository;

	@Override
	@Transactional
	public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {

		OAuth2User oAuth2User = super.loadUser(request);
		System.out.println(oAuth2User);

		String registrationId = request.getClientRegistration().getRegistrationId();
		OAuth2Response oAuth2Response = null;
		RoleType roleType = null;

		if (registrationId.equals("kakao")) {
			oAuth2Response = new KakaoResponse(oAuth2User.getAttributes());
			roleType = RoleType.KAKAO;

		} else if (registrationId.equals("google")) {
			oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
			roleType = RoleType.GOOGLE;

		} else {
			return null;
		}
		String loginId =
			oAuth2Response.getProvider() + "-" + oAuth2Response.getProviderId() + "-" + oAuth2Response.getName();

		if (!userRepository.existsByLoginId(loginId)) {

			MyRoom myRoom = MyRoom.createMyRoom();

			myRoomRepository.saveAndFlush(myRoom);

			User user = User.builder()
				.myRoom(myRoom)
				.loginId(loginId)
				.userName(oAuth2Response.getName())
				.nickname(oAuth2Response.getName())
				.role(roleType)
				.useYn(true)
				.build();

			userRepository.save(user);

			UserDTO userDTO = UserDTO.from(user);

			return new CustomOAuth2UserResponse(userDTO);
		} else {
			User user = userRepository.findByLoginId(loginId)
				.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));

			UserDTO userDTO = UserDTO.from(user);

			return new CustomOAuth2UserResponse(userDTO);
		}
	}
}
