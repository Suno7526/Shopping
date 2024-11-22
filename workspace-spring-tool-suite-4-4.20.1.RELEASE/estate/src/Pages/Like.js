import React, { useEffect, useState } from 'react';
import './Like.css';
import axios from 'axios';
import Aside from '../Components/Aside';
import { Link } from 'react-router-dom';

const Like = () => {
  const [likeItems, setLikeItems] = useState([]);

  // 환경 변수에서 API URL 가져오기
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
            `${API_URL}/getLikeProduct/${sessionStorage.getItem('userCode')}`,
        );
        setLikeItems(response.data.reverse());
      } catch (error) {
        console.error('상품을 불러오는 중 오류 발생:', error);
      }
    };
    fetchProducts();
  }, [API_URL]);

  const handleUnlike = async (productCode) => {
    try {
      await axios.delete(
          `${API_URL}/unlikeProduct/${sessionStorage.getItem(
              'userCode',
          )}/${productCode}`,
      );
      const updatedLikeItems = likeItems.filter(
          (item) => item.product && item.product.productCode !== productCode,
      );
      setLikeItems(updatedLikeItems);
      alert('찜 목록에서 삭제했습니다.');
    } catch (error) {
      console.error('상품을 좋아요 취소하는 중 오류 발생:', error);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const userCode = sessionStorage.getItem('userCode');
      const cartSize = 'M'; // 예시로 고정된 사이즈. 필요시 사용자 선택으로 변경 가능

      await axios.post(`${API_URL}/addToCart`, {
        userCode: userCode,
        productCode: product.productCode,
        cartSize: cartSize,
      });

      alert('장바구니에 추가되었습니다.');
    } catch (error) {
      console.error('장바구니에 추가하는 중 오류 발생:', error);
      alert('장바구니에 추가하는 중 오류가 발생했습니다.');
    }
  };

  return (
      <div className="Like-page">
        <Aside />
        <article>
          <h2>
            <div className="LikeMaintitle">찜한 상품</div>
          </h2>
          <div className="LikeMainImage"></div>
        </article>
        <section className="Likesection">
          <div className="likeItemsContainer">
            {likeItems.length === 0 ? (
                <div className="no-like-items">찜한 상품이 없습니다.</div>
            ) : (
                likeItems.map(
                    (product) =>
                        product &&
                        product.product && (
                            <div
                                className="likeItemCard"
                                key={product.product.productCode}
                            >
                              <Link to={`/product/${product.product.productCode}`}>
                                <img
                                    src={`${API_URL}/getProductImage/${product.product.productCode}`}
                                    alt={product.product.productName}
                                    className="LikeproductImage"
                                />
                              </Link>
                              <div className="LikeproductInfo">
                                <div>
                                  <strong>
                                    {product.product.companyName} <br></br>상품 명 :{' '}
                                    {product.product.productName}
                                  </strong>
                                </div>
                                <div>판매가 : {product.product.productPrice}</div>
                              </div>
                              <div className="Likebutton-container">
                                <Link to={`/product/${product.product.productCode}`}>
                                  <button className="Likeadd-to-cart-btn">
                                    상품페이지 이동
                                  </button>
                                </Link>
                                <button
                                    className="Likeunlike-item-btn"
                                    onClick={() =>
                                        handleUnlike(product.product.productCode)
                                    }
                                >
                                  찜하기 취소
                                </button>
                              </div>
                            </div>
                        ),
                )
            )}
          </div>
        </section>
      </div>
  );
};

export default Like;
