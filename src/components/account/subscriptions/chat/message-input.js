import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Picker } from "emoji-mart";
import { ReactMic } from "react-mic";
import "emoji-mart/css/emoji-mart.css";
import { changeChannel } from "../../../../actions/chat.actions";
import { connect } from "react-redux";

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

const FileInput = ({
  input: { value: omitValue, onChange, onBlur, ...inputProps },
  meta: omitMeta,
  ...props
}) => (
  <input
    onChange={adaptFileEventToValue(onChange)}
    onBlur={adaptFileEventToValue(onBlur)}
    type="file"
    {...inputProps}
    {...props}
  />
);

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: ""
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage = event => {
    event.preventDefault();
    event.target.value = "";
    const message = this.state.newMessage;
    this.setState({ newMessage: "" });
    this.props.twilio.chatClient.then(client => {
      if (this.props.activeChannel === "sid") {
        client.getChannelBySid(this.props.activeChannelId).then(channel => {
          channel.removeAllListeners();
          channel.sendMessage(message);
        });
      } else if (this.props.activeChannel === "uniqueName") {
        client
          .getChannelByUniqueName(this.props.activeChannelId)
          .then(channel => {
            channel.removeAllListeners();
            channel.sendMessage(message);
          });
      }
    });
  };
  onMessageChanged = event => {
    this.setState({ newMessage: event.target.value });
  };

  render() {
    return (
      <div className="chat-message">
        <form onSubmit={this.sendMessage}>
          <div className="input-chat">
            <textarea
              className="form-control light-font-text small"
              type="text"
              name="message"
              id="message"
              onChange={this.onMessageChanged}
              value={this.state.newMessage}
            />
            <button type="submit" className="btn light-btn">
              أرسل
            </button>
            <div className="options">
              <ul className="list-unstyled list-inline mb-0">
                <li className="list-inline-item clickable">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/record.png"}
                    alt="Record"
                    height="23"
                    className="contain-img"
                  />
                </li>

                <li className="list-inline-item clickable">
                  <label htmlFor="attachFile" className="clickable w-100">
                    <img
                      src={
                        process.env.PUBLIC_URL + "/assets/images/attachment.png"
                      }
                      alt="Attach"
                      height="20"
                      className="contain-img"
                    />
                    <Field
                      component={FileInput}
                      name="attachment"
                      className="d-none"
                      id="attachFile"
                      onChange={this.onFileInputChange}
                    />
                  </label>
                </li>
                <li className="list-inline-item clickable">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/emoji.png"}
                    alt="Emojis"
                    height="20"
                    className="contain-img"
                  />
                </li>
              </ul>
              {/* <Picker
                style={{
                  position: "absolute",
                  bottom: "50px",
                  right: "-5px"
                }}
                onSelect={this.addEmoji}
                ref={this.emojiPicker}
              /> */}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeChannel: state.chat.channel,
    activeChannelId: state.chat.id,
    twilio: state.twilio
  };
}

const mapDispatchToProps = {
  changeChannel: changeChannel
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageInput);
