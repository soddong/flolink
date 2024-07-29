package com.flolink.backend.domain.feed.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Tag(name = "Feed API", description = "피드와 관련된 API")
@Slf4j
@RequestMapping("/feeds")
@RequiredArgsConstructor
public class FeedController {

}
