import React, { useState } from 'react';
import axios from 'axios';
import './ProductJoin.css'; // 외부 스타일 시트 불러오기

const ProductJoin = () => {
  const [productData, setProductData] = useState({
    productName: '',
    information: '',
    productPrice: '',
    companyName: '',
    productStuck: '',
    category: '',
  });

  const [productImages, setProductImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e) => {
    const imageFiles = Array.from(e.target.files);

    const newProductImages = [...productImages, ...imageFiles];
    console.log('선택한 파일들:', newProductImages); // 콘솔에 선택한 파일들을 출력
    setProductImages(newProductImages);

    const imagePreviews = imageFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...imagePreviews]);
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
        !productData.category ||
        productImages.length === 0
      ) {
        alert(
          '상품명, 설명, 가격, 회사명, 재고, 상품 카테고리, 그리고 이미지를 모두 입력해주세요.',
        );
        return;
      }

      const formData = new FormData();
      formData.append('productName', productData.productName);
      formData.append('information', productData.information);
      formData.append('productPrice', productData.productPrice);
      formData.append('companyName', productData.companyName);
      formData.append('productStuck', productData.productStuck);
      formData.append('category', productData.category);

      productImages.forEach((image, index) => {
        formData.append('productImages', image);
      });

      await axios.post('http://localhost:8000/saveProduct', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('상품이 성공적으로 등록되었습니다.');
    } catch (error) {
      console.error('상품 등록 실패:', error);
      alert('상품 등록 실패');
    }
  };

  return (
    <div className="product-join-container">
      <div className="product-join-form">
        <h2>상품 등록</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="productName">상품명:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={productData.productName}
            onChange={handleInputChange}
            required
          />
          <br />

          <label htmlFor="information">설명:</label>
          <textarea
            id="information"
            name="information"
            value={productData.information}
            onChange={handleInputChange}
            required
          />
          <br />

          <label htmlFor="productPrice">가격:</label>
          <input
            type="number"
            id="productPrice"
            name="productPrice"
            value={productData.productPrice}
            onChange={handleInputChange}
            required
          />
          <br />

          <label htmlFor="companyName">회사명:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={productData.companyName}
            onChange={handleInputChange}
            required
          />
          <br />

          <label htmlFor="productStuck">재고:</label>
          <input
            type="number"
            id="productStuck"
            name="productStuck"
            value={productData.productStuck}
            onChange={handleInputChange}
            required
          />
          <br />

          <label htmlFor="category">카테고리:</label>
          <select
            id="category"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">카테고리 선택</option>
            <option value="상의">상의</option>
            <option value="하의">하의</option>
            <option value="모자">모자</option>
            <option value="기타">기타</option>
          </select>
          <br />

          <label htmlFor="productImages">상품 이미지:</label>
          <input
            type="file"
            id="productImages"
            name="productImages"
            multiple
            onChange={handleFileChange}
            required
          />
          <br />

          {previewImages.length > 0 && (
            <div className="image-preview">
              {previewImages.map((src, index) => (
                <img key={index} src={src} alt={`preview ${index}`} />
              ))}
            </div>
          )}

          <button type="submit">상품 등록</button>
        </form>
      </div>
    </div>
  );
};

export default ProductJoin;
