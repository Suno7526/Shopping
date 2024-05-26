import React, { useState } from 'react';
import './QDelivery.css';

const QDelivery = () => {
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
        <h2 className="WithdrawETC-maintitle">배송</h2>
        <h2 className="WithdrawETC-maintitle2">질문</h2>
      </div>

      <div className="QDelivery-container">
        <div className="QDelivery-Q1-container">
          <div className="QDelivery-Q1" onClick={toggleDetails1}>
            배송 조회는 어떻게 하나요?
          </div>
          {showDetails1 && (
            <div className="QDelivery-Q1detail">
              <div className="QDelivery-Q1detailP">
                <strong>
                  배송조회 메뉴에서 배송진행 상황을 확인할 수 있습니다.
                </strong>
                <br />■ 배송조회 경로 <br />
                마이페이지 배송 중/픽업 대기 배송조회
                <br />
                <br />
                ※ 출고 후 송장 조회까지는 평일 기준 1일 소요됩니다. <br />※ 출고
                처리 중 (상품 포장 및 확인하는) 단계부터는 주소(옵션) 변경 및
                취소가 가능하지 않습니다.
              </div>
            </div>
          )}
        </div>

        <div className="QDelivery-Q2-container">
          <div className="QDelivery-Q2" onClick={toggleDetails2}>
            일반 배송 상품은 언제 배송 되나요?
          </div>
          {showDetails2 && (
            <div className="QDelivery-Q2detail">
              <div className="QDelivery-Q2detailP">
                <strong>
                  일반배송은 브랜드마다 일정이 다르고 평일 기준으로 출고 됩니다.
                  <br />
                  출고 일정은 상품의 상세페이지 출고 정보에서 확인 가능합니다.{' '}
                </strong>
                <br />
                <br />
                일반배송은 브랜드마다 일정이 다르고 평일 기준으로 출고 됩니다.{' '}
                <br />
                출고 일정은 상품의 상세페이지 출고 정보에서 확인 가능합니다.
                <br />
                <br />
                ※ 평일 기준 출고로 연휴 및 공휴일은 배송일에서 제외됩니다.
                <br />
                ※ 무신사스토어는 전 상품 100% 무료 배송입니다. <br />※ 배송 지연
                상품의 경우 상품명에 지연으로 아이콘이 표시됩니다. <br />
                ※ 출고 지연 발생 시에는 알림톡 또는 문자를 통해 안내해 드립니다.
                <br />
                ※ 주문 시 배송 메모에 배송 희망 일자를 작성하셔도 해당일에 지정
                배송은 어렵습니다.
                <br />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QDelivery;
