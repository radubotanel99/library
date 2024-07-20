package com.ssn.practica.model;

public class Parameter {

	private String name;
    private int value;
    
    public Parameter() {
    	
    }
    
	public Parameter(String key, int value) {
		this.name = key;
		this.value = value;
	}
	public String getName() {
		return name;
	}
	public void setname(String name) {
		this.name = name;
	}
	public int getValue() {
		return value;
	}
	public void setValue(int value) {
		this.value = value;
	}
}
