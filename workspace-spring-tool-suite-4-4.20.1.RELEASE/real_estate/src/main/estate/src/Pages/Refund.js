import './ProductUpdate.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ManageAside from '../Components/ManageAside';

const Refund = () => {
  const [orders, setOrders] = useState([]);
  const [searchParams, setSearchParams] = useState({
    orderCode: '',
    userCode: '',
    productCode: '',
    shippingAddress: '',
    orderStatus: '',
    refundReason: '',
    request: '',
    orderPrice: '',
    refundState: '',
    productSize: '',
    productColor: '',
    reviewCheck: '',
    impUid: '',
  });
  const [editingOrder, setEditingOrder] = useState(null);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;  // Get API URL from environment variable

  useEffect(() => {
    fetchNonInitialRefundOrders();
  }, []);

  useEffect(() => {
    searchOrders();
  }, [searchParams]);

  const fetchNonInitialRefundOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/getNonInitialRefundOrders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };

  const handleEditClick = (order) => {
    setEditingOrder(order);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(
          `${API_URL}/updateOrder/${editingOrder.orderCode}`,
          editingOrder,
      );
      setEditingOrder(null);
      fetchNonInitialRefundOrders();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingOrder({ ...editingOrder, [name]: value });
  };

  const handleApproveClick = async (order) => {
    try {
      const response = await axios.post(
          `${API_URL}/cancelIamport/${order.impUid}`,
          {
            productCode: order.product.productCode,
            orderCode: order.orderCode,
          },
      );

      if (response.data.code === 0) {
        await axios.put(
            `${API_URL}/updateOrder/${order.orderCode}`,
            { ...order, refundState: '환급 완료' },
        );
        fetchNonInitialRefundOrders();
      } else {
        console.error('Error cancelling payment:', response.data.message);
      }
    } catch (error) {
      console.error('Error approving order:', error);
    }
  };

  const handleRejectClick = async (order) => {
    try {
      await axios.put(`${API_URL}/updateOrder/${order.orderCode}`, {
        ...order,
        refundState: '승인 거절',
      });
      fetchNonInitialRefundOrders();
    } catch (error) {
      console.error('Error rejecting order:', error);
    }
  };

  const searchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orderSearch`, {
        params: searchParams,
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error searching orders:', error);
    }
  };

  const updateOrderStatus = async (order) => {
    const nextStatus = getNextStatus(order.orderStatus);

    try {
      const response = await axios.put(
          `${API_URL}/updateOrder/${order.orderCode}`,
          {
            ...order,
            orderStatus: nextStatus,
          },
      );
      setOrders(
          orders.map((o) =>
              o.orderCode === order.orderCode ? response.data : o,
          ),
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case '결제완료':
        return '준비중';
      case '준비중':
        return '배송시작';
      case '배송시작':
        return '배송중';
      case '배송중':
        return '배송완료';
      default:
        return currentStatus;
    }
  };

  return (
      <div className="product-update-container">
        <ManageAside />
        <div className="search-filters">
          <input
              type="text"
              name="orderCode"
              placeholder="Search by Order Code"
              value={searchParams.orderCode}
              onChange={handleSearchChange}
          />
          <input
              type="text"
              name="userCode"
              placeholder="Search by User Code"
              value={searchParams.userCode}
              onChange={handleSearchChange}
          />
          <input
              type="text"
              name="productCode"
              placeholder="Search by Product Code"
              value={searchParams.productCode}
              onChange={handleSearchChange}
          />
          <input
              type="text"
              name="shippingAddress"
              placeholder="Search by Shipping Address"
              value={searchParams.shippingAddress}
              onChange={handleSearchChange}
          />
          <input
              type="text"
              name="orderStatus"
              placeholder="Search by Order Status"
              value={searchParams.orderStatus}
              onChange={handleSearchChange}
          />
          <input
              type="text"
              name="refundReason"
              placeholder="Search by Refund Reason"
              value={searchParams.refundReason}
              onChange={handleSearchChange}
          />
          <input
              type="text"
              name="request"
              placeholder="Search by Request"
              value={searchParams.request}
              onChange={handleSearchChange}
          />
          <input
              type="text"
              name="orderPrice"
              placeholder="Search by Order Price"
              value={searchParams.orderPrice}
              onChange={handleSearchChange}
          />
          <input
              type="text"
              name="refundState"
              placeholder="Search by Refund State"
              value={searchParams.refundState}
              onChange={handleSearchChange}
          />
          <input
              type="text"
              name="productSize"
              placeholder="Search by Product Size"
              value={searchParams.productSize}
              onChange={handleSearchChange}
          />
          <input
              type="text"
              name="productColor"
              placeholder="Search by Product Color"
              value={searchParams.productColor}
              onChange={handleSearchChange}
          />
          <input
              type="text"
              name="impUid"
              placeholder="Search by Imp Uid"
              value={searchParams.impUid}
              onChange={handleSearchChange}
          />
          <select
              name="reviewCheck"
              value={searchParams.reviewCheck}
              onChange={handleSearchChange}
          >
            <option value="">All</option>
            <option value="true">Reviewed</option>
            <option value="false">Not Reviewed</option>
          </select>
        </div>
        <table className="product-table">
          <thead>
          <tr>
            <th style={{ width: '4.9%' }}>주문코드</th>
            <th style={{ width: '4.9%' }}>유저코드</th>
            <th style={{ width: '3.9%' }}>제품명</th>
            <th style={{ width: '4.9%' }}>배송주소</th>
            <th style={{ width: '4.9%' }}>주문상태</th>
            <th style={{ width: '4.9%' }}>환불사유</th>
            <th style={{ width: '4.9%' }}>요청사항</th>
            <th style={{ width: '4.9%' }}>주문총액</th>
            <th style={{ width: '4.9%' }}>환불상태</th>
            <th style={{ width: '3.9%' }}>사이즈</th>
            <th style={{ width: '3.9%' }}>색상</th>
            <th style={{ width: '4.9%' }}>리뷰여부</th>
            <th style={{ width: '3.9%' }}>회사명</th>
            <th style={{ width: '3.9%' }}>수정</th>
            <th style={{ width: '3.9%' }}>승인</th>
            <th style={{ width: '3.9%' }}>거절</th>
            <th style={{ width: '4.9%' }}>주문상태</th> {/* 새로운 열 추가 */}
          </tr>
          </thead>
          <tbody>
          {orders.map((order) => (
              <tr key={order.orderCode}>
                <td>{order.orderCode}</td>
                <td>{order.user.userCode}</td>
                <td>{order.product.productName}</td>
                <td>{order.shippingAddress}</td>
                <td>{order.orderStatus}</td>
                <td>{order.refundReason}</td>
                <td>{order.request}</td>
                <td>{order.orderPrice}</td>
                <td>{order.refundState}</td>
                <td>{order.productSize}</td>
                <td>{order.productColor}</td>
                <td>{order.reviewCheck ? '리뷰 완료' : '리뷰 미완료'}</td>
                <td>{order.product.manufacturer}</td>
                <td>
                  <button onClick={() => handleEditClick(order)}>수정</button>
                </td>
                <td>
                  <button onClick={() => handleApproveClick(order)}>승인</button>
                </td>
                <td>
                  <button onClick={() => handleRejectClick(order)}>거절</button>
                </td>
                <td>
                  <button onClick={() => updateOrderStatus(order)}>주문상태 변경</button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>

        {editingOrder && (
            <div className="order-editor">
              <h2>Edit Order</h2>
              <input
                  type="text"
                  name="orderCode"
                  value={editingOrder.orderCode}
                  onChange={handleInputChange}
              />
              <input
                  type="text"
                  name="orderStatus"
                  value={editingOrder.orderStatus}
                  onChange={handleInputChange}
              />
              <input
                  type="text"
                  name="refundState"
                  value={editingOrder.refundState}
                  onChange={handleInputChange}
              />
              <button onClick={handleSaveClick}>Save</button>
            </div>
        )}
      </div>
  );
};

export default Refund;
