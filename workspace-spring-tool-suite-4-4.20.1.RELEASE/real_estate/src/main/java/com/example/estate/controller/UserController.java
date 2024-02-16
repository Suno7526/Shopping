package com.example.estate.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.estate.entity.User;
import com.example.estate.service.UserService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@AllArgsConstructor
public class UserController {
	private UserService userService;

	/*
	 * @GetMapping("/test") public List<User> getUserList() { return
	 * userService.getUserList(); }
	 */
}
