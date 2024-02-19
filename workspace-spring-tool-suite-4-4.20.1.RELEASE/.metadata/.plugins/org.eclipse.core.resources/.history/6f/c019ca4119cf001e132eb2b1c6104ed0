package com.example.estate.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.estate.entity.User;
import com.example.estate.repository.UserRepository;


@Service
public class UserService {
	
	@Autowired
    UserRepository userRepository;
    
	@Transactional 
	public User save(User user) { 
		return userRepository.save(user); 
	} 
	
	
	@Transactional(readOnly = true) 
	public List<User> findAll() { 
		return userRepository.findAll(); 
	} 

	
	
}