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
	
	@Column
	private String questionTitle;
	
	@Column
    private String questionCotent;
	
	@CreationTimestamp
	private Timestamp qestionDate;

	public Long getQuestionCode() {
		return questionCode;
	}

	public void setQuestionCode(Long questionCode) {
		this.questionCode = questionCode;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}


	public String getQuestionTitle() {
		return questionTitle;
	}

	public void setQuestionTitle(String questionTitle) {
		this.questionTitle = questionTitle;
	}

	public String getQuestionCotent() {
		return questionCotent;
	}

	public void setQuestionCotent(String questionCotent) {
		this.questionCotent = questionCotent;
	}

	public Timestamp getQestionDate() {
		return qestionDate;
	}

	public void setQestionDate(Timestamp qestionDate) {
		this.qestionDate = qestionDate;
	}
	
	@CreationTimestamp
	private Timestamp registerDate;
	
}