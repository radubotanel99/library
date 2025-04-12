package core.ssn.practica.exceptions;

public class ParameterNotFoundException extends RuntimeException {
	public ParameterNotFoundException(String parameterName) {
		super("Parameter not found: " + parameterName);
	}
}
