import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Mypage.css'; // 외부 스타일 시트 불러오기
import Aside from '../Components/Aside';
import { Link } from 'react-router-dom';

const Mypage = () => {
  const [ordersItems, setOrdersItems] = useState([]);
  const [reviews, setReviews] = useState({});
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [refundReason, setRefundReason] = useState('');
  const [detailedReason, setDetailedReason] = useState('');

  // 환경 변수에서 API URL 가져오기
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchOrders = async () => {
    try {
      const userCode = sessionStorage.getItem('userCode');
      const response = await axios.get(
          `${API_URL}/getOrdersProduct/${userCode}`,
      );
      const orders = response.data.reverse();
      setOrdersItems(orders);

      const reviewsResponse = await Promise.all(
          orders.map((order) =>
              axios.get(
                  `${API_URL}/getReviews/${order.product.productCode}`,
              ),
          ),
      );

      const reviewsData = {};
      reviewsResponse.forEach((res, index) => {
        const productCode = orders[index].product.productCode;
        reviewsData[productCode] = res.data;
      });

      setReviews(reviewsData);

      const recommendedResponse = await axios.get(
          `${API_URL}/recommendProducts/${userCode}`,
      );
      setRecommendedProducts(recommendedResponse.data);
    } catch (error) {
      console.error('주문 내역을 불러오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [API_URL]);

  const formatRegisterDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const openRefundForm = (order) => {
    setSelectedOrder(order.orderCode);
    setRefundReason('');
    setDetailedReason('');
  };

  const closeRefundForm = () => {
    setSelectedOrder(null);
    setRefundReason('');
    setDetailedReason('');
  };

  const handleRefundSubmit = async (orderCode) => {
    try {
      const updatedOrder = {
        refundReason: detailedReason,
        refundState: '승인 대기중',
      };

      await axios.put(
          `${API_URL}/updateOrder/${orderCode}`,
          updatedOrder,
      );

      // 주문 내역 다시 불러오기
      fetchOrders();
      closeRefundForm();
    } catch (error) {
      console.error('환불 사유 업데이트 중 오류 발생:', error);
    }
  };

  return (
      <div className="Mypage">
        <Aside />
        <article className="Mypage-article">
          <h2>
            <div className="Mypage-Maintitle">주문내역 조회</div>
          </h2>
          <div className="Mypage-MainImage"></div>
        </article>
        <section className="OrderSection">
          {ordersItems.length === 0 ? (
              <div className="no-orders">주문 내역이 없습니다.</div>
          ) : (
              <table className="OrderTable">
                <thead>
                <tr>
                  <th className="ProductName">상품정보</th>
                  <th className="ProductDate">주문일자</th>
                  <th className="ProductNum">주문번호</th>
                  <th className="ProductMoney">배송현황</th>
                  <th className="ProductAD">배송주소</th>
                  <th className="OrderRefund">환불상태</th>
                  <th className="ReviewAction">리뷰등록</th>
                </tr>
                </thead>
                <tbody>
                {ordersItems.map((order) => (
                    <React.Fragment key={order.orderCode}>
                      <tr>
                        <td
                            className="PProductInfo"
                            style={{ width: '300px', height: '100px' }}
                        >
                          <Link to={`/product/${order.product.productCode}`}>
                            <img
                                src={`${API_URL}/getProductImage/${order.product.productCode}`}
                                alt={order.product.productName}
                                style={{ width: '100px', height: '100px' }}
                            />
                          </Link>
                          {order.product.companyName}
                          <br />
                          {order.product.productName}
                          <br />
                          SIZE :{order.productSize}
                          <br />
                          Color : {order.productColor}
                        </td>
                        <td style={{ width: '200px' }}>
                          {formatRegisterDate(order.orderDate)}
                        </td>
                        <td style={{ width: '100px' }}>{order.orderCode}</td>
                        <td style={{ width: '100px' }}>
                          {order.orderStatus}
                          <tr></tr>
                          <Link to={`/DeliveryTracking/${order.orderCode}`}>
                            배송조회
                          </Link>
                        </td>
                        <td style={{ width: '500px' }}>{order.shippingAddress}</td>
                        <td style={{ width: '120px' }}>
                          {order.refundState === '신청 전' ? (
                              <span
                                  className="RefundButton"
                                  onClick={() => openRefundForm(order)}
                              >
                          환불 신청
                        </span>
                          ) : (
                              order.refundState
                          )}
                        </td>
                        <td>
                          {order.reviewCheck ? (
                              <span>이미 작성한 리뷰입니다.</span>
                          ) : (
                              <Link to={`/Review/${order.orderCode}`}>
                                리뷰등록하기
                              </Link>
                          )}
                        </td>
                      </tr>
                      {selectedOrder === order.orderCode && (
                          <tr>
                            <td colSpan="7">
                              <div className="RefundForm">
                                <h2>환불 사유 선택</h2>
                                <select
                                    value={refundReason}
                                    onChange={(e) => setRefundReason(e.target.value)}
                                >
                                  <option value="">환불 사유를 선택하세요</option>
                                  <option value="상품 불량">상품 불량</option>
                                  <option value="배송 지연">배송 지연</option>
                                  <option value="변심">변심</option>
                                </select>
                                <textarea
                                    value={detailedReason}
                                    onChange={(e) => setDetailedReason(e.target.value)}
                                    placeholder="상세한 이유를 적어주세요"
                                ></textarea>
                                <button
                                    onClick={() => handleRefundSubmit(order.orderCode)}
                                >
                                  제출
                                </button>
                                <button onClick={closeRefundForm}>취소</button>
                              </div>
                            </td>
                          </tr>
                      )}
                    </React.Fragment>
                ))}
                </tbody>
              </table>
          )}
        </section>

        <div className="RecommendedItem">
          {recommendedProducts.length === 0 ? (
              <div className="no-recommended-products">추천 상품이 없습니다.</div>
          ) : (
              <span>추천 상품</span>
          )}
        </div>
        <div className="RecommendedSection">
          <div className="RecommendedProducts">
            {recommendedProducts.map((product) => (
                <div key={product.productCode} className="RecommendedProductCard">
                  <Link to={`/product/${product.productCode}`}>
                    <img
                        className="RecommendedImage"
                        src={`${API_URL}/getProductImage/${product.productCode}`}
                        alt={product.productName}
                    />
                  </Link>
                  <p>{product.companyName}</p>
                  <p>{product.productName}</p>
                  <p className="MypageRecommended-P">{product.productPrice}원</p>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Mypage;
