package com.example.estate.entity;

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
public class QuestionComment {

	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long questionCommentCode;
	
	@ManyToOne
	@JoinColumn(name = "userCode")
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "questionCode")
	private Question question;
	
    private String questionComments;

	public Long getQuestionCommentCode() {
		return questionCommentCode;
	}

	public void setQuestionCommentCode(Long questionCommentCode) {
		this.questionCommentCode = questionCommentCode;
	}



	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}

	public String getQuestionComments() {
		return questionComments;
	}

	public void setQuestionComments(String questionComments) {
		this.questionComments = questionComments;
	}	
	
    
    
}