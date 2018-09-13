import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ZeroCrasherLoading.css';
import FailtoMatchModal from '../components/FailtoMatchModal';
import Header from '../components/Header';

class ZeroCrasherLoading extends Component {
  render() {
    return (
      <div>
        <Header currentPage="ランダムトーク" />
        <div className="loading-indicator">

          <div className="loader" />
          <h4>マッチング相手を探しています</h4>
          <div className="crasher-loading__button-holder">
            <button className="crasher-loading__cancle-button">
              <Link to="/zero-crasher/tutorial">キャンセル</Link>
            </button>
          </div>
        </div>
        <FailtoMatchModal />
      </div>
    );
  }
}

export default ZeroCrasherLoading;
