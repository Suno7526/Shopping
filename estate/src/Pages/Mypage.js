//my page
import React from 'react';
import './Mypage.css'; // 외부 스타일 시트 불러오기

const Mypage = () => {
  return (
    <div className="page">
      <Header />
      <Menu />
      <hr /> {/* hr 바로 위에 aside 위치하도록 변경 */}
      <Aside />
      <Article />
      <Section />
      <Footer />
    </div>
  );
};

const Header = () => {
  return (
    <header>
      <header>
        <div id="branding">
          <h1>옷옷장</h1>
        </div>
      </header>

      <header>
        <nav id="gnb">
          <ul>
            <li>
              <a href="#outer">OUTER</a>
              <ul>
                <li>
                  <a href="#jacket">JACKET</a>
                </li>
                <li>
                  <a href="#zip-up">ZIP-UP</a>
                </li>
                <li>
                  <a href="#jumper">JUMPER</a>
                </li>
                <li>
                  <a href="#coat">COAT</a>
                </li>
                <li>
                  <a href="#padding">PADDING / PARKA</a>
                </li>
                <li>
                  <a href="#fur">FUR / MUSTANG</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#top">TOP</a>
              <ul>
                <li>
                  <a href="#sleeveless">SLEEVELESS / VEST</a>
                </li>
                <li>
                  <a href="#short-tee">SHORT TEE</a>
                </li>
                <li>
                  <a href="#long-tee">LONG TEE</a>
                </li>
                <li>
                  <a href="#shirts">SHIRTS</a>
                </li>
                <li>
                  <a href="#crewneck">CREWNECK</a>
                </li>
                <li>
                  <a href="#knit">KNIT</a>
                </li>
                <li>
                  <a href="#hoodie">HOODIE</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#bottom">BOTTOM</a>
              <ul>
                <li>
                  <a href="#short-pants">SHORT PANTS</a>
                </li>
                <li>
                  <a href="#sweat-pants">SWEAT PANTS</a>
                </li>
                <li>
                  <a href="#long-pants">LONG PANTS</a>
                </li>
                <li>
                  <a href="#skirt">SKIRT</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#headwear">HEADWEAR</a>
              <ul>
                <li>
                  <a href="#cap">CAP</a>
                </li>
                <li>
                  <a href="#bucket-hat">BUCKET HAT</a>
                </li>
                <li>
                  <a href="#snapback">SNAPBACK</a>
                </li>
                <li>
                  <a href="#beanie">BEANIE</a>
                </li>
                <li>
                  <a href="#etc">ETC.</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
      <hr />
    </header>
  );
};

const Menu = () => {
  return (
    <nav>
      <ul></ul>
    </nav>
  );
};

const Article = () => {
  return (
    <article>
      <h2>주문내역 조회</h2>
      <ul>
        <li>주문내역에 관한 내용</li>
      </ul>
    </article>
  );
};

const Section = () => {
  // 주문내역 데이터 예시 (이미지 URL 포함)
  const orderHistory = [
    {
      id: 1,
      productImage: 'gardigun.jpg',
      orderDate: '2024-03-16',
      orderNumber: 'ORD001',
      orderAmount: '$50',
    },
    {
      id: 2,
      productImage: 'cocodi.jpg',
      orderDate: '2024-03-15',
      orderNumber: 'ORD002',
      orderAmount: '$80',
    },
    {
      id: 3,
      productImage: 'cococodi.jpg',
      orderDate: '2024-03-14',
      orderNumber: 'ORD003',
      orderAmount: '$120',
    },
  ];

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>상품정보</th>
            <th>주문일자</th>
            <th>주문번호</th>
            <th>주문금액</th>
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
              <td>{order.orderDate}</td>
              <td>{order.orderNumber}</td>
              <td>{order.orderAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

const Aside = () => {
  // Aside 컴포넌트 추가
  return (
    <aside>
      <nav>나의 활동</nav>
      <p>찜한 상품</p>
      <p>주문 내역</p>
      <p>장바구니</p>
      <p>문의</p>
    </aside>
  );
};

const Footer = () => {
  return (
    <footer>
      <p>&copy; 2024 Footer. All rights reserved.</p>
    </footer>
  );
};

export default Mypage;
