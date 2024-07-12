package com.lms.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lms.model.Users;

public interface UserRepository extends JpaRepository<Users, String>{
	
  public Users findByEmail(String email);
  
  @Query("SELECT COUNT(u) FROM Users u WHERE u.role = 'DOCTOR'")
  long countDoctors();

  @Query("SELECT COUNT(u) FROM Users u WHERE u.role = 'STAFF'")
  long countStaff();

}
