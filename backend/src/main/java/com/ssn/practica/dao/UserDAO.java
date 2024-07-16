// backend/src/main/java/com/example/dao/UserDAO.java
package com.ssn.practica.dao;

import java.util.List;

import org.hibernate.Session;

import com.ssn.core.persistence.WithSessionAndTransaction;
import com.ssn.practica.model.Book;
import com.ssn.practica.model.Category;
import com.ssn.practica.model.User;

public class UserDAO {

	public List<User> getUsers() {
		return getUsersByState(false);
	}

	public void addUser(User user) {
		new WithSessionAndTransaction<Void>() {

			@Override
			protected void executeBusinessLogic(Session session) {
				session.save(user);
			}

		}.run();
	}

	public void deleteUser(long userId) {
		new WithSessionAndTransaction<Void>() {
			@Override
			protected void executeBusinessLogic(Session session) {
				User user = session.get(User.class, userId);
				if (user != null) {
					user.setDeleted(true);
					session.update(user);
				}
			}
		}.run();
	}

	public void updateUser(User user) {
		new WithSessionAndTransaction<Void>() {
			@Override
			protected void executeBusinessLogic(Session session) {
				session.update(user);
			}
		}.run();
	}
	
	public User getUserById(long userId) {
		return new WithSessionAndTransaction<User>() {
			@Override
			protected void executeBusinessLogic(Session session) {
				User user = session.get(User.class, userId);
				if (user != null) {
					setReturnValue(user);
				}
			}
		}.run();
	}
	
	public User getUserByName(String name) {
		return new WithSessionAndTransaction<User>() {
			@Override
			protected void executeBusinessLogic(Session session) {
				List<User> users = session.createQuery("from User where name = :name and deleted = 0")//
						.setParameter("name", name).getResultList();
				
				if (users.size() > 1) {
					throw new IllegalStateException("Duplicate user names found. This should not happen!");
				}
				
				if (users.isEmpty()) {
					setReturnValue(null);
				} else {
					setReturnValue(users.get(0));					
				}
			}
		}.run();
	}
	
	public List<User> getUsersByState(boolean isDeleted) {
		return new WithSessionAndTransaction<List<User>>() {

			@Override
			protected void executeBusinessLogic(Session session) {
				List<User> users = session.createQuery("from User where deleted = :isDeleted").setParameter("isDeleted", isDeleted).getResultList();
				setReturnValue(users);
			}
		}.run();
	}

}
