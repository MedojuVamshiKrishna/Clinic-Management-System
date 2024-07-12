package com.lms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lms.model.Doctor;
import com.lms.repository.DoctorRepository;

@Service
public class DoctorService {

	@Autowired
	private DoctorRepository doctorRepositoy;

	public List<Doctor> getDoctors() {
		return doctorRepositoy.findAll();
	}

	public Doctor createDoctor(Doctor user) {

		return doctorRepositoy.save(user);
	}

	public Doctor findDoctorById(int id) {
		return doctorRepositoy.findById(id).orElse(null);
	}
	public Doctor findDoctorById(String email) {
		return doctorRepositoy.findByEmail(email);
	}

	public Doctor findDoctorbyEmail(String email) {
		return doctorRepositoy.findByEmail(email);
	}

}
