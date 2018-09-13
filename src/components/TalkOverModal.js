import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './TalkOverModal.css';
import likeIcon from '../images/like-btn-white.svg';

class TalkOverModal extends Component {
  state = {
    isLiked: false
  };

  // 「いいね」をクリックすればスタイルを変える
  handleLike = () => {
    this.setState({ isLiked: this.state.isLiked ? false : true });
  };

  render() {
    let likeButton = null;
    if (!this.state.isLiked) {
      likeButton = (
        <button
          className="talk-over-modal__like-button"
          onClick={this.handleLike}
        >
          <img
            src={likeIcon}
            alt="Like Icon"
            className="inline-icon talk-ver-modal__inline-icon"
          />
          <span>いいね！</span>
        </button>
      );
    } else {
      likeButton = (
        <button
          className="talk-over-modal__like-button talk-over-modal__liked-button"
          onClick={this.handleLike}
        >
          <img
            src={likeIcon}
            alt="Like Icon"
            className="inline-icon talk-ver-modal__inline-icon"
          />
          <span>いいね！しました</span>
        </button>
      );
    }

    return (
      <div className="modal" id="talkOverModal" style={{ display: 'block' }}>
        <div className="modal-content-fullscreen fail-to-match__modal">
          <h3>タイムアップ</h3>
          <h1 className="talk-over-modal__counter">0:00</h1>
          <p>
            Nipperさんともっと話してみたい！
            <br />
            と感じたらいいね！を押しましょう！
          </p>
          <div className="time-up-modal__button-contaier">
            {likeButton}
            <Link
              to="/zero-crasher/tutorial"
              className="talk-over-modal__home-link"
            >
              ホームに戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default TalkOverModal;
