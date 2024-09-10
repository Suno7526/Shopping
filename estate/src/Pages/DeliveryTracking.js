import React, { useState, useEffect, useRef } from 'react';
import './DeliveryTracking.css';

const DeliveryTracking = () => {
  return (
    <div className="delivery-main">
      <div className="delivery-progress">
        <div className="delivery-title">배송조회</div>
        <div className="row">
          <div className="delivery-info-box">
            9/1(일) 도착 완료
            <br />
            고객님이 주문하신 상품이 배송완료 되었습니다.
          </div>
          <div className="delivery-item">
            <div className="order-complete">
              <img
                src="https://i.postimg.cc/NjYD95TV/Order-Complete.gif"
                alt="Icon 1"
              />
              <p>주문 완료</p> {/* Icon 1 설명 추가 */}
            </div>
          </div>
          <div className="delivery-line"></div> {/* 선을 추가할 공간 */}
          <div className="delivery-truck">
            <div className="icon">
              <img
                src="https://i.postimg.cc/X76cmp2J/Delivery-truck.gif"
                alt="Icon 2"
              />
              <p>배송 중</p> {/* Icon 2 설명 추가 */}
            </div>
          </div>
          <div className="delivery-line"></div> {/* 선을 추가할 공간 */}
          <div className="delivery-complete">
            <div className="icon">
              <img
                src="https://i.postimg.cc/fRBcV5Mt/delivery-completed.gif"
                alt="Icon 3"
              />
              <p>배송 완료</p> {/* Icon 3 설명 추가 */}
            </div>
          </div>
        </div>
        <div className="delivery-detail-row">
          <div className="invoice-box">
            <img
              className="invoice-box-img"
              src="https://i.postimg.cc/KYm8gj6p/8f9184626fb468c12cbd3a54f43cae95-t.jpg"
              alt="Icon 4"
            />
            <p>송장번호:</p> 1234-5678-9101
          </div>
          <div className="delivery-person-info-box">
            <p>받는 사람:</p> 홍길동 <p>받는 주소:</p> 서울시 강남구 역삼동
            123-45
            <br />
            <p>배송 요청 사항:</p> 문 앞에 놓아주세요 <p>상품 수령 방법:</p>{' '}
            직접 수령
          </div>
        </div>
        <div className="delivery-table">
          <table>
            <thead>
              <tr>
                <th>시간</th>
                <th>현재위치</th>
                <th>배송상태</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10:00 AM</td>
                <td>서울 물류센터</td>
                <td>출발</td>
              </tr>
              <tr>
                <td>01:00 PM</td>
                <td>서울 배송지</td>
                <td>배송완료</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="delivery-exchange-buttons">
          <button className="exchange-return">교환, 반품 신청</button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracking;
