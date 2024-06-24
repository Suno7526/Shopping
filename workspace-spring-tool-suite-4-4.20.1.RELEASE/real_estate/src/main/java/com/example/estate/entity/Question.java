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
public class Question {

	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long questionCode;
	
	@ManyToOne
	@JoinColumn(name = "userCode")
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "orderCode")
	private Orders order;
	
	
	@Column
	private String questionTitle; // 문의사항 제목
	
	@Column
    private String questionContent; // 내용
	
	@Column
    private String questionType; // 문의 종류

	
	@CreationTimestamp
	private Timestamp registerDate; // 등록일자
	
}
