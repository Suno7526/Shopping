import './Product.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // 수정된 부분
import Modal from './Modal.js';
import { Link } from 'react-router-dom';

const Product = () => {
  const { productCode } = useParams();
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [userRole, setUserRole] = useState('');

  const userCode = sessionStorage.getItem('userCode');

  useEffect(() => {
    setUserRole(sessionStorage.getItem('userRole'));
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getProduct/${productCode}`,
        );
        setProduct(response.data);
        checkLiked(response.data);
      } catch (error) {
        console.error('상품을 불러오는 중 오류 발생:', error);
      }
    };

    fetchProduct();
  }, [productCode]);

  const checkLiked = async (product) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/getLikeProduct/${userCode}`,
      );
      const likedProducts = response.data;
      const found = likedProducts.some(
        (likedProduct) =>
          likedProduct.product.productCode === product.productCode,
      );
      setIsLiked(found);
    } catch (error) {
      console.error('찜한 상품을 확인하는 중 오류 발생:', error);
    }
  };

  const handleLikeClick = async () => {
    try {
      if (!userCode) {
        alert('로그인이 필요합니다.');
        return;
      }

      if (isLiked) {
        alert('이미 찜한 상품입니다.');
        return;
      }

      await axios.post('http://localhost:8000/like', {
        userCode: userCode,
        productCode: productCode,
      });
      alert('상품을 찜했습니다.');
      setIsLiked(true);
    } catch (error) {
      console.error('상품을 찜하는 중 오류 발생:', error);
    }
  };

  const handleAddToCartClick = async () => {
    try {
      if (!userCode) {
        console.log('로그인이 필요합니다.');
        return;
      }

      await axios.post('http://localhost:8000/addToCart', {
        userCode: userCode,
        productCode: productCode,
      });
      alert('상품을 장바구니에 담았습니다.');
    } catch (error) {
      console.error('상품을 장바구니에 담는 중 오류 발생:', error);
    }
  };

  const handlePurchaseClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const formatRegisterDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container">
        <aside>
          <div className="property-card">
            <img
              src={`http://localhost:8000/getProductImage/${parseInt(
                product.productCode,
              )}`}
              alt={product.productName}
              className="property-image"
            />
          </div>
        </aside>

        <section id="description-card">
          <div className="description-card">
            <div className="grid-item">상품 명 : {product.productName}</div>
            <div className="grid-item">판매가 : {product.productPrice}</div>
            <div className="grid-item">제조사 : {product.companyName}</div>
            <div className="grid-item">SIZE : {product.productSize}</div>
            <div className="grid-item">상품 재고 : {product.productStuck}</div>
            <div className="grid-item">
              등록 날짜 : {formatRegisterDate(product.registerDate)}
            </div>
            <div className="grid-item">별점 : {product.userPoint}</div>

            <div className="buttons">
              <button className="purchase-btn" onClick={handlePurchaseClick}>
                구매하기
              </button>
              <button className="like-btn" onClick={handleLikeClick}>
                찜하기
              </button>
              <button className="like-btn" onClick={handleAddToCartClick}>
                장바구니 담기
              </button>
              {userRole === 'ADMIN' && (
                <Link to={`/ProductUpdate/${productCode}`}>
                  <button>상품수정</button>
                </Link>
              )}
            </div>
            <br />
          </div>
        </section>
      </div>
      <hr />

      <div className="product-container">
        <section>
          <div className="product-card">
            <div className="grid-item">상품 설명</div>
          </div>
        </section>
      </div>

      <div className="review">
        <section id="review">
          <div className="review-card">
            <div className="grid-item">상품 리뷰</div>
          </div>
        </section>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={product}
      />
    </div>
  );
};

export default Product;
