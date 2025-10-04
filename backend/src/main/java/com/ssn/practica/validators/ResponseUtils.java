package com.ssn.practica.validators;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

public class ResponseUtils {

	protected static Response response(String message, String paramName) {
		return Response.status(Response.Status.BAD_REQUEST).entity(new ErrorResponse(message, paramName))
				.type(MediaType.APPLICATION_JSON).build();
	}

	protected static Response response(String message) {
		return response(message, null);
	}
}

class ErrorResponse {
	private String messageKey;
	private String param;

	public ErrorResponse(String messageKey, String param) {
		this.messageKey = messageKey;
		this.param = param;
	}

	public String getMessageKey() {
		return messageKey;
	}

	public void setMessageKey(String messageKey) {
		this.messageKey = messageKey;
	}

	public String getParam() {
		return param;
	}

	public void setParams(String param) {
		this.param = param;
	}
}
