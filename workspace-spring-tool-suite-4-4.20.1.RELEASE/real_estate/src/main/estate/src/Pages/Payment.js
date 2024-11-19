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
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const navigate = useNavigate();

  // API_URL 환경 변수를 사용
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const jquery = document.createElement('script');
    jquery.src = 'http://code.jquery.com/jquery-1.12.4.min.js';
    const iamport = document.createElement('script');
    iamport.src = 'http://cdn.iamport.kr/js/iamport.payment-1.1.7.js';
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);

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

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(
            `${API_URL}/CouponUser/${userCode}`,
        );
        const validCoupons = response.data.filter((coupon) => {
          const currentDate = new Date();
          return (
              new Date(coupon.issueDate) <= currentDate &&
              currentDate <= new Date(coupon.expiryDate) &&
              total >= coupon.minPurchaseAmount
          );
        });
        setCoupons(validCoupons);
      } catch (error) {
        console.error('쿠폰을 불러오는 중 오류 발생:', error);
      }
    };

    fetchCoupons();
  }, [userCode]);

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
      totalPrice: total + 2500, // 배송비 추가
      orderName: name,
      total: total,
    };
  }, [selectedProducts]);

  const finalPrice = useMemo(() => {
    let price = totalPrice;
    if (selectedCoupon) {
      price -= selectedCoupon.discountAmount;
    }
    return Math.max(price, 0); // 최종 가격이 음수가 되지 않도록 함
  }, [totalPrice, selectedCoupon]);

  const handleCouponChange = (e) => {
    const couponCode = e.target.value;
    if (couponCode) {
      const coupon = coupons.find(
          (c) => c.couponCode.toString() === couponCode,
      );
      setSelectedCoupon(coupon);
    } else {
      setSelectedCoupon(null);
    }
  };

  const handlePurchase = async () => {
    if (
        !deliveryMemo ||
        (deliveryMemo === '기타사항' && !customMemo) ||
        !shippingAddress ||
        !extraAddress
    ) {
      alert('배송메모와 나머지 주소를 모두 입력해주세요.');
      return;
    }

    try {
      const { IMP } = window;
      IMP.init('imp33740768');

      IMP.request_pay(
          {
            pg: 'html5_inicis',
            pay_method: 'card',
            merchant_uid: new Date().getTime().toString(),
            name: orderName,
            amount: 100, //finalPrice,
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
                      `${API_URL}/verifyIamport/` + rsp.imp_uid,
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
                      couponCode: selectedCoupon
                          ? selectedCoupon.couponCode
                          : null,
                      impUid: rsp.imp_uid,
                      orderPrice: finalPrice,
                    };
                    await axios.post(
                        `${API_URL}/orders/add`,
                        orderData,
                    );
                  } else {
                    alert('결제 실패');
                  }
                }
                alert('결제 성공');
                navigate('/mypage');
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
            <div className="payment-info-container">
              <p className="payment-info-p">주문상품정보</p>
              {selectedProducts.map((cart) => (
                  <div
                      className="Payment-payment-info"
                      key={cart.product.productCode}
                  >
                    <img
                        src={`${API_URL}/getProductImage/${cart.product.productCode}`}
                        alt={cart.product.productName}
                        className="Payment-ItemImage"
                    />
                    <div className="Payment-product-info">
                      <div className="Payment-productName">
                        {cart.product.productName}
                      </div>
                      <div className="Payment-productSize">
                        사이즈: {cart.cartSize}
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
                <button className="Orderer-address" onClick={handlePostcode}>
                  주소입력
                </button>
              </div>
            </div>
            <div className="Payment-discount-section">
              <label htmlFor="couponSelect">사용할 쿠폰:</label>
              <select
                  id="couponSelect"
                  onChange={handleCouponChange}
                  value={selectedCoupon ? selectedCoupon.couponCode : ''}
              >
                <option value="">쿠폰 선택</option>
                {coupons.map((coupon) => (
                    <option key={coupon.couponCode} value={coupon.couponCode}>
                      {coupon.couponName} ({coupon.discountAmount}원 할인)
                    </option>
                ))}
              </select>
            </div>
            <div className="Payment-summary">
              <div className="Payment-summary-row">
                <span>총 상품 가격</span>
                <span>{totalPrice}원</span>
              </div>
              {selectedCoupon && (
                  <div className="Payment-summary-row">
                    <span>쿠폰 할인</span>
                    <span>-{selectedCoupon.discountAmount}원</span>
                  </div>
              )}
              <div className="Payment-summary-row">
                <span>최종 결제 금액</span>
                <span>{finalPrice}원</span>
              </div>
              <div className="Payment-summary-row">
                <button className="payment-submit-button" onClick={handlePurchase}>
                  결제하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Payment;
