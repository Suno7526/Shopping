import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLogin, setIsLogin] = useState(false); // 로그인 관리

  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);

  useEffect(() => {
    // 최근에 본 상품 리스트를 가져오는 API 호출
    const fetchRecentlyViewedProducts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/recentlyViewedProducts',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          },
        );
        setRecentlyViewedProducts(response.data);
      } catch (error) {
        console.error('최근에 본 상품을 불러오는 중 오류 발생:', error);
      }
    };
    fetchRecentlyViewedProducts();
  }, []);

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
  }, []);

  useEffect(() => {
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
        </Link>
      ) : (
        <Link to={`/UserLogin`} className="nav-link text-black">
          로그인
        </Link>
      )}

      <ul>
        {products.map((product) => (
          <li key={product.productCode}>
            <h2>이름: {product.productName}</h2>
            <p>설명: {product.infomation}</p>
            <p>가격: {product.productPrice}</p>
            <img
              src={`http://localhost:8000/getProductImage/${product.productCode}`}
              alt={product.productName}
              style={{ width: '100px', height: '100px' }}
            />
          </li>
        ))}
      </ul>

      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>메인페이지</title>
        <style
          dangerouslySetInnerHTML={{
            __html:
              '\n        body {\n            font-family: Arial, sans-serif;\n            margin: 0;\n            padding: 0;\n            background-color: #f0f0f0;\n            position: relative; /* body를 기준으로 자식 요소를 위치시키기 위해 추가 */\n        }\n\n        header {\n            background-color: #4d4d4d;\n            color: white;\n            padding: 5em;\n            display: flex; /* Flexbox를 사용하여 요소들을 가로로 정렬 */\n            justify-content: center; /* 가로 가운데 정렬로 변경 */\n            align-items: center;\n        }\n\n        h1 {\n            margin: 0; /* 수정된 부분 */\n        }\n\n        #branding {\n            color: #fff;\n\n            font-size: 20px;\n            margin: 10px;\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 50px;\n            display: flex;\n            align-items: center;\n            justify-content: flex-start;\n        }\n\n        #search-bar-container {\n            flex-grow: 1; /* 헤더 전체의 너비에 맞게 확장 */\n            text-align: center;\n        }\n\n        #search-bar {\n            padding: 15px;\n            width: 400px;\n            border: 1px solid #ddd;\n            border-radius: 5px;\n            box-sizing: border-box;\n            margin: 0 auto; /* 검색칸을 가운데 정렬 */\n        }\n\n        /* 로그인, 회원가입 버튼 스타일 추가 */\n        #login-btn {\n            position: absolute;\n            top: 10px;\n            right: 85px;\n            padding: 10px;\n            background-color: #4d4d4d;\n            color: white;\n            cursor: pointer;\n            border: 2px solid #ccc;\n        }\n\n        #signup-btn {\n            position: absolute;\n            top: 10px;\n            right: 10px;\n            padding: 10px;\n            background-color: #4d4d4d;\n            color: white;\n            cursor: pointer;\n            border: 2px solid #ccc;\n        }\n        \n        #wishlistBtn{\n            position: absolute;\n            top: 10px;\n            right: 170px;\n            padding: 10px;\n            background-color: #4d4d4d;\n            color: white;\n            border: none;\n            border-radius: 5px;\n            cursor: pointer;\n        }\n\n        #goroom{\n            position: absolute;\n            top: 10px;\n            right: 250px;\n            padding: 10px;\n            background-color: #4d4d4d;\n            color: white;\n            border: none;\n            border-radius: 5px;\n            cursor: pointer;\n        }\n\n        #nonface{\n            position: absolute;\n            top: 10px;\n            right: 330px;\n            padding: 10px;\n            background-color: #4d4d4d;\n            color: white;\n            border: none;\n            border-radius: 5px;\n            cursor: pointer;\n        }\n\n\n        section {\n            padding: 20px;\n            text-align: center;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n        }\n\n        .property-card {\n            border: 1px solid #ddd;\n            border-radius: 10px;\n            margin: 15px;\n            padding: 15px;\n            background-color: white;\n            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n            text-align: center;\n            cursor: pointer;\n            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;\n            width: 5000px;\n            height: 800px;\n        }\n\n        .property-image {\n            width: 100%; /* 이미지를 부모 요소인 .property-card에 가득 차게 설정 */\n            height: 90%; /* 이미지를 부모 요소인 .property-card에 가득 차게 설정 */\n            object-fit: cover; /* 가로세로비율 유지하면서 .property-card에 이미지 맞춤 */\n            border-radius: 10px; /* 이미지에도 border-radius 적용하여 둥글게 처리 */\n            margin-bottom: 5px;\n        }\n\n\n        /*여기는 매물 추천 섹션*/\n        #recommended-properties {\n            padding: 20px;\n            background-color: #afaeae;\n            text-align: left;\n            color: #ff5e5e;\n        }\n\n        .recommended-section {\n            display: flex;\n            justify-content: center;\n            align-items: center;\n        }\n\n        .recommended-card {\n            border: 1px solid #ddd;\n            border-radius: 10px;\n            margin: 15px;\n            padding: 15px;\n            background-color: white;\n            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n            text-align: center;\n            cursor: pointer;\n            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;\n            width: 300px;\n        }\n\n        .recommended-card:hover {\n            transform: scale(1.1);\n            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);\n            background-color: #f8f8f8;\n            color: #ff0000;\n        }\n\n        nav{\n            font-weight: bold;\n            font-size: 20px;\n        }\n\n        footer {\n            background-color: #333;\n            color: white;\n            padding: 1em;\n            text-align: center;\n        }\n\n       \n        #guides-properties {\n            padding: 20px;\n            background-color: #f8f8f8;\n            text-align: left;\n        }\n\n        .guides-section {\n            display: flex;\n            justify-content: center;\n            align-items: center;\n        }\n\n        .guides-card {\n            border: 1px solid #ddd;\n            border-radius: 10px;\n            margin: 15px;\n            padding: 15px;\n            background-color: white;\n            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n            text-align: center;\n            cursor: pointer;\n            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;\n            width: 300px;\n        }\n\n        .guides-card:hover {\n            transform: scale(1.1);\n            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);\n            background-color: #f8f8f8;\n            color: #333;\n        }\n\n    ',
          }}
        />
        <header>
          <div id="branding">
            <h1>옷장</h1>
          </div>
          <div id="search-bar-container">
            <h4>원하는 상품을 검색하세요!</h4>
            <input type="text" id="search-bar" placeholder="검색" />
          </div>
        </header>{' '}
        <hr />
        <section>
          <div
            className="property-card"
            onClick={() => (window.location.href = 'bunyang.html')}
          >
            <p>다가오는 봄! 이런 코디는 어떠세요?</p>
            <img src="" alt="메인이미지" className="property-image" />
          </div>
        </section>
        <div id="recommended-properties">
          <h2>Best Saler</h2>
          <div className="recommended-section">
            {products.map((product) => (
              <div className="recommended-card" key={product.productCode}>
                <p>{product.productName}</p>
                <img
                  src={`http://localhost:8000/getProductImage/${product.productCode}`}
                  alt={`코디 ${product.productCode}`}
                  className="property-image"
                  style={{ width: '100px', height: '100px' }}
                />
              </div>
            ))}
          </div>
        </div>
        <div id="guides-container">
          <div id="guides-properties">
            <h2>Best Item</h2>
            <div className="guides-section">
              <div className="guides-card">
                <img src="" alt="x" className="property-image" />
                <p>코디 1</p>
              </div>
              <div className="guides-card">
                <img src="" alt="코디2" className="property-image" />
                <p>코디 2</p>
              </div>
            </div>
            <div className="guides-section">
              <div className="guides-card">
                <img src="" alt="코디2" className="property-image" />
                <p>코디 3</p>
              </div>
              <div className="guides-card">
                <img src="" alt="코디4" className="property-image" />
                <p>코디 4</p>
              </div>
            </div>
          </div>
          <div id="guides-container">
            <div id="guides-properties">
              <h2>최신 아이템</h2>
              <div className="guides-section">
                <div className="guides-card">
                  <img src="" alt="코디1" className="property-image" />
                  <p>코디 1</p>
                </div>
                <div className="guides-card">
                  <img src="" alt="코디2" className="property-image" />
                  <p>코디 2</p>
                </div>
              </div>
              <div className="guides-section">
                <div className="guides-card">
                  <img src="" alt="코디2" className="property-image" />
                  <p>코디 3</p>
                </div>
                <div className="guides-card">
                  <img src="" alt="코디4" className="property-image" />
                  <p>코디 4</p>
                </div>
              </div>
            </div>
            <footer>
              <p>© 기타 문의 바람.</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
