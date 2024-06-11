import React from 'react';
import { Link } from 'react-router-dom'; // Link import 추가
import './InquiryAside.css'; // 외부 스타일 시트 불러오기

const InquiryAside = () => {
  return (
    <div>
      <aside className="Inquiry-sidebar">
        <div className="Inquiry-sidebar-header">PASS</div>
        <nav className="Inquiry-sidebar-Buttons">
          <Link to="/Question" className="QuestionButton-div">
            <button className="QuestionButton">✉️ 문의하기</button>
          </Link>{' '}
          <Link to="/Inquiry" className="InquiryButton-div">
            <button className="InquiryButton">🗂️ 전체 문의내역</button>
          </Link>{' '}
          <Link to="/MyInquiry" className="MyInquiryButton-div">
            <button className="MyInquiryButton">📨 나의 문의내역</button>
          </Link>{' '}
          <Link to="/BestFAQ" className="BestFAQButton-div">
            <button className="BestFAQButton">💬 자주하는 질문</button>
          </Link>{' '}
        </nav>
      </aside>
    </div>
  );
};

export default InquiryAside;
