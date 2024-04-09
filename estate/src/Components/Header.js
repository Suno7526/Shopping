// Header.jsx
import React from 'react';
import './Header.css'; // 스타일 파일 import
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isLogin, setIsLogin] = useState(false); // 로그인 여부 관리

  useEffect(() => {
    setIsLogin(sessionStorage.getItem('userEmail') !== null);
  }, []); // 페이지 로드시 한 번만 실행되도록 빈 배열 전
  return (
    <div>
      <div className="tab-menu">
        <div style={{ flex: 1 }}></div> {/* 왼쪽 여백 */}
        <div id="Company">NONAME</div>
        {/* 기존 탭 메뉴 */}
        <Link to="/ProductJoin" className="tab-menu-link">
          상품등록
        </Link>
        <Link to="/Home" className="tab-menu-link">
          홈
        </Link>
        <Link to="/Join" className="tab-menu-link">
          회원가입
        </Link>
        <Link to="/Cart" className="tab-menu-link">
          장바구니
        </Link>
        <Link to="/Mypage" className="tab-menu-link">
          마이페이지
        </Link>
        {/* 로그인 링크 */}
        <div className="tab-menu-login">
          {isLogin ? (
            <React.Fragment>
              <Link to={`/MyPage`} className="nav-link">
                {sessionStorage.getItem('userEmail')}
                <br />
              </Link>
              <button
                className="sign-out-button"
                onClick={() => {
                  // Handle sign out logic
                  sessionStorage.removeItem('userEmail');
                  setIsLogin(false);
                }}
              >
                Sign Out 🚪
              </button>
            </React.Fragment>
          ) : (
            <Link to={`/UserLogin`} className="nav-link">
              Sign In
            </Link>
          )}
        </div>
      </div>
      <header>
        <nav id="gnb">
          <ul>
            <li>
              <a href="#outer">OUTER</a>
              <ul>
                <li>
                  <a href="#jacket">자킷</a>
                </li>
                <li>
                  <a href="#zip-up">집업</a>
                </li>
                <li>
                  <a href="#jumper">점퍼</a>
                </li>
                <li>
                  <a href="#coat">코트</a>
                </li>
                <li>
                  <a href="#padding">패딩 / 파카</a>
                </li>
                <li>
                  <a href="#fur">모피 / 머스탱</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#top">TOP</a>
              <ul>
                <li>
                  <a href="#sleeveless">민소매 / 조끼</a>
                </li>
                <li>
                  <a href="#short-tee">반팔 티</a>
                </li>
                <li>
                  <a href="#long-tee">긴팔 티</a>
                </li>
                <li>
                  <a href="#shirts">셔츠</a>
                </li>
                <li>
                  <a href="#crewneck">크루 넥</a>
                </li>
                <li>
                  <a href="#knit">니트</a>
                </li>
                <li>
                  <a href="#hoodie">후드</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#bottom">BOTTOM</a>
              <ul>
                <li>
                  <a href="#short-pants">반바지</a>
                </li>
                <li>
                  <a href="#sweat-pants">츄리닝</a>
                </li>
                <li>
                  <a href="#long-pants">긴바지</a>
                </li>
                <li>
                  <a href="#skirt">치마</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#headwear">HEADWEAR</a>
              <ul>
                <li>
                  <a href="#cap">캡</a>
                </li>
                <li>
                  <a href="#bucket-hat">버킷햇</a>
                </li>
                <li>
                  <a href="#snapback">스냅백</a>
                </li>
                <li>
                  <a href="#beanie">비니</a>
                </li>
                <li>
                  <a href="#etc">기타..</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
      <hr />
    </div>
  );
};

export default Header;
