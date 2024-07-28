package com.lms.service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lms.model.PatientsBooking;
import com.lms.model.TransactionDetails;
import com.lms.model.patients;
import com.lms.repository.PatientBookingRepository;
import com.lms.utils.DateUtils;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Service
public class PatientBookingService {
	@Autowired
	private PatientBookingRepository bookingRepo;

	private static final String KEY = "rzp_test_eHDHDWDKWCWYrj";
	private static final String KEY_SECRET = "EDD4CiIRKn1iHhXMAY7j5BU2";
	private static final String CURRENCY = "INR";

	public List<PatientsBooking> getPatientBookings() {
		return bookingRepo.findAll();
	}

	public PatientsBooking createBookings(PatientsBooking booking) {

		return bookingRepo.save(booking);
	}

	public List<PatientsBooking> findByDoctorId(String email) {
		return bookingRepo.findByDoctorId(email);
	}

	public List<Map<String, Object>> getBookingDatesAndTimesByDoctorId(String doctorId) {
		List<Object[]> bookings = bookingRepo.findBookingDatesAndTimesByDoctorId(doctorId);
		return bookings.stream().map(booking -> {
			Map<String, Object> map = new HashMap<>();
			map.put("date", booking[0]);
			map.put("time", booking[1]);
			return map;
		}).collect(Collectors.toList());
	}

	public PatientsBooking updateBooking(PatientsBooking updatedBooking) {
		Optional<PatientsBooking> optionalBooking = bookingRepo.findById(updatedBooking.getId());
		if (optionalBooking.isPresent()) {
			PatientsBooking existingBooking = optionalBooking.get();
			existingBooking.setAge(updatedBooking.getAge());
			existingBooking.setBp(updatedBooking.getBp());
			existingBooking.setDoctor(updatedBooking.getDoctor());
			existingBooking.setDoctorId(updatedBooking.getDoctorId());
			existingBooking.setGender(updatedBooking.getGender());
			existingBooking.setName(updatedBooking.getName());
			existingBooking.setPhone(updatedBooking.getPhone());
			existingBooking.setSpo2(updatedBooking.getSpo2());
			existingBooking.setSymptoms(updatedBooking.getSymptoms());
			existingBooking.setTemperature(updatedBooking.getTemperature());
			existingBooking.setWeight(updatedBooking.getWeight());
			existingBooking.setDate(updatedBooking.getDate());
			existingBooking.setTime(updatedBooking.getTime());
			existingBooking.setAppointed(updatedBooking.isAppointed());
			return bookingRepo.save(existingBooking);
		} else {
			throw new RuntimeException("Booking not found with id: " + updatedBooking.getId());
		}
	}

	public long countBookings() {
		return bookingRepo.countBooking();
	}

	public TransactionDetails createTransaction(Double amount) throws Exception {

		JSONObject jsonObject = new JSONObject();

		jsonObject.put("amount", (amount * 100));
		jsonObject.put("currency", CURRENCY);

		RazorpayClient razorpay = new RazorpayClient(KEY, KEY_SECRET);

		Order orders = razorpay.orders.create(jsonObject);
		System.out.println(orders);
		return prepateTransaction(orders);

	}

	private TransactionDetails prepateTransaction(Order order) {
		String OrderId = order.get("id");
		String currency = order.get("currency");
		Integer amount = order.get("amount");

		TransactionDetails tr = new TransactionDetails(OrderId, currency, amount, KEY);

		return tr;

	}

	public long getAppointedCountsForDates(Date dates) {

		return bookingRepo.countAppointedForDate(dates);
	}
	
	public void deleteHealthRecord(Integer id) {
		bookingRepo.deleteById(id);
	}

}
