package com.flolink.backend.domain.plant.entity;

import static jakarta.persistence.GenerationType.*;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
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
@Table(name = "plant_exp_history")
public class PlantExpHistory {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Integer plantHistoryId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "plant_id", nullable = false)
	private Plant plant;

	@Column(name = "plant_status", nullable = false)
	@Enumerated(EnumType.STRING)
	private PlantStatus plantStatus;

	@Column(name = "date_month", nullable = false)
	private LocalDate dateMonth;

	@Column(name = "totalExp", nullable = false)
	private Integer totalExp;

}
