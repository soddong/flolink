package com.flolink.backend.domain.user.dto.response;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

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
