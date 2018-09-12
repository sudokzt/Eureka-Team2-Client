import React, { Component } from 'react';

import './ZeroCrasherPartnerInfo.css';
import Header from '../components/Header';
import heartIcon from '../images/heart.svg';

class ZeroCrasherPartnerInfo extends Component {
  render() {
    return (
      <div className="under-header">
        <Header currentPage="お相手の情報" />
        <div>
          <div className="crasher-info__icon-holder">
            <h1>Nipper</h1>
          </div>
          <div className="crasher-info__guide-holder">
            <p>
              Nipperさんとマッチしました！
              <br />
              Nipperさんとの共通点はこちらです！
            </p>
          </div>
          <div>
            <div className="crasher-info__affinity-holder">
              <img src={heartIcon} alt="heart" className="inline-icon" />
              <span> 相性80%</span>
            </div>
            <div className="crasher-info__common-points-holder">
              <div className="crasher-info__common-points-item">東京住み</div>
              <div className="crasher-info__common-points-item">
                クラシック好き
              </div>
              <div className="crasher-info__common-points-item">アニメ好き</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ZeroCrasherPartnerInfo;
