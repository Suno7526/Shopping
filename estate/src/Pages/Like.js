import React, { useEffect, useState } from 'react';
import './Like.css';
import axios from 'axios';
import Aside from '../Components/Aside';

const Like = () => {
  const [likeItems, setLikeItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getLikeProduct/${sessionStorage.getItem(
            'userCode',
          )}`,
        );
        setLikeItems(response.data.reverse());
      } catch (error) {
        console.error('상품을 불러오는 중 오류 발생:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleUnlike = async (productCode) => {
    try {
      await axios.delete(
        `http://localhost:8000/unlikeProduct/${sessionStorage.getItem(
          'userCode',
        )}/${productCode}`,
      );
      const updatedLikeItems = likeItems.filter(
        (item) => item.product.productCode !== productCode,
      );
      setLikeItems(updatedLikeItems);
      alert('찜 목록에서 삭제했습니다.');
    } catch (error) {
      console.error('상품을 좋아요 취소하는 중 오류 발생:', error);
    }
  };

  const handleAddToCart = (product) => {
    alert('장바구니에 추가되었습니다.');
  };

  const formatRegisterDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="page">
      <Aside />
      <article>
        <h2>
          <div className="LikeMaintitle">찜한 상품</div>
        </h2>
      </article>
      <section className="Likesection">
        <div className="likeItemsContainer">
          {likeItems.map((product) => (
            <div className="likeItemCard" key={product.product.productCode}>
              <img
                src={`http://localhost:8000/getProductImage/${product.product.productCode}`}
                alt={product.product.productName}
                className="LikeproductImage"
              />
              <div className="LikeproductInfo">
                <div>
                  <strong>
                    [제조사] 상품 명 : {product.product.productName}
                  </strong>
                </div>
                <div>판매가 : {product.product.productPrice}</div>
                <div>별점 : {product.product.userPoint}</div>
              </div>
              <div className="Likebutton-container">
                <button
                  className="Likeadd-to-cart-btn"
                  onClick={() => handleAddToCart(product.product)}
                >
                  장바구니에 추가
                </button>
                <button
                  className="Likeunlike-item-btn"
                  onClick={() => handleUnlike(product.product.productCode)}
                >
                  찜하기 취소
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Like;
