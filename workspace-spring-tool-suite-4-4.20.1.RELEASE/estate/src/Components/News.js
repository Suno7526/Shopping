import React from 'react';
import { Link } from 'react-router-dom'; // Link import 추가
import './InquiryAside.css'; // 외부 스타일 시트 불러오기

const News = () => {
  return (
    <div>
      <h1 className="FASHION-NEWS">FASHION NEWS</h1>
      <p className="FASHION-NEWS-sub-text" id="fashion-news-content"></p>
      <div className="snip-div">
        <figure className="snip1249">
          <div className="image">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample90.jpg"
              alt="sample90"
            />
            <i className="ion-ios-basketball-outline"></i>
          </div>
          <figcaption>
            <h3>Sports Wear</h3>
            <p>
              How many boards would the Mongols hoard if the Mongol hordes got
              bored?
            </p>
            <div className="price">
              <s>$19.00</s>$14.00
            </div>
          </figcaption>
        </figure>
        <figure className="snip1249">
          <div className="image">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample85.jpg"
              alt="sample85"
            />
            <i className="ion-ios-star-outline"></i>
          </div>
          <figcaption>
            <h3>Time Piece</h3>
            <p>
              I'm killing time while I wait for life to shower me with meaning
              and happiness.
            </p>
            <div className="price">
              <s>$99.00</s>$84.00
            </div>
          </figcaption>
        </figure>
        <figure className="snip1249">
          <div className="image">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample71.jpg"
              alt="sample71"
            />
            <i className="ion-ios-camera-outline"></i>
          </div>
          <figcaption>
            <h3>Winter Hat</h3>
            <p>
              Weekends don't count unless spent doing something completely
              pointless.
            </p>
            <div className="price">
              <s>$98.00</s>$74.00
            </div>
          </figcaption>
        </figure>
        <figure className="snip1249">
          <div className="image">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample85.jpg"
              alt="sample85"
            />
            <i className="ion-ios-star-outline"></i>
          </div>
          <figcaption>
            <h3>Time Piece</h3>
            <p>
              I'm killing time while I wait for life to shower me with meaning
              and happiness.
            </p>
            <div className="price">
              <s>$99.00</s>$84.00
            </div>
          </figcaption>
        </figure>
        <figure className="snip1249">
          <div className="image">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample85.jpg"
              alt="sample85"
            />
            <i className="ion-ios-star-outline"></i>
          </div>
          <figcaption>
            <h3>Time Piece</h3>
            <p>
              I'm killing time while I wait for life to shower me with meaning
              and happiness.
            </p>
            <div className="price">
              <s>$99.00</s>$84.00
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

export default News;
