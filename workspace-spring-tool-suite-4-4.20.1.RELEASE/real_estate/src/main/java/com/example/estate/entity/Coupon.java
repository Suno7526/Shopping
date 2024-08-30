package com.example.estate.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.util.Base64;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Coupon {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long couponCode;
	
	@ManyToOne
    @JoinColumn(name = "userCode")
    private User user;
	
	// 쿠폰 코드
    @Column(nullable = false, unique = true)
    private String serialCode;

    // 할인 금액 또는 할인 비율
    @Column(nullable = false)
    private int discountAmount;

    // 쿠폰 발행 날짜
    @Column(nullable = false)
    private LocalDate issueDate;

    // 쿠폰 만료 날짜
    @Column(nullable = false)
    private LocalDate expiryDate;

    // 최소 구매 금액
    @Column(nullable = false, columnDefinition = "int default 0")
    private int minPurchaseAmount;

    // 사용된 쿠폰 여부
    @Column(nullable = false)
    private boolean used;

    @PrePersist
    public void generateSerialCode() {
        if (this.serialCode == null || this.serialCode.isEmpty()) {
            this.serialCode = generateRandomSerialCode();
        }
    }

    private String generateRandomSerialCode() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[8];
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
	