import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';


const URL = "https://cors-anywhere.herokuapp.com/http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade";

function App() {  

  
  return (
    <div className="App">
      
<div>
<Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">다방</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">지도</Nav.Link>
            <Nav.Link href="#link">분양</Nav.Link>
            <Nav.Link href="#link">관심목록</Nav.Link>
            <Nav.Link href="#link">방내놓기</Nav.Link>
            <NavDropdown title="권순호" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  <br />
  <br />
  <div className="container text-center">
    <h1>방내놓기</h1>
    <br /><br /><br />
    <div>
      <ul className="custom-list">
        <li>·전/ 월세 매물만 등록할 수 있습니다. 매매는 다방허브에서만 등록하실 수 있습니다. 소유중인 공실 매매와 다중 매물 등록을 한번에 하고 싶다면 다방허브를 이용해주세요. <a href="#">다방허브 바로가기</a> </li>
        <li>·1개의 매물만 등록 가능하며, 다방에서 직거래로 표시됩니다.</li>
        <li>·주소를 다르게 입력할 경우 허위매물로 신고될 수 있으니 꼭 동일하게 입력 바랍니다.</li>
        <li>·등록한 매물은 30일 간 노출됩니다.</li>
      </ul>
    </div>
    <br /><br />
  </div>
  <div className="BigContainer">
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <h3 className="inform" style={{marginLeft: 150}}>매물정보</h3>
      <span style={{textAlign: 'right', marginRight: 270}}>*필수입력</span>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-2 left boxed">
          <div className="box">
            <p>매물유형</p>
          </div>
        </div>
        <div className="col-md-3 center boxed">
          <div className="center-box">
            <p>주택/빌라</p>
          </div>
          <div className="center-box">
            <p>오피스텔</p>
          </div>
          <div className="center-box">
            <p>아파트</p>
          </div>
        </div>
        <div className="col-md-6 right boxed">
          <div className="box">
            <p>오피스텔</p>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-2 left boxed">
          <div className="box" style={{height: 160}}>
            <p>매물주소</p>
          </div>
        </div>
        <div className="col-md-9 right boxed">
          <div className="box" style={{height: 160}}>
            <div>
              <p>주소검색</p>
              <input type="text" /><Button variant="primary">검색</Button>{' '}
            </div>
            <div>
              <p>나머지 주소 입력</p>
              <input type="text" />
            </div>                    
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-2 left boxed">
          <div className="box" style={{height: 100}}>
            <p>매물크기</p>
          </div>
        </div>
        <div className="col-md-9 right boxed">
          <div className="box" style={{height: 100}}>
            <div>
              <p>전용면적</p>
              <input type="text" placeholder="평수 입력" /> = <input type="text" placeholder="m2" />
            </div>             
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-2 left boxed">
          <div className="box" style={{height: 200}}>
            <p>방 정보</p>
          </div>
        </div>
        <div className="col-md-9 right boxed">
          <div className="box" style={{height: 200}}> 
            <div>
              <div>
                <p>방 수</p>
                <input type="text" placeholder="개" />
              </div>
              <div>
                <p>방 거실형태</p>
                <p><input type="radio" />오픈형 &nbsp; <input type="radio" />분리형</p>
              </div>
              <div>
                <p>방 특징(선택)</p>
                <p><input type="radio" />신축 &nbsp;<input type="radio" />큰길가 &nbsp;<input type="radio" />반려동물</p>
              </div>
            </div>             
          </div>
        </div>
      </div>
    </div>
  </div>





  <div className="BigContainer">
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <h3 className="inform" style={{marginLeft: 150}}>거래정보</h3>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-2 left boxed">
          <div className="box" style={{height: 50}}>
            <p>거래종류</p>
          </div>
        </div>  
        <div className="col-md-9 right boxed">
          <div className="box" style={{height: 50}}>
            <p><input type="radio" name id /> 전세 &nbsp;<input type="radio" name id /> 월세 &nbsp;</p> 
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-2 left boxed">
          <div className="box" style={{height: 100}}>
            <p>가격 정보</p>
          </div>
        </div>
        <div className="col-md-9 right boxed">
          <div className="box" style={{height: 100}}>
            <div>
              <p>전세가</p>
              <input type="text" placeholder="만원" />
            </div>                    
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-2 left boxed">
          <div className="box" style={{height: 160}}>
            <p>공용관리비</p>
          </div>
        </div>
        <div className="col-md-9 right boxed">
          <div className="box" style={{height: 160}}>
            <div>
              <div style={{marginBottom: 10}}>
                <p>관리비 여부</p>
                <p><input type="radio"/> 있음 &nbsp;<input type="radio" /> 없음 &nbsp;</p> 
              </div>
              <div>
                <p>관리비</p>
                <input type="text" placeholder="원" />
              </div>
            </div>             
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-2 left boxed">
          <div className="box" style={{height: 50}}>
            <p>입주 가능 일자</p>
          </div>
        </div>
        <div className="col-md-9 right boxed">
          <div className="box" style={{height: 50}}>
          <p><input type="radio"/> 즉시입주 &nbsp;<input type="radio" /> 일자선택 &nbsp; <input type="date" /> <input type="checkbox"/> 협의 가능 </p>
          </div>
        </div>
      </div>
    </div>
  </div>




  <div className="BigContainer">
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <h3 className="inform" style={{marginLeft: 150}}>추가정보</h3>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-2 left boxed">
          <div className="box" style={{height: 160}}>
            <p>층수</p>
          </div>
        </div>  
        <div className="col-md-9 right boxed">
          <div className="box" style={{height: 160}}>
            <div>
              <p>전체 층수</p>
              <input type="text" />
            </div>
            <div>
              <p>현재 층수</p>
              <input type="text" />
            </div>                    
          </div>  
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-2 left boxed">
          <div className="box" style={{height: 70}}>
            <p>욕실 수</p>
          </div>
        </div>
        <div className="col-md-9 right boxed">
          <div className="box" style={{height: 70}}>
            <div>
              <input type="text" placeholder="개" />
            </div>                    
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-2 left boxed">
          <div className="box" style={{height: 60}}>
            <p>주차 가능 여부</p>
          </div>
        </div>
        <div className="col-md-9 right boxed">
          <div className="box" style={{height: 60}}>
          <p><input type="radio"/> 불가능 &nbsp;<input type="radio" /> 가능 &nbsp; <input type="text" placeholder='총 가능 주차수'/></p>         
          </div>
        </div>
      </div>
    </div>
  </div>





  <div className="BigContainer">
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <h3 className="inform" style={{marginLeft: 150}}>사진추가</h3>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-2 left boxed">
          <div className="box" style={{height: 60}}>
            <p>일반사진</p>
          </div>
        </div>  
        <div className="col-md-9 right boxed">
          <div className="box" style={{height: 60}}>
          <Button variant="primary">사진등록</Button>{' '}
          </div>  
        </div>
      </div>
    </div>
  </div>





  <div className="BigContainer">

    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <h3 className="inform" style={{marginLeft: 150}}>상세설명</h3>
    </div>

    <div className="container">
      <div className="row">
        <div className="col-md-2 left boxed">
          <div className="box" style={{height: 60}}>
            <p>제목</p>
          </div>
        </div>  
        <div className="col-md-9 right boxed">
          <div className="box" style={{height: 60}}>
            <input type='text' style={{width: 700}}></input>
          </div>  
        </div>
      </div>
    </div>

    <div className="container">
      <div className="row">
        <div className="col-md-2 left boxed">
          <div className="box" style={{height: 250}}>
            <p>상세설명</p>
          </div>
        </div>  
        <div className="col-md-9 right boxed">
          <div className="box" style={{height: 250}}>
          <textarea>
            hello121212
          </textarea>
          </div>  
        </div>
      </div>
    </div>

  </div>


</div>

      
    </div>
  );
}

export default App;
