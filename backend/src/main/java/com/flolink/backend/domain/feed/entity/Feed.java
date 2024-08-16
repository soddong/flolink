package com.flolink.backend.domain.feed.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import com.flolink.backend.domain.feed.dto.request.FeedUpdateRequest;
import com.flolink.backend.domain.room.entity.UserRoom;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name = "feed")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE feed SET use_yn = false WHERE feed_id = ?")
@SQLRestriction("use_yn = true")
public class Feed {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "feed_id")
	private Integer feedId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_room_id")
	private UserRoom userRoom;

	@Column(name = "content")
	private String content;

	@Column(name = "create_at")
	private LocalDateTime createAt;

	@Column(name = "use_yn")
	private Boolean useYn;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "feed", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<FeedComment> feedCommentList;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "feed", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<FeedImage> feedImageList;

	public void updateContent(final FeedUpdateRequest feedUpdateRequest) {
		this.content = feedUpdateRequest.getContent();
	}
}
