import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Footer from "../components/Footer";
import MatchingCards from "../components/MatchingCards/MatchingCards";
import Header from "../components/Header";
import LoadMore from "../components/LoadMore";

// Set data fetching limit.
const LIMIT = 10;

class Matching extends Component {
  state = {
    matching: null,
    loadCounter: 0,
    loadedAll: false
  };

  // Get matching users.
  componentDidMount() {
    if (window.USER_TOKEN !== null) {
      fetch(
        `https://si-2018-006.eure.jp/api/1.0/matches?token=${
          window.USER_TOKEN
        }&limit=${LIMIT}&offset=0`,
        {
          method: "GET",
          headers: {
            Accept: "application/json"
          }
        }
      )
        .then(response => response.json())
        .then(data => {
          if (data.length < LIMIT) {
            this.setState({
              matching: data,
              loadedAll: true
            });
          } else {
            this.setState({
              matching: data,
              loadedAll: false
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  // Get more data only when there are new data to fetch.
  handleLoadMore = () => {
    if (!this.state.loadedAll) {
      const offset = (this.state.loadCounter + 1) * LIMIT;

      fetch(
        `https://si-2018-006.eure.jp/api/1.0/matches/?token=${
          window.USER_TOKEN
        }&limit=${LIMIT}&offset=${offset}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json"
          }
        }
      )
        .then(response => response.json())
        .then(data => {
          // Update state only when there are new data to fetch.
          if (data.length > 0) {
            const users = this.state.matching;
            const loadedUsers = data;

            users.push(...loadedUsers);

            this.setState({
              matching: users,
              loadCounter: this.state.loadCounter + 1
            });
          } else {
            this.setState({ loadedAll: true });
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log("No more data to load.");
    }
  };

  render() {
    let redirect = null;
    // Redirect to LOGIN page if use token is not provided.
    if (window.USER_TOKEN === null) {
      redirect = <Redirect to="/login" />;
      console.log("Redirecting to Login...");
    }

    let matching = <p>Loading...</p>;
    if (this.state.matching) {
      if (this.state.matching.length > 0) {
        matching = <MatchingCards matchingUsers={this.state.matching} />;
      } else {
        matching = <p>Your matching list is empty.</p>;
      }
    }

    return (
      <div>
        {redirect}
        <Header currentPage="Matching" />
        <div className="under-header above-footer">
          {matching}
          <LoadMore
            onLoadMore={this.handleLoadMore}
            fetchStatus={this.state.matching !== null && !this.state.loadedAll}
          />
        </div>
        <Footer currentPage="matching" />
      </div>
    );
  }
}

export default Matching;
