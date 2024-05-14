import './Product.css'; // 외부 스타일 시트 불러오기
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

const Category = () => {
  const { category } = useParams();
  const [products, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let response;

        if (category === 'OUTER') {
          // OUTER 카테고리를 클릭했을 때 모든 카테고리의 데이터를 가져옴
          const categories = [
            '재킷',
            '집업',
            '점퍼',
            '코트',
            '패딩',
            '파카',
            '모피',
            '머스탱',
          ];
          const promises = categories.map((category) =>
            axios.get(`/category/${category}`),
          );
          const results = await Promise.all(promises);
          const data = results.map((result) => result.data);
          // 모든 카테고리의 데이터를 합쳐서 하나의 배열로 만듦
          const combinedData = data.flat();
          // viewCount 기준으로 정렬
          const sortedProducts = combinedData.sort(
            (a, b) => b.viewCount - a.viewCount,
          );
          setProduct(sortedProducts);
        } else if (category === 'TOP') {
          // OUTER 카테고리를 클릭했을 때 모든 카테고리의 데이터를 가져옴
          const categories = [
            '민소매',
            '조끼',
            '반팔티',
            '긴팔티',
            '셔츠',
            '크루넥',
            '니트',
            '후드',
          ];
          const promises = categories.map((category) =>
            axios.get(`/category/${category}`),
          );
          const results = await Promise.all(promises);
          const data = results.map((result) => result.data);
          // 모든 카테고리의 데이터를 합쳐서 하나의 배열로 만듦
          const combinedData = data.flat();
          // viewCount 기준으로 정렬
          const sortedProducts = combinedData.sort(
            (a, b) => b.viewCount - a.viewCount,
          );
          setProduct(sortedProducts);
        } else if (category === 'BOTTOM') {
          // OUTER 카테고리를 클릭했을 때 모든 카테고리의 데이터를 가져옴
          const categories = ['반바지', '츄리닝', '긴바지', '치마'];
          const promises = categories.map((category) =>
            axios.get(`/category/${category}`),
          );
          const results = await Promise.all(promises);
          const data = results.map((result) => result.data);
          // 모든 카테고리의 데이터를 합쳐서 하나의 배열로 만듦
          const combinedData = data.flat();
          // viewCount 기준으로 정렬
          const sortedProducts = combinedData.sort(
            (a, b) => b.viewCount - a.viewCount,
          );
          setProduct(sortedProducts);
        } else if (category === 'HEADWEAR') {
          // OUTER 카테고리를 클릭했을 때 모든 카테고리의 데이터를 가져옴
          const categories = ['캡', '버킷햇', '스냅백', '비니', '기타'];
          const promises = categories.map((category) =>
            axios.get(`/category/${category}`),
          );
          const results = await Promise.all(promises);
          const data = results.map((result) => result.data);
          // 모든 카테고리의 데이터를 합쳐서 하나의 배열로 만듦
          const combinedData = data.flat();
          // viewCount 기준으로 정렬
          const sortedProducts = combinedData.sort(
            (a, b) => b.viewCount - a.viewCount,
          );
          setProduct(sortedProducts);
        } else {
          // 일반적인 카테고리일 때 해당 카테고리의 데이터를 가져옴
          response = await axios.get(`/category/${category}`);
          // 제품 목록을 viewCount 기준으로 높은 순서로 정렬
          const sortedProducts = response.data.sort(
            (a, b) => b.viewCount - a.viewCount,
          );
          setProduct(sortedProducts);
        }
      } catch (error) {
        console.error('상품을 불러오는 중 오류 발생:', error);
      }
    };

    fetchProduct();
  }, [category]);

  if (!products) {
    return <div>Loading...</div>;
  }

  const saveViewedProduct = async (userCode, productCode) => {
    try {
      await axios.post('http://localhost:8000/saveViewedProduct', {
        userCode: userCode,
        productCode: productCode,
      });
      console.log('상품을 성공적으로 저장했습니다.');
    } catch (error) {
      console.error('상품을 저장하는 중 오류 발생:', error);
    }
  };

  // 상품 클릭 시 호출되는 함수
  const handleClickProduct = (productCode) => {
    const userCode = sessionStorage.getItem('userCode');
    if (userCode) {
      saveViewedProduct(userCode, productCode);
    } else {
      console.log('사용자가 로그인되어 있지 않습니다.');
    }
  };

  return (
    <div>
      <div id="recommended-properties">
        <div className="best-item">Best Item</div>
        <div className="sub-best-item">조회수가 높은 아이템 👍</div>

        <div id="guides-properties">
          <div className="guides-section">
            {products.map((product, index) => (
              <div
                className="guides-card"
                data-rank={index + 1}
                key={product.productCode}
              >
                <Link to={`/product/${product.productCode}`}>
                  <img
                    src={`http://localhost:8000/getProductImage/${product.productCode}`}
                    alt={`코디 ${product.productCode}`}
                    className="property-image"
                    style={{
                      width: '12em',
                      height: '12em',
                    }}
                    onClick={() => handleClickProduct(product.productCode)}
                  />
                </Link>

                <div className="product-info">
                  <p>
                    <strong>상품명:</strong> {product.productName}
                  </p>
                  <p>
                    <strong>설명:</strong> {product.information}
                  </p>
                  <p>
                    <strong>회사명:</strong> {product.companyName}
                  </p>
                  <p>
                    <strong>재고:</strong> {product.productStuck}
                  </p>
                  <p>
                    <strong>제품 크기:</strong> {product.productSize}
                  </p>
                  <p>
                    <strong></strong> ₩{product.productPrice}
                  </p>
                  <p>
                    <strong>조회수:</strong> {product.viewCount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
