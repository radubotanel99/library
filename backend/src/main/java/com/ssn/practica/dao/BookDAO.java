// backend/src/main/java/com/example/dao/UserDAO.java
package com.ssn.practica.dao;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.NoResultException;

import org.hibernate.Session;
import org.hibernate.query.Query;

import com.ssn.core.persistence.WithSessionAndTransaction;
import com.ssn.practica.model.Book;
import com.ssn.practica.model.Category;
import com.ssn.practica.model.Rent;
import com.ssn.practica.model.RentState;
import com.ssn.practica.model.User;

public class BookDAO {

	public List<Book> getBooks() {
		return getBooksByState(false);
	}

	public void addBook(Book book) {
		new WithSessionAndTransaction<Void>() {

			@Override
			protected void executeBusinessLogic(Session session) {
				session.save(book);
			}

		}.run();
	}

	public void deleteBook(long bookId) {
		new WithSessionAndTransaction<Void>() {
			@Override
			protected void executeBusinessLogic(Session session) {
				Book book = session.get(Book.class, bookId);
				if (book != null) {
					book.setDeleted(true);
					session.update(book);
				}
			}
		}.run();
	}

	public void updateBook(Book book) {
		new WithSessionAndTransaction<Void>() {
			@Override
			protected void executeBusinessLogic(Session session) {
				book.setDeleted(false);
				session.update(book);
			}
		}.run();
	}
	
	public Book getBookById(long bookId) {
		return new WithSessionAndTransaction<Book>() {
			@Override
			protected void executeBusinessLogic(Session session) {
				Book book = session.get(Book.class, bookId);
				if (book != null) {
					setReturnValue(book);
				}
			}
		}.run();
	}
	
	public Book getBookByNumber(int number) {
		return new WithSessionAndTransaction<Book>() {
			@Override
			protected void executeBusinessLogic(Session session) {
				List<Book> books = session.createQuery("from Book where bookNumber = :number and deleted = 0")//
						.setParameter("number", number).getResultList();
				
				if (books.size() > 1) {
					throw new IllegalStateException("Duplicate book numbers found. This should not happen!");
				}
				
				setReturnValue(books.isEmpty() ? null : books.get(0));
			}
		}.run();
	}
	
	public List<Book> getBooksByState(boolean isDeleted) {
		return new WithSessionAndTransaction<List<Book>>() {

			@Override
			protected void executeBusinessLogic(Session session) {
				Query query = session.createQuery("from Book where deleted = :isDeleted");
				query.setParameter("isDeleted", isDeleted);
				List<Book> books = query.getResultList();
				setReturnValue(books);
			}
		}.run();
	}
	
	public List<Book> getBooksByCategory(Category category) {
		return getBooks().stream()
                .filter(book -> category.equals(book.getCategory()))
                .collect(Collectors.toList());
	}

}
