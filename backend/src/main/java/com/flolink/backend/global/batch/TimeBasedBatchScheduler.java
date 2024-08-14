package com.flolink.backend.global.batch;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class TimeBasedBatchScheduler {

	@Autowired
	private JobLauncher jobLauncher;

	@Autowired
	private Job plantExpJob;

	@Autowired
	private Job calendarJob;

	@Autowired
	private Job plantwalkJob;

	// 매월 1일 자정에 실행
	@Scheduled(cron = "0 0 0 1 * ?")
	// @Scheduled(cron = "1 * * * * ?")
	public void runMonthlyPlantUserJob() throws Exception {
		jobLauncher.run(plantExpJob, new JobParametersBuilder()
			.addDate("runDate", new Date())
			.toJobParameters());
	}

	// 매일 오전 8시에 실행
	@Scheduled(cron = "0 0 11 * * ?")
	// @Scheduled(cron = "1 * * * * ?")
	public void runDailyCalendarJob() throws Exception {
		jobLauncher.run(calendarJob, new JobParametersBuilder()
			.addDate("runDate", new Date())
			.toJobParameters());
	}

	// 매일 오전 3시에 실행
	@Scheduled(cron = "0 0 3 * * ?")
	// @Scheduled(cron = "1 * * * * ?")
	public void runDailyPlantWalkAutoEndJob() throws Exception {
		jobLauncher.run(plantwalkJob, new JobParametersBuilder()
			.addDate("runDate", new Date())
			.toJobParameters());
	}
}
