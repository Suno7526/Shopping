import React, { useState } from 'react';
import axios from 'axios';
import {
  Route,
  Routes,
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Join from './Join';
import './UserLogin.css'; // 외부 스타일 시트 불러오기

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const previousPath = location.state?.from?.pathname || '/Home';

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        const userData = response.data;

        if (userData) {
          // Login successful
          console.log('Login successful');

          // Save user information in sessionStorage
          sessionStorage.setItem('userEmail', email);
          sessionStorage.setItem('userCode', userData.userCode); // userCode 저장
          sessionStorage.setItem('userAddress', userData.address);
          sessionStorage.setItem('userName', userData.name);
          sessionStorage.setItem('userBirth', userData.birth);
          sessionStorage.setItem('userRole', userData.role);
          sessionStorage.setItem('userPhone', userData.phoneNumber);
          // Redirect to previous page or Home page
          navigate(previousPath);
          window.location.reload(); // 페이지 새로고침
        } else {
          alert('로그인 실패');
        }
      } else {
        alert('로그인 실패');
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

      <div className="login-container">
        <div className="Login-logo">Login</div>
        <br />
        {/* 이메일 입력란 */}
        <div className="input-box">
          <input
            className="login-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="text">E-Mail</label>
        </div>
        {/* 비밀번호 입력란 */}
        <div className="input-box">
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">PassWord</label>
        </div>
        <br />
        {/* 로그인 버튼 */}
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
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
