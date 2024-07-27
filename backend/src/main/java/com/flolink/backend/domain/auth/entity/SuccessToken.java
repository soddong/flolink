package com.flolink.backend.domain.auth.entity;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@Table(name = "success_token")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class SuccessToken {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "success_token_id", nullable = false, length = 36)
	private int SuccessTokenId;

	@Column(name = "tel", nullable = false, length = 11, unique = true)
	private String tel;

	@Column(name = "token", nullable = false, length = 32)
	private String token;

	@Column(name = "create_at", nullable = false)
	private LocalDateTime createAt;

	@Column(name = "expired_at", nullable = false)
	private LocalDateTime expiredAt;

}
