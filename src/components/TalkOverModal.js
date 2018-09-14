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

  handleGoHome = () => {
    // Make a like (POST) request if "like" is clicked.
    if (this.state.isLiked) {
      fetch(
        `https://si-2018-second-half-2.eure.jp/api/1.0/likes/${
          this.props.userID
        }`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: window.USER_TOKEN
          })
        }
      ).catch(error => {
        console.log(error);
      });
    }
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
            {this.props.userName}
            さんともっと話してみたい！
            <br />
            と感じたらいいね！を押しましょう！
          </p>
          <div className="time-up-modal__button-contaier">
            {likeButton}
            <button
              className="talk-over-modal__home-button"
              onClick={this.handleGoHome}
            >
              <Link
                to="/zero-crasher/tutorial"
                className="talk-over-modal__home-link"
              >
                ホームに戻る
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default TalkOverModal;
