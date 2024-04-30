import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/getProducts');
        const sortedProducts = response.data.sort(
          (a, b) => b.viewCount - a.viewCount,
        );
        setProducts(sortedProducts);
      } catch (error) {
        console.error('상품을 불러오는 중 오류 발생:', error);
      }
    };

    fetchProducts();

    setIsLogin(sessionStorage.getItem('userEmail') !== null);
  }, []);

  const saveViewedProduct = async (userCode, productCode) => {
    try {
      await axios.post('http://localhost:8000/saveViewedProduct', {
        userCode,
        productCode,
      });
    } catch (error) {
      console.error('상품을 저장하는 중 오류 발생:', error);
    }
  };

  const handleClickProduct = (productCode) => {
    const userCode = sessionStorage.getItem('userCode');
    if (userCode) {
      saveViewedProduct(userCode, productCode);
    } else {
      console.log('사용자가 로그인되어 있지 않습니다.');
    }
  };

  const goToPrevious = () => {
    if (products.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? products.length - 1 : prevIndex - 1,
      );
    }
  };

  const goToNext = () => {
    if (products.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === products.length - 1 ? 0 : prevIndex + 1,
      );
    }
  };

  return (
    <div>
      {/* 메인 이미지 섹션 */}
      <div>
        <div className="one-item">Item 👑</div>
        <div className="property-section">
          <button onClick={goToPrevious} className="button-previous"></button>{' '}
          {/* 이전 이미지로 이동 버튼 */}
          {products.length > 0 && (
            <div className="property-card">
              {/* products 배열이 비어있지 않을 때 현재 인덱스의 productCode를 사용하여 이미지 렌더링 */}
              <Link to={`/product/${products[currentIndex].productCode}`}>
                <img
                  src={`http://localhost:8000/getProductImage/${products[currentIndex].productCode}`}
                  alt={`Product ${currentIndex}`}
                  className="property-image"
                  onClick={() =>
                    handleClickProduct(products[currentIndex].productCode)
                  }
                />
              </Link>
            </div>
          )}
          <button onClick={goToNext} className="button-next"></button>{' '}
          {/* 다음 이미지로 이동 버튼 */}
        </div>
      </div>

      {/* 추천 상품 섹션 */}
      <div id="recommended-properties">
        <div className="best-item">Best Item</div>
        <div className="sub-best-item">조회수가 높은 아이템 👍</div>

        <div id="guides-properties">
          <div className="guides-section">
            {products.map((product, index) => (
              <div
                className="guides-card"
                data-rank={index + 1}
                key={product.productCode}
              >
                <Link to={`/product/${product.productCode}`}>
                  <img
                    src={`http://localhost:8000/getProductImage/${product.productCode}`}
                    alt={`코디 ${product.productCode}`}
                    className="property-image"
                    style={{ width: '12em', height: '12em' }}
                    onClick={() => handleClickProduct(product.productCode)}
                  />
                </Link>

                <div className="product-info">
                  <p>
                    <strong>상품명:</strong> {product.productName}
                  </p>
                  <p>
                    <strong>설명:</strong> {product.information}
                  </p>
                  <p>
                    <strong>회사명:</strong> {product.companyName}
                  </p>
                  <p>
                    <strong>재고:</strong> {product.productStuck}
                  </p>
                  <p>
                    <strong>제품 크기:</strong> {product.productSize}
                  </p>
                  <p>
                    <strong>가격:</strong> ₩{product.productPrice}
                  </p>
                  <p>
                    <strong>조회수:</strong> {product.viewCount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
