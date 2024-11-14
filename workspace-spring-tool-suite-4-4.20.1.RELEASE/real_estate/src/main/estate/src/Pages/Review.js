import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Review.css'; // 외부 스타일 시트 불러오기

const Review = () => {
  const { orderCode } = useParams(); // useParams에서 orderCode를 받아옵니다.
  const [orderData, setOrderData] = useState(null);
  const [reviewData, setReviewData] = useState({
    reviewContent: '',
    reviewPoint: 0,
  });
  const [productImages, setProductImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getOrder/${orderCode}`,
        );
        setOrderData(response.data);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };
    fetchOrderData();
  }, [orderCode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleStarClick = (point) => {
    setReviewData({ ...reviewData, reviewPoint: point });
  };

  const handleFileChange = (e) => {
    const imageFiles = Array.from(e.target.files);

    const newProductImages = [...productImages, ...imageFiles];
    setProductImages(newProductImages);

    const imagePreviews = imageFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...imagePreviews]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!reviewData.reviewContent || !reviewData.reviewPoint) {
        alert('리뷰 내용과 별점을 모두 입력해주세요.');
        return;
      }

      const formData = new FormData();
      formData.append('userCode', sessionStorage.getItem('userCode'));
      formData.append('productCode', orderData.product.productCode);
      formData.append('reviewContent', reviewData.reviewContent);
      formData.append('reviewPoint', reviewData.reviewPoint);
      formData.append('orderCode', orderCode);
      productImages.forEach((image, index) => {
        formData.append('productImages', image);
      });

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

  if (!orderData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>리뷰 등록</title>

      <div id="reviewform">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="productName" className="review-label">
            상품명 : {orderData.product.productName}
          </label>

          <label htmlFor="reviewContent" className="review-label">
            리뷰 내용
          </label>
          <textarea
            id="reviewContent"
            name="reviewContent"
            value={reviewData.reviewContent}
            onChange={handleInputChange}
            className="review-input"
          ></textarea>
          <div id="property-details">
            <label htmlFor="productImages" className="review-label">
              사진 업로드
            </label>
            <input
              type="file"
              id="productImages"
              name="productImages"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="review-input"
            />
            {previewImages.length > 0 && (
              <div className="image-preview">
                {previewImages.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`preview ${index}`}
                    style={{
                      width: '200px',
                      height: '200px',
                      marginTop: '10px',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          <label htmlFor="reviewPoint" className="review-label">
            별점
          </label>
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
          <button type="submit" className="review-button">
            리뷰 등록
          </button>
        </form>
      </div>
    </div>
  );
};

export default Review;
