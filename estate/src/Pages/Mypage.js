import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Mypage.css'; // 외부 스타일 시트 불러오기
import Aside from '../Components/Aside';
import { Link } from 'react-router-dom';

const Mypage = () => {
  const [ordersItems, setOrdersItems] = useState([]);
  const [reviews, setReviews] = useState({});
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  // 사용자 주문 내역을 가져오는 함수
  const fetchOrders = async () => {
    try {
      const userCode = sessionStorage.getItem('userCode');
      const response = await axios.get(
        `http://localhost:8000/getOrdersProduct/${userCode}`,
      );
      const orders = response.data.reverse();
      setOrdersItems(orders);

      const reviewsResponse = await Promise.all(
        orders.map((order) =>
          axios.get(
            `http://localhost:8000/getReviews/${order.product.productCode}`,
          ),
        ),
      );

      const reviewsData = {};
      reviewsResponse.forEach((res, index) => {
        const productCode = orders[index].product.productCode;
        reviewsData[productCode] = res.data;
      });

      setReviews(reviewsData);

      // 추천 상품 가져오기
      const recommendedResponse = await axios.get(
        `http://localhost:8000/recommendProducts/${userCode}`,
      );
      setRecommendedProducts(recommendedResponse.data);
    } catch (error) {
      console.error('주문 내역을 불러오는 중 오류 발생:', error);
    }
  };

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
    <div className="Mypage-page">
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
                <th className="ReviewAction">리뷰등록</th>
              </tr>
            </thead>
            <tbody>
              {ordersItems.map((order) => (
                <tr key={order.orderCode}>
                  <td className="PProductInfo">
                    <Link to={`/product/${order.product.productCode}`}>
                      <img
                        src={`http://localhost:8000/getProductImage/${order.product.productCode}`}
                        alt={order.product.productName}
                        style={{ width: '100px', height: '100px' }}
                      />
                    </Link>
                    <strong>{order.product.productName}</strong> / SIZE :
                    {order.productSize} / Color : {order.productColor}
                    {order.product.productOption}
                    <div></div>
                  </td>
                  <td>{formatRegisterDate(order.orderDate)}</td>
                  <td>{order.orderCode}</td>
                  <td>{order.orderStatus}</td>
                  <td>{order.shippingAddress}</td>
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
              <img
                className="RecommendedImage"
                src={`http://localhost:8000/getProductImage/${product.productCode}`}
                alt={product.productName}
              />
              <div className="MypageRecommended-productname">
                {product.productName}
              </div>
              <p className="MypageRecommended-P">{product.productPrice}원</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
