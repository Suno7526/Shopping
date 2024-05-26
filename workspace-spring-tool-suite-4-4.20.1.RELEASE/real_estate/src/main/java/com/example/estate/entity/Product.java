package com.example.estate.entity;

import java.sql.Timestamp;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productCode;
    
    @ManyToOne
    @JoinColumn(name = "orderCode")
    private Orders orders;    

    @Column(nullable = false)
    private String productName;

    @Column
    private int productPrice;
    
    @Column
    private String deliveryStatus;

    @Column(nullable = false)
    private String information;

    @Column
    private int productStuck;
    
    @Column
    private String companyName;
    
    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean soldout;

    
    @Column
    private String category;
    
    @Column(nullable = false, columnDefinition = "int default 0")
    private int viewCount;

    @Column(columnDefinition = "LONGBLOB")
    private byte[] productImage;
    
    @Column
    private String productSize;
    
    @Column(nullable = false, columnDefinition = "float default 0")
    private float userPoint;

    @CreationTimestamp
    private Timestamp registerDate;

}
