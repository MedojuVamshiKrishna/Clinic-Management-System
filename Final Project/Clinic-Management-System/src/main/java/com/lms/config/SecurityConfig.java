package com.lms.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.lms.security.JwtAuthenticationEntryPoint;
import com.lms.security.JwtAuthenticationFilter;
import com.lms.service.UserDetailService;

@Configuration
//@EnableWebSecurity
public class SecurityConfig {
		@Autowired
	    private JwtAuthenticationEntryPoint point;
		@Autowired
	    private JwtAuthenticationFilter filter;
	    
	    @Autowired
	    private UserDetailService userDetailService;
	    
	    @Autowired
	    private PasswordEncoder passwordEncoder;
	   

	    @Bean
	    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

	        http
	        	   .csrf(csrf -> csrf.disable())
	               .authorizeHttpRequests(auth-> auth
	               .requestMatchers("/auth/**").permitAll()
	               .requestMatchers("/admin/**").hasAnyAuthority("ADMIN")
	               .requestMatchers("/doctors/**").hasAnyAuthority("DOCTOR")
	               .requestMatchers("/staff/**").hasAnyAuthority("STAFF")
	               .anyRequest().authenticated())
//	               .exceptionHandling(ex-> ex.authenticationEntryPoint(point))
	               .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	               ;
	        
	        http.addFilterBefore(filter,UsernamePasswordAuthenticationFilter.class);
	        return http.build();
	        }
	    
	    
	    @Bean
	    public DaoAuthenticationProvider doDaoAuthenticationProvider()
	    {
	    	DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
	    	provider.setUserDetailsService(userDetailService);
	    	provider.setPasswordEncoder(passwordEncoder);
	    	return provider;
	    }
	    }
	
	   
	    
	


