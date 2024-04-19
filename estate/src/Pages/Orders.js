import React from 'react';
import './Mypage.css'; // 외부 스타일 시트 불러오기
import { Link } from 'react-router-dom'; // Link import 추가
import Aside from '../Components/Aside';

const Orders = () => {
  const orderHistory = [
    {
      id: 1,
      productImage: 'gardigun.jpg',
      orderDate: '2024-03-16',
      orderNumber: 'ORD001',
      orderAmount: '$50',
    },
    {
      id: 2,
      productImage: 'cocodi.jpg',
      orderDate: '2024-03-15',
      orderNumber: 'ORD002',
      orderAmount: '$80',
    },
    {
      id: 3,
      productImage: 'cococodi.jpg',
      orderDate: '2024-03-14',
      orderNumber: 'ORD003',
      orderAmount: '$120',
    },
  ];

  return (
    <div className="page">
      <Aside />
      <article>
        <h2>주문내역 조회</h2>
        <ul>
          <li>주문내역에 관한 내용</li>
        </ul>
      </article>
      <section>
        <table>
          <thead>
            <tr>
              <th>상품정보</th>
              <th>주문일자</th>
              <th>주문번호</th>
              <th>주문금액</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order) => (
              <tr key={order.id}>
                <td>
                  <img
                    src={order.productImage}
                    alt={order.productImage}
                    style={{ width: '100px', height: '100px' }}
                  />
                  <div>
                    <strong>브렌슨</strong>
                    <br />
                    [패키지] 원턱 와이드 트레이닝 팬츠
                    <br />
                    옵션 : 블랙 : M : 멜란지 M(+0)
                  </div>
                </td>
                <td>{order.orderDate}</td>
                <td>{order.orderNumber}</td>
                <td>{order.orderAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Orders;
