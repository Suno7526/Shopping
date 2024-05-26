package com.example.estate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.estate.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByUserUserCode(Long userCode);
}
