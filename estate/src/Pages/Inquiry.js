import React, { useEffect, useState } from 'react';
import './Inquiry.css';
import InquiryAside from '../Components/InquiryAside';
import { Link } from 'react-router-dom'; // Link import 추가
import axios from 'axios';

const Inquiry = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 서버에서 데이터 가져오는 부분
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/questions');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 설정

  return (
    <div className="Inquiry-page">
      <InquiryAside />
      <article className="Inquiry-article">
        <h2>
          <div className="Inquiry-Maintitle">문의하기</div>
        </h2>
        <div className="InquiryMainImage"></div>
      </article>

      <div className="board-main">
        <div className="board-info">
          <span className="board-info-item">문의 종류</span>
          <span className="board-info-item">제목</span>
          <span className="board-info-item">사용자이름</span>
        </div>
        {posts.map((post, index) => (
          <Link to={`/MyQuestion/${post.questionCode}`} key={index}>
            <div className="post">
              <span className="post-info-item">{post.questionType}</span>
              <h2 className="post-title">{post.questionTitle}</h2>
              <p className="post-username">
                {sessionStorage.getItem('userName')}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Inquiry;
