package com.example.estate.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.estate.entity.Question;
import com.example.estate.repository.QuestionRepository;

@Service
public class QuestionService {

	@Autowired
	private QuestionRepository questionRepository;

	public void addQuestion(Question question) {
		questionRepository.save(question);
	}
	
	public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }
	
	public List<Question> getQuestionsByUserCode(Long userCode) {
        return questionRepository.findByUserUserCode(userCode);
    }
	
	public Question getQuestionByQuestionCode(Long questionCode) {
	    return questionRepository.findById(questionCode).orElse(null);
	}

}
