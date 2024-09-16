import React, { useState, useEffect } from 'react';
import './DeliveryTracking.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DeliveryTracking = () => {
  const { orderCode } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getOrder/${orderCode}`,
        );
        setOrder(response.data); // response.data로 변경하여 실제 데이터 설정
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, [orderCode]); // 의존성 배열에 orderCode 추가

  // 로딩 상태 처리 및 데이터가 없을 때 대비
  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="delivery-main">
      <div className="delivery-progress">
        <div className="delivery-title">배송조회</div>
        <div className="row">
          <div className="delivery-info-box">
            {order.orderDate} 도착 예정
            <br />
            {order.deliveryStatus === '배송완료'
              ? '고객님이 주문하신 상품이 배송완료 되었습니다.'
              : '고객님이 주문하신 상품이 배송 중입니다.'}
          </div>
          <div className="delivery-item">
            <div className="order-complete">
              <img
                src="https://i.postimg.cc/NjYD95TV/Order-Complete.gif"
                alt="Icon 1"
              />
              <p>주문 완료</p>
            </div>
          </div>
          <div className="delivery-line"></div>
          <div className="delivery-truck">
            <div className="icon">
              <img
                src="https://i.postimg.cc/X76cmp2J/Delivery-truck.gif"
                alt="Icon 2"
              />
              <p>배송 중</p>
            </div>
          </div>
          <div className="delivery-line"></div>
          <div className="delivery-complete">
            <div className="icon">
              <img
                src="https://i.postimg.cc/fRBcV5Mt/delivery-completed.gif"
                alt="Icon 3"
              />
              <p>배송 완료</p>
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
            <p>송장번호:</p> {order.orderDate}
          </div>
          <div className="delivery-person-info-box">
            <p>받는 사람:</p> {order.user.name}
            <p>받는 주소:</p> {order.shippingAddress}
            <br />
            <p>배송 요청 사항:</p> {order.request}
            <p>상품 수령 방법:</p> 직접수령
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
