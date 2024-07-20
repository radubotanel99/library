package com.ssn.practica.validators;

import javax.inject.Inject;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ssn.practica.dao.BookDAO;
import com.ssn.practica.dao.RentDAO;
import com.ssn.practica.model.Book;
import com.ssn.practica.model.Rent;

public class BookValidator {
	
    private BookDAO bookDAO = new BookDAO();
    private RentDAO rentDAO = new RentDAO();

    public Response validateBook(Book book, boolean isEditMode) {
    	
        if (book.getBookNumber() <= 0) {
            return response("Invalid book number.");
        }
        
        if (book.getTitle() == null || book.getTitle().trim().isEmpty()) {
            return response("Title cannot be empty.");
        }
        
        if (book.getCategory() == null || book.getCategory().getName().trim().isEmpty()) {
        	return response("Category cannot be empty.");
        }
        
        
        Book sameNumberBook = bookDAO.getBookByNumber(book.getBookNumber());
        if (sameNumberBook != null) {
        	return !isEditMode ? checkDuplicateAdd(book) : checkDuplicateUpdate(book, sameNumberBook);
        }
     
        return null;
    }
    
    private Response checkDuplicateAdd(Book book) {
    	return response("There is another book with this number.");
    }
    
    private Response checkDuplicateUpdate(Book book, Book sameNumberBook) {
    	if (!book.getId().equals(sameNumberBook.getId())) {
//    	if (book.getId() != sameNumberBook.getId()) {
    		return response("There is another book with this number.");
    	}
    	return null;
    }
    
    public Response checkDeletePossible(int id) {
    	Book book = bookDAO.getBookById(id);
    	Rent rentByBookNumber = rentDAO.getRentByBookNumber(book.getBookNumber());
    	if (rentByBookNumber != null) {
    		return response("Somebody has rent this book. Delete not possible.");
    	}
    	return null;
    }
    
    private Response response(String message) {
        return Response.status(Response.Status.BAD_REQUEST)
                       .entity("{\"message\": \"" + message + "\"}")
                       .type(MediaType.APPLICATION_JSON)
                       .build();
    }

}
