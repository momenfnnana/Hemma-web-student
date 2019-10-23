import React, { Component } from "react";
import axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";
import { changeChannel } from "../../../../actions/chat.actions";
import { connect } from "react-redux";

class UsersList extends Component {
  state = {
    instructors: []
  };

  componentDidMount = () => {
    const courseId = this.props.courseId;
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
  };

  async initiatePrivateChat(id) {
    const courseId = this.props.courseId;
    this.props.changeChannel(
      "uniqueName",
      courseId + "_" + id + "_" + this.props.user.id
    );
    const client = await this.props.twilio.chatClient;
    client
      .getChannelByUniqueName(this.props.activeChannelId)
      .then(channel => {
        channel.join();
        channel.on("channelInvited", function(channel) {
          channel.join();
        });
      })
      .catch(err => {
        client
          .createChannel({
            uniqueName: this.props.activeChannelId
          })
          .then(function joinChannel(channel) {
            channel.join();
            channel.invite(id);
          })
          .catch(error => {
            console.log(error);
          });
        console.log(err);
      });
  }

  render() {
    const instructors = this.state.instructors;
    const courseId = this.props.courseId;

    if (instructors) {
      return instructors.map(instructor => (
        <div
          className="media chat-item d-flex align-items-center clickable h-55"
          onClick={() => this.initiatePrivateChat(instructor.id)}
          style={{
            backgroundColor:
              this.props.activeChannel == "uniqueName" &&
              this.props.activeChannelId ==
                courseId + "_" + instructor.id + "_" + this.props.user.id
                ? "#f7f7f7"
                : null
          }}
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
}

function mapStateToProps(state) {
  return {
    activeChannel: state.chat.channel,
    activeChannelId: state.chat.id,
    user: state.user,
    twilio: state.twilio
  };
}

const mapDispatchToProps = {
  changeChannel: changeChannel
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
