package com.flolink.backend.domain.user.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.flolink.backend.domain.myroom.entity.MyRoom;
import com.flolink.backend.domain.room.entity.UserRoom;
import com.flolink.backend.domain.user.entity.enumtype.EmotionType;
import com.flolink.backend.domain.user.entity.enumtype.ProfileType;
import com.flolink.backend.domain.user.entity.enumtype.RoleType;

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
@Table(name = "user")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id", length = 36)
	private Integer userId;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "my_room_id")
	private MyRoom myRoom;

	@Column(name = "login_id", nullable = false, length = 100)
	private String loginId;

	@Column(name = "password", length = 64)
	private String password;

	@Column(name = "user_name", nullable = false, length = 256)
	private String userName;

	@Column(name = "nickname", nullable = false, length = 100)
	private String nickname;

	@Column(name = "tel", length = 20)
	private String tel;

	@Builder.Default
	@Column(name = "point", nullable = false, length = 21)
	private BigDecimal point = BigDecimal.ZERO;

	@Builder.Default
	@Column(name = "create_at", nullable = false, updatable = false)
	private LocalDateTime createdAt = LocalDateTime.now();

	@Builder.Default
	@Column(name = "use_yn", nullable = false)
	private boolean useYn = true;

	@Builder.Default
	@Column(name = "role", nullable = false)
	@Enumerated(EnumType.STRING)
	private RoleType role = RoleType.LOCAL;

	@Builder.Default
	@Column(name = "profile", nullable = false)
	@Enumerated(EnumType.STRING)
	private ProfileType profile = ProfileType.HONEYBEE;

	@Builder.Default
	@Column(name = "emotion", nullable = false)
	@Enumerated(EnumType.STRING)
	private EmotionType emotion = EmotionType.NORMAL;

	@Column(name = "status_message")
	private String statusMessage;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	List<UserRoom> userRoomList;

	public void subtractPoint(BigDecimal point) {
		BigDecimal newPoint = this.point.subtract(point);
		this.point = newPoint;
	}
}
