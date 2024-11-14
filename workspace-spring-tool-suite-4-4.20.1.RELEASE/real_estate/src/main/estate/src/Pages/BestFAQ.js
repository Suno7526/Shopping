import React from 'react';
import { Link } from 'react-router-dom'; // React Router에서 Link 가져오기
import './BestFAQ.css';

const BestFAQ = () => {
  return (
    <div>
      <h2 className="Bestfaq-maintitle">궁금한 질문을 선택해주세요.</h2>
      <div className="Bestfaq-wrapper">
        <div className="info-box">
          <div className="info-content">
            <Link to="/WithdrawETC" className="info-rectangle">
              <ul className="FAQcategory-list">탈퇴/기타</ul>
            </Link>
            <Link to="/QLoginInfo" className="info-rectangle">
              <ul className="FAQcategory-list">로그인/정보</ul>
            </Link>
            <Link to="/QProduct" className="info-rectangle">
              <ul className="FAQcategory-list">상품 문의</ul>
            </Link>
          </div>
          <div className="info-content">
            <Link to="/QDelivery" className="info-rectangle">
              <ul className="FAQcategory-list">배송</ul>
            </Link>
            <Link to="/QCancel" className="info-rectangle">
              <ul className="FAQcategory-list">취소/환불</ul>
            </Link>
            <Link to="/QExchange" className="info-rectangle">
              <ul className="FAQcategory-list">교환/반품</ul>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestFAQ;
