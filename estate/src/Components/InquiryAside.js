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
          <Link to="/BestFAQ">
            <button>자주하는 질문</button>
          </Link>{' '}
          <Link to="/Question">
            <button>문의하기</button>
          </Link>{' '}
          <Link to="/Inquiry">
            <button>전체 문의내역</button>
          </Link>{' '}
          <Link to="/MyInquiry">
            <button>나의 문의내역</button>
          </Link>{' '}
        </nav>
      </aside>
    </div>
  );
};

export default Aside;
