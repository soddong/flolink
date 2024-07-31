package com.flolink.backend.domain.feed.dto.response;

import java.time.LocalDateTime;

import com.flolink.backend.domain.feed.entity.FeedComment;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
class FeedCommentResponse {

	private Integer commentId;

	private Integer userRoomId;

	private String content;

	private LocalDateTime createAt;

	public static FeedCommentResponse fromEntity(FeedComment comment) {
		return FeedCommentResponse.builder()
			.commentId(comment.getCommentId())
			.userRoomId(comment.getUserRoom().getUserRoomId())
			.content(comment.getContent())
			.createAt(comment.getCreateAt())
			.build();
	}
}