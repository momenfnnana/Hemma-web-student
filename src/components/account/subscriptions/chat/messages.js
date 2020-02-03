import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-spin-fade-loader.scss";
import "loaders.css/src/animations/ball-clip-rotate.scss";
import { getUser } from "../../../../actions/user.actions";
import axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";
import MessageInput from "./message-input";

class MessagesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      twilioMessages: [],
      users: {},
      initialState: false
    };
    this.convertMessage = this.convertMessage.bind(this);
    this.messageAdded = this.messageAdded.bind(this);
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

    let time = twilioMessage.timestamp;
    let messageTime =
      time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear();

    return {
      id: twilioMessage.sid,
      author: twilioMessage.author,
      type: type,
      body: type === "text" ? twilioMessage.body : null,
      time: messageTime
    };
  }

  componentDidMount = async () => {
    this.props.getUser();
    this.setState({ initialState: true });
  };

  async unsubFromChannel(type, id) {
    let channel;
    const client = await this.props.twilio.chatClient;

    switch (type) {
      case "uniqueName":
        channel = await client.getChannelByUniqueName(id);
        break;

      case "sid":
        channel = await client.getChannelBySid(id);
        break;

      default:
        return;
    }

    if (channel) {
      // Unsubscribe
      channel.removeAllListeners();
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.activeChannelId !== this.props.activeChannelId) {
      await this.unsubFromChannel(
        prevProps.activeChannel,
        prevProps.activeChannelId
      );
      this.setState({ initialState: false });

      const client = await this.props.twilio.chatClient;
      if (this.props.activeChannel == "sid") {
        // subscribe to new channel
        client
          .getChannelBySid(this.props.activeChannelId)
          .then(channel => {
            channel.getMessages().then(paginator => {
              const channelMessages = paginator.items;
              const messages = channelMessages.map(this.convertMessage);
              this.setState({
                messages: messages,
                twilioMessages: channelMessages,
                paginator: paginator,
                initialState: false
              });

              channel.on("messageAdded", this.messageAdded);
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.props.activeChannel == "uniqueName") {
        // subscribe to new channel
        client
          .getChannelByUniqueName(this.props.activeChannelId)
          .then(channel => {
            channel.getMessages().then(paginator => {
              const channelMessages = paginator.items;
              const messages = channelMessages.map(this.convertMessage);
              this.setState({
                messages: messages,
                twilioMessages: channelMessages,
                paginator: paginator,
                initialState: false
              });

              channel.on("messageAdded", this.messageAdded);
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }

  messageAdded(twilioMessage) {
    const newMessage = this.convertMessage(twilioMessage);
    this.setState((prevState, props) => ({
      twilioMessages: [...prevState.twilioMessages, twilioMessage],
      messages: [...prevState.messages, newMessage]
    }));
  }

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
                <div className="message my-message text-white light-font-text bg-transparent">
                  <img
                    src={message.url}
                    alt="Chat img"
                    height="200"
                    className="contain-img"
                  />
                  <span
                    className="en-text smaller silver-text"
                    style={{ position: "absolute", left: 10, bottom: 5 }}
                  >
                    {message.time}
                  </span>
                </div>
              )}
              {message.type == "text" && (
                <div className="message my-message text-white light-font-text">
                  {message.body}{" "}
                  <span
                    className="en-text smaller silver-text"
                    style={{ position: "absolute", left: 10, bottom: 5 }}
                  >
                    {message.time}
                  </span>
                </div>
              )}
              {message.type == "audio" && message.url && (
                <div className="message my-message text-white light-font-text bg-transparent">
                  <audio controls className="w-100">
                    <source src={message.url} />
                  </audio>
                  <span
                    className="en-text smaller silver-text"
                    style={{ position: "absolute", left: 10, bottom: 5 }}
                  >
                    {message.time}
                  </span>
                </div>
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
                  <div className="message other-message dark-text light-font-text bg-transparent">
                    <img
                      src={message.url}
                      alt="Chat img"
                      height="200"
                      className="contain-img"
                    />
                    <span
                      className="en-text smaller mid-text"
                      style={{ position: "absolute", left: 10, bottom: 5 }}
                    >
                      {message.time}
                    </span>
                  </div>
                )}
                {message.type == "text" && (
                  <div className="message other-message dark-text light-font-text">
                    {message.body}{" "}
                    <span
                      className="en-text smaller mid-text"
                      style={{ position: "absolute", left: 10, bottom: 5 }}
                    >
                      {message.time}
                    </span>
                  </div>
                )}
                {message.type == "audio" && message.url && (
                  <div className="message other-message dark-text light-font-text bg-transparent">
                    <audio controls className="w-100">
                      <source src={message.url} />
                    </audio>
                    <span
                      className="en-text smaller mid-text"
                      style={{ position: "absolute", left: 10, bottom: 5 }}
                    >
                      {message.time}
                    </span>
                  </div>
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

  render() {
    return (
      <div className="chat-window">
        {this.state.initialState ? (
          <React.Fragment>
            <div className="chat-history d-flex align-items-center justify-content-center flex-column">
              <img
                src={process.env.PUBLIC_URL + "/assets/images/chatting.png"}
                alt="Record"
                height="60"
                className="contain-img mb-3"
              />
              <h6 className="silver-text">اختر محادثة لبدء الدردشة</h6>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {!this.state.initialState &&
            (this.state.messages == undefined ||
              this.state.messages.length == 0) ? (
              <React.Fragment>
                <div className="chat-history d-flex align-items-center justify-content-center flex-column">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/chatting.png"}
                    alt="Record"
                    height="60"
                    className="contain-img mb-3"
                  />
                  <h6 className="silver-text">ارسل رسالة لبدء المحادثة</h6>
                </div>
              </React.Fragment>
            ) : (
              <div
                className="chat-history"
                ref={component => (this.listWrapperEl = component)}
              >
                <ul className="list-unstyled">{this.renderMessages()}</ul>
              </div>
            )}
            <MessageInput />
          </React.Fragment>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeChannel: state.chat.channel,
    activeChannelId: state.chat.id,
    twilio: state.twilio,
    authenticated: state.auth.authenticated,
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { getUser }
)(MessagesList);
