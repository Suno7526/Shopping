package com.example.estate.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.estate.entity.Coupon;
import com.example.estate.service.CouponService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CouponCotroller {
	
	@Autowired
	private CouponService couponService;
	
	@PostMapping("/saveCoupon")
    public Coupon createCoupon(@RequestBody Coupon coupon) {
        return couponService.createCoupon(coupon);
    }

	@GetMapping("/getCoupons")
    public ResponseEntity<List<Coupon>> getAllCoupons() {
        List<Coupon> coupons = couponService.getAllCoupons();
        return new ResponseEntity<>(coupons, HttpStatus.OK);
    }

    // 특정 유저의 쿠폰 조회
    @GetMapping("/CouponUser/{userCode}")
    public ResponseEntity<List<Coupon>> getCouponsByUser(@PathVariable("userCode") Long userCode) {
        List<Coupon> coupons = couponService.getCouponsByUser(userCode);
        return new ResponseEntity<>(coupons, HttpStatus.OK);
    }
}
