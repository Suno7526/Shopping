import axios from 'axios';
import { useState, useEffect } from 'react';
import { Route } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

const ProductEntry = () => {

    const API_KEY = "ZSfaM%2FLZuHLIyZjsPt9c4Oe2N0ASRCvSPSVKyMv3zGb2WoJHQzFUWGtQb9cVBB3YqcZUTkg8Mi482pO24BYX%2Fw%3D%3D";
  const LAWD_CD = "11110";
  const DEAL_YMD = "201512";
  const url = `https://cors-anywhere.herokuapp.com/http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade?serviceKey=${API_KEY}&LAWD_CD=${LAWD_CD}&DEAL_YMD=${DEAL_YMD}`;

  const [result, setResult] = useState();
  const searchData = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: url
      });
      console.log(response.data); // API 응답 데이터 콘솔 출력
      setResult(response.data);
    } catch (error) {
      // 에러 처리
      console.error("데이터 가져오기 오류:", error);
    }
  }; // 중괄호 추가

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

    return (
        <div>
            <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>매물 등록</title>
    <style dangerouslySetInnerHTML={{__html: "\n        /* 스타일링을 원하는 대로 수정하세요 */\n        body {\n            font-family: 'Noto Sans KR', sans-serif;\n            margin: 0;\n            padding: 0;\n            background-color: #f5f5f5;\n            color: #333;\n        }\n\n        #branding {\n            color: #4a9fff;\n            font-size: 30px;\n            margin: 10px;\n            text-align: center;\n        }\n\n        #property-form {\n            background-color: #fff;\n            padding: 30px;\n            border-radius: 10px;\n            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n            text-align: left;\n            margin: 20px auto;\n            width: 40%; /* 전체 너비의 n%로 조정 */\n        }\n\n        label {\n            display: block;\n            margin-bottom: 8px;\n            font-weight: bold;\n        }\n\n        input {\n            width: 100%;\n            padding: 10px;\n            margin-bottom: 15px;\n            box-sizing: border-box;\n        }\n\n        textarea {\n            width: 100%;\n            padding: 10px;\n            margin-bottom: 15px;\n            box-sizing: border-box;\n            resize: vertical; /* 수직 크기 조절 가능 */\n        }\n\n        h2 {\n            font-size: 20px;\n            margin-top: 15px;\n        }\n\n        .price-info-form {\n            margin-top: 20px;\n            border-top: 1px solid #ccc; /* 상단 경계선 추가 */\n            padding-top: 20px; /* 상단 패딩 추가 */\n        }\n\n        .detail-info-form,\n        .description-form {\n            margin-top: 20px;\n            border-top: 1px solid #ccc; /* 상단 경계선 추가 */\n            padding-top: 20px; /* 상단 패딩 추가 */\n        }\n\n        button {\n            background-color: #4a9fff;\n            color: #fff;\n            padding: 10px 15px;\n            border: none;\n            border-radius: 5px;\n            cursor: pointer;\n            display: block;\n            margin: 0 auto; /* 가운데 정렬 */\n        }\n\n        .detail-info-form input {\n            margin-top: 5px;\n        }\n\n        .gray-text {\n            color: #888;\n        }\n\n        #property-image-preview {\n            max-width: 100%;\n            height: auto;\n            border-radius: 10px;\n            margin-top: 20px;\n        }\n    " }} />
    <div id="branding">매물 등록</div>
    
    <div id="property-form">
      <form encType="multipart/form-data">
      <ul>
        {serverData.map((message, idx) => (
        <li key={`${idx}-${message}`}>{message}</li>
        ))}
    </ul>


        <label htmlFor="property-name">매물명:</label>
        <input type="text" id="property-name" defaultValue required />

        <label htmlFor="property-location">위치:</label>
        <input type="text" id="property-location" defaultValue required />

        <label htmlFor="property-price">가격:</label>
        <input type="text" id="property-price" defaultValue required />

        <div id="property-details">
          <label htmlFor="property-image">사진 업로드:</label>
          <input type="file" id="property-image" name="property-image" accept="image/" onchange="previewImage()" />
          <img id="property-image-preview" src="#" alt="미리보기" />


          <div className="price-info-form">
            <h2>가격 정보</h2>
            <form>
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
            </form>
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
          <button type="button" onclick="redirectToSignup()">매물 등록</button>
        </div></form>
    </div>
        </div>
    );
};

export default ProductEntry;