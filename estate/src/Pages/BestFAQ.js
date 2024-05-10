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
              <ul className="FAQcategory-list">
                <li className="FAQcategory-list-item">
                  <p>
                    <a className="makerdrop">배송</a>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <h4>교환/취소(반품)</h4>
        <div className="info-box">
          <div className="info-content">
            <div className="info-rectangle">
              <p>
                구매하신 상품의 가격이 내려간 경우, 일정 기간 내에 구매하신
                가격과 차이를 환불해드립니다. 환불 정책은 구매한 쇼핑몰 또는
                회사의 정책에 따라 달라질 수 있으니 해당 정책을 확인해주세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestFAQ;
