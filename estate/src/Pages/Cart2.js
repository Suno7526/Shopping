import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart2 = () => {
  const [cartItems, setCartItems] = useState([]);
  const userCode = sessionStorage.getItem('userCode');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/cart/${userCode}`,
        );
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [userCode]);

  return (
    <div className="cart-container">
      <h1>Cart Items</h1>
      {cartItems.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Size</th>
              <th>Color</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.cartCode}>
                <td>{item.product.productName}</td>
                <td>{item.cartSize}</td>
                <td>{item.cartColor}</td>
                <td>{item.productCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items in the cart.</p>
      )}
    </div>
  );
};

export default Cart2;
