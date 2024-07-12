package com.lms.model;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
public class Doctor {

	@Id
	@GeneratedValue
	private int id;
	private String name;
	private String email;
	private String specialisation;
	
	@OneToMany(mappedBy="doctor",cascade=CascadeType.ALL)
	@JsonManagedReference
	private List<Availability> availList;
	
}
