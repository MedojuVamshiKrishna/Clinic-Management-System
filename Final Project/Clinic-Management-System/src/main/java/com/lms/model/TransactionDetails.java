package com.lms.model;

import com.lms.enums.Role;
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
public class TransactionDetails {
	
	private String orderId;
	private String currency;
	private Integer amount;
	private String key;

}
