import React from 'react';
import axios from 'axios';
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

  return (
    <div>
      {/* 로그인이 되어있다면 */}
      {isLogin ? (
        <Link to={`/MyPage`} className="nav-link text-black ">
          {sessionStorage.getItem('userEmail')}
          <br></br>
          {sessionStorage.getItem('userCode')}
          <br></br>
        </Link>
      ) : (
        <Link to={`/UserLogin`} className="nav-link text-black">
          로그인
        </Link>
      )}

      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>메인페이지</title>
        <header>
          <div id="branding">
            <h1>옷옷장</h1>
          </div>
        </header>

        <header>
          <nav id="gnb">
            <ul>
              <li>
                <a href="#outer">OUTER</a>
                <ul>
                  <li>
                    <a href="#jacket">JACKET</a>
                  </li>
                  <li>
                    <a href="#zip-up">ZIP-UP</a>
                  </li>
                  <li>
                    <a href="#jumper">JUMPER</a>
                  </li>
                  <li>
                    <a href="#coat">COAT</a>
                  </li>
                  <li>
                    <a href="#padding">PADDING / PARKA</a>
                  </li>
                  <li>
                    <a href="#fur">FUR / MUSTANG</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#top">TOP</a>
                <ul>
                  <li>
                    <a href="#sleeveless">SLEEVELESS / VEST</a>
                  </li>
                  <li>
                    <a href="#short-tee">SHORT TEE</a>
                  </li>
                  <li>
                    <a href="#long-tee">LONG TEE</a>
                  </li>
                  <li>
                    <a href="#shirts">SHIRTS</a>
                  </li>
                  <li>
                    <a href="#crewneck">CREWNECK</a>
                  </li>
                  <li>
                    <a href="#knit">KNIT</a>
                  </li>
                  <li>
                    <a href="#hoodie">HOODIE</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#bottom">BOTTOM</a>
                <ul>
                  <li>
                    <a href="#short-pants">SHORT PANTS</a>
                  </li>
                  <li>
                    <a href="#sweat-pants">SWEAT PANTS</a>
                  </li>
                  <li>
                    <a href="#long-pants">LONG PANTS</a>
                  </li>
                  <li>
                    <a href="#skirt">SKIRT</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#headwear">HEADWEAR</a>
                <ul>
                  <li>
                    <a href="#cap">CAP</a>
                  </li>
                  <li>
                    <a href="#bucket-hat">BUCKET HAT</a>
                  </li>
                  <li>
                    <a href="#snapback">SNAPBACK</a>
                  </li>
                  <li>
                    <a href="#beanie">BEANIE</a>
                  </li>
                  <li>
                    <a href="#etc">ETC.</a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </header>
        <hr />

        {/* 메인 이미지 칸 */}
        <section>
          <div
            className="property-card"
            onclick="location.href='bunyang.html';"
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
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
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
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
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
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
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
