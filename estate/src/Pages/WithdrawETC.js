import React, { useState } from 'react';
import './WithdrawETC.css';

const WithdrawETC = () => {
  const [showDetails1, setShowDetails1] = useState(false);
  const [showDetails2, setShowDetails2] = useState(false);

  const toggleDetails1 = () => {
    setShowDetails1(!showDetails1);
  };

  const toggleDetails2 = () => {
    setShowDetails2(!showDetails2);
  };

  return (
    <div>
      <div className="maintitle-wrapper">
        <h2 className="Bestfaq-maintitle">자주 묻는 </h2>
        <h2 className="WithdrawETC-maintitle">탈퇴/기타</h2>
        <h2 className="WithdrawETC-maintitle2">질문</h2>
      </div>

      <div className="WithdrawETC-container">
        <div className="WithdrawETC-Q1-container">
          <div className="WithdrawETC-Q1" onClick={toggleDetails1}>
            회원 탈퇴는 어떻게 하나요?
          </div>
          {showDetails1 && (
            <div className="WithdrawETC-Q1detail">
              <div className="Q1detailP">
                <strong>
                  탈퇴는 마이페이지 내 정보 관리에서 직접 신청해 주셔야 합니다.
                </strong>
                <br />
                ■ 탈퇴 경로
                <br />
                모바일(앱/웹) : 마이페이지 내 정보 관리 오른쪽 위 톱니바퀴 회원
                정보 회원 탈퇴
                <br />
                PC(웹) : 마이페이지 회원정보 변경 회원 탈퇴
                <br />
                <br />
                ■ 회원 탈퇴 주의사항
                <br />
                - 진행 중인 주문 건이 있는 경우, 탈퇴가 가능하지 않습니다.
                <br />
                - 탈퇴 후 재가입 시 가입 혜택으로 제공되는 쿠폰 발급이 가능하지
                않습니다.
                <br />
                - 회원 탈퇴 시 무신사 페이 탈퇴, 솔드아웃 앱에서는 무신사
                아이디로 로그인이 가능하지 않습니다.
                <br />
                - 탈퇴 신청일로부터 5일 내 다시 로그인하면 탈퇴 신청이
                취소됩니다.
                <br />- 회원 탈퇴 시 동일한 휴대폰 명의로 재가입은 탈퇴 30일
                이후 가능합니다.
              </div>
            </div>
          )}
        </div>

        <div className="WithdrawETC-Q2-container">
          <div className="WithdrawETC-Q2" onClick={toggleDetails2}>
            두 번째 질문은 무엇인가요?
          </div>
          {showDetails2 && (
            <div className="WithdrawETC-Q2detail">
              <div className="Q2detailP">
                두 번째 질문에 대한 답변입니다.dafs <br />
                dakjsndaknsnjksnkjsnjdj
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithdrawETC;
