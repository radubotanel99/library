// backend/src/main/java/com/example/servlet/UserServlet.java
package com.ssn.practica.rest;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ssn.practica.dao.BookDAO;
import com.ssn.practica.model.Book;
import com.ssn.practica.model.Rent;
import com.ssn.practica.model.RentState;
import com.ssn.practica.model.User;
import com.ssn.practica.validators.BookValidator;

@Path("/books")
public class BookServlet {
	
	private BookDAO bookDAO = new BookDAO();
	
    private BookValidator bookValidator = new BookValidator();

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Book> getBooks() {
		return bookDAO.getBooks();
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addBook(Book book) {
		Response validationResponse = bookValidator.validateBook(book, false);
        if (validationResponse != null) {
            return validationResponse;
        }
		bookDAO.addBook(book);
		return Response.status(Response.Status.CREATED).build();
	}

	@DELETE
	@Path("/{id}")
	public Response deleteBook(@PathParam("id") int id) {
		Response validationResponse = bookValidator.checkDeletePossible(id);
        if (validationResponse != null) {
            return validationResponse;
        }
		bookDAO.deleteBook(id);
		return Response.status(Response.Status.NO_CONTENT).build();
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateBook(Book book) {
		Response validationResponse = bookValidator.validateBook(book, true);
        if (validationResponse != null) {
            return validationResponse;
        }
		bookDAO.updateBook(book);
		return Response.status(Response.Status.OK).build();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getBookById(@PathParam("id") int id) {
		Book book = bookDAO.getBookById(id);
		if (book != null) {
			return Response.ok(book).build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).build();
		}
	}
	
	@GET
	@Path("/bookNumber/{bookNumber}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getBookByNumber(@PathParam("bookNumber") int number) {
		Book book = bookDAO.getBookByNumber(number);
		if (book != null) {
			return Response.ok(book).build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).build();
		}
	}
	
	@GET
	@Path("/state/{state}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getBooksByState(@PathParam("state") boolean isDeleted) {
		List<Book> books = bookDAO.getBooksByState(isDeleted);
		return Response.ok(books).build();
	}
}
