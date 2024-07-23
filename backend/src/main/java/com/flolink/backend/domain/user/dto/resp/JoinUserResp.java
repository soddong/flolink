package com.flolink.backend.domain.user.dto.resp;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

public class JoinUserResp {
    @Getter
    @Setter
    public class JoinUserReq {
        private String loginId;
        private String password;
        private String userName;
        private String nickName;
        private String tel;
        private int point;
        private Timestamp createAt;
        private int useYn;
    }
}
