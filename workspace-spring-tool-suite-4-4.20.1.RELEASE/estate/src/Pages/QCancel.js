import React, { useState } from 'react';
import './QCancel.css';

const QCancel = () => {
  const [showDetails1, setShowDetails1] = useState(false);
  const [showDetails2, setShowDetails2] = useState(false);
  const [showDetails3, setShowDetails3] = useState(false);
  const [showDetails4, setShowDetails4] = useState(false);
  const [showDetails5, setShowDetails5] = useState(false);

  const toggleDetails1 = () => {
    setShowDetails1(!showDetails1);
  };

  const toggleDetails2 = () => {
    setShowDetails2(!showDetails2);
  };

  const toggleDetails3 = () => {
    setShowDetails3(!showDetails3);
  };

  const toggleDetails4 = () => {
    setShowDetails4(!showDetails4);
  };

  const toggleDetails5 = () => {
    setShowDetails5(!showDetails5);
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
        <div className="QCancel-Q3-container">
          <div className="QCancel-Q3" onClick={toggleDetails3}>
            교환/환불(반품) 비용은 무료인가요?
          </div>
          {showDetails3 && (
            <div className="QCancel-Q3detail">
              <div className="QCancel-Q3detailP">
                회원 사유의 반품 접수 시 교환/환불(반품) 배송비가 부과됩니다.
                <br></br>
                배송비는 환불(반품) 접수 시 차감, 교환의 경우 결제해 주셔야 반품
                접수가 정상적으로 완료됩니다. <br></br>
                <br></br>■ 반품 접수 시 주의 사항 - 제주/도서산간지역의 경우
                교환/환불 접수 시 제주/도서산간지역의 비용이 추가되어 배송비가
                안내됩니다. <br></br>- 제주/도서산간지역의 경우 반품 접수 이후
                회수 또는 교환 주소지 변경이 가능하지 않습니다. <br></br>-
                휴대전화 결제 또는 환불금액이 반품 배송비보다 적을 경우 반품
                접수 시 배송비를 결제해 주셔야 합니다. <br></br>- 안내서에
                배송비 동봉 등에 대한 내용이 있더라도, 동봉하면 안 됩니다.
                <br></br> - 해외 배송 상품일 경우 왕복 택배 비용 및 관세/통관
                비용을 부담해 주셔야 합니다. <br></br>- 브랜드 및 주문한 내용에
                따라 반품 배송비는 상품 각각 청구 될 수 있고 계약된 택배사가
                아닌 다른 택배사 이용 시 초과운임이 발생할 수 있습니다.{' '}
                <br></br>- 브랜드의 계약된 택배사로 반품 신규 접수 시 초과운임이
                발생되니 받으셨던 운송장 번호로 반품 접수해 주세요. <br></br>-
                반품비용은 상품별로 달라 주문 내역의 판매자 정보, 교환/환불 접수
                페이지 또는 각 상품 페이지 하단 교환/환불 안내에서 확인
                가능합니다.
              </div>
            </div>
          )}
        </div>
        <div className="QCancel-Q4-container">
          <div className="QCancel-Q4" onClick={toggleDetails4}>
            주문을 취소(옵션변경)를 하고 싶어요.
          </div>
          {showDetails4 && (
            <div className="QCancel-Q4detail">
              <div className="QCancel-Q4detailP">
                주문 후 주문 상태에 따라 마이페이지 > 주문/배송/픽업 조회에서
                즉시 취소 또는 취소 요청이 가능합니다.<br></br>
                <br></br> ■ 주문 상태별 취소 안내 <br></br>
                <br></br>- 입금 확인: 신청 즉시 주문이 취소되고, 사용한 적립금과
                쿠폰은 반환되어 재사용 가능합니다.<br></br> - 출고 처리중: 취소
                요청 승인 시 주문이 자동 취소됩니다. <br></br>
                <br></br>
                배송 준비가 완료된 경우 취소 요청이 거절될 수 있습니다.{' '}
                <br></br>
                <br></br>※ 가상 계좌 결제는 2일 이내 입금하지 않을 경우와 재고
                품절 시 주문은 자동으로 취소됩니다. <br></br>※ 반환된 쿠폰의
                유효기간이 만료된 경우 재사용이 가능하지 않습니다. <br></br>※
                옵션 변경의 경우 입금 확인 상태에서만 가능하며, 입금하지 않은
                주문의 옵션 변경을 원하는 경우 주문 취소 후 재주문해 주세요.
              </div>
            </div>
          )}
        </div>
        <div className="QCancel-Q5-container">
          <div className="QCancel-Q5" onClick={toggleDetails5}>
            반품접수는 어떻게 하나요?
          </div>
          {showDetails5 && (
            <div className="QCancel-Q5detail">
              <div className="QCancel-Q5detailP">
                교환(환불) 접수 시 선택했던 방법으로 반품 접수해 주세요.
                <br></br>
                <br></br> ■ 회수해 주세요 무신사 자동회수 서비스로 택배기사가
                요청한 회수지로 평일 기준 1일 ~ 3일 이내 방문합니다. <br></br>
                <br></br>※ 방문 전 택배 기사분이 연락 후 방문 예정이며,
                비대면으로 상품을 전달할 때는 반품 상자를 구분할 수 있도록 표시
                후 회수 장소에 보관해 주세요. <br></br>
                <br></br>■ 직접 보냈어요 상품을 받은 택배사와 같은 택배사로
                고객님께서 직접 반품 예약을 해주셔야 합니다. <br></br>상품 회수
                완료 시 반송장 정보를 입력해 주세요. <br></br>※ 계약된 택배사가
                아닌 다른 택배사 이용 시 추가 비용 발생할 수 있고 2개 이상의
                브랜드 반송 시, 각각 반송지로 보내주세요. <br></br>※ 안내서에
                배송비 동봉 등에 대한 내용이 있더라도, 동봉하면 안 됩니다.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QCancel;
