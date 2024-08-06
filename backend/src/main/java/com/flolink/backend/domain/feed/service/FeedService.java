package com.flolink.backend.domain.feed.service;

import java.time.LocalDateTime;
import java.util.List;

import com.flolink.backend.domain.feed.dto.request.FeedCommentRequest;
import com.flolink.backend.domain.feed.dto.request.FeedCreateRequest;
import com.flolink.backend.domain.feed.dto.request.FeedUpdateRequest;
import com.flolink.backend.domain.feed.dto.response.FeedImageResponse;
import com.flolink.backend.domain.feed.dto.response.FeedResponse;

public interface FeedService {
	List<FeedResponse> getFeeds(final Integer userId, final Integer roomId, final LocalDateTime lastFeedDate,
		final Integer size);

	FeedResponse createFeed(final Integer userId, final FeedCreateRequest feedCreateRequest);

	FeedResponse updateFeed(final Integer userId, final Integer feedId, final FeedUpdateRequest feedUpdateRequest);

	String deleteFeed(final Integer userId, final Integer feedId);

	void createComment(final Integer userId, final Integer feedId, final FeedCommentRequest feedCommentRequest);

	void updateComment(final Integer userId, final Integer feedId, final Integer commentId,
		final FeedCommentRequest feedCommentRequest);

	void deleteComment(final Integer userId, final Integer feedId, final Integer commentId);

	List<FeedImageResponse> getImages(final Integer roomId, final LocalDateTime startDate, final LocalDateTime endDate);
}
