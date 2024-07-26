package com.flolink.backend.domain.user.dto.resp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class JoinUserResp {
	private String loginId;
	private String password;
	private String userName;
	private String nickName;
	private String tel;
	private BigDecimal point;
	private LocalDateTime createAt;
}
