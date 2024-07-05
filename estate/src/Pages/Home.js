import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';
import { Link } from 'react-router-dom';
import News from '../Components/News';

function Home() {
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
      wrapperRef.current.Slider();
    }
  }, [products]);

  return (
    <div>
      <div className="Home-text">
        <h1>New Items</h1>
      </div>
      <div>
        <Slider
          ref={sliderRef}
          className="Home-property-wrapper"
          slidesToShow={5} // Display up to 5 items
          slidesToScroll={1}
          arrows={false}
          dots={true}
          autoplay={true}
          centerMode={false}
          centerPadding="0px" // Adjust the padding between slides
        >
          {products.map((product, index) => (
            <div key={product.productCode} className="Home-property-wrapper">
              <Link to={`/product/${product.productCode}`}>
                <img
                  src={`http://localhost:8000/getProductImage/${product.productCode}`}
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
        <h1>Products</h1>
        <div className="product-list">
          {products.slice(0, 5).map((product) => (
            <div className="product-wrapper" key={product.productCode}>
              <Link
                to={`/product/${product.productCode}`}
                className="product"
                onClick={() => handleClickProduct(product.productCode)}
              >
                <img
                  src={`http://localhost:8000/getProductImage/${product.productCode}`}
                  alt={product.productName}
                />
              </Link>
              <div>{product.companyName}</div>
              <div className="product-name">{product.productName}</div>
              <div className="product-price">{product.productPrice}</div>
            </div>
          ))}
          <div className="clearfix"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
