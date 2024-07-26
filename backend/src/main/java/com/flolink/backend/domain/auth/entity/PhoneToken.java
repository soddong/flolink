package com.flolink.backend.domain.auth.entity;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "user_phone_token")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PhoneToken {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "phone_token_id", nullable = false, length = 36)
	private int phoneTokenId;

	@Column(name = "user_id", nullable = false, length = 36)
	private int userId;

	@Column(name = "phone_token", nullable = false, length = 256)
	private String phoneToken;

	@Column(name = "expire_at", nullable = false)
	private Timestamp expireAt;

}
