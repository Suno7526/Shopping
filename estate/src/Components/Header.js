import React, { useState, useEffect } from 'react';
import './Header.css'; // 스타일 파일 import
import { Link, useNavigate } from 'react-router-dom'; // Link, useNavigate import 추가

const Header = () => {
  const [isLogin, setIsLogin] = useState(false); // 로그인 여부 관리
  const [isSticky, setIsSticky] = useState(false); // 스크롤 여부 관리
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    setIsLogin(sessionStorage.getItem('userEmail') !== null);
    setUserRole(sessionStorage.getItem('userRole'));

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSignOut = () => {
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userCode'); // userCode 저장
    sessionStorage.removeItem('userAddress');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userBirth');
    sessionStorage.removeItem('userRole');

    setIsLogin(false);
    window.location.reload(); // 페이지 새로고침
  };

  return (
    <div>
      <div className={`tab-menu ${isSticky ? 'sticky' : ''}`}>
        <div style={{ flex: 1 }}></div> {/* 왼쪽 여백 */}
        <div id="Company" onClick={() => navigate('/Home')}>
          FASS
        </div>
        {/* 클릭 시 Home으로 이동 */}
        {/* 기존 탭 메뉴 */}
        {userRole === 'ADMIN' && (
          <Link to="/ProductJoin" className="tab-menu-link">
            상품등록
          </Link>
        )}
        <Link to="/Cart" className="tab-menu-link">
          장바구니
        </Link>
        <Link to="/Mypage" className="tab-menu-link">
          마이페이지
        </Link>
        <Link to="/Inquiry" className="tab-menu-link">
          문의하기
        </Link>
        {/* 로그인 링크 */}
        <div className="tab-menu-login">
          {isLogin ? (
            <React.Fragment>
              <Link to={`/MyPage`} className="nav-link">
                {sessionStorage.getItem('userName')}님
                <br />
              </Link>
              <button className="sign-out-button" onClick={handleSignOut}>
                Sign Out 🚪
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link to={`/UserLogin`} className="nav-link">
                Sign In
              </Link>
            </React.Fragment>
          )}
        </div>
      </div>
      <header>
        <nav id="gnb">
          <ul>
            <li>
              <Link to="/Category/OUTER">OUTER</Link>
              <ul>
                <li>
                  <Link to="/Category/재킷">재킷</Link>
                </li>
                <li>
                  <Link to="/Category/집업">집업</Link>
                </li>
                <li>
                  <Link to="/Category/점퍼">점퍼</Link>
                </li>
                <li>
                  <Link to="/Category/코트">코트</Link>
                </li>
                <li>
                  <Link to="/Category/패딩">패딩</Link>
                </li>
                <li>
                  <Link to="/Category/파카">파카</Link>
                </li>
                <li>
                  <Link to="/Category/모피">모피</Link>
                </li>
                <li>
                  <Link to="/Category/머스탱">머스탱</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/Category/TOP">TOP</Link>
              <ul>
                <li>
                  <Link to="/Category/민소매">민소매</Link>
                </li>
                <li>
                  <Link to="/Category/조끼">조끼</Link>
                </li>
                <li>
                  <Link to="/Category/반팔티">반팔티</Link>
                </li>
                <li>
                  <Link to="/Category/긴팔티">긴팔티</Link>
                </li>
                <li>
                  <Link to="/Category/셔츠">셔츠</Link>
                </li>
                <li>
                  <Link to="/Category/크루넥">크루넥</Link>
                </li>
                <li>
                  <Link to="/Category/니트">니트</Link>
                </li>
                <li>
                  <Link to="/Category/후드">후드</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/Category/BOTTOM">BOTTOM</Link>
              <ul>
                <li>
                  <Link to="/Category/반바지">반바지</Link>
                </li>
                <li>
                  <Link to="/Category/츄리닝">츄리닝</Link>
                </li>
                <li>
                  <Link to="/Category/긴바지">긴바지</Link>
                </li>
                <li>
                  <Link to="/Category/치마">치마</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/Category/HEADWEAR">HEADWEAR</Link>
              <ul>
                <li>
                  <Link to="/Category/캡">캡</Link>
                </li>
                <li>
                  <Link to="/Category/버킷햇">버킷햇</Link>
                </li>
                <li>
                  <Link to="/Category/스냅백">스냅백</Link>
                </li>
                <li>
                  <Link to="/Category/비니">비니</Link>
                </li>
                <li>
                  <Link to="/Category/기타">기타</Link>
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
