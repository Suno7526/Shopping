package com.example.estate.webSocket;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageDto {
    private Long roomId; // 채팅방 ID
    private String sender; // 메시지 보낸 사람
    private String message; // 메시지 내용
}