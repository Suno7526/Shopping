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
            두 번째 질문은 무엇인가요?
          </div>
          {showDetails2 && (
            <div className="QLoginInfo-Q2detail">
              <div className="QLoginInfo-Q2detailP">
                두 번째 질문에 대한 답변입니다.dafs <br />
                dakjsndaknsnjksnkjsnjdj
              </div>
            </div>
          )}
        </div>

        <div className="QLoginInfo-Q3-container">
          <div className="QLoginInfo-Q3" onClick={toggleDetails3}>
            세 번째 질문은 무엇인가요?
          </div>
          {showDetails3 && (
            <div className="QLoginInfo-Q3detail">
              <div className="QLoginInfo-Q3detailP">
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

export default QLoginInfo;
