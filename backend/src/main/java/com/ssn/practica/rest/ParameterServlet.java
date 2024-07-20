package com.ssn.practica.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ssn.practica.dao.ParameterDAO;
import com.ssn.practica.model.Category;
import com.ssn.practica.model.Parameter;
import com.ssn.practica.validators.ParameterValidator;

@Path("/parameters")
public class ParameterServlet {
	
	private ParameterDAO parameterDAO = ParameterDAO.getInstance();
	private ParameterValidator parameterValidator = new ParameterValidator();

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response saveParameters(List<Parameter> parameters) {
		Response validationResponse = parameterValidator.validateParameters(parameters);
        if (validationResponse != null) {
            return validationResponse;
        }
		parameterDAO.saveParameters(parameters);
        return Response.status(Response.Status.OK).build();
    }

	@GET
	@Produces(MediaType.APPLICATION_JSON)
    public List<Parameter> getAllParameters() {
        return parameterDAO.getAllParameters();
    }
}
