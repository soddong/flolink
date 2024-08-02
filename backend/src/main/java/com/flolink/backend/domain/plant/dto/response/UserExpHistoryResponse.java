package com.flolink.backend.domain.plant.dto.response;

import com.flolink.backend.domain.plant.entity.UserExpHistory;

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
public class UserExpHistoryResponse {

	private Integer monthlyRank;
	private String nickname;
	private Integer contributeExp;

	public static UserExpHistoryResponse fromEntity(UserExpHistory userExpHistory, String nickname) {
		return UserExpHistoryResponse.builder()
			.monthlyRank(userExpHistory.getMonthlyRank())
			.nickname(nickname)
			.contributeExp(userExpHistory.getContributeExp())
			.build();
	}

}
