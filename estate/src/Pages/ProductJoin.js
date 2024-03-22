import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const ProductJoin = () => {
  const [productData, setProductData] = useState({
    productName: '',
    information: '',
    productPrice: '',
    companyName: '',
    productStuck: '',
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
        !productImage
      ) {
        alert(
          '상품명, 설명, 가격, 회사명, 재고, 그리고 이미지를 모두 입력해주세요.',
        );
        return;
      }

      const formData = new FormData();
      formData.append('productName', productData.productName);
      formData.append('information', productData.information);
      formData.append('productPrice', productData.productPrice);
      formData.append('companyName', productData.companyName);
      formData.append('productStuck', productData.productStuck);
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
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>매물 등록</title>
      <style
        dangerouslySetInnerHTML={{
          __html: `
    /* 스타일링을 원하는 대로 수정하세요 */
    body {
        font-family: 'Noto Sans KR', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
        color: #333;
    }

    #branding {
        color: #4a9fff;
        font-size: 30px;
        margin: 10px;
        text-align: center;
    }

    #property-form {
        background-color: #fff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        text-align: left;
        margin: 20px auto;
        width: 40%; /* 전체 너비의 n%로 조정 */
    }

    label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
    }

    input, textarea {
        width: 100%;
        padding: 10px;
        margin-bottom: 15px;
        box-sizing: border-box;
    }

    textarea {
        resize: vertical; /* 수직 크기 조절 가능 */
    }

    h2 {
        font-size: 20px;
        margin-top: 15px;
    }

    .price-info-form, .detail-info-form, .description-form {
        margin-top: 20px;
        border-top: 1px solid #ccc; /* 상단 경계선 추가 */
        padding-top: 20px; /* 상단 패딩 추가 */
    }

    button {
        background-color: #4a9fff;
        color: #fff;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        display: block;
        margin: 0 auto; /* 가운데 정렬 */
    }

    .detail-info-form input {
        margin-top: 5px;
    }

    .gray-text {
        color: #888;
    }

    #property-image-preview {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
        margin-top: 20px;
    }
`,
        }}
      />
      <div id="branding">상품 등록</div>

      <div id="property-form">
        <form encType="multipart/form-data">
          <label htmlFor="productName">상품명:</label>
          <input
            type="text"
            id="productName"
            name="productName" // 수정: 프로퍼티 이름을 name으로 변경
            value={productData.productName} // 수정: 프로퍼티 이름을 name으로 변경
            onChange={handleInputChange}
          />

          <label htmlFor="information">설명:</label>
          <input
            type="text"
            id="information"
            name="information"
            value={productData.information}
            onChange={handleInputChange}
          />

          <label htmlFor="productPrice">가격:</label>
          <input
            type="text"
            id="productPrice"
            name="productPrice" // 수정: 프로퍼티 이름을 price로 변경
            value={productData.productPrice} // 수정: 프로퍼티 이름을 price로 변경
            onChange={handleInputChange}
          />

          <label htmlFor="companyName">회사명:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={productData.companyName}
            onChange={handleInputChange}
          />

          <label htmlFor="productStuck">재고:</label>
          <input
            type="text"
            id="productStuck"
            name="productStuck"
            value={productData.productStuck}
            onChange={handleInputChange}
          />

          <div id="property-details">
            <label htmlFor="productImage">사진 업로드:</label>
            <input
              type="file"
              id="productImage"
              name="productImage"
              accept="image/*"
              onChange={handleFileChange}
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
