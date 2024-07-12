package com.lms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lms.model.Users;
import com.lms.model.patients;
import com.lms.repository.patientRepository;


@Service
public class patientService {
	@Autowired
   private patientRepository patientrepository;
	
	
	public List<patients> getPatients()
	{
		return patientrepository.findAll();
	}
	
	public patients createUser(patients user) {
		
		return patientrepository.save(user);
	}
	
	public patients findpatientbyphone(long phone) {
		return patientrepository.findByPhone(phone);
	}
	
	public long countPatients() {
		return patientrepository.countPatients();
	}
	
}
