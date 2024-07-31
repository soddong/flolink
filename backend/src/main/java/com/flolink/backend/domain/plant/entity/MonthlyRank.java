package com.flolink.backend.domain.plant.entity;

import com.flolink.backend.domain.room.entity.UserRoom;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "monthly_rank")
public class MonthlyRank {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "rank_id")
	private Integer rankId;

	@ManyToOne
	@JoinColumn(name = "plant_id", nullable = false)
	private Plant plant;

	@ManyToOne
	@JoinColumn(name = "user_room_id", nullable = false)
	private UserRoom userRoom;

	@Column(name = "conribute_exp", nullable = false)
	private Integer contributeExp;

	@Column(name = "exp_rank")
	private Integer rank;

	@Column(name = "use_yn", nullable = false)
	private Boolean useYn;

	public static MonthlyRank of(UserRoom userRoom, Plant plant) {
		return MonthlyRank.builder()
			.plant(plant)
			.userRoom(userRoom)
			.contributeExp(0)
			.useYn(true)
			.build();
	}

	public void increaseExpOfUser(Integer exp) {
		this.contributeExp += exp;
	}
}
