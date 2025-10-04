package com.ssn.practica.validators;

import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ssn.practica.helpers.GeneralConstants;
import com.ssn.practica.model.Parameter;

public class ParameterValidator {

	public Response validateParameters(List<Parameter> parameters) {
		for (Parameter par : parameters) {
			if (par.getValue() <= 0) {
				return ResponseUtils.response(GeneralConstants.INVALID_PARAMETER_NUMBER, par.getName());
			}
		}
		return null;
	}

	private Response response(String message, String paramName) {
		return Response.status(Response.Status.BAD_REQUEST).entity("{\"message\": \"" + message + "\"}")
				.type(MediaType.APPLICATION_JSON).build();
	}
}
