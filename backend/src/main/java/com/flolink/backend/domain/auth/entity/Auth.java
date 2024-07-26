package com.flolink.backend.domain.auth.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@Table(name = "tel_auth_num")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Auth {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "auth_num_id", nullable = false, length = 36)
	private Integer authNumId;

	@Column(name = "tel", nullable = false, length = 11, unique = true)
	private String tel;

	@Column(name = "auth_num", nullable = false, length = 6)
	private String authNum;

	@Column(name = "expired_at", nullable = false)
	private LocalDateTime expiredAt;

}
