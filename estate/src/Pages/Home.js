import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const wrapperRef = useRef(null);
  const sliderRef = useRef(null);

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

  useEffect(() => {
    if (wrapperRef.current && sliderRef.current) {
      const offset =
        -(currentIndex * 320) + wrapperRef.current.clientWidth / 2 - 160;
      wrapperRef.current.style.transform = `translateX(${offset}px)`;
    }
  }, [currentIndex]);

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

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    // 페이지가 로드될 때나 products가 업데이트될 때 slick 슬라이더를 초기화합니다.
    if (wrapperRef.current) {
      wrapperRef.current.Slider(); // slick 슬라이더 초기화
    }
  }, [products]); // products 상태가 변경될 때마다 slick 슬라이더를 재설정합니다.

  return (
    <div>
      {/* 메인 이미지 섹션 */}
      <div>
        <div className="one-item">Item 👑</div>

        <Slider
          ref={sliderRef}
          className="Home-property-wrapper"
          slidesToShow={3}
          slidesToScroll={1}
          arrows={false}
          dots={true} // slick dot 활성화
          autoplay={true}
        >
          {products.map((product, index) => (
            <div key={product.productCode} className="property-card">
              <Link to={`/product/${product.productCode}`}>
                <img
                  src={`http://localhost:8000/getProductImage/${product.productCode}`}
                  alt={`Product ${index}`}
                  className="property-image" // 이미지의 클래스를 지정합니다.
                  onClick={() => handleClickProduct(product.productCode)}
                />
              </Link>
            </div>
          ))}
        </Slider>
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
                    style={{ width: '15em', height: '20em' }}
                    onClick={() => handleClickProduct(product.productCode)}
                  />
                </Link>

                <div className="product-info">
                  <p className="Home-companyname">
                    <strong>{product.companyName} </strong>
                  </p>
                  <br></br>
                  <p className="Home-productName">{product.productName}</p>
                  <p className="Home-price">
                    <strong> {product.productPrice} </strong>원
                  </p>
                  <p className="Home-views">
                    <strong>📈 Views: {product.viewCount}</strong>
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
