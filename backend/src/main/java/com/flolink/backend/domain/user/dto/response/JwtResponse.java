package com.flolink.backend.domain.user.dto.response;

import lombok.Getter;

@Getter
public class JwtResponse {
    private String loginId;
    private int myRoomId;
}
