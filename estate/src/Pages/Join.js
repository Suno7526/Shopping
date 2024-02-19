import React from 'react';

const Join = () => {
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>회원가입 페이지</title>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* 전체 페이지 스타일 */
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }

        /* 회원가입 컨테이너 스타일 */
        #signup-container {
          text-align: left;
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
          box-sizing: border-box;
        }

        /* 회원가입 제목 스타일 */
        #signup-heading {
          font-size: 2em;
          font-weight: bold;
          color: #50bcdf;
          margin-bottom: 20px;
        }

        /* 입력 필드 공통 스타일 */
        input, select {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          box-sizing: border-box;
          display: inline-block;
        }

        /* 전화번호와 생년월일 컨테이너 스타일 */
        .date-container, #phone-container {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          align-items: flex-start;
        }

        /* 전화번호 입력 필드 및 생년월일 선택 필드 스타일 */
        .date-container select, #phone-container input {
          width: calc(50% - 5px);
          box-sizing: border-box;
        }

        /* 가입하기, 가입취소 버튼 공통 스타일 */
        #signup-button, #cancel-button {
          color: white;
          font-family: sans-serif;
          padding: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1em;
          width: 45%;
          display: inline-block;
          box-sizing: border-box;
        }

        /* 가입하기 버튼 스타일 */
        #signup-button {
          background-color: #0066cc;
          margin-right: 5%;
        }

        /* 가입취소 버튼 스타일 */
        #cancel-button {
          background-color: #CCCCCC;
        }

        /* 레이블 공통 스타일 */
        label {
          display: block;
          margin-bottom: 5px;
          font-size: 0.8em;
          color: #333;
        }

        /* 생년월일과 전화번호 레이블 컨테이너 스타일 */
        .date-label-container, #phone-label-container {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
        }

        /* 생년월일과 전화번호 각 레이블 스타일 */
        .date-label-container label, #phone-label-container label {
          width: calc(33.33% - 5px);
        }
      `,
        }}
      />
      <div id="signup-container">
        <div id="signup-heading">회원가입</div>
        <label htmlFor="email">이메일</label>
        <input type="text" id="email" placeholder="이메일" />
        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" placeholder="비밀번호" />
        <label htmlFor="confirm-password">비밀번호 확인</label>
        <input
          type="password"
          id="confirm-password"
          placeholder="비밀번호 확인"
        />
        <label htmlFor="name">이름</label>
        <input type="text" id="name" placeholder="이름" />
        <div id="phone-label-container">
          <label htmlFor="phone-prefix">전화번호</label>
          <label htmlFor="phone-middle" />
          <label htmlFor="phone-suffix" />
        </div>
        <div id="phone-container">
          <input type="text" id="phone-prefix" placeholder={10} />
          <input type="text" id="phone-middle" placeholder={1234} />
          <input type="text" id="phone-suffix" placeholder={5678} />
        </div>
        <div className="date-label-container">
          <label htmlFor="year">년도</label>
          <label htmlFor="month">월</label>
          <label htmlFor="day">일</label>
        </div>
        <div className="date-container">
          <select id="year">
            <option value={2022}>2022</option>
            {/* 다른 년도 옵션들 추가 */}
          </select>
          <select id="month">
            <option value={1}>01</option>
            {/* 다른 월 옵션들 추가 */}
          </select>
          <select id="day">
            <option value={1}>01</option>
            {/* 다른 일 옵션들 추가 */}
          </select>
        </div>
        <button id="signup-button">가입하기</button>
        <button id="cancel-button">가입취소</button>
      </div>
    </div>
  );
};

export default Join;
