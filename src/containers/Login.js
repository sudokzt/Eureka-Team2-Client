import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Header from "../components/Header";
import "./Login.css";

class Login extends Component {
  state = {
    loginID: "",
    submitted: false
  };

  // Reset the submitted flag.
  componentDidMount() {
    if (this.state.submitted) {
      this.setState({ submitted: false });
    }
  }

  handleInputChange = event => {
    this.setState({ loginID: event.target.value });
  };

  handleSubmit = event => {
    // Stop the form from refreshing the page on submit.
    event.preventDefault();

    const integerID = Number(this.state.loginID);

    // Set user ID only when the input is an integer from 1 to 2000.
    // And then get user token using ID.
    if (integerID > 0 && integerID < 2001) {
      window.USER_ID = this.state.loginID;
      
      fetch(`https://si-2018-006.eure.jp/api/1.0/tokens/${window.USER_ID}`, {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          window.USER_TOKEN = data.token;
          console.debug("User ID:", window.USER_ID);
          console.debug("User token:", window.USER_TOKEN);

          // Set the submitted flag to trigger redirecting
          // and clean the input box.
          this.setState({
            submitted: true,
            loginID: ""
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert("Please use an integer from 1 to 2000 as user ID!");
      this.setState({ loginID: "" });
    }
  };

  render() {
    let redirect = null;
    // Redirect to SEARCH page if user ID is successfully submitted
    // and user token is received.
    if (this.state.submitted && window.USER_TOKEN !== null) {
      redirect = <Redirect to="/search" />;
    }

    return (
      <div>
        {redirect}
        <Header currentPage="Login" />
        <div className="card login-card">
          <form onSubmit={this.handleSubmit}>
            <h3 className="login__label">User ID:</h3>
            <input
              type="text"
              onChange={this.handleInputChange}
              value={this.state.loginID}
              // placeholder="Type user ID here..."
              placeholder="ユーザーIDを入力してください"
              className="input-text login__input-text"
              required
            />
            <input
              type="button"
              onClick={this.handleSubmit}
              value="ログイン"
              className="btn text-btn login__text-btn"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
