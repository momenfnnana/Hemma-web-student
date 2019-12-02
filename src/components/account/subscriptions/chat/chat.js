import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../../../actions/user.actions";
import { getChatToken } from "../../../../actions/twilio.actions";
import ChatList from "./chat-list";
import MessagesList from "./messages";
import MessageInput from "./message-input";

import firebase from "firebase";
import axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";
import { Field, reduxForm } from "redux-form";
import ReactDOM from "react-dom";

import "../styles.sass";

export class UsersChatComponent extends Component {
  componentDidMount = () => {
    this.props.getChatToken().then(token => {
      this.props.twilio.chatClient.then(client => {});
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12 mb-4">
            <div className="d-flex justify-content-between">
              <h6 className="dark-text small mb-0 mt-0">الدردشة</h6>
            </div>
          </div>
        </div>

        {this.props.chatChannelSid.startsWith("http") && (
          <div className="row">
            <div className="col-md-12">
              <div
                className="chat-title border h-55 d-flex align-items-center justify-content-center mb-4 rounded shadow-sm clickable"
                onClick={() => window.open(this.props.chatChannelSid, "_blank")}
              >
                <h6 className="media chat-item mb-0 d-flex align-items-center light-text small">
                  رابط مجموعة التيليجرام
                </h6>
              </div>
            </div>
          </div>
        )}

        <div className="box-layout shadow-sm w-100">
          <div className="row no-gutters">
            <div className="chat-sidebar col-md-4 border-right">
              <div className="p-3">
                <input
                  className="form-control small light-font-text"
                  placeholder="ابحث هنا"
                />
              </div>
              {this.props.chatChannelSid && (
                <ChatList
                  courseId={this.props.match.params.id}
                  generalChatId={this.props.chatChannelSid}
                />
              )}
            </div>
            <div className="col-md-8">
              <div className="chat-title border-bottom h-55 d-flex align-items-center justify-content-center">
                <h6 className="dark-text small mb-0">دردشة للجميع</h6>
              </div>
              <MessagesList />
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
