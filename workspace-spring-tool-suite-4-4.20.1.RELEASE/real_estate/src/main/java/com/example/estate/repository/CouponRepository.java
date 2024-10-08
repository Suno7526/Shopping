package com.example.estate.repository;

import java.util.*;

import com.example.estate.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long>, JpaSpecificationExecutor<Coupon> {

	List<Coupon> findByUserUserCode(Long userCode);

}
