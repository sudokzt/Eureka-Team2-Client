import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import './Approached.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ApproachedCard from '../components/ApproachedCard/ApproachedCard';
import likeBtn from '../images/like-btn-selected.svg';
import dislikeBtn from '../images/dislike-btn.svg';

class Approached extends Component {
  state = {
    approached: null
  };

  // Get approached user profiles.
  componentDidMount() {
    if (window.USER_TOKEN !== null) {
      fetch(
        `https://si-2018-second-half-2.eure.jp/api/1.0/likes?token=${
          window.USER_TOKEN
        }&limit=1000&offset=0`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          }
        }
      )
        .then(response => response.json())
        .then(data => {
          this.setState({ approached: data });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  // Make a like (POST) request.
  handleLike = () => {
    fetch(
      `https://si-2018-second-half-2.eure.jp/api/1.0/likes/${
        this.state.approached[0].id
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
  };

  // Skip to the next approached user.
  handleSkip = () => {
    const currentApproched = this.state.approached;

    // Skip the first user in the array.
    currentApproched.shift();

    // Use setState() to force an re-render.
    this.setState({ approached: currentApproched });
  };

  render() {
    let redirect = null;
    // Redirect to LOGIN page if user token is not provided.
    if (window.USER_TOKEN === null) {
      redirect = <Redirect to="/login" />;
      console.log('Redirecting to Login...');
    }

    let approachedCard = <p>Loading...</p>;
    let btns = null;
    if (this.state.approached) {
      if (this.state.approached.length > 0) {
        // Always show the first partner in the array.
        approachedCard = (
          <ApproachedCard approachedUser={this.state.approached[0]} />
        );

        btns = (
          <div className="btn-holder-horizontal">
            <button className="approached__btn" onClick={this.handleSkip}>
              <img src={dislikeBtn} alt="dislike" className="icon-btn" />
            </button>
            <button className="approached__btn" onClick={this.handleLike}>
              <Link to={'/match-succeeded/' + this.state.approached[0].id}>
                <img src={likeBtn} alt="like" className="icon-btn" />
              </Link>
            </button>
          </div>
        );
      } else {
        approachedCard = <p>Your approached list is empty.</p>;
      }
    }

    return (
      <div>
        {redirect}
        <Header currentPage="Approached" />
        <div className="under-header above-footer">
          {approachedCard}
          {btns}
        </div>
        <Footer currentPage="approached" />
      </div>
    );
  }
}

export default Approached;
