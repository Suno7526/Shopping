import React from 'react';
import './Footer.css'; // 스타일 파일 import

const Footer = () => {
  return (
    <div>
      <div className="footer">
        {/* 페이지 최하단 가로선 */}
        <div className="line-container">
          <div className="horizontal-line"></div>
          {/* 중앙 수직선 */}
          <div className="vertical-divider"></div>
          <p className="copyright">
            <h4>☎︎ 문의 사항 @옷옷장</h4>
            <br></br>
            문의 사항이 있으시면 이메일을 보내주세요: example@example.com
            <br></br>
            백엔드 : 권순호 프론트엔드 : 윤혁
          </p>
          <p className="copyright2">
            <h5>▶︎문의 추가◀︎</h5>
            여기에 여러분의 웹사이트에 대한 간단한 설명을 추가할 수 있습니다
            <br></br>
            여기에 여러분의 웹사이트에 대한 간단한 설명을 추가할 수 있습니다
          </p>
          <div className="bottom-line"></div>
        </div>
      </div>
      <button className="HOME-btn">HOME</button>
      <button className="item-btn">ㅣ Item</button>
      <p className="copyright3">COPYRIGHT @ 2024 옷옷장.</p>
    </div>
  );
};

export default Footer;
