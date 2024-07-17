package com.example.estate.service;

import java.util.*;
import com.example.estate.entity.Coupon;
import com.example.estate.entity.User;
import com.example.estate.repository.CouponRepository;
import com.example.estate.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;
import Search.CouponSpecifications;

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
    
    @Transactional
    public Coupon updateCoupon(Long couponCode, Coupon updatedCoupon) {
        return couponRepository.findById(couponCode).map(coupon -> {
            coupon.setSerialCode(updatedCoupon.getSerialCode());
            coupon.setDiscountAmount(updatedCoupon.getDiscountAmount());
            coupon.setIssueDate(updatedCoupon.getIssueDate());
            coupon.setExpiryDate(updatedCoupon.getExpiryDate());
            coupon.setMinPurchaseAmount(updatedCoupon.getMinPurchaseAmount());
            coupon.setUsed(updatedCoupon.isUsed());
            return couponRepository.save(coupon);
        }).orElseThrow(() -> new RuntimeException("Coupon not found"));
    }

    @Transactional(readOnly = true)
    public List<Coupon> searchCoupons(Long couponCode, String serialCode, Integer discountAmount, LocalDate issueDate,
                                      LocalDate expiryDate, Integer minPurchaseAmount, Boolean used) {
        Specification<Coupon> spec = Specification.where(null);

        if (couponCode != null) {
            spec = spec.and(CouponSpecifications.hasCouponCode(couponCode));
        }
        if (serialCode != null) {
            spec = spec.and(CouponSpecifications.hasSerialCode(serialCode));
        }
        if (discountAmount != null) {
            spec = spec.and(CouponSpecifications.hasDiscountAmount(discountAmount));
        }
        if (issueDate != null) {
            spec = spec.and(CouponSpecifications.hasIssueDate(issueDate));
        }
        if (expiryDate != null) {
            spec = spec.and(CouponSpecifications.hasExpiryDate(expiryDate));
        }
        if (minPurchaseAmount != null) {
            spec = spec.and(CouponSpecifications.hasMinPurchaseAmount(minPurchaseAmount));
        }
        if (used != null) {
            spec = spec.and(CouponSpecifications.isUsed(used));
        }

        return couponRepository.findAll(spec);
    }
    
}
