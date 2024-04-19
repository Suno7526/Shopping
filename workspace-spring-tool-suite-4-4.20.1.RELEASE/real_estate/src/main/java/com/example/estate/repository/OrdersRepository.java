package com.example.estate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.estate.entity.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Long> {

	
}
