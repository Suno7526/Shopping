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
import RecentItem from './Pages/RecentItem';
import Header from './Components/Header';
import { useState, useEffect } from 'react';
import Footer from './Components/Footer';
import Body from './Components/Body';
import Question from './Pages/Question';
import Category from './Pages/Category';
import Like from './Pages/Like';
import Inquiry from './Pages/Inquiry';
import BestFAQ from './Pages/BestFAQ';
import WithdrawETC from './Pages/WithdrawETC';

//123124124
function App() {
  const [isLogin, setIsLogin] = useState(false); // 로그인 여부 관리

  useEffect(() => {
    setIsLogin(sessionStorage.getItem('userEmail') !== null);
  }, []); // 페이지 로드시 한 번만 실행되도록 빈 배열 전
  return (
    <BrowserRouter>
      <Header />

      <Body />

      <Routes>
        <Route path="/Like" element={<Like />} />
        <Route path="/RecentItem" element={<RecentItem />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ProductJoin" element={<ProductJoin />} />
        <Route path="/product/:productCode" element={<Product />} />
        <Route path="/Category/:category" element={<Category />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/Question" element={<Question />} />
        <Route path="/Inquiry" element={<Inquiry />} />
        <Route path="/BestFAQ" element={<BestFAQ />} />
        <Route path="/WithdrawETC" element={<WithdrawETC />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
