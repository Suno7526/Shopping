import './Product.css'; // 외부 스타일 시트 불러오기
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Product = () => {
  const { productCode } = useParams();
  const [product, setProduct] = useState(null);

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
  }, [productCode]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>메인페이지</title>

      <header>
        <div id="branding">
          <h1>옷옷장</h1>
        </div>
      </header>

      {/*추가된 퀵 메뉴 코드 */}
      <div className="quick-menu">
        <ul>
          <li>
            <a href="#branding">맨 위로</a>
          </li>
          <li>
            <a href="#description-card">상품 설명</a>
          </li>
          <li>
            <a href="#review">리뷰</a>
          </li>
        </ul>
      </div>

      <header>
        <nav id="gnb">
          <ul>
            <li>
              <a href="#outer">OUTER</a>
              <ul>
                <li>
                  <a href="#jacket">JACKET</a>
                </li>
                <li>
                  <a href="#zip-up">ZIP-UP</a>
                </li>
                <li>
                  <a href="#jumper">JUMPER</a>
                </li>
                <li>
                  <a href="#coat">COAT</a>
                </li>
                <li>
                  <a href="#padding">PADDING / PARKA</a>
                </li>
                <li>
                  <a href="#fur">FUR / MUSTANG</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#top">TOP</a>
              <ul>
                <li>
                  <a href="#sleeveless">SLEEVELESS / VEST</a>
                </li>
                <li>
                  <a href="#short-tee">SHORT TEE</a>
                </li>
                <li>
                  <a href="#long-tee">LONG TEE</a>
                </li>
                <li>
                  <a href="#shirts">SHIRTS</a>
                </li>
                <li>
                  <a href="#crewneck">CREWNECK</a>
                </li>
                <li>
                  <a href="#knit">KNIT</a>
                </li>
                <li>
                  <a href="#hoodie">HOODIE</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#bottom">BOTTOM</a>
              <ul>
                <li>
                  <a href="#short-pants">SHORT PANTS</a>
                </li>
                <li>
                  <a href="#sweat-pants">SWEAT PANTS</a>
                </li>
                <li>
                  <a href="#long-pants">LONG PANTS</a>
                </li>
                <li>
                  <a href="#skirt">SKIRT</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#headwear">HEADWEAR</a>
              <ul>
                <li>
                  <a href="#cap">CAP</a>
                </li>
                <li>
                  <a href="#bucket-hat">BUCKET HAT</a>
                </li>
                <li>
                  <a href="#snapback">SNAPBACK</a>
                </li>
                <li>
                  <a href="#beanie">BEANIE</a>
                </li>
                <li>
                  <a href="#etc">ETC.</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
      <hr />

      {/* 메인 이미지 칸 */}
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
              [제조사] 상품 명 : {product.productName}
            </div>
            <div className="grid-item">판매가 : {product.productPrice}</div>
            <div className="grid-item">제조사 : </div>
            <div className="grid-item">SIZE : </div>
            <div className="grid-item">상품 재고 : </div>
            <div className="grid-item">등록 날짜 : </div>
            <div className="grid-item">별점 : </div>

            {/* 버튼 추가 */}
            <div className="buttons">
              <button className="purchase-btn">구매하기</button>
              <button className="like-btn">찜하기</button>
              <button className="cart-btn">장바구니 담기</button>
            </div>
            <br></br>
          </div>
        </section>
      </div>
      <hr></hr>

      {/* 상품 재고 라인 */}
      <div class="product-container">
        <section>
          <div class="product-card">
            <div class="grid-item">상품 설명</div>
          </div>
        </section>
      </div>

      <div class="review">
        <section id="review">
          <div class="review-card">
            <div class="grid-item">상품 리뷰</div>
          </div>
        </section>
      </div>

      <footer>
        <p>© 기타 문의 바람.</p>
      </footer>
    </div>
  );
};

export default Product;
