package com.example.estate.entity;

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
    
    @Column(columnDefinition = "LONGBLOB")
    private byte[] productImage;
    
    @Column
    private String reviewContent;
    
    @Column
    private int reviewPoint;
}
