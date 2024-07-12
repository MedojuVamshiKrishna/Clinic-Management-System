package com.lms.model;

import java.sql.Date;

import com.lms.enums.Role;

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
public class patients {
	@Id
	@GeneratedValue
	private int id;
	private String name;
	private Date dob;
	private String gender;
	private long phone;

}
