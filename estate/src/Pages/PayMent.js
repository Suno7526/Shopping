import './Payment.css';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Payment = () => {
  const userCode = sessionStorage.getItem('userCode');
  const location = useLocation();
  const { selectedProducts } = location.state;

  return (
    <div className="payment-container">
      <h2 className="payment-title">결제하기</h2>
      <div className="payment-4">
        <div className="payment-container">
          <h2 className="payment-title">결제하기</h2>
          {/* 상품 정보를 출력하는 부분 */}
          <div className="payment-info-container">
            <p className="payment-info-p">주문상품정보</p>
            {selectedProducts.map((cart) => (
              <div className="payment-info" key={cart.product.productCode}>
                <img
                  src={`http://localhost:8000/getProductImage/${cart.product.productCode}`}
                  alt={cart.product.productName}
                  className="Payment-Item"
                />
                <div className="product-info">
                  상품 정보: {cart.product.productName}/사이즈 : {cart.cartSize}{' '}
                  / 색상 : {cart.cartColor}/ 수량:
                  {cart.quantity} / 가격: {cart.product.productPrice}원
                </div>
              </div>
            ))}
          </div>

          <div className="Orderer-section">
            <p className="Orderer-title">주문자정보</p>
            <div className="OrdererAndButton">
              <div className="Orderer-info">
                <p className="Orderer-Name">
                  {sessionStorage.getItem('userName')}
                </p>
                <p className="Orderer-Phone">
                  {sessionStorage.getItem('userPhone')}
                </p>
                <p className="Orderer-Email">
                  {sessionStorage.getItem('userEmail')}
                </p>
              </div>
              <div className="Orderer-Button">
                <button className="Orderer-Edit-Btn"> 수정 </button>
              </div>
            </div>
          </div>

          <div className="Delivery-section">
            <p className="Delivery-title">배송지 정보</p>
            <div className="DeliveryAndButton">
              <div className="Delivery-info">
                <p className="Delivery-address">
                  {sessionStorage.getItem('userAddress')}
                </p>
                <select
                  id="Delivery-ListBox"
                  name="Delivery-ListBox"
                  className="Delivery-ListBox-input"
                >
                  <option value="">배송메모를 선택하세요</option>
                  <option value="">문 앞</option>
                  <option value="">직접 받고 부재 시 문 앞</option>
                  <option value="">경비실</option>
                  <option value="">택배함</option>
                </select>
              </div>
              <div className="Delivery-Button">
                <button className="Delivery-Edit-Btn"> 수정 </button>
              </div>
            </div>
          </div>
        </div>

        <div className="Final-paymentamount-section">
          <p className="Final-paymentamount-title">최종 결제금액</p>
          <div className="Final-paymentamountAndButton">
            <div className="Final-paymentamount-info">
              <p className="Final-paymentamount-price">상품가격 18,000원</p>
              <p className="Final-paymentamount-delivery-fee">
                배송비 + 2500원
              </p>
              <div className="Final-payment-total-div">
                <p className="Final-paymentamount-total">총 결제금액 </p>
                <p className="Final-paymentmount-total-won">20,500원</p>
                <p className=""></p>
              </div>
              <button className="cart-checkout" onClick={''}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
