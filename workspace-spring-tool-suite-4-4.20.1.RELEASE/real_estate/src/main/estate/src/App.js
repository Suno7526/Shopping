import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import QLoginInfo from './Pages/QLoginInfo';
import QProduct from './Pages/QProduct';
import QDelivery from './Pages/QDelivery';
import QCancel from './Pages/QCancel';
import QExchange from './Pages/QExchange';
import Review from './Pages/Review';
import ProductUpdate from './Pages/ProductUpdate';
import MyInquiry from './Pages/MyInquiry';
import Search from './Pages/Search';
import MyQuestion from './Pages/MyQuestion';
import Payment from './Pages/Payment';
import PaymentProduct from './Pages/PaymentProduct';
import ProductImages from './Pages/ProductImages';
import Main from './Pages/Main';
import MypageUser from './Pages/MypageUser';
import CouponCreate from './Pages/CouponCreate';
import CouponAccept from './Pages/CouponAccept';
import Refund from './Pages/Refund';
import UserUpdate from './Pages/UserUpdate';
import DeliveryTracking from './Pages/DeliveryTracking';
import Chat from './Components/Chat'; // Chat 컴포넌트 임포트

function App() {
  const [isLogin, setIsLogin] = useState(false); // 로그인 여부 관리
  const [isChatVisible, setIsChatVisible] = useState(false); // 채팅 창 토글 상태

  useEffect(() => {
    setIsLogin(sessionStorage.getItem('userEmail') !== null);
  }, []); // 페이지 로드시 한 번만 실행되도록 빈 배열 전

  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `
      (function() {
        var w = window;
        if (w.ChannelIO) { return w.console.error("ChannelIO script included twice."); }
        var ch = function() { ch.c(arguments); };
        ch.q = [];
        ch.c = function(args) { ch.q.push(args); };
        w.ChannelIO = ch;
        function l() {
          if (w.ChannelIOInitialized) { return; }
          w.ChannelIOInitialized = true;
          var s = document.createElement("script");
          s.type = "text/javascript";
          s.async = true;
          s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
          var x = document.getElementsByTagName("script")[0];
          if (x.parentNode) { x.parentNode.insertBefore(s, x); }
        }
        if (document.readyState === "complete") { l(); } else { w.addEventListener("DOMContentLoaded", l); w.addEventListener("load", l); }
      })();

      ChannelIO('boot', {
        "pluginKey": "49f16ab4-ee61-4945-90b6-055d91c92119",
        "memberId": "${sessionStorage.getItem(
          'userEmail',
        )}" || '', // fill user's member id
        "profile": { // fill user's profile
          "name": "${sessionStorage.getItem('userName')}", // fill user's name
          "mobileNumber": "${sessionStorage.getItem(
            'userPhone',
          )}", // fill user's mobile number
          "landlineNumber": "USER_LANDLINE_NUMBER", // fill user's landline number  
          "CUSTOM_VALUE_1": "VALUE_1", // custom property
          "CUSTOM_VALUE_2": "VALUE_2" // custom property
        }
      });
    `;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Chat 창 토글 함수
  const toggleChat = () => {
    setIsChatVisible((prevState) => !prevState);
  };

  return (
    <BrowserRouter>
      <Header />
      <Body />

      {/* 채팅 열기/닫기 버튼 */}
      <button
        style={{
          position: 'fixed', // 화면에 고정
          bottom: '20px', // 화면 하단으로부터 20px 위에 위치
          right: '100px', // 화면 오른쪽으로부터 100px 왼쪽에 위치
          padding: '10px 20px',
          color: 'black',
          fontWeight: 'bold',
          border: '1px solid black', // 회색 2px 두께의 테두리 추가
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: '1000', // 다른 요소들 위에 표시되도록 설정

          // 추가된 스타일
          animation:
            '400ms cubic-bezier(0.36, 0, 0, 1) 0s 1 normal both running jBcSpD',
          background:
            'linear-gradient(rgb(250, 196, 132) 0%, rgb(250, 216, 132) 100%)',
          boxShadow: `
      rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset,
      rgba(0, 0, 0, 0.1) 0px 4px 6px,
      rgba(0, 0, 0, 0.15) 0px 8px 30px
    `,
        }}
        onClick={toggleChat}
      >
        {isChatVisible ? '채팅 닫기' : '채팅 열기'}
      </button>

      {/* 채팅 창 - 페이지 스크롤에도 고정 */}
      {isChatVisible && (
        <div
          style={{
            padding: '10px',
            position: 'fixed', // 화면에 고정
            bottom: '180px', // 화면 하단으로부터 80px 위에 위치
            right: '20px', // 화면 오른쪽으로부터 20px 왼쪽에 위치
            width: '450px',
            height: '650px',
            borderRadius: '5px',
            zIndex: '1000', // 다른 요소들 위에 표시되도록 설정
          }}
        >
          <Chat />
        </div>
      )}

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
        <Route path="/QLoginInfo" element={<QLoginInfo />} />
        <Route path="/QProduct" element={<QProduct />} />
        <Route path="/QDelivery" element={<QDelivery />} />
        <Route path="/QCancel" element={<QCancel />} />
        <Route path="/QExchange" element={<QExchange />} />
        <Route path="/Review/:orderCode" element={<Review />} />
        <Route path="/ProductUpdate" element={<ProductUpdate />} />
        <Route path="/MyInquiry" element={<MyInquiry />} />
        <Route path="/Search/:query" element={<Search />} />
        <Route path="/MyQuestion/:questionCode" element={<MyQuestion />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/PaymentProduct" element={<PaymentProduct />} />
        <Route path="/ProductImages" element={<ProductImages />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/MypageUser" element={<MypageUser />} />
        <Route path="/CouponCreate" element={<CouponCreate />} />
        <Route path="/CouponAccept" element={<CouponAccept />} />
        <Route path="/Refund" element={<Refund />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/UserUpdate" element={<UserUpdate />} />
        <Route
          path="/DeliveryTracking/:orderCode"
          element={<DeliveryTracking />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
