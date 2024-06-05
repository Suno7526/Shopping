import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MyQuestion.css';
import axios from 'axios';

const MyQuestion = () => {
  const { questionCode } = useParams();
  const [activeButton, setActiveButton] = useState('');
  const userCode = sessionStorage.getItem('userCode') || '';
  const [isEditing, setIsEditing] = useState(false);
  const [question, setQuestion] = useState({
    questionTitle: '',
    questionContent: '',
    questionType: '',
    userCode: userCode,
  });

  const [replyText, setReplyText] = useState('');
  const [replyingCommentIndex, setReplyingCommentIndex] = useState(null);
  const [comments, setComments] = useState([]);

  const profileImages = [
    'https://i.postimg.cc/ryGyqhKY/images.jpg',
    'https://i.postimg.cc/xdqqCLWN/images.jpg',
    // 나머지 프로필 이미지들...
  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * profileImages.length);
    return profileImages[randomIndex];
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/questions/questionCode/${questionCode}`)
      .then((response) => {
        setQuestion(response.data);
      })
      .catch((error) => {
        console.error('Error fetching question data:', error);
      });

    axios
      .get(`http://localhost:8000/replies/${questionCode}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching replies data:', error);
      });

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
  }, [questionCode]);

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
      .post('http://localhost:8000/replies', newReply)
      .then((response) => {
        setComments((prevComments) => [...prevComments, response.data]);
        setReplyText('');
      })
      .catch((error) => {
        console.error('Error submitting reply:', error);
      });
  };

  const handleAnswerSubmit = (event, commentIndex) => {
    event.preventDefault();

    const newAnswer = {
      reply: { replyCode: comments[commentIndex].replyCode },
      user: { userCode: userCode },
      answerContent: replyText,
    };

    axios
      .post('http://localhost:8000/answers', newAnswer)
      .then((response) => {
        const updatedComments = [...comments];
        updatedComments[commentIndex].answer = response.data;
        setComments(updatedComments);
        setReplyText('');
        setReplyingCommentIndex(null);
      })
      .catch((error) => {
        console.error('Error submitting answer:', error);
      });
  };

  const handleAnswerEdit = (event, commentIndex) => {
    event.preventDefault();

    const updatedAnswer = {
      answerContent: replyText,
    };

    axios
      .put(
        `http://localhost:8000/answers/${comments[commentIndex].answer.answerCode}`,
        updatedAnswer,
      )
      .then((response) => {
        const updatedComments = [...comments];
        updatedComments[commentIndex].answer = response.data;
        setComments(updatedComments);
        setReplyText('');
        setReplyingCommentIndex(null);
      })
      .catch((error) => {
        console.error('Error updating answer:', error);
      });
  };

  const handleAnswerDelete = (event, commentIndex) => {
    event.preventDefault();

    axios
      .delete(
        `http://localhost:8000/answers/${comments[commentIndex].answer.answerCode}`,
      )
      .then(() => {
        const updatedComments = [...comments];
        updatedComments[commentIndex].answer = null;
        setComments(updatedComments);
      })
      .catch((error) => {
        console.error('Error deleting answer:', error);
      });
  };

  const handleReplyButtonClick = (event, commentIndex) => {
    event.preventDefault();

    if (replyingCommentIndex === commentIndex) {
      setReplyingCommentIndex(null);
    } else {
      setReplyingCommentIndex(commentIndex);
    }
  };

  return (
    <div className="Question-page">
      <article className="Question-Mainpage">
        <div className="Question-Maintitle">Contact Us</div>
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
