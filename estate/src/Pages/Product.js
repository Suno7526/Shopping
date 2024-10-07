import './Product.css';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Product = () => {
  const { productCode } = useParams();
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [mainImage, setMainImage] = useState(null); // 현재 메인 이미지 소스
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageReviewPoint, setAverageReviewPoint] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0); // 할인된 가격 상태 추가
  const [DiscountedRate, setDiscountedRate] = useState(0); // 할인된 가격 상태 추가
  const [editorContent, setEditorContent] = useState(''); //summernote 함수
  const [isEditing, setIsEditing] = useState(false); // summernote 함수 수정 모드 상태
  const navigate = useNavigate();

  const [imageUrls, setImageUrls] = useState([]);
  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getProductImages/${productCode}`,
          {
            responseType: 'json', // JSON 형태로 받아옵니다.
          },
        );

        setImageUrls(response.data);
        if (response.data.length > 0) {
          // 첫 번째 이미지를 메인 이미지로 설정
          setMainImage(convertToBlobUrl(response.data[0]));
        }
      } catch (error) {
        console.error('상품 이미지를 불러오는 중 오류 발생:', error);
      }
    };

    fetchProductImages();
  }, [productCode]);

  useEffect(() => {
    if (product) {
      const discountRate = product.discountRate || 0;
      setDiscountedRate(discountRate);
      const calculatedDiscountedPrice =
        (product.productPrice * (100 - discountRate)) / 100;
      setDiscountedPrice(calculatedDiscountedPrice);
    }
  }, [product]);

  // Base64 문자열을 Blob URL로 변환하는 함수
  const convertToBlobUrl = (base64String) => {
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: 'image/jpeg' }); // 이미지 타입에 따라 수정
    return URL.createObjectURL(blob);
  };

  const handleClick = (index, imageUrl) => {
    setSelectedOption(index);
    setMainImage(convertToBlobUrl(imageUrl)); // 클릭된 서브 이미지를 메인 이미지로 설정
  };

  const colorChange = (index, color) => {
    setSelectedOption(index);
    setSelectedColor(color); // 선택한 색상 저장
  };

  const sizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const userCode = sessionStorage.getItem('userCode');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getProduct/${productCode}`,
        );
        setProduct(response.data);
        // checkLiked(response.data);
      } catch (error) {
        console.error('상품을 불러오는 중 오류 발생:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getReviews/${productCode}`,
        );
        setReviews(response.data);
        calculateAverageReviewPoint(response.data);
      } catch (error) {
        console.error('리뷰를 불러오는 중 오류 발생:', error);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [productCode]);

  useEffect(() => {
    const fetchLikedStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getLikeProduct/${userCode}`,
        );
        const likedProducts = response.data;
        const found = likedProducts.some(
          (likedProduct) =>
            likedProduct.product.productCode === product.productCode,
        );
        setIsLiked(found);
      } catch (error) {
        console.error('찜한 상품을 확인하는 중 오류 발생:', error);
      }
    };

    if (userCode) {
      fetchLikedStatus();
    }
  }, [userCode, product]);

  const handleLikeClick = async () => {
    try {
      if (!userCode) {
        alert('로그인이 필요합니다.');
        return;
      }

      if (isLiked) {
        alert('이미 찜한 상품입니다.');
        return;
      }

      await axios.post('http://localhost:8000/like', {
        userCode: userCode,
        productCode: productCode,
      });
      alert('상품을 찜했습니다.');
      setIsLiked(true);
    } catch (error) {
      console.error('상품을 찜하는 중 오류 발생:', error);
    }
  };

  const handleAddToCartClick = async () => {
    try {
      if (!userCode) {
        alert('로그인이 필요합니다.');
        return;
      }
      // 색상과 사이즈 유효성 검사 추가
      if (!selectedColor) {
        alert('색상을 선택해주세요.');
        return;
      }

      if (!selectedSize) {
        alert('사이즈를 선택해주세요.');
        return;
      }

      await axios.post('http://localhost:8000/addToCart', {
        userCode: userCode,
        productCode: productCode,
        cartSize: selectedSize,
        cartColor: selectedColor, // 선택한 색상 추가
      });
      alert('상품을 장바구니에 담았습니다.');
    } catch (error) {
      console.error('상품을 장바구니에 담는 중 오류 발생:', error);
    }
  };

  const handlePurchaseClick = () => {
    if (!userCode) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (!selectedColor) {
      alert('색상을 선택해주세요.');
      return;
    }

    if (!selectedSize) {
      alert('사이즈를 선택해주세요.');
      return;
    }

    navigate('/paymentproduct', {
      state: {
        product,
        selectedColor,
        selectedSize,
      },
    });
  };

  const formatRegisterDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const calculateAverageReviewPoint = (reviews) => {
    if (reviews.length === 0) {
      setAverageReviewPoint(0);
      return;
    }

    const totalPoints = reviews.reduce(
      (acc, review) => acc + review.reviewPoint,
      0,
    );
    const average = totalPoints / reviews.length;
    setAverageReviewPoint(average.toFixed(1)); // 평균 별점 계산 및 설정
  };

  // Helper function to render star ratings
  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i}>&#x2605;</span>);
      } else {
        stars.push(<span key={i}>&#9734;</span>);
      }
    }
    return stars;
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  // 수정 버튼 클릭 시 수정 모드 토글
  const handleInfoModifyClick = () => {
    setIsEditing(!isEditing);
  };

  const handleEditorChange = (content) => {
    const cleanedContent = content
      .replace(/^(<p>|<br>)/, '')
      .replace(/(<\/p>|<br>){1}$/, '');
    setEditorContent(cleanedContent);
  };

  // 저장 버튼 클릭 시 처리
  const handleSaveContent = async () => {
    alert('수정된 내용을 저장합니다: ' + editorContent);
    try {
      const response = await axios.put(
        `http://localhost:8000/updateContent/${productCode}`, // URL에서 editorContent 제거
        editorContent, // 요청 본문에 editorContent 추가
        {
          headers: {
            'Content-Type': 'text/plain', // 요청 본문의 콘텐츠 유형 설정
          },
        },
      );
      setIsEditing(false); // 수정 모드 종료
      // 성공적으로 저장된 경우 추가 처리
      if (response.status === 200) {
        alert('수정이 완료되었습니다.');
      }
    } catch (error) {
      console.error('Content 저장 오류', error);
      alert('수정 내용 저장에 실패했습니다.');
    }
  };

  return (
    <div>
      {/* 메인 이미지 칸 */}
      <div className="Product-container">
        <aside className="Product-aside">
          <div className="Product-property-card">
            <img
              src={mainImage}
              alt={product.productName}
              className="product-property-image"
            />
            <ul className="subImg">
              {imageUrls.map((imageUrl, index) => (
                <li key={index}>
                  <img
                    src={convertToBlobUrl(imageUrl)}
                    alt={`서브 이미지 ${index}`}
                    onClick={() => handleClick(index, imageUrl)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section id="description-card-section">
          <div className="description-card">
            <div className="grid-item-productName">
              {product.companyName}
              <br />
              <br></br>
              {product.productName}
            </div>

            <div className="grid-item-productStuck">
              재고 : {product.productStuck}
            </div>
            <div className="grid-item-registerDate">
              등록 날짜 : {formatRegisterDate(product.registerDate)}
            </div>
            <div className="option-title">색상을 선택해주세요</div>
            <div className="grid-item-option">
              {['red', 'orange', 'yellow', 'green'].map((color, index) => (
                <div
                  key={index}
                  className={`option-button ${
                    selectedOption === index ? 'clicked' : ''
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => colorChange(index, color)} // 색상 정보 전달
                />
              ))}
            </div>
            <div className="size-selector">
              <label className="size-title">사이즈 선택: </label>
              <select
                id="size-input"
                value={selectedSize}
                onChange={sizeChange}
              >
                {[...Array(9)].map((_, index) => {
                  const size = 80 + index * 5;
                  return (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="grid-item-userPoint">
              별점
              <div class="star-rating">
                {renderStarRating(averageReviewPoint)}
              </div>
            </div>

            <div className="grid-item-productPrice">
              💲 판매가 : {product.productPrice}
            </div>

            <div className="cupon-wrap">
              <div className="cupon-text"> 할인 후 금액{}</div>
              <div className="discount-rate">{DiscountedRate}%</div>
              <div className="discount-price">
                {discountedPrice.toFixed(0)}원
              </div>
            </div>

            {/* 버튼 추가 */}
            <div className="buttons">
              <button
                className={`like-btn ${isLiked ? 'active' : ''}`}
                onClick={handleLikeClick}
              ></button>
              <button className="cart-btn" onClick={handleAddToCartClick}>
                장바구니 담기
              </button>
              <button className="purchase-btn" onClick={handlePurchaseClick}>
                구매하기
              </button>
            </div>
          </div>
        </section>
      </div>
      <hr></hr>

      {/* 사이즈 정보 */}
      <div className="size-info">
        <h2>Size Info</h2>
        <table className="size-table">
          <thead>
            <tr>
              <th>cm</th>
              <th>총장</th>
              <th>어깨너비</th>
              <th>가슴단면</th>
              <th>소매길이</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>MY</td>
              <td colSpan="4">가지고 계신 제품의 실측을 입력해 보세요~!</td>
            </tr>
            <tr>
              <td>M</td>
              <td>67</td>
              <td>48</td>
              <td>56</td>
              <td>23</td>
            </tr>
            <tr>
              <td>L</td>
              <td>69</td>
              <td>50</td>
              <td>58</td>
              <td>24</td>
            </tr>
            <tr>
              <td>XL</td>
              <td>71</td>
              <td>52</td>
              <td>60</td>
              <td>25</td>
            </tr>
          </tbody>
        </table>
        <div className="sizeInfo-P">
          <p>
            위 사이즈표는 무신사스토어 측정방식을 기준으로 작성되었습니다.
            기존에 가지고 계신 옷 실측을 입력하시면 정확한 비교가 가능합니다.
            하단의 상품 상세 설명란의 사이즈표는 업체 기준 측정입니다. 상품
            이미지는 모니터 해상도, 색상 설정에 따라 이미지가 왜곡되거나 실제
            색상과 차이가 있을 수 있습니다. 사이즈 실측은 상품의 특성 및
            측정방식에 따라 오차가 발생할 수 있습니다.
          </p>
        </div>
      </div>

      {/* 가이드 */}
      <div className="guide-info">
        <h2>Guide</h2>
        <table className="guide-table">
          <thead>
            <tr>
              <th>핏</th>
              <th>스키니</th>
              <th>슬림</th>
              <th>레귤러</th>
              <th>루즈</th>
              <th>오버 사이즈</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>촉감</th>
              <td>부드러움</td>
              <td>약간 부드러움</td>
              <td>보통</td>
              <td>약간 뻣뻣함</td>
              <td>뻣뻣함</td>
            </tr>
            <tr>
              <th>신축성</th>
              <td>없음</td>
              <td>거의 없음</td>
              <td>보통</td>
              <td>약간 있음</td>
              <td>있음</td>
            </tr>
            <tr>
              <th>비침</th>
              <td>있음</td>
              <td>약간 있음</td>
              <td>보통</td>
              <td>거의 없음</td>
              <td>없음</td>
            </tr>
            <tr>
              <th>두께</th>
              <td>얇음</td>
              <td>약간 얇음</td>
              <td>보통</td>
              <td>약간 두꺼움</td>
              <td>두꺼움</td>
            </tr>
            <tr>
              <th>계절</th>
              <td>봄</td>
              <td>여름</td>
              <td>가을</td>
              <td>겨울</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="Danger">
        <div className="Danger-Emo">🚫</div>
        <div className="Danger-SizeInfo">
          <ul>
            <li>
              상품 이미지는 모니터 해상도, 색상 설정에 따라 이미지가 왜곡되거나
              실제 색상과 차이가 있을 수 있습니다.
            </li>
            <li>
              사이즈 실측은 상품의 특성 및 측정방식에 따라 오차가 발생할 수
              있습니다.
            </li>
          </ul>
        </div>
      </div>

      {/* 하단의 탭부분 시작 */}
      <div>
        <div className="viewBody">
          <ul className="contentNav">
            <li className="active">
              <p>
                Info 정보
                <button className="Info-modify" onClick={handleInfoModifyClick}>
                  관리자 수정
                </button>
              </p>
            </li>
          </ul>

          {/* 수정 모드일 때 Quill 에디터 표시 */}
          {isEditing ? (
            <div className="quill-editor-container">
              <ReactQuill
                value={editorContent}
                onChange={handleEditorChange}
                modules={{
                  toolbar: [
                    [{ header: '1' }, { header: '2' }, { font: [] }],
                    [{ size: [] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link', 'image'],
                    ['clean'],
                  ],
                }}
                style={{ height: '400px' }}
                theme="snow"
              />
              <button className="Quill-save-button" onClick={handleSaveContent}>
                저장하기
              </button>
            </div>
          ) : (
            <div className="Product-information-image">
              <p>여기에 상품 정보가 표시됩니다.</p>
            </div>
          )}
        </div>

        {/* 탭부분 끝 */}
        {/* 상품정보 */}
        <div className="Product-information-image">
          <div dangerouslySetInnerHTML={{ __html: product.productContent }} />
          <ul className="Product-information-subImg2">
            {imageUrls.map((imageUrl, index) => (
              <li key={index}>
                <img
                  src={convertToBlobUrl(imageUrl)}
                  alt={`서브 이미지 ${index}`}
                  onClick={() => handleClick(index, imageUrl)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="contentNav">
        <li className="active">
          <p>구매 후기</p>
        </li>
      </ul>

      <ul>
        {reviews.map((review) => (
          <li key={review.reviewCode}>
            <div className="reviews-section">
              <div className="Userreviews">
                <div className="user-info">
                  <img
                    src="https://i.postimg.cc/59mNLwVZ/download.png"
                    alt="User"
                    className="user-image"
                  />
                  <div className="UserNameStarRating">
                    <div className="reviews-user-name">{review.user.name}</div>
                    <div class="star-rating">
                      {renderStarRating(review.reviewPoint)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="starAndComment">
                <div className="reviews-comment">
                  <div className="comment-header"></div>
                  <div className="comment-product">
                    상품 정보: {review.product.productName} /
                  </div>
                  <div className="comment-user">
                    <img
                      src={`http://localhost:8000/getProductImage/${review.product.productCode}`}
                      alt="Product"
                      className="user-property-image"
                    />
                  </div>
                  <textarea
                    className="comment-textarea"
                    value={review.reviewContent}
                    placeholder="..."
                  ></textarea>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Product;
