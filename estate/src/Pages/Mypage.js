import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Mypage.css'; // 외부 스타일 시트 불러오기
import Aside from '../Components/Aside';
import { Link } from 'react-router-dom';

const Mypage = () => {
  const [ordersItems, setOrdersItems] = useState([]);
  const [reviews, setReviews] = useState({});

  // 사용자 주문 내역을 가져오는 함수
  const fetchOrders = async () => {
    try {
      const userCode = sessionStorage.getItem('userCode');
      // 사용자의 주문 내역을 가져오기 위해 요청을 보냅니다.
      const response = await axios.get(
        `http://localhost:8000/getOrdersProduct/${userCode}`,
      );
      // 가져온 주문 내역을 상태에 저장합니다.
      const orders = response.data.reverse();
      setOrdersItems(orders);

      // 각 주문에 대한 리뷰를 가져옵니다.
      const reviewsResponse = await Promise.all(
        orders.map((order) =>
          axios.get(
            `http://localhost:8000/getReviews/${order.product.productCode}`,
          ),
        ),
      );

      // 리뷰 데이터를 상태에 저장합니다.
      const reviewsData = {};
      reviewsResponse.forEach((res, index) => {
        const productCode = orders[index].product.productCode;
        reviewsData[productCode] = res.data;
      });

      setReviews(reviewsData);
    } catch (error) {
      console.error('주문 내역을 불러오는 중 오류 발생:', error);
    }
  };

  // 컴포넌트가 마운트될 때 주문 내역을 가져옵니다.
  useEffect(() => {
    fetchOrders();
  }, []);

  const formatRegisterDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="page">
      <Aside />
      <article>
        <h2>
          <div className="page-Maintitle">주문내역 조회</div>
        </h2>
      </article>
      <section className="OrderSection">
        <table className="OrderTable">
          <thead>
            <tr>
              <th className="ProductName">상품정보</th>
              <th className="ProductDate">주문일자</th>
              <th className="ProductNum">주문번호</th>
              <th className="ProductMoney">주문금액</th>
              <th className="ProductAD">배송주소</th>
              <th className="ReviewAction">리뷰등록</th>
            </tr>
          </thead>
          <tbody>
            {ordersItems.map((order) => (
              <tr key={order.orderCode}>
                <td className="PProductInfo">
                  <img
                    src={`http://localhost:8000/getProductImage/${order.product.productCode}`}
                    alt={order.product.productName}
                    style={{ width: '100px', height: '100px' }}
                  />
                  <strong>{order.product.productName}</strong> / SIZE :
                  {order.productSize} / Color : {order.productColor}
                  {order.product.productOption}
                  <div></div>
                </td>
                <td>{formatRegisterDate(order.orderDate)}</td>
                <td>{order.orderCode}</td>
                <td>{order.product.productPrice}원</td>
                <td>{order.shippingAddress}</td>
                <td>
                  {reviews[order.product.productCode] &&
                  reviews[order.product.productCode].length > 0 ? (
                    <span>이미 작성한 리뷰입니다.</span>
                  ) : (
                    <Link to={`/Review/${order.product.productCode}`}>
                      리뷰등록하기
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Mypage;
