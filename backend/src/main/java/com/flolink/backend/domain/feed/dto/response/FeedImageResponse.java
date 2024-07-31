package com.flolink.backend.domain.feed.dto.response;

import com.flolink.backend.domain.feed.entity.FeedImage;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
class FeedImageResponse {

	private Integer imageOrder;
	private String imageUrl;

	public static FeedImageResponse fromEntity(FeedImage feedImage) {
		return FeedImageResponse.builder()
			.imageUrl(feedImage.getImageUrl())
			.imageOrder(feedImage.getImageOrder())
			.build();
	}

}
