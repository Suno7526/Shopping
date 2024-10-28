import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Stomp } from '@stomp/stompjs';
import './Chat.css'; // 스타일 파일 import

function Chat() {
  const stompClient = useRef(null);
  const messageAreaRef = useRef(null); // 메시지 영역의 ref 생성
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [chatRooms, setChatRooms] = useState([]);
  const [roomId, setRoomId] = useState(1); // 기본적으로 첫 번째 채팅방 ID 설정
  const [userEmail, setUserEmail] = useState(sessionStorage.getItem('userEmail')); // 사용자 이메일
  const [newRoomName, setNewRoomName] = useState(''); // 새 채팅방 이름 상태

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage(); // 엔터키가 눌렸을 때 메시지 전송
    }
  };

  const connect = () => {
    const socket = new WebSocket('ws://localhost:8000/ws');
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, () => {
      // 메시지 수신 구독
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

  // 메시지 가져오기 메소드 변환
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/chat/${roomId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  // 채팅방 목록 가져오기 메소드 변환
  const fetchChatRooms = async () => {
    try {
      const response = await axios.get('http://localhost:8000/chatrooms');
      setChatRooms(response.data);
    } catch (error) {
      console.error('Failed to fetch chat rooms:', error);
    }
  };

  // 채팅방 생성 메소드 변환
  const createChatRoom = async () => {
    if (!newRoomName.trim()) {
      alert('채팅방 이름을 입력하세요.');
      return;
    }

    const room = { name: newRoomName };
    try {
      const response = await axios.post('http://localhost:8000/chatrooms', room);
      console.log('채팅방 생성 성공:', response.data);
      setNewRoomName(''); // 입력 필드 초기화
      await fetchChatRooms(); // 채팅방 목록 갱신
    } catch (error) {
      console.error('채팅방 생성 실패:', error);
    }
  };

  const sendMessage = () => {
    if (stompClient.current && inputValue) {
      const body = {
        roomId: roomId,
        senderEmail: userEmail, // 이메일로 사용자 식별
        message: inputValue,
      };
      stompClient.current.send(`/pub/message`, {}, JSON.stringify(body));
      setInputValue(''); // 입력 필드 초기화
    }
  };

  // 새로운 메시지가 추가될 때마다 스크롤을 아래로 이동시키는 함수
  const scrollToBottom = () => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    fetchChatRooms();
    connect(); // 채팅방 연결
    fetchMessages(); // 초기 메시지 가져오기
    return () => disconnect(); // 컴포넌트 언마운트 시 연결 해제
  }, [roomId]);

  useEffect(() => {
    scrollToBottom(); // 메시지가 업데이트될 때마다 스크롤을 아래로 이동
  }, [messages]);

  const handleChatRoomChange = (event) => {
    setRoomId(event.target.value); // 채팅방 변경
  };

  const formatSenderName = (sender) => {
    if (sender.length > 1) {
      return sender.charAt(0) + '**'; // 이름의 첫 글자와 두 번째 글자를 '*'로 변경
    }
    return sender; // 이름이 1글자인 경우 그대로 반환
  };

  return (
      <div className="chat-container">
        <div className="chat-theme">
          <p className="theme-shopper">SHOPPER Message</p>
        </div>
        <div className="chat-main">
          <div className="chatroom-choice">
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
          </div>

          <div className="message-area" ref={messageAreaRef}>
            <ul>
              {messages.map((item, index) => (
                  <li
                      key={index}
                      className={`message ${
                          item.user.isSender ? 'sender' : 'receiver'
                      }`}
                  >
                    <div className="usernameDiv">
                      <div className="username">
                        {formatSenderName(item.user.name)}
                      </div>
                    </div>
                    <div className="text">{item.message}</div>
                  </li>
              ))}
            </ul>
          </div>

          <div className="input-area">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress} // 엔터키 입력 감지
                placeholder="메시지를 입력하세요..."
            />
            <button onClick={sendMessage} className="MessageEnter">
              입력
            </button>
          </div>


        </div>
      </div>
  );
}

export default Chat;
