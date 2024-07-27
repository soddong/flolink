package com.flolink.backend.domain.user.service;

import org.springframework.stereotype.Service;

import com.flolink.backend.domain.user.dto.request.JoinUserRequest;
import com.flolink.backend.domain.user.dto.request.LoginIdRequset;
import com.flolink.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;

	// 계정 생성
	public void joinProcess(JoinUserRequest joinUserRequest) {

	}

	// 아이디 중복 확인
	@Override
	public boolean isExistId(LoginIdRequset loginIdRequset) {
		return userRepository.existsByLoginId(loginIdRequset.getLoginId());
	}

}
