import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecentItem.css'; // 외부 스타일 시트 불러오기
import Aside from '../Components/Aside';
import { Link, useNavigate } from 'react-router-dom';

const RecentItem = () => {
  const [recentProducts, setRecentProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        const userCode = sessionStorage.getItem('userCode');
        if (userCode) {
          const response = await axios.get(
            `http://localhost:8000/getViewedProduct/${userCode}`,
          );
          // 중복된 상품을 제거하고 가장 최근에 본 상품만 남기기
          const uniqueProducts = response.data.reduce((acc, product) => {
            if (
              !acc.find(
                (item) =>
                  item.product.productCode === product.product.productCode,
              )
            ) {
              acc.push(product);
            }
            return acc;
          }, []);

          // 처음부터 10개만 가져옵니다.
          setRecentProducts(uniqueProducts.slice(0, 10));
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
    navigate(`/product/${product.productCode}`);
  };

  const addToWishlist = (product) => {
    navigate(`/product/${product.productCode}`);
  };

  return (
    <div className="RecentItem-page">
      <Aside />
      <article>
        <h2>
          <div className="RecentProduct">최근 본 상품</div>
        </h2>
        <div className="RecentProcutMainImage"></div>
      </article>
      <section className="Recentsection">
        <div className="recentProductsContainer">
          {recentProducts.length > 0 ? (
            recentProducts.map((product) =>
              product && product.product ? (
                <div className="recentProductCard" key={product.viewCode}>
                  <Link to={`/product/${product.product.productCode}`}>
                    <img
                      src={`http://localhost:8000/getProductImage/${product.product.productCode}`}
                      alt={product.product.productName}
                      className="recentproductImage"
                    />
                  </Link>
                  <div className="recentproductInfo">
                    <strong>
                      [제조사] 상품 명 : {product.product.productName}
                    </strong>
                    <br />${product.product.productPrice}
                    <div className="RecentItem-button-container">
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
              ) : (
                <div key={product.viewCode} className="recentProductCard">
                  상품 정보가 없습니다.
                </div>
              ),
            )
          ) : (
            <div>최근 본 상품이 없습니다.</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default RecentItem;
