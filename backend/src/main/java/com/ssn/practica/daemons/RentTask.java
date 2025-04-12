package com.ssn.practica.daemons;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.logging.Logger;

import org.hibernate.Session;

import com.ssn.core.persistence.WithSessionAndTransaction;
import com.ssn.practica.dao.ParameterDAO;

public class RentTask implements Runnable {

	private static final Logger log = Logger.getLogger(RentTask.class.getName());
	private ParameterDAO parameterDAO = ParameterDAO.getInstance();

	@Override
	public void run() {
		log.info("Rent daemon check.");
		rentDaemon();
	}

	public void rentDaemon() {
		new WithSessionAndTransaction<Void>() {
			@Override
			protected void executeBusinessLogic(Session session) {
				LocalDate today = LocalDate.now();
				int daysToKeepBook = parameterDAO.getDaysToKeepBook() - 1;
				Date dateThresholdActive = convertToDate(today.minusDays(daysToKeepBook));

				// update rents to LATE if the keeping days have past
				String hql2 = "UPDATE Rent r " + "SET r.state = 'LATE' " + "WHERE r.finishedAt IS NULL "
						+ "AND r.state = 'ACTIVE' " + "AND r.createdAt < :dateThresholdLate";

				session.createQuery(hql2).setParameter("dateThresholdLate", dateThresholdActive).executeUpdate();

				// if the keeping days parameters has been modified with a larger value, put the
				// affected rents back to active
				String hql1 = "UPDATE Rent r " + "SET r.state = 'ACTIVE' " + "WHERE r.finishedAt IS NULL "
						+ "AND r.state = 'LATE' " + "AND r.createdAt >= :dateThresholdActive";

				session.createQuery(hql1).setParameter("dateThresholdActive", dateThresholdActive).executeUpdate();
			}
		}.run();
	}

	public static Date convertToDate(LocalDate localDate) {
		return Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
	}
}
