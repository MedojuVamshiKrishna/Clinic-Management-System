package com.lms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lms.model.Availability;
import com.lms.model.Doctor;
import com.lms.repository.AvailabilityRepository;

@Service
public class AvailabilityService {
	
	@Autowired
	private AvailabilityRepository availabilityRepository;
	
	
	public List<Availability> getDoctorsAvailability()
	{
		return availabilityRepository.findAll();
	}
	
	public List<Availability> createDoctoravailability(List<Availability> user) {
		
		return availabilityRepository.saveAll(user);
	}
	

}
