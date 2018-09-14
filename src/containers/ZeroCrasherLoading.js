import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './ZeroCrasherLoading.css';
import FailtoMatchModal from '../components/FailtoMatchModal';
import Header from '../components/Header';
import ZeroCrasherPartnerInfo from '../containers/ZeroCrasherPartnerInfo';

class ZeroCrasherLoading extends Component {
  state = {
    user: null,
    timeLimit: 30,
    matchFlag: false,
    canceledFlag: false,
    data: undefined
  };

  componentDidMount = () => {
    this.handlePostMatching();
    this.countup();
  };

  // 30second timer
  countup = () => {
    console.log(this.state.timeLimit);
    if (this.state.canceledFlag === true) {
      this.props.history.push('/zero-crasher/tutorial');
      return;
    }
    if (this.state.timeLimit <= 0 || this.state.matchFlag === true) return;
    if (this.state.timeLimit % 5 === 0 && this.state.timeLimit !== 30) {
      this.handleGetMatching();
    }
    setTimeout(this.countup, 1000);
    this.setState({
      timeLimit: this.state.timeLimit - 1
    });
  };

  // 画面ロード時に相性トーク検索リクエストを行う
  handlePostMatching = () => {
    fetch(
      `https://si-2018-second-half-2.eure.jp/api/1.0/tempmatch?token=USERTOKEN1500`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        // ボタン押した直後にマッチングをしたら
        if (data.user_id) {
          //　返ってきたpartne_idが自分と同じだったら返ってきたオブジェクトのpartner_idとuser_idを入れ替える
          if (data.partner_id === 1500) {
            let tmp_id = data.partner_id;
            data.partner_id = data.user_id;
            data.user_id = tmp_id;
          }
          // this.setState({ matchFlag: true });
        }
        this.setState({ data: data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // マッチングしたかどうかを確かめる
  handleGetMatching = () => {
    fetch(
      `https://si-2018-second-half-2.eure.jp/api/1.0/tempmatch?token=USERTOKEN1500`
    )
      .then(response => response.json())
      .then(data => {
        // 5秒ごとにAPIを叩いてマッチングしたら
        console.log(data);
        if (data.user_id) {
          //　返ってきたpartne_idが自分と同じだったら返ってきたオブジェクトのpartner_idとuser_idを入れ替える
          if (data.partner_id === 1500) {
            let tmp_id = data.partner_id;
            data.partner_id = data.user_id;
            data.user_id = tmp_id;
          }
          this.setState({ matchFlag: true });
          this.props.history.push(
            `/zero-crasher/partner-info/${data.partner_id}`
          );
        }
        this.setState({ data: data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // ローディング中にキャンセル
  handleCancel = () => {
    this.setState({ canceledFlag: true });
  };

  render() {
    if (this.state.timeLimit <= 0) {
      return (
        <div>
          <Header currentPage="ランダムトーク" />
          <div className="loading-indicator">
            <div className="loader" />
            <h4>マッチング相手を探しています</h4>
            <div className="crasher-loading__button-holder">
              <FailtoMatchModal />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Header currentPage="ランダムトーク" />
          <div className="loading-indicator">
            <div className="loader" />
            <h4>マッチング相手を探しています</h4>
            <div className="crasher-loading__button-holder">
              <button
                className="crasher-loading__cancle-button"
                onClick={this.handleCancel}
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(ZeroCrasherLoading);
