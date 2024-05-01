import React, { useEffect, useState } from 'react';
import './Inquiry.css'; // 외부 스타일 시트 불러오기
import { Link } from 'react-router-dom'; // Link import 추가
import InquiryAside from '../Components/InquiryAside';
import axios from 'axios';

const Question = () => {
  const [posts, setPosts] = useState([
    { title: '첫 번째 게시글', username: '홍길동' },
    { title: '두 번째 게시글', username: '사용자이름1' },
    { title: '세 번째 게시글', username: '사용자이름2' },
  ]);

  return (
    <div className="page">
      <InquiryAside />
      <article>
        <h4>☎︎ 문의 하기</h4>
        <ul>
          <li>Q&A 문의 게시판입니다. </li>
        </ul>
      </article>
      <div className="main">
        <div className="board-info">
          <span className="board-info-item">문의 종류</span>
          <span className="board-info-item">제목</span>
          <span className="board-info-item">사용자 이름</span>
        </div>
        {posts.map((post, index) => (
          <div className="post" key={index}>
            <span className="post-info-item">{index + 1}</span>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-username">{post.username}</p>
            {/* 사용자 이름은 Unknown으로 설정 */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
