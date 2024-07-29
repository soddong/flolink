package com.flolink.backend.domain.feed.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.flolink.backend.domain.feed.dto.response.FeedResponse;
import com.flolink.backend.domain.feed.repository.FeedRepository;
import com.flolink.backend.domain.room.entity.UserRoom;
import com.flolink.backend.domain.room.repository.UserRoomRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedServiceImpl implements FeedService {

	private final FeedRepository feedRepository;
	private final UserRoomRepository userRoomRepository;

	@Override
	public List<FeedResponse> getFeeds(final Integer userId, final Integer roomId, final Integer lastId,
		final Integer size) {

		UserRoom userRoom = userRoomRepository.findByUserUserIdAndRoomRoomId(userId, roomId);
		return feedRepository.findByFeedIdLessThanOrderByCreateAtDesc(lastId, roomId, size)
			.stream().map((feed) -> FeedResponse.fromEntity(userRoom, feed)).toList();
	}
}
