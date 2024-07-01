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
      <div className="Home-MainImage"></div>
      <div className="Home-text">
        <h1>Best Items</h1>
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

      <div className="recommend-item" id="recommend-item">
        New Items
      </div>
      <div>
        <Slider
          ref={sliderRef}
          className="Home-property-wrapper"
          slidesToShow={3}
          slidesToScroll={1}
          arrows={false}
          dots={true}
          autoplay={true}
          centerMode={true}
          centerPadding="10px"
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

      <div id="recommended-properties">
        <div className="Home-MiddleImage"></div>
        <div className="container-fluid" id="popular-content">
          <h1 className="good-text">Product Items</h1>
          <br></br>
          <div className="masonry">
            {products.map((product) => (
              <div className="HomeGriditem" key={product.productCode}>
                <a
                  href={`/product/${product.productCode}`}
                  className="HomeGrud-product"
                  onClick={() => handleClickProduct(product.productCode)}
                >
                  <div className="image-container">
                    <img
                      src={`http://localhost:8000/getProductImage/${product.productCode}`}
                      alt={product.productName}
                    />
                  </div>
                  <div className="buttons-container">
                    <button className="cart-button">🛒</button>
                    <button className="wishlist-button">❤️</button>
                  </div>
                </a>
                <h4 className="HomeGridH4">{product.productName}</h4>
                <p className="HomeGridP">{product.productPrice}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="Home-BottomImage" id="fashion-news"></div>

      <h1 className="FASHION-NEWS">FASHION NEWS</h1>
      <p className="FASHION-NEWS-sub-text" id="fashion-news-content"></p>
      <div className="snip-div">
        <figure className="snip1249">
          <div className="image">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample90.jpg"
              alt="sample90"
            />
            <i className="ion-ios-basketball-outline"></i>
          </div>
          <figcaption>
            <h3>Sports Wear</h3>
            <p>
              How many boards would the Mongols hoard if the Mongol hordes got
              bored?
            </p>
            <div className="price">
              <s>$19.00</s>$14.00
            </div>
          </figcaption>
        </figure>
        <figure className="snip1249">
          <div className="image">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample85.jpg"
              alt="sample85"
            />
            <i className="ion-ios-star-outline"></i>
          </div>
          <figcaption>
            <h3>Time Piece</h3>
            <p>
              I'm killing time while I wait for life to shower me with meaning
              and happiness.
            </p>
            <div className="price">
              <s>$99.00</s>$84.00
            </div>
          </figcaption>
        </figure>
        <figure className="snip1249">
          <div className="image">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample71.jpg"
              alt="sample71"
            />
            <i className="ion-ios-camera-outline"></i>
          </div>
          <figcaption>
            <h3>Winter Hat</h3>
            <p>
              Weekends don't count unless spent doing something completely
              pointless.
            </p>
            <div className="price">
              <s>$98.00</s>$74.00
            </div>
          </figcaption>
        </figure>
        <figure className="snip1249">
          <div className="image">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample85.jpg"
              alt="sample85"
            />
            <i className="ion-ios-star-outline"></i>
          </div>
          <figcaption>
            <h3>Time Piece</h3>
            <p>
              I'm killing time while I wait for life to shower me with meaning
              and happiness.
            </p>
            <div className="price">
              <s>$99.00</s>$84.00
            </div>
          </figcaption>
        </figure>
        <figure className="snip1249">
          <div className="image">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample85.jpg"
              alt="sample85"
            />
            <i className="ion-ios-star-outline"></i>
          </div>
          <figcaption>
            <h3>Time Piece</h3>
            <p>
              I'm killing time while I wait for life to shower me with meaning
              and happiness.
            </p>
            <div className="price">
              <s>$99.00</s>$84.00
            </div>
          </figcaption>
        </figure>
      </div>

      <div className="btn_quick">
        <ul className="btn_quick_wrap">
          <li className="sidebar-item">
            <a
              href="#"
              className="up"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                src="https://atimg.sonyunara.com/2023/renew/footer/quickup.png"
                alt="Top"
                className="quickbtnImg"
              />
            </a>
            <div className="hovertxt">
              <span>맨 위로</span>
            </div>
          </li>
          <li className="sidebar-item">
            <a href="#best-item" className="Home-Best-Item">
              <img
                src="https://i.postimg.cc/xTttQtVw/download-removebg-preview-2.png"
                alt="Best Item"
                className="quickbtnImg"
              />
            </a>
            <div className="hovertxt">
              <span>베스트 아이템</span>
            </div>
          </li>
          <li className="sidebar-item">
            <a href="#recommend-item" className="Home-Recommend-Item">
              <img
                src="https://i.postimg.cc/3NLpsf09/download-removebg-preview-3.png"
                alt="Recommend Item"
                className="quickbtnImg"
              />
            </a>
            <div className="hovertxt">
              <span>최신 아이템</span>
            </div>
          </li>
          <li className="sidebar-item">
            <a href="#popular-content" className="Home-Popular-Content">
              <img
                src="https://i.postimg.cc/7hp7PGXT/download-removebg-preview-4.png"
                alt="Popular Content"
                className="quickbtnImg"
              />
            </a>
            <div className="hovertxt">
              <span>인기있는 아이템</span>
            </div>
          </li>
          <li className="sidebar-item">
            <a href="#fashion-news-content" className="Home-Fashion-News">
              <img
                src="https://i.postimg.cc/wTmLf2T5/download-removebg-preview-5.png"
                alt="Fashion News"
                className="quickbtnImg"
              />
            </a>
            <div className="hovertxt">
              <span>패션 뉴스</span>
            </div>
          </li>
          <li className="sidebar-item">
            <a
              href="#"
              className="down"
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: 'smooth',
                })
              }
            >
              <img
                src="https://atimg.sonyunara.com/2023/renew/footer/quickup.png"
                alt="Bottom"
                className="quickbtnImg"
              />
            </a>
            <div className="hovertxt">
              <span>맨 아래로</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
