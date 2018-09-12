import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './ZeroCrasherTutorial.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

class ZeroCrasherTutorial extends Component {
  render() {
    return (
      <div>
        <Header currentPage="ランダムトーク" />
        <div className="under-header above-footer crasher-tutorial__guide-holder">
          <h1>Image Here</h1>
          <p>
            ランダムトークはあなたと相性度が50%以上の人を自動的にマッチングして3分間だけトークできる機能です
          </p>
        </div>
        <Link to="/zero-crasher/loading">
          <button className="crasher-tutorial__button">
            ランダムトークを始める
          </button>
        </Link>
        <Footer currentPage="search" />
      </div>
    );
  }
}

export default ZeroCrasherTutorial;
