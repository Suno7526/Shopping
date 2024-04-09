import React from 'react';
import './RecentItem.css'; // 외부 스타일 시트 불러오기
import { Link } from 'react-router-dom'; // Link import 추가

const RecentItem = () => {
  const orderHistory = [
    {
      id: 1,
      productImage: 'gardigun.jpg',
    },
    {
      id: 2,
      productImage: 'gardigun.jpg',
    },
  ];

  return (
    <div className="page">
      <nav>
        <ul></ul>
      </nav>
      <hr /> {/* hr 바로 위에 aside 위치하도록 변경 */}
      <aside className="sidebar">
        <nav>
          <Link to="/RecentItem">
            <button>최근 본 상품</button>
          </Link>{' '}
          {/* Link를 사용하여 버튼 클릭 시 RecentItem 컴포넌트로 이동 */}
          <button>찜한 상품</button>
          <button>주문 내역</button>
          <Link to="/Question">
            <button>문의 하기</button>
          </Link>{' '}
        </nav>
      </aside>
      <article>
        <h2>최근 본 상품</h2>
        <ul>
          <li>최근 본 상품 내역</li>
        </ul>
      </article>
      <section>
        <table>
          <thead>
            <tr>
              <th>상품정보</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order) => (
              <tr key={order.id}>
                <td>
                  <img
                    src={order.productImage}
                    alt={order.productImage}
                    style={{ width: '100px', height: '100px' }}
                  />
                  <div>
                    <strong>브렌슨</strong>
                    <br />
                    [패키지] 원턱 와이드 트레이닝 팬츠
                    <br />
                    옵션 : 블랙 : M : 멜란지 M(+0)
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default RecentItem;
