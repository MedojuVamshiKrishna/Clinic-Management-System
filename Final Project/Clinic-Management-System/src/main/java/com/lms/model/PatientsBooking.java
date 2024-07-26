package com.lms.model;

import java.sql.Date;
import java.sql.Time;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor  
@AllArgsConstructor  
@ToString 
@Entity
public class PatientsBooking {
	@Id
	@GeneratedValue
	private int id;
	private int age;
	private int bp;
	private String doctor;
	private String doctorId;
	private String gender;
	private String name;
	private long phone;
	private int spo2;
	private String symptoms;
	private float temperature;
	private int weight;
	private Date date;
	private Time time;
	private boolean appointed;
	private String transactionId;
	private String paymentType;

}
