package com.example.estate.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.estate.entity.Cart;
import com.example.estate.entity.Likes;
import com.example.estate.repository.LikeRepository;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    public void likeProduct(Likes like) {
        likeRepository.save(like);
    }
    @Transactional(readOnly = true)
    public List<Likes> findByUserCode(Long userCode) {
        return likeRepository.findByUserUserCode(userCode);
    }

    @Transactional
    public void unlikeProduct(Long userCode, Long productCode) {
        likeRepository.deleteByUser_UserCodeAndProduct_ProductCode(userCode, productCode);
    }
}
