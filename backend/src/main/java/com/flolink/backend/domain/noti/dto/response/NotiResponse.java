package com.flolink.backend.domain.noti.dto.response;

import com.flolink.backend.domain.noti.entity.Noti;

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
public class NotiResponse {
	private String message;

	public static NotiResponse fromEntity(Noti noti) {
		return NotiResponse.builder()
			.message(noti.getMessage())
			.build();
	}
}
