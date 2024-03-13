import React from 'react';
import './Product.css'; // 외부 스타일 시트 불러오기

const ProductDetail = () => {
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>메인페이지</title>

      <button id="login-btn" onclick="location.href='login.html';">
        로그인
      </button>
      <button id="signup-btn" onclick="location.href='register.html';">
        회원가입
      </button>
      <button id="wishlistBtn" onclick="location.href='Watchlist.html'">
        관심목록
      </button>
      <button id="goroom" onclick="location.href='#####.html'">
        마이페이지
      </button>

      <header>
        <div id="branding">
          <h1>옷옷장</h1>
        </div>
      </header>

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

      <div class="container">
        <aside>
          <div className="property-card">
            <img
              src="C:\Users\Sunho\OneDrive\문서\카카오톡 받은 파일\루즈핏 티셔츠.jpg"
              alt="메인이미지"
              className="property-image"
            />
          </div>
        </aside>

        <section>
          <div class="description-card">
            <div class="grid-item">[제조사] 상품 명 - 상품</div>
            <div class="grid-item">판매가 -</div>
            <div class="grid-item">제조사 -</div>
            <div class="grid-item">SIZE -</div>
          </div>
        </section>
      </div>

      {/* 상품 이미지 밑 이름 라인 */}
      <div class="produtname">
        <section>
          <div class="produtname-card">
            <div class="item">
              <h2>[제조사] 상품 명 - 상품</h2>
            </div>
          </div>
        </section>
      </div>

      {/* 상품 재고 라인 */}
      <div class="product-container">
        <section>
          <div class="product-card">
            <div class="grid-item">상품 설명</div>
            <div class="grid-item">상품 재고</div>
            <div class="grid-item">등록 날짜</div>
          </div>
        </section>
      </div>

      <footer>
        <p>© 기타 문의 바람.</p>
      </footer>
    </div>
  );
};

export default ProductDetail;
