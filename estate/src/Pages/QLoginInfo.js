import React, { useState } from 'react';
import './QLoginInfo.css';

const QLoginInfo = () => {
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
        <h2 className="WithdrawETC-maintitle">로그인/정보</h2>
        <h2 className="WithdrawETC-maintitle2">질문</h2>
      </div>

      <div className="QLoginInfo-container">
        <div className="QLoginInfo-Q1-container">
          <div className="QLoginInfo-Q1" onClick={toggleDetails1}>
            아이디와 비밀번호가 기억나지 않아요.
          </div>
          {showDetails1 && (
            <div className="QLoginInfo-Q1detail">
              <div className="QLoginInfo-Q1detailP">
                <strong>
                  로그인 화면에서 아이디 찾기/비밀번호 찾기를 통해 확인
                  가능합니다.
                  <br />
                  아이디 찾기는 아래 3가지 방법 중 하나로 진행해 주세요.
                </strong>
                <br />
                ■ 휴대전화
                <br />
                회원 정보에 등록된 본인의 휴대전화 번호를 인증하는 방법입니다.
                <br />
                ■ 이메일 <br />
                회원 정보에 등록된 본인의 이메일 주소를 인증하는 방법입니다.
                <br />
                ■ 본인인증
                <br />
                이용 중인 통신사와 휴대전화 번호를 인증하는 방법입니다.
              </div>
            </div>
          )}
        </div>

        <div className="QLoginInfo-Q2-container">
          <div className="QLoginInfo-Q2" onClick={toggleDetails2}>
            아이디 및 비밀번호를 변경할 수 있나요??
          </div>
          {showDetails2 && (
            <div className="QLoginInfo-Q2detail">
              <div className="QLoginInfo-Q2detailP">
                아이디는 변경이 가능하지 않지만 비밀번호는 변경 가능합니다.{' '}
                <br></br>
                <br></br>■ 비밀번호 변경 경로 모바일(앱/웹) : 마이페이지 > 내
                정보 관리 > 오른쪽 위 톱니바퀴 <br></br>
                <br></br>※ 탈퇴 후 재가입을 하더라도 동일한 아이디는 사용할 수
                없습니다. <br></br>※ 탈퇴 시 아이디를 제외한 모든 개인 정보는
                삭제 됩니다.
              </div>
            </div>
          )}
        </div>

        <div className="QLoginInfo-Q3-container">
          <div className="QLoginInfo-Q3" onClick={toggleDetails3}>
            회원 정보 수정은 어디서 하나요?
          </div>
          {showDetails3 && (
            <div className="QLoginInfo-Q3detail">
              <div className="QLoginInfo-Q3detailP">
                회원 정보 수정은 아래 경로로 직접 변경 가능합니다.<br></br>
                <br></br> ■ 회원 정보 수정 모바일(앱/웹) : 마이페이지 > 내 정보
                관리 > 오른쪽 위 톱니바퀴 ※ 원활한 주문 및 배송을 위해 회원
                정보를 정확하게 기재해 주세요.<br></br> ■ 이름 개명 시 수정
                모바일(앱/웹) : 마이페이지 > 내 정보 관리 > 오른쪽 위 톱니바퀴 >
                회원 정보 > 이름/휴대전화/생년월일 <br></br>
                <br></br>※ 개명한 이름이 NICE 평가 정보에 등록되어 있어야
                합니다.<br></br> ※ 본인인증을 통해 NICE 평가 정보 적용된
                이름(실명)을 기준으로 변경됩니다.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QLoginInfo;
