import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import UserLogin from './Pages/UserLogin';
import Join from './Pages/Join';
import Home from './Pages/Home';
import ProductJoin from './Pages/ProductJoin';

function App() {
  return (
    <BrowserRouter>
      <Link to="/ProductJoin">매물등록</Link>
      <br />
      <Link to="/Home">홈</Link>
      <br />
      <Link to="/UserLogin">로그인</Link>
      <br />
      <Link to="/Join">회원가입</Link>

      <Routes>
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ProductJoin" element={<ProductJoin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
