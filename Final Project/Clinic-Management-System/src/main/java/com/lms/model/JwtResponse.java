package com.lms.model;

import com.lms.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Builder
@Getter
@Setter
@NoArgsConstructor  
@AllArgsConstructor  
@ToString  
public class JwtResponse {
	private String jwtToken;
	private String username;
	private String name;
	private Role role;
}
