/*
 * Copyright (c) 2014 SSI Schaefer Noell GmbH
 *
 * $Header: $
 */

package com.ssn.core.persistence;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.ssn.practica.daemons.RentScheduler;
import com.ssn.practica.daemons.RentTask;
import com.ssn.practica.model.Book;
import com.ssn.practica.model.Category;
import com.ssn.practica.model.Rent;
import com.ssn.practica.model.RentState;
import com.ssn.practica.model.User;


public class SessionFactoryProvider {
	private static SessionFactory factory;
	
	private static SessionFactory sessionFactory;
    private static ScheduledExecutorService scheduler;
    private static RentScheduler rentScheduler;

    static {
        try {
        } catch (Throwable ex) {
            throw new ExceptionInInitializerError(ex);
        }
    }

	public static SessionFactory getSessionFactory() {
		if (factory == null) {
			try {

				factory = new Configuration().configure("hibernate.cfg.xml") //
						.addAnnotatedClass(User.class) //
						.addAnnotatedClass(Book.class) //
						.addAnnotatedClass(Category.class) //
						.addAnnotatedClass(Rent.class) //
						.buildSessionFactory();
				
//				init();
				
				rentScheduler = new RentScheduler();
	            scheduler = Executors.newScheduledThreadPool(1);
	            scheduler.scheduleAtFixedRate(new RentTask(), 0, 10, TimeUnit.SECONDS);
	            Runtime.getRuntime().addShutdownHook(new Thread(() -> {
	                if (scheduler != null) {
	                    scheduler.shutdown();
	                }
	            }));
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
				
				
				for (int i=2; i<=200; i++) {
					book = new Book();
					book.setTitle("Test" + i);
					book.setAuthor("Author" + i);
					book.setCategory(category);
					book.setBookNumber(i);
					book.setPublisher("aefew" + i);
					book.setPrice(4 + i);
					session.save(book);
					
					user = new User();
					user.setName("Test" + i);
					user.setEmail("test@gmail.com" + i);
					user.setAddress("str Trandafir" + i);
					user.setPhoneNumber("073515644");
					session.save(user);
					
					category = new Category("Test" + i, "");
					session.save(category);
				}
			}

		}.run();
	}
}
