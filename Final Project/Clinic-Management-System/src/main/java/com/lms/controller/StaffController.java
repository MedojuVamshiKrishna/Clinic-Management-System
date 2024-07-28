package com.lms.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.lms.model.Availability;
import com.lms.model.Doctor;
import com.lms.model.PatientsBooking;
import com.lms.model.TransactionDetails;
import com.lms.model.Users;
import com.lms.model.patients;
import com.lms.service.DoctorService;
import com.lms.service.PatientBookingService;
import com.lms.service.patientService;


@RestController
@CrossOrigin
@RequestMapping("/staff")
public class StaffController {
	
	@Autowired
	private patientService patientservice;
	@Autowired
	private DoctorService doctorService;
	
	@Autowired
	private PatientBookingService bookingService;
	
	@GetMapping("/welcome")
	public String welcome()
	{
		return "welcome to staff application";
	}
	
	@PostMapping("/create-patient")
    public patients createUser(@RequestBody patients patient) {
    	return patientservice.createUser(patient);
    }
	
	@GetMapping("/patients")
	public List<patients> getUsers()
	{
		return patientservice.getPatients();
	}
	
	@GetMapping("/patientsbyphone")
	public patients getpatientByphone(@RequestParam long phone)
	{
		return patientservice.findpatientbyphone(phone);
	}
	@GetMapping("/doctors")
	public List<Doctor> getdoctors()
	{
		return doctorService.getDoctors();
	}
	
	@GetMapping("/availabilities")
    public List<Availability> getDoctorAvailabilities(@RequestParam String email) {
        Doctor doctor = doctorService.findDoctorbyEmail(email);
        if (doctor != null) {
            return doctor.getAvailList();
        } else {
            return new ArrayList<>();
        }
    }
	
	@PostMapping("/create-booking")
    public PatientsBooking createBooking(@RequestBody PatientsBooking  booking) {
    	return bookingService.createBookings(booking);
    }
	
	@GetMapping("/bookings")
	public List<Map<String, Object>> getBookings(@RequestParam String doctorId) {
        return bookingService.getBookingDatesAndTimesByDoctorId(doctorId);
    }
	
	@GetMapping("/allBookings")
	public List<PatientsBooking> getAllBookings(){
		return bookingService.getPatientBookings();
	}
	
	@GetMapping("/createTransaction/{amount}")
	public TransactionDetails createTranstaction(@PathVariable(name ="amount") Double amount) throws Exception {
		return bookingService.createTransaction(amount);
	}
	
	@DeleteMapping("/deleteRecord")
	public String DeleteHealthRecord(@RequestParam int id) {
		bookingService.deleteHealthRecord(id);
		return "record deleted successfully";
	}
	
	
	

}
