package com.flolink.backend.domain.room.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "room")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Room {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "room_id")
	private Integer roomId;

	@Column(name = "room_name", nullable = false, length = 100)
	private String roomName;

	@Column(name = "room_name_short", length = 50)
	private String roomNameShort;

	@Column(name = "create_at", nullable = false)
	private LocalDateTime createAt;

	@Column(name = "use_yn", nullable = false)
	private Integer useYn;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "room")
	List<UserRoom> userRoomList;

}
