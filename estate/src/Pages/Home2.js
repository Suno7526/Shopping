import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home2.css';
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
      <div>
        <div className="navi">
          <a href="#" id="logo">
            <img src="https://i.postimg.cc/C5FbwsQr/logo.png" height={20} />
          </a>
          <ul id="menu">
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Shop</a>
            </li>
            <li>
              <a href="#">Cart</a>
            </li>
            <li>
              <a href="#">Login</a>
            </li>
          </ul>
        </div>
        <div className="header" />
        <div className="text">
          <h1>Our New Products</h1>
          <div className="product-list">
            <a href="#" className="product">
              <img
                src="https://i.postimg.cc/qq2wBG09/sunglasses.jpg"
                width={225}
              />
              <div className="product-name">Sunglasses</div>
              <div className="product-price">49,000</div>
            </a>
            <a href="#" className="product">
              <img
                src="https://i.postimg.cc/ZK89HMVG/classic-loafer.jpg"
                width={225}
              />
              <div className="product-name">Tassel Loafer</div>
              <div className="product-price">89,000</div>
            </a>
            <a href="#" className="product">
              <img
                src="https://i.postimg.cc/MZRXZL2n/beige-bag.jpg"
                width={225}
              />
              <div className="product-name">Beige Bag</div>
              <div className="product-price">69,000</div>
            </a>
            <a href="#" className="product">
              <img
                src="https://i.postimg.cc/q7SM4s1c/sneakers.jpg"
                width={225}
              />
              <div className="product-name">Sneakers</div>
              <div className="product-price">79,000</div>
            </a>
            <a href="#" className="product">
              <img
                src="https://i.postimg.cc/QNpxZW15/slippers.jpg"
                width={225}
              />
              <div className="product-name">Slippers</div>
              <div className="product-price">29,000</div>
            </a>
            <a href="#" className="product">
              <img
                src="https://i.postimg.cc/Jhfm91hP/wrist-watch.jpg"
                width={225}
              />
              <div className="product-name">Wrist Watch</div>
              <div className="product-price">99,000</div>
            </a>
            <a href="#" className="product">
              <img
                src="https://i.postimg.cc/rm2XfQhH/fedora-hat.jpg"
                width={225}
              />
              <div className="product-name">Fedora Hat</div>
              <div className="product-price">39,000</div>
            </a>
            <a href="#" className="product">
              <img
                src="https://i.postimg.cc/ZK89HMVG/classic-loafer.jpg"
                width={225}
              />
              <div className="product-name">Classic Loafer</div>
              <div className="product-price">99,000</div>
            </a>
            <a href="#" className="product">
              <img
                src="https://i.postimg.cc/4y80R55s/pink-bag.jpg"
                width={225}
              />
              <div className="product-name">Pink Bag</div>
              <div className="product-price">79,000</div>
            </a>
          </div>
          <div className="clearfix" />
        </div>
        <div className="footer">
          <a href="https://facebook.com">
            <img src="https://i.postimg.cc/0r11BZ2j/facebook.png" height={20} />
          </a>
          <a href="https://instagram.com">
            <img
              src="https://i.postimg.cc/9XZmGqf0/instagram.png"
              height={20}
            />
          </a>
          <a href="https://twitter.com">
            <img src="https://i.postimg.cc/c1RWKyD8/twitter.png" height={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
