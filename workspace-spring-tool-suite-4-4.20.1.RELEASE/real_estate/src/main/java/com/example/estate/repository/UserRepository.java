package com.example.estate.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.estate.entity.Product;
import com.example.estate.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
	User findByEmail(String email);
	User findByUserCode(Long UserCode);

}
