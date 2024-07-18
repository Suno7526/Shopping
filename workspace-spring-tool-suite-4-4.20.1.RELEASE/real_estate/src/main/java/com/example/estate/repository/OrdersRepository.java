package com.example.estate.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.estate.entity.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Long>, JpaSpecificationExecutor<Orders> {
	List<Orders> findByUserUserCode(Long userCode); // findByUserUserCode 메서드 추가

	Orders findFirstByUser_UserCodeAndProduct_ProductCode(Long userCode, Long productCode);

	Orders findByOrderCode(Long orderCode);
	
	List<Orders> findByRefundStateNot(String refundState);
	
}
