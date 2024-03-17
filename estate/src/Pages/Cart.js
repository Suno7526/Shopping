import React, { useEffect, useState } from 'react'; // React와 useEffect 불러오기
import './Cart.css';

const CartItem = ({ id, name, price, quantity, image, onDelete }) => (
  <div className="product-line">
    <img src={'gardigun.jpg'} alt={name} className="product-image" />
    <div className="product-details">
      <p>{name}</p>
      <p>{price}</p>
      <p>{quantity}</p>
      <p>{price * quantity}</p>
    </div>
    <button className="delete-item-btn" onClick={() => onDelete(id)}>
      X
    </button>
  </div>
);

const Cart = () => {
  useEffect(() => {
    // total-product 요소 찾기
    const totalProductElement = document.getElementById('total-product');
    // product-line 클래스를 가진 요소들 찾기
    const productLines = document.querySelectorAll('.product-line');
    // productLines의 개수를 total-product 요소에 표시
    if (totalProductElement) {
      totalProductElement.innerHTML = ''; // 초기화
      totalProductElement.innerHTML = `
        <p>총 상품 개수: ${productLines.length}</p>
        <p>상품명:</p>  
        <p>판매가</p>
        <p>수량</p>
        <p>주문금액</p>
      `;
    }
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행 // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: '상품 1',
      price: 10,
      quantity: 1,
      image: 'product_image.jpg',
    },
    {
      id: 2,
      name: '상품 2',
      price: 20,
      quantity: 1,
      image: 'product_image.jpg',
    },
  ]);

  const handleDeleteAll = () => {
    setCartItems([]); // 카트 아이템 배열을 빈 배열로 업데이트하여 전체 삭제
  };

  const handleDeleteItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
  };

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>메인페이지</title>
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

      <div id="cart">
        <h2>장바구니</h2>
        {cartItems.length === 0 ? (
          <p>장바구니가 비어있습니다...</p>
        ) : (
          <div>
            <div id="total-product"></div>
            <hr />
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                id={item.id} // 상품 ID 전달
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                image={item.image}
                onDelete={handleDeleteItem} // 수정된 삭제 함수 전달
              />
            ))}
            <button className="buy-btn">구매하기</button>
            <button className="delete-all-btn" onClick={handleDeleteAll}>
              품목 전체 삭제
            </button>
          </div>
        )}
      </div>

      <footer>
        <p>© 기타 문의 바람.</p>
      </footer>
    </div>
  );
};

export default Cart;
