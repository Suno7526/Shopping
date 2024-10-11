package com.example.estate.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Getter
@NoArgsConstructor
@Entity
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "roomId")
    private ChatRoom chatRoom;

    @ManyToOne
    @JoinColumn(name = "userCode") // User 엔티티의 primary key와 연결
    private User user;

    @Column
    private String message;

    @CreationTimestamp
    private Timestamp timestamp;

    public ChatMessage(ChatRoom chatRoom, User user, String message) {
        this.chatRoom = chatRoom;
        this.user = user; // User 객체로 변경
        this.message = message;
    }
}
