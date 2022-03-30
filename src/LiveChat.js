import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "./actions/user.actions";
import { LiveChatWidget } from "@livechat/widget-react";

class LiveChat extends Component {
  handleNewEvent(event) {
    console.log("LiveChatWidget.onNewEvent", event);
  }

  render() {
    return (
      <LiveChatWidget
        license="13842975"
        visibility="minimized"
        onNewEvent={this.handleNewEvent}
        customerName={this.props.user ? this.props.user.name : null}
        customerEmail={this.props.user ? this.props.user.email : null}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.user,
  };
}

LiveChat = connect(mapStateToProps, { getUser })(LiveChat);

export default LiveChat;
