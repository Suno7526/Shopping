import React, { useState } from 'react';
import './QCancel.css';

const QCancel = () => {
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
        <h2 className="WithdrawETC-maintitle">취소/반품</h2>
        <h2 className="WithdrawETC-maintitle2">질문</h2>
      </div>

      <div className="QCancel-container">
        <div className="QCancel-Q1-container">
          <div className="QCancel-Q1" onClick={toggleDetails1}>
            반송장을 입력하라고 하는데, 반송장 입력 버튼이 보이지 않아요.
          </div>
          {showDetails1 && (
            <div className="QCancel-Q1detail">
              <div className="QCancel-Q1detailP">
                <strong>
                  교환/환불 요청 후 반송장 입력 버튼이 없는 경우는 브랜드에서
                  직접 반송장을 입력하는 경우입니다.
                </strong>
                <br />
                반송장 미입력으로 접수가 철회되더라도 반품이 도착한 후 최초
                요청하신 방안으로 주문 건이 처리됩니다. <br />
                혹시라도, 반송장 번호를 알고 계시다면 1:1문의를 통해 반송장
                번호를 남겨주시면 등록 도와드리겠습니다.
                <br />
                <br />※ "직접 보냈어요"의 경우 반품 회수 후 반송장 입력해
                주세요.
              </div>
            </div>
          )}
        </div>

        <div className="QCancel-Q2-container">
          <div className="QCancel-Q2" onClick={toggleDetails2}>
            교환(환불)이 어려운 경우가 있나요?
          </div>
          {showDetails2 && (
            <div className="QCancel-Q2detail">
              <div className="QCancel-Q2detailP">
                <img src="Image/Cancelimg.jpg" alt="Cancellation Image" />
                <strong>
                  아래 사유에 해당 되는 경우 교환(환불)이 가능하지 않습니다.
                </strong>
                <br />
                <br />
                ※ 신발의 경우 브랜드 박스 훼손 시 반품이 가능하지 않으니 받았던
                상태 그대로 이중으로 포장해 주세요.
                <br />
                ※ 제품에 사용 흔적, 오염, 세탁, 케이스(포장) 손상, 라벨 제거,
                사은품 사용 등의 경우 반품이 가능하지 않습니다.
                <br />
                ※ 속옷, 양말 등의 제품과 같이 개봉 후 제품의 가치가 현저히
                감소하는 경우 반품이 가능하지 않습니다.
                <br />※ 주문 제작 상품의 경우 회원님을 위한 제작 후 배송으로
                반품이 가능하지 않습니다.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QCancel;
