// backend/src/main/java/com/example/dao/UserDAO.java
package com.ssn.practica.dao;

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
	
	UserDAO userDAO = new UserDAO();
	BookDAO bookDAO = new BookDAO();

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
}
