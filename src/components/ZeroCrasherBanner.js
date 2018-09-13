import React, { Component } from 'react';

import './ZeroCrasherBanner.css';

class ZeroCrasherBanner extends Component {
  render() {
    return (
      <div className="crasher__banner">
        <h3>共通の項目</h3>
        <div className="crasher__banner-contents">
          <div className="crasher__banner-contents-item">アニメ好き</div>
          <div className="crasher__banner-contents-item">東京住み</div>
          <div className="crasher__banner-contents-item">クラシック好き</div>
        </div>
      </div>
    );
  }
}

export default ZeroCrasherBanner;
