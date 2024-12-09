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
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchNonInitialRefundOrders();
  }, []);

  useEffect(() => {
    searchOrders();
  }, [searchParams]);

  const fetchNonInitialRefundOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/getNonInitialRefundOrders`);
      const sortedOrders = response.data.sort((a, b) => {
        return new Date(b.orderDate) - new Date(a.orderDate);
      });
      setOrders(sortedOrders);
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
      const response = await axios.get('${API_URL}/orderSearch', {
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
            <th style={{ width: '6%' }}>주문날짜</th>
            <th style={{ width: '4.9%' }}>이름</th>
            <th style={{ width: '3.9%' }}>제품명</th>
            <th style={{ width: '7%' }}>배송주소</th>
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
                <td>{order.orderDate}</td>
                <td>{order.user.name}</td>
                <td>{order.product.productName}</td>
                <td>
                  {editingOrder && editingOrder.orderCode === order.orderCode ? (
                      <input
                          type="text"
                          name="shippingAddress"
                          value={editingOrder.shippingAddress}
                          onChange={handleInputChange}
                      />
                  ) : (
                      order.shippingAddress
                  )}
                </td>
                <td>
                  {editingOrder && editingOrder.orderCode === order.orderCode ? (
                      <input
                          type="text"
                          name="orderStatus"
                          value={editingOrder.orderStatus}
                          onChange={handleInputChange}
                      />
                  ) : (
                      order.orderStatus
                  )}
                </td>
                <td>
                  {editingOrder && editingOrder.orderCode === order.orderCode ? (
                      <input
                          type="text"
                          name="refundReason"
                          value={editingOrder.refundReason}
                          onChange={handleInputChange}
                      />
                  ) : (
                      order.refundReason
                  )}
                </td>
                <td>
                  {editingOrder && editingOrder.orderCode === order.orderCode ? (
                      <input
                          type="text"
                          name="request"
                          value={editingOrder.request}
                          onChange={handleInputChange}
                      />
                  ) : (
                      order.request
                  )}
                </td>
                <td>
                  {editingOrder && editingOrder.orderCode === order.orderCode ? (
                      <input
                          type="text"
                          name="orderPrice"
                          value={editingOrder.orderPrice}
                          onChange={handleInputChange}
                      />
                  ) : (
                      order.orderPrice
                  )}
                </td>
                <td>
                  {editingOrder && editingOrder.orderCode === order.orderCode ? (
                      <input
                          type="text"
                          name="refundState"
                          value={editingOrder.refundState}
                          onChange={handleInputChange}
                      />
                  ) : (
                      order.refundState
                  )}
                </td>
                <td>
                  {editingOrder && editingOrder.orderCode === order.orderCode ? (
                      <input
                          type="text"
                          name="productSize"
                          value={editingOrder.productSize}
                          onChange={handleInputChange}
                      />
                  ) : (
                      order.productSize
                  )}
                </td>
                <td>
                  {editingOrder && editingOrder.orderCode === order.orderCode ? (
                      <input
                          type="text"
                          name="productColor"
                          value={editingOrder.productColor}
                          onChange={handleInputChange}
                      />
                  ) : (
                      order.productColor
                  )}
                </td>
                <td>
                  {editingOrder && editingOrder.orderCode === order.orderCode ? (
                      <input
                          type="text"
                          name="reviewCheck"
                          value={editingOrder.reviewCheck}
                          onChange={handleInputChange}
                      />
                  ) : order.reviewCheck ? (
                      'Y'
                  ) : (
                      'N'
                  )}
                </td>
                <td>
                  {editingOrder && editingOrder.orderCode === order.orderCode ? (
                      <input
                          type="text"
                          name="impUid"
                          value={editingOrder.impUid}
                          onChange={handleInputChange}
                      />
                  ) : (
                      order.impUid
                  )}
                </td>
                <td>
                  {editingOrder && editingOrder.orderCode === order.orderCode ? (
                      <button onClick={handleSaveClick}>Save</button>
                  ) : (
                      <button onClick={() => handleEditClick(order)}>수정</button>
                  )}
                </td>
                <td>
                  <button onClick={() => handleApproveClick(order)}>승인</button>
                </td>
                <td>
                  <button onClick={() => handleRejectClick(order)}>거절</button>
                </td>
                <td>
                  <button onClick={() => updateOrderStatus(order)}>변경</button>{' '}
                  {/* 상태 업데이트 버튼 추가 */}
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default Refund;