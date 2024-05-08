package com.example.estate.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.estate.entity.Question;
import com.example.estate.entity.User;
import com.example.estate.service.QuestionService;

import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/questions")
public class QuestionController {

	@Autowired
	private QuestionService questionService;

	@PostMapping
	public ResponseEntity<String> addQuestion(@RequestBody Question question, HttpSession session) {
		Long userCode = (Long) session.getAttribute("userCode");
		
		Question que = new Question();
		User user = new User();
		user.setUserCode(userCode);
		que.setUser(user);
		

		questionService.addQuestion(question);
		return new ResponseEntity<>("문의가 성공적으로 등록되었습니다.", HttpStatus.CREATED);
	}
}
