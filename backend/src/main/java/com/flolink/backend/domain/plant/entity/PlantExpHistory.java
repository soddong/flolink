package com.flolink.backend.domain.plant.entity;

import static jakarta.persistence.GenerationType.*;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;

import com.flolink.backend.domain.user.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
	private Integer plantExpHistory;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne
	@JoinColumn(name = "plant_id", insertable = false, updatable = false)
	private Plant plant;

	@Column(name = "type", nullable = false, length = 100)
	private String exType;

	@Column(name = "exp", nullable = false)
	private Integer exp;

	@Column(name = "create_at", nullable = false)
	private LocalDateTime createAt;

	@ColumnDefault("1")
	@Column(name = "use_yn", nullable = false)
	private Boolean useYn;

}
