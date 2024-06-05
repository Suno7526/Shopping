package com.example.estate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.estate.entity.Reply;

public interface ReplyRepository extends JpaRepository<Reply, Long>{
	List<Reply> findByQuestionQuestionCode(Long questionCode);
}
