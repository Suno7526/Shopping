import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MyQuestion.css';
import axios from 'axios';

const MyQuestion = () => {
  const API_URL = process.env.REACT_APP_API_URL;  // Add this line to use the API_URL from the environment variable
  const { questionCode } = useParams();
  const userCode = sessionStorage.getItem('userCode') || '';
  const [isEditing, setIsEditing] = useState(false);
  const [question, setQuestion] = useState({
    questionTitle: '',
    questionContent: '',
    questionType: '',
    order: { orderCode: '' }, // 기본값 설정
  });

  const [replyText, setReplyText] = useState('');
  const [comments, setComments] = useState([]);

  const profileImages = [
    'https://i.postimg.cc/xdqqCLWN/images.jpg',
    // 나머지 프로필 이미지들...
  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * profileImages.length);
    return profileImages[randomIndex];
  };

  useEffect(() => {
    axios
        .get(`${API_URL}/questions/questionCode/${questionCode}`)  // Updated with API_URL
        .then((response) => {
          setQuestion(response.data);
        })
        .catch((error) => {
          console.error('Error fetching question data:', error);
        });

    axios
        .get(`${API_URL}/replies/${questionCode}`)  // Updated with API_URL
        .then((response) => {
          setComments(response.data);
        })
        .catch((error) => {
          console.error('Error fetching replies data:', error);
        });
  }, [questionCode, API_URL]);  // Include API_URL in the dependency array

  const handleTitleChange = (event) => {
    setQuestion({ ...question, questionTitle: event.target.value });
  };

  const handleContentChange = (event) => {
    setQuestion({ ...question, questionContent: event.target.value });
  };

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleReplySubmit = (event) => {
    event.preventDefault();

    const newReply = {
      replyContent: replyText,
      user: { userCode: userCode },
      question: { questionCode: questionCode },
    };

    axios
        .post(`${API_URL}/replies`, newReply)  // Updated with API_URL
        .then((response) => {
          axios
              .get(`${API_URL}/replies/${questionCode}`)  // Updated with API_URL
              .then((response) => {
                setComments(response.data);
              })
              .catch((error) => {
                console.error('Error fetching replies data:', error);
              });
          setComments([...comments, response.data]);
          setReplyText('');
        })
        .catch((error) => {
          console.error('댓글 제출 중 오류 발생:', error);
        });
  };

  return (
      <div className="Question-page">
        <article className="Question-Mainpage">
          <div className="Question-Maintitle">Question</div>
        </article>
        <div className="Question-content">
          <form className="question-form contact-form">
            <div className="MyQuestionTop">
              <div className="Question-type">문의내용을 확인하세요 !</div>
              <div
                  className="edit-button"
                  onClick={() => setIsEditing(true)}
              ></div>
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

            {question.order && question.order.orderCode && (
                <div className="order-code">
                  <strong>주문번호:</strong> {question.order.orderCode} /
                  <strong>상품명:</strong> {question.order.product.productName}
                </div>
            )}

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
              {comments.map((comment, index) => (
                  <li key={index} className="comment-item">
                    <img
                        alt="user profile"
                        src={getRandomImage()}
                        className="comment-profile"
                    />
                    <div className="comment-content">
                      <div className="comment-header">
                    <span className="comment-name">
                      {comment.user ? comment.user.name : 'Unknown'}
                      {comment.user &&
                          comment.user.userCode === question.user.userCode && (
                              <div className="author-badge">작성자</div>
                          )}
                    </span>

                        <span className="comment-date">{comment.registerDate}</span>
                      </div>
                      <div className="comment-text">{comment.replyContent}</div>
                    </div>
                  </li>
              ))}
            </ul>
            <div className="Register-div">
            <textarea
                className="Registertextarea"
                value={replyText}
                onChange={handleReplyChange}
                placeholder="댓글을 작성해주세요..."
            />
              <button className="Register-reply-btn" onClick={handleReplySubmit}>
                댓글 등록
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default MyQuestion;
