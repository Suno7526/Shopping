import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CouponCreate.css';

const CouponCreate = () => {
  const navigate = useNavigate();
  const userCode = sessionStorage.getItem('userCode');

  const [formData, setFormData] = useState({
    discountAmount: '',
    issueDate: '',
    expiryDate: '',
    minPurchaseAmount: '',
    userCode: userCode,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/saveCoupon', {
        ...formData,
        user: { userCode: userCode },
      });
      alert('쿠폰이 성공적으로 생성되었습니다!');
    } catch (error) {
      console.error('쿠폰 생성 중 오류 발생:', error);
      alert('쿠폰 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="coupon-create-container">
      <h2>쿠폰 생성</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>할인 금액</label>
          <input
            type="number"
            name="discountAmount"
            value={formData.discountAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>발행 날짜</label>
          <input
            type="date"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>만료 날짜</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>최소 구매 금액</label>
          <input
            type="number"
            name="minPurchaseAmount"
            value={formData.minPurchaseAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>사용자 코드</label>
          <input type="text" value={userCode} readOnly />
        </div>
        <button type="submit">쿠폰 생성</button>
      </form>
    </div>
  );
};

export default CouponCreate;
