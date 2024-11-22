import React, { useState } from 'react';
import './QExchange.css';

const QExchange = () => {
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
        <h2 className="WithdrawETC-maintitle">교환/반품</h2>
        <h2 className="WithdrawETC-maintitle2">질문</h2>
      </div>

      <div className="QExchange-container">
        <div className="QExchange-Q1-container">
          <div className="QExchange-Q1" onClick={toggleDetails1}>
            포장(택배) 박스, 상품/상품 박스가 파손되어 배송됐어요.
          </div>
          {showDetails1 && (
            <div className="QExchange-Q1detail">
              <div className="QExchange-Q1detailP">
                <strong>
                  받아보신 포장(택배) 박스 및 상품/상품 박스가 파손된 상태로
                  배송이 되었나요?
                  <br />
                  아래 내용을 확인하여 1:1문의로 사진과 함께 남겨주세요.
                </strong>
                <br />
                ■ 포장(택배) 박스 / 상품 박스 / 상품
                <br />
                <br />
                1. 전체 사진
                <br />
                2. 파손된 부분의 사진
                <br />
                3. 받아보신 상품이 포장(택배) 박스에 담긴 상태의 사진
                <br />
                4. 송장이 정확하게 보이는 포장(택배) 박스 전체의 사진
                <br />
                <br />
                ※ 포장(택배) 박스, 제품 포장재, 상품 등을 받은 상태 그대로
                보관해 주세요.
                <br />※ 받아보신 상태 그대로를 보관하지 않을 경우, 파손 사고
                접수 확인이 어려울 수 있습니다.
              </div>
            </div>
          )}
        </div>

        <div className="QExchange-Q2-container">
          <div className="QExchange-Q2" onClick={toggleDetails2}>
            상품을 받았는데 교환하고 싶어요.
          </div>
          {showDetails2 && (
            <div className="QExchange-Q2detail">
              <div className="QExchange-Q2detailP">
                <strong>
                  교환은 배송 완료 일자 포함 7일 이내일 경우에만 주문/배송/픽업
                  조회에서 접수 가능합니다. <br />
                  (예시 : 3월 8일 상품을 받으신 경우 3월 14일까지 교환 접수
                  가능)
                </strong>
                <br />
                ■ 교환 접수 경로
                <br />
                모바일(앱/웹): 마이페이지 > 주문/배송/픽업 조회 > 교환 요청
                <br />
                PC(웹): 마이페이지 > 주문 내역 조회 > 교환 요청
                <br />
                1. 반품할 상품의 교환을 선택 해주세요. 2. 반품 방법을 선택해
                주세요. <br />- 회수해 주세요 : 무신사 자동회수 서비스로
                택배기사가 요청한 회수지로 평일 기준 1일 ~ 3일 이내 방문합니다.{' '}
                <br />- 직접 보냈어요 : 상품을 받은 택배사와 같은 택배사로 반품
                예약해야 합니다. <br />
                <br />※ 반송장 번호가 아직 없다면 반송장 정보는 '다음에
                등록하기'를 선택해 주세요. <br />
                <br />
                3. 교환 배송비를 선결제해야 합니다. 신용카드 또는 가상 계좌
                결제만 가능합니다. <br />
                4. 상품은 받아본 그대로 포장해서 반품해 주셔야 합니다. <br />
                <br />※ 회원님의 사유로 교환 진행중인 상품이 품절될 경우,
                반품비가 발생될 수 있고 이를 제외한 결제 금액이 환불 처리됩니다.
                <br />
              </div>
            </div>
          )}
        </div>

        <div className="QExchange-Q3-container">
          <div className="QExchange-Q3" onClick={toggleDetails3}>
            상품은 보냈는데 언제 교환상품이 배송 되나요?
          </div>
          {showDetails3 && (
            <div className="QExchange-Q3detail">
              <div className="QExchange-Q3detailP">
                교환 진행 과정은 아래 내용 참고해 주세요. <br></br>
                <br></br>■ 교환 진행 과정 상품 회수 > 반품 도착 > 검수 진행 >
                교환 상품 출고 <br></br>
                <br></br>※ 상품 회수 후 반품 도착까지 평일 기준 1일 ~ 2일
                소요됩니다. <br></br>※ 검수 기간은 평일 기준 1일 ~ 3일
                소요됩니다. <br></br>※ 교환 상품 출고 까지는 평일 기준 1일 ~ 3일
                소요됩니다. <br></br>※ 해외 배송 교환의 경우 평일 기준 2주 이상
                소요됩니다.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QExchange;
