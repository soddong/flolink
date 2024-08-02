package com.flolink.backend.domain.plant.entity;

import java.time.LocalDateTime;

import com.flolink.backend.domain.room.entity.Room;
import com.flolink.backend.global.common.GlobalConstant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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
@Table(name = "plant")
public class Plant {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "plant_id")
	private Integer plantId;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "room_id", nullable = false)
	private Room room;

	@Column(name = "plant_status", nullable = false)
	@Enumerated(EnumType.STRING)
	private PlantStatus plantStatus;

	@Column(name = "exp", nullable = false)
	private Integer totalExp;

	@Column(name = "today_exp", nullable = false)
	private Integer todayExp;

	@Column(name = "is_walking", nullable = false)
	private Boolean isWalking;

	@Column(name = "create_at", nullable = false)
	private LocalDateTime createAt;

	@Column(name = "update_at")
	private LocalDateTime updateAt;

	public static Plant create(Room room) {
		return Plant.builder()
			.room(room)
			.plantStatus(PlantStatus.IN_PROGRESS)
			.todayExp(0)
			.totalExp(0)
			.isWalking(false)
			.createAt(LocalDateTime.now())
			.build();
	}

	public void initToday() {
		this.todayExp = 0;
	}

	public void increaseExp(int exp, int n) {
		// 성장 완료
		if (totalExp + exp >= GlobalConstant.TOTAL_EXP_MAX * n) {
			this.plantStatus = PlantStatus.COMPLETED;
			return;
		}

		// 하루 최대경험치 초과
		if (todayExp + exp >= GlobalConstant.TODAY_EXP_BASE_LIMIT * n) {
			return;
		}

		this.totalExp += exp;
		this.todayExp += exp;
		this.updateAt = LocalDateTime.now();
	}
}
