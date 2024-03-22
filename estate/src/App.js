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

function App() {
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
      <Link to="/Cart">장바구니</Link>
      <br />
      <Link to="/Mypage">마이페이지</Link>

      <Routes>
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ProductJoin" element={<ProductJoin />} />
        <Route path="/product/:productCode" element={<Product />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
