import React, { useState } from 'react';
import axios from 'axios';
import './ProductJoin.css'; // 외부 스타일 시트 불러오기
import ManageAside from '../Components/ManageAside';

const ProductJoin = () => {
  const [productData, setProductData] = useState({
    productName: '',
    information: '',
    productPrice: '',
    companyName: '',
    productStuck: '',
    category: '',
    colors: [],  // 색상 배열
    sizes: [],   // 사이즈 배열
  });

  const [productImages, setProductImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const [newColor, setNewColor] = useState('');
  const [newSize, setNewSize] = useState('');

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

  const handleAddColor = () => {
    if (newColor) {
      setProductData({
        ...productData,
        colors: [...productData.colors, newColor],
      });
      setNewColor('');
    }
  };

  const handleAddSize = () => {
    if (newSize) {
      setProductData({
        ...productData,
        sizes: [...productData.sizes, newSize],
      });
      setNewSize('');
    }
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
          productImages.length === 0 ||
          productData.colors.length === 0 ||
          productData.sizes.length === 0
      ) {
        alert(
            '상품명, 설명, 가격, 회사명, 재고, 상품 카테고리, 색상, 사이즈 그리고 이미지를 모두 입력해주세요.',
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

      // 색상과 사이즈도 formData에 추가
      productData.colors.forEach(color => formData.append('colors', color));
      productData.sizes.forEach(size => formData.append('sizes', size));

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
      <div className="App">
        <ManageAside />
        <div id="propertyform">
          <h2>상품 등록</h2>
          <form onSubmit={handleSubmit}>
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
                required
            />
            <br />

            <label htmlFor="information">설명:</label>
            <textarea
                id="information"
                name="information"
                value={productData.information}
                onChange={handleInputChange}
                className="productJoin-input"
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
                className="productJoin-input"
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
                className="productJoin-input"
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
                className="productJoin-input"
                required
            />
            <br />

            <label htmlFor="category">카테고리:</label>
            <select
                id="category"
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                className="productJoin-input"
                required
            >
              <option value="">카테고리 선택</option>
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
            <br />

            <label htmlFor="newColor">색상:</label>
            <input
                type="text"
                id="newColor"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="productJoin-input"
            />
            <button type="button" onClick={handleAddColor}>색상 추가</button>
            <ul>
              {productData.colors.map((color, index) => (
                  <li key={index}>{color}</li>
              ))}
            </ul>
            <br />

            <label htmlFor="newSize">사이즈:</label>
            <input
                type="text"
                id="newSize"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                className="productJoin-input"
            />
            <button type="button" onClick={handleAddSize}>사이즈 추가</button>
            <ul>
              {productData.sizes.map((size, index) => (
                  <li key={index}>{size}</li>
              ))}
            </ul>
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
                      <img
                          key={index}
                          src={src}
                          alt={`preview ${index}`}
                          style={{ width: '200px', height: '200px', marginTop: '10px' }}
                      />
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
