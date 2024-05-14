package com.example.estate.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.estate.entity.Likes;
import com.example.estate.entity.Reply;

public interface ReplyRepository extends JpaRepository<Reply, Long>{

}
