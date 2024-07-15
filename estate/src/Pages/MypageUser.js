import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MypageUser.css';
import Aside from '../Components/Aside';
import { Link } from 'react-router-dom';

const MypageUser = () => {
  const [userData, setUserData] = useState(null);
  const userCode = sessionStorage.getItem('userCode');
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    if (!userCode) {
      alert('로그인을 해주세요.');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/getUser/${userCode}`);
        setUserData(response.data);
      } catch (error) {}
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

  if (!userCode) {
    return <div className="login-prompt">로그인을 해주세요.</div>;
  }

  return (
    <div className="MypageUser">
      <Aside />
      <div className="MypageUser-user-details">
        <div className="MypageUser-user-info">
          <h1>Infomation</h1>
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
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
        </div>
        <div className="MypageUser-user-coupons">
          <h2>Coupons</h2>
        </div>
        <div className="MypageUser-user-reviews">
          <h2>Reviews</h2>
          {reviews && reviews.length > 0 ? (
            <ul>
              {reviews.map((review) => (
                <li key={review.id} className="review-item">
                  <img
                    src={`http://localhost:8000/getProductImage/${review.product.productCode}`}
                    alt={`Product`}
                    className="review-image"
                  />
                  <div className="review-content">
                    <p>{review.product.productName}</p>
                    <p>{review.reviewContent}</p>
                    <p>{new Date(review.registerDate).toLocaleDateString()} </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
        <div className="MypageUser-user-reviews">
          <Link to="/edit-profile">Edit Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default MypageUser;
