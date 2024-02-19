import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/getProducts');
        setProducts(response.data);
        console.log('됐냐?');
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>메인홈페이지</h1>
      <ul>
        {products.map((product) => (
          <li key={product.productCode}>
            <h2>이름: {product.name}</h2>
            <p>주소: {product.address}</p>
            <p>Price: {product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
