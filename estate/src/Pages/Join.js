import React from 'react';
import axios from 'axios';
import { useState } from 'react'; // useEffect를 사용하지 않기 때문에 import 제거
import './Join.css'; // 외부  시트 불러오기

const Join = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phonePrefix: '',
    phoneMiddle: '',
    phoneSuffix: '',
    year: 2022,
    month: 1,
    day: 1,
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    const nameRegex = /^[가-힣]+$/;
    return nameRegex.test(name);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // 전화번호의 경우 원하는 규칙에 맞게 정규표현식을 작성해야 합니다.
    // 예: 010-1234-5678 형태의 번호를 허용하는 경우
    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async () => {
    // 비밀번호와 비밀번호 확인이 다를 경우 알림
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    // 이메일 유효성 검사
    if (!validateEmail(formData.email)) {
      alert('유효한 이메일 주소를 입력하세요.');
      return;
    }

    // 이름 유효성 검사
    if (!validateName(formData.name)) {
      alert('한글 이름을 입력하세요.');
      return;
    }

    // 전화번호 유효성 검사
    if (
      !validatePhoneNumber(
        `${formData.phonePrefix}-${formData.phoneMiddle}-${formData.phoneSuffix}`,
      )
    ) {
      alert('유효한 전화번호를 입력하세요.');
      return;
    }

    // 나머지 코드는 그대로 유지
    try {
      const response = await axios.post('http://localhost:8000/saveUser', {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phoneNumber: `${formData.phonePrefix}-${formData.phoneMiddle}-${formData.phoneSuffix}`,
        address: formData.address,
        birth: `${formData.year}-${formData.month}-${formData.day}`,
      });

      alert(response.data); // 서버에서의 응답을 알림으로 표시 (수정 필요)
      document.location.href = '/Home';
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>회원가입 페이지</title>

      <div id="signup-container">
        <div id="signup-heading">회원가입</div>
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          id="email"
          placeholder="이메일"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          placeholder="비밀번호"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <label htmlFor="confirm-password">비밀번호 확인</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="비밀번호 확인"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          placeholder="이름"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <div id="phone-label-container">
          <label htmlFor="phone-prefix">전화번호</label>
          <label htmlFor="phone-middle" />
          <label htmlFor="phone-suffix" />
        </div>
        <div id="phone-container">
          <input
            type="text"
            id="phone-prefix"
            name="phonePrefix"
            value={formData.phonePrefix}
            placeholder={10}
            onChange={handleInputChange}
          />
          <input
            type="text"
            id="phone-middle"
            name="phoneMiddle"
            value={formData.phoneMiddle}
            placeholder={1234}
            onChange={handleInputChange}
          />
          <input
            type="text"
            id="phone-suffix"
            name="phoneSuffix"
            value={formData.phoneSuffix}
            placeholder={5678}
            onChange={handleInputChange}
          />
        </div>
        <label htmlFor="address">주소</label>
        <input
          type="text"
          id="address"
          placeholder="주소"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
        <div className="date-label-container">
          <label htmlFor="year">년도</label>
          <label htmlFor="month">월</label>
          <label htmlFor="day">일</label>
        </div>
        <div className="date-container">
          {/* 년도 선택 */}
          <select
            id="year"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
          >
            {Array.from({ length: 125 }, (_, index) => {
              const year = 2024 - index;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>

          {/* 월 선택 */}
          <select
            id="month"
            name="month"
            value={formData.month}
            onChange={handleInputChange}
          >
            {Array.from({ length: 12 }, (_, index) => {
              const month = index + 1;
              const paddedMonth = month.toString().padStart(2, '0');
              return (
                <option key={month} value={month}>
                  {paddedMonth}
                </option>
              );
            })}
          </select>

          {/* 일 선택 */}
          <select
            id="day"
            name="day"
            value={formData.day}
            onChange={handleInputChange}
          >
            {Array.from({ length: 31 }, (_, index) => {
              const day = index + 1;
              const paddedDay = day.toString().padStart(2, '0');
              return (
                <option key={day} value={day}>
                  {paddedDay}
                </option>
              );
            })}
          </select>
        </div>

        <button id="signup-button" onClick={handleSubmit}>
          가입하기
        </button>
        <button id="cancel-button">가입취소</button>
      </div>
    </div>
  );
};

export default Join;
