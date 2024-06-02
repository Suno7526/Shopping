import React from 'react';
import { Link } from 'react-router-dom'; // Link import 추가
import './Aside.css'; // 외부 스타일 시트 불러오기

const Aside = () => {
  return (
    <div>
      <aside className="sidebar">
        <div className="sidebar-header">📲 옷옷장</div>
        <nav>
          <Link to="/RecentItem">
            <button>최근 본 상품</button>
          </Link>{' '}
          <Link to="/Like">
            <button>찜한 상품</button>
          </Link>{' '}
          <Link to="/Mypage">
            <button>주문 내역</button>
          </Link>{' '}
        </nav>
      </aside>
    </div>
  );
};

export default Aside;
