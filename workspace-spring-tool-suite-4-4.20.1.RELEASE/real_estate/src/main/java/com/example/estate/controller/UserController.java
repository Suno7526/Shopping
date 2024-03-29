package com.example.estate.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

    @PostMapping("/saveUser")
    public ResponseEntity<String> saveUser(@RequestBody User user){
        userService.saveUser(user);
        return new ResponseEntity<>("회원가입 성공", HttpStatus.OK);
    }
        
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        // Call a service method to check if the provided credentials are valid
        User loggedInUser = userService.login(user.getEmail(), user.getPassword());

        if (loggedInUser != null) {
            return new ResponseEntity<>(loggedInUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }    
    
    @PostMapping("/getUserCodeByEmail")
    public ResponseEntity<Long> getUserCodeByEmail(@RequestBody String email) {
        User user = userService.findByEmail(email);
        if (user != null) {
            return new ResponseEntity<>(user.getUserCode(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    
}
