import './Payment.css';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const userCode = parseInt(sessionStorage.getItem('userCode'), 10);
  const location = useLocation();
  const { product, selectedColor, selectedSize } = location.state;

  const [deliveryMemo, setDeliveryMemo] = useState('');
  const [customMemo, setCustomMemo] = useState('');

  useEffect(() => {
    const jquery = document.createElement('script');
    jquery.src = 'http://code.jquery.com/jquery-1.12.4.min.js';
    const iamport = document.createElement('script');
    iamport.src = 'http://cdn.iamport.kr/js/iamport.payment-1.1.7.js';
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
  }, []);

  const handlePurchase = async () => {
    try {
      const { IMP } = window;
      IMP.init('imp33740768');

      IMP.request_pay(
        {
          pg: 'html5_inicis',
          pay_method: 'card',
          merchant_uid: new Date().getTime().toString(),
          name: product.productName,
          amount: product.productPrice + 100, // 상품 가격에 배송비 추가
          buyer_email: sessionStorage.getItem('userEmail'),
          buyer_name: sessionStorage.getItem('userName'),
          buyer_tel: sessionStorage.getItem('userPhone'),
          buyer_addr: sessionStorage.getItem('userAddress'),
          buyer_postcode: '123-456',
        },
        async (rsp) => {
          if (rsp.success) {
            try {
              const productCode = parseInt(product.productCode, 10);
              const { data } = await axios.post(
                `http://localhost:8000/verifyIamport/${rsp.imp_uid}`,
                {
                  productCode: productCode,
                  userCode: userCode,
                },
              );
              if (rsp.paid_amount === data.response.amount) {
                const orderData = {
                  userCode: userCode,
                  productCode: productCode,
                  shippingAddress: sessionStorage.getItem('userAddress'),
                  productSize: selectedSize,
                  productColor: selectedColor,
                  request:
                    deliveryMemo === '기타사항' ? customMemo : deliveryMemo, // 요청사항 필드 추가 가능
                };
                await axios.post('http://localhost:8000/orders/add', orderData);
                alert('결제 성공');
              } else {
                alert('결제 실패');
              }
            } catch (error) {
              console.error('결제 검증 또는 주문 생성 중 오류:', error);
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

  return (
    <div className="payment-container">
      <h2 className="payment-title">결제하기</h2>
      <div className="payment-4">
        <div className="payment-3">
          {/* 상품 정보를 출력하는 부분 */}
          <div className="payment-info-container">
            <p className="payment-info-p">주문상품정보</p>
            <div className="Payment-payment-info" key={product.productCode}>
              <img
                src={`http://localhost:8000/getProductImage/${product.productCode}`}
                alt={product.productName}
                className="Payment-ItemImage"
              />
              <div className="Payment-product-info">
                <div className="Payment-productName">{product.productName}</div>
                <div className="Payment-productSize">Size : {selectedSize}</div>
                <div className="Payment-productColor">
                  Color : {selectedColor}
                </div>
                <div className="Payment-productQuantity">수량: 1</div>
                <div className="Payment-productPrice">
                  가격: {product.productPrice}원
                </div>
              </div>
            </div>
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
                  value={deliveryMemo}
                  onChange={(e) => setDeliveryMemo(e.target.value)}
                >
                  <option value="">배송메모를 선택하세요</option>
                  <option value="문 앞">문 앞</option>
                  <option value="직접 받고 부재 시 문 앞">
                    직접 받고 부재 시 문 앞
                  </option>
                  <option value="경비실">경비실</option>
                  <option value="택배함">택배함</option>
                  <option value="기타사항">기타사항</option>
                </select>
                {deliveryMemo === '기타사항' && (
                  <input
                    type="text"
                    placeholder="기타 사항을 입력하세요"
                    value={customMemo}
                    onChange={(e) => setCustomMemo(e.target.value)} //기타사항 텍스트 생성
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="Final-paymentamount-section">
          <p className="Final-paymentamount-title">최종 결제금액</p>
          <div className="Final-paymentamountAndButton">
            <div className="Final-paymentamount-info">
              <div className="Final-paymentamount-price">
                상품가격 {product.productPrice}원
              </div>
              <div className="Final-paymentamount-delivery-fee">
                배송비 = 2500원
              </div>
              <div className="Final-payment-total-div">
                <p className="Final-paymentamount-total">총 결제금액 </p>
                <p className="Final-paymentmount-total-won">
                  {product.productPrice + 100}원
                </p>
              </div>
              <button className="cart-checkout" onClick={handlePurchase}>
                결제
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
