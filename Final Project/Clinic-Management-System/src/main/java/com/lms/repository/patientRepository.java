package com.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lms.model.patients;

public interface patientRepository extends JpaRepository<patients,Integer> {
	
	public patients findByPhone(long Phone);
	
	 @Query("SELECT COUNT(u) FROM patients u ")
	   long countPatients();

}
