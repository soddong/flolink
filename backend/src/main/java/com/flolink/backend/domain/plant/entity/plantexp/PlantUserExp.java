package com.flolink.backend.domain.plant.entity.plantexp;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import com.flolink.backend.domain.plant.entity.Plant;

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
@SQLDelete(sql = "UPDATE user_exp SET use_yn = false WHERE exp_id = ?")
@SQLRestriction("use_yn = true")
public class PlantUserExp {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "exp_id")
	private Integer expId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "plant_id", nullable = false)
	private Plant plant;

	@Column(name = "user_id", nullable = false)
	private Integer userId;

	@Column(name = "contribute_exp", nullable = false)
	private Integer contributeExp;

	@ColumnDefault("1")
	@Column(name = "use_yn", nullable = false)
	private Boolean useYn;

	public static PlantUserExp of(Integer userId, Plant plant) {
		return PlantUserExp.builder()
			.plant(plant)
			.userId(userId)
			.contributeExp(0)
			.useYn(true)
			.build();
	}

	public void increaseExpOfUser(Integer exp) {
		this.contributeExp += exp;
	}
}
