import React, { useEffect, useState } from 'react';
import './Inquiry.css';
import InquiryAside from '../Components/InquiryAside';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Inquiry = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/questions');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="Inquiry-page">
      <InquiryAside />
      <article className="Inquiry-article">
        <h2>
          <div className="Inquiry-Maintitle">문의하기</div>
        </h2>
        <div className="InquiryMainImage"></div>
      </article>
      <section className="board-main">
        <div className="board-info">
          <span className="board-info-item-type">문의 종류</span>
          <span className="board-info-item-title">제목</span>
          <span className="board-info-item-name">사용자이름</span>
        </div>
        {posts.length === 0 ? (
          <div className="no-posts">문의 내역이 없습니다.</div>
        ) : (
          posts.map((post, index) => (
            <Link to={`/MyQuestion/${post.questionCode}`} key={index}>
              <div className="post">
                <span className="post-info-item">{post.questionType}</span>
                <h2 className="post-title">{post.questionTitle}</h2>
                <p className="post-username">
                  {sessionStorage.getItem('userName')}
                </p>
              </div>
            </Link>
          ))
        )}
      </section>
    </div>
  );
};

export default Inquiry;
