package com.example.estate.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

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

    @Column(length = 50)
    private String userGrade = "BRONZE"; // Java에서 기본값 설정

    @Enumerated(EnumType.STRING)
    private RoleType role = RoleType.USER; // 기본 값을 USER로 설정

    @CreationTimestamp
    private Timestamp createDate;

    @PrePersist
    public void prePersist() {
        if (this.userGrade == null) {
            this.userGrade = "BRONZE";
        }
    }
}
