import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Review.css'; // 외부 스타일 시트 불러오기

const Review = () => {
  const { productCode } = useParams();
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [reviewData, setReviewData] = useState({
    reviewContent: '',
    reviewPoint: 0,
  });

  useEffect(() => {
    const fetchProductName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getProduct/${productCode}`,
        );
        setProductName(response.data.productName);
      } catch (error) {
        console.error('Error fetching product name:', error);
      }
    };
    fetchProductName();
  }, [productCode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleStarClick = (point) => {
    setReviewData({ ...reviewData, reviewPoint: point });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!reviewData.reviewContent || !reviewData.reviewPoint) {
        alert('리뷰 내용과 별점을 모두 입력해주세요.');
        return;
      }

      const formData = new FormData();
      formData.append('productCode', productCode);
      formData.append('userCode', sessionStorage.getItem('userCode'));
      formData.append('reviewContent', reviewData.reviewContent);
      formData.append('reviewPoint', reviewData.reviewPoint);
      formData.append('productImage', productImage);

      const response = await axios.post(
        'http://localhost:8000/saveReview',
        formData,
      );

      console.log(response.data);
      alert('리뷰 등록 성공');
    } catch (error) {
      alert('리뷰 등록 실패');
      console.error('리뷰 저장 오류:', error);
    }
  };
  const handleFileChange = (e) => {
    const imageFile = e.target.files[0];
    setProductImage(imageFile);
    setPreviewImage(URL.createObjectURL(imageFile));
  };

  return (
    <div className="App">
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>리뷰 등록</title>

      <div id="reviewform">
        <form encType="multipart/form-data">
          <label htmlFor="productName">상품명 : {productName}</label>

          <label htmlFor="reviewContent">리뷰 내용</label>
          <textarea
            id="reviewContent"
            name="reviewContent"
            value={reviewData.reviewContent}
            onChange={handleInputChange}
          ></textarea>
          <div id="property-details">
            <label htmlFor="productImage">사진 업로드</label>
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
          <label htmlFor="reviewPoint">별점</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${
                  reviewData.reviewPoint >= star ? 'selected' : ''
                }`}
                onClick={() => handleStarClick(star)}
              >
                ★
              </span>
            ))}
          </div>
          <button type="button" onClick={handleSubmit}>
            리뷰 등록
          </button>
        </form>
      </div>
    </div>
  );
};

export default Review;
