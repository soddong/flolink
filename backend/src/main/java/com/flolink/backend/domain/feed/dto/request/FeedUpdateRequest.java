package com.flolink.backend.domain.feed.dto.request;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

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
public class FeedUpdateRequest {
	private Integer roomId;
	private String content;
	private List<MultipartFile> images;
}
