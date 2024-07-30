package com.flolink.backend.domain.feed.service;

import java.time.LocalDateTime;
import java.util.List;

import com.flolink.backend.domain.feed.dto.request.FeedCreateRequest;
import com.flolink.backend.domain.feed.dto.request.FeedUpdateRequest;
import com.flolink.backend.domain.feed.dto.response.FeedResponse;

public interface FeedService {
	List<FeedResponse> getFeeds(final Integer userId, final Integer roomId, final LocalDateTime lastFeedDate,
		final Integer size);

	FeedResponse createFeed(final Integer userId, final FeedCreateRequest feedCreateRequest);

	FeedResponse updateFeed(final Integer userId, final Integer feedId, final FeedUpdateRequest feedUpdateRequest);

	String deleteFeed(final Integer userId, final Integer feedId);
}
