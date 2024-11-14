import React, { useState } from 'react';
import './QDelivery.css';

const QDelivery = () => {
  const [showDetails1, setShowDetails1] = useState(false);
  const [showDetails2, setShowDetails2] = useState(false);
  const [showDetails3, setShowDetails3] = useState(false);
  const [showDetails4, setShowDetails4] = useState(false);
  const [showDetails5, setShowDetails5] = useState(false);

  const toggleDetails1 = () => {
    setShowDetails1(!showDetails1);
  };

  const toggleDetails2 = () => {
    setShowDetails2(!showDetails2);
  };

  const toggleDetails3 = () => {
    setShowDetails3(!showDetails3);
  };

  const toggleDetails4 = () => {
    setShowDetails4(!showDetails4);
  };

  const toggleDetails5 = () => {
    setShowDetails5(!showDetails5);
  };

  return (
    <div>
      <div className="maintitle-wrapper">
        <h2 className="Bestfaq-maintitle">자주 묻는 </h2>
        <h2 className="WithdrawETC-maintitle">배송</h2>
        <h2 className="WithdrawETC-maintitle2">질문</h2>
      </div>

      <div className="QDelivery-container">
        <div className="QDelivery-Q1-container">
          <div className="QDelivery-Q1" onClick={toggleDetails1}>
            배송 조회는 어떻게 하나요?
          </div>
          {showDetails1 && (
            <div className="QDelivery-Q1detail">
              <div className="QDelivery-Q1detailP">
                <strong>
                  배송조회 메뉴에서 배송진행 상황을 확인할 수 있습니다.
                </strong>
                <br />■ 배송조회 경로 <br />
                마이페이지 배송 중/픽업 대기 배송조회
                <br />
                <br />
                ※ 출고 후 송장 조회까지는 평일 기준 1일 소요됩니다. <br />※ 출고
                처리 중 (상품 포장 및 확인하는) 단계부터는 주소(옵션) 변경 및
                취소가 가능하지 않습니다.
              </div>
            </div>
          )}
        </div>

        <div className="QDelivery-Q2-container">
          <div className="QDelivery-Q2" onClick={toggleDetails2}>
            일반 배송 상품은 언제 배송 되나요?
          </div>
          {showDetails2 && (
            <div className="QDelivery-Q2detail">
              <div className="QDelivery-Q2detailP">
                <strong>
                  일반배송은 브랜드마다 일정이 다르고 평일 기준으로 출고 됩니다.
                  <br />
                  출고 일정은 상품의 상세페이지 출고 정보에서 확인 가능합니다.{' '}
                </strong>
                <br />
                <br />
                일반배송은 브랜드마다 일정이 다르고 평일 기준으로 출고 됩니다.{' '}
                <br />
                출고 일정은 상품의 상세페이지 출고 정보에서 확인 가능합니다.
                <br />
                <br />
                ※ 평일 기준 출고로 연휴 및 공휴일은 배송일에서 제외됩니다.
                <br />
                ※ 무신사스토어는 전 상품 100% 무료 배송입니다. <br />※ 배송 지연
                상품의 경우 상품명에 지연으로 아이콘이 표시됩니다. <br />
                ※ 출고 지연 발생 시에는 알림톡 또는 문자를 통해 안내해 드립니다.
                <br />
                ※ 주문 시 배송 메모에 배송 희망 일자를 작성하셔도 해당일에 지정
                배송은 어렵습니다.
                <br />
              </div>
            </div>
          )}
        </div>
        <div className="QDelivery-Q3-container">
          <div className="QDelivery-Q3" onClick={toggleDetails3}>
            출고가 지연된다는 알림톡을 받았어요.
          </div>
          {showDetails3 && (
            <div className="QDelivery-Q3detail">
              <div className="QDelivery-Q3detailP">
                <strong>
                  주문한 상품의 출고가 지연되어 배송이 늦어질 경우 알림톡으로
                  변경된 출고 일자를 안내드립니다.{' '}
                </strong>
                <br></br>변경된 출고 예정일, 출고 지연 사유 확인 후
                [출고예정일까지 기다릴게요] 또는 [출고예정일까지 기다릴 수
                없어요]버튼을 선택해 주세요. <br></br>
                <br></br> [출고예정일까지 기다릴게요] 선택 시 변경된 출고
                예정일에 상품이 발송됩니다. <br></br>[출고예정일까지 기다릴 수
                없어요] 선택 시 상품은 자동 환불됩니다. <br></br>※ 알림톡을
                받으신 후 동의 기한 내 선택하지 않을 경우 자동으로 출고 지연/
                상품 수령에 동의됩니다. <br></br>※ 출고 예정일 이전, 출고 일정
                변경 관련 알림톡 수신 후 동의/거절을 선택한 경우 보상 적립금
                지원 대상에서 제외됩니다.
              </div>
            </div>
          )}
        </div>
        <div className="QDelivery-Q4-container">
          <div className="QDelivery-Q4" onClick={toggleDetails4}>
            택배사 연락처를 알고 싶어요.
          </div>
          {showDetails4 && (
            <div className="QDelivery-Q4detail">
              <div className="QDelivery-Q4detailP">
                택배사 고객센터 번호는 아래를 확인해 주세요. <br></br>{' '}
                배송조회는 해당 택배사 홈페이지 또는 앱 에서도 확인 가능 합니다.
                <br></br>
                <br></br>
                CJ대한통운 : 1588-1255 <br></br>롯데 : 1588-2121 <br></br>로젠 :
                1588-9988 <br></br>우체국 일반 & EMS : 1588-1300 <br></br>한진 :
                1588-0011 <br></br>CVSnet 편의점 : 1577-1287<br></br>
                DHL : 1588-1751 <br></br>GTX로지스 : 1588-1756 <br></br>TNT
                Express : 1588-0588<br></br>
                경동 : 080-873-2178 <br></br>대신 : 043-255-3211
              </div>
            </div>
          )}
        </div>
        <div className="QDelivery-Q5-container">
          <div className="QDelivery-Q5" onClick={toggleDetails5}>
            배송 완료 상품을 받지 못했어요.
          </div>
          {showDetails5 && (
            <div className="QDelivery-Q5detail">
              <div className="QDelivery-Q5detailP">
                택배사 배송 완료 이후 상품을 받지 못했거나 분실되었다면 아래
                내용을 확인하여 1:1문의로 남겨주세요.<br></br>
                <br></br> ■확인 요청 사항 <br></br>
                <br></br>1. 상품이 배송 완료 상태인지 확인해 주세요. <br></br>2.
                상품 주문 시 입력한 수령지 정보를 확인해 주세요. <br></br>3.
                위탁 장소(소화전, 경비실 등)에 택배가 보관되어 있는지 확인해
                주세요.<br></br>4. 택배사로부터 배송 완료 문자 또는 전화를
                받았는지 확인해 주세요. <br></br>5. 상품이 분실로 확인될 경우
                재배송 또는 환불 중 희망하는 처리 방법을 알려주세요. <br></br>
                <br></br>※ 택배사 확인은 영업일 기준 1~2일 소요될 수 있습니다.{' '}
                <br></br>※ 확인 과정에서 상품 수령할 경우 고객센터 또는
                1:1문의로 전달 바랍니다.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QDelivery;
