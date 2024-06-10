import React, { useEffect, useState } from 'react';
import './Cart.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const userCode = sessionStorage.getItem('userCode');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getCartProduct/${userCode}`,
        );
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
        if (error.response && error.response.status === 404) {
          setCartItems([]);
        } else {
          console.error('상품을 불러오는 중 오류 발생:', error);
        }
      }
    };
    fetchProducts();

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
      alert('상품을 삭제했습니다.');
      setCartItems(uniqueProducts);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setCartItems([]);
        alert('장바구니가 비었습니다.');
      } else {
        console.error('상품을 삭제하는 중 오류 발생:', error);
      }
    }
  };

  const handleCheckboxChange = (productCode) => {
    const selectedIndex = selectedProducts.indexOf(productCode);
    if (selectedIndex === -1) {
      setSelectedProducts([...selectedProducts, productCode]);
    } else {
      const updatedSelectedProducts = [...selectedProducts];
      updatedSelectedProducts.splice(selectedIndex, 1);
      setSelectedProducts(updatedSelectedProducts);
    }
  };

  const handleQuantityChange = (productCode, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productCode === productCode
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  };

  const handlePurchase = async () => {
    try {
      const orderName = 'Selected Products Purchase';
      let totalPrice = 0;
      selectedProducts.forEach((productCode) => {
        const selectedProduct = cartItems.find(
          (item) => item.productCode === productCode,
        );
        totalPrice += selectedProduct.productPrice * selectedProduct.quantity;
      });

      const { IMP } = window;
      IMP.init('imp33740768');

      IMP.request_pay(
        {
          pg: 'html5_inicis',
          pay_method: 'card',
          merchant_uid: new Date().getTime().toString(),
          name: orderName,
          amount: totalPrice,
          buyer_email: sessionStorage.getItem('userEmail'),
          buyer_name: sessionStorage.getItem('userName'),
          buyer_tel: sessionStorage.getItem('userPhone'),
          buyer_addr: sessionStorage.getItem('userAddress'),
          buyer_postcode: '123-456',
        },
        async (rsp) => {
          if (rsp.success) {
            try {
              for (const productCode of selectedProducts) {
                const { data } = await axios.post(
                  'http://localhost:8000/verifyIamport/' + rsp.imp_uid,
                  {
                    productCode: productCode,
                    userCode: sessionStorage.getItem('userCode'),
                  },
                );
                if (rsp.paid_amount === data.response.amount) {
                  alert('결제 성공');
                } else {
                  alert('결제 실패');
                }
              }
            } catch (error) {
              console.error('Error while verifying payment:', error);
              alert('결제 실패');
            }
          } else {
            alert('결제 실패');
          }
        },
      );
    } catch (error) {
      console.error('상품을 결제하는 중 오류 발생:', error);
    }
  };

  const totalProductsPrice = cartItems.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0,
  );

  const selectedProductsTotalPrice = selectedProducts.reduce(
    (acc, productCode) => {
      const selectedProduct = cartItems.find(
        (item) => item.productCode === productCode,
      );
      return acc + selectedProduct.productPrice * selectedProduct.quantity;
    },
    0,
  );

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
          <div className="Cart-empty-message">장바구니가 비었습니다.</div>
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
              <div className="cart-product" key={item.productCode}>
                <div className="cart-product-image">
                  <Link to={`/product/${item.productCode}`}>
                    <img
                      src={`http://localhost:8000/getProductImage/${item.productCode}`}
                      alt={item.productName}
                    />
                  </Link>
                </div>
                <div className="cart-product-details">
                  <div className="cart-product-title">{item.productName}/</div>
                </div>
                <div className="cart-product-price">{item.productPrice}원</div>
                <div className="cart-product-quantity">
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(
                        item.productCode,
                        parseInt(e.target.value),
                      )
                    }
                  />
                </div>
                <div className="cart-product-removal">
                  <button
                    className="cart-remove-product"
                    onClick={() => handleDeleteItem(item.productCode)}
                  >
                    Remove
                  </button>
                </div>
                <div className="cart-product-line-price">
                  {item.productPrice * item.quantity}원
                </div>
                <div className="cart-product-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(item.productCode)}
                    onChange={() => handleCheckboxChange(item.productCode)}
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
