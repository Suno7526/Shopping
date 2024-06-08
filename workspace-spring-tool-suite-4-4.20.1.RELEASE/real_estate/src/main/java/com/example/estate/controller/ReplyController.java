package com.example.estate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.estate.entity.Reply;
import com.example.estate.service.ReplyService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ReplyController {

	@Autowired
	private ReplyService replyService;

	@PostMapping("/replies")
	public ResponseEntity<Void> addReply(@RequestBody Reply reply) {
		replyService.addReply(reply);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@GetMapping("/replies/{questionCode}")
	public ResponseEntity<List<Reply>> getRepliesByQuestionCode(@PathVariable("questionCode") Long questionCode) {
		List<Reply> replies = replyService.getRepliesByQuestionCode(questionCode);
		return new ResponseEntity<>(replies, HttpStatus.OK);

	}
}
