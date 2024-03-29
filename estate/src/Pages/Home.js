import React from 'react';
import axios from 'axios';
import Header from '../Components/Header';
import './Home.css'; // 외부  시트 불러오기
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLogin, setIsLogin] = useState(false); // 로그인 여부 관리

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
        <section>
          <div
            className="property-card"
            onClick={() => handleClickProduct(products.productCode)}
          >
            <img
              src={`http://localhost:8000/getProductImage/1`}
              alt="메인이미지"
              className="property-image"
            />
          </div>
        </section>

        <div id="recommended-properties">
          <h2>Best Iteam</h2>

          <div id="guides-properties">
            <div className="guides-section">
              {products.map((product) => (
                <div
                  className="guides-card"
                  data-rank={product.productCode}
                  key={product.productCode}
                >
                  <Link to={`/product/${product.productCode}`}>
                    <p>{product.productName}</p>
                    <img
                      src={`http://localhost:8000/getProductImage/${product.productCode}`}
                      alt={`코디 ${product.productCode}`}
                      className="property-image"
                      style={{ width: '100%', height: '100%' }}
                      onClick={() => handleClickProduct(product.productCode)}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
