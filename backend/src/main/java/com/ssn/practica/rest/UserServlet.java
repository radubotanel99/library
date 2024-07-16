// backend/src/main/java/com/example/servlet/UserServlet.java
package com.ssn.practica.rest;

import java.util.List;

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

import com.ssn.practica.dao.UserDAO;
import com.ssn.practica.model.User;
import com.ssn.practica.validators.CategoryValidator;
import com.ssn.practica.validators.UserValidator;

@Path("/users")
public class UserServlet {
	private UserDAO userDAO = new UserDAO();
	private UserValidator userValidator = new UserValidator();

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<User> getUsers() {
		return userDAO.getUsers();
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addUser(User user) {
		Response validationResponse = userValidator.validateUser(user, false);
        if (validationResponse != null) {
            return validationResponse;
        }
		userDAO.addUser(user);
		return Response.status(Response.Status.CREATED).build();
	}

	@DELETE
	@Path("/{id}")
	public Response deleteUser(@PathParam("id") int id) {
		Response validationResponse = userValidator.checkDeletePossible(id);
        if (validationResponse != null) {
            return validationResponse;
        }
		userDAO.deleteUser(id);
		return Response.status(Response.Status.NO_CONTENT).build();
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateUser(User user) {
		Response validationResponse = userValidator.validateUser(user, true);
        if (validationResponse != null) {
            return validationResponse;
        }
		userDAO.updateUser(user);
		return Response.status(Response.Status.OK).build();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUserById(@PathParam("id") int id) {
		User user = userDAO.getUserById(id);
		if (user != null) {
			return Response.ok(user).build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).build();
		}
	}
	
	@GET
	@Path("/name/{name}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUserByName(@PathParam("name") String name) {
		User user = userDAO.getUserByName(name);
		if (user != null) {
			return Response.ok(user).build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).build();
		}
	}
}
