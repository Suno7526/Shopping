import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecentItem.css'; // 외부 스타일 시트 불러오기
import Aside from '../Components/Aside';

const RecentItem = () => {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        const userCode = sessionStorage.getItem('userCode');
        if (userCode) {
          const response = await axios.get(
            `http://localhost:8000/getViewedProduct/${userCode}`,
          );
          // 서버에서 이미 최신 순으로 정렬되어 반환되므로 처음부터 10개만 가져옵니다.
          setRecentProducts(response.data.slice(0, 10));
        } else {
          console.log('사용자 코드가 없습니다.');
        }
      } catch (error) {
        console.error('최근 본 상품을 불러오는 중 오류 발생:', error);
      }
    };

    fetchRecentProducts();
  }, []);

  const addToCart = (product) => {
    alert('장바구니에 추가되었습니다.');
    // 장바구니에 상품을 추가하는 로직을 추가할 수 있습니다.
  };

  const addToWishlist = (product) => {
    alert('찜 목록에 추가되었습니다.');
    // 찜 목록에 상품을 추가하는 로직을 추가할 수 있습니다.
  };

  return (
    <div className="page">
      <Aside />
      <article>
        <h2>
          <div className="RecentProduct">최근 본 상품</div>
        </h2>
      </article>
      <section className="Recentsection">
        <div className="recentProductsContainer">
          {recentProducts.map((product) => (
            <div className="recentProductCard" key={product.viewCode}>
              <img
                src={`http://localhost:8000/getProductImage/${product.product.productCode}`}
                alt={product.product.productName}
                className="recentproductImage"
              />
              <div className="recentproductInfo">
                <strong>
                  [제조사] 상품 명 : {product.product.productName}
                </strong>
                <br />${product.product.productPrice}
                <div className="button-container">
                  <button
                    className="RecentCartBtn"
                    onClick={() => addToCart(product.product)}
                  >
                    장바구니에 추가
                  </button>
                  <button
                    className="RecentLikeBtn"
                    onClick={() => addToWishlist(product.product)}
                  >
                    찜하기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RecentItem;
