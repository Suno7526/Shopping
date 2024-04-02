import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import UserLogin from './Pages/UserLogin';
import Join from './Pages/Join';
import Home from './Pages/Home';
import ProductJoin from './Pages/ProductJoin';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
import Product from './Pages/Product';
import Mypage from './Pages/Mypage';
import Header from './Components/Header';
import { useState, useEffect } from 'react';
import Footer from './Components/Footer';

function App() {
  const [isLogin, setIsLogin] = useState(false); // 로그인 여부 관리

  useEffect(() => {
    setIsLogin(sessionStorage.getItem('userEmail') !== null);
  }, []); // 페이지 로드시 한 번만 실행되도록 빈 배열 전
  return (
    <BrowserRouter>
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
            <Link to={`/MyPage`} className="nav-link">
              {sessionStorage.getItem('userEmail')}
              <br />
            </Link>
          ) : (
            <Link to={`/UserLogin`} className="nav-link">
              Login
            </Link>
          )}
        </div>
      </div>

      <Header />

      <Routes>
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ProductJoin" element={<ProductJoin />} />
        <Route path="/product/:productCode" element={<Product />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Mypage" element={<Mypage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
