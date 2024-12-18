import React, { useEffect, useState } from 'react';
import './MyInquiry.css'; // 외부 스타일 시트 불러오기
import { Link } from 'react-router-dom'; // Link import 추가
import InquiryAside from '../Components/InquiryAside';
import axios from 'axios';

const MyInquiry = () => {
  const [posts, setPosts] = useState([]);
  const userCode = sessionStorage.getItem('userCode');
  const userName = sessionStorage.getItem('userName');

  // 환경 변수에서 API URL 가져오기
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/questions/${userCode}`);
        setPosts(response.data.reverse());
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [API_URL, userCode]);

  return (
      <div className="Inquiry-page">
        <InquiryAside />
        <div className="Inquiry-article">
          <h2>
            <div className="Inquiry-Maintitle">문의하기</div>
          </h2>
          <div className="InquiryMainImage"></div>
          <table className="Inquiry-table">
            <thead>
            <tr>
              <th>문의유형</th>
              <th>제목</th>
              <th>작성자</th>
              <th>등록일</th>
            </tr>
            </thead>
            <tbody>
            {posts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="no-posts">
                    문의 내역이 없습니다.
                  </td>
                </tr>
            ) : (
                posts.map((post, index) => (
                    <tr key={index}>
                      <td className="Inquiry-post-info-item">
                        {post.questionType}
                      </td>
                      <td className="Inquiry-post-title">
                        <Link to={`/MyQuestion/${post.questionCode}`}>
                          {post.questionTitle}
                        </Link>
                      </td>
                      <td className="Inquiry-post-content">{post.user.name}</td>
                      <td className="Inquiry-post-date">
                        {new Date(post.registerDate).toLocaleDateString()}
                      </td>
                    </tr>
                ))
            )}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default MyInquiry;
