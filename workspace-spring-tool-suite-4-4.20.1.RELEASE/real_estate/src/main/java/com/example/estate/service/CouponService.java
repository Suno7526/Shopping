package com.example.estate.service;

import java.util.*;
import com.example.estate.entity.Coupon;
import com.example.estate.entity.User;
import com.example.estate.repository.CouponRepository;
import com.example.estate.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class CouponService {

    @Autowired
    private CouponRepository couponRepository;

    @Autowired
    private UserRepository userRepository;
    
    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }

    // 특정 유저의 쿠폰 조회
    public List<Coupon> getCouponsByUser(Long userCode) {
        return couponRepository.findByUserUserCode(userCode);
    }

    public Coupon createCoupon(Coupon coupon) {
        // userCode를 통해 유저 정보 가져오기
        Optional<User> userOptional = userRepository.findById(coupon.getUser().getUserCode());
        if (userOptional.isPresent()) {
            coupon.setUser(userOptional.get());
            return couponRepository.save(coupon);
        } else {
            throw new IllegalArgumentException("유효하지 않은 userCode입니다.");
        }
    }
}
