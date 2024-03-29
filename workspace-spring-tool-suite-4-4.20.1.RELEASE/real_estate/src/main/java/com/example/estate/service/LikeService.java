package com.example.estate.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.estate.entity.Likes;
import com.example.estate.repository.LikeRepository;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    public void likeProduct(Likes like) {
        // 여기에 좋아요 추가하는 비즈니스 로직을 구현합니다.
        likeRepository.save(like);
    }
}
