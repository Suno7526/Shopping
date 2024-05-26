import React, { useState } from 'react';
import axios from 'axios';
import './Modal.css';

const Modal = ({ isOpen, onClose, product }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState(
    sessionStorage.getItem('userAddress') || '',
  );
  const [request, setRequest] = useState('');
  const [customRequest, setCustomRequest] = useState('');
  const [size, setSize] = useState(product.productSize);

  const onOrder = async () => {
    const orderData = {
      userCode: Number(sessionStorage.getItem('userCode')),
      productCode: product.productCode,
      shippingAddress: address,
      name,
      contact,
      request: request === '기타사항' ? customRequest : request,
    };

    try {
      const response = await axios.post(
        'http://localhost:8000/orders/add',
        orderData,
      );

      if (response.status === 200) {
        alert('주문 되었습니다.');
      }
    } catch (error) {
      console.error('주문에 실패하였습니다:', error);
      alert('주문에 실패하였습니다.');
    }

    onClose();
  };

  const handleOrderClick = () => {
    onOrder();
  };

  const openDeliveryAddressWindow = () => {
    const url = 'https://example.com/delivery_address'; // 변경할 URL을 여기에 입력하세요
    window.open(url, '_blank', 'width=600,height=400'); // 새로운 윈도우를 엽니다
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
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </label>
            <label className="Modalcontact">
              연락처:
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </label>
            <label className="Delivery">
              배송지:
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
                        checked={request === option}
                        onChange={(e) => setRequest(e.target.value)}
                      />
                      {option}
                    </label>
                    {option === '기타사항' && request === '기타사항' && (
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
