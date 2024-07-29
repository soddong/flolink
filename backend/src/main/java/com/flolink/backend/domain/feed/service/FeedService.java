package com.flolink.backend.domain.feed.service;

import java.util.List;

import com.flolink.backend.domain.feed.dto.response.FeedResponse;

public interface FeedService {
	List<FeedResponse> getFeeds(final Integer userId, final Integer roomId, final Integer lastId, final Integer size);
}
