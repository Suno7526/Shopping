import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Modal.css';

const Modal = ({ isOpen, onClose, product }) => {
  const [requestType, setRequestType] = useState('');
  const [customRequest, setCustomRequest] = useState('');
  const [size, setSize] = useState(''); // 초기 상태를 빈 문자열로 설정
  const [color, setColor] = useState(''); // 색상 선택 상태 추가

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
    if (!color) {
      alert('색상을 선택해주세요.');
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
      productColor: color,
      request: requestType === '기타사항' ? customRequest : requestType,
    };
  };

  const openDeliveryAddressWindow = () => {
    const url = 'https://example.com/delivery_address'; // 변경할 URL을 여기에 입력하세요
    window.open(url, '_blank', 'width=600,height=400'); // 새로운 윈도우를 엽니다
  };

  const handleOrderClick = () => {
    onOrder();
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
            <label>
              색상:
              <select value={color} onChange={(e) => setColor(e.target.value)}>
                <option value="" disabled>
                  색상 선택
                </option>
                {['빨강', '파랑', '초록', '검정', '흰색'].map((clr) => (
                  <option key={clr} value={clr}>
                    {clr}
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
