import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import "./PartnerProfile.css";
import Header from "../components/Header";
import calculateAge from "../functions/calculateAge";

class PartnerProfile extends Component {
  state = {
    partner: null,
    isLiked: false
  };

  // Get partner profile.
  componentDidMount() {
    if (window.USER_TOKEN !== null) {
      fetch(
        `https://si-2018-000.eure.jp/api/1.0/users/${
          this.props.match.params.id
        }?token=${window.USER_TOKEN}`
      )
        .then(response => response.json())
        .then(data => {
          this.setState({ partner: data });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  handleLike = () => {
    // Only send POST request if the button has not been clicked.
    if (!this.state.isLiked) {
      fetch(
        `https://si-2018-006.eure.jp/api/1.0/likes/${this.state.partner.id}`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token: window.USER_TOKEN
          })
        }
      ).catch(error => {
        console.log(error);
      });

      this.setState({ isLiked: true });
    }
  };

  render() {
    let redirect = null;
    // Redirect to LOGIN page if use token is not provided.
    if (window.USER_TOKEN === null) {
      redirect = <Redirect to="/login" />;
      console.log("Redirecting to Login...");
    }

    let likeBtn = null;
    let partnerProfile = null;
    if (this.state.partner) {
      if (this.state.isLiked) {
        likeBtn = (
          <button
            onClick={this.handleLike}
            className="text-btn single-line-btn fixed-btn minor-btn"
          >
            Liked
          </button>
        );
      } else {
        likeBtn = (
          <button
            onClick={this.handleLike}
            className="text-btn single-line-btn fixed-btn"
          >
            Like
          </button>
        );
      }

      partnerProfile = (
        <div className="under-header">
          <div className="card partner-profile__card">
            <div className="partner-profile__brief">
              <img
                src={this.state.partner.image_uri}
                alt={this.state.partner.nickname}
                className="img-full"
              />
              <h3>{this.state.partner.nickname}</h3>
              <p>{calculateAge(this.state.partner.birthday)}歳</p>
              <p>
                {this.state.partner.residence_state}
                在住
              </p>
            </div>
            <hr />
            <div className="partner-profile__intro">
              <p>{this.state.partner.introduction}</p>
            </div>
            {likeBtn}
          </div>
        </div>
      );
    }

    return (
      <div>
        {redirect}
        <Header currentPage="Partner Profile" />
        {partnerProfile}
      </div>
    );
  }
}

export default PartnerProfile;
