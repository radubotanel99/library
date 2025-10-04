package com.ssn.practica.validators;

import javax.ws.rs.core.Response;

import com.ssn.practica.dao.BookDAO;
import com.ssn.practica.dao.RentDAO;
import com.ssn.practica.helpers.GeneralConstants;
import com.ssn.practica.model.Book;
import com.ssn.practica.model.Rent;

public class BookValidator {

	private BookDAO bookDAO = new BookDAO();
	private RentDAO rentDAO = new RentDAO();

	public Response validateBook(Book book, boolean isEditMode) {

		if (book.getBookNumber() <= 0) {
			return ResponseUtils.response(GeneralConstants.INVALID_BOOK_NUMBER);
		}

		if (book.getTitle() == null || book.getTitle().trim().isEmpty()) {
			return ResponseUtils.response(GeneralConstants.INVALID_BOOK_TITLE);
		}

		if (book.getCategory() == null || book.getCategory().getName().trim().isEmpty()) {
			return ResponseUtils.response(GeneralConstants.INVALID_BOOK_CATEGORY);
		}

		Book sameNumberBook = bookDAO.getBookByNumber(book.getBookNumber());
		if (sameNumberBook != null) {
			return !isEditMode ? messagekDuplicateAdd(book) : messageDuplicateUpdate(book, sameNumberBook);
		}

		return null;
	}

	private Response messagekDuplicateAdd(Book book) {
		return ResponseUtils.response(GeneralConstants.DUPLICATE_BOOK_NUMBER);
	}

	private Response messageDuplicateUpdate(Book book, Book sameNumberBook) {
		if (!book.getId().equals(sameNumberBook.getId())) {
			return ResponseUtils.response(GeneralConstants.DUPLICATE_BOOK_NUMBER);
		}
		return null;
	}

	public Response checkDeletePossible(int id) {
		Book book = bookDAO.getBookById(id);
		Rent rentByBookNumber = rentDAO.getRentByBookNumber(book.getBookNumber());
		if (rentByBookNumber != null) {
			return ResponseUtils.response(GeneralConstants.DELETE_RENT_BOOK_ERROR);
		}
		return null;
	}

//	private Response response(String message) {
//		return Response.status(Response.Status.BAD_REQUEST).entity("{\"message\": \"" + message + "\"}")
//				.type(MediaType.APPLICATION_JSON).build();
//	}

}
