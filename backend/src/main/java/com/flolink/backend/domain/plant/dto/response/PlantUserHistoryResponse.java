package com.flolink.backend.domain.plant.dto.response;

import com.flolink.backend.domain.plant.entity.plantexp.PlantUserExp;
import com.flolink.backend.domain.plant.entity.plantexp.PlantUserExpHistory;

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
public class PlantUserHistoryResponse {

	private Integer monthlyRank;
	private String nickname;
	private Integer contributeExp;

	public static PlantUserHistoryResponse fromEntity(PlantUserExpHistory userExpHistory, String nickname) {
		return PlantUserHistoryResponse.builder()
			.monthlyRank(userExpHistory.getMonthlyRank())
			.nickname(nickname)
			.contributeExp(userExpHistory.getContributeExp())
			.build();
	}

}
