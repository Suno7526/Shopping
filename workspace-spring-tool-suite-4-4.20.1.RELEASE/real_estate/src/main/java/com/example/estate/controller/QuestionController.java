package com.example.estate.controller;

import java.util.List;
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

import com.example.estate.entity.Question;
import com.example.estate.entity.User;
import com.example.estate.service.QuestionService;

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
	@GetMapping("/questions/{userCode}")
    public ResponseEntity<List<Question>> getQuestionsByUserCode(@PathVariable("userCode") Long userCode) {
        List<Question> questions = questionService.getQuestionsByUserCode(userCode);
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }
	
	@GetMapping("/questions/questionCode/{questionCode}")
	public ResponseEntity<Question> getQuestionByQuestionCode(@PathVariable("questionCode") Long questionCode) {
	    Question question = questionService.getQuestionByQuestionCode(questionCode);
	    if (question != null) {
	        return new ResponseEntity<>(question, HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	}

}
