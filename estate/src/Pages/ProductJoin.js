import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const ProductJoin = () => {

  const [serverData, setServerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/");
        setServerData(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (error) {
        console.error("서버 통신 오류:", error);
      }
    };
  
    fetchData();
  }, []);

    const [productData, setProductData] = useState({
      name: '',
      address: '',
      price: '',
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setProductData({ ...productData, [name]: value });
    };
  
    const handleSubmit = async () => {
      try {
        const response = await axios.post('http://localhost:8000/saveProduct', productData);
        console.log(response.data);
        alert("완료")
      } catch (error) {
        alert("실패")
        console.error('Error saving product:', error);
      }
    };

    return (
        <div className="App">
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>매물 등록</title>
    <style dangerouslySetInnerHTML={{__html: `
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
`}} />
<div id="branding">매물 등록</div>
    
    <div id="property-form">
      <form encType="multipart/form-data">
      <ul>
        {serverData.map((message, idx) => (
        <li key={`${idx}-${message}`}>{message}</li>
        ))}
    </ul>
    <label htmlFor="productName">상품명:</label>
      <input
        type="text"
        id="productName"
        name="name"  // 수정: 프로퍼티 이름을 name으로 변경
        value={productData.name}  // 수정: 프로퍼티 이름을 name으로 변경
        onChange={handleInputChange}
      />

      <label htmlFor="productLocation">위치:</label>
      <input
        type="text"
        id="productLocation"
        name="address"  // 수정: 프로퍼티 이름을 address로 변경
        value={productData.address}  // 수정: 프로퍼티 이름을 address로 변경
        onChange={handleInputChange}
      />

      <label htmlFor="productPrice">가격:</label>
      <input
        type="text"
        id="productPrice"
        name="price"  // 수정: 프로퍼티 이름을 price로 변경
        value={productData.price}  // 수정: 프로퍼티 이름을 price로 변경
        onChange={handleInputChange}
      />

      <button type="button" onClick={handleSubmit}>상품 등록</button>
      
        <div id="property-details">
          <label htmlFor="property-image">사진 업로드:</label>
          <input 
          type="file" 
          id="property-image" 
          name="property-image" 
          accept="image/" 
          />
          <img id="property-image-preview" src="#" alt="미리보기" />


          <div className="price-info-form">
            <h2>가격 정보</h2>
            
              <label htmlFor="monthly-rent">월세:</label>
              <input type="text" id="monthly-rent" name="monthly-rent" />

              <label htmlFor="loan-amount">융자금:</label>
              <input type="text" id="loan-amount" name="loan-amount" />

              <label htmlFor="maintenance-cost">관리비:</label>
              <input type="text" id="maintenance-cost" name="maintenance-cost" />

              <label htmlFor="parking-availability">주차 여부:</label>
              <input type="text" id="parking-availability" name="parking-availability" />

              <label htmlFor="monthly-expense">한달 예상 주거비용:</label>
              <input type="text" id="monthly-expense" name="monthly-expense" />
            
          </div>

          <div className="detail-info-form">
            <h2>상세 정보</h2>
            <label htmlFor="building-name">건물이름</label>
            <input type="text" id="building-name" name="building-name" />

            <label htmlFor="room-type">방종류</label>
            <input type="text" id="room-type" name="room-type" />

            <label htmlFor="floor-info">해당층/건물층</label>
            <input type="text" id="floor-info" name="floor-info" />

            <label htmlFor="size-info">평</label>
            <input type="text" id="size-info" name="size-info" />

            <label htmlFor="room-count">방 수</label>
            <input type="text" id="room-count" name="room-count" />

            <label htmlFor="bathroom-count">욕실 수</label>
            <input type="text" id="bathroom-count" name="bathroom-count" />

            <label htmlFor="direction-info">방향</label>
            <input type="text" id="direction-info" name="direction-info" />

            <label htmlFor="heating-info">난방종류</label>
            <input type="text" id="heating-info" name="heating-info" />

            <label htmlFor="elevator-info">엘리베이터</label>
            <input type="text" id="elevator-info" name="elevator-info" />

            <label htmlFor="total-parking-info">총 주차대수</label>
            <input type="text" id="total-parking-info" name="total-parking-info" />

            <label htmlFor="parking-per-resident-info">세대당 주차수</label>
            <input type="text" id="parking-per-resident-info" name="parking-per-resident-info" />

            <label htmlFor="entrance-type-info">현관 유형</label>
            <input type="text" id="entrance-type-info" name="entrance-type-info" />

            <label htmlFor="move-in-date-info">입주가능일</label>
            <input type="text" id="move-in-date-info" name="move-in-date-info" />

            <label htmlFor="first-registration-date-info">최초등록일</label>
            <input type="text" id="first-registration-date-info" name="first-registration-date-info" />
          </div>


          <div className="description-form">
            <h2>매물 설명</h2>
            <label htmlFor="property-description">상세 설명</label>
            <textarea id="property-description" name="property-description" rows={5} placeholder="상세 설명을 남겨주세요!" className="gray-text" defaultValue={""} />
          </div>
          <button type="button">매물 등록</button>
          </div>
        </form>
    </div>
    </div>
    );
};

export default ProductJoin;
