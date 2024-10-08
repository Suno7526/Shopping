import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MypageUser.css';
import Aside from '../Components/Aside';
import { Link } from 'react-router-dom';

const MypageUser = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userCode = sessionStorage.getItem('userCode');
  const [reviews, setReviews] = useState(null);
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    if (!userCode) {
      alert('로그인을 해주세요.');
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/getUser/${userCode}`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userCode]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getReviewsUser/${userCode}`,
        );
        setReviews(response.data);
      } catch (error) {
        console.error('리뷰를 불러오는 중 오류 발생:', error);
      }
    };

    fetchReviews();
  }, [userCode]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/CouponUser/${userCode}`,
        );
        setCoupons(response.data);
      } catch (error) {
        console.error('쿠폰을 불러오는 중 오류 발생:', error);
      }
    };

    fetchCoupons();
  }, [userCode]);

  if (!userCode) {
    return <div className="login-prompt">로그인을 해주세요.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="MypageUser">
      <Aside />

      <div className="My-page-header">마이페이지111</div>
      <div className="MypageUser-user-details">
        <div className="MypageUser-user-info">
          <div className="name-container">
            <h1 className="name-title">Name:</h1>
            <p className="user-name">{userData.name}</p>
          </div>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Grade:</strong> {userData.userGrade}
          </p>
          <p>
            <strong>Points:</strong> {userData.userPoint}
          </p>
          <p>
            <strong>Phone Number:</strong> {userData.phoneNumber}
          </p>
          <p>
            <strong>Address:</strong> {userData.address}
          </p>
          <p>
            <strong>Birth Date:</strong> {userData.birth}
          </p>
          <div className="MypageUser-user-reviews-btn">
            <Link to="/userUpdate">수정하기</Link>
          </div>
        </div>

        <div className="MypageUser-user-reviews">
          <h2>Reviews</h2>
          {reviews && reviews.length > 0 ? (
            <ul>
              {reviews.map((review) => (
                <li key={review.id} className="review-item">
                  <Link to={`/product/${review.product.productCode}`}>
                    <img
                      src={`http://localhost:8000/getProductImage/${review.product.productCode}`}
                      alt={`Product`}
                      className="review-image"
                    />
                  </Link>
                  <div className="review-content">
                    <p>{review.reviewContent}</p>
                    <p>{new Date(review.registerDate).toLocaleDateString()} </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>작성하신 리뷰가 없습니다.</p>
          )}
        </div>

        <div className="MypageUser-user-coupons">
          <h2>Coupons</h2>
          {coupons.length > 0 ? (
            <ul>
              {coupons.map((coupon) => (
                <li key={coupon.couponCode}>
                  <p>
                    쿠폰: {coupon.minPurchaseAmount}원 이상 구매시{' '}
                    {coupon.discountAmount}원 할인
                  </p>
                  <p>쿠폰번호: {coupon.serialCode}</p>

                  <p>할인금액: {coupon.discountAmount}</p>
                  <p>
                    사용기간: {coupon.issueDate} ~ {coupon.expiryDate}
                  </p>
                  <p>최소 구매 금액: {coupon.minPurchaseAmount}</p>
                  <p>사용여부: {coupon.used ? 'Yes' : 'No'}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No coupons available.</p>
          )}
        </div>
        <div className="MypageUser-user-reviews">
          <h2>Reviews</h2>
          {reviews && reviews.length > 0 ? (
            <ul>
              {reviews.map((review) => (
                <li key={review.id} className="review-item">
                  <Link to={`/product/${review.product.productCode}`}>
                    <img
                      src={`http://localhost:8000/getProductImage/${review.product.productCode}`}
                      alt={`Product`}
                      className="review-image"
                    />
                  </Link>
                  <div className="review-content">
                    <p>{review.reviewContent}</p>
                    <p>{new Date(review.registerDate).toLocaleDateString()} </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>작성하신 리뷰가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MypageUser;
