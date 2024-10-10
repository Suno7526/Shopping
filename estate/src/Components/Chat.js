import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Stomp } from "@stomp/stompjs";

function Chat() {
    const stompClient = useRef(null);
    // 채팅 내용들을 저장할 변수
    const [messages, setMessages] = useState([]);
    // 사용자 입력을 저장할 변수
    const [inputValue, setInputValue] = useState('');
    // 채팅방 목록을 저장할 변수
    const [chatRooms, setChatRooms] = useState([]);
    // 현재 채팅방 ID
    const [roomId, setRoomId] = useState(1); // 기본적으로 첫 번째 채팅방 ID 설정

    // 입력 필드에 변화가 있을 때마다 inputValue를 업데이트
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // 웹소켓 연결 설정
    const connect = () => {
        const socket = new WebSocket("ws://localhost:8000/ws");
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect({}, () => {
            stompClient.current.subscribe(`/sub/chatroom/${roomId}`, (message) => {
                const newMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
        });
    };

    // 웹소켓 연결 해제
    const disconnect = () => {
        if (stompClient.current) {
            stompClient.current.disconnect();
        }
    };

    // 기존 채팅 메시지를 서버로부터 가져오는 함수
    const fetchMessages = () => {
        return axios.get(`http://localhost:8000/chat/${roomId}`)
            .then(response => { setMessages(response.data) });
    };

    // 채팅방 목록을 가져오는 함수
    const fetchChatRooms = () => {
        return axios.get("http://localhost:8000/chatrooms")
            .then(response => { setChatRooms(response.data) });
    };

    // 채팅방 생성
    const createChatRoom = () => {
        const room = { name: "새 채팅방" }; // 원하는 채팅방 이름으로 변경

        axios.post("http://localhost:8000/chatrooms", room)
            .then(response => {
                console.log("채팅방 생성 성공:", response.data);
                fetchChatRooms(); // 생성 후 채팅방 목록 다시 가져오기
            })
            .catch(error => {
                console.error("채팅방 생성 실패:", error);
            });
    };

    // 메시지 전송
    const sendMessage = () => {
        if (stompClient.current && inputValue) {
            const body = {
                roomId: roomId, // 채팅방 ID
                sender: "테스트1", // 사용자 이름 (실제 사용자로 바꿀 수 있음)
                message: inputValue // 입력한 메시지
            };
            stompClient.current.send(`/pub/message`, {}, JSON.stringify(body));
            setInputValue(''); // 입력 필드 초기화
        }
    };

    useEffect(() => {
        fetchChatRooms(); // 컴포넌트가 마운트될 때 채팅방 목록 가져오기
        connect();
        fetchMessages();
        return () => disconnect();
    }, []);

    // 채팅방 선택
    const handleChatRoomChange = (id) => {
        setRoomId(id);
        fetchMessages(); // 선택한 채팅방의 메시지를 가져옴
    };

    return (
        <div>
            <h3>채팅방 목록</h3>
            <ul>
                {chatRooms.map((room) => (
                    <li key={room.id}>
                        <button onClick={() => handleChatRoomChange(room.id)}>
                            {room.name}
                        </button>
                    </li>
                ))}
            </ul>

            <h3>메시지 전송</h3>
            <div>
                {/* 입력 필드 */}
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                {/* 메시지 전송 버튼 */}
                <button onClick={sendMessage}>입력</button>
            </div>

            <h3>메시지 리스트</h3>
            <ul>
                {/* 메시지 리스트 출력 */}
                {messages.map((item, index) => (
                    <div key={index} className="list-item">{item.message}</div>
                ))}
            </ul>

            <h3>채팅방 생성</h3>
            <button onClick={createChatRoom}>새 채팅방 생성</button>
        </div>
    );
}

export default Chat;
