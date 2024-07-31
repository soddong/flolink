package com.flolink.backend.domain.plant.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;

import com.flolink.backend.domain.room.entity.Room;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

	// @OneToMany(fetch = FetchType.LAZY, mappedBy = "plant")
	// private List<MonthlyRank> monthlyRanks;

	@ColumnDefault("0")
	@Column(name = "exp", nullable = false)
	private Integer totalExp;

	@ColumnDefault("0")
	@Column(name = "today_exp", nullable = false)
	private Integer todayExp;

	@Column(name = "create_at", nullable = false)
	private LocalDateTime createAt;

	@Column(name = "complete_yn", nullable = false)
	private Boolean completeYn;

	@Column(name = "update_at")
	private LocalDateTime updateAt;

	public static Plant create(Room room) {
		return Plant.builder()
			.room(room)
			.todayExp(0)
			.totalExp(0)
			.completeYn(false)
			.createAt(LocalDateTime.now())
			.build();
	}

	public void initToday() {
		this.todayExp = 0;
	}

	public Integer increaseExp(Integer exp) {
		this.totalExp += exp;
		this.todayExp += exp;
		this.updateAt = LocalDateTime.now();
		return totalExp;
	}
}
