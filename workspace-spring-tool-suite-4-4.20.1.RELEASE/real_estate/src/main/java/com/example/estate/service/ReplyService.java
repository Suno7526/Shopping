package com.example.estate.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.estate.entity.Reply;
import com.example.estate.repository.ReplyRepository;

@Service
public class ReplyService {

	@Autowired
    private ReplyRepository replyRepository;
	
	public void addReply(Reply reply) {
        replyRepository.save(reply);
    }

    public List<Reply> getRepliesByQuestionCode(Long questionCode) {
        return replyRepository.findByQuestionQuestionCode(questionCode);
    }
	
}
