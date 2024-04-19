package com.example.estate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.estate.entity.Cart;
import com.example.estate.entity.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
	List<Orders> findByUserUserCode(Long userCode); // findByUserUserCode 메서드 추가

	
}
