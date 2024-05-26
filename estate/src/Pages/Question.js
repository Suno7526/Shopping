import React, { useState, useEffect } from 'react';
import './Question.css'; // 외부 스타일 시트 불러오기
import { Link } from 'react-router-dom'; // Link import 추가
import Aside from '../Components/Aside';
import axios from 'axios';

const Question = () => {
  // 버튼의 활성화 상태를 관리하는 useState 훅 사용
  const [activeButton, setActiveButton] = useState('');
  const userCode = sessionStorage.getItem('userCode');
  const [questionType, setQuestionType] = useState('');

  const [question, setQuestion] = useState({
    questionTitle: '',
    questionContent: '',
    questionType: '',
    userCode: userCode,
  });

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setQuestionType(buttonName); // 클릭한 버튼의 값을 questionType에 저장
  };

  // 문의 제목 입력 시 호출되는 함수
  const handleTitleChange = (event) => {
    setQuestion({ ...question, questionTitle: event.target.value });
  };

  // 문의 내용 입력 시 호출되는 함수
  const handleContentChange = (event) => {
    setQuestion({ ...question, questionContent: event.target.value });
  };

  // 전송 버튼 클릭 시 실행되는 함수
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/questions', {
        questionTitle: question.questionTitle,
        questionContent: question.questionContent,
        questionType: questionType,
        userCode: userCode, // userCode도 함께 보냄
      });

      alert('문의하기 완료');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page">
      <article className="Question-Mainpage">
        <div className="Question-Maintitle">문의하실 내용을 적어주세요!</div>
      </article>
      <form className="question-form">
        <div className="additional-buttons">
          {/* inquiryOptions 위에 Best FAQ 추가 */}
          문의유형
          <button
            type="button"
            onClick={() => handleButtonClick('배송')}
            className={activeButton === '배송' ? 'active' : ''}
          >
            배송
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick('주문/결제')}
            className={activeButton === '주문/결제' ? 'active' : ''}
          >
            주문/결제
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick('최소/교환/환불')}
            className={activeButton === '최소/교환/환불' ? 'active' : ''}
          >
            최소/교환/환불
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick('회원정보')}
            className={activeButton === '회원정보' ? 'active' : ''}
          >
            회원정보
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick('상품확인')}
            className={activeButton === '상품확인' ? 'active' : ''}
          >
            상품확인
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick('서비스')}
            className={activeButton === '서비스' ? 'active' : ''}
          >
            서비스
          </button>
        </div>

        <div>
          <label htmlFor="questionTitle">문의제목</label>
          <input
            type="text"
            id="questionTitle"
            name="questionTitle"
            value={question.questionTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="questionContent">문의내용</label>
          <textarea
            id="questionContent"
            name="questionContent"
            rows="4"
            value={question.questionContent}
            onChange={handleContentChange}
          ></textarea>
        </div>
        <button type="button" onClick={handleSubmit}>
          문의하기
        </button>
      </form>
    </div>
  );
};

export default Question;
