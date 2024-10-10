package com.example.estate.repository;

import com.example.estate.entity.ChatMessage;
import com.example.estate.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByChatRoom(ChatRoom chatRoom); // ChatRoom 객체로 조회
}
