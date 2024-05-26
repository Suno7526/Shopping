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
    if (wrapperRef.current) {
      wrapperRef.current.Slider(); // slick 슬라이더 초기화
    }
  }, [products]);

  return (
    <div>
      <div className="navi">
        <Link to="/" id="logo">
          <img
            src="https://i.postimg.cc/C5FbwsQr/logo.png"
            height={20}
            alt="Logo"
          />
        </Link>
        <ul id="menu">
          <li>
            <Link to="#">Contact</Link>
          </li>
          <li>
            <Link to="#">Shop</Link>
          </li>
          <li>
            <Link to="#">Cart</Link>
          </li>
          <li>
            <Link to="#">Login</Link>
          </li>
        </ul>
      </div>
      <div className="header"></div>
      <div className="text">
        <h1>Our New Products</h1>
        <div className="product-list">
          {products.slice(0, 9).map((product) => (
            <Link
              to={`/product/${product.productCode}`}
              className="product"
              key={product.productCode}
              onClick={() => handleClickProduct(product.productCode)}
            >
              <img
                src={`http://localhost:8000/getProductImage/${product.productCode}`}
                width={225}
                alt={product.productName}
              />
              <div className="product-name">{product.productName}</div>
              <div className="product-price">{product.productPrice}</div>
            </Link>
          ))}
        </div>
        <div className="clearfix" />
      </div>
      <div className="footer">
        <a href="https://facebook.com">
          <img
            src="https://i.postimg.cc/0r11BZ2j/facebook.png"
            height={20}
            alt="Facebook"
          />
        </a>
        <a href="https://instagram.com">
          <img
            src="https://i.postimg.cc/9XZmGqf0/instagram.png"
            height={20}
            alt="Instagram"
          />
        </a>
        <a href="https://twitter.com">
          <img
            src="https://i.postimg.cc/c1RWKyD8/twitter.png"
            height={20}
            alt="Twitter"
          />
        </a>
      </div>
    </div>
  );
};

export default Home;
