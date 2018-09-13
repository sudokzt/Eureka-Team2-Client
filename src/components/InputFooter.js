import React, { Component } from 'react';

import './InputFooter.css';

class InputFooter extends Component {
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
      <div className="footer">
        <form className="message-form" onSubmit={this.handleSubmit}>
          <div className="message-form__item message-form__gallery-holder">
            <input
              type="button"
              value=""
              className="talk-footer__icon-btn talk-footer__icon-btn__camera"
              onClick={this.props.onOpenGallery}
            />
            <input
              type="button"
              value=""
              className="talk-footer__icon-btn talk-footer__icon-btn__gallery"
              onClick={this.props.onOpenGallery}
            />
          </div>
          <div className="message-form__item message-form__input-holder">
            <input
              type="textarea"
              onChange={this.handleInputChange}
              value={this.state.inputText}
              placeholder="Write something..."
              className="input-text message-form__input-text"
              required
            />
          </div>
          <div className="message-form__item message-form__send-holder">
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

export default InputFooter;
