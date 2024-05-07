import React, { useState } from 'react';
import './Question.css'; // 외부 스타일 시트 불러오기
import { Link } from 'react-router-dom'; // Link import 추가
import Aside from '../Components/Aside';

const Question = () => {
  // 버튼의 활성화 상태를 관리하는 useState 훅 사용
  const [activeButton, setActiveButton] = useState('');

  // 버튼 클릭 시 활성화 상태 업데이트하는 함수
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  // 전송 버튼 클릭 시 실행되는 함수
  const handleSubmit = () => {
    // 전송 로직 추가
    console.log('전송 버튼이 클릭되었습니다.');
  };

  return (
    <div className="page">
      <article>
        <h4>☎︎ 문의 하기</h4>
        <ul>
          <li>
            1:1 Q&A 제품 사용, 오염, 전용 박스 손상, 라벨 제거, 사은품 및 부속
            사용/분실 시, 교환/환불이 불가능 합니다.{' '}
          </li>
          <li>
            교환을 원하시는 상품(사이즈)의 재고가 부족 시, 교환이 불가합니다.{' '}
          </li>
          <li>
            고객님의 주문내역을 선택, 질문이 필요한 상품을 선택하시면 1:1상담이
            가능합니다.{' '}
          </li>
          <li>
            주문취소/교환/환불은 마이페이지주문내역에서 신청하실 수 있습니다.{' '}
          </li>
        </ul>
      </article>
      <form className="question-form">
        <div className="additional-buttons">
          {/* inquiryOptions 위에 Best FAQ 추가 */}
          <div className="best-faq">Best FAQ</div>
          문의유형
          <button
            onClick={() => handleButtonClick('배송')}
            className={activeButton === '배송' ? 'active' : ''}
          >
            배송
          </button>
          <button
            onClick={() => handleButtonClick('주문/결제')}
            className={activeButton === '주문/결제' ? 'active' : ''}
          >
            주문/결제
          </button>
          <button
            onClick={() => handleButtonClick('최소/교환/환불')}
            className={activeButton === '최소/교환/환불' ? 'active' : ''}
          >
            최소/교환/환불
          </button>
          <button
            onClick={() => handleButtonClick('회원정보')}
            className={activeButton === '회원정보' ? 'active' : ''}
          >
            회원정보
          </button>
          <button
            onClick={() => handleButtonClick('상품확인')}
            className={activeButton === '상품확인' ? 'active' : ''}
          >
            상품확인
          </button>
          <button
            onClick={() => handleButtonClick('서비스')}
            className={activeButton === '서비스' ? 'active' : ''}
          >
            서비스
          </button>
          {/* inquiryOptions 추가 */}
          <select id="inquiryOptions" name="inquiryOptions">
            <option value="">문의 유형을 선택하세요</option>
            <optgroup label="로그인/정보">
              <option value="아이디와 비밀번호가 기억나지 않아요.">
                아이디와 비밀번호가 기억나지 않아요.
              </option>
              <option value="회원 정보 수정은 어디서 하나요?">
                회원 정보 수정은 어디서 하나요?
              </option>
            </optgroup>
            <optgroup label="상품 문의">
              <option value="구매했을 때 보다 가격이 떨어졌어요 차액 환불이 되나요?">
                구매했을 때 보다 가격이 떨어졌어요 차액 환불이 되나요?
              </option>
              <option value="재고가 없어요. 언제쯤 구입할 수 있을까요?">
                재고가 없어요. 언제쯤 구입할 수 있을까요?
              </option>
            </optgroup>
            <optgroup label="결제수단">
              <option value="결제하는 방법에 따라 할인 이벤트가 있나요?">
                결제하는 방법에 따라 할인 이벤트가 있나요?
              </option>
              <option value="결제 방법에는 어떤 것들이 있나요?">
                결제 방법에는 어떤 것들이 있나요?
              </option>
            </optgroup>
            <optgroup label="주문">
              <option value="상품을 받는 주소(배송지) 등록은 어떻게 하나요?">
                상품을 받는 주소(배송지) 등록은 어떻게 하나요?
              </option>
              <option value="주문한 상품이 일부만 도착했어요.">
                주문한 상품이 일부만 도착했어요.
              </option>
            </optgroup>
            <optgroup label="배송 일반">
              <option value="일반 배송 상품은 언제 배송 되나요?">
                일반 배송 상품은 언제 배송 되나요?
              </option>
            </optgroup>
            <optgroup label="취소/반품(환불)">
              <option value="반품접수는 어떻게 하나요?">
                반품접수는 어떻게 하나요?
              </option>
            </optgroup>
          </select>
        </div>

        <div>
          <label htmlFor="message">메시지</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="quest"
          ></textarea>
        </div>
        {/* 전송 버튼의 type을 button으로 변경 */}
        <button type="button" onClick={handleSubmit}>
          전송
        </button>
      </form>
    </div>
  );
};

export default Question;
