import React, { useEffect } from 'react';
import axios from 'axios';

const Payment = () => {
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
        merchant_uid: new Date().getTime(),
        name: '테스트 상품',
        amount: 1,
        buyer_email: sessionStorage.getItem('userEmail'),
        buyer_name: sessionStorage.getItem('userName'),
        buyer_tel: sessionStorage.getItem('userPhone'),
        buyer_addr: sessionStorage.getItem('userAddress'),
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

  return (
    <div>
      <button onClick={requestPay}>결제하기</button>
    </div>
  );
};

export default Payment;
