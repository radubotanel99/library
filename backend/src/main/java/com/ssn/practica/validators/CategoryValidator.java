package com.ssn.practica.validators;

import javax.inject.Inject;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ssn.practica.dao.BookDAO;
import com.ssn.practica.dao.CategoryDAO;
import com.ssn.practica.model.Book;
import com.ssn.practica.model.Category;

public class CategoryValidator {
	
    private CategoryDAO categoryDAO = new CategoryDAO();
    private BookDAO bookDAO = new BookDAO();

    public Response validateCategory(Category category, boolean isEditMode) {
        
        if (category.getName() == null || category.getName().trim().isEmpty()) {
        	return response("Category name cannot be empty.");
        }
        
        Category sameCategoryName = categoryDAO.getCategoryByName(category.getName());
        if (sameCategoryName != null) {
        	return !isEditMode ? checkDuplicateAdd(category) : checkDuplicateUpdate(category, sameCategoryName);
        }
        
        return null;
    }
    

	private Response checkDuplicateAdd(Category category) {
		return response("There is another category with this name.");
	}

	private Response checkDuplicateUpdate(Category category, Category sameCategoryName) {
		if (!category.equals(sameCategoryName)) {
			return response("There is another category with this name.");
    	}
    	return null;
	}
	
	public Response checkDeletePossible(int id) {
		Category category = categoryDAO.getCategoryById(id);
		if (null == category) {
			return response("There's no category to delete.");
		}
		if (bookDAO.getBooksByCategory(category).size() >= 1) {
			return response("There are books with this category. The delete isn't possible.");
		}
		return null;
	}
	
	private Response response(String message) {
        return Response.status(Response.Status.BAD_REQUEST)
                       .entity("{\"message\": \"" + message + "\"}")
                       .type(MediaType.APPLICATION_JSON)
                       .build();
    }


	
}
