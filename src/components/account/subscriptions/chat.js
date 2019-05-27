import React, { Component } from "react";
import "./styles.sass";
import { FaCircle } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getProfile } from "../../../actions";

const Chat = require("twilio-chat");

// Make a secure request to your backend to retrieve an access token.
// Use an authentication mechanism to prevent token exposure to 3rd parties.

const accessToken = localStorage.getItem("chatToken");

export class UsersChatComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newMessage: "",
      messages: []
    };

    this.channel = "FristPrivateChannel";
  }
  async componentDidMount() {
    this.props.getProfile();
    let myIdentity = "user13";
    let senderIdentity = "user13";

    await Chat.Client.create(accessToken).then(client => {
      client
        .getChannelByUniqueName(myIdentity + "_" + senderIdentity)
        .then(channel => {
          console.log(channel);
        })
        .catch(err => {
          client
            .createChannel({
              isPrivate: true,
              uniqueName: myIdentity + "_" + senderIdentity
            })
            .then(function joinChannel(channel) {
              channel.join();
              console.log("created and joined channel ", channel);
            });
        });
    });
  }

  onMessageChanged = event => {
    this.setState({ newMessage: event.target.value });
  };

  sendMessage = event => {
    event.preventDefault();
    const message = this.state.newMessage;
    this.setState({ newMessage: "" });
    Chat.Client.create(accessToken).then(client => {
      client.getChannelByUniqueName("general").then(channel => {
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
    return messages.map(message => (
      <React.Fragment>
        <li className="clearfix" ref={this.newMessageAdded}>
          <div className="message-data">
            <span className="message-data-name small">محمد أحمد</span>
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
      </React.Fragment>
    ));
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
            <div className="col-md-4 p-3 border-right">
              <input
                className="form-control small light-font-text"
                placeholder="ابحث هنا"
              />
              <h6 className="light-text small h-55 d-flex align-items-center mb-1 mt-1">
                <FaCircle size={9} className="mr-1" /> دردشة للجميع
              </h6>
              <div className="media chat-item pb-3 d-flex align-items-center">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/user-circle.png"
                  }
                  alt="Chat img"
                  height="27"
                  className="contain-img mr-2"
                />
                <div className="media-body">
                  <h6 className="small mid-text mb-1">أحمد طه</h6>
                  <h6 className="dark-silver-text smaller mb-0">مشرف</h6>
                </div>
                <h6 className="smaller dark-silver-text en-text mb-0 align-self-start">
                  May, 9
                </h6>
              </div>
              <div className="media chat-item pb-3 d-flex align-items-center">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/user-circle.png"
                  }
                  alt="Chat img"
                  height="27"
                  className="contain-img mr-2"
                />
                <div className="media-body">
                  <h6 className="small mid-text mb-1">محمد عيسى</h6>
                  <h6 className="dark-silver-text smaller mb-0">مدرب</h6>
                </div>
                <h6 className="smaller dark-silver-text en-text mb-0 align-self-start">
                  May, 9
                </h6>
              </div>
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
                  <div className="input-chat">
                    <input
                      placeholder="اكتب هنا"
                      className="form-control light-font-text small"
                    />
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
                        <li className="list-inline-item">
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
                    </div>
                  </div>
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
    initialValues: state.profile,
    entireState: state
  };
}

UsersChatComponent = connect(
  mapStateToProps,
  { getProfile }
)(UsersChatComponent);

export const UsersChat = withRouter(UsersChatComponent);
