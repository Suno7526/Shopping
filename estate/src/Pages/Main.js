import React from 'react';
import './Main.css';

const products = [
  {
    id: 1,
    name: 'Product 1',
    price: '₩100,000',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Product 2',
    price: '₩200,000',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Product 3',
    price: '₩300,000',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'Product 4',
    price: '₩400,000',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 5,
    name: 'Product 5',
    price: '₩500,000',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 6,
    name: 'Product 6',
    price: '₩600,000',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 7,
    name: 'Product 7',
    price: '₩700,000',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 8,
    name: 'Product 8',
    price: '₩800,000',
    image: 'https://via.placeholder.com/150',
  },
];

const Main = () => {
  return (
    <div className="Main-container">
      <h2 className="Main-title">무신사 상품 리스트</h2>
      <div className="Main-product-list">
        {products.map((product) => (
          <div key={product.id} className="Main-product-card">
            <img
              src={product.image}
              alt={product.name}
              className="Main-product-image"
            />
            <h3 className="Main-product-name">{product.name}</h3>
            <p className="Main-product-price">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
