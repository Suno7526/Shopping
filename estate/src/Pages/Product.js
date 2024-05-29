import './Product.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from './Modal.js';
import { Link } from 'react-router-dom';

const Product = () => {
  const { productCode } = useParams();
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [reviews, setReviews] = useState([]);
  const [averageReviewPoint, setAverageReviewPoint] = useState(0);

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

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getReviews/${productCode}`,
        );
        setReviews(response.data);
        calculateAverageReview(response.data);
      } catch (error) {
        console.error('리뷰를 불러오는 중 오류 발생:', error);
      }
    };

    fetchProduct();
    fetchReviews();
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

  const calculateAverageReview = (reviews) => {
    const totalPoints = reviews.reduce(
      (sum, review) => sum + review.reviewPoint,
      0,
    );
    const average = totalPoints / reviews.length || 0;
    setAverageReviewPoint(average.toFixed(1));
  };

  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? 'selected' : ''}`}>
          ★
        </span>,
      );
    }
    return stars;
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
            <div className="grid-item">상품 재고 : {product.productStuck}</div>
            <div className="grid-item">
              등록 날짜 : {formatRegisterDate(product.registerDate)}
            </div>
            <div className="grid-item average-rating">
              별점 : {renderStarRating(Math.round(averageReviewPoint))}(
              {averageReviewPoint})
            </div>
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
            {/* 추가적인 상품 설명 내용을 여기에 표시할 수 있음 */}
          </div>
        </section>
      </div>

      <div className="review">
        <section id="review">
          <div className="review-card">
            <div className="grid-item">상품 리뷰</div>
            <div className="review-container">
              <h2>상품 리뷰</h2>
              <ul>
                {reviews.map((review) => (
                  <li key={review.reviewCode}>
                    <p>별점: {review.reviewPoint}</p>
                    <p>리뷰 내용: {review.reviewContent}</p>
                    <p>이미지 :</p>
                    <img
                      src={`http://localhost:8000/getReviewImage/${review.reviewCode}`}
                      alt={`리뷰 ${review.reviewCode} 이미지`}
                      className="review-image"
                    />
                  </li>
                ))}
              </ul>
              <p>
                평균 별점: {renderStarRating(Math.round(averageReviewPoint))} (
                {averageReviewPoint})
              </p>
            </div>
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
