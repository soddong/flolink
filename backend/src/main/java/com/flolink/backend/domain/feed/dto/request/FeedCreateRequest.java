package com.flolink.backend.domain.feed.dto.request;

import java.time.LocalDateTime;

import com.flolink.backend.domain.feed.entity.Feed;
import com.flolink.backend.domain.room.entity.UserRoom;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedCreateRequest {

	private Integer roomId;
	private String content;

	public Feed toEntityUsingUserRoom(UserRoom userRoom) {
		return Feed.builder()
			.userRoom(userRoom)
			.content(content)
			.createAt(LocalDateTime.now())
			.useYn(true)
			.build();
	}
}
