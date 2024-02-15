import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';


function App() {
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
  

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //     putSpringData();
  // }, []);
  
  // async function putSpringData() {
  //     try {
  //         const response = await axios.get("http://localhost:8000/test");
  //         console.log(response.data);
  //         setData(response.data);
  //     } catch (error) {
  //         console.error("데이터 가져오기 오류:", error);
  //         // 여기에서 사용자에게 표시할 에러 메시지를 추가할 수 있습니다.
  //     }
  // }

  {/* <div>
                {data ? data.map((datas)=>(
                    <div key={datas.no}>
                        <div>번호: {datas.no}</div>
                        <div>타입: {datas.type}</div>
                        <div>제목: {datas.title}</div>
                        <div>내용: {datas.content}</div>
                    </div>
                )) : ''}
            </div> */}
  

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
    </div></div>
//     <div className="App">
      
// <div>
// <Navbar expand="lg" className="bg-body-tertiary">
//       <Container>
//         <Navbar.Brand href="#home">다방</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto">
//             <Nav.Link href="#home">지도</Nav.Link>
//             <Nav.Link href="#link">분양</Nav.Link>
//             <Nav.Link href="#link">관심목록</Nav.Link>
//             <Nav.Link href="#link">방내놓기</Nav.Link>
//             <NavDropdown title="권순호" id="basic-nav-dropdown">
//               <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.2">
//                 Another action
//               </NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action/3.4">
//                 Separated link
//               </NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   <br />
//   <br />
//   <div className="container text-center">
//     <h1>방내놓기</h1>
//       <ul>
//         {serverData.map((message, idx) => (
//           <li key={`${idx}-${message}`}>{message}</li>
//         ))}
//       </ul>


//     <br /><br /><br />
//     <div>
//       <ul className="custom-list">
//         <li>·전/ 월세 매물만 등록할 수 있습니다. 매매는 다방허브에서만 등록하실 수 있습니다. 소유중인 공실 매매와 다중 매물 등록을 한번에 하고 싶다면 다방허브를 이용해주세요.</li>
//         <li>·1개의 매물만 등록 가능하며, 다방에서 직거래로 표시됩니다.</li>
//         <li>·주소를 다르게 입력할 경우 허위매물로 신고될 수 있으니 꼭 동일하게 입력 바랍니다.</li>
//         <li>·등록한 매물은 30일 간 노출됩니다.</li>
//       </ul>
//     </div>
//     <br /><br />
//   </div>
//   <div className="BigContainer">
//     <div style={{display: 'flex', justifyContent: 'space-between'}}>
//       <h3 className="inform" style={{marginLeft: 150}}>매물정보</h3>
//       <span style={{textAlign: 'right', marginRight: 270}}>*필수입력</span>
//     </div>
//     <div className="container">
//       <div className="row">
//         <div className="col-md-2 left boxed">
//           <div className="box">
//             <p>매물유형</p>
//           </div>
//         </div>
//         <div className="col-md-3 center boxed">
//           <div className="center-box">
//             <p>주택/빌라</p>
//           </div>
//           <div className="center-box">
//             <p>오피스텔</p>
//           </div>
//           <div className="center-box">
//             <p>아파트</p>
//           </div>
//         </div>
//         <div className="col-md-6 right boxed">
//           <div className="box">
//             <p>오피스텔</p>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="container">
//       <div className="row">
//         <div className="col-md-2 left boxed">
//           <div className="box" style={{height: 160}}>
//             <p>매물주소</p>
//           </div>
//         </div>
//         <div className="col-md-9 right boxed">
//           <div className="box" style={{height: 160}}>
//             <div>
//               <p>주소검색</p>
//               <input type="text" /><Button id="search" variant="primary" onClick={searchData}>검색</Button>{' '}
//             </div>
//             <div>
//               <p>나머지 주소 입력</p>
//               <input type="text" />
//             </div>                    
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="container">
//       <div className="row">
//         <div className="col-md-2 left boxed">
//           <div className="box" style={{height: 100}}>
//             <p>매물크기</p>
//           </div>
//         </div>
//         <div className="col-md-9 right boxed">
//           <div className="box" style={{height: 100}}>
//             <div>
//               <p>전용면적</p>
//               <input type="text" placeholder="평수 입력" /> = <input type="text" placeholder="m2" />
//             </div>             
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="container">
//       <div className="row">
//         <div className="col-md-2 left boxed">
//           <div className="box" style={{height: 200}}>
//             <p>방 정보</p>
//           </div>
//         </div>
//         <div className="col-md-9 right boxed">
//           <div className="box" style={{height: 200}}> 
//             <div>
//               <div>
//                 <p>방 수</p>
//                 <input type="text" placeholder="개" />
//               </div>
//               <div>
//                 <p>방 거실형태</p>
//                 <p><input type="radio" />오픈형 &nbsp; <input type="radio" />분리형</p>
//               </div>
//               <div>
//                 <p>방 특징(선택)</p>
//                 <p><input type="radio" />신축 &nbsp;<input type="radio" />큰길가 &nbsp;<input type="radio" />반려동물</p>
//               </div>
//             </div>             
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>





//   <div className="BigContainer">
//     <div style={{display: 'flex', justifyContent: 'space-between'}}>
//       <h3 className="inform" style={{marginLeft: 150}}>거래정보</h3>
//     </div>
//     <div className="container">
//       <div className="row">
//         <div className="col-md-2 left boxed">
//           <div className="box" style={{height: 50}}>
//             <p>거래종류</p>
//           </div>
//         </div>  
//         <div className="col-md-9 right boxed">
//           <div className="box" style={{height: 50}}>
//             <p><input type="radio" name id /> 전세 &nbsp;<input type="radio" name id /> 월세 &nbsp;</p> 
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="container">
//       <div className="row">
//         <div className="col-md-2 left boxed">
//           <div className="box" style={{height: 100}}>
//             <p>가격 정보</p>
//           </div>
//         </div>
//         <div className="col-md-9 right boxed">
//           <div className="box" style={{height: 100}}>
//             <div>
//               <p>전세가</p>
//               <input type="text" placeholder="만원" />
//             </div>                    
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="container">
//       <div className="row">
//         <div className="col-md-2 left boxed">
//           <div className="box" style={{height: 160}}>
//             <p>공용관리비</p>
//           </div>
//         </div>
//         <div className="col-md-9 right boxed">
//           <div className="box" style={{height: 160}}>
//             <div>
//               <div style={{marginBottom: 10}}>
//                 <p>관리비 여부</p>
//                 <p><input type="radio"/> 있음 &nbsp;<input type="radio" /> 없음 &nbsp;</p> 
//               </div>
//               <div>
//                 <p>관리비</p>
//                 <input type="text" placeholder="원" />
//               </div>
//             </div>             
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="container">
//       <div className="row">
//         <div className="col-md-2 left boxed">
//           <div className="box" style={{height: 50}}>
//             <p>입주 가능 일자</p>
//           </div>
//         </div>
//         <div className="col-md-9 right boxed">
//           <div className="box" style={{height: 50}}>
//           <p><input type="radio"/> 즉시입주 &nbsp;<input type="radio" /> 일자선택 &nbsp; <input type="date" /> <input type="checkbox"/> 협의 가능 </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>




//   <div className="BigContainer">
//     <div style={{display: 'flex', justifyContent: 'space-between'}}>
//       <h3 className="inform" style={{marginLeft: 150}}>추가정보</h3>
//     </div>
//     <div className="container">
//       <div className="row">
//         <div className="col-md-2 left boxed">
//           <div className="box" style={{height: 160}}>
//             <p>층수</p>
//           </div>
//         </div>  
//         <div className="col-md-9 right boxed">
//           <div className="box" style={{height: 160}}>
//             <div>
//               <p>전체 층수</p>
//               <input type="text" />
//             </div>
//             <div>
//               <p>현재 층수</p>
//               <input type="text" />
//             </div>                    
//           </div>  
//         </div>
//       </div>
//     </div>
//     <div className="container">
//       <div className="row">
//         <div className="col-md-2 left boxed">
//           <div className="box" style={{height: 70}}>
//             <p>욕실 수</p>
//           </div>
//         </div>
//         <div className="col-md-9 right boxed">
//           <div className="box" style={{height: 70}}>
//             <div>
//               <input type="text" placeholder="개" />
//             </div>                    
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="container">
//       <div className="row">
//         <div className="col-md-2 left boxed">
//           <div className="box" style={{height: 60}}>
//             <p>주차 가능 여부</p>
//           </div>
//         </div>
//         <div className="col-md-9 right boxed">
//           <div className="box" style={{height: 60}}>
//           <p><input type="radio"/> 불가능 &nbsp;<input type="radio" /> 가능 &nbsp; <input type="text" placeholder='총 가능 주차수'/></p>         
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>





//   <div className="BigContainer">
//     <div style={{display: 'flex', justifyContent: 'space-between'}}>
//       <h3 className="inform" style={{marginLeft: 150}}>사진추가</h3>
//     </div>
//     <div className="container">
//       <div className="row">
//         <div className="col-md-2 left boxed">
//           <div className="box" style={{height: 60}}>
//             <p>일반사진</p>
//           </div>
//         </div>  
//         <div className="col-md-9 right boxed">
//           <div className="box" style={{height: 60}}>
//           <Button variant="primary">사진등록</Button>{' '}
//           </div>  
//         </div>
//       </div>
//     </div>
//   </div>





//   <div className="BigContainer">

//     <div style={{display: 'flex', justifyContent: 'space-between'}}>
//       <h3 className="inform" style={{marginLeft: 150}}>상세설명</h3>
//     </div>

//     <div className="container">
//       <div className="row">
//         <div className="col-md-2 left boxed">
//           <div className="box" style={{height: 60}}>
//             <p>제목</p>
//           </div>
//         </div>  
//         <div className="col-md-9 right boxed">
//           <div className="box" style={{height: 60}}>
//             <input type='text' style={{width: 700}}></input>
//           </div>  
//         </div>
//       </div>
//     </div>

//     <div className="container">
//       <div className="row">
//         <div className="col-md-2 left boxed">
//           <div className="box" style={{height: 250}}>
//             <p>상세설명</p>
//           </div>
//         </div>  
//         <div className="col-md-9 right boxed">
//           <div className="box" style={{height: 250}}>
//           <textarea>
//             hello121212
//           </textarea>
//           </div>  
//         </div>
//       </div>
//     </div>

//   </div>


// </div>

      
//     </div>
  );
}

export default App;
