package com.flolink.backend.domain.user.dto.req;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JoinUserReq {
    private String loginId;
    private String password;
    private String userName;
    private String nickName;
    private String tel;
}
