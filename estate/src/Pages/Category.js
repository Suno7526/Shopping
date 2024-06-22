import './Category.css'; // 외부 스타일 시트 불러오기
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProductsByCategory = async (categories) => {
      try {
        const promises = categories.map((category) =>
          axios.get(`/category/${category}`),
        );
        const results = await Promise.all(promises);
        const data = results.map((result) => result.data).flat();
        setProducts(data.sort((a, b) => b.viewCount - a.viewCount));
      } catch (error) {
        console.error('상품을 불러오는 중 오류 발생:', error);
      }
    };

    const categoriesMap = {
      OUTER: ['재킷', '집업', '점퍼', '코트', '패딩', '파카', '모피', '머스탱'],
      TOP: [
        '민소매',
        '조끼',
        '반팔티',
        '긴팔티',
        '셔츠',
        '크루넥',
        '니트',
        '후드',
      ],
      BOTTOM: ['반바지', '츄리닝', '긴바지', '치마'],
      HEADWEAR: ['캡', '버킷햇', '스냅백', '비니', '기타'],
    };

    if (
      category === 'OUTER' ||
      category === 'TOP' ||
      category === 'BOTTOM' ||
      category === 'HEADWEAR'
    ) {
      fetchProductsByCategory(categoriesMap[category]);
    } else {
      axios
        .get(`/category/${category}`)
        .then((response) =>
          setProducts(response.data.sort((a, b) => b.viewCount - a.viewCount)),
        )
        .catch((error) =>
          console.error('상품을 불러오는 중 오류 발생:', error),
        );
    }
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
      <div id="Category-recommended-properties">
        <div className="JacketImage"></div>
        <div className="Category-item">{category}</div>
        <div className="Secend-Category-item"> Item</div>
        <div className="Category-item-line"></div>

        <div id="Category-guides-properties">
          <div className="Category-guides-section">
            {products.map((product, index) => (
              <div
                className="Category-guides-card"
                data-rank={index + 1}
                key={product.productCode}
              >
                <Link to={`/product/${product.productCode}`}>
                  <img
                    src={`http://localhost:8000/getProductImage/${product.productCode}`}
                    alt={`코디 ${product.productCode}`}
                    className="property-image"
                    style={{
                      width: '15em',
                      height: '20em',
                    }}
                    onClick={() => handleClickProduct(product.productCode)}
                  />
                </Link>

                <div className="Category-product-info">
                  <div>{product.companyName}</div>
                  <div className="Category-productName">
                    {product.productName}
                  </div>
                  <div className="Category-productPrice">
                    {product.productPrice}원
                  </div>

                  <div className="Category-viewCount">
                    <img
                      src="https://i.postimg.cc/XNRxQKLY/download.png"
                      className="views-icon"
                      alt="조회수"
                    />
                    {product.viewCount}
                  </div>
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
