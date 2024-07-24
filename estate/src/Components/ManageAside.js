import React from 'react';
import { Link } from 'react-router-dom'; // Link import 추가
import './Aside.css'; // 외부 스타일 시트 불러오기

const ManageAside = () => {
  return (
    <div>
      <aside className="sidebar">
        <nav className="sidebar-Buttons">
          <Link to="/ProductUpdate" className="RecentItemButton-div">
            <button className="RecentItemButton">🕒 상품수정</button>
          </Link>
          <Link to="/ProductJoin" className="LikeItemButton-div">
            <button className="LikeItemButton">🖤 상품등록</button>
          </Link>{' '}
          <Link to="/CouponAccept" className="MypageItemButton-div">
            <button className="MypageButton">🧾 쿠폰수정</button>
          </Link>{' '}
          <Link to="/CouponCreate" className="MypageItemButton-div">
            <button className="MypageButton">🧾 쿠폰등록</button>
          </Link>{' '}
          <Link to="/Refund" className="MypageItemButton-div">
            <button className="MypageButton">🧾 환불승인</button>
          </Link>{' '}
        </nav>
      </aside>
    </div>
  );
};

export default ManageAside;
