package com.flolink.backend.global.batch;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

import com.flolink.backend.domain.plant.entity.Plant;
import com.flolink.backend.domain.plant.entity.plantexp.PlantExpHistory;
import com.flolink.backend.domain.plant.entity.plantexp.PlantUserExp;
import com.flolink.backend.domain.plant.entity.plantexp.PlantUserExpHistory;
import com.flolink.backend.global.batch.plant.PlantItemProcessor;
import com.flolink.backend.global.batch.plant.PlantItemReader;
import com.flolink.backend.global.batch.plant.PlantItemWriter;
import com.flolink.backend.global.batch.rank.RankItemProcessor;
import com.flolink.backend.global.batch.rank.RankItemReader;
import com.flolink.backend.global.batch.rank.RankItemWriter;

@Configuration
@EnableBatchProcessing
public class BatchConfig {

	@Autowired
	private JobRepository jobRepository;

	@Autowired
	private PlatformTransactionManager transactionManager;

	@Autowired
	private PlantItemReader plantItemReader;

	@Autowired
	private PlantItemProcessor plantItemProcessor;

	@Autowired
	private PlantItemWriter plantItemWriter;

	@Autowired
	private RankItemReader rankItemReader;

	@Autowired
	private RankItemProcessor rankItemProcessor;

	@Autowired
	private RankItemWriter rankItemWriter;

	@Bean
	public Job combinedJob() {
		return new JobBuilder("combinedJob", jobRepository)
			.incrementer(new RunIdIncrementer())
			.start(rankStep())
			.next(plantStep())
			.build();
	}

	@Bean
	public Step plantStep() {
		return new StepBuilder("plantStep", jobRepository)
			.<Plant, PlantExpHistory>chunk(10, transactionManager)
			.reader(plantItemReader)
			.processor(plantItemProcessor)
			.writer(plantItemWriter)
			.build();
	}

	@Bean
	public Step rankStep() {
		return new StepBuilder("rankStep", jobRepository)
			.<PlantUserExp, PlantUserExpHistory>chunk(10, transactionManager)
			.reader(rankItemReader)
			.processor(rankItemProcessor)
			.writer(rankItemWriter)
			.build();
	}
}
