package com.flolink.backend.domain.plant.entity.plantwalk;

import java.time.LocalDateTime;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.flolink.backend.domain.plant.dto.reqeust.PlantLocation;
import com.flolink.backend.domain.plant.entity.Plant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE plant SET use_yn = false WHERE plant_id = ?")
@Where(clause = "use_yn = true")
@ToString
public class PlantWalk {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "plant_walk_id")
	private Integer plantWalkId;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "plant_id", nullable = false)
	private Plant plant;

	@Column(name = "last_walker_user_room_id")
	private Integer userRoomId;

	@Column(name = "start_at")
	private LocalDateTime startAt;

	@Column(name = "lat")
	private Double startLat;

	@Column(name = "lng")
	private Double startLng;

	@Column(name = "walk_yn", nullable = false)
	private Boolean walkYn = false;

	@Column(name = "use_yn", nullable = false)
	private Boolean useYn = true;

	public static PlantWalk createPlantWalk(Plant plant) {
		return PlantWalk.builder()
			.plant(plant)
			.walkYn(false)
			.useYn(true)
			.build();
	}

	public void startPlantWalk(PlantLocation plantLocation) {
		this.userRoomId = plantLocation.getUserRoomId();
		this.startLat = plantLocation.getLat();
		this.startLng = plantLocation.getLng();
		this.walkYn = true;
		this.startAt = LocalDateTime.now();
	}

	public void endPlantWalk() {
		this.walkYn = false;
	}
}
