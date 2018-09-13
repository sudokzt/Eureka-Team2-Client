import React, { Component } from 'react';

import './ZeroCrasherInputFooter.css';

class ZeroCrasherInputFooter extends Component {
  state = {
    inputText: ''
  };

  handleInputChange = event => {
    this.setState({ inputText: event.target.value });
  };

  handleSubmit = event => {
    // Stop the form from refreshing the page on submit.
    event.preventDefault();

    // Call the onSend callback.
    this.props.onSend(this.state.inputText);

    // Clear the input box.
    this.setState({ inputText: '' });
  };

  render() {
    return (
      <div className="footer crasher__footer">
        <form
          className="message-form crasher__form-holder"
          onSubmit={this.handleSubmit}
        >
          <div className="crasher__input-textarea">
            <textarea
              onChange={this.handleInputChange}
              value={this.state.inputText}
              placeholder="メッセージを入力"
              className="crasher__input-textarea-textbox"
              required
            />
          </div>
          <div className="crasher__send-holder">
            <input
              type="submit"
              value=""
              className="talk-footer__icon-btn talk-footer__icon-btn__send"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default ZeroCrasherInputFooter;
