package com.flolink.backend.domain.plant.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user_exp")
public class UserExp {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "exp_id")
	private Integer expId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "plant_id", nullable = false)
	private Plant plant;

	@Column(name = "user_id", nullable = false)
	private Integer userId;

	@Column(name = "conribute_exp", nullable = false)
	private Integer contributeExp;

	public static UserExp of(Integer userId, Plant plant) {
		return UserExp.builder()
			.plant(plant)
			.userId(userId)
			.contributeExp(0)
			.build();
	}

	public void increaseExpOfUser(Integer exp) {
		this.contributeExp += exp;
	}
}
