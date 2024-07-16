/*
 * Copyright (c) 2014 SSI Schaefer Noell GmbH
 *
 * $Header: $
 */

package com.ssn.core.persistence;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.ssn.practica.model.Book;
import com.ssn.practica.model.Category;
import com.ssn.practica.model.Rent;
import com.ssn.practica.model.RentState;
import com.ssn.practica.model.User;

/**
 * @author <a href="mailto:rveina@ssi-schaefer-noell.com">rveina</a>
 * @version $Revision: $, $Date: $, $Author: $
 */

public class SessionFactoryProvider {
	private static SessionFactory factory;

	public static SessionFactory getSessionFactory() {
		if (factory == null) {
			try {
//        Configuration configuration = new Configuration().configure();
//        StandardServiceRegistryBuilder builder = new StandardServiceRegistryBuilder().applySettings(configuration.getProperties());
//        factory = configuration.buildSessionFactory(builder.build());

				factory = new Configuration().configure("hibernate.cfg.xml") //
						.addAnnotatedClass(User.class) //
						.addAnnotatedClass(Book.class) //
						.addAnnotatedClass(Category.class) //
						.addAnnotatedClass(Rent.class) //
						.buildSessionFactory();
				init();
			} catch (Throwable ex) {	
				System.err.println("Failed to create sessionFactory object." + ex);
			}
		}

		return factory;
	}

	private static void init() {
		new WithSessionAndTransaction<Void>() {

			@Override
			protected void executeBusinessLogic(Session session) {
				User user = new User();
				user.setName("asdasd");
				user.setEmail("zxczxcx");
				user.setAddress("scfesrgfer");
				user.setPhoneNumber("0735156464");
				session.save(user);
				
				Category category = new Category("Test", "");
				session.save(category);

				Book book = new Book();
				book.setTitle("test");
				book.setAuthor("Test");
				book.setCategory(category);
				book.setBookNumber(1);
				book.setPublisher("aefew");
				book.setPrice(4);
				session.save(book);
				
				
				Rent rent = new Rent();
				rent.setBook(book);
				rent.setUser(user);
				rent.setState(RentState.ACTIVE);
				session.save(rent);
			}

		}.run();
	}
}
