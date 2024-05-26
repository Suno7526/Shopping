import './Product.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductUpdate = () => {
  const { productCode } = useParams(); // productCode를 useParams로 가져옵니다
  const [product, setProduct] = useState({
    productName: '',
    productPrice: '',
    productStuck: '',
  });
  const navigate = useNavigate();

  const userCode = sessionStorage.getItem('userCode');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getProduct/${productCode}`,
        );
        setProduct(response.data);
      } catch (error) {
        console.error('상품을 불러오는 중 오류 발생:', error);
      }
    };

    fetchProduct();
  }, [productCode]); // productCode가 변경될 때마다 호출되도록 의존성 배열에 추가합니다

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleUpdateClick = async () => {
    try {
      await axios.put(
        `http://localhost:8000/updateProduct/${productCode}`,
        product,
      );
      alert('상품이 수정되었습니다.');
      navigate(`/Product/${productCode}`); // 수정 후 해당 상품 페이지로 이동
    } catch (error) {
      console.error('상품을 수정하는 중 오류 발생:', error);
    }
  };

  const formatRegisterDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container">
        <aside>
          <div className="property-card">
            <img
              src={`http://localhost:8000/getProductImage/${parseInt(
                product.productCode,
              )}`}
              alt={product.productName}
              className="property-image"
            />
          </div>
        </aside>

        <section id="description-card">
          <div className="description-card">
            <div className="grid-item">
              상품 명 :
              <input
                type="text"
                name="productName"
                value={product.productName}
                onChange={handleChange}
              />
            </div>
            <div className="grid-item">
              판매가 :
              <input
                type="text"
                name="productPrice"
                value={product.productPrice}
                onChange={handleChange}
              />
            </div>
            <div className="grid-item">
              상품 재고 :
              <input
                type="text"
                name="productStuck"
                value={product.productStuck}
                onChange={handleChange}
              />
            </div>
            <div className="buttons">
              <button onClick={handleUpdateClick}>상품수정</button>
            </div>
            <br />
          </div>
        </section>
      </div>
      <hr />

      <div className="product-container">
        <section>
          <div className="product-card">
            <div className="grid-item">상품 설명</div>
          </div>
        </section>
      </div>

      <div className="review">
        <section id="review">
          <div className="review-card">
            <div className="grid-item">상품 리뷰</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductUpdate;
