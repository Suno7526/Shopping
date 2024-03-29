package com.example.estate.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.estate.entity.Likes;

public interface LikeRepository extends JpaRepository<Likes, Long>{

}
