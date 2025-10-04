package com.ssn.practica.validators;

import javax.ws.rs.core.Response;

import com.ssn.practica.dao.BookDAO;
import com.ssn.practica.dao.CategoryDAO;
import com.ssn.practica.helpers.GeneralConstants;
import com.ssn.practica.model.Category;

public class CategoryValidator {

	private CategoryDAO categoryDAO = new CategoryDAO();
	private BookDAO bookDAO = new BookDAO();

	public Response validateCategory(Category category, boolean isEditMode) {

		if (category.getName() == null || category.getName().trim().isEmpty()) {
			return ResponseUtils.response(GeneralConstants.INVALID_CATEGORY_NAME);
		}

		Category sameCategoryName = categoryDAO.getCategoryByName(category.getName());
		if (sameCategoryName != null) {
			return !isEditMode ? checkDuplicateAdd(category) : checkDuplicateUpdate(category, sameCategoryName);
		}

		return null;
	}

	private Response checkDuplicateAdd(Category category) {
		return ResponseUtils.response(GeneralConstants.DUPLICATE_CATEGORY_NAME);
	}

	private Response checkDuplicateUpdate(Category category, Category sameCategoryName) {
		if (!category.equals(sameCategoryName)) {
			return ResponseUtils.response(GeneralConstants.DUPLICATE_CATEGORY_NAME);
		}
		return null;
	}

	public Response checkDeletePossible(int id) {
		Category category = categoryDAO.getCategoryById(id);
		if (null == category) {
			return ResponseUtils.response(GeneralConstants.CATEGORY_MISSING);
		}
		if (bookDAO.getBooksByCategory(category).size() >= 1) {
			return ResponseUtils.response(GeneralConstants.DELETE_CATEGORY_BOOKS_ERROR);
		}
		return null;
	}

//	private Response response(String message) {
//		return Response.status(Response.Status.BAD_REQUEST).entity("{\"message\": \"" + message + "\"}")
//				.type(MediaType.APPLICATION_JSON).build();
//	}

}
