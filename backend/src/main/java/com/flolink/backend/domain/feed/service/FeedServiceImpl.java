package com.flolink.backend.domain.feed.service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.flolink.backend.domain.fcm.entity.Fcm;
import com.flolink.backend.domain.fcm.event.FcmEvent;
import com.flolink.backend.domain.fcm.repository.FcmRepository;
import com.flolink.backend.domain.feed.dto.request.FeedCommentRequest;
import com.flolink.backend.domain.feed.dto.request.FeedCreateRequest;
import com.flolink.backend.domain.feed.dto.request.FeedUpdateRequest;
import com.flolink.backend.domain.feed.dto.response.FeedImageResponse;
import com.flolink.backend.domain.feed.dto.response.FeedResponse;
import com.flolink.backend.domain.feed.entity.Feed;
import com.flolink.backend.domain.feed.entity.FeedComment;
import com.flolink.backend.domain.feed.entity.FeedImage;
import com.flolink.backend.domain.feed.repository.FeedCommentRepository;
import com.flolink.backend.domain.feed.repository.FeedImageRepository;
import com.flolink.backend.domain.feed.repository.FeedRepository;
import com.flolink.backend.domain.noti.entity.Noti;
import com.flolink.backend.domain.noti.repository.NotiRepository;
import com.flolink.backend.domain.observer.service.ActivityService;
import com.flolink.backend.domain.plant.entity.enumtype.ActivityPointType;
import com.flolink.backend.domain.room.entity.UserRoom;
import com.flolink.backend.domain.room.service.RoomService;
import com.flolink.backend.domain.user.entity.User;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.BadRequestException;
import com.flolink.backend.global.common.exception.NotFoundException;
import com.flolink.backend.global.common.exception.UnAuthorizedException;
import com.flolink.backend.global.util.ImgResizeUtil;
import com.flolink.backend.global.util.RandomUtil;
import com.flolink.backend.global.util.S3Util;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedServiceImpl implements FeedService {

	private final ActivityService activityService;

	private final RoomService roomService;

	private final FeedRepository feedRepository;
	private final FeedCommentRepository feedCommentRepository;
	private final FeedImageRepository feedImageRepository;
	private final NotiRepository notiRepository;

	private final ApplicationEventPublisher eventPublisher;
	private final S3Util s3Util;
	private final FcmRepository fcmRepository;

	@Override
	public List<FeedResponse> getFeeds(final Integer userId, final Integer roomId, final LocalDateTime lastFeedDate,
		final Integer size) {
		UserRoom userRoom = roomService.findUserRoomByUserIdAndRoomId(userId, roomId);
		return feedRepository.findByDateLessThanOrderByCreateAtDesc(lastFeedDate, roomId, size)
			.stream()
			.map((feed) -> FeedResponse.fromEntity(userRoom, feed))
			.toList();
	}

	@Override
	@Transactional
	public FeedResponse createFeed(final Integer userId, final FeedCreateRequest feedCreateRequest) {
		UserRoom userRoom = roomService.findUserRoomByUserIdAndRoomId(userId, feedCreateRequest.getRoomId());
		Feed feed = feedRepository.save(feedCreateRequest.toEntityUsingUserRoom(userRoom));

		int imgOrder = 1;
		for (MultipartFile multipartFile : Optional.ofNullable(feedCreateRequest.getImages())
			.orElse(Collections.emptyList())) {
			String uuid = RandomUtil.generateRandomUUID();
			String keyName = "image_" + uuid;
			try {
				ByteArrayInputStream inputStream = ImgResizeUtil.resize(multipartFile);
				int lastDotIdx = multipartFile.getOriginalFilename().lastIndexOf(".");
				String postfix = multipartFile.getOriginalFilename().substring(lastDotIdx);
				keyName = keyName + postfix;
				s3Util.uploadImg(keyName, inputStream, inputStream.available(), multipartFile.getContentType());
				FeedImage feedImage = FeedImage.builder()
					.imageOrder(imgOrder++)
					.feed(feed)
					.imageUrl(keyName)
					.createAt(LocalDateTime.now())
					.useYn(true)
					.build();
				feedImageRepository.save(feedImage);
				feed.getFeedImageList().add(feedImage);
			} catch (IOException e) {
				throw new NotFoundException(ResponseCode.FEED_UPLOAD_FAILED);
			}
		}

		increaseExpAboutActivity(ActivityPointType.FEED, userRoom.getRoom().getRoomId(), userRoom.getUserRoomId(),
			userId);

		return FeedResponse.fromEntity(userRoom, feed);
	}

	@Override
	@Transactional
	public FeedResponse updateFeed(final Integer userId, final Integer feedId,
		final FeedUpdateRequest feedUpdateRequest) {
		UserRoom userRoom = roomService.findUserRoomByUserIdAndRoomId(userId, feedUpdateRequest.getRoomId());
		Feed feed = findFeedById(feedId);

		if (!feed.getUserRoom().getUserRoomId().equals(userRoom.getUserRoomId())) {
			throw new NotFoundException(ResponseCode.USER_ROOM_NOT_FOUND);
		}

		List<FeedImage> images = feed.getFeedImageList();
		int imgOrder = 1;
		for (FeedImage image : images) {
			imgOrder = Math.max(image.getImageOrder() + 1, imgOrder);
			image.setUseYn(false);
		}
		for (MultipartFile multipartFile : Optional.ofNullable(feedUpdateRequest.getImages())
			.orElse(Collections.emptyList())) {
			boolean isIn = false;
			for (FeedImage image : images) {
				if (image.getImageUrl().equals(multipartFile.getOriginalFilename())) {
					isIn = true;
					image.setUseYn(true);
				}
			}
			if (!isIn) {
				String uuid = RandomUtil.generateRandomUUID();
				String keyName = "image_" + uuid;
				try {
					ByteArrayInputStream inputStream = ImgResizeUtil.resize(multipartFile);
					int lastDotIdx = multipartFile.getOriginalFilename().lastIndexOf(".");
					String postfix = "";
					if (lastDotIdx > 0 && lastDotIdx < multipartFile.getOriginalFilename().length() - 1) {
						postfix = multipartFile.getOriginalFilename().substring(lastDotIdx);
					}
					keyName = keyName + postfix;
					s3Util.uploadImg(keyName, inputStream, inputStream.available(), multipartFile.getContentType());
					FeedImage feedImage = FeedImage.builder()
						.imageOrder(imgOrder++)
						.feed(feed)
						.imageUrl(keyName)
						.createAt(LocalDateTime.now())
						.useYn(true)
						.build();
					feedImageRepository.save(feedImage);
					feed.getFeedImageList().add(feedImage);
				} catch (IOException e) {
					throw new NotFoundException(ResponseCode.FEED_UPLOAD_FAILED);
				}
			}
		}
		feed.updateContent(feedUpdateRequest);

		return FeedResponse.fromEntity(userRoom, feed);
	}

	@Override
	@Transactional
	public String deleteFeed(final Integer userId, final Integer feedId) {
		Feed feed = findFeedById(feedId);
		if (!feed.getUserRoom().getUser().getUserId().equals(userId)) {
			throw new UnAuthorizedException(ResponseCode.NOT_AUTHORIZED);
		}
		List<FeedImage> feedImages = feed.getFeedImageList();
		for (FeedImage feedImage : feedImages) {
			s3Util.deleteImg(feedImage.getImageUrl());
		}
		feedImageRepository.deleteAll(feedImages);
		feedRepository.delete(feed);
		return "success";
	}

	@Override
	@Transactional
	public void createComment(final Integer userId, final Integer feedId, final FeedCommentRequest feedCommentRequest) {
		Feed feed = findFeedById(feedId);
		UserRoom userRoom = roomService.findUserRoomByUserIdAndRoomId(userId, feedCommentRequest.getRoomId());
		if (!feed.getUserRoom().getRoom().getRoomId().equals(userRoom.getRoom().getRoomId())) {
			throw new UnAuthorizedException(ResponseCode.NOT_AUTHORIZED);
		}
		feedCommentRepository.save(FeedComment.of(feed, userRoom, feedCommentRequest.getContent()));

		increaseExpAboutActivity(ActivityPointType.COMMENT, userRoom.getRoom().getRoomId(), userRoom.getUserRoomId(),
			userId);

		User feedCreator = feed.getUserRoom().getUser();

		if (feedCreator.getUserId().equals(userId)) {
			return;
		}
		Optional<Fcm> fcm = fcmRepository.findByUserUserId(feedCreator.getUserId());

		Noti noti = Noti.builder()
			.userRoom(feed.getUserRoom())
			.message("작성한 게시글에 댓글이 달렸어요.")
			.createAt(LocalDateTime.now())
			.build();
		notiRepository.save(noti);

		if (fcm.isPresent()) {
			try {
				FcmEvent fcmEvent = new FcmEvent(
					this,
					"작성한 게시글에 댓글이 달렸어요.",
					feedCommentRequest.getContent(),
					fcm.get().getFcmToken()
				);
				eventPublisher.publishEvent(fcmEvent);
			} catch (Exception e) {
				e.printStackTrace();
			}

		}

	}

	@Override
	@Transactional
	public void updateComment(final Integer userId, final Integer feedId, final Integer commentId,
		final FeedCommentRequest feedCommentRequest) {
		Feed feed = findFeedById(feedId);
		UserRoom userRoom = roomService.findUserRoomByUserIdAndRoomId(userId, feedCommentRequest.getRoomId());
		FeedComment feedComment = findFeedCommentByCommentId(commentId);

		if (!feed.getUserRoom().getRoom().getRoomId().equals(userRoom.getRoom().getRoomId())) {
			throw new UnAuthorizedException(ResponseCode.NOT_AUTHORIZED);
		}
		if (!feed.getFeedId().equals(feedComment.getFeed().getFeedId())) {
			throw new BadRequestException(ResponseCode.FEED_COMMENT_BAD_REQUEST);
		}
		feedComment.setContent(feedCommentRequest.getContent());
		feedCommentRepository.save(feedComment);

	}

	@Override
	@Transactional
	public void deleteComment(final Integer userId, final Integer feedId, final Integer commentId) {
		FeedComment feedComment = findFeedCommentByCommentId(commentId);

		if (!feedComment.getFeed().getFeedId().equals(feedId)) {
			throw new UnAuthorizedException(ResponseCode.NOT_AUTHORIZED);
		}
		if (!feedComment.getUserRoom().getUser().getUserId().equals(userId)) {
			throw new UnAuthorizedException(ResponseCode.NOT_AUTHORIZED);
		}
		feedCommentRepository.delete(feedComment);
	}

	@Override
	public List<FeedImageResponse> getImages(final Integer roomId,
		final LocalDateTime startDate, final LocalDateTime endDate) {
		return feedImageRepository.findFeedImagesByUserIdAndRoomIdAndCreateAtBetween(
			roomId, startDate, endDate
		).stream().map((FeedImageResponse::fromEntity)).toList();
	}

	private Feed findFeedById(final Integer feedId) {
		return feedRepository.findById(feedId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.NOT_FOUND_ERROR));
	}

	private FeedComment findFeedCommentByCommentId(final Integer commentId) {
		return feedCommentRepository.findById(commentId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.COMMENT_NOT_FOUND));
	}

	private void increaseExpAboutActivity(ActivityPointType type, Integer roomId, Integer userRoomId, Integer userId) {
		activityService.performActivity(userId, roomId, userRoomId, type);
	}

}
