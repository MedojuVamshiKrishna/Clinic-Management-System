package com.lms.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.lms.model.PatientsBooking;
import com.lms.model.Users;
import com.lms.service.PatientBookingService;
import com.lms.service.UserService;
import com.lms.service.patientService;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {
//	Logger logger = LoggerFactory.getLogger(ClinicController.class);
	@Autowired
	private UserService userService;
	@Autowired
	private PatientBookingService bookingService;
	@Autowired
	private patientService patientSerive;
	
	@GetMapping("/welcome")
	public String welcome()
	{
		return "welcome to Admin application";
	}
	
	
	@GetMapping("/doctorsCount")
	public long getDoctorsCount() {
		return userService.countDoctors();
	}
	@GetMapping("/staffCount")
	public long getStaffCount() {
		return userService.countStaff();
	}
	
	@GetMapping("/bookingCount")
	public long getBookingCount() {
		return bookingService.countBookings();
	}
	
	@GetMapping("/patientCount")
	public long getPatientCount() {
		return patientSerive.countPatients();
	}
	
	@GetMapping("/allBookings")
	public List<PatientsBooking> getAllBookings(){
		return bookingService.getPatientBookings();
	}
	
	
	
	

}
