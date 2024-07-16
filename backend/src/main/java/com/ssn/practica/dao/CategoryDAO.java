// backend/src/main/java/com/example/dao/UserDAO.java
package com.ssn.practica.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.query.Query;

import com.ssn.core.persistence.WithSessionAndTransaction;
import com.ssn.practica.model.Book;
import com.ssn.practica.model.Category;
import com.ssn.practica.model.User;


public class CategoryDAO {

	
	public List<Category> getCategories() {
		return new WithSessionAndTransaction<List<Category>>() {

			@Override
			protected void executeBusinessLogic(Session session) {
				List<Category> categories = session.createQuery("from Category").getResultList();
				setReturnValue(categories);
			}
		}.run();
	}

	public void addCategory(Category category) {
		new WithSessionAndTransaction<Void>() {

			@Override
			protected void executeBusinessLogic(Session session) {
				session.save(category);
			}

		}.run();
	}

	public void deleteCategory(long bookId) {
		new WithSessionAndTransaction<Void>() {
			@Override
			protected void executeBusinessLogic(Session session) {
				Category category = session.get(Category.class, bookId);
				if (category != null) {
					session.delete(category);
				}
			}
		}.run();
	}

	public void updateCategory(Category category) {
		new WithSessionAndTransaction<Void>() {
			@Override
			protected void executeBusinessLogic(Session session) {
				session.update(category);
			}
		}.run();
	}
	
	public Category getCategoryById(long categoryId) {
		return new WithSessionAndTransaction<Category>() {
			@Override
			protected void executeBusinessLogic(Session session) {
				Category category = session.get(Category.class, categoryId);
				if (category != null) {
					setReturnValue(category);
				}
			}
		}.run();
	}
	
	public Category getCategoryByName(String categoryName) {
		return new WithSessionAndTransaction<Category>() {
			@Override
			protected void executeBusinessLogic(Session session) {
				List<Category> categories = session.createQuery("from Category where name = :category")//
							.setParameter("category", categoryName).getResultList();
				
				if (categories.size() > 1) {
					throw new IllegalStateException("Duplicate book numbers found. This should not happen!");
				}
				
				if (categories.isEmpty()) {
					setReturnValue(null);
				} else {
					setReturnValue(categories.get(0));					
				}
			}
		}.run();
	}

}
