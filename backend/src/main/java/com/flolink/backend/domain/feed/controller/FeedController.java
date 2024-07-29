package com.flolink.backend.domain.feed.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.flolink.backend.domain.feed.dto.response.FeedResponse;
import com.flolink.backend.domain.feed.service.FeedService;
import com.flolink.backend.global.common.CommonResponse;
import com.flolink.backend.global.common.ResponseCode;

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
	@GetMapping("/{roomId}")
	public ResponseEntity<?> getFeeds(@PathVariable("roomId") final Integer roomId
		, @RequestParam(name = "lastId", required = false, defaultValue = "" + Integer.MAX_VALUE) final Integer lastId
		, @RequestParam(defaultValue = "20") final Integer size) {
		Integer userId = 1;
		List<FeedResponse> feedResponseList = feedService.getFeeds(userId, roomId, lastId, size);
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS, feedResponseList));
	}

	@PostMapping("/{roomId}")
	public ResponseEntity<?> createFeed(@PathVariable("roomId") final Integer roomId) {
		Integer userId = 1;
		// FeedResponse feedResponse = feedService.createFeed(userId,roomId)
		return ResponseEntity.ok(CommonResponse.of(ResponseCode.COMMON_SUCCESS));
	}

	//기간 검색

	//TODO : 해시태그 기반 검색

}
