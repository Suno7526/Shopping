import React from 'react';
import axios from 'axios';
import './Home.css'; // 외부  시트 불러오기
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLogin, setIsLogin] = useState(false); // 로그인 여부 관리
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    'gardigun.jpg',
    'cocodi.jpg',
    'codi.jpg',
    'gardigun2.jpg',
    'cococodi.jpg',
    // Add more image URLs as needed
  ];

  /*이미지 좌우 이동을 위한 const*/
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleClickImage = () => {
    // 클릭한 이미지에 대한 추가 작업을 수행할 수 있습니다.
    console.log(`Clicked image index: ${currentIndex}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/getProducts');
        setProducts(response.data);
      } catch (error) {
        console.error('상품을 불러오는 중 오류 발생:', error);
      }
    };

    fetchProducts();

    // 로그인 여부 설정
    setIsLogin(sessionStorage.getItem('userEmail') !== null);
  }, []);

  useEffect(() => {
    console.log('로그인 되었나요?  ', isLogin);
  }, [isLogin]);

  const saveViewedProduct = async (userCode, productCode) => {
    try {
      await axios.post('http://localhost:8000/saveViewedProduct', {
        userCode: userCode,
        productCode: productCode,
      });
      console.log('상품을 성공적으로 저장했습니다.');
    } catch (error) {
      console.error('상품을 저장하는 중 오류 발생:', error);
    }
  };

  // 상품 클릭 시 호출되는 함수
  const handleClickProduct = (productCode) => {
    const userCode = sessionStorage.getItem('userCode');
    if (userCode) {
      saveViewedProduct(userCode, productCode);
    } else {
      console.log('사용자가 로그인되어 있지 않습니다.');
    }
  };

  return (
    <div>
      <div>
        {/* 메인 이미지 칸 */}
        <div className="one-item">Item 👑</div>
        <div className="property-section">
          <button onClick={goToPrevious} className="button-previous"></button>{' '}
          {/* 이전 이미지로 이동 버튼 */}
          <div
            className="property-card"
            onClick={handleClickImage} // 이미지를 클릭할 때의 이벤트 처리
          >
            <img
              src={images[currentIndex]}
              alt={`Property ${currentIndex}`}
              className="property-image"
            />
          </div>
          <button onClick={goToNext} className="button-next"></button>{' '}
          {/* 다음 이미지로 이동 버튼 */}
        </div>
      </div>

      <div id="recommended-properties">
        <div className="best-item">Best Item</div>
        <div className="sub-best-item">조회수가 높은 아이템 👍</div>

        <div id="guides-properties">
          <div className="guides-section">
            {products.map((product) => (
              <div
                className="guides-card"
                data-rank={product.productCode}
                key={product.productCode}
              >
                <Link to={`/product/${product.productCode}`}>
                  <img
                    src={`http://localhost:8000/getProductImage/${product.productCode}`}
                    alt={`코디 ${product.productCode}`}
                    className="property-image"
                    style={{
                      width: '12em',
                      height: '12em',
                    }} /* 100%으로 하지마셈 이미지가 가이드랑 같이 커짐*/
                    onClick={() => handleClickProduct(product.productCode)}
                  />
                </Link>

                <div className="product-info">
                  <p>
                    <strong>상품명:</strong> {product.productName}
                  </p>
                  <p>
                    <strong>설명:</strong> {product.description}
                  </p>
                  <p>
                    <strong>회사명:</strong> {product.company}
                  </p>
                  <p>
                    <strong>재고:</strong> {product.stock}
                  </p>
                  <p>
                    <strong>제품 크기:</strong> {product.size}
                  </p>
                  <p>
                    <strong></strong> ₩{product.price}
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
