import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Stomp } from '@stomp/stompjs';

function Chat() {
  const stompClient = useRef(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [chatRooms, setChatRooms] = useState([]);
  const [roomId, setRoomId] = useState(1); // 기본적으로 첫 번째 채팅방 ID 설정
  const [userEmail, setUserEmail] = useState(
    sessionStorage.getItem('userEmail'),
  ); // 사용자 이메일

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const connect = () => {
    const socket = new WebSocket('ws://localhost:8000/ws');
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, () => {
      stompClient.current.subscribe(`/sub/chatroom/${roomId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    });
  };

  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.disconnect();
    }
  };

  const fetchMessages = () => {
    return axios
      .get(`http://localhost:8000/chat/${roomId}`)
      .then((response) => {
        setMessages(response.data);
      });
  };

  const fetchChatRooms = () => {
    return axios.get('http://localhost:8000/chatrooms').then((response) => {
      setChatRooms(response.data);
    });
  };

  const createChatRoom = () => {
    const room = { name: '새 채팅방' };
    axios
      .post('http://localhost:8000/chatrooms', room)
      .then((response) => {
        console.log('채팅방 생성 성공:', response.data);
        fetchChatRooms();
      })
      .catch((error) => {
        console.error('채팅방 생성 실패:', error);
      });
  };

  const sendMessage = () => {
    if (stompClient.current && inputValue) {
      const body = {
        roomId: roomId,
        senderEmail: userEmail, // 이메일로 사용자 식별
        message: inputValue,
      };
      stompClient.current.send(`/pub/message`, {}, JSON.stringify(body));
      setInputValue('');
    }
  };

  useEffect(() => {
    fetchChatRooms();
    connect();
    fetchMessages();
    return () => disconnect();
  }, [roomId]);

  const handleChatRoomChange = (event) => {
    setRoomId(event.target.value);
  };

  const formatSenderName = (sender) => {
    if (sender.length > 1) {
      return sender.charAt(0) + '**'; // 이름의 첫 글자와 두 번째 글자를 '*'로 변경
    }
    return sender; // 이름이 1글자인 경우 그대로 반환
  };

  return (
    <div className="chat-container">
      <h3>채팅방 선택</h3>
      <select
        className="chat-room-select"
        onChange={handleChatRoomChange}
        value={roomId}
      >
        {chatRooms.map((room) => (
          <option key={room.id} value={room.id}>
            {room.name}
          </option>
        ))}
      </select>

      <h3>메시지 리스트</h3>
      <div className="message-area">
        <ul>
          {messages.map((item, index) => (
            <li key={index} className="message">
              {formatSenderName(item.user.name)}: {item.message}{' '}
              {/* 사용자 이름 포맷팅 */}
            </li>
          ))}
        </ul>
      </div>

      <div className="input-area">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="메시지를 입력하세요..."
        />
        <button onClick={sendMessage}>입력</button>

        <h3>채팅방 생성</h3>
        <button onClick={createChatRoom}>새 채팅방 생성</button>
      </div>
    </div>
  );
}

export default Chat;
