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
      <div className="MypageUser-user-details">
        <div className="MypageUser-user-info">
          <h1>My Page</h1>
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
          {userData.coupons && userData.coupons.length > 0 ? (
            <ul>
              {userData.coupons.map((coupon) => (
                <li key={coupon.id}>
                  {coupon.couponCode} - {coupon.discountAmount}% off (Expires:{' '}
                  {new Date(coupon.expiryDate).toLocaleDateString()})
                </li>
              ))}
            </ul>
          ) : (
            <p>No coupons available.</p>
          )}
        </div>
        <div className="MypageUser-user-reviews">
          <h2>Reviews</h2>
          {userData.reviews && userData.reviews.length > 0 ? (
            <ul>
              {userData.reviews.map((review) => (
                <li key={review.id}>
                  {review.content} (Posted on:{' '}
                  {new Date(review.createDate).toLocaleDateString()})
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
