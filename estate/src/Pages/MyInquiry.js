import React, { useEffect, useState } from 'react';
import './Inquiry.css';
import { Link } from 'react-router-dom';
import InquiryAside from '../Components/InquiryAside';
import axios from 'axios';

const Inquiry = () => {
  const [posts, setPosts] = useState([]);
  const userCode = sessionStorage.getItem('userCode');
  const userName = sessionStorage.getItem('userName');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/questions/${userCode}`,
        );
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="MyInquiry-page">
      <InquiryAside />
      <article className="MyInquiry-article">
        <h2>
          <div className="MyInquiry-Maintitle">나의 문의내역</div>
        </h2>
        <div className="MyInquiryMainImage"></div>
      </article>
      <div className="board-main">
        <div className="board-info">
          <span className="board-info-item">문의 종류</span>
          <span className="board-info-item">제목</span>
          <span className="board-info-item">사용자이름</span>
        </div>
        {posts.length === 0 ? (
          <div className="no-posts">문의 내역이 없습니다.</div>
        ) : (
          posts.map((post, index) => (
            <Link to={`/MyQuestion/${post.questionCode}`} key={index}>
              <div className="post" key={index}>
                <span className="post-info-item">{post.questionType}</span>
                <h2 className="post-title">{post.questionTitle}</h2>
                <p className="post-username">{userName || 'Unknown'}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Inquiry;
