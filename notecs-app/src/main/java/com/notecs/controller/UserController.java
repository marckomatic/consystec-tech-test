package com.notecs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.notecs.entity.User;
import com.notecs.repository.UserRepository;

@RestController
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@PostMapping("/users")
	public ResponseEntity<?> createUser(@RequestBody User user) {
		try {
			String encriptedPassword = passwordEncoder.encode(user.getPassword());
			user.setPassword(encriptedPassword);
			userRepository.save(user);
	        return ResponseEntity.status(HttpStatus.CREATED).body(user);
		}catch(DataIntegrityViolationException ex) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("El correo ya esta siendo utilizado.");
		}catch (Exception e) {
			return ResponseEntity.internalServerError().build();
		}

	}
}
