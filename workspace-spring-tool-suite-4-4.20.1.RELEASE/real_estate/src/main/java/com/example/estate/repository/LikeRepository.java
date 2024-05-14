package com.example.estate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.estate.entity.Likes;

public interface LikeRepository extends JpaRepository<Likes, Long>{
	List<Likes> findByUserUserCode(Long userCode); // findByUserUserCode 메서드 추가
	
    void deleteByUser_UserCodeAndProduct_ProductCode(Long userCode, Long productCode);

    
<<<<<<< HEAD
}
=======
}
>>>>>>> develop3
