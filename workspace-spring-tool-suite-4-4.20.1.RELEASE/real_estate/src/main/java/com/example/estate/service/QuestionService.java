package com.example.estate.service;

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
}
