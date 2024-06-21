import './Payment.css';
import React, { useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const userCode = parseInt(sessionStorage.getItem('userCode'), 10);
  const location = useLocation();
  const { selectedProducts } = location.state;

  useEffect(() => {
    const jquery = document.createElement('script');
    jquery.src = 'http://code.jquery.com/jquery-1.12.4.min.js';
    const iamport = document.createElement('script');
    iamport.src = 'http://cdn.iamport.kr/js/iamport.payment-1.1.7.js';
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
  }, []);

  const { totalPrice, orderName } = useMemo(() => {
    let total = 0;
    let name = '';

    selectedProducts.forEach((cart, index) => {
      total += cart.product.productPrice * cart.quantity;
      name += cart.product.productName;
      if (index !== selectedProducts.length - 1) {
        name += ', ';
      }
    });

    return {
      totalPrice: total + 2500, // add shipping fee
      orderName: name,
    };
  }, [selectedProducts]);

  const handlePurchase = async () => {
    try {
      const { IMP } = window;
      IMP.init('imp33740768');

      IMP.request_pay(
        {
          pg: 'html5_inicis',
          pay_method: 'card',
          merchant_uid: new Date().getTime().toString(),
          name: orderName,
          amount: 100, //totalPrice,
          buyer_email: sessionStorage.getItem('userEmail'),
          buyer_name: sessionStorage.getItem('userName'),
          buyer_tel: sessionStorage.getItem('userPhone'),
          buyer_addr: sessionStorage.getItem('userAddress'),
          buyer_postcode: '123-456',
        },
        async (rsp) => {
          if (rsp.success) {
            try {
              for (const cart of selectedProducts) {
                const productCode = parseInt(cart.product.productCode, 10);
                const { data } = await axios.post(
                  'http://localhost:8000/verifyIamport/' + rsp.imp_uid,
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
                    productSize: cart.cartSize,
                    productColor: cart.cartColor,
                    request: '', // Add request if you have a field for it
                  };
                  await axios.post(
                    'http://localhost:8000/orders/add',
                    orderData,
                  );
                } else {
                  alert('결제 실패');
                }
              }
              alert('결제 성공');
            } catch (error) {
              console.error(
                'Error while verifying payment or creating order:',
                error,
              );
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
            {selectedProducts.map((cart) => (
              <div
                className="Payment-payment-info"
                key={cart.product.productCode}
              >
                <img
                  src={`http://localhost:8000/getProductImage/${cart.product.productCode}`}
                  alt={cart.product.productName}
                  className="Payment-ItemImage"
                />
                <div className="Payment-product-info">
                  <div className="Payment-productName">
                    {cart.product.productName}
                  </div>{' '}
                  <div className="Payment-productSize">
                    Size : {cart.cartSize}{' '}
                  </div>
                  <div className="Payment-productColor">
                    Color : {cart.cartColor}
                  </div>
                  <div className="Payment-productQuantity">
                    수량:{cart.quantity}
                  </div>
                  <div className="Payment-productPrice">
                    가격: {cart.product.productPrice}원
                  </div>
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
              <div className="Payment-Delivery-Button">
                <button className="Delivery-Edit-Btn"> 수정 </button>
              </div>
            </div>
          </div>
        </div>

        <div className="Final-paymentamount-section">
          <p className="Final-paymentamount-title">최종 결제금액</p>
          <div className="Final-paymentamountAndButton">
            <div className="Final-paymentamount-info">
              <div className="Final-paymentamount-price">
                상품가격 {totalPrice - 100}원
              </div>
              <div className="Final-paymentamount-delivery-fee">
                배송비 = 100원
              </div>
              <div className="Final-payment-total-div">
                <p className="Final-paymentamount-total">총 결제금액 </p>
                <p className="Final-paymentmount-total-won">{totalPrice}원</p>
                <p className=""></p>
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
