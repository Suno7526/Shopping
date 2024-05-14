package com.example.estate.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.estate.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Long>{

}
