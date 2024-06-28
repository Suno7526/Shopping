import './Payment.css';
import React, { useMemo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const userCode = parseInt(sessionStorage.getItem('userCode'), 10);
  const location = useLocation();
  const { selectedProducts } = location.state;

  const [deliveryMemo, setDeliveryMemo] = useState('');
  const [customMemo, setCustomMemo] = useState('');
  const [shippingAddress, setShippingAddress] = useState(
    sessionStorage.getItem('userAddress') || '',
  );
  const [extraAddress, setExtraAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const jquery = document.createElement('script');
    jquery.src = 'http://code.jquery.com/jquery-1.12.4.min.js';
    const iamport = document.createElement('script');
    iamport.src = 'http://cdn.iamport.kr/js/iamport.payment-1.1.7.js';
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);

    // Daum 우편번호 서비스 스크립트 로드
    const daumPostcode = document.createElement('script');
    daumPostcode.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    document.head.appendChild(daumPostcode);

    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
      document.head.removeChild(daumPostcode);
    };
  }, []);

  const { totalPrice, orderName, total } = useMemo(() => {
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
      totalPrice: total + 100, // 배송비 추가
      orderName: name,
      total: total,
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
          amount: totalPrice,
          buyer_email: sessionStorage.getItem('userEmail'),
          buyer_name: sessionStorage.getItem('userName'),
          buyer_tel: sessionStorage.getItem('userPhone'),
          buyer_addr: `${shippingAddress} ${extraAddress}`,
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
                    shippingAddress: `${shippingAddress} ${extraAddress}`,
                    productSize: cart.cartSize,
                    productColor: cart.cartColor,
                    request:
                      deliveryMemo === '기타사항' ? customMemo : deliveryMemo,
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
              navigate('/mypage'); // 결제 성공 시 마이페이지로 이동
            } catch (error) {
              console.error('결제 검증 또는 주문 생성 중 오류 발생:', error);
              alert('결제 실패');
            }
          } else {
            alert('결제 실패');
          }
        },
      );
    } catch (error) {
      console.error('상품 결제 중 오류 발생:', error);
    }
  };

  const handlePostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr = data.address;
        let extraAddr = '';

        if (data.userSelectedType === 'R') {
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr +=
              extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
          }
          if (extraAddr !== '') {
            extraAddr = ' (' + extraAddr + ')';
          }
          addr += extraAddr;
        }

        setShippingAddress(addr);
      },
    }).open();
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">결제하기</h2>
      <div className="payment-4">
        <div className="payment-3">
          {/* 상품 정보 */}
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
                    사이즈: {cart.cartSize}{' '}
                  </div>
                  <div className="Payment-productColor">
                    색상: {cart.cartColor}
                  </div>
                  <div className="Payment-productQuantity">
                    수량: {cart.quantity}
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
            </div>
          </div>

          <div className="Delivery-section">
            <p className="Delivery-title">배송지 정보</p>
            <div className="DeliveryAndButton">
              <div className="  ">
                <input
                  type="text"
                  value={shippingAddress}
                  readOnly={true}
                  className="Delivery-address-input"
                />
                <input
                  type="button"
                  onClick={handlePostcode}
                  value="우편번호 찾기"
                />
                <input
                  type="text"
                  placeholder="나머지 주소를 입력하세요"
                  value={extraAddress}
                  onChange={(e) => setExtraAddress(e.target.value)}
                  className="Delivery-extra-address-input"
                />
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
                    onChange={(e) => setCustomMemo(e.target.value)} // 기타사항 텍스트 생성
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
                상품가격: {total}원
              </div>
              <div className="Final-paymentamount-delivery-fee">
                배송비: 2500원
              </div>
              <div className="Final-payment-total-div">
                <p className="Final-paymentamount-total">총 결제금액</p>
                <p className="Final-paymentmount-total-won">{totalPrice}원</p>
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
