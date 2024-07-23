package com.flolink.backend.domain.user.entity;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

	@Id
	@Column(name = "user_id", nullable = false, length = 36)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "login_id", nullable = false, length = 20)
	private String loginId;

	@Column(name = "password", nullable = false, length = 64)
	private String password;

	@Column(name = "user_name", nullable = false, length = 100)
	private String userName;

	@Column(name = "nickname", nullable = false, length = 100)
	private String nickname;

	@Column(name = "tel", nullable = false, length = 20)
	private String tel;

	@Column(name = "point", nullable = false, length = 21)
	private Integer point;

	@Column(name = "create_at", nullable = false, updatable = false)
	private Timestamp createdAt;

	@Column(name = "use_yn", nullable = false)
	private Integer useYn;

}
