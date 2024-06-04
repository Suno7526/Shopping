import React from 'react';
import { Link } from 'react-router-dom'; // Link import 추가
import './Aside.css'; // 외부 스타일 시트 불러오기

const Aside = () => {
  return (
    <div>
      <aside className="sidebar">
        <div className="sidebar-header">PASS</div>
        <nav className="sidebar-Buttons">
          <Link to="/RecentItem" className="RecentItemButton-div">
            <button className="RecentItemButton">🕒 최근 본 상품</button>
          </Link>
          <Link to="/Like" className="LikeItemButton-div">
            <button className="LikeItemButton">🖤 찜한 상품</button>
          </Link>{' '}
          <Link to="/Mypage" className="MypageItemButton-div">
            <button className="MypageButton">🧾 주문 내역</button>
          </Link>{' '}
        </nav>
      </aside>
    </div>
  );
};

export default Aside;
