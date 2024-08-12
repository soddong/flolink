package com.flolink.backend.global.batch.rank;

import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.flolink.backend.domain.plant.entity.plantexp.PlantUserExpHistory;
import com.flolink.backend.domain.plant.repository.PlantUserExpHistoryRepository;

@Component
public class RankItemWriter implements ItemWriter<PlantUserExpHistory> {

	@Autowired
	private PlantUserExpHistoryRepository plantUserExpHistoryRepository;

	@Override
	public void write(Chunk<? extends PlantUserExpHistory> items) throws Exception {
		plantUserExpHistoryRepository.saveAll(items);
	}
}
