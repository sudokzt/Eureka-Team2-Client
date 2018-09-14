import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import './MatchSucceeded.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import heartIcon from '../images/heart.svg';

class MatchSucceeded extends Component {
  state = {
    user: null,
    matched: null
  };

  // Get user and matching partner profiles.
  componentDidMount() {
    if (window.USER_TOKEN !== null) {
      Promise.all([
        fetch(
          `https://si-2018-second-half-2.eure.jp/api/1.0/users/${
            window.USER_ID
          }?token=${window.USER_TOKEN}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json'
            }
          }
        ).then(response => response.json()),
        fetch(
          `https://si-2018-second-half-2.eure.jp/api/1.0/users/${
            this.props.match.params.id
          }?token=${window.USER_TOKEN}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json'
            }
          }
        ).then(response => response.json())
      ])
        .then(data => {
          this.setState({
            user: data[0],
            matched: data[1]
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    let redirect = null;
    // Redirect to LOGIN page if use token is not provided.
    if (window.USER_TOKEN === null) {
      redirect = <Redirect to="/login" />;
      console.log('Redirecting to login...');
    }

    let matchedUserImage = null;
    let userImage = null;
    let buttons = null;
    if (this.state.matched) {
      matchedUserImage = (
        <img
          src={this.state.matched.image_uri}
          alt={this.state.matched.nickname}
          className="match-result__img"
        />
      );

      userImage = (
        <img
          src={this.state.user.image_uri}
          alt={this.state.user.nickname}
          className="match-result__img"
        />
      );

      buttons = (
        <div className="btn-holder-vertical">
          <Link to={'/talk/' + this.state.matched.id}>
            <button className="text-btn single-line-btn">Talk</button>
          </Link>
          <Link to="/approached">
            <button className="text-btn single-line-btn minor-btn">
              Close
            </button>
          </Link>
        </div>
      );
    }

    return (
      <div>
        {redirect}
        <Header currentPage="Match Succeeded" />
        <div className="under-header">
          <h1>It's a Match!</h1>
          <div className="match-result">
            <div className="card match-result__img-holder">
              {matchedUserImage}
            </div>
            <img src={heartIcon} alt="heart" className="icon-btn" />
            <div className="card match-result__img-holder">{userImage}</div>
          </div>
          {buttons}
        </div>
        <Footer currentPage="Match Succeeded" />
      </div>
    );
  }
}

export default MatchSucceeded;
