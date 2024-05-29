import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Modal.css';

const Modal = ({ isOpen, onClose, product }) => {
  const [requestType, setRequestType] = useState('');
  const [customRequest, setCustomRequest] = useState('');
  const [size, setSize] = useState(''); // 초기 상태를 빈 문자열로 설정

  const validateInputs = () => {
    const userPhone = sessionStorage.getItem('userPhone');
    const userAddress = sessionStorage.getItem('userAddress');

    if (!userPhone) {
      alert('연락처를 입력해주세요.');
      return false;
    }
    if (!userAddress) {
      alert('배송지를 입력해주세요.');
      return false;
    }
    if (!size) {
      alert('사이즈를 선택해주세요.');
      return false;
    }
    if (!requestType) {
      alert('배송 요청 사항을 선택해주세요.');
      return false;
    }
    if (requestType === '기타사항' && !customRequest) {
      alert('기타 사항을 입력해주세요.');
      return false;
    }
    return true;
  };

  const onOrder = async () => {
    if (!validateInputs()) {
      return;
    }

    const orderData = {
      userCode: Number(sessionStorage.getItem('userCode')),
      productCode: product.productCode,
      shippingAddress: sessionStorage.getItem('userAddress'),
      productSize: size,
      request: requestType === '기타사항' ? customRequest : requestType,
    };

    try {
      const response = await axios.post(
        'http://localhost:8000/orders/add',
        orderData,
      );

      if (response.status === 200) {
        alert('주문 되었습니다.');
        onClose();
      }
    } catch (error) {
      console.error('주문에 실패하였습니다:', error);
      alert('주문에 실패하였습니다.');
    }
  };

  const openDeliveryAddressWindow = () => {
    const url = 'https://example.com/delivery_address'; // 변경할 URL을 여기에 입력하세요
    window.open(url, '_blank', 'width=600,height=400'); // 새로운 윈도우를 엽니다
  };

  const handleOrderClick = () => {
    onOrder();
  };

  useEffect(() => {
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

  const requestPay = () => {
    const { IMP } = window;
    IMP.init('imp33740768');

    IMP.request_pay(
      {
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: new Date().getTime().toString(), // 주문 번호로 사용
        name: product.productName,
        amount: 100,
        buyer_email: sessionStorage.getItem('userEmail'),
        buyer_name: sessionStorage.getItem('userName'),
        buyer_tel: sessionStorage.getItem('userPhone'),
        buyer_addr: sessionStorage.getItem('userAddress'),
        buyer_postcode: '123-456',
      },
      async (rsp) => {
        if (rsp.success) {
          try {
            const { data } = await axios.post(
              'http://localhost:8000/verifyIamport/' + rsp.imp_uid,
              {
                productCode: product.productCode,
                userCode: sessionStorage.getItem('userCode'),
              },
            );
            if (rsp.paid_amount === data.response.amount) {
              alert('결제 성공');
              await onOrder(); // 결제 성공 시 onOrder 함수 호출
            } else {
              alert('결제 실패');
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
  };

  return (
    <div>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="Modal-close" onClick={onClose}>
              &times;
            </span>
            <b>정보가 맞는지 확인해주세요!😊</b>
            <hr />
            <label className="Modalproductname">
              상품명 :
              <input type="text" value={product.productName} readOnly />
            </label>
            <label className="Modalcontact">
              연락처:
              <input
                type="text"
                value={sessionStorage.getItem('userPhone')}
                readOnly
              />
            </label>
            <label className="Delivery">
              배송지:
              <input
                type="text"
                value={sessionStorage.getItem('userAddress')}
                readOnly
              />
            </label>
            <div className="DeliveryChange">
              <button
                className="DeliveryChange-btn"
                onClick={openDeliveryAddressWindow}
              >
                배송지 변경
              </button>
            </div>
            <label className="DeliveryRequest">
              배송 요청 사항:
              <div className="DeliveryRequestEtc">
                {[
                  '문 앞',
                  '직접 받고 부재 시 문 앞',
                  '경비실',
                  '택배함',
                  '기타사항',
                ].map((option) => (
                  <div key={option}>
                    <label className="Modal-DeliveryLabel">
                      <input
                        className="Modal-Deliveryinput"
                        type="radio"
                        value={option}
                        checked={requestType === option}
                        onChange={(e) => setRequestType(e.target.value)}
                      />
                      {option}
                    </label>
                    {option === '기타사항' && requestType === '기타사항' && (
                      <input
                        type="text"
                        value={customRequest}
                        onChange={(e) => setCustomRequest(e.target.value)}
                        placeholder="기타 사항을 입력하세요"
                      />
                    )}
                  </div>
                ))}
              </div>
            </label>
            <label>
              사이즈:
              <select value={size} onChange={(e) => setSize(e.target.value)}>
                <option value="" disabled>
                  사이즈 선택
                </option>
                {Array.from({ length: 7 }, (_, i) => 90 + i * 5).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </label>
            <p>가격: {product.productPrice}</p>
            <br></br>
            <br></br>
            <button className="Modal-order-btn" onClick={handleOrderClick}>
              주문하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
