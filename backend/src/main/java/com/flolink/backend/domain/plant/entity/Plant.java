package com.flolink.backend.domain.plant.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import com.flolink.backend.domain.plant.entity.enumtype.PlantStatusType;
import com.flolink.backend.domain.plant.entity.plantexp.PlantUserExp;
import com.flolink.backend.domain.plant.entity.plantwalk.PlantWalk;
import com.flolink.backend.domain.room.entity.Room;
import com.flolink.backend.global.common.GlobalConstant;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
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
@SQLDelete(sql = "UPDATE plant SET use_yn = false WHERE plant_id = ?")
@SQLRestriction("use_yn = true")
public class Plant {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "plant_id")
	private Integer plantId;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "room_id", nullable = false)
	private Room room;

	@OneToOne(mappedBy = "plant", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	private PlantWalk plantWalk;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "plant", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<PlantUserExp> plantUserExps;

	@Column(name = "plant_status", nullable = false)
	@Enumerated(EnumType.STRING)
	private PlantStatusType plantStatusType;

	@Column(name = "exp", nullable = false)
	private Integer totalExp;

	@Column(name = "today_exp", nullable = false)
	private Integer todayExp;

	@Column(name = "walker", nullable = false)
	private Integer walker;

	@Column(name = "create_at", nullable = false)
	private LocalDateTime createAt;

	@Column(name = "update_at")
	private LocalDateTime updateAt;

	@ColumnDefault("1")
	@Column(name = "use_yn", nullable = false)
	private Boolean useYn;

	public static Plant create(Room room) {
		return Plant.builder()
			.room(room)
			.plantStatusType(PlantStatusType.IN_PROGRESS)
			.todayExp(0)
			.totalExp(0)
			.walker(0)
			.createAt(LocalDateTime.now())
			.useYn(true)
			.build();
	}

	public void initToday() {
		this.todayExp = 0;
	}

	public void increaseExp(int exp, int n) {
		// 성장 완료
		if (totalExp + exp >= GlobalConstant.TOTAL_EXP_MAX * n) {
			this.plantStatusType = PlantStatusType.COMPLETED;
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

	public void updateWalk(Integer userRoomId) {
		this.walker = userRoomId;
	}

}
