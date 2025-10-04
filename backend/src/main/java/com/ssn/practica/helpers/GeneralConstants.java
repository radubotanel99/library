package com.ssn.practica.helpers;

public interface GeneralConstants {
	public static final int DEFAULT_MAX_RENTS_BY_USER = 3;
	public static final int DEFAULT_MAX_DAYS_TO_KEEP_BOOKS = 14;
	public static final String DAYS_TO_KEEP_BOOK = "DaysToKeepABook";
	public static final String MAX_BOOKS_PER_USER = "MaxBooksPerUser";

	public static final String LANGUAGE_PARAM = "Language";
	public static final int ENGLISH = 1;

	public static final String ERRORS = "ERRORS.";
	public static final String INVALID_PARAMETER_NUMBER = ERRORS + "INVALID_PARAMETER_NUMBER";
	public static final String INVALID_BOOK_NUMBER = ERRORS + "INVALID_BOOK_NUMBER";
	public static final String INVALID_BOOK_TITLE = ERRORS + "INVALID_BOOK_TITLE";
	public static final String INVALID_BOOK_CATEGORY = ERRORS + "INVALID_BOOK_CATEGORY";
	public static final String DUPLICATE_BOOK_NUMBER = ERRORS + "DUPLICATE_BOOK_NUMBER";
	public static final String DELETE_RENT_BOOK_ERROR = ERRORS + "DELETE_RENT_BOOK_ERROR";
	public static final String INVALID_CATEGORY_NAME = ERRORS + "INVALID_CATEGORY_NAME";
	public static final String DUPLICATE_CATEGORY_NAME = ERRORS + "DUPLICATE_CATEGORY_NAME";
	public static final String CATEGORY_MISSING = ERRORS + "CATEGORY_MISSING";
	public static final String DELETE_CATEGORY_BOOKS_ERROR = ERRORS + "DELETE_CATEGORY_BOOKS_ERROR";
	public static final String INVALID_USER_NAME = ERRORS + "INVALID_USER_NAME";
	public static final String DUPLICATE_USER_NAME = ERRORS + "DUPLICATE_USER_NAME";
	public static final String DELETE_USER_BOOKS_ERROR = ERRORS + "DELETE_USER_BOOKS_ERROR";
	public static final String INVALID_RENT_USER = ERRORS + "INVALID_RENT_USER";
	public static final String INVALID_RENT_BOOK_NUMBER = ERRORS + "INVALID_RENT_BOOK_NUMBER";
	public static final String BOOK_ALREADY_RENT_ERROR = ERRORS + "BOOK_ALREADY_RENT_ERROR";
	public static final String USER_TOO_MANY_RENTS_ERROR = ERRORS + "USER_TOO_MANY_RENTS_ERROR";

}
