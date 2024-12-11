import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(8); // 초기 표시 제품 수
  const [sortOption, setSortOption] = useState('viewCount'); // 초기 정렬 옵션을 조회수순으로 설정
  const wrapperRef = useRef(null);
  const sliderRef = useRef(null);

  // 환경 변수에서 API URL을 직접 가져옵니다.
  const API_URL = process.env.REACT_APP_API_URL; // 'http://localhost:8000' 또는 다른 URL
  console.log(API_URL);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // API_URL을 직접 사용하여 요청
        const response = await axios.get(`${API_URL}/getProducts`);
        setProducts(response.data);
      } catch (error) {
        console.error('상품을 불러오는 중 오류 발생:', error);
      }
    };

    fetchProducts();

    setIsLogin(sessionStorage.getItem('userEmail') !== null);
  }, [API_URL]); // API_URL이 변경되면 다시 실행

  useEffect(() => {
    if (wrapperRef.current && sliderRef.current) {
      const offset =
          -(currentIndex * 320) + wrapperRef.current.clientWidth / 2 - 160;
      wrapperRef.current.style.transform = `translateX(${offset}px)`;
    }
  }, [currentIndex]);

  const saveViewedProduct = async (userCode, productCode) => {
    try {
      await axios.post(`${API_URL}/saveViewedProduct`, {
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
    if (wrapperRef.current) {
      wrapperRef.current.Slider();
    }
  }, [products]);

  const loadMoreProducts = () => {
    setVisibleProducts((prevVisible) => prevVisible + 8);
  };

  // 제품을 정렬하는 함수
  const sortProducts = (option) => {
    let sortedProducts = [...products];
    switch (option) {
      case 'viewCount':
        sortedProducts.sort((a, b) => b.viewCount - a.viewCount); // 조회수순으로 정렬
        break;
      case 'lowPrice':
        sortedProducts.sort((a, b) => a.productPrice - b.productPrice); // 낮은 가격순으로 정렬
        break;
      case 'highPrice':
        sortedProducts.sort((a, b) => b.productPrice - a.productPrice); // 높은 가격순으로 정렬
        break;
      default:
        break;
    }
    return sortedProducts;
  };

  return (
      <div>
        <div className="Home-text">
          <h1>New Items</h1>
        </div>
        <div>
          <Slider
              ref={sliderRef}
              className="Home-property-wrapper"
              slidesToShow={5}
              slidesToScroll={1}
              arrows={false}
              dots={true}
              autoplay={true}
              centerMode={false}
              centerPadding="0px"
          >
            {products
                .sort((a, b) => new Date(b.registerDate) - new Date(a.registerDate)) // 최신순 정렬
                .slice(0, 10) // 슬라이더에 표시할 10개 항목 선택
                .map((product, index) => (
                    <div key={product.productCode} className="Home-property-wrapper">
                      <Link to={`/product/${product.productCode}`}>
                        <img
                            src={`${API_URL}/getProductImage/${product.productCode}`}
                            alt={`Product ${index}`}
                            className="property-image"
                            onClick={() => handleClickProduct(product.productCode)}
                        />
                      </Link>
                    </div>
                ))}
          </Slider>
        </div>


        <div className="Home-text">
          <h1 className="Home-text-Products">Products</h1>
          <div className="sort-options">
            <button onClick={() => setSortOption('viewCount')}>조회수순</button>
            <button onClick={() => setSortOption('lowPrice')}>낮은 가격순</button>
            <button onClick={() => setSortOption('highPrice')}>높은 가격순</button>
          </div>
          <div className="product-list">
            {sortProducts(sortOption)
                .slice(0, visibleProducts)
                .map((product) => (
                    <div className="product-wrapper" key={product.productCode}>
                      <Link
                          to={`/product/${product.productCode}`}
                          className="product"
                          onClick={() => handleClickProduct(product.productCode)}
                      >
                        <img
                            src={`${API_URL}/getProductImage/${product.productCode}`}
                            alt={product.productName}
                        />
                      </Link>
                      <div>{product.companyName}</div>
                      <div className="product-name">{product.productName}</div>
                      <div className="product-price">{product.productPrice}</div>
                      <div className="Category-viewCount">
                        <img
                            src="https://i.postimg.cc/XNRxQKLY/download.png"
                            className="views-icon"
                            alt="조회수"
                        />
                        {product.viewCount}
                      </div>
                    </div>
                ))}
            {products.length > visibleProducts && (
                <button className="load-more-button" onClick={loadMoreProducts}>
                  Load More
                </button>
            )}
            <div className="clearfix"></div>
          </div>
        </div>
      </div>
  );
}

export default Home;
