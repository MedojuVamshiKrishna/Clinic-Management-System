package com.lms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.model.Users;

public interface UserRepository extends JpaRepository<Users, String>{
	
  public Optional<Users> findByEmail(String email);

}
