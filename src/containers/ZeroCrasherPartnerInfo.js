import React, { Component } from 'react';

import './ZeroCrasherPartnerInfo.css';
import Header from '../components/Header';
import heartIcon from '../images/heart.svg';
import userIcon from '../images/zero-crasher-user.svg';

class ZeroCrasherPartnerInfo extends Component {
  render() {
    return (
      <div className="under-header">
        <Header currentPage="お相手の情報" />
        <div className="crasher-info__holder">
          <div className="crasher-info__guide-holder">
            <h2>
              Nipperさんと
              <br />
              マッチしました！
            </h2>
          </div>
          <div>
            <div className="crasher-info__affinity-holder">
              <img src={heartIcon} alt="Heart Icon" className="inline-icon" />
              <span> 相性80%</span>
            </div>
            <div className="crasher-info__common-points-holder">
              <div className="crasher-info__common-points-guide">
                <img
                  src={userIcon}
                  alt="User Icon"
                  className="crasher-info__common-points-guide-icon"
                />
                <span>Nipperさんとの共通点は<br />こちらです！</span>
              </div>
              <div className="crasher-info__common-points-item">
                <span className="crasher-info__common-points-item-emphasize">
                  東京
                </span>
                住み
              </div>
              <div className="crasher-info__common-points-item">
                <span className="crasher-info__common-points-item-emphasize">
                  クラシック
                </span>
                好き
              </div>
              <div className="crasher-info__common-points-item">
                <span className="crasher-info__common-points-item-emphasize">
                  アニメ
                </span>
                好き
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ZeroCrasherPartnerInfo;
