package com.ssn.practica.daemons;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class RentScheduler {

    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    public RentScheduler() {
    }

    public void start() {
    	// daemon is started...
    }

    public void stop() {
        scheduler.shutdown();
    }
}
