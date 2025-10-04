package com.ssn.practica.validators;

import java.util.List;

import javax.ws.rs.core.Response;

import com.ssn.practica.dao.ParameterDAO;
import com.ssn.practica.dao.RentDAO;
import com.ssn.practica.helpers.GeneralConstants;
import com.ssn.practica.model.Rent;

public class RentValidator {

	private RentDAO rentDAO = new RentDAO();
	private ParameterDAO parameterDAO = ParameterDAO.getInstance();;

	public Response validateRent(Rent rent) {

		if (rent.getUser() == null || rent.getUser().getName() == null || rent.getUser().getName().trim().isEmpty()) {
			return ResponseUtils.response(GeneralConstants.INVALID_RENT_USER);
		}

		if (rent.getBook() == null) {
			return ResponseUtils.response(GeneralConstants.INVALID_RENT_BOOK_NUMBER);
		}

		Rent existingBookRent = rentDAO.getRentByBookNumber(rent.getBook().getBookNumber());
		if (existingBookRent != null) {
			return ResponseUtils.response(GeneralConstants.BOOK_ALREADY_RENT_ERROR);
		}

		List<Rent> rentsByUser = rentDAO.getRentsByUser(rent.getUser().getName());
		if (!rentsByUser.isEmpty() && rentsByUser.size() >= parameterDAO.getMaxBooksPerUser()) {
			return ResponseUtils.response(GeneralConstants.USER_TOO_MANY_RENTS_ERROR);
		}
		return null;
	}

//	private Response response(String message) {
//		return Response.status(Response.Status.BAD_REQUEST).entity("{\"message\": \"" + message + "\"}")
//				.type(MediaType.APPLICATION_JSON).build();
//	}
}
