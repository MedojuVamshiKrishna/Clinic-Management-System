package com.lms.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lms.model.Availability;
import com.lms.model.Doctor;
import com.lms.model.PatientsBooking;
import com.lms.model.Users;
import com.lms.service.AvailabilityService;
import com.lms.service.DoctorService;
import com.lms.service.PatientBookingService;

import ch.qos.logback.core.net.SyslogOutputStream;

@RestController
@CrossOrigin
@RequestMapping("/doctors")
public class DoctorsController {
	
	@Autowired
	private DoctorService doctorService;
	
	@Autowired
	private AvailabilityService availabilityService;
	
	@Autowired
	private PatientBookingService patientBookingService;
	
	@GetMapping("/welcome")
	public String welcome()
	{
		return "welcome to doctor application";
	}
	@PostMapping("/create-doctor")
    public Doctor createUser(@RequestBody Doctor doctor) {
    	return doctorService.createDoctor(doctor);
    }
	
	@PostMapping("/create-doctor-availability")
    public List<Availability> createdoctoravailability(@RequestBody List<Availability> doctor) {
    	return availabilityService.createDoctoravailability(doctor);
    }
	@GetMapping("/doctors")
	public List<Doctor> getDoctors()
	{
		return doctorService.getDoctors();
	}
	@GetMapping("/availabilities")
    public List<Availability> getDoctorAvailabilities(@RequestParam int id) {
        Doctor doctor = doctorService.findDoctorById(id);
        if (doctor != null) {
            return doctor.getAvailList();
        } else {
            return new ArrayList<>();
        }
    }
	
	
	@GetMapping("/doctorByEmail")
	public Doctor getDoctorByEmail(@RequestParam String email) {
		
		return doctorService.findDoctorbyEmail(email);
		
	}
	
	@GetMapping("/patientsByDoctor")
	public List<PatientsBooking> getPatientsByDoctor(@RequestParam String email) {
		
		return patientBookingService.findByDoctorId(email);
		
	}
	
	@PutMapping("/updatebooking")
	public PatientsBooking updatePatientBooking(@RequestBody PatientsBooking booking) {
		return patientBookingService.updateBooking(booking);
	}
	


}
