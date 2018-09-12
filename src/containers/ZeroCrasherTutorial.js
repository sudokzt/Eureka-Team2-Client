import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ZeroCrasherTutorial extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>Image Here</h1>
          <h2>相性トーク</h2>
          <p>
            相性トークは同じ趣味など共通の話題を持つ人とマッチング前に少し話せる機能です。
          </p>
        </div>
        <Link to="/zero-crasher/loading">
          <button className="text-btn single-line-btn">始める</button>
        </Link>
      </div>
    );
  }
}

export default ZeroCrasherTutorial;
