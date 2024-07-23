package com.flolink.backend.domain.user.service;

import com.flolink.backend.domain.user.dto.req.JoinUserReq;
import com.flolink.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    // 아이디 중복 확인
    public boolean isExistId(String loginId) {
        return userRepository.existsByLoginId(loginId);
    }


    // 계정 생성
    public void joinProcess(JoinUserReq joinUserReq) {
       joinUserReq.
    }



}
