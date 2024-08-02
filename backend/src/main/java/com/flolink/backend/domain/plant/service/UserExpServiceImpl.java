package com.flolink.backend.domain.plant.service;

import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.stereotype.Service;

import com.flolink.backend.domain.feed.dto.response.FeedImageResponse;
import com.flolink.backend.domain.plant.dto.response.PlantHistoryDetailResponse;
import com.flolink.backend.domain.plant.dto.response.UserExpHistoryResponse;
import com.flolink.backend.domain.plant.entity.PlantExpHistory;
import com.flolink.backend.domain.plant.repository.PlantHistoryRepository;
import com.flolink.backend.domain.plant.repository.UserExpHistoryRepository;
import com.flolink.backend.domain.user.entity.User;
import com.flolink.backend.domain.user.repository.UserRepository;
import com.flolink.backend.global.common.ResponseCode;
import com.flolink.backend.global.common.exception.NotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserExpServiceImpl {

	private final UserExpHistoryRepository userExpHistoryRepository;
	private final PlantHistoryRepository plantHistoryRepository;
	private final UserRepository userRepository;

	public PlantHistoryDetailResponse getUserExpHistoryDetail(Integer plantId, Integer historyId) {
		List<FeedImageResponse> feedImageResponses = loadFeedImages();

		PlantExpHistory plantExpHistory = loadPlantExpHistory(historyId);
		String dateMonth = formatDateMonth(plantExpHistory);

		List<UserExpHistoryResponse> userExpHistories = loadUserExpHistories(
			plantId,
			dateMonth
		);

		return PlantHistoryDetailResponse.fromEntity(feedImageResponses, userExpHistories);
	}

	private List<FeedImageResponse> loadFeedImages() {
		// TODO: FeedImage 불러오기
		return null;
	}

	private String loadUserNickname(Integer userId) {
		return userRepository.findById(userId)
			.map(User::getNickname)
			.orElse("알수없는유저");
	}

	private PlantExpHistory loadPlantExpHistory(Integer historyId) {
		return plantHistoryRepository.findById(historyId)
			.orElseThrow(() -> new NotFoundException(ResponseCode.PLANT_HISTORY_NOT_FOUND));
	}

	private String formatDateMonth(PlantExpHistory plantExpHistory) {
		return plantExpHistory.getDateMonth()
			.format(DateTimeFormatter.ofPattern("yyyy-MM"));
	}

	private List<UserExpHistoryResponse> loadUserExpHistories(Integer plantId, String dateMonth) {
		return userExpHistoryRepository.findByPlantIdAndDateMonth(plantId, dateMonth)
			.stream()
			.map(userExpHistory -> {
				String nickname = loadUserNickname(userExpHistory.getUserId());
				return UserExpHistoryResponse.fromEntity(userExpHistory, nickname);
			})
			.toList();
	}
}
