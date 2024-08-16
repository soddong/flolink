package com.flolink.backend.domain.feed.dto.request;

import java.time.LocalDate;

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
public class FeedImageRequest {
	private Integer roomId;
	private LocalDate startDate;
	private LocalDate endDate;
}
