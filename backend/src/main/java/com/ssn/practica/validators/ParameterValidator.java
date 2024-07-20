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
import com.ssn.practica.model.Parameter;
import com.ssn.practica.model.Rent;
import com.ssn.practica.model.User;

public class ParameterValidator {

    public Response validateParameters(List<Parameter> parameters) {
        for (Parameter par : parameters) {
        	if (par.getValue() <= 0) {
                return response("Invalid number for " + par.getName());
            }
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
