import React, { Component } from 'react';

import './ZeroCrasherLoading.css';
import FailtoMatchModal from '../components/FailtoMatchModal';

class ZeroCrasherLoading extends Component {
  render() {
    return (
      <div>
        <div className="loading-indicator">
          <h3>マッチング中...</h3>
          <div className="loader" />
        </div>
        <FailtoMatchModal />
      </div>
    );
  }
}

export default ZeroCrasherLoading;
