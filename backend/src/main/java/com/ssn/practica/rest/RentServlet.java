// backend/src/main/java/com/example/servlet/UserServlet.java
package com.ssn.practica.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ssn.practica.dao.BookDAO;
import com.ssn.practica.dao.RentDAO;
import com.ssn.practica.model.Book;
import com.ssn.practica.model.Rent;
import com.ssn.practica.model.RentState;
import com.ssn.practica.validators.RentValidator;

@Path("/rents")
public class RentServlet {
	private RentDAO rentDAO = new RentDAO();
	private BookDAO bookDAO = new BookDAO();
	private RentValidator rentValidator = new RentValidator();

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Rent> getRents() {
		return rentDAO.getRents();
	}

	@GET
	@Path("/{state}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getRentsByState(@PathParam("state") String state) {
		List<Rent> orders = rentDAO.getRentsByState(RentState.valueOf(state));
		return Response.ok(orders).build();
	}

	@POST
	@Path("/{id}/finish")
	public Response finishRent(@PathParam("id") int id) {
		rentDAO.finishRent(id);
		return Response.status(Response.Status.OK).build();
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addRent(Rent rent) {
		Response validationResponse = rentValidator.validateRent(rent);
        if (validationResponse != null) {
            return validationResponse;
        }
		rentDAO.insertRent(rent);
		return Response.status(Response.Status.CREATED).build();
	}
}
