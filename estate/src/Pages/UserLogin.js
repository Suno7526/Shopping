import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Join from './Join';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password,
      });

      console.log('Login response:', response); // Add this line to log the response

      if (response.status === 200) {
        // Login successful
        console.log('Login successful');

        // Save user information in sessionStorage
        sessionStorage.setItem('userEmail', email);
        document.location.href = '/Home';
      } else {
        console.log('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>로그인 페이지</title>
      <style
        dangerouslySetInnerHTML={{
          __html: `
      /* 전체 화면 스타일 설정 */
      body {
        font-family: Arial, sans-serif;
        background-color: rgb(232, 232, 232);
        margin: 0;
        padding: 0;
        background-image: url('loginbg.png'); /* 이미지 파일의 경로로 수정 */
        background-size: cover;  /* 배경 이미지를 화면에 맞게 조절 */
        background-position: center top; /* 이미지의 중앙 상단에 위치하도록 설정 */
        display: flex;
        align-items: center;
        justify-content: center;
        height: 700px;
      }

      /* 로그인 컨테이너 스타일 설정 */
      #login-container {
        text-align: left; /* 텍스트 정렬 방향을 왼쪽으로 설정 */
        background-color: white;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        max-width: 400px; /* 최대 너비 설정 */
        width: 100%;
        box-sizing: border-box;
      }

      /* 다방 로고 스타일 설정 */
      #logo {
        text-align: center;
        font-size: 5em;
        font-weight: bold;
        color: #333;
        margin-bottom: 20px;
      }

      /* 입력 필드 스타일 설정 */
      input, select {
        width: 100%;
        padding: 10px;
        margin-bottom: 15px;
        box-sizing: border-box;
      }

      /* 로그인, 회원가입 버튼 스타일 설정 */
      #login-button, #signup-button {
        display: inline-block;
        margin: 15px 0; /* 수직 방향으로 중앙 정렬, 수평 방향으로는 자동 마진을 이용하여 중앙 정렬 */
      }

      /* 로그인 버튼 스타일 설정 */
      #login-button {
        background-color: #000000;
        color: white;
        padding: 10px; /* 더 나은 모양을 위한 패딩 조정 */
        border: none;
        border-radius: 3px;
        cursor: pointer;
        font-size: 1em;
        text-align: center;
        margin-top: 15px; /* 버튼 위에 일정한 여백을 둠 */
      }
      

      /* 회원가입 버튼 스타일 설정 */
      #signup-button {
        color: gray;
        padding: 10px; /* 더 나은 모양을 위한 패딩 조정 */
        text-decoration: none;
        font-size: 15px;
        margin-top: 15px; /* 버튼 위에 일정한 여백을 둠 */
        display: block; /* 블록 레벨로 설정하여 너비 100% 차지 */
      }

      /* 입력 필드 텍스트 스타일 설정 */
      label {
        text-align: left;
        font-size: 1em;
        color: #333;
        display: block;
        margin-bottom: 5px;
        }
        .join-link {
          color: #ffffff; /* 글자색을 흰색으로 설정 */
          background-color: #008CBA; /* 배경색을 파란색으로 설정 */
          padding: 10px; /* 여백 설정 */
          text-decoration: none; /* 밑줄 제거 */
          border-radius: 3px; /* 모서리를 둥글게 설정 */
          display: inline-block; /* 가로로 배열되도록 설정 */
        }

      .join-link:hover {
        background-color: #005580; /* 마우스 호버 시 배경색 변경 */
      }
    `,
        }}
      />

      <div id="login-container">
        <div id="logo">Passin</div> <hr />
        <br />
        <br />
        {/* 이메일 입력란 */}
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* 비밀번호 입력란 */}
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {/* 로그인 버튼 */}
        <button onClick={handleLogin}>Login</button>
        {/* 회원가입 버튼 */}
        <Link to="/Join" className="join-link">
          회원가입
        </Link>
        <Routes>
          <Route path="/Join" element={<Join />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserLogin;
