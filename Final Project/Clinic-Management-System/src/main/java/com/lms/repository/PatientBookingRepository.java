package com.lms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;

import com.lms.model.PatientsBooking;

public interface PatientBookingRepository extends JpaRepository<PatientsBooking,Integer>{
	
	 @Query("SELECT pb.date, pb.time FROM PatientsBooking pb WHERE pb.doctorId = :doctorId")
	    List<Object[]> findBookingDatesAndTimesByDoctorId(String doctorId);
	    
	   public List<PatientsBooking> findByDoctorId(String email);
	   
	   @Query("SELECT COUNT(u) FROM PatientsBooking u ")
	   long countBooking();
}
