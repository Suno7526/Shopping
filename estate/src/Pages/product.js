import './Product.css'; // 외부 스타일 시트 불러오기
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Components/Header';
import { useParams } from 'react-router-dom';

const Product = () => {
  const { productCode } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getProduct/${productCode}`,
        );
        setProduct(response.data);
      } catch (error) {
        console.error('상품을 불러오는 중 오류 발생:', error);
      }
    };

    fetchProduct();
  }, [productCode]);

  // 등록 날짜를 년월일 형식으로 변환하는 함수
  const formatRegisterDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>

      {/* 메인 이미지 칸 */}
      <div className="container">
        <aside>
          <div className="property-card">
            <img
              src={`http://localhost:8000/getProductImage/${parseInt(
                product.productCode,
              )}`}
              alt={product.productName}
              className="property-image"
            />
          </div>
        </aside>

        <section id="description-card">
          <div className="description-card">
            <div className="grid-item">
              [제조사] 상품 명 : {product.productName}
            </div>
            <div className="grid-item">판매가 : {product.productPrice}</div>
            <div className="grid-item">제조사 : {product.companyName}</div>
            <div className="grid-item">SIZE : {product.productSize}</div>
            <div className="grid-item">상품 재고 : {product.productStuck}</div>
            <div className="grid-item">
              등록 날짜 : {formatRegisterDate(product.registerDate)}
            </div>
            <div className="grid-item">별점 : {product.userPoint}</div>

            {/* 버튼 추가 */}
            <div className="buttons">
              <button className="purchase-btn">구매하기</button>
              <button className="like-btn">찜하기</button>
              <button className="cart-btn">장바구니 담기</button>
            </div>
            <br></br>
          </div>
        </section>
      </div>
      <hr></hr>

      {/* 상품 재고 라인 */}
      <div class="product-container">
        <section>
          <div class="product-card">
            <div class="grid-item">상품 설명</div>
          </div>
        </section>
      </div>

      <div class="review">
        <section id="review">
          <div class="review-card">
            <div class="grid-item">상품 리뷰</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Product;