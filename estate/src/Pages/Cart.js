import React, { useEffect, useState } from 'react';
import './Cart.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();
  const userCode = sessionStorage.getItem('userCode');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/cart/${userCode}`,
        );
        const uniqueProducts = [];
        response.data.forEach((item) => {
          const existingProductIndex = uniqueProducts.findIndex(
            (product) =>
              product.product.productCode === item.product.productCode &&
              product.cartColor === item.cartColor &&
              product.cartSize === item.cartSize,
          );
          if (existingProductIndex !== -1) {
            uniqueProducts[existingProductIndex].quantity += 1;
          } else {
            uniqueProducts.push({ ...item, quantity: 1 });
          }
        });
        setCartItems(uniqueProducts);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setCartItems([]);
        } else {
          console.error('상품을 불러오는 중 오류 발생:', error);
        }
      }
    };

    fetchCartItems();

    const jquery = document.createElement('script');
    jquery.src = 'http://code.jquery.com/jquery-1.12.4.min.js';
    const iamport = document.createElement('script');
    iamport.src = 'http://cdn.iamport.kr/js/iamport.payment-1.1.7.js';
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);

    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, [userCode]);

  const handleDeleteItem = async (cartCode) => {
    try {
      await axios.delete(
        `http://localhost:8000/deleteCartItem/${userCode}/${cartCode}`,
      );
      const response = await axios.get(
        `http://localhost:8000/cart/${userCode}`,
      );
      setCartItems(response.data);
      alert('상품을 삭제했습니다.');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setCartItems([]);
        alert('장바구니가 비었습니다.');
      } else {
        console.error('상품을 삭제하는 중 오류 발생:', error);
      }
    }
  };

  const handleCheckboxChange = (product) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(product)
        ? prevSelected.filter((item) => item !== product)
        : [...prevSelected, product],
    );
  };

  const handleQuantityChange = (cartCode, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartCode === cartCode ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handlePurchase = () => {
    if (selectedProducts.length > 0) {
      navigate('/payment', { state: { selectedProducts } });
    } else {
      alert('구매할 상품을 선택해주세요.');
    }
  };

  const totalProductsPrice = cartItems
    .filter((item) => selectedProducts.includes(item))
    .reduce((acc, item) => acc + item.product.productPrice * item.quantity, 0);

  const discountAmount = 5000;
  const totalAmount = totalProductsPrice - discountAmount;

  return (
    <div>
      <div
        className="Cart-div"
        style={{ marginLeft: '50px', marginRight: '50px' }}
      >
        <div className="Cart-Maintitle">장바구니</div>
        <div className="Cart-MainImage"></div>
        {cartItems.length === 0 ? (
          <div className="Cart-empty-message">장바구니가 비어있습니다.</div>
        ) : (
          <>
            <div className="cart-column-labels">
              <label className="cart-product-image-label">Image</label>
              <label className="cart-product-details-label">Product</label>
              <label className="cart-product-price-label">Price</label>
              <label className="cart-product-quantity-label">Quantity</label>
              <label className="cart-product-line-price-label">Total</label>
            </div>
            {cartItems.map((item) => (
              <div className="cart-product" key={item.cartCode}>
                <div className="cart-product-image">
                  <Link to={`/product/${item.product.productCode}`}>
                    <img
                      src={`http://localhost:8000/getProductImage/${item.product.productCode}`}
                      alt={item.product.productName}
                    />
                  </Link>
                </div>
                <div className="cart-product-details">
                  <div className="cart-product-title">
                    {item.product.productName} / 색상 : {item.cartColor} /
                    사이즈 : {item.cartSize}
                  </div>
                </div>
                <div className="cart-product-price">
                  {item.product.productPrice}원
                </div>
                <div className="cart-product-quantity">
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(
                        item.cartCode,
                        parseInt(e.target.value),
                      )
                    }
                  />
                </div>
                <div className="cart-product-removal">
                  <button
                    className="cart-remove-product"
                    onClick={() => handleDeleteItem(item.cartCode)}
                  >
                    Remove
                  </button>
                </div>
                <div className="cart-product-line-price">
                  {item.product.productPrice * item.quantity}원
                </div>
                <div className="cart-product-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(item)}
                    onChange={() => handleCheckboxChange(item)}
                    style={{ transform: 'scale(1.5)' }}
                  />
                </div>
              </div>
            ))}
            <div className="cart-totals">
              <div className="cart-totals-item">
                <label>총상품금액</label>
                <div className="cart-totals-value" id="cart-subtotal">
                  {totalProductsPrice}원
                </div>
              </div>
              <div className="cart-totals-item">
                <label>할인금액</label>
                <div className="cart-totals-value" id="cart-tax">
                  {discountAmount}원
                </div>
              </div>
              <div className="cart-totals-item cart-totals-item-total">
                <label>총합계</label>
                <div className="cart-totals-value" id="cart-total">
                  {totalAmount}원
                </div>
              </div>
            </div>
            <button className="cart-checkout" onClick={handlePurchase}>
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
