import React from "react";
import firebase from "../../../firebase";
import { v4 as uuidv4 } from "uuid";
import mime from "mime-types";
import { ReactMic } from "react-mic";
import { Picker, emojiIndex } from "emoji-mart";
import ProgressBar from "react-animated-progress-bar";
import "emoji-mart/css/emoji-mart.css";
class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      channel: this.props.channel,
      emojiPicker: false,
      file: null,
      authorized: ["image/jpeg", "image/png"],
      storageRef: firebase.storage().ref(),
      uploadState: "",
      blobObject: null,
      isRecording: false,
      isPaused: false,
      errors: [],
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, errors: [] });
  };

  handleKeyDown = (event) => {
    if (event.ctrlKey && event.keyCode === 13) {
      this.sendMessage();
    }
  };

  createMessage = (fileUrl = null) => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: this.props.user,
    };
    if (fileUrl !== null) {
      if (fileUrl.includes("audio")) {
        message["audio"] = fileUrl;
      } else {
        message["image"] = fileUrl;
      }
    } else {
      message["content"] = this.state.message;
    }
    return message;
  };

  sendMessage = (e) => {
    e.preventDefault();
    const { messagesRef } = this.props;
    const { channel, message } = this.state;

    if (message) {
      messagesRef
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ message: "", errors: [] });
        });
    } else {
      this.setState({
        errors: this.state.errors.concat({
          message: "يرجى تعبئة خانة الرسالة",
        }),
      });
    }
  };

  handleAddEmoji = (emoji) => {
    const oldMessage = this.state.message;
    const newMessage = this.colonToUnicode(` ${oldMessage} ${emoji.colons} `);
    this.setState({ message: newMessage, emojiPicker: false });
    setTimeout(() => this.messageInputRef.focus(), 0);
  };

  colonToUnicode = (message) => {
    return message.replace(/:[A-Za-z0-9_+-]+:/g, (x) => {
      x = x.replace(/:/g, "");
      let emoji = emojiIndex.emojis[x];
      if (typeof emoji !== "undefined") {
        let unicode = emoji.native;
        if (typeof unicode !== "undefined") {
          return unicode;
        }
      }
      x = ":" + x + ":";
      return x;
    });
  };

  handleTogglePicker = () => {
    this.setState({ emojiPicker: !this.state.emojiPicker });
  };

  addFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.sendFile(file);
    }
  };

  isAuthorized = (filename) =>
    this.state.authorized.includes(mime.lookup(filename));

  uploadFile = (file, metadata) => {
    const pathToUpload = this.state.channel.id;
    const ref = this.props.messagesRef;
    const filePath = `chat/${pathToUpload}/${uuidv4()}.jpg`;

    this.setState(
      {
        uploadState: "uploading",
        uploadTask: this.state.storageRef.child(filePath).put(file, metadata),
      },
      () => {
        this.state.uploadTask.on("state_changed", () => {
          this.state.uploadTask.snapshot.ref
            .getDownloadURL()
            .then((downloadUrl) => {
              this.sendFileMessage(downloadUrl, ref, pathToUpload);
            })
            .catch((err) => {
              console.error(err);
            });
        });
      }
    );
  };

  sendFile = (file) => {
    if (file !== null) {
      if (this.isAuthorized(file.name)) {
        const metadata = { contentType: mime.lookup(file.name) };
        this.uploadFile(file, metadata);
        this.clearFile();
      }
    }
  };

  clearFile = () => this.setState({ file: null });

  sendFileMessage = (fileUrl, ref, pathToUpload) => {
    ref
      .child(pathToUpload)
      .push()
      .set(this.createMessage(fileUrl))
      .then(() => {
        this.setState({ uploadState: "done" });
      })
      .catch((err) => {
        console.error(err);
      });
  };

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

  onStop = (blobObject) => {
    const pathToUpload = this.state.channel.id;
    const ref = this.props.messagesRef;
    const filePath = `audio/${pathToUpload}/${uuidv4()}.mp3`;
    const metadata = {
      contentType: "audio/mp3",
    };

    this.setState(
      {
        uploadState: "uploading",
        uploadTask: this.state.storageRef
          .child(filePath)
          .put(blobObject.blob, metadata),
      },
      () => {
        this.state.uploadTask.on("state_changed", () => {
          this.state.uploadTask.snapshot.ref
            .getDownloadURL()
            .then((downloadUrl) => {
              this.sendFileMessage(downloadUrl, ref, pathToUpload);
            })
            .catch((err) => {
              console.error(err);
            });
        });
      }
    );
  };

  renderErrors() {
    return (
      this.state.errors &&
      this.state.errors.length > 0 &&
      this.state.errors.map((error, index) => (
        <small className="text-red" key={index}>
          {error.message}
        </small>
      ))
    );
  }

  render() {
    const {
      emojiPicker,
      message,
      uploadState,
      isRecording,
      isPaused,
    } = this.state;
    return (
      <div className="chat-message">
        <form>
          {uploadState === "uploading" ? (
            <ProgressBar
              width="100%"
              height="10px"
              rect
              fontColor="gray"
              percentage="100"
              rectPadding="1px"
              rectBorderRadius="20px"
              trackPathColor="transparent"
              bgColor="#333333"
              trackBorderColor="grey"
            />
          ) : (
              <div className="input-chat">
                <input
                  className="form-control light-font-text small"
                  type="text"
                  name="message"
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyDown}
                  ref={(node) => (this.messageInputRef = node)}
                  value={message}
                  autoComplete="off"
                />
                {this.renderErrors()}
                <button
                  type="submit"
                  className="btn light-btn"
                  onClick={(e) => this.sendMessage(e)}
                >
                  أرسل
              </button>
                <div className="options">
                  <ul className="list-unstyled list-inline mb-0">
                    <li className="list-inline-item clickable">
                      <>
                        {isRecording ? (
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/light-mic.png"
                            }
                            alt="Record"
                            height="20"
                            width="20"
                            className="contain-img"
                            disabled={!isRecording}
                            onClick={this.stopRecording}
                          />
                        ) : (
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/dark-mic.png"
                              }
                              alt="Record"
                              height="20"
                              width="20"
                              className="contain-img"
                              onClick={this.startOrPauseRecording}
                            />
                          )}
                      </>
                      <ReactMic
                        record={isRecording}
                        pause={isPaused}
                        channelCount={1}
                        mimeType="audio/wav"
                        onStop={this.onStop}
                      />
                    </li>
                    <li className="list-inline-item clickable">
                      <label
                        htmlFor="attachFile"
                        className="clickable w-100 mb-0"
                      >
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/attachment.png"
                          }
                          alt="Attach"
                          height="20"
                          width="20"
                          className="contain-img"
                        />
                      </label>
                      <input
                        type="file"
                        className="d-none"
                        id="attachFile"
                        onChange={this.addFile}
                      />
                    </li>
                    <li
                      className="list-inline-item clickable"
                      onClick={this.showEmojis}
                    >
                      {emojiPicker && (
                        <Picker
                          style={{
                            position: "absolute",
                            bottom: "50px",
                            right: "-5px",
                          }}
                          onSelect={this.handleAddEmoji}
                        />
                      )}
                      <img
                        src={process.env.PUBLIC_URL + "/assets/images/emoji.png"}
                        alt="Emojis"
                        height="20"
                        width="20"
                        className="contain-img"
                        onClick={this.handleTogglePicker}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            )}
        </form>
      </div>
    );
  }
}

export default MessageForm;
