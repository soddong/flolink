package com.flolink.backend.domain.plant.service.plantexp;

import java.util.List;

import com.flolink.backend.domain.user.dto.response.UserProfileResponse;
import org.springframework.stereotype.Service;

import com.flolink.backend.domain.feed.dto.response.FeedImageResponse;
import com.flolink.backend.domain.feed.service.FeedService;
import com.flolink.backend.domain.plant.dto.response.PlantHistoryDetailResponse;
import com.flolink.backend.domain.plant.dto.response.PlantUserHistoryResponse;
import com.flolink.backend.domain.plant.entity.plantexp.PlantExpHistory;
import com.flolink.backend.domain.plant.entity.plantexp.PlantUserExp;
import com.flolink.backend.domain.plant.repository.PlantExpHistoryRepository;
import com.flolink.backend.domain.plant.repository.PlantUserExpHistoryRepository;
import com.flolink.backend.domain.plant.repository.PlantUserExpRepository;
import com.flolink.backend.domain.room.entity.Room;
import com.flolink.backend.domain.user.entity.User;
import com.flolink.backend.domain.user.repository.UserRepository;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.NotFoundException;
import com.flolink.backend.global.util.DateTimeUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlantExpUserServiceImpl implements PlantExpUserService {

	private final FeedService feedService;

	private final PlantUserExpHistoryRepository plantUserExpHistoryRepository;
	private final PlantUserExpRepository plantUserExpRepository;
	private final PlantExpHistoryRepository plantExpHistoryRepository;
	private final UserRepository userRepository;

	/**
	 * 식물의 경험치 히스토리 상세 정보를 조회 (월별 기억정원 조회시)
	 * @param plantId 식물 ID
	 * @param historyId 히스토리 ID
	 * @return 식물 경험치 히스토리 상세 정보
	 */
	public PlantHistoryDetailResponse getUserExpHistoryDetail(Integer plantId, Integer historyId) {

		PlantExpHistory plantExpHistory = loadPlantExpHistory(historyId);
		Room room = plantExpHistory.getPlant().getRoom();
		String dateMonth = DateTimeUtil.formatDateMonth(plantExpHistory.getDateMonth());
		List<PlantUserHistoryResponse> userExpHistories = loadUserExpHistories(plantId, dateMonth);
		List<FeedImageResponse> feedImageResponses = loadFeedImages(room.getRoomId(), dateMonth);

		return PlantHistoryDetailResponse.fromEntity(feedImageResponses, userExpHistories);
	}

	@Override
	public PlantUserExp findPlantUserExp(Integer userId, Integer plantId) {
		return plantUserExpRepository.findByUserIdAndPlantPlantId(userId, plantId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.USER_EXP_NOT_FOUND));
	}

	private List<FeedImageResponse> loadFeedImages(Integer roomId, String dateMonth) {
		return feedService.getImages(roomId,
			DateTimeUtil.atStartOfDay(dateMonth),
			DateTimeUtil.atEndOfDay(dateMonth)
		);
	}

	private String loadUserNickname(Integer userId) {
		return userRepository.findById(userId)
			.map(User::getNickname)
			.orElse("알수없는유저");
	}

	private PlantExpHistory loadPlantExpHistory(Integer historyId) {
		return plantExpHistoryRepository.findById(historyId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.PLANT_HISTORY_NOT_FOUND));
	}

	private UserProfileResponse loadUserProfile(Integer userId) {
		return userRepository.findUserProfileByUserId(userId)
				.orElseThrow(() -> new NotFoundException(ResponseCode.USER_NOT_FOUND));
	}

	private List<PlantUserHistoryResponse> loadUserExpHistories(Integer plantId, String dateMonth) {
		return plantUserExpHistoryRepository.findByPlantIdAndDateMonth(plantId, dateMonth)
			.stream()
			.map(userExpHistory -> {
				String nickname = loadUserNickname(userExpHistory.getUserId());
				UserProfileResponse userProfileResponse = loadUserProfile(userExpHistory.getUserId());
				return PlantUserHistoryResponse.fromEntity(userExpHistory, nickname, userProfileResponse);
			})
			.toList();
	}

}
