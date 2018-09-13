import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './ZeroCrasher.css';
import Header from '../components/Header';
import ZeroCrasherInputFooter from '../components/ZeroCrasherInputFooter';
import LoadMore from '../components/LoadMore';
import SendImageModal from '../components/SendImageModal';
import TalkOverModal from '../components/TalkOverModal';
import ZeroCrasherBanner from '../components/ZeroCrasherBanner';

// Set data fetching limit.
const LIMIT = 10;

class ZeroCrasher extends Component {
  state = {
    user: null,
    matching: null,
    messages: null,
    loadCounter: 0,
    loadedAll: false,
    currentLimit: 0,
    timeLimit: 3
  };

  // 3 minute Timer
  countup = () => {
    if (this.state.timeLimit <= 0) return;
    setTimeout(this.countup, 1000);
    this.setState({
      timeLimit: this.state.timeLimit - 1
    });
  };

  // Get and user, matching partner and messages.
  componentDidMount() {
    if (window.USER_TOKEN !== null) {
      Promise.all([
        fetch(
          `https://si-2018-006.eure.jp/api/1.0/users/${window.USER_ID}?token=${
            window.USER_TOKEN
          }`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json'
            }
          }
        ).then(response => response.json()),
        fetch(
          `https://si-2018-006.eure.jp/api/1.0/users/${
            this.props.match.params.id
          }?token=${window.USER_TOKEN}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json'
            }
          }
        ).then(response => response.json()),
        fetch(
          `https://si-2018-006.eure.jp/api/1.0/messages/${
            this.props.match.params.id
          }?token=${window.USER_TOKEN}&limit=${LIMIT}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json'
            }
          }
        ).then(response => response.json())
      ])
        .then(data => {
          // Sort messages data by created_at.
          data[2].sort(
            (message1, message2) =>
              message1.created_at > message2.created_at ? 1 : -1
          );

          this.setState({
            user: data[0],
            matching: data[1],
            messages: data[2]
          });

          if (data[2].length === 0 || data[2].length < LIMIT) {
            this.setState({ loadedAll: true });
          }
        })
        .then(() => this.countup())
        .catch(error => {
          console.log(error);
        });
    }
    // this.countup();
  }

  // Always scroll to the bottom when compoent updates.
  componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  handleSend = message => {
    // Create a message object only for displaying.
    const currentDate = new Date();
    const messageObj = {
      created_at: currentDate.toISOString(),
      message: message,
      partner_id: this.props.match.params.id,
      updated_at: currentDate.toISOString(),
      user_id: window.USER_ID
    };

    // Make a send (POST) request.
    fetch(
      `https://si-2018-006.eure.jp/api/1.0/messages/${
        this.props.match.params.id
      }`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: window.USER_TOKEN,
          message: message
        })
      }
    ).catch(error => {
      console.log(error);
    });

    const messages = this.state.messages;
    messages.push(messageObj);
    this.setState({
      messages: messages
    });
  };

  // Open the modal for sending image url (will be sent in Markdown).
  handleOpenGallery = () => {
    document.getElementById('sendImageModal').style.display = 'block';
  };

  handleSendImage = message => {
    // Create a message object only for displaying.
    const imageMessage = '![image](' + message + ')';
    const currentDate = new Date();
    const messageObj = {
      created_at: currentDate.toISOString(),
      message: imageMessage,
      partner_id: this.props.match.params.id,
      updated_at: currentDate.toISOString(),
      user_id: window.USER_ID
    };

    // Make a send (POST) request.
    fetch(
      `https://si-2018-006.eure.jp/api/1.0/messages/${
        this.props.match.params.id
      }`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: window.USER_TOKEN,
          message: imageMessage
        })
      }
    ).catch(error => {
      console.log(error);
    });

    const messages = this.state.messages;
    messages.push(messageObj);
    this.setState({
      messages: messages
    });
  };

  handleLoadMore = () => {
    // Get more data only when there are new data to fetch.
    if (!this.state.loadedAll) {
      const moreLimit = (this.state.loadCounter + 2) * LIMIT;

      fetch(
        `https://si-2018-006.eure.jp/api/1.0/messages/${
          this.props.match.params.id
        }?token=${window.USER_TOKEN}&limit=${moreLimit}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          }
        }
      )
        .then(response => response.json())
        .then(data => {
          // Sort data by created_at.
          data.sort(
            (message1, message2) =>
              message1.created_at > message2.created_at ? 1 : -1
          );

          this.setState({
            messages: data,
            loadCounter: this.state.loadCounter + 1,
            loadMoreClicked: true,
            currentLimit: moreLimit
          });

          // Update the loadedAll flag to true if the currentLimit
          // is not smaller than the actual data we can fetch.
          if (data.length < this.state.currentLimit) {
            this.setState({ loadedAll: true });
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log('No more data to load.');
    }
  };

  render() {
    let redirect = null;
    // Redirect to LOGIN page if use token is not provided.
    if (window.USER_TOKEN === null) {
      redirect = <Redirect to="/login" />;
      console.log('Redirecting to Login...');
    }

    let messages = <p>Loading...</p>;
    if (this.state.messages && this.state.user && this.state.matching) {
      messages = this.state.messages.map(message => {
        if (message.user_id.toString() === window.USER_ID) {
          // Set message to the right if it is from user.
          return (
            <div
              key={message.created_at}
              className="talk__message-container talk__message-container-right"
            >
              <p className="talk__message-container__text">{message.message}</p>
              <div className="talk__message-container__avatar-holder">
                <img
                  src={this.state.user.image_uri}
                  alt={this.state.user.nickname}
                  className="talk__message-container__avatar"
                />
              </div>
            </div>
          );
        } else if (message.user_id.toString() === this.props.match.params.id) {
          // Set message to the left if it is from partner.
          return (
            <div
              key={message.created_at}
              className="talk__message-container talk__message-container-left"
            >
              <div className="talk__message-container__avatar-holder">
                <img
                  src={this.state.matching.image_uri}
                  alt={this.state.matching.nickname}
                  className="talk__message-container__avatar"
                />
              </div>
              <p className="talk__message-container__text talk__message-container__text-left">
                {message.message}
              </p>
            </div>
          );
        } else {
          return (
            <div key={message.created_at} className="talk__message-container">
              <p className="talk__message-container__text">{message.message}</p>
            </div>
          );
        }
      });
    }

    if (this.state.timeLimit <= 0) {
      return (
        <div>
          {/* {redirect} */}
          <Header currentPage="ZeroCrasher" timeLimit={this.state.timeLimit} />
          <TalkOverModal />
          <div className="under-header above-footer">
            <div className="talk__message-holder">
              <ZeroCrasherBanner />
            </div>
            <LoadMore
              onLoadMore={this.handleLoadMore}
              fetchStatus={
                this.state.messages !== null && !this.state.loadedAll
              }
            />
            {messages}
          </div>
          <ZeroCrasherInputFooter
            onSend={this.handleSend}
            onOpenGallery={this.handleOpenGallery}
          />
          <SendImageModal onSend={this.handleSendImage} />
        </div>
      );
    }

    return (
      <div>
        {/* {redirect} */}
        <Header currentPage="ZeroCrasher" timeLimit={this.state.timeLimit} />
        <div className="under-header above-footer">
          <div className="talk__message-holder">
            <ZeroCrasherBanner />
          </div>
          <LoadMore
            onLoadMore={this.handleLoadMore}
            fetchStatus={this.state.messages !== null && !this.state.loadedAll}
          />
          {messages}
        </div>
        <ZeroCrasherInputFooter
          onSend={this.handleSend}
          onOpenGallery={this.handleOpenGallery}
        />
        <SendImageModal onSend={this.handleSendImage} />
      </div>
    );
  }
}

export default ZeroCrasher;
