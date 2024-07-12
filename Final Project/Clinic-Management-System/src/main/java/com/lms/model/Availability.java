package com.lms.model;

import java.sql.Date;
import java.sql.Time;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
public class Availability {
	@Id
	@GeneratedValue
	private int availId;
	private Date date;
	private Time reportingTime;
	private Time departureTime;
	
	@ManyToOne
	@JoinColumn(name="doctor_id")
	@JsonBackReference
	private Doctor doctor;
	
	

}
