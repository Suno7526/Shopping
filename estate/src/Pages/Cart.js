import React, { useEffect, useState } from 'react';
import './Cart.css';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getCartProduct/${sessionStorage.getItem(
            'userCode',
          )}`,
        );
        // 중복된 제품을 합치고 수량을 계산
        const uniqueProducts = [];
        response.data.forEach((item) => {
          const existingProduct = uniqueProducts.find(
            (product) => product.productCode === item.product.productCode,
          );
          if (existingProduct) {
            existingProduct.quantity += 1;
          } else {
            uniqueProducts.push({ ...item.product, quantity: 1 });
          }
        });
        setCartItems(uniqueProducts);
      } catch (error) {
        console.error('상품을 불러오는 중 오류 발생:', error);
      }
    };
    fetchProducts();

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

  const handleDeleteItem = async (productCode) => {
    try {
      await axios.delete(
        `http://localhost:8000/deleteCartItem/${sessionStorage.getItem(
          'userCode',
        )}/${productCode}`,
      );
      const response = await axios.get(
        `http://localhost:8000/getCartProduct/${sessionStorage.getItem(
          'userCode',
        )}`,
      );
      // 중복된 제품을 합치고 수량을 계산
      const uniqueProducts = [];
      response.data.forEach((item) => {
        const existingProduct = uniqueProducts.find(
          (product) => product.productCode === item.product.productCode,
        );
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          uniqueProducts.push({ ...item.product, quantity: 1 });
        }
      });
      setCartItems(uniqueProducts);
    } catch (error) {
      console.error('상품을 삭제하는 중 오류 발생:', error);
    }
  };

  const handleCheckboxChange = (productCode) => {
    const selectedIndex = selectedProducts.indexOf(productCode);
    if (selectedIndex === -1) {
      setSelectedProducts([...selectedProducts, productCode]);
    } else {
      const updatedSelectedProducts = [...selectedProducts];
      updatedSelectedProducts.splice(selectedIndex, 1);
      setSelectedProducts(updatedSelectedProducts);
    }
  };

  const handlePurchase = async () => {
    try {
      // 선택된 모든 상품의 정보를 기반으로 총 주문명과 총 결제 금액 계산
      const orderName = '전체 상품 결제';
      let totalPrice = 0;
      selectedProducts.forEach((productCode) => {
        const selectedProduct = cartItems.find(
          (item) => item.productCode === productCode,
        );
        totalPrice += selectedProduct.productPrice * selectedProduct.quantity;
      });

      // 전체 상품 한 번에 결제
      const { IMP } = window;
      IMP.init('imp33740768');

      IMP.request_pay(
        {
          pg: 'html5_inicis',
          pay_method: 'card',
          merchant_uid: new Date().getTime().toString(), // 주문 번호로 사용
          name: orderName,
          amount: totalPrice,
          buyer_email: sessionStorage.getItem('userEmail'),
          buyer_name: sessionStorage.getItem('userName'),
          buyer_tel: sessionStorage.getItem('userPhone'),
          buyer_addr: sessionStorage.getItem('userAddress'),
          buyer_postcode: '123-456',
        },
        async (rsp) => {
          if (rsp.success) {
            try {
              // 각 상품에 대한 결제 처리
              for (const productCode of selectedProducts) {
                const { data } = await axios.post(
                  'http://localhost:8000/verifyIamport/' + rsp.imp_uid,
                  {
                    productCode: productCode,
                    userCode: sessionStorage.getItem('userCode'),
                  },
                );
                if (rsp.paid_amount === data.response.amount) {
                  alert('결제 성공');
                } else {
                  alert('결제 실패');
                }
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
    } catch (error) {
      console.error('상품을 결제하는 중 오류 발생:', error);
    }
  };

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>메인페이지</title>

      <div className="cart">
        <h2>
          <div className="CartMaintitle">장바구니</div>
        </h2>
        <div className="Cartcolumn-labels">
          <label className="Cproduct-image">|Image</label>
          <label className="Cproduct-details">|Product</label>
          <label className="Cproduct-price">|Price</label>
          <label className="Cproduct-quantity">|Quantity</label>
          <label className="Cproduct-line-price">|Total $</label>
        </div>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div className="product-line" key={item.productCode}>
              <div className="product-image-container">
                <img
                  src={`http://localhost:8000/getProductImage/${item.productCode}`}
                  alt=""
                  className="product-image"
                />
                {item.soldout && <div className="soldout-overlay">품절</div>}
              </div>
              <div className="product-details">
                <p>{item.productName}</p>
                <p>{item.productPrice}</p>
                <p>{item.productSize}</p>
                <p className="Cquantity">수량: {item.quantity}</p>
                <p className="Cprice">{item.productPrice * item.quantity}</p>
                <div className="Cartcheckbox">
                  <input
                    type="checkbox"
                    id={`checkbox-${item.productCode}`}
                    onChange={() => handleCheckboxChange(item.productCode)}
                    disabled={item.soldout} // 품절 상품인 경우 체크박스 비활성화
                  />
                  <label htmlFor={`checkbox-${item.productCode}`}>선택</label>
                </div>
              </div>
              <div className="product-removal">
                <button
                  className="delete-item-btn"
                  onClick={() => handleDeleteItem(item.productCode)}
                >
                  X
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>장바구니가 비어 있습니다.</p>
        )}
      </div>
      <div className="Cartpurchaseline">
        <button className="Cartpurchase-btn" onClick={handlePurchase}>
          구매하기
        </button>
      </div>
    </div>
  );
};

export default Cart;
