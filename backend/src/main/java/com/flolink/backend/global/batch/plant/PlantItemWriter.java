package com.flolink.backend.global.batch.plant;

import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.flolink.backend.domain.plant.entity.PlantExpHistory;
import com.flolink.backend.domain.plant.repository.PlantHistoryRepository;

@Component
public class PlantItemWriter implements ItemWriter<PlantExpHistory> {

	@Autowired
	private PlantHistoryRepository plantHistoryRepository;

	@Override
	public void write(Chunk<? extends PlantExpHistory> items) {
		for (PlantExpHistory history : items) {
			plantHistoryRepository.save(history);
		}
	}
}
