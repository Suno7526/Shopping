package com.example.estate.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.estate.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long>{

}
