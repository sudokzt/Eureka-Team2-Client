import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './ZeroCrasher.css';
import userIcon from '../images/zero-crasher-user.svg';
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
    currentLimit: LIMIT,
    timeLimit: 100
  };

  // 3 minute Timer
  countup = () => {
    if (this.state.timeLimit <= 0) return;
    setTimeout(this.countup, 1000);
    this.setState({
      timeLimit: this.state.timeLimit - 1
    });

    // Get messages every 1 sec.
    if (window.USER_TOKEN !== null) {
      fetch(
        `https://si-2018-second-half-2.eure.jp/api/1.0/tempmatch/messages/${
          this.props.match.params.id
        }?token=${window.USER_TOKEN}&limit=${this.state.currentLimit}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          }
        }
      )
        .then(response => response.json())
        .then(data => {
          if (data.length > this.state.messages.length) {
            this.setState({
              messages: data
            });
            console.log(data.length, this.state.messages.length);
          }

          if (data.length === 0 || data.length < LIMIT) {
            this.setState({ loadedAll: true });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  // Get messages when component mounted.
  componentDidMount() {
    console.log('[componentDidMount()] USER_TOKEN:', window.USER_TOKEN);

    if (window.USER_TOKEN !== null) {
      fetch(
        `https://si-2018-second-half-2.eure.jp/api/1.0/tempmatch/messages/${
          this.props.match.params.id
        }?token=${window.USER_TOKEN}&limit=${LIMIT}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          }
        }
      )
        .then(response => response.json())
        .then(data => {
          console.log(data);

          this.setState(
            {
              messages: data
            },
            () => {
              window.scrollTo(0, document.body.scrollHeight);
              console.log('Scrolled to bottom.');
            }
          );

          if (data.length === 0 || data.length < LIMIT) {
            this.setState({ loadedAll: true });
          }
        })
        .then(() => this.countup())
        .catch(error => {
          console.log(error);
        });
    }
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
      `https://si-2018-second-half-2.eure.jp/api/1.0/tempmatch/messages/${
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
    messages.unshift(messageObj);
    this.setState(
      {
        messages: messages
      },
      () => {
        window.scrollTo(0, document.body.scrollHeight);
      }
    );
  };

  handleLoadMore = () => {
    // Get more data only when there are new data to fetch.
    if (!this.state.loadedAll) {
      const moreLimit = (this.state.loadCounter + 2) * LIMIT;

      fetch(
        `https://si-2018-second-half-2.eure.jp/api/1.0/tempmatch/messages/${
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

    let messages = <p className="crasher__loading-indicator">Loading...</p>;
    if (this.state.messages) {
      messages = this.state.messages.map(message => {
        if (message.user_id.toString() === window.USER_ID) {
          // Set message to the right if it is from user.
          return (
            <div
              key={message.created_at}
              className="talk__message-container talk__message-container-right"
            >
              <p className="talk__message-container__text">{message.message}</p>
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
                  src={userIcon}
                  alt="Partner Icon"
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
            <div className="crasher__message-holder">
              <ZeroCrasherBanner />
              <LoadMore
                onLoadMore={this.handleLoadMore}
                fetchStatus={
                  this.state.messages !== null && !this.state.loadedAll
                }
              />
              <div className="crasher__messages-text-holder">{messages}</div>
            </div>
          </div>
          <ZeroCrasherInputFooter
            onSend={this.handleSend}
            onOpenGallery={this.handleOpenGallery}
          />
          <SendImageModal onSend={this.handleSendImage} />
        </div>
      );
    }

    // window.USER_ID = '1000';
    // window.USER_TOKEN = 'USERTOKEN1000';

    console.log('[render()] USER_TOKEN:', window.USER_TOKEN);

    return (
      <div>
        {/* {redirect} */}
        <Header currentPage="ZeroCrasher" timeLimit={this.state.timeLimit} />
        <div className="under-header above-footer">
          <ZeroCrasherBanner />
          <div className="crasher__message-holder">
            <LoadMore
              onLoadMore={this.handleLoadMore}
              fetchStatus={
                this.state.messages !== null && !this.state.loadedAll
              }
            />
            <div className="crasher__messages-text-holder">{messages}</div>
          </div>
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
