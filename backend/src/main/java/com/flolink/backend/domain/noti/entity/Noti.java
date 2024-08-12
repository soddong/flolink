package com.flolink.backend.domain.noti.entity;

import java.time.LocalDateTime;

import com.flolink.backend.domain.room.entity.UserRoom;

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
@Table(name = "noti")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Noti {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "noti_id")
	private Integer notiId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_room_id")
	private UserRoom userRoom;

	@Column(name = "message")
	private String message;

	@Column(name = "create_at")
	private LocalDateTime createAt;

}
