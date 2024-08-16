package com.flolink.backend.domain.feed.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

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
@Table(name = "feed_comment")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE feed_comment SET use_yn = false WHERE comment_id = ?")
@SQLRestriction("use_yn = true")
public class FeedComment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "comment_id")
	private Integer commentId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "feed_id")
	private Feed feed;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_room_id")
	private UserRoom userRoom;

	@Column(name = "content", length = 65567)
	private String content;

	@Column(name = "create_at")
	private LocalDateTime createAt;

	@Column(name = "use_yn")
	private Boolean useYn;

	public static FeedComment of(Feed feed, UserRoom userRoom, String content) {
		return FeedComment.builder()
			.feed(feed)
			.userRoom(userRoom)
			.content(content)
			.createAt(LocalDateTime.now())
			.useYn(true)
			.build();
	}
}
