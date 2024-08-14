package com.flolink.backend.domain.plant.dto.response;

import com.flolink.backend.domain.plant.entity.plantexp.PlantUserExp;
import com.flolink.backend.domain.plant.entity.plantexp.PlantUserExpHistory;

import com.flolink.backend.domain.user.dto.response.UserProfileResponse;
import com.flolink.backend.domain.user.entity.enumtype.EmotionType;
import com.flolink.backend.domain.user.entity.enumtype.ProfileType;
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
	private ProfileType profile;
	private EmotionType emotion;

	public static PlantUserHistoryResponse fromEntity(PlantUserExpHistory userExpHistory, String nickname
	, UserProfileResponse userProfileResponse) {
		return PlantUserHistoryResponse.builder()
			.monthlyRank(userExpHistory.getMonthlyRank())
			.nickname(nickname)
			.contributeExp(userExpHistory.getContributeExp())
			.profile(userProfileResponse.getProfile())
			.emotion(userProfileResponse.getEmotion())
			.build();
	}

}
