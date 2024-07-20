// backend/src/main/java/com/example/dao/UserDAO.java
package com.ssn.practica.dao;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.Session;
import org.hibernate.query.Query;

import com.ssn.core.persistence.WithSessionAndTransaction;
import com.ssn.practica.model.Book;
import com.ssn.practica.model.Rent;
import com.ssn.practica.model.RentState;
import com.ssn.practica.model.User;

public class RentDAO {
	
	private UserDAO userDAO = new UserDAO();
	private BookDAO bookDAO = new BookDAO();
	private ParameterDAO parameterDAO = ParameterDAO.getInstance();

	public List<Rent> getRentsByState(RentState state) {
		return new WithSessionAndTransaction<List<Rent>>() {

			@Override
			protected void executeBusinessLogic(Session session) {
				Query query = session.createQuery("from Rent where state = :state");
				query.setParameter("state", state);
				List<Rent> rents = query.getResultList();
				setReturnValue(rents);
			}
		}.run();
	}

	public List<Rent> getRents() {
		return new WithSessionAndTransaction<List<Rent>>() {

			@Override
			protected void executeBusinessLogic(Session session) {
				Query query = session.createQuery("from Rent");
				List<Rent> rents = query.getResultList();
				setReturnValue(rents);
			}
		}.run();
	}

	public void finishRent(long id) {
		new WithSessionAndTransaction<Void>() {
			@Override
			protected void executeBusinessLogic(Session session) {
				Rent rent = session.get(Rent.class, id);
				if (rent != null) {
					rent.setState(RentState.FINISHED);
					rent.setFinishedAt(new Date());
					session.update(rent);
				}
			}
		}.run();
	}
	
	public void updateRent(Rent rent) {
		new WithSessionAndTransaction<Void>() {
			@Override
			protected void executeBusinessLogic(Session session) {
				session.update(rent);
			}
		}.run();
	}
	
	public void insertRent(Rent rent) {
		new WithSessionAndTransaction<Void>() {
			@Override
			protected void executeBusinessLogic(Session session) {
				session.save(rent);
			}
		}.run();
	}
	
	public Rent getRentByBookNumber(int number) {
		
		Book book = bookDAO.getBookByNumber(number);
		List<Rent> rents = getRents().stream()
				.filter(rent -> RentState.ACTIVE.equals(rent.getState()) && rent.getBook().equals(book))
				.collect(Collectors.toList());
		
		if (rents.size() > 1) {
			throw new IllegalStateException("Duplicate rent of the same book. This should not happen!");
		}
		
		return rents.isEmpty() ?  null : rents.get(0);
	} 
	
	public List<Rent> getRentsByUser(String userName) {
		
		User user = userDAO.getUserByName(userName);
		return getRents().stream()
              .filter(rent -> RentState.ACTIVE.equals(rent.getState()) && rent.getUser().equals(user))
              .collect(Collectors.toList());
	}

	public void updateRentsState() {
		LocalDate today = LocalDate.now();
		List<Rent> rents = getRents();
		for (Rent rent : rents) {
			LocalDate rentDate = convertToLocalDateViaInstant(rent.getCreatedAt());
			
			if (rent.getFinishedAt() == null && rent.getState().equals(RentState.LATE)//
					&& !rentDate.isBefore(today.minusDays(parameterDAO.getDaysToKeepBook() - 1))) {
				rent.setState(RentState.ACTIVE);
				updateRent(rent);
			}
			
			if (rent.getFinishedAt() == null && rent.getState().equals(RentState.ACTIVE)//
					&& rentDate.isBefore(today.minusDays(parameterDAO.getDaysToKeepBook() - 1))) {
				rent.setState(RentState.LATE);
				updateRent(rent);
			}
		}
	}
	
	public void rentDaemon() {
		new WithSessionAndTransaction<Void>() {
			@Override
			protected void executeBusinessLogic(Session session) {
				LocalDate today = LocalDate.now();
				int daysToKeepBook = parameterDAO.getDaysToKeepBook() - 1;
				Date dateThresholdActive = convertToDate(today.minusDays(daysToKeepBook));
			
				// update rents to LATE if the keeping days have past
				String hql2 = "UPDATE Rent r " +
			                "SET r.state = 'LATE' " +
			                "WHERE r.finishedAt IS NULL " +
			                "AND r.state = 'ACTIVE' " +
			                "AND r.createdAt < :dateThresholdLate";
			
				session.createQuery(hql2)
			         .setParameter("dateThresholdLate", dateThresholdActive)
			         .executeUpdate();
				
				// if the keeping days parameters has been modified with a larger value, put the affected rents back to active
				String hql1 = "UPDATE Rent r " +
		                "SET r.state = 'ACTIVE' " +
		                "WHERE r.finishedAt IS NULL " +
		                "AND r.state = 'LATE' " +
		                "AND r.createdAt >= :dateThresholdActive";

				session.createQuery(hql1)
			         .setParameter("dateThresholdActive", dateThresholdActive)
			         .executeUpdate();
			}
		}.run();
	}
	
	
	private LocalDate convertToLocalDateViaInstant(Date dateToConvert) {
        return dateToConvert.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    }
	
	public static Date convertToDate(LocalDate localDate) {
        return Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
    }
}
