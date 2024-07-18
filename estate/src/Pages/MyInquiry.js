import React, { useEffect, useState } from 'react';
import './MyInquiry.css'; // 외부 스타일 시트 불러오기
import { Link } from 'react-router-dom'; // Link import 추가
import InquiryAside from '../Components/InquiryAside';
import axios from 'axios';

const MyInquiry = () => {
  const [posts, setPosts] = useState([]);
  const userCode = sessionStorage.getItem('userCode');
  const userName = sessionStorage.getItem('userName');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/questions/${userCode}`,
        );
        setPosts(response.data.reverse());
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
      <div className="MyInquiry-board-main">
        <div className="MyInquiry-board-info">
          <span className="MyInquiry-board-info-type">문의 종류</span>
          <span className="MyInquiry-board-info-title">제목</span>
          <span className="MyInquiry-board-info-name">사용자이름</span>
        </div>
        {posts.length === 0 ? (
          <div className="no-posts">문의 내역이 없습니다.</div>
        ) : (
          posts.map((post, index) => (
            <Link to={`/MyQuestion/${post.questionCode}`} key={index}>
              <div className="MyInquiry-post" key={index}>
                <span className="MyInquiry-post-info-item">
                  {post.questionType}
                </span>
                <h2 className="MyInquiry-post-title">{post.questionTitle}</h2>
                <p className="MyInquiry-post-username">
                  {userName || 'Unknown'}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default MyInquiry;
