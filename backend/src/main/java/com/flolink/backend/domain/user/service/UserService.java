package com.flolink.backend.domain.user.service;

import com.flolink.backend.domain.user.dto.req.JoinUserReq;

public interface UserService {

    public void joinProcess(JoinUserReq joinUserReq);
}
