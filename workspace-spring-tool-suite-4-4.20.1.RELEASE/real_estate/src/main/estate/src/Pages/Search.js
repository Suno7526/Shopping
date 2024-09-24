import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './Search.css'; // 외부 스타일 시트 불러오기

const Search = () => {
  const { query } = useParams(); // URL에서 검색어 가져오기
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/searchProducts/${query}`,
        ); // 검색어를 서버로 전달
        setProducts(response.data.sort((a, b) => b.viewCount - a.viewCount)); // 조회수 순으로 정렬
      } catch (error) {
        console.error('검색 결과를 불러오는 중 오류 발생:', error);
      }
    };

    if (query.trim() !== '') {
      fetchSearchResults();
    } else {
      setProducts(null); // 검색어가 없으면 검색 결과 초기화
    }
  }, [query]);

  const handleClickProduct = (productCode) => {
    const userCode = sessionStorage.getItem('userCode');
    if (userCode) {
      // 상품 조회 수 저장 등 추가 작업 수행
    } else {
      console.log('사용자가 로그인되어 있지 않습니다.');
    }
  };

  if (!products) {
    return <div>Loading...</div>; // 로딩 화면 표시
  }

  return (
    <div>
      <div id="Category-recommended-properties">
        <div className="Search-item">Search</div>
        <div className="Secend-Category-item">Item</div>
        <div className="Category-item-line"></div>

        <div id="Category-guides-properties">
          <div className="Category-guides-section">
            {products.length > 0 ? (
              products.map((product, index) => (
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
                      onClick={() => handleClickProduct(product.productCode)}
                    />
                  </Link>

                  <div className="Category-product-info">
                    <div>{product.companyName}</div>
                    <div className="Category-productName">
                      {product.productName}
                    </div>
                    <div className="Category-productPrice">
                      {product.productPrice}
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
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
