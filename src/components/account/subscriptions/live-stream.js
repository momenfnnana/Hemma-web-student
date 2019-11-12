import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";
import { TabContent, TabPane, Nav, NavItem, NavLink, Input } from "reactstrap";
import classnames from "classnames";
import {
  CollapsibleComponent,
  CollapsibleHead,
  CollapsibleContent
} from "react-collapsible-component";
import Modal from "react-modal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../../actions/user.actions";
import { getChatToken } from "../../../actions/twilio.actions";
import firebase from "firebase";
import axios from "axios";
import { apiBaseUrl } from "../../../api/helpers";
import "./styles.sass";

export class LiveStreamComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 3,
      activeTab: "1",
      modalIsOpen: false,
      showRating: false,
      newMessage: "",
      messages: [],
      generalMessages: [],
      generalChannel: "",
      toggleChat: false,
      users: {}
    };

    this.toggle = this.toggle.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
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

  async componentDidMount() {
    if (this.props.authenticated) {
      this.props.getUser();
      this.props.getChatToken().then(() => this.initiateGeneralChat());
    }

    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    const lectureID = this.props.match.params.lectureId;
    axios
      .get(`${apiBaseUrl}/content/lectures/${lectureID}`, {
        headers
      })
      .then(response => {
        this.setState({ details: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
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
          // for (let i = 0; i < totalMessages; i++) {
          const channelMessages = messages.items;
          this.setState({ messages: channelMessages });
          // this.loadUsers();
          // }
        });
        channel.on("messageAdded", this.messageAdded);
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

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.authenticated && this.props.authenticated) {
      this.props.getUser();
    }
  }

  onMessageChanged = event => {
    this.setState({ newMessage: event.target.value });
  };

  sendMessage = event => {
    event.preventDefault();
    const message = this.state.newMessage;
    this.setState({ newMessage: "" });
    this.props.twilio.chatClient.then(client => {
      client.getChannelBySid(this.props.chatChannelSid).then(channel => {
        channel.sendMessage(message);
        // channel.getMessages().then(this.messagesLoaded);
      });
    });
  };

  // messagesLoaded = messagePage => {
  //   this.setState({ messages: messagePage.items });
  // };

  messageAdded = message => {
    // this.loadUsers();
    this.setState((prevState, props) => ({
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
    return messages.map(message => {
      const user = this.getUser(message.author);
      return (
        <React.Fragment>
          <div
            className="chat-message"
            ref={this.newMessageAdded}
            key={message.id}
          >
            <div className="d-flex align-items-center">
              {user && (
                <h6 className="mid-text smaller mt-0 mb-0">{user.name}</h6>
              )}
            </div>

            <div className="speech-bubble">
              <p className="light-font-text mt-0 mb-0">{message.body}</p>
            </div>
          </div>
        </React.Fragment>
      );
    });
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { rating } = this.state;
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "35%",
        height: "20%",
        borderWidth: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 2
      }
    };
    return (
      <React.Fragment>
        <section className="header pt-3 pb-3 h-80 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-6 d-flex align-items-center">
                {/* <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/female-circle.png"
                  }
                  className="mr-2"
                  height="25"
                /> */}
                <div className="d-flex justify-content-center flex-column">
                  <h6 className="mid-text smaller mb-0 mt-0">
                    {" "}
                    {this.state.details &&
                      this.state.details.instructor &&
                      this.state.details.instructor.name}
                  </h6>
                  {/* <StarRatingComponent
                    starCount={5}
                    value={rating}
                    starColor={"#ffe552"}
                    emptyStarColor={"#a9acb4"}
                    editing={false}
                    name="rate"
                  /> */}
                </div>
                {/* <div className="light-bg rounded ml-2">
                  <p className="text-white small en-text mb-0 pt-1 pb-1 pl-2 pr-2">
                    10:54
                  </p>
                </div> */}
              </div>
              <div className="col-md-4 col-6 d-flex align-items-center justify-content-center">
                <h5 className="dark-text mt-0 mb-0">
                  {this.state.details && this.state.details.nameAr}
                </h5>
              </div>
              {/* <div className="col-md-4 col-12 d-flex align-items-center justify-content-end responsive-margin">
                <ul className="list-inline mb-0 d-flex align-items-center">
                  <li
                    className="list-inline-item small ml-2 red-text clickable"
                    onClick={this.openModal}
                  >
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/logout.png"}
                      className="mr-2"
                      height="15"
                    />
                    خروج
                  </li>
                </ul>

                <Modal
                  isOpen={this.state.modalIsOpen}
                  style={customStyles}
                  contentLabel="Logout Modal"
                >
                  {this.state.showRating == true ? null : (
                    <div className="container">
                      <div className="row">
                        <div className="col-12 text-center">
                          <h6 className="dark-text mb-4">
                            هل أنت متأكد من أنك تريد الخروج؟
                          </h6>
                          <button
                            type="button"
                            className="btn light-outline-btn w-25 mr-2 unset-height"
                            onClick={() => this.setState({ showRating: true })}
                          >
                            نعم
                          </button>
                          <button
                            type="button"
                            className="btn dark-outline-btn w-25 unset-height"
                            onClick={this.closeModal}
                          >
                            لا
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {this.state.showRating == true ? (
                    <div className="container">
                      <div className="row">
                        <div className="col-12 text-center">
                          <h6 className="dark-text">تقييم الحصة </h6>
                          <p className="dark-text light-font-text small mb-2">
                            كم تقييم الحصة من 5؟ (التقييم سري)
                          </p>
                          <div className="d-flex justify-content-center mb-3">
                            <StarRatingComponent
                              starCount={5}
                              value={rating}
                              starColor={"#ffe552"}
                              emptyStarColor={"#a9acb4"}
                              name="rate"
                            />
                          </div>
                          <button
                            type="button"
                            className="btn light-outline-btn w-40 mr-2 unset-height"
                            onClick={() =>
                              this.props.history.push(
                                "/subscriptions/details/schedule"
                              )
                            }
                          >
                            أرسل التقييم
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </Modal>
              </div> */}
            </div>
          </div>
        </section>

        <section className="page-content pt-3 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-12">
                <CollapsibleComponent>
                  <CollapsibleHead className="rounded h-45 d-flex align-items-center">
                    <img
                      src={
                        process.env.PUBLIC_URL + "/assets/images/light-chat.png"
                      }
                      className="mr-2 contain-img"
                      height="20"
                    />
                    <h6 className="light-silver-text small mt-0 mb-0">دردشة</h6>
                  </CollapsibleHead>
                  <CollapsibleContent
                    className="chat-collapse"
                    isExpanded={true}
                  >
                    <Nav tabs className="chat-tabs border-0">
                      <NavItem className="w-100 mb-0">
                        <NavLink
                          className={classnames({
                            active: this.state.activeTab === "1"
                          })}
                          onClick={() => {
                            this.toggle("1");
                          }}
                        >
                          الطلاب
                        </NavLink>
                      </NavItem>
                      {/* <NavItem className="w-50 mb-0">
                        <NavLink
                          className={classnames({
                            active: this.state.activeTab === "2"
                          })}
                          onClick={() => {
                            this.toggle("2");
                          }}
                        >
                          المشرفين
                        </NavLink>
                      </NavItem> */}
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <div className="chat-box pl-3 pr-3 pt-2">
                          {this.renderMessages()}
                        </div>

                        <form
                          className="chat-input d-flex align-items-center justify-content-between"
                          onSubmit={this.sendMessage}
                        >
                          <Input
                            placeholder="شارك أصدقاءك"
                            type="text"
                            name="message"
                            id="message"
                            onChange={this.onMessageChanged}
                            value={this.state.newMessage}
                            className="form-control border-0 bg-transparent light-font-text smaller dark-silver-text"
                          />
                          <button className="btn circle-btn mr-2">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/send-button.png"
                              }
                              height="12"
                              className="contain-img"
                            />
                          </button>
                        </form>
                      </TabPane>
                      {/* <TabPane tabId="2">
                        {this.state.toggleChat == false ? (
                          <div
                            className="d-flex align-items-center justify-content-between chat-item clickable"
                            onClick={() =>
                              this.setPrivateChannel(
                                "39887e6a-5a3a-4128-9b23-90778d4a27b6"
                              )
                            }
                          >
                            <div className="d-flex align-items-center">
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/images/user-circle.png"
                                }
                                className="mr-2"
                                height="20"
                              />
                              <h6 className="mid-text smaller mt-0 mb-0">
                                محمد أحمد
                              </h6>
                            </div>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/dark-chat.png"
                              }
                              className="chat-img"
                              height="15"
                            />
                          </div>
                        ) : (
                          <React.Fragment>
                            <div className="chat-box pl-3 pr-3 pt-2">
                              {this.renderMessages()}
                            </div>

                            <div
                              className="chat-header d-flex align-items-center justify-content-start clickable"
                              onClick={() =>
                                this.setState({ toggleChat: false })
                              }
                            >
                              <FaChevronRight
                                className="mid-text mr-1"
                                size="11"
                              />
                              <h6 className="mid-text smaller mt-0 mb-0">
                                محمد أحمد
                              </h6>
                            </div>

                            <form
                              className="chat-input d-flex align-items-center justify-content-between"
                              onSubmit={this.sendMessage}
                            >
                              <Input
                                placeholder="شارك أصدقاءك"
                                type="text"
                                name="message"
                                id="message"
                                onChange={this.onMessageChanged}
                                value={this.state.newMessage}
                                className="form-control border-0 bg-transparent light-font-text smaller dark-silver-text"
                              />
                              <button className="btn circle-btn mr-2">
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/assets/images/send-button.png"
                                  }
                                  height="12"
                                  className="contain-img"
                                />
                              </button>
                            </form>
                          </React.Fragment>
                        )}
                      </TabPane> */}
                    </TabContent>
                  </CollapsibleContent>

                  {/* <CollapsibleHead className="rounded h-45 d-flex align-items-center">
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/trophy.png"}
                      className="mr-2 contain-img"
                      height="20"
                    />
                    <h6 className="light-silver-text small mt-0 mb-0">
                      لوحة الشرف
                    </h6>
                  </CollapsibleHead> */}
                  {/* <CollapsibleContent>
                    <div className="box-layout pt-3 pb-3">
                      <div className="d-flex align-items-center justify-content-between list-item">
                        <div className="d-flex align-items-center">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/user-circle.png"
                            }
                            className="mr-2"
                            height="20"
                          />
                          <h6 className="mid-text smaller mt-0 mb-0">
                            عمر الشريف
                          </h6>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="en-text dark-text small">20</span>
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/coins.png"
                            }
                            height="15"
                            className="ml-2"
                          />
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between list-item">
                        <div className="d-flex align-items-center">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/user-circle.png"
                            }
                            className="mr-2"
                            height="20"
                          />
                          <h6 className="mid-text smaller mt-0 mb-0">
                            عمر الشريف
                          </h6>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="en-text dark-text small">20</span>
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/coins.png"
                            }
                            height="15"
                            className="ml-2"
                          />
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between list-item">
                        <div className="d-flex align-items-center">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/user-circle.png"
                            }
                            className="mr-2"
                            height="20"
                          />
                          <h6 className="mid-text smaller mt-0 mb-0">
                            عمر الشريف
                          </h6>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="en-text dark-text small">20</span>
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/coins.png"
                            }
                            height="15"
                            className="ml-2"
                          />
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent> */}
                </CollapsibleComponent>
                {/* 
                <CollapsibleHead className="rounded h-45 d-flex align-items-center">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/trophy.png"}
                    className="mr-2 contain-img"
                    height="20"
                  />
                  <h6 className="light-silver-text small mt-0 mb-0">الأسئلة</h6>
                </CollapsibleHead> */}
              </div>
              <div className="col-md-9 col-12">
                <div className="box-layout mb-3">
                  {this.state.details && this.state.details.broadcastUrl && (
                    <div className="iframeWrapper">
                      <iframe
                        src={`https://hemma.sa/webinar.html?id=${this.state.details.broadcastUrl}`}
                        width="100%"
                        height="600"
                        frameBorder="0"
                        className="mb-0 rounded"
                      />
                    </div>
                  )}
                </div>

                {/* <div className="row d-flex align-items-center justify-content-between">
                  <div className="col-md-6 col-12 d-flex align-items-center">
                    <div className="btn d-flex align-items-center light-silver-bg border mr-2 h-40 border">
                      <div className="d-flex align-items-center">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/user-circle.png"
                          }
                          className="mr-2"
                          height="20"
                        />
                        <h6 className="mid-text smaller mt-0 mb-0">
                          محمد أحمد
                        </h6>
                      </div>
                      <div className="vertical-separator" />
                      <div className="d-flex align-items-center">
                        <h6 className="en-text mid-text small mt-0 mb-0">20</h6>
                        <img
                          src={
                            process.env.PUBLIC_URL + "/assets/images/coins.png"
                          }
                          className="ml-2"
                          height="18"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn light-silver-bg border h-40"
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/sound-on.png"
                        }
                        className="contain-img"
                        height="18"
                      />
                    </button>
                  </div>

                  <div className="col-md-6 col-12 d-flex align-items-center justify-content-end responsive-margin">
                    <button type="button" className="btn blue-border-btn mr-2">
                      مفهوم
                    </button>
                    <button type="button" className="btn red-border-btn">
                      غير مفهوم
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
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

LiveStreamComponent = connect(
  mapStateToProps,
  { getUser, getChatToken }
)(LiveStreamComponent);

export const LiveStream = withRouter(LiveStreamComponent);
