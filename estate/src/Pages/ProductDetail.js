import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductDetail.css'; // 외부 스타일 시트 불러오기
import Header from '../Components/Header';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{product.productName}</h2>
      <p>설명: {product.infomation}</p>
      <p>가격: {product.productPrice}</p>
      <img
        src={`http://localhost:8000/getProductImage/${parseInt(
          product.productCode,
        )}`}
        alt={product.productName}
      />

      {/* 메인 이미지 칸 */}

      <div className="container">
        <aside>
          <div className="property-card">
            <img
              src={`http://localhost:8000/getProductImage/${parseInt(
                product.productCode,
              )}`}
              alt={product.productName}
            />
          </div>
        </aside>

        <section>
          <div className="description-card">
            <div className="grid-item">[제조사] 상품 명 - 상품</div>
            <div className="grid-item">판매가 -</div>
            <div className="grid-item">제조사 -</div>
            <div className="grid-item">SIZE -</div>
          </div>
        </section>
      </div>

      {/* 상품 이미지 밑 이름 라인 */}
      <div className="produtname">
        <section>
          <div className="produtname-card">
            <div className="item">
              <h2>[제조사] 상품 명 - 상품</h2>
            </div>
          </div>
        </section>
      </div>

      {/* 상품 재고 라인 */}
      <div className="product-container">
        <section>
          <div className="product-card">
            <div className="grid-item">상품 설명</div>
            <div className="grid-item">상품 재고</div>
            <div className="grid-item">등록 날짜</div>
          </div>
        </section>
      </div>

      <footer>
        <p>© 기타 문의 바람.</p>
      </footer>
    </div>
  );
};

export default ProductDetail;
