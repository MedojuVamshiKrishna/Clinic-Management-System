package com.lms.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.lms.model.Users;
import com.lms.service.UserService;

@RestController
@RequestMapping("/home")
public class BankController {
	Logger logger = LoggerFactory.getLogger(BankController.class);
	@Autowired
	private UserService userService;
	@GetMapping("/welcome")
	public String welcome()
	{
		return "welcome to our application";
	}
	@GetMapping("/users")
	public List<Users> getUsers()
	{
		return userService.getUsers();
	}
	
	
	
	
	

}
