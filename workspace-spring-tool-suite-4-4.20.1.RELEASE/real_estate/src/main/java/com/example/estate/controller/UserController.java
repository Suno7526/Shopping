package com.example.estate.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    
    @PutMapping("/updateUser/{userCode}")
    public ResponseEntity<String> updateUser(@PathVariable("userCode") Long userCode, @RequestBody Map<String, String> updates) {
        User user = userService.findByUserCode(userCode);
        if (user == null) {
            return new ResponseEntity<>("사용자를 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        }

        if (updates.containsKey("email")) {
            user.setEmail(updates.get("email"));
        }
        if (updates.containsKey("password")) {
            user.setPassword(updates.get("password"));
        }
        if (updates.containsKey("phoneNumber")) {
            user.setPhoneNumber(updates.get("phoneNumber"));
        }
        if (updates.containsKey("address")) {
            user.setAddress(updates.get("address"));
        }

        userService.saveUser(user);
        return new ResponseEntity<>("사용자 정보가 업데이트되었습니다.", HttpStatus.OK);
    }

    
}
