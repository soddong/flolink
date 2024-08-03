package com.flolink.backend.domain.feed.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.flolink.backend.domain.feed.dto.request.FeedCommentRequest;
import com.flolink.backend.domain.feed.dto.request.FeedCreateRequest;
import com.flolink.backend.domain.feed.dto.request.FeedUpdateRequest;
import com.flolink.backend.domain.feed.dto.response.FeedResponse;
import com.flolink.backend.domain.feed.service.FeedService;
import com.flolink.backend.global.common.CommonResponse;
import com.flolink.backend.global.common.ResponseCode;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Tag(name = "Feed API", description = "피드와 관련된 API")
@Slf4j
@RequestMapping("/feeds")
@RequiredArgsConstructor
public class FeedController {

	private final FeedService feedService;

	//최신 순 검색
	@GetMapping("")
	@Operation(summary = "피드 불러오기", description = "초기 localdatetime값 지정 필요. 20개 단위 조회")
	public ResponseEntity<?> getFeeds(@RequestParam("roomId") final Integer roomId,
		@RequestParam(name = "lastFeedDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) final LocalDateTime lastFeedDate,
		@RequestParam(defaultValue = "20") final Integer size) {
		log.info("===피드 불러오기 START===");
		System.out.println(lastFeedDate);
		Integer userId = 1;
		List<FeedResponse> feedResponseList = feedService.getFeeds(userId, roomId, lastFeedDate, size);
		for (FeedResponse feedResponse : feedResponseList) {
			System.out.println(feedResponse.getContent());
		}
		log.info("===피드 불러오기 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, feedResponseList));
	}

	@PostMapping("")
	@Operation(summary = "피드 생성하기")
	public ResponseEntity<?> createFeed(@ModelAttribute final FeedCreateRequest feedCreateRequest) {
		log.info("===피드 생성 START===");
		Integer userId = 1;
		FeedResponse feedResponse = feedService.createFeed(userId, feedCreateRequest);
		log.info("===피드 생성 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, feedResponse));
	}

	@PatchMapping("/{feedId}")
	@Operation(summary = "피드 수정하기")
	public ResponseEntity<?> updateFeed(@PathVariable final Integer feedId,
		@ModelAttribute final FeedUpdateRequest feedUpdateRequest) {
		log.info("===피드 수정 START===");
		Integer userId = 1;
		FeedResponse feedResponse = feedService.updateFeed(userId, feedId, feedUpdateRequest);
		log.info("===피드 수정 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, feedResponse));
	}

	@DeleteMapping("/{feedId}")
	@Operation(summary = "피드 삭제하기")
	public ResponseEntity<?> deleteFeed(@PathVariable final Integer feedId) {
		log.info("===피드 삭제 START===");
		Integer userId = 1;
		String done = feedService.deleteFeed(userId, feedId);
		log.info("===피드 삭제 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, done));
	}

	@PostMapping("/{feedId}/comments")
	@Operation(summary = "피드 댓글 달기")
	public ResponseEntity<?> createComment(@PathVariable final Integer feedId,
		@RequestBody final FeedCommentRequest feedCommentRequest) {
		log.info("===피드 댓글 달기 START===");
		Integer userId = 1;
		feedService.createComment(userId, feedId, feedCommentRequest);
		log.info("===피드 댓글 달기 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
	}

	@PatchMapping("/{feedId}/comments/{commentId}")
	@Operation(summary = "피드 댓글 수정하기")
	public ResponseEntity<?> updateComment(@PathVariable final Integer feedId, @PathVariable final Integer commentId,
		@RequestBody final FeedCommentRequest feedCommentRequest) {
		log.info("===피드 댓글 수정하기 START===");
		Integer userId = 1;
		feedService.updateComment(userId, feedId, commentId, feedCommentRequest);
		log.info("===피드 댓글 수정하기 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
	}

	@DeleteMapping("/{feedId}/comments/{commentId}")
	@Operation(summary = "피드 댓글 삭제하기")
	public ResponseEntity<?> deleteComment(@PathVariable final Integer feedId, @PathVariable final Integer commentId) {
		log.info("===피드 댓글 삭제하기 START===");
		Integer userId = 1;
		feedService.deleteComment(userId, feedId, commentId);
		log.info("===피드 댓글 삭제하기 END===");
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
	}
}
