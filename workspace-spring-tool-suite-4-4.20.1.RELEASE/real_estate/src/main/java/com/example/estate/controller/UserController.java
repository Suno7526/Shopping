package com.example.estate.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.estate.entity.User;
import com.example.estate.service.UserService;

import jakarta.servlet.http.HttpSession;
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
    
    @GetMapping("/getUser/{userCode}")
    public ResponseEntity<User> getUserDetails(@PathVariable("userCode") Long userCode) {
            User user = userService.findByUserCode(userCode);
            return new ResponseEntity<>(user, HttpStatus.OK);
    }
    
    
    
}
