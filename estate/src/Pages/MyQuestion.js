import React, { useState, useEffect } from 'react';
import './MyQuestion.css';
import axios from 'axios';

const MyQuestion = () => {
  const [activeButton, setActiveButton] = useState('');
  const userCode = sessionStorage.getItem('userCode') || '';
  const [questionType, setQuestionType] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [question, setQuestion] = useState({
    questionTitle: '',
    questionContent: '',
    questionType: '',
    userCode: userCode,
  });
  const [replyText, setReplyText] = useState('');
  const [replyingCommentIndex, setReplyingCommentIndex] = useState(null);

  const exampleComments = [
    { name: 'Alice', content: '첫 번째 예시 댓글입니다.', date: '2024-05-20' },
    { name: 'Bob', content: '두 번째 예시 댓글입니다.', date: '2024-05-21' },
    // 나머지 댓글들...
  ];

  const profileImages = [
    'https://i.postimg.cc/ryGyqhKY/images.jpg',
    'https://i.postimg.cc/xdqqCLWN/images.jpg',
    // 나머지 프로필 이미지들...
  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * profileImages.length);
    return profileImages[randomIndex];
  };

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

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleReplySubmit = (event, commentIndex) => {
    event.preventDefault(); // 기본 동작 중단

    // 답글 처리 로직 추가

    setReplyText(''); // 답글 작성 창 초기화
    setReplyingCommentIndex(null); // 답글 작성 인덱스 초기화
  };

  const handleReplyButtonClick = (event, commentIndex) => {
    event.preventDefault(); // 기본 동작 중단

    // 여기에 답글 작성 폼을 표시하거나 관련 상태를 업데이트하는 로직 추가

    setReplyingCommentIndex(commentIndex); // 답글 작성 폼을 활성화하기 위해 관련 인덱스 설정
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
      </article>
      <div className="Question-content">
        <form className="question-form contact-form">
          <div className="MyQuestionTop">
            <div className="Question-type">문의내용을 확인하세요 !</div>
            <div className="edit-button" onClick={() => setIsEditing(true)}>
              {isEditing ? (
                <img
                  src="https://i.postimg.cc/J4VLHjBH/download.png"
                  alt="Edit Icon"
                  className="edit-icon"
                />
              ) : (
                '수정하기'
              )}
            </div>
          </div>

          <div className="form-field">
            <div className="MyQuestion-Title">제목</div>
            <input
              type="text"
              id="questionTitle"
              name="questionTitle"
              value={question.questionTitle}
              onChange={handleTitleChange}
              className="form-field-input-text"
              required
              readOnly={!isEditing}
            />
          </div>
          <div className="questionContent">
            <label htmlFor="questionContent" className="label2">
              문의내용
            </label>
            <div className="form-field">
              <textarea
                className="form-field-input-textarea"
                id="questionContent"
                name="questionContent"
                rows="4"
                value={question.questionContent}
                onChange={handleContentChange}
                required
                readOnly={!isEditing}
              ></textarea>
            </div>
          </div>
          <ul className="comment-list">
            {exampleComments.map((comment, index) => (
              <li key={index} className="comment-item">
                <img
                  alt="user profile"
                  src={getRandomImage()}
                  className="comment-profile"
                />
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-name">{comment.name}</span>
                    <span className="comment-date">{comment.date}</span>
                  </div>
                  <div className="comment-text">{comment.content}</div>
                  {replyingCommentIndex === index && (
                    <div className="Register-div">
                      <textarea
                        className="Registertextarea"
                        value={replyText}
                        onChange={handleReplyChange}
                        placeholder="답글을 작성해주세요..."
                      />
                      <button
                        className="Register-reply-btn"
                        onClick={(event) => handleReplySubmit(event, index)}
                      >
                        답글 등록
                      </button>
                    </div>
                  )}
                  <button
                    className="reply-btn"
                    onClick={(event) => handleReplyButtonClick(event, index)}
                  >
                    답글
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button type="button" className="submit-btn" onClick={handleSubmit}>
            문의하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyQuestion;
