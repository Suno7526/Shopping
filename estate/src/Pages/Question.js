import React, { useState, useEffect } from 'react';
import './Question.css'; // 외부 스타일 시트 불러오기
import axios from 'axios';

const Question = () => {
  const [activeButton, setActiveButton] = useState('');
  const userCode = sessionStorage.getItem('userCode') || '';
  const [questionType, setQuestionType] = useState('');

  const [question, setQuestion] = useState({
    questionTitle: '',
    questionContent: '',
    questionType: '',
    userCode: userCode,
  });

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setQuestionType(buttonName);
  };

  const handleTitleChange = (event) => {
    setQuestion({ ...question, questionTitle: event.target.value });
  };

  const handleContentChange = (event) => {
    setQuestion({ ...question, questionContent: event.target.value });
  };

  const handleSubmit = async () => {
    if (!question.questionTitle || !question.questionContent || !questionType) {
      alert('모든 필드를 입력해 주세요.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/questions', {
        questionTitle: question.questionTitle,
        questionContent: question.questionContent,
        questionType: questionType,
        userCode: userCode,
      });

      if (response.status === 200) {
        alert('문의하기 완료');
        setQuestion({
          questionTitle: '',
          questionContent: '',
          questionType: '',
          userCode: userCode,
        });
        setActiveButton('');
      }
    } catch (error) {
      console.error(error);
      alert('문의 전송에 실패했습니다.');
    }
  };

  useEffect(() => {
    const inputs = document.querySelectorAll('.input-text');

    inputs.forEach((input) => {
      input.addEventListener('focus', () => {
        input.classList.add('not-empty');
      });

      input.addEventListener('blur', () => {
        if (input.value === '') {
          input.classList.remove('not-empty');
        }
      });

      if (input.value !== '') {
        input.classList.add('not-empty');
      }
    });
  }, []);

  return (
    <div className="Question-page">
      <article className="Question-Mainpage">
        <div className="Question-Maintitle">Contact Us</div>
        <p className="Question-Maintitle-p">☎ 궁금한 내용을 문의해주세요! ☎</p>
      </article>
      <div className="Question-content">
        <form className="question-form contact-form">
          <div className="Question-type">문의유형</div>
          <div className="additional-buttons">
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
              onClick={() => handleButtonClick('취소/교환/환불')}
              className={activeButton === '취소/교환/환불' ? 'active' : ''}
            >
              취소/교환/환불
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

          <div className="form-field">
            <input
              type="text"
              id="questionTitle"
              name="questionTitle"
              value={question.questionTitle}
              onChange={handleTitleChange}
              className="input-text"
              required
            />
            <label htmlFor="questionTitle" className="label">
              제목
            </label>
          </div>
          <div className="questionContent">
            <div className="form-field">
              <textarea
                className="QuestionContent-textarea input-text"
                id="questionContent"
                name="questionContent"
                rows="4"
                value={question.questionContent}
                onChange={handleContentChange}
                required
              ></textarea>
              <label htmlFor="questionContent" className="label">
                문의내용
              </label>
            </div>
          </div>
          <button type="button" className="submit-btn" onClick={handleSubmit}>
            문의하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Question;
