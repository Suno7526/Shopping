import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import UserLogin from './Pages/UserLogin';
import Join from './Pages/Join';
import Home from './Pages/Home';
import ProductJoin from './Pages/ProductJoin';
import Cart from './Pages/Cart';
import Product from './Pages/Product';
import Mypage from './Pages/Mypage';
import Header from './Components/Header';
import { useState, useEffect } from 'react';

function App() {
  const [isLogin, setIsLogin] = useState(false); // 로그인 여부 관리

  useEffect(() => {
    setIsLogin(sessionStorage.getItem('userEmail') !== null);
  }, []); // 페이지 로드시 한 번만 실행되도록 빈 배열 전

  return (
    <BrowserRouter>
      <Link to="/ProductJoin">상품등록</Link>
      <br />
      <Link to="/Home">홈</Link>
      <br />
      <Link to="/UserLogin">로그인</Link>
      <br />
      <Link to="/Join">회원가입</Link>
      <br />
      <Link to="/product/:productCode">상세보기</Link>
      <br />
      <Link to={`/Cart/${sessionStorage.getItem('userCode')}`}>장바구니</Link>
      <br />
      <Link to={`/Mypage/${sessionStorage.getItem('userCode')}`}>
        마이페이지
      </Link>{' '}
      {/* 수정된 부분 */}
      <Header />
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
      <Routes>
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ProductJoin" element={<ProductJoin />} />
        <Route path="/product/:productCode" element={<Product />} />
        <Route path="/Cart/:usercode" element={<Cart />} />
        <Route path="/Mypage/:userCode" element={<Mypage />} />{' '}
        {/* 수정된 부분 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
