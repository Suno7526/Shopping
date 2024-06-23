package com.example.estate.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
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
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewCode;
    
    @ManyToOne
    @JoinColumn(name = "userCode")
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "productCode")
    private Product product;
    
    @ElementCollection
    @Column(nullable = false, columnDefinition = "LONGBLOB")
    private List<byte[]> productImages; // 이 부분을 배열로 설정
    
    @Column
    private String reviewContent;
    
    
    @Column
    private int reviewPoint;
}
