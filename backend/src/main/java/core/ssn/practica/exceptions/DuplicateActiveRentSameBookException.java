package core.ssn.practica.exceptions;

public class DuplicateActiveRentSameBookException extends RuntimeException {
	public DuplicateActiveRentSameBookException(int bookNumber) {
		super("Duplicate active rent of the same book. This should not happen! Book number: " + bookNumber);
	}
}
