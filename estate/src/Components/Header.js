// Header.jsx
import React from 'react';
import './Header.css'; // 스타일 파일 import

const Header = () => {
  return (
    <div>
      <header>
        <nav id="gnb">
          <ul>
            <li>
              <a href="#outer">OUTER</a>
              <ul>
                <li>
                  <a href="#jacket">후드 집업</a>
                </li>
                <li>
                  <a href="#jumper">재킷</a>
                </li>
                <li>
                  <a href="#coat">무스탕/퍼</a>
                </li>
                <li>
                  <a href="#fur">카디건</a>
                </li>
                <li>
                  <a href="#fur">플리스/뽀글이</a>
                </li>
                <li>
                  <a href="#fur">재킷</a>
                </li>
                <li>
                  <a href="#fur">환절기 코트</a>
                </li>
                <li>
                  <a href="#fur">겨울 코트</a>
                </li>
                <li>
                  <a href="#fur">패딩/헤비 아우터</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#top">TOP</a>
              <ul>
                <li>
                  <a href="#sleeveless">후드 티셔츠</a>
                </li>
                <li>
                  <a href="#short-tee">니트/스웨터</a>
                </li>
                <li>
                  <a href="#long-tee">맨투맨/스웨트셔츠</a>
                </li>
                <li>
                  <a href="#shirts">티셔츠</a>
                </li>
                <li>
                  <a href="#crewneck">셔츠/블라우스</a>
                </li>
                <li>
                  <a href="#hoodie">스포츠 상의</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#bottom">BOTTOM</a>
              <ul>
                <li>
                  <a href="#short-pants">데님 팬츠</a>
                </li>
                <li>
                  <a href="#sweat-pants">코튼 팬츠</a>
                </li>
                <li>
                  <a href="#long-pants">슈트 팬츠/슬랙스</a>
                </li>
                <li>
                  <a href="#skirt">점프 슈트/오버올</a>
                </li>
                <li>
                  <a href="#skirt">스포츠 하의</a>
                </li>
                <li>
                  <a href="#skirt">기타 바지</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#headwear">HEADWEAR</a>
              <ul>
                <li>
                  <a href="#cap">캡/야구모자</a>
                </li>
                <li>
                  <a href="#bucket-hat">헌팅캡/베레모</a>
                </li>
                <li>
                  <a href="#snapback">페도라</a>
                </li>
                <li>
                  <a href="#beanie">버킷/사파리햇</a>
                </li>
                <li>
                  <a href="#ㅇ">비니</a>
                </li>
                <li>
                  <a href="#ㅇ">기타모자</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
      <hr />
    </div>
  );
};

export default Header;
