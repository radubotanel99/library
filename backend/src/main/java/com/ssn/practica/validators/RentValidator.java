package com.ssn.practica.validators;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ssn.practica.dao.BookDAO;
import com.ssn.practica.dao.CategoryDAO;
import com.ssn.practica.dao.ParameterDAO;
import com.ssn.practica.dao.RentDAO;
import com.ssn.practica.dao.UserDAO;
import com.ssn.practica.helpers.GeneralConstants;
import com.ssn.practica.model.Book;
import com.ssn.practica.model.Category;
import com.ssn.practica.model.Rent;
import com.ssn.practica.model.User;

public class RentValidator {
	
	private RentDAO rentDAO = new RentDAO();
	private ParameterDAO parameterDAO = ParameterDAO.getInstance();;

    public Response validateRent(Rent rent) {
        
        if (rent.getUser() == null || rent.getUser().getName() == null || rent.getUser().getName().trim().isEmpty()) {
        	return response("User name cannot be empty.");
        }
        
        if (rent.getBook() == null) {
        	return response("There is no book with this number.");
        }
        
        Rent existingBookRent = rentDAO.getRentByBookNumber(rent.getBook().getBookNumber());
        if (existingBookRent != null) {
        	return response("This book is already rent.");
        }
        
        List<Rent> rentsByUser = rentDAO.getRentsByUser(rent.getUser().getName());
        if (!rentsByUser.isEmpty() && rentsByUser.size() >= parameterDAO.getMaxBooksPerUser()) {
        	return response("This user has too many books already rent");
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
