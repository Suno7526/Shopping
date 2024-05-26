import React, { useState } from 'react';
import './QProduct.css';

const QProduct = () => {
  const [showDetails1, setShowDetails1] = useState(false);
  const [showDetails2, setShowDetails2] = useState(false);
  const [showDetails3, setShowDetails3] = useState(false);

  const toggleDetails1 = () => {
    setShowDetails1(!showDetails1);
  };

  const toggleDetails2 = () => {
    setShowDetails2(!showDetails2);
  };

  const toggleDetails3 = () => {
    setShowDetails3(!showDetails3);
  };

  return (
    <div>
      <div className="maintitle-wrapper">
        <h2 className="Bestfaq-maintitle">자주 묻는 </h2>
        <h2 className="WithdrawETC-maintitle">상품문의</h2>
        <h2 className="WithdrawETC-maintitle2">질문</h2>
      </div>

      <div className="QProduct-container">
        <div className="QProduct-Q1-container">
          <div className="QProduct-Q1" onClick={toggleDetails1}>
            구매했을 때 보다 가격이 떨어졌어요 차액 환불이 되나요?
          </div>
          {showDetails1 && (
            <div className="QProduct-Q1detail">
              <div className="QProduct-Q1detailP">
                <strong>
                  상품 금액은 온라인 판매처 특성상 유동적으로 변동될 수 있어
                  차액 환불은 가능하지 않습니다.
                </strong>
                <br />※ 판매 가격 변동으로 인한 교환(환불) 신청 시 반품 배송비는
                회원님 부담으로 진행됩니다. <br />※ 출고 처리중인 경우 취소는
                가능하지 않습니다.
              </div>
            </div>
          )}
        </div>

        <div className="QProduct-Q2-container">
          <div className="QProduct-Q2" onClick={toggleDetails2}>
            두 번째 질문은 무엇인가요?
          </div>
          {showDetails2 && (
            <div className="QProduct-Q2detail">
              <div className="QProduct-Q2detailP">
                두 번째 질문에 대한 답변입니다.dafs <br />
                dakjsndaknsnjksnkjsnjdj
              </div>
            </div>
          )}
        </div>

        <div className="QProduct-Q3-container">
          <div className="QProduct-Q3" onClick={toggleDetails3}>
            세 번째 질문은 무엇인가요?
          </div>
          {showDetails3 && (
            <div className="QProduct-Q3detail">
              <div className="QProduct-Q3detailP">
                세 번째 질문에 대한 답변입니다.dafs <br />
                으으으으으으아아아아ㅏ
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QProduct;
