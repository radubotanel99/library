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

import com.ssn.practica.dao.BookDAO;
import com.ssn.practica.dao.CategoryDAO;
import com.ssn.practica.model.Book;
import com.ssn.practica.model.Category;
import com.ssn.practica.model.User;
import com.ssn.practica.validators.BookValidator;
import com.ssn.practica.validators.CategoryValidator;

@Path("/categories")
public class CategoryServlet {
	private CategoryDAO categoryDAO = new CategoryDAO();
	private CategoryValidator categoryValidator = new CategoryValidator();

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Category> getCategories() {
		return categoryDAO.getCategories();
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addCategory(Category category) {
		Response validationResponse = categoryValidator.validateCategory(category, false);
        if (validationResponse != null) {
            return validationResponse;
        }
		categoryDAO.addCategory(category);
		return Response.status(Response.Status.CREATED).build();
	}

	@DELETE
	@Path("/{id}")
	public Response deleteCategory(@PathParam("id") int id) {
		Response validationResponse = categoryValidator.checkDeletePossible(id);
        if (validationResponse != null) {
            return validationResponse;
        }
		categoryDAO.deleteCategory(id);
		return Response.status(Response.Status.NO_CONTENT).build();
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateCategory(Category category) {
		Response validationResponse = categoryValidator.validateCategory(category, true);
        if (validationResponse != null) {
            return validationResponse;
        }
		categoryDAO.updateCategory(category);
		return Response.status(Response.Status.OK).build();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCategoryById(@PathParam("id") int id) {
		Category category = categoryDAO.getCategoryById(id);
		if (category != null) {
			return Response.ok(category).build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).build();
		}
	}

	@GET
	@Path("/name/{name}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCategoryByName(@PathParam("name") String name) {
		Category category = categoryDAO.getCategoryByName(name);
		if (category != null) {
			return Response.ok(category).build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).build();
		}
	}
}
