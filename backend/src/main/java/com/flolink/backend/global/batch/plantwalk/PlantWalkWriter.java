package com.flolink.backend.global.batch.plantwalk;

import org.jetbrains.annotations.NotNull;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.flolink.backend.domain.plant.entity.plantexp.PlantExpHistory;
import com.flolink.backend.domain.plant.entity.plantwalk.PlantWalk;
import com.flolink.backend.domain.plant.repository.PlantExpHistoryRepository;

@Component
public class PlantWalkWriter implements ItemWriter<PlantWalk> {

	@Override
	public void write(@NotNull Chunk<? extends PlantWalk> chunks) {
	}
}
