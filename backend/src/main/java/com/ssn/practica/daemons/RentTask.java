package com.ssn.practica.daemons;

import com.ssn.practica.dao.RentDAO;

public class RentTask implements Runnable  {
	
	private RentDAO rentDAO = new RentDAO();

	@Override
	public void run() {
		rentDAO.rentDaemon();
	}
}
