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
@Table(name = "user_exp_history")
public class UserExpHistory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "rank_id")
	private Integer rankId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "plant_id", nullable = false)
	private Plant plant;

	@Column(name = "user_id", nullable = false)
	private Integer userId;

	@Column(name = "contribute_exp", nullable = false)
	private Integer contributeExp;

	@Column(name = "monthly_rank", nullable = false)
	private Integer monthlyRank;

	@Column(name = "date_month", nullable = false)
	private String dateMonth;
	
}
