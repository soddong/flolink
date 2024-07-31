package com.flolink.backend.domain.feed.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flolink.backend.domain.feed.dto.request.FeedCommentRequest;
import com.flolink.backend.domain.feed.dto.request.FeedCreateRequest;
import com.flolink.backend.domain.feed.dto.request.FeedUpdateRequest;
import com.flolink.backend.domain.feed.dto.response.FeedResponse;
import com.flolink.backend.domain.feed.entity.Feed;
import com.flolink.backend.domain.feed.entity.FeedComment;
import com.flolink.backend.domain.feed.repository.FeedCommentRepository;
import com.flolink.backend.domain.feed.repository.FeedRepository;
import com.flolink.backend.domain.plant.entity.ActivityType;
import com.flolink.backend.domain.plant.service.PlantService;
import com.flolink.backend.domain.room.entity.UserRoom;
import com.flolink.backend.domain.room.repository.UserRoomRepository;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.NotFoundException;
import com.flolink.backend.global.common.exception.UnAuthorizedException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedServiceImpl implements FeedService {

	private final PlantService plantService;

	private final FeedRepository feedRepository;
	private final FeedCommentRepository feedCommentRepository;
	private final UserRoomRepository userRoomRepository;

	@Override
	public List<FeedResponse> getFeeds(final Integer userId, final Integer roomId, final LocalDateTime lastFeedDate,
		final Integer size) {
		UserRoom userRoom = userRoomRepository.findByUserUserIdAndRoomRoomId(userId, roomId);
		if (userRoom == null) {
			throw new NotFoundException(ResponseCode.NOT_FOUND_ERROR);
		}
		return feedRepository.findByDateLessThanOrderByCreateAtDesc(lastFeedDate, roomId, size)
			.stream()
			.map((feed) -> FeedResponse.fromEntity(userRoom, feed))
			.toList();
	}

	@Override
	@Transactional
	public FeedResponse createFeed(final Integer userId, final FeedCreateRequest feedCreateRequest) {
		UserRoom userRoom = userRoomRepository.findByUserUserIdAndRoomRoomId(userId,
			feedCreateRequest.getRoomId());
		if (userRoom == null) {
			throw new NotFoundException(ResponseCode.NOT_FOUND_ERROR);
		}

		Feed feed = feedRepository.save(feedCreateRequest.toEntityUsingUserRoom(userRoom));
		plantService.updateExp(userRoom, ActivityType.FEED);
		return FeedResponse.fromEntity(userRoom, feed);
	}

	@Override
	@Transactional
	public FeedResponse updateFeed(final Integer userId, final Integer feedId,
		final FeedUpdateRequest feedUpdateRequest) {
		UserRoom userRoom = userRoomRepository.findByUserUserIdAndRoomRoomId(userId,
			feedUpdateRequest.getRoomId());
		if (userRoom == null) {
			throw new NotFoundException(ResponseCode.NOT_FOUND_ERROR);
		}
		Feed feed = findFeedById(feedId);
		if (!feed.getUserRoom().getUserRoomId().equals(userRoom.getUserRoomId())) {
			throw new NotFoundException(ResponseCode.NOT_FOUND_ERROR);
		}
		feed.updateContent(feedUpdateRequest);
		return FeedResponse.fromEntity(userRoom, feed);
	}

	@Override
	public String deleteFeed(final Integer userId, final Integer feedId) {
		Feed feed = findFeedById(feedId);

		if (!feed.getUserRoom().getUser().getUserId().equals(userId)) {
			throw new UnAuthorizedException(ResponseCode.NOT_AUTHORIZED);
		}
		feedRepository.delete(feed);
		return "success";
	}

	@Override
	public void createComment(final Integer userId, final Integer feedId, final FeedCommentRequest feedCommentRequest) {
		Feed feed = findFeedById(feedId);
		UserRoom userRoom = userRoomRepository.findByUserUserIdAndRoomRoomId(userId, feedCommentRequest.getRoomId());
		if (userRoom == null) {
			throw new NotFoundException(ResponseCode.NOT_FOUND_ERROR);
		}
		if (!feed.getUserRoom().getRoom().getRoomId().equals(userRoom.getRoom().getRoomId())) {
			throw new UnAuthorizedException(ResponseCode.NOT_AUTHORIZED);
		}
		feedCommentRepository.save(FeedComment.of(feed, userRoom, feedCommentRequest.getContent()));
		plantService.updateExp(userRoom, ActivityType.COMMENT);
	}

	@Override
	public void updateComment(final Integer userId, final Integer feedId, final Integer commentId,
		final FeedCommentRequest feedCommentRequest) {

		Feed feed = findFeedById(feedId);

		UserRoom userRoom = userRoomRepository.findByUserUserIdAndRoomRoomId(userId, feedCommentRequest.getRoomId());
		FeedComment feedComment = feedCommentRepository.findById(commentId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));
		if (userRoom == null) {
			throw new NotFoundException(ResponseCode.NOT_FOUND_ERROR);
		}
		if (!feed.getUserRoom().getRoom().getRoomId().equals(userRoom.getRoom().getRoomId())) {
			throw new UnAuthorizedException(ResponseCode.NOT_AUTHORIZED);
		}
		if (!feed.getFeedId().equals(feedComment.getFeed().getFeedId())) {
			throw new UnAuthorizedException(ResponseCode.NOT_AUTHORIZED);
		}
		feedComment.setContent(feedCommentRequest.getContent());
		feedCommentRepository.save(feedComment);

	}

	@Override
	public void deleteComment(final Integer userId, final Integer feedId, final Integer commentId) {

		FeedComment feedComment = feedCommentRepository.findById(commentId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));
		if (!feedComment.getFeed().getFeedId().equals(feedId)) {
			throw new UnAuthorizedException(ResponseCode.NOT_AUTHORIZED);
		}
		if (!feedComment.getUserRoom().getUser().getUserId().equals(userId)) {
			throw new UnAuthorizedException(ResponseCode.NOT_AUTHORIZED);
		}
		feedCommentRepository.delete(feedComment);
	}

	private Feed findFeedById(final Integer feedId) {
		return feedRepository.findById(feedId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));
	}

}
