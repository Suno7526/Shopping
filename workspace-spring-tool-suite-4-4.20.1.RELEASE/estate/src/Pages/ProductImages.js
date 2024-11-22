import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductImages = () => {
  const productCode = 340;
  const [imageUrls, setImageUrls] = useState([]);

  // Declare the API URL as a constant
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        const response = await axios.get(
            `${API_URL}/getProductImages/${productCode}`,
            {
              responseType: 'json', // JSON 형태로 받아옵니다.
            },
        );

        setImageUrls(response.data);
      } catch (error) {
        console.error('상품 이미지를 불러오는 중 오류 발생:', error);
      }
    };

    fetchProductImages();
  }, [productCode, API_URL]); // Add API_URL to the dependency array

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

  return (
      <div>
        <h2>상품 이미지</h2>
        <div className="image-container">
          {imageUrls.map((imageUrl, index) => (
              <img
                  key={index}
                  src={convertToBlobUrl(imageUrl)}
                  alt={`이미지 ${index}`}
              />
          ))}
        </div>
      </div>
  );
};

export default ProductImages;
