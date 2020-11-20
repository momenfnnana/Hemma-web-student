import React from "react";
import Message from "./message";
import MessageForm from "./message-form";
import firebase from "../../../firebase";

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messagesRef: firebase.database().ref("messages"),
      messages: []
    };
  }

  componentDidMount() {
    const { channel } = this.props;

    if (channel) {
      this.addMessageListener(channel.id);
    }
  }

  componentDidUpdate() {
    if (this.messagesEnd) {
      this.scrollToBottom();
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  addMessageListener = channelId => {
    let loadedMessages = [];
    const ref = this.state.messagesRef;
    ref.child(channelId).on("child_added", snap => {
      loadedMessages.push(snap.val());
      this.setState({
        messages: loadedMessages
      });
    });
  };

  displayMessages = messages =>
    messages.length > 0 &&
    messages.map(message => (
      <Message
        key={message.timestamp}
        message={message}
        user={this.props.user}
      />
    ));

  render() {
    const { messagesRef, messages } = this.state
    const { channel, user } = this.props;
    return (
      <React.Fragment>
        <div className="chat-history">
          <ul className="list-unstyled">
            {this.displayMessages(messages)}
            <div ref={node => (this.messagesEnd = node)} />
          </ul>
        </div>
        <MessageForm
          messagesRef={messagesRef}
          channel={channel}
          user={user}
        />
      </React.Fragment>
    );
  }
}

export default Messages;
