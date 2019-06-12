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

export class UsersChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: "",
      messages: [],
      generalChannel: "",
      privateChannel: "",
      showEmojis: false,
      instructors: []
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  async componentDidMount() {
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
    const client = await this.props.twilio.chatClient;
    client
      .getChannelBySid(this.props.chatChannelSid)
      .then(channel => {
        client.on("channelJoined", function(channel) {
          console.log("Joined channel " + channel.friendlyName);
        });

        channel.join().catch(function(err) {
          console.error(
            "Couldn't join channel " + channel.friendlyName + " because " + err
          );
        });

        channel.getMessages().then(messages => {
          const totalMessages = messages.items.length;
          for (let i = 0; i < totalMessages; i++) {
            const channelMessages = messages.items;
            this.setState({ messages: channelMessages });
          }
        });
      })
      .catch(err => {
        console.log(err);
      });

    if (firebase && firebase.messaging()) {
      // requesting permission to use push notifications
      firebase
        .messaging()
        .requestPermission()
        .then(() => {
          // getting FCM token
          firebase
            .messaging()
            .getToken()
            .then(fcmToken => {
              // continue with Step 7 here
              // passing FCM token to the `chatClientInstance` to register for push notifications
              client.setPushRegistrationId("fcm", fcmToken);

              // registering event listener on new message from firebase to pass it to the Chat SDK for parsing
              firebase.messaging().onMessage(payload => {
                client.handlePushNotification(payload);
              });
            })
            .catch(err => {
              // can't get token
            });
        })
        .catch(err => {
          // can't request permission or permission hasn't been granted to the web app by the user
        });
    } else {
      // no Firebase library imported or Firebase library wasn't correctly initialized
    }
  }

  async setPrivateChannel(pairIdentity) {
    let myIdentity = this.props.user && this.props.user.id;
    console.log("My identity is ", myIdentity);
    let privateChannelName =
      myIdentity < pairIdentity
        ? pairIdentity + "_" + myIdentity
        : myIdentity + "_" + pairIdentity;
    await this.setState({ privateChannel: privateChannelName });
    console.log("Private channel is ", this.state.privateChannel);
    console.log("Pair identity is ", pairIdentity);
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
            const totalMessages = messages.items.length;
            for (let i = 0; i < totalMessages; i++) {
              const channelMessages = messages.items;
              this.setState({ messages: channelMessages });
            }
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
              console.log("Created hannel is ", channel);
            })
            .catch(error => {
              console.log("Creating error", error);
            });
        });

      if (firebase && firebase.messaging()) {
        // requesting permission to use push notifications
        firebase
          .messaging()
          .requestPermission()
          .then(() => {
            // getting FCM token
            firebase
              .messaging()
              .getToken()
              .then(fcmToken => {
                // continue with Step 7 here
                // passing FCM token to the `chatClientInstance` to register for push notifications
                client.setPushRegistrationId("fcm", fcmToken);

                // registering event listener on new message from firebase to pass it to the Chat SDK for parsing
                firebase.messaging().onMessage(payload => {
                  client.handlePushNotification(payload);
                });
              })
              .catch(err => {
                // can't get token
              });
          })
          .catch(err => {
            // can't request permission or permission hasn't been granted to the web app by the user
          });
      } else {
        // no Firebase library imported or Firebase library wasn't correctly initialized
      }
    });
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
    const message = this.state.newMessage;
    this.setState({ newMessage: "" });
    this.props.twilio.chatClient.then(client => {
      client.getChannelByUniqueName(this.state.privateChannel).then(channel => {
        channel.sendMessage(message);
        channel.getMessages().then(this.messagesLoaded);
        channel.on("messageAdded", this.messageAdded);
      });
    });
  };

  sendGeneralMessage = event => {
    event.preventDefault();
    const message = this.state.newMessage;
    this.setState({ newMessage: "" });
    this.props.twilio.chatClient.then(client => {
      client.getChannelBySid(this.props.chatChannelSid).then(channel => {
        channel.sendMessage(message);
        channel.getMessages().then(this.messagesLoaded);
        channel.on("messageAdded", this.messageAdded);
      });
    });
  };

  newMessageAdded = li => {
    if (li) {
      li.scrollIntoView();
    }
  };

  messagesLoaded = messagePage => {
    this.setState({ messages: messagePage.items });
  };

  messageAdded = message => {
    this.setState((prevState, props) => ({
      messages: [...prevState.messages, message]
    }));
  };

  renderMessages() {
    const messages = this.state.messages;
    let myIdentity = this.props.user && this.props.user.id;

    return messages.map(message => (
      <React.Fragment>
        {message.author == myIdentity ? (
          <li>
            <div className="message my-message text-white light-font-text mb-3">
              {message.body}
            </div>
          </li>
        ) : (
          <li className="clearfix" ref={this.newMessageAdded}>
            <div className="message-data">
              <span className="message-data-name small en-text">
                {message.author}
              </span>
            </div>
            <div className="d-flex justify-content-end mb-3">
              <div className="message other-message mid-text light-font-text">
                {message.body}
              </div>
              <img
                src={process.env.PUBLIC_URL + "/assets/images/user-circle.png"}
                alt="Chat img"
                height="27"
                className="contain-img ml-2 align-self-end"
              />
            </div>
          </li>
        )}
      </React.Fragment>
    ));
  }

  renderInstructors() {
    const instructors = this.state.instructors;
    if (instructors) {
      return instructors.map(instructor => (
        <div
          className="media chat-item d-flex align-items-center clickable h-55 mb-1"
          onClick={() => this.setPrivateChannel(instructor.id)}
        >
          <img
            src={process.env.PUBLIC_URL + "/assets/images/user-circle.png"}
            alt="Chat img"
            height="27"
            className="contain-img mr-2"
          />
          <div className="media-body">
            <h6 className="small mid-text mb-1">{instructor.name}</h6>
            <h6 className="dark-silver-text smaller mb-0">مشرف</h6>
          </div>
        </div>
      ));
    }
  }

  render() {
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
                <div className="chat-history">
                  <ul className="list-unstyled">
                    {this.renderMessages()}

                    {/* <li>
                      <div className="message my-message text-white light-font-text mb-3">
                        اللّغة العربيّة من اللّغات العالميّة الأكثر انتشاراً في
                        المُتّحدة، كما إنها تشكّلُ.
                      </div>
                    </li> */}
                  </ul>
                </div>

                <div className="chat-message">
                  {this.state.privateChannel == "" ? (
                    <form onSubmit={this.sendGeneralMessage}>
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
                            <li className="list-inline-item">
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/images/record.png"
                                }
                                alt="Record"
                                height="20"
                                className="contain-img"
                              />
                            </li>
                            <li className="list-inline-item">
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/images/attachment.png"
                                }
                                alt="Attach"
                                height="20"
                                className="contain-img"
                              />
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
                                bottom: "40px",
                                right: "-5px"
                              }}
                              onSelect={this.addEmoji}
                            />
                          ) : null}
                        </div>
                      </div>
                    </form>
                  ) : (
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
                            <li className="list-inline-item">
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/images/record.png"
                                }
                                alt="Record"
                                height="20"
                                className="contain-img"
                              />
                            </li>
                            <li className="list-inline-item">
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/images/attachment.png"
                                }
                                alt="Attach"
                                height="20"
                                className="contain-img"
                              />
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
                                bottom: "40px",
                                right: "-5px"
                              }}
                              onSelect={this.addEmoji}
                            />
                          ) : null}
                        </div>
                      </div>
                    </form>
                  )}
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
    twilio: state.twilio
  };
}

UsersChatComponent = connect(
  mapStateToProps,
  { getUser, getChatToken }
)(UsersChatComponent);

export const UsersChat = withRouter(UsersChatComponent);
