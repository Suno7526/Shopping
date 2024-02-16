package com.example.estate.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.estate.entity.User;
import com.example.estate.service.UserService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@AllArgsConstructor
public class UserController {
	
	@Autowired
	private UserService userService;

	@CrossOrigin 
	@PostMapping("/user") 
	public ResponseEntity<?> save(@RequestBody User user){
		return new ResponseEntity<>(userService.save(user), HttpStatus.CREATED);
	}
	
	@CrossOrigin 
	@GetMapping("/user") 
	public ResponseEntity<?> findAll() { 
		return new ResponseEntity<>(userService.findAll(), HttpStatus.OK); 
	} 
}
