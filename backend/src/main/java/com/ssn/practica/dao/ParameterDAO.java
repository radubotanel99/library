package com.ssn.practica.dao;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssn.practica.daemons.RentTask;
import com.ssn.practica.helpers.GeneralConstants;
import com.ssn.practica.model.Parameter;

public class ParameterDAO {

	private static final String RELATIVE_FILE_PATH = "backend/parameters.json";
	private final String filePath;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private List<Parameter> parameters = new ArrayList<>();
    private static ParameterDAO instance;
    
    public static synchronized ParameterDAO getInstance() {
        if (instance == null) {
            instance = new ParameterDAO();
        }
        return instance;
    }

    private ParameterDAO() {
    	 this.filePath = getProjectRootPath().resolve(RELATIVE_FILE_PATH).toString();
    	 initializeDefaultParameters();
         loadParameters();
    }
    
    private void initializeDefaultParameters() {
        parameters.add(new Parameter(GeneralConstants.DAYS_TO_KEEP_BOOK, GeneralConstants.DEFAULT_MAX_DAYS_TO_KEEP_BOOKS));
        parameters.add(new Parameter(GeneralConstants.MAX_BOOKS_PER_USER, GeneralConstants.DEFAULT_MAX_RENTS_BY_USER));
    }

    public void saveParameters(List<Parameter> newParameters) {
    	for (Parameter newParam : newParameters) {
            for (Parameter existingParam : parameters) {
                if (existingParam.getName().equals(newParam.getName())) {
                    existingParam.setValue(newParam.getValue());
                }
            }
        }
        saveParametersToFile();
    }

    public List<Parameter> getAllParameters() {
        return parameters;
    }

    private void loadParameters() {
        try {
            File file = new File(this.filePath);
            if (file.exists()) {
                parameters = objectMapper.readValue(file, new TypeReference<List<Parameter>>() {});
            } else {
                saveParametersToFile();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void saveParametersToFile() {
        try {
        	File file = new File(filePath);
            file.getParentFile().mkdirs();
            objectMapper.writeValue(file, parameters);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    public int getDaysToKeepBook() {
        return getParameterValue(GeneralConstants.DAYS_TO_KEEP_BOOK);
    }

    public int getMaxBooksPerUser() {
        return getParameterValue(GeneralConstants.MAX_BOOKS_PER_USER);
    }

    private int getParameterValue(String parameterName) {
        for (Parameter parameter : parameters) {
            if (parameter.getName().equals(parameterName)) {
                return parameter.getValue();
            }
        }
        throw new IllegalArgumentException("Parameter not found: " + parameterName);
    }
    
    private Path getProjectRootPath() {
        try {
            return Paths.get(getClass().getClassLoader().getResource("").toURI()).getParent().getParent();
        } catch (URISyntaxException e) {
            throw new RuntimeException("Failed to get project root path", e);
        }
    }
}