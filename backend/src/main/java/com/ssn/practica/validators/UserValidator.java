package com.ssn.practica.validators;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ssn.practica.dao.BookDAO;
import com.ssn.practica.dao.CategoryDAO;
import com.ssn.practica.dao.RentDAO;
import com.ssn.practica.dao.UserDAO;
import com.ssn.practica.model.Book;
import com.ssn.practica.model.Category;
import com.ssn.practica.model.Rent;
import com.ssn.practica.model.User;

public class UserValidator {
	
    private UserDAO userDAO = new UserDAO();
    private RentDAO rentDAO = new RentDAO();

    public Response validateUser(User user, boolean isEditMode) {
        
        if (user.getName() == null || user.getName().trim().isEmpty()) {
        	return response("User name cannot be empty.");
        }

        User sameNameUser = userDAO.getUserByName(user.getName());
        if (sameNameUser != null) {
        	return !isEditMode ? checkDuplicateAdd(user) : checkDuplicateUpdate(user, sameNameUser);
        }
        
        return null;
    }
    
    private Response checkDuplicateAdd(User user) {
    	return response("There is another user with this name.");
	}

	private Response checkDuplicateUpdate(User user, User sameNameUser) {
		if (!user.equals(sameNameUser)) {
			return response("There is another user with this name.");
    	}
    	return null;
	}

	public Response checkDeletePossible(int id) {
		User user = userDAO.getUserById(id);
		List<Rent> rentsByUser = rentDAO.getRentsByUser(user.getName());
		if (rentsByUser.size() > 0) {
			return response("This user has books rent. Delete not possible.");
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
