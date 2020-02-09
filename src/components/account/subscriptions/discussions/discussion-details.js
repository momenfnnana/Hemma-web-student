import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../../../actions/user.actions";
import { getChatToken } from "../../../../actions/twilio.actions";
import { UsersChatComponent } from "./chat/chat";
import { apiBaseUrl } from "../../../../api/helpers";
import { reduxForm } from "redux-form";
import axios from "axios";
import "./styles.sass";

export class DiscussionDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discussionDetails: []
    };
  }

  async componentDidMount() {
    const discussionId = this.props.match.params.discussionId;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${apiBaseUrl}/discussions/${discussionId}`, { headers })
      .then(response => {
        this.setState({ discussionDetails: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const courseId = this.props.match.params.id;
    const startsAt = new Date(
      this.state.discussionDetails && this.state.discussionDetails.startsAt
    );
    const startDate = startsAt.toLocaleString();
    const endsAt = new Date(
      this.state.discussionDetails && this.state.discussionDetails.endsAt
    );
    const endDate = endsAt.toLocaleString();
    console.log(
      "sid ",
      this.state.discussionDetails &&
        this.state.discussionDetails.chatChannelSid
    );
    return (
      <React.Fragment>
        <div className="row no-gutters">
          <div className="col-12">
            <div className="box-layout shadow-sm">
              <div className="discussion-item pt-4 unset-height">
                <div className="media d-flex align-items-center mb-3">
                  <div className="media-body">
                    <h6 className="dark-text">
                      {this.state.discussionDetails &&
                        this.state.discussionDetails.title}
                    </h6>
                    <div className="d-flex align-items-center">
                      <h6 className="dark-silver-text smaller mb-0 mr-3">
                        من:{" "}
                        <span className="en-text" dir="ltr">
                          {startDate}
                        </span>
                      </h6>
                      <h6 className="dark-silver-text smaller mb-0">
                        إلى:{" "}
                        <span className="en-text" dir="ltr">
                          {endDate}
                        </span>
                      </h6>
                    </div>
                  </div>
                  <div className="d-flex flex-column align-items-end justify-content-end">
                    {this.state.discussionDetails &&
                    this.state.discussionDetails.active == true ? (
                      <span className="badge light-bg text-white">مفتوح</span>
                    ) : (
                      <span className="badge red-bg text-white">مغلق</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.discussionDetails &&
          this.state.discussionDetails.chatChannelSid && (
            <UsersChatComponent
              chatChannelSid={this.state.discussionDetails.chatChannelSid}
              courseId={courseId}
            />
          )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues:
      state.form.DiscussionDetails && state.form.DiscussionDetails.values,
    authenticated: state.auth.authenticated,
    user: state.user,
    twilio: state.twilio
  };
}

DiscussionDetailsComponent = reduxForm({
  form: "DiscussionDetails"
})(DiscussionDetailsComponent);

DiscussionDetailsComponent = connect(
  mapStateToProps,
  { getUser, getChatToken }
)(DiscussionDetailsComponent);

export const DiscussionDetails = withRouter(DiscussionDetailsComponent);
