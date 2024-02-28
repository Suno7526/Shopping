package com.example.estate.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.estate.dto.UserDTO;
import com.example.estate.entity.User;
import com.example.estate.repository.UserRepository;


@Service
public class UserService {
	
	@Autowired
    UserRepository userRepository;
    
	 @Transactional
	 public void saveUser(UserDTO userDTO) {
	     User user = new User();
	     user.setEmail(userDTO.getEmail());
	     user.setPassword(userDTO.getPassword());
	     user.setName(userDTO.getName());
	     user.setPhoneNumber(userDTO.getPhoneNumber());
	     user.setAddress(userDTO.getAddress());
	     user.setBirth(userDTO.getBirth());

	     userRepository.save(user);
	 }

	
	
}