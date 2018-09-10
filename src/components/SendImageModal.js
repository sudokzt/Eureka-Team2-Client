import React, { Component } from "react";

import "./SendImageModal.css";

class SendImageModal extends Component {
  state = {
    inputText: ""
  };

  handleInputChange = event => {
    this.setState({ inputText: event.target.value });
  };

  handleSubmit = event => {
    // Hide the modal.
    document.getElementById("sendImageModal").style.display = "none";

    // Stop the form from refreshing the page on submit.
    event.preventDefault();

    // Call the onSend callback.
    this.props.onSend(this.state.inputText);

    // Clear the input box.
    this.setState({ inputText: "" });
  };

  render() {
    return (
      <div className="modal" id="sendImageModal">
        <div className="modal-content talk__send-image-modal">
          <span
            className="close-btn"
            onClick={() => {
              document.getElementById("sendImageModal").style.display = "none";
            }}
          >
            &times;
          </span>
          <form className="message-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              onChange={this.handleInputChange}
              value={this.state.inputText}
              placeholder="Put an image URL here..."
              className="input-text send-image__input-text"
            />
            <input
              type="submit"
              value=""
              className="talk-footer__icon-btn talk-footer__icon-btn__send"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default SendImageModal;
