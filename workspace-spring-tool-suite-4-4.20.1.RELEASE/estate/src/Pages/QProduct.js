import React, { useState } from 'react';
import './QProduct.css';

const QProduct = () => {
  const [showDetails1, setShowDetails1] = useState(false);
  const [showDetails2, setShowDetails2] = useState(false);
  const [showDetails3, setShowDetails3] = useState(false);
  const [showDetails4, setShowDetails4] = useState(false);

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
            재고가 없어요. 언제쯤 구입할 수 있을까요?
          </div>
          {showDetails2 && (
            <div className="QProduct-Q2detail">
              <div className="QProduct-Q2detailP">
                품절 상품 재입고 여부 및 일정은 정확한 확인이 가능하지 않지만
                재입고 알림을 등록하면 알림톡으로 확인 할 수 있습니다.<br></br>
                <br></br> 알림 신청 방법은 아래내용을 확인해 주세요.<br></br>
                <br></br> ■ 재입고 알림 신청 모바일(앱) : 상품 선택 > 구매하기 >
                재입고 알림 받기 선택 <br></br>※ 재입고 알림 신청은 APP에서만
                신청이 가능합니다. <br></br>※ 재고 입고 수량에서 요청순서에 따라
                순차적으로 발송 됩니다.<br></br>※ 재입고 알림 버튼이 보이지
                않거나 재입고 관련 상세확인은 상품 페이지의 상품문의를 이용해
                주세요.
              </div>
            </div>
          )}
        </div>

        <div className="QProduct-Q3-container">
          <div className="QProduct-Q3" onClick={toggleDetails3}>
            상품 문의는 어떻게 작성하나요?
          </div>
          {showDetails3 && (
            <div className="QProduct-Q3detail">
              <div className="QProduct-Q3detailP">
                문의 하는 상품의 상세 페이지 > 하단의 상품 문의 목록에서 작성할
                수 있습니다. <br></br>
                <br></br>※ 재입고, 사이즈, 배송 등 상품과 관련된 문의를 할 수
                있습니다. <br></br>※ 상품과 관련 없는 욕설, 비방, 회원 간 거래
                글, 명예훼손, 타 쇼핑몰 언급, 허위사실 유포, 광고성 등의 문의는
                숨김 처리됩니다. <br></br>※ 주문번호, 연락처, 계좌번호, 주소지
                등 개인 정보는 노출 되지 않도록 반드시 비밀글로 문의해 주세요.{' '}
                <br></br>※ 개인정보 노출된 공개 글은 비밀글로 전환될 수 있고,
                개인 정보 노출로 인한 피해는 무신사 스토어가 책임지지 않습니다.
              </div>
            </div>
          )}
        </div>

        <div className="QProduct-Q4-container">
          <div className="QProduct-Q4" onClick={toggleDetails4}>
            상품 문의 작성 후 수정, 삭제할 수 있나요?
          </div>
          {showDetails4 && (
            <div className="QProduct-Q4detail">
              <div className="QProduct-Q4detailP">
                마이페이지 > 상품 문의에서 답변대기 상태에서만 수정 및 삭제
                가능합니다. <br></br>
                <br></br>■ 수정 및 삭제 경로 마이페이지 > 상품 문의 > 해당문의
                위에 수정 또는 삭제 선택
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QProduct;
