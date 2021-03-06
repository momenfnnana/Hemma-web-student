import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UsersChatComponent from "../../../chat/chat";
import { apiBaseUrl } from "../../../../api/helpers";
import axios from "axios";
import "./styles.sass";

import firebase from "../../../../firebase";

export class DiscussionDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discussionDetails: [],
      channelsRef: firebase.database().ref("channels"),
    };
  }

  async componentDidMount() {
    const discussionId = this.props.match.params.discussionId;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${apiBaseUrl}/discussions/${discussionId}`, { headers })
      .then((response) => {
        this.setState({ discussionDetails: response.data.data }, () => this.createChannel());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createChannel = () => {
    const { channelsRef } = this.state;
    const { chatChannelSid } = this.state.discussionDetails;
    const key = chatChannelSid;
    const newChannel = {
      id: key,
    };
    channelsRef
      .child(key)
      .update(newChannel)
  };

  render() {
    const startsAt = new Date(
      this.state.discussionDetails && this.state.discussionDetails.startsAt
    );
    const startDate = startsAt.toLocaleString();
    const endsAt = new Date(
      this.state.discussionDetails && this.state.discussionDetails.endsAt
    );
    const endDate = endsAt.toLocaleString();

    return (
      <React.Fragment>
        <div className="row no-gutters">
          <div className="col-12">
            <div className="box-layout shadow-sm mb-4">
              <div className="discussion-item pt-4 unset-height">
                <div className="media d-flex align-items-center mb-3">
                  <div className="media-body">
                    <h6 className="dark-text">
                      {this.state.discussionDetails &&
                        this.state.discussionDetails.title}
                    </h6>
                    <div className="d-flex align-items-center">
                      <h6 className="dark-silver-text smaller mb-0 mr-3">
                        ????:{" "}
                        <span className="en-text" dir="ltr">
                          {startDate}
                        </span>
                      </h6>
                      <h6 className="dark-silver-text smaller mb-0">
                        ??????:{" "}
                        <span className="en-text" dir="ltr">
                          {endDate}
                        </span>
                      </h6>
                    </div>
                  </div>
                  <div className="d-flex flex-column align-items-end justify-content-end">
                    {this.state.discussionDetails &&
                      this.state.discussionDetails.active == true ? (
                        <span className="badge light-bg text-white">??????????</span>
                      ) : (
                        <span className="badge red-bg text-white">????????</span>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.discussionDetails &&
          this.state.discussionDetails.forceInternalChat && (
            <UsersChatComponent
              chatChannelSid={this.state.discussionDetails.chatChannelSid}
              forceInternalChat={this.state.discussionDetails.forceInternalChat}
              active={this.state.discussionDetails && this.state.discussionDetails.active}
            />
          )}
      </React.Fragment>
    );
  }
}

export const DiscussionDetails = withRouter(DiscussionDetailsComponent);
