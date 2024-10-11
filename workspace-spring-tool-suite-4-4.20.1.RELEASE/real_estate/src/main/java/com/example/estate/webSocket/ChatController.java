package com.example.estate.webSocket;

import com.example.estate.entity.ChatMessage;
import com.example.estate.entity.ChatRoom;
import com.example.estate.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {
    private final SimpMessageSendingOperations template;
    private final ChatService chatService;

    // 특정 채팅방의 메시지를 가져옴
    @GetMapping("/chat/{id}")
    public ResponseEntity<List<ChatMessage>> getChatMessages(@PathVariable Long id) {
        List<ChatMessage> messages = chatService.getChatMessages(id);
        return ResponseEntity.ok().body(messages);
    }

    // 메시지 수신 및 처리
    @MessageMapping("/message")
    public ResponseEntity<Void> receiveMessage(@RequestBody ChatMessageDto chatDto) {
        ChatRoom chatRoom = chatService.getChatRoom(chatDto.getRoomId());
        User user = chatService.getUserByEmail(chatDto.getSenderEmail()); // 이메일로 User 객체 조회
        ChatMessage chatMessage = new ChatMessage(chatRoom, user, chatDto.getMessage());
        chatService.saveMessage(chatMessage);
        template.convertAndSend("/sub/chatroom/" + chatDto.getRoomId(), chatMessage);
        return ResponseEntity.ok().build();
    }

    // 새로운 채팅방 생성
    @PostMapping("/chatrooms")
    public ResponseEntity<ChatRoom> createChatRoom(@RequestBody ChatRoom chatRoom) {
        ChatRoom savedRoom = chatService.createChatRoom(chatRoom);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRoom);
    }

    // 모든 채팅방 목록 반환
    @GetMapping("/chatrooms")
    public ResponseEntity<List<ChatRoom>> getChatRooms() {
        List<ChatRoom> rooms = chatService.getAllChatRooms();
        return ResponseEntity.ok(rooms);
    }
}
