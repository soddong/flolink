package com.flolink.backend.domain.feed.dto.response;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

import com.flolink.backend.domain.feed.entity.Feed;
import com.flolink.backend.domain.room.entity.Nickname;
import com.flolink.backend.domain.room.entity.UserRoom;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class FeedResponse {
	private Integer feedId;
	private String content;
	private LocalDateTime createdDate;
	private String author;
	private List<FeedCommentResponse> feedCommentList;
	private List<FeedImageResponse> feedImages;

	public static FeedResponse fromEntity(UserRoom userRoom, Feed feed) {
		String nickName = feed.getUserRoom().getUser().getNickname();
		if (!userRoom.getUser().getNickname().equals(nickName)) {
			for (Nickname nickname : userRoom.getNickNameList()) {
				if (nickname.getTargetUserRoomId().equals(feed.getUserRoom().getUser().getUserId())) {
					nickName = nickname.getTargetNickname();
				}
			}
		}
		return FeedResponse.builder()
			.feedId(feed.getFeedId())
			.content(feed.getContent())
			.createdDate(feed.getCreateAt())
			.author(nickName)
			.feedCommentList(
				feed.getFeedCommentList().stream().map((FeedCommentResponse::fromEntity)).toList().reversed()
			)
			.feedImages(
				feed.getFeedImageList()
					.stream()
					.map((FeedImageResponse::fromEntity))
					.toList()
					.stream()
					.sorted(Comparator.comparingInt(FeedImageResponse::getImageOrder)).toList()
			)
			.build();
	}
}
