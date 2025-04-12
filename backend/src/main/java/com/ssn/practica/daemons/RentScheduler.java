package com.ssn.practica.daemons;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.logging.Logger;

public class RentScheduler {

	private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
	private static final Logger log = Logger.getLogger(RentTask.class.getName());

	public RentScheduler() {
	}

	public void start() {
		log.info("Rent daemon started...");
	}

	public void stop() {
		scheduler.shutdown();
		log.info("Rent daemon stopped.");
	}
}
