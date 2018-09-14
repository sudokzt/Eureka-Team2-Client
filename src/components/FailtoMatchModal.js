import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './FailtoMatchModal.css';

class FailtoMatchModal extends Component {
  render() {
    return (
      <div className="modal" id="failtoMatchModal" style={{ display: 'block' }}>
        <div className="modal-content-fullscreen fail-to-match__modal">
          <h2>マッチングできませんでした。</h2>
          <button className="text-btn single-line-btn">再ロードする</button>
          <Link to="/search">
            <button className="text-btn single-line-btn">
              サーチ画面に戻る
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default FailtoMatchModal;
