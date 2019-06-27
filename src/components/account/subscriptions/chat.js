import React, { Component } from "react";
import { FaCircle } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../../actions/user.actions";
import { getChatToken } from "../../../actions/twilio.actions";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import "./styles.sass";
import firebase from "firebase";
import axios from "axios";
import { apiBaseUrl } from "../../../api/helpers";
import { ReactMic } from "react-mic";
import { Field, reduxForm } from "redux-form";
import ReactDOM from "react-dom";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-spin-fade-loader.scss";
import "loaders.css/src/animations/ball-clip-rotate.scss";

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

export class UsersChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: "",
      messages: [],
      privateChannel: "",
      showEmojis: false,
      instructors: [],
      users: {},
      activeChannel: "general",
      blobObject: null,
      isRecording: false,
      isPaused: false,
      file: null,
      loading: false,
      twilioMessages: []
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onFileInputChange = this.onFileInputChange.bind(this);
    this.emojiPicker = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.messageAdded = this.messageAdded.bind(this);
    this.convertMessage = this.convertMessage.bind(this);
  }

  convertMessage(twilioMessage) {
    let type;
    if (twilioMessage.type === "text") {
      type = "text";
    } else {
      type = twilioMessage.media.contentType.startsWith("image")
        ? "image"
        : "audio";
    }

    if (type !== "text") {
      // get the URL
      twilioMessage.media.getContentUrl().then(url => {
        // Update the list of messages
        const messages = [...this.state.messages];
        messages.find(m => m.id === twilioMessage.sid).url = url;
        this.setState({ messages: messages });
      });
    }

    return {
      id: twilioMessage.sid,
      author: twilioMessage.author,
      type: type,
      body: type === "text" ? twilioMessage.body : null
    };
  }

  onFileInputChange(file) {
    this.setState({
      file: URL.createObjectURL(file)
    });
    let data = new FormData();
    data.append("file", file);
    this.props.twilio.chatClient.then(client => {
      if (this.state.activeChannel === "general") {
        client.getChannelBySid(this.props.chatChannelSid).then(channel => {
          channel.sendMessage(data);
          channel.on("messageAdded", this.messageAdded);
        });
      } else {
        client
          .getChannelByUniqueName(this.state.privateChannel)
          .then(channel => {
            channel.sendMessage(data);
            channel.on("messageAdded", this.messageAdded);
          });
      }
    });
  }

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
      if (this.state.activeChannel === "general") {
        client.getChannelBySid(this.props.chatChannelSid).then(channel => {
          channel.sendMessage(data);
          channel.on("messageAdded", this.messageAdded);
        });
      } else {
        client
          .getChannelByUniqueName(this.state.privateChannel)
          .then(channel => {
            channel.sendMessage(data);
            channel.on("messageAdded", this.messageAdded);
          });
      }
    });
  }

  loadUsers() {
    const newUsers = { ...this.state.users };
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };

    for (let message of this.state.messages) {
      const entry = newUsers[message.author];
      if (!entry) {
        // No previous request
        const request = axios
          .get(`${apiBaseUrl}/users/${message.author}`, { headers })
          .then(response => response.data.data)
          .then(user => {
            const newState = { users: { ...this.state.users } };
            newState.users[message.author] = user;
            this.setState(newState);
          });
        newUsers[message.author] = request;
        this.state.users[message.author] = request;
      }
    }

    this.setState({ users: newUsers });
  }

  getUser(id) {
    const entry = this.state.users[id];
    if (!entry || entry["then"]) {
      return null;
    } else {
      // we have a user, yay
      return entry;
    }
  }

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

    if (this.props.authenticated) {
      this.props.getUser();
      this.props.getChatToken().then(() => this.initiateGeneralChat());
    }
    const courseId = this.props.match.params.id;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${apiBaseUrl}/content/${courseId}/instructors`, { headers })
      .then(response => {
        this.setState({ instructors: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.authenticated && this.props.authenticated) {
      this.props.getUser();
    }
  }

  async initiateGeneralChat() {
    this.setState({ loading: true });
    const client = await this.props.twilio.chatClient;
    client
      .getChannelBySid(this.props.chatChannelSid)
      .then(channel => {
        this.setState({ loading: false });

        client.on("channelJoined", function(channel) {
          console.log("Joined channel " + channel.friendlyName);
        });

        channel.join().catch(function(err) {
          console.error(
            "Couldn't join channel " + channel.friendlyName + " because " + err
          );
        });
        channel.getMessages().then(response => {
          const channelMessages = response.items;

          const messages = channelMessages.map(this.convertMessage);

          this.setState({
            messages: messages,
            twilioMessages: channelMessages
          });
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });

    if (firebase && firebase.messaging()) {
      firebase
        .messaging()
        .requestPermission()
        .then(() => {
          firebase
            .messaging()
            .getToken()
            .then(fcmToken => {
              client.setPushRegistrationId("fcm", fcmToken);

              firebase.messaging().onMessage(payload => {
                client.handlePushNotification(payload);
              });
            })
            .catch(err => {});
        })
        .catch(err => {});
    } else {
    }
  }

  onMessageChanged = event => {
    this.setState({ newMessage: event.target.value });
  };

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

  sendMessage = event => {
    event.preventDefault();
    event.target.value = "";
    const message = this.state.newMessage;
    this.setState({ newMessage: "" });
    this.props.twilio.chatClient.then(client => {
      if (this.state.activeChannel === "general") {
        client.getChannelBySid(this.props.chatChannelSid).then(channel => {
          channel.sendMessage(message);
          channel.on("messageAdded", this.messageAdded);
        });
      } else {
        client
          .getChannelByUniqueName(this.state.privateChannel)
          .then(channel => {
            channel.sendMessage(message);
            channel.on("messageAdded", this.messageAdded);
          });
      }
    });
  };

  handleSend = event => {
    event.preventDefault();

    if (event.key === "Enter") {
      event.target.value = "";
      const message = this.state.newMessage;
      this.setState({ newMessage: "" });
      this.props.twilio.chatClient.then(client => {
        if (this.state.activeChannel === "general") {
          client.getChannelBySid(this.props.chatChannelSid).then(channel => {
            channel.sendMessage(message);
            channel.on("messageAdded", this.messageAdded);
          });
        } else {
          client
            .getChannelByUniqueName(this.state.privateChannel)
            .then(channel => {
              channel.sendMessage(message);
              channel.on("messageAdded", this.messageAdded);
            });
        }
      });
    }
  };

  messageAdded = twilioMessage => {
    const message = this.convertMessage(twilioMessage);

    this.setState((prevState, props) => ({
      twilioMessages: [...prevState.twilioMessages, twilioMessage],
      messages: [...prevState.messages, message]
    }));
  };

  newMessageAdded = div => {
    this.loadUsers();
    if (div) {
      div.scrollIntoView({ block: "nearest" });
    }
  };

  renderMessages() {
    const messages = this.state.messages;
    let myIdentity = this.props.user && this.props.user.id;
    return messages.map(message => {
      const user = this.getUser(message.author);
      return (
        <React.Fragment>
          {message.author == myIdentity ? (
            <li className="mb-3">
              {message.type == "image" && (
                <img
                  src={message.url}
                  alt="Chat img"
                  height="200"
                  className="contain-img"
                />
              )}
              {message.type == "text" && (
                <div className="message my-message text-white light-font-text">
                  {message.body}
                </div>
              )}
              {message.type == "audio" && message.url && (
                <audio controls>
                  <source src={message.url} />
                </audio>
              )}
            </li>
          ) : (
            <li className="clearfix mb-3" ref={this.newMessageAdded}>
              <div className="message-data">
                {user && (
                  <span className="message-data-name small">{user.name}</span>
                )}
              </div>
              <div className="d-flex justify-content-end">
                {message.type == "image" && (
                  <img
                    src={message.url}
                    alt="Chat img"
                    height="200"
                    className="contain-img"
                  />
                )}
                {message.type == "text" && (
                  <div className="message my-message text-white light-font-text">
                    {message.body}
                  </div>
                )}
                {message.type == "audio" && message.url && (
                  <audio controls>
                    <source src={message.url} />
                  </audio>
                )}
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/user-circle.png"
                  }
                  alt="Chat img"
                  height="27"
                  className="contain-img ml-2 align-self-start"
                />
              </div>
            </li>
          )}
        </React.Fragment>
      );
    });
  }

  renderInstructors() {
    const instructors = this.state.instructors;
    if (instructors) {
      return instructors.map(instructor => (
        <div
          className="media chat-item d-flex align-items-center clickable h-55"
          onClick={() => this.setPrivateChannel(instructor.id)}
        >
          <img
            src={process.env.PUBLIC_URL + "/assets/images/user-circle.png"}
            alt="Chat img"
            height="27"
            className="contain-img mr-2"
          />
          <div className="media-body">
            <h6 className="small mid-text mb-0">{instructor.name}</h6>
          </div>
        </div>
      ));
    }
  }

  async setPrivateChannel(pairIdentity) {
    let myIdentity = this.props.user && this.props.user.id;
    let privateChannelName =
      myIdentity < pairIdentity
        ? pairIdentity + "_" + myIdentity
        : myIdentity + "_" + pairIdentity;
    await this.setState({
      privateChannel: privateChannelName,
      activeChannel: "private"
    });
    this.initiateChat(pairIdentity);
  }

  async initiateChat(pairIdentity) {
    this.props.twilio.chatClient.then(client => {
      client
        .getChannelByUniqueName(this.state.privateChannel)
        .then(channel => {
          console.log("Channel is ", channel);
          channel.join();
          channel.on("channelInvited", function(channel) {
            console.log("Joined channel ", channel);
            channel.join();
          });
          channel.getMessages().then(messages => {
            const channelMessages = messages.items;
            this.setState({ messages: channelMessages });
          });
        })
        .catch(err => {
          console.log("Error ", err);

          client
            .createChannel({
              uniqueName: this.state.privateChannel
            })
            .then(function joinChannel(channel) {
              channel.join();
              channel.invite(pairIdentity);
              console.log("Created channel is ", channel);
            })
            .catch(error => {
              console.log("Creating error", error);
            });
        });

      if (firebase && firebase.messaging()) {
        firebase
          .messaging()
          .requestPermission()
          .then(() => {
            firebase
              .messaging()
              .getToken()
              .then(fcmToken => {
                client.setPushRegistrationId("fcm", fcmToken);

                firebase.messaging().onMessage(payload => {
                  client.handlePushNotification(payload);
                });
              })
              .catch(err => {});
          })
          .catch(err => {});
      } else {
      }
    });
  }

  render() {
    const { isRecording, isPaused } = this.state;

    return (
      <React.Fragment>
        <div className="row no-gutters">
          <div className="col-12 mb-4">
            <div className="d-flex justify-content-between">
              <h6 className="dark-text small mb-0 mt-0">الدردشة</h6>
            </div>
          </div>
        </div>
        <div className="box-layout shadow-sm w-100">
          <div className="row no-gutters">
            <div className="chat-sidebar col-md-4 border-right">
              <div className="p-3">
                <input
                  className="form-control small light-font-text"
                  placeholder="ابحث هنا"
                />
              </div>
              <h6
                className="media chat-item pb-2 pt-2 d-flex align-items-center clickable light-text small"
                onClick={() => this.initiateGeneralChat()}
              >
                <FaCircle size={9} className="mr-1" /> دردشة للجميع
              </h6>
              {this.renderInstructors()}
            </div>
            <div className="col-md-8">
              <div className="chat-title border-bottom h-55 d-flex align-items-center justify-content-center">
                <h6 className="dark-text small mb-0">دردشة للجميع</h6>
              </div>
              <div className="chat-window">
                {this.state.loading ? (
                  <div className="chat-history d-flex align-items-center justify-content-center">
                    <Loader type="ball-spin-fade-loader" />
                  </div>
                ) : (
                  <React.Fragment>
                    {this.state.messages == undefined ||
                    this.state.messages.length == 0 ? (
                      <React.Fragment>
                        <div className="chat-history d-flex align-items-center justify-content-center flex-column">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/chatting.png"
                            }
                            alt="Record"
                            height="60"
                            className="contain-img mb-3"
                          />
                          <h6 className="silver-text">
                            ارسل رسالة لبدأ المحادثة
                          </h6>
                        </div>
                      </React.Fragment>
                    ) : (
                      <div className="chat-history">
                        <ul className="list-unstyled">
                          {this.renderMessages()}
                        </ul>
                      </div>
                    )}
                  </React.Fragment>
                )}

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
                        onKeyUp={this.handleSend}
                      />
                      <button type="submit" className="btn light-btn">
                        أرسل
                      </button>
                      <div className="options">
                        <ul className="list-unstyled list-inline mb-0">
                          <li className="list-inline-item clickable">
                            {isRecording ? (
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/images/mute.png"
                                }
                                alt="Record"
                                height="23"
                                className="contain-img"
                                disabled={!isRecording}
                                onClick={this.stopRecording}
                              />
                            ) : (
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/images/record.png"
                                }
                                alt="Record"
                                height="23"
                                className="contain-img"
                                onClick={this.startOrPauseRecording}
                              />
                            )}
                          </li>

                          <li className="list-inline-item clickable">
                            <label
                              htmlFor="attachFile"
                              className="clickable w-100"
                            >
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/images/attachment.png"
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
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/emoji.png"
                              }
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
                    <ReactMic
                      record={isRecording}
                      pause={isPaused}
                      onStop={this.onStop}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.user,
    twilio: state.twilio,
    formValues: state.form.chat && state.form.chat.values
  };
}

UsersChatComponent = reduxForm({
  form: "chat"
})(UsersChatComponent);

UsersChatComponent = connect(
  mapStateToProps,
  { getUser, getChatToken }
)(UsersChatComponent);

export const UsersChat = withRouter(UsersChatComponent);
