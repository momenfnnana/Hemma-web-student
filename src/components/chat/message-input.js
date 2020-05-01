import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Picker } from "emoji-mart";
import { ReactMic } from "react-mic";
import "emoji-mart/css/emoji-mart.css";
import { changeChannel } from "../../actions/chat.actions";
import { connect } from "react-redux";
import ReactDOM from "react-dom";

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
      newMessage: "",
      showEmojis: false,
      blobObject: null,
      isRecording: false,
      isPaused: false,
      file: null
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.emojiPicker = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onFileInputChange = this.onFileInputChange.bind(this);
  }

  // Send message functions
  sendMessage = event => {
    event.preventDefault();
    event.target.value = "";
    const message = this.state.newMessage;
    this.setState({ newMessage: "" });
    this.props.twilio.chatClient.then(client => {
      if (this.props.activeChannel === "sid") {
        client.getChannelBySid(this.props.activeChannelId).then(channel => {
          channel.sendMessage(message);
        });
      } else if (this.props.activeChannel === "uniqueName") {
        client
          .getChannelByUniqueName(this.props.activeChannelId)
          .then(channel => {
            channel.sendMessage(message);
          });
      }
    });
  };
  onMessageChanged = event => {
    this.setState({ newMessage: event.target.value });
  };

  //Emoji picker functions
  handleClick(event) {
    try {
      let node = ReactDOM.findDOMNode(this.emojiPicker.current);
      if (!node.contains(event.target)) {
        this.hideEmojiPicker();
      }
    } catch (error) {
      return null;
    }
  }

  hideEmojiPicker() {
    this.setState({ showEmojis: false });
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  async componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  showEmojis = () => {
    this.setState(prevState => ({
      showEmojis: !prevState.showEmojis
    }));
  };

  addEmoji = e => {
    if (e.unified.length <= 5) {
      let emojiPic = String.fromCodePoint(`0x${e.unified}`);
      this.setState({
        newMessage: this.state.newMessage + emojiPic
      });
    } else {
      let sym = e.unified.split("-");
      let codesArray = [];
      sym.forEach(el => codesArray.push("0x" + el));
      let emojiPic = String.fromCodePoint(...codesArray);
      this.setState({
        newMessage: this.state.newMessage + emojiPic
      });
    }
  };

  //Voice note functions
  startOrPauseRecording = () => {
    const { isPaused, isRecording } = this.state;

    if (isPaused) {
      this.setState({ isPaused: false });
    } else if (isRecording) {
      this.setState({ isPaused: true });
    } else {
      this.setState({ isRecording: true });
    }
  };

  stopRecording = () => {
    this.setState({ isRecording: false });
  };

  onStop(blobObject) {
    let data = new FormData();
    data.append("file", blobObject.blob);
    this.props.twilio.chatClient.then(client => {
      if (this.props.activeChannel === "sid") {
        client.getChannelBySid(this.props.activeChannelId).then(channel => {
          channel.sendMessage(data);
        });
      } else if (this.props.activeChannel === "uniqueName") {
        client
          .getChannelByUniqueName(this.props.activeChannelId)
          .then(channel => {
            channel.sendMessage(data);
          });
      }
    });
  }

  //Send file

  onFileInputChange(file) {
    this.setState({
      file: URL.createObjectURL(file)
    });
    let data = new FormData();
    data.append("file", file);
    this.props.twilio.chatClient.then(client => {
      if (this.props.activeChannel === "sid") {
        client.getChannelBySid(this.props.activeChannelId).then(channel => {
          channel.sendMessage(data);
          // channel.on("messageAdded", this.messageAdded);
        });
      } else if (this.props.activeChannel === "uniqueName") {
        client
          .getChannelByUniqueName(this.props.activeChannelId)
          .then(channel => {
            channel.sendMessage(data);
          });
      }
    });
  }

  render() {
    const { isRecording, isPaused } = this.state;

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
                  {isRecording ? (
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/mute.png"}
                      alt="Record"
                      height="23"
                      className="contain-img"
                      disabled={!isRecording}
                      onClick={this.stopRecording}
                    />
                  ) : (
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/record.png"}
                      alt="Record"
                      height="23"
                      className="contain-img"
                      onClick={this.startOrPauseRecording}
                    />
                  )}
                </li>
                <ReactMic
                  record={isRecording}
                  pause={isPaused}
                  onStop={this.onStop}
                />
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
                <li
                  className="list-inline-item clickable"
                  onClick={this.showEmojis}
                >
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/emoji.png"}
                    alt="Emojis"
                    height="20"
                    className="contain-img"
                  />
                </li>
              </ul>
              {this.state.showEmojis ? (
                <Picker
                  style={{
                    position: "absolute",
                    bottom: "50px",
                    right: "-5px"
                  }}
                  onSelect={this.addEmoji}
                  ref={this.emojiPicker}
                />
              ) : null}
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