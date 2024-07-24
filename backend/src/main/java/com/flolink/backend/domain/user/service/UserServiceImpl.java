package com.flolink.backend.domain.user.service;

import org.springframework.stereotype.Service;

import com.flolink.backend.domain.user.dto.request.JoinUserReq;
import com.flolink.backend.domain.user.dto.request.LoginIdReq;
import com.flolink.backend.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;

	// 계정 생성
	public void joinProcess(JoinUserReq joinUserReq) {

	}

	// 아이디 중복 확인
	@Override
	public boolean isExistId(LoginIdReq loginIdReq) {
		return userRepository.existsByLoginId(loginIdReq.getLoginId());
	}

}
