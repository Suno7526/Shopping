package com.example.estate.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.estate.entity.Orders;
import com.example.estate.entity.Product;
import com.example.estate.entity.Question;
import com.example.estate.entity.User;
import com.example.estate.service.QuestionService;

import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class QuestionController {

	@Autowired
	private QuestionService questionService;
	
	@PostMapping("/questions")
    public void ordersProduct(@RequestBody Map<String, Object> requestData) {
		Long userCode = Long.valueOf((String) requestData.get("userCode"));
        String questionTitle = (String) requestData.get("questionTitle");
        String questionContent = (String) requestData.get("questionContent");
        String questionType = (String) requestData.get("questionType");

        Question que = new Question();
        User user = new User();
        user.setUserCode(userCode);
        que.setUser(user);
        que.setQuestionTitle(questionTitle);
        que.setQuestionContent(questionContent);
        que.setQuestionType(questionType);
        questionService.addQuestion(que);
    }
	
	@GetMapping("/questions")
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = questionService.getAllQuestions();
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }
}
