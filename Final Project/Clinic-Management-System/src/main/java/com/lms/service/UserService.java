package com.lms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lms.enums.Role;
import com.lms.model.Users;
import com.lms.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private UserRepository userepository;
	public List<Users> getUsers()
	{
		return userepository.findAll();
	}
	
	
	public Users createUser(Users user) {
		user.setEmail(user.getEmail());
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userepository.save(user);
	}
	
	public Role getRoleByEmail(String email) {
	     Users user = userepository.findByEmail(email);
	     return (user!=null)?user.getRole():null;
}
	public String getNamebyEmail(String email) {
		 Users user = userepository.findByEmail(email);
		 return (user!=null)?user.getName():null;
	}
	public Users getUsersbyemail(String email)
	{
		return userepository.findByEmail(email);
	}
	
	public long countDoctors() {
        return userepository.countDoctors();
    }

    public long countStaff() {
        return userepository.countStaff();
    }
	
	
	
	
	
}
