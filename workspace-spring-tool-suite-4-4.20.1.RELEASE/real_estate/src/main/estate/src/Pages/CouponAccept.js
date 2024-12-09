import './ProductUpdate.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ManageAside from '../Components/ManageAside';

const CouponAccept = () => {
  const [coupons, setCoupons] = useState([]);
  const [searchParams, setSearchParams] = useState({
    couponCode: '',
    serialCode: '',
    discountAmount: '',
    issueDate: '',
    expiryDate: '',
    minPurchaseAmount: '',
    used: '',
  });
  const [editingCoupon, setEditingCoupon] = useState(null);
  const navigate = useNavigate();

  // 환경 변수에서 API URL 가져오기
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get(`${API_URL}/getCoupons`);
      const sortedCoupons = response.data.sort((a, b) => {
        return new Date(b.issueDate) - new Date(a.issueDate);
      });
      setCoupons(sortedCoupons);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };


  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };

  const handleEditClick = (coupon) => {
    setEditingCoupon(coupon);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(
          `${API_URL}/updateCoupon/${editingCoupon.couponCode}`,
          editingCoupon,
      );
      setEditingCoupon(null);
      fetchCoupons();
    } catch (error) {
      console.error('Error updating coupon:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingCoupon({ ...editingCoupon, [name]: value });
  };

  const filteredCoupons = coupons.filter((coupon) => {
    return (
        (searchParams.couponCode === '' ||
            coupon.couponCode.toString().includes(searchParams.couponCode)) &&
        (searchParams.serialCode === '' ||
            coupon.serialCode.includes(searchParams.serialCode)) &&
        (searchParams.discountAmount === '' ||
            coupon.discountAmount
                .toString()
                .includes(searchParams.discountAmount)) &&
        (searchParams.issueDate === '' ||
            coupon.issueDate.includes(searchParams.issueDate)) &&
        (searchParams.expiryDate === '' ||
            coupon.expiryDate.includes(searchParams.expiryDate)) &&
        (searchParams.minPurchaseAmount === '' ||
            coupon.minPurchaseAmount
                .toString()
                .includes(searchParams.minPurchaseAmount)) &&
        (searchParams.used === '' || coupon.used.toString() === searchParams.used)
    );
  });

  return (
      <div className="product-update-container">
        <ManageAside />
        <div className="search-filters">
          <input
              type="text"
              name="couponCode"
              placeholder="Search by Coupon Code"
              value={searchParams.couponCode}
              onChange={handleSearchChange}
          />
          <input
              type="text"
              name="serialCode"
              placeholder="Search by Serial Code"
              value={searchParams.serialCode}
              onChange={handleSearchChange}
          />
          <input
              type="text"
              name="discountAmount"
              placeholder="Search by Discount Amount"
              value={searchParams.discountAmount}
              onChange={handleSearchChange}
          />
          <input
              type="date"
              name="issueDate"
              placeholder="Search by Issue Date"
              value={searchParams.issueDate}
              onChange={handleSearchChange}
          />
          <input
              type="date"
              name="expiryDate"
              placeholder="Search by Expiry Date"
              value={searchParams.expiryDate}
              onChange={handleSearchChange}
          />
          <input
              type="text"
              name="minPurchaseAmount"
              placeholder="Search by Min Purchase Amount"
              value={searchParams.minPurchaseAmount}
              onChange={handleSearchChange}
          />
          <select
              name="used"
              value={searchParams.used}
              onChange={handleSearchChange}
          >
            <option value="">All</option>
            <option value="true">Used</option>
            <option value="false">Not Used</option>
          </select>
        </div>
        <table className="product-table">
          <thead>
          <tr>
            <th>쿠폰 번호</th>
            <th>시리얼 코드</th>
            <th>할인 금액</th>
            <th>발행 날짜</th>
            <th>만료 날짜</th>
            <th>최소 구매 금액</th>
            <th>사용 여부</th>
            <th>수정하기</th>
          </tr>
          </thead>
          <tbody>
          {filteredCoupons.map((coupon) => (
              <tr key={coupon.couponCode}>
                <td>{coupon.couponCode}</td>
                <td>
                  {editingCoupon &&
                  editingCoupon.couponCode === coupon.couponCode ? (
                      <input
                          type="text"
                          name="serialCode"
                          value={editingCoupon.serialCode}
                          onChange={handleInputChange}
                      />
                  ) : (
                      coupon.serialCode
                  )}
                </td>
                <td>
                  {editingCoupon &&
                  editingCoupon.couponCode === coupon.couponCode ? (
                      <input
                          type="number"
                          name="discountAmount"
                          value={editingCoupon.discountAmount}
                          onChange={handleInputChange}
                      />
                  ) : (
                      coupon.discountAmount
                  )}
                </td>
                <td>
                  {editingCoupon &&
                  editingCoupon.couponCode === coupon.couponCode ? (
                      <input
                          type="date"
                          name="issueDate"
                          value={editingCoupon.issueDate}
                          onChange={handleInputChange}
                      />
                  ) : (
                      coupon.issueDate
                  )}
                </td>
                <td>
                  {editingCoupon &&
                  editingCoupon.couponCode === coupon.couponCode ? (
                      <input
                          type="date"
                          name="expiryDate"
                          value={editingCoupon.expiryDate}
                          onChange={handleInputChange}
                      />
                  ) : (
                      coupon.expiryDate
                  )}
                </td>
                <td>
                  {editingCoupon &&
                  editingCoupon.couponCode === coupon.couponCode ? (
                      <input
                          type="number"
                          name="minPurchaseAmount"
                          value={editingCoupon.minPurchaseAmount}
                          onChange={handleInputChange}
                      />
                  ) : (
                      coupon.minPurchaseAmount
                  )}
                </td>
                <td>
                  {editingCoupon &&
                  editingCoupon.couponCode === coupon.couponCode ? (
                      <select
                          name="used"
                          value={editingCoupon.used.toString()}
                          onChange={(e) =>
                              setEditingCoupon({
                                ...editingCoupon,
                                used: e.target.value === 'true',
                              })
                          }
                      >
                        <option value="true">사용됨</option>
                        <option value="false">사용되지 않음</option>
                      </select>
                  ) : coupon.used ? (
                      '사용됨'
                  ) : (
                      '사용되지 않음'
                  )}
                </td>
                <td>
                  {editingCoupon &&
                  editingCoupon.couponCode === coupon.couponCode ? (
                      <button onClick={handleSaveClick}>Save</button>
                  ) : (
                      <button onClick={() => handleEditClick(coupon)}>Edit</button>
                  )}
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default CouponAccept;
