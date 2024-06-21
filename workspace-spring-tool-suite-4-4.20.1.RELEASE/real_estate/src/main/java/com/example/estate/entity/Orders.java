package com.example.estate.entity;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderCode;

    @ManyToOne
    @JoinColumn(name = "userCode")
    private User user;

    @ManyToOne
    @JoinColumn(name = "productCode")
    private Product product;

    @Column
    private String shippingAddress; // 배송 주소

    @Column
    private String orderStatus; // 주문 상태

    @Column
    private String refundReason; // 환불 사유
    
    @Column
    private String request; // 요청 사항
    
    @Column
    private String productSize; // 사이즈
    
    @Column
    private String productColor; // 색상
    
    @Column
    private int orderCount; // 주문 수량
    
    @Column
    private boolean reviewCheck; // 리뷰 등록 여부

    @CreationTimestamp
    private Timestamp orderDate; // 등록일

}
