import React from 'react';
import { Link } from 'react-router-dom'; // Link import 추가

const Aside = () => {
  return (
    <div>
      <nav>
        <ul></ul>
      </nav>
      <hr />
      <aside className="sidebar">
        <nav>
          <Link to="/Mypage">
            <button>자주하는 질문</button>
          </Link>{' '}
          <Link to="/Question">
            <button>문의하기</button>
          </Link>{' '}
          <Link to="/Like">
            <button>문의내역</button>
          </Link>{' '}
        </nav>
      </aside>
    </div>
  );
};

export default Aside;
