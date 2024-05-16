import React, { useEffect } from 'react';
import axios from 'axios'; // axios를 임포트합니다.
import './Modal.css';

const Modal = ({ isOpen, onClose, product }) => {
  const onOrder = async () => {
    // 주문 정보를 백엔드로 보내는 함수
    const orderData = {
      userCode: Number(sessionStorage.getItem('userCode')), // 세션에서 userCode를 가져와 Long 타입으로 변환합니다.
      productCode: product.productCode, // product 객체에서 productCode를 가져옵니다.
      shippingAddress: sessionStorage.getItem('userAddress'),
    };

    try {
      // axios를 사용하여 POST 요청을 보냅니다.
      const response = await axios.post(
        'http://localhost:8000/orders/add',
        orderData,
      );

      // 요청이 성공적으로 처리된 경우
      if (response.status === 200) {
        alert('주문 되었습니다.');
      }
    } catch (error) {
      // 요청 중에 오류가 발생한 경우
      console.error('주문에 실패하였습니다:', error);
      alert('주문에 실패하였습니다.');
    }

    // 주문 후 모달을 닫습니다.
    onClose();
    const { IMP } = window;
    IMP.init('imp33740768');

    IMP.request_pay(
      {
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: new Date().getTime(),
        name: '테스트 상품',
        amount: 1,
        buyer_email: 'test@naver.com',
        buyer_name: '코드쿡',
        buyer_tel: '010-1234-5678',
        buyer_addr: '서울특별시',
        buyer_postcode: '123-456',
      },
      async (rsp) => {
        try {
          const { data } = await axios.post(
            'http://localhost:8000/verifyIamport/' + rsp.imp_uid,
          );
          if (rsp.paid_amount === data.response.amount) {
            alert('결제 성공');
          } else {
            alert('결제 실패');
          }
        } catch (error) {
          console.error('Error while verifying payment:', error);
          alert('결제 실패');
        }
      },
    );
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

  const requestPay = () => {};

  return (
    <div>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <b>정보가 맞는지 확인해주세요!😊</b>
            <hr />
            <p>주소: {sessionStorage.getItem('userAddress')}</p>
            <p>사이즈: {product.productSize}</p>
            <p>가격: {product.productPrice}</p>
            <button className="order-btn" onClick={handleOrderClick}>
              주문하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
