import React from 'react';
import './BestFAQ.css';

const BestFAQ = () => {
  return (
    <div>
      <h2 className="Bestfaq-maintitle">자주 묻는 질문</h2>
      <div className="wrapper">
        <div className="info-box">
          <div className="info-content">
            <div className="info-rectangle">
              <ul className="FAQcategory-list">탈퇴/기타</ul>
            </div>
            <div className="info-rectangle">
              <ul className="FAQcategory-list">로그인/정보</ul>
            </div>
            <div className="info-rectangle">
              <ul className="FAQcategory-list">상품 문의</ul>
            </div>
          </div>
          <div className="info-content">
            <div className="info-rectangle">
              <ul className="FAQcategory-list">배송</ul>
            </div>
            <div className="info-rectangle">
              <ul className="FAQcategory-list">취소/환불</ul>
            </div>
            <div className="info-rectangle">
              <ul className="FAQcategory-list">교환/반품</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestFAQ;
