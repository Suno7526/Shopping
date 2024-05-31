import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom'; // 수정된 부분

const Search = () => {
  const { query } = useParams(); // URL에서 검색어 가져오기
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/searchProducts/${query}`,
        ); // 검색어를 서버로 전달
        setProducts(response.data);
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

  return (
    <div>
      <div id="recommended-properties">
        <div className="best-item">Best Item</div>
        <div className="sub-best-item">조회수가 높은 아이템 👍</div>

        <div id="guides-properties">
          <div className="guides-section">
            {products ? (
              products.map((product, index) => (
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
                      <strong>회사명:</strong> {product.companyName}
                    </p>
                    <p>
                      <strong>상품명:</strong> {product.productName}
                    </p>
                    <p>
                      <strong>가격</strong> {product.productPrice}₩
                    </p>
                    <p>
                      <strong>조회수:</strong> {product.viewCount}
                    </p>
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
