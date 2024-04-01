import React, { useEffect, useState } from 'react';
import './Cart.css';
import Header from '../Components/Header';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getCartProduct/${sessionStorage.getItem(
            'userCode',
          )}`,
        );
        setCartItems(response.data);
      } catch (error) {
        console.error('상품을 불러오는 중 오류 발생:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div id="cart">
        <h2>장바구니</h2>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div className="product-line" key={item.id}>
              <img src="" alt="" className="product-image" />
              <div className="product-details">
                <p>{item.product.productName}</p>
                <p>{item.product.productPrice}</p>
                <p>{}</p>
                <p>{item.product.productPrice}</p>
              </div>
              <button className="delete-item-btn">X</button>
            </div>
          ))
        ) : (
          <p>장바구니가 비어 있습니다.</p>
        )}
      </div>
      <footer>
        <p>© 기타 문의 바람.</p>
      </footer>
    </div>
  );
};

export default Cart;
