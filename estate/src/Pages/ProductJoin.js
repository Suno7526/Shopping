import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './ProductJoin.css'; // 외부 스타일 시트 불러오기

const ProductJoin = () => {
  const [productData, setProductData] = useState({
    productName: '',
    information: '',
    productPrice: '',
    companyName: '',
    productStuck: '',
    productSize: '',
    category: '',
  });

  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e) => {
    const imageFile = e.target.files[0];
    setProductImage(imageFile);
    setPreviewImage(URL.createObjectURL(imageFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !productData.productName ||
        !productData.information ||
        !productData.productPrice ||
        !productData.companyName ||
        !productData.productStuck ||
        !productData.productSize ||
        !productData.category ||
        !productImage
      ) {
        alert(
          '상품명, 설명, 가격, 회사명, 재고, 제품 크기, 사용자 포인트, 그리고 이미지를 모두 입력해주세요.',
        );
        return;
      }

      const formData = new FormData();
      formData.append('productName', productData.productName);
      formData.append('information', productData.information);
      formData.append('productPrice', productData.productPrice);
      formData.append('companyName', productData.companyName);
      formData.append('productStuck', productData.productStuck);
      formData.append('productSize', productData.productSize);
      formData.append('category', productData.category);
      formData.append('productImage', productImage);

      const response = await axios.post(
        'http://localhost:8000/saveProduct',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log(response.data);
      alert('상품 등록 성공');
    } catch (error) {
      alert('상품 등록 실패');
      console.error('상품 저장 오류:', error);
    }
  };

  return (
    <div className="App">
      <div id="propertyform">
        <form encType="multipart/form-data">
          <label htmlFor="productName" className="productJoin-label">
            상품명:
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={productData.productName}
            onChange={handleInputChange}
            className="productJoin-input"
          />

          <label htmlFor="information" className="productJoin-label">
            설명:
          </label>
          <input
            type="text"
            id="information"
            name="information"
            value={productData.information}
            onChange={handleInputChange}
            className="productJoin-input"
          />

          <label htmlFor="productPrice" className="productJoin-label">
            가격:
          </label>
          <input
            type="text"
            id="productPrice"
            name="productPrice"
            value={productData.productPrice}
            onChange={handleInputChange}
            className="productJoin-input"
          />

          <label htmlFor="companyName" className="productJoin-label">
            회사명:
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={productData.companyName}
            onChange={handleInputChange}
            className="productJoin-input"
          />

          <label htmlFor="productStuck" className="productJoin-label">
            재고:
          </label>
          <input
            type="text"
            id="productStuck"
            name="productStuck"
            value={productData.productStuck}
            onChange={handleInputChange}
            className="productJoin-input"
          />
          <label htmlFor="productSize" className="productJoin-label">
            제품 크기:
          </label>
          <input
            type="text"
            id="productSize"
            name="productSize"
            value={productData.productSize}
            onChange={handleInputChange}
            className="productJoin-input"
          />

          <label htmlFor="category" className="productJoin-label">
            상품 카테고리:
          </label>
          <select
            id="category"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            className="productJoin-input"
          >
            <option value="">카테고리를 선택하세요</option>
            <optgroup label="아우터">
              <option value="재킷">재킷</option>
              <option value="집업">집업</option>
              <option value="점퍼">점퍼</option>
              <option value="코트">코트</option>
              <option value="패딩/파카">패딩/파카</option>
              <option value="모피/머스탱">모피/머스탱</option>
            </optgroup>
            <optgroup label="상의">
              <option value="민소매">민소매</option>
              <option value="조끼">조끼</option>
              <option value="반팔티">반팔티</option>
              <option value="긴팔티">긴팔티</option>
              <option value="셔츠">셔츠</option>
              <option value="크루넥">크루 넥</option>
              <option value="니트">니트</option>
              <option value="후드">후드</option>
            </optgroup>
            <optgroup label="하의">
              <option value="반바지">반바지</option>
              <option value="츄리닝">츄리닝</option>
              <option value="긴바지">긴바지</option>
              <option value="치마">치마</option>
            </optgroup>
            <optgroup label="모자">
              <option value="캡">캡</option>
              <option value="버킷햇">버킷햇</option>
              <option value="스냅백">스냅백</option>
              <option value="비니">비니</option>
              <option value="기타">기타</option>
            </optgroup>
          </select>

          <div id="property-details">
            <label htmlFor="productImage" className="productJoin-label">
              사진 업로드:
            </label>
            <input
              type="file"
              id="productImage"
              name="productImage"
              accept="image/*"
              onChange={handleFileChange}
              className="productJoin-input"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="이미지 미리보기"
                style={{ width: '200px', height: '200px', marginTop: '10px' }}
              />
            )}
          </div>

          <button type="button" onClick={handleSubmit}>
            상품 등록
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductJoin;
