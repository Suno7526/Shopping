package com.example.estate.webSocket;

import com.example.estate.entity.ChatMessage;
import com.example.estate.entity.ChatRoom;
import com.example.estate.repository.ChatMessageRepository;
import com.example.estate.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomRepository chatRoomRepository;

    // 특정 채팅방의 메시지를 가져옴
    public List<ChatMessage> getChatMessages(Long roomId) {
        ChatRoom chatRoom = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Chat room not found"));
        return chatMessageRepository.findByChatRoom(chatRoom);
    }

    // 메시지를 저장
    public ChatMessage saveMessage(ChatMessage chatMessage) {
        return chatMessageRepository.save(chatMessage);
    }

    // 새로운 채팅방 생성
    public ChatRoom createChatRoom(ChatRoom chatRoom) {
        return chatRoomRepository.save(chatRoom);
    }

    // 모든 채팅방 목록 반환
    public List<ChatRoom> getAllChatRooms() {
        return chatRoomRepository.findAll();
    }

    // ChatService.java

    public ChatRoom getChatRoom(Long roomId) {
        return chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Chat room not found"));
    }

}
