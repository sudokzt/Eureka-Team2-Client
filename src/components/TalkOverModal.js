import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './TalkOverModal.css';

class TalkOverModal extends Component {
  state = {
    isLiked: false
  };

  // 「いいね」をクリックすればスタイルを変える
  handleLike = () => {
    this.setState({ isLiked: true });
  };

  render() {
    let likeButton = null;
    if (!this.state.isLiked) {
      likeButton = (
        <button className="text-btn single-line-btn" onClick={this.handleLike}>
          いいね！
        </button>
      );
    } else {
      likeButton = (
        <button
          className="text-btn single-line-btn minor-btn"
          onClick={this.handleLike}
        >
          いいねしました
        </button>
      );
    }

    return (
      <div className="modal" id="talkOverModal" style={{ display: 'block' }}>
        <div className="modal-content-fullscreen fail-to-match__modal">
          <h2>終了しました</h2>
          <p>相手が気になった場合は「いいね」を押してみましょう！</p>
          {likeButton}
          <Link to="/search">
            <button className="text-btn single-line-btn minor-btn">
              サーチ画面に戻る
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default TalkOverModal;
