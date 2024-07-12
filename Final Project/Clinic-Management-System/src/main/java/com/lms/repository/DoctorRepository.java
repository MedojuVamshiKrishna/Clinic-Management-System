package com.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.model.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
   public Doctor findByEmail(String email);
}
