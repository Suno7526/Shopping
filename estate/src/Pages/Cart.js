import React, { useEffect, useState } from 'react';
import './Cart.css';
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
        // 중복된 제품을 합치고 수량을 계산
        const uniqueProducts = [];
        response.data.forEach((item) => {
          const existingProduct = uniqueProducts.find(
            (product) => product.productCode === item.product.productCode,
          );
          if (existingProduct) {
            existingProduct.quantity += 1;
          } else {
            uniqueProducts.push({ ...item.product, quantity: 1 });
          }
        });
        setCartItems(uniqueProducts);
      } catch (error) {
        console.error('상품을 불러오는 중 오류 발생:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleDeleteItem = async (productCode) => {
    try {
      await axios.delete(
        `http://localhost:8000/deleteCartItem/${sessionStorage.getItem(
          'userCode',
        )}/${productCode}`,
      );
      const response = await axios.get(
        `http://localhost:8000/getCartProduct/${sessionStorage.getItem(
          'userCode',
        )}`,
      );
      // 중복된 제품을 합치고 수량을 계산
      const uniqueProducts = [];
      response.data.forEach((item) => {
        const existingProduct = uniqueProducts.find(
          (product) => product.productCode === item.product.productCode,
        );
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          uniqueProducts.push({ ...item.product, quantity: 1 });
        }
      });
      setCartItems(uniqueProducts);
    } catch (error) {
      console.error('상품을 삭제하는 중 오류 발생:', error);
    }
  };

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>메인페이지</title>

      <div className="cart">
        <h2>
          <div className="CartMaintitle">장바구니</div>
        </h2>
        <div className="Cartcolumn-labels">
          <label className="Cproduct-image">|Image</label>
          <label className="Cproduct-details">|Product</label>
          <label className="Cproduct-price">|Price</label>
          <label className="Cproduct-quantity">|Quantity</label>
          <label className="Cproduct-line-price">|Total $</label>
        </div>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div className="product-line" key={item.productCode}>
              <img
                src={`http://localhost:8000/getProductImage/${item.productCode}`}
                alt=""
                className="product-image"
              />
              <div className="product-details">
                <p>{item.productName}</p>
                <p>{item.productPrice}</p>
                <p>{item.productSize}</p>
                <p className="Cquantity">수량: {item.quantity}</p>
                <p className="Cprice">{item.productPrice * item.quantity}</p>
                <div className="Cartcheckbox">
                  <input type="checkbox" id={`checkbox-${item.id}`} />
                  <label htmlFor={`checkbox-${item.id}`}>선택</label>
                </div>
              </div>
              <div className="product-removal">
                <button
                  className="delete-item-btn"
                  onClick={() => handleDeleteItem(item.productCode)}
                >
                  X
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>장바구니가 비어 있습니다.</p>
        )}
      </div>
      <div className="Cartpurchaseline">
        <button className="Cartpurchase-btn">구매하기</button>
      </div>
    </div>
  );
};
export default Cart;
