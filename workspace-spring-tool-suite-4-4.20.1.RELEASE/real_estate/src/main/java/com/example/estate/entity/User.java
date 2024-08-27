package com.example.estate.entity;

import java.sql.Timestamp;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userCode;

    @Column(nullable = false, length = 45)
    private String email;

    @Column(nullable = false, length = 100)
    private String password;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = false, length = 50)
    private String phoneNumber;

    @Column(nullable = false, length = 300)
    private String address;

    @Column(nullable = false, length = 50)
    private String birth;
    
    @Column(nullable = false, columnDefinition = "int default 0")
    private int userPoint;
    
    @Column(length = 50, columnDefinition = "String default BRONZE")
    private String userGrade;
    
    @Enumerated(EnumType.STRING)
    private RoleType role = RoleType.USER; // 기본 값을 USER로 설정

    @CreationTimestamp
    private Timestamp createDate;
    
}

