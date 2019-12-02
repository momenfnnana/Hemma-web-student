import React, { Component } from "react";
import { FaCircle } from "react-icons/fa";
import UsersList from "./users";
import { changeChannel } from "../../../../actions/chat.actions";
import { connect } from "react-redux";

class ChatList extends Component {
  componentDidMount = async () => {
    this.initiateGeneralChat();
  };

  async initiateGeneralChat() {
    // this.props.changeChannel("sid", this.props.generalChatId);
    // const client = await this.props.twilio.chatClient;
    // client
    //   .getChannelBySid(this.props.generalChatId)
    //   .then(channel => {
    //     client.on("channelJoined", function(channel) {
    //       console.log("Joined channel " + channel.friendlyName);
    //     });
    //     channel.join().catch(function(err) {
    //       console.error(
    //         "Couldn't join channel " + channel.friendlyName + " because " + err
    //       );
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     this.setState({ loading: false });
    //   });
  }

  render() {
    return (
      <React.Fragment>
        {/* Insert condition here */}
        <h6
          className="media chat-item pb-2 pt-2 d-flex align-items-center clickable light-text small"
          onClick={() =>
            this.props.changeChannel("sid", this.props.generalChatId)
          }
          style={{
            backgroundColor:
              this.props.activeChannel == "sid" ? "#f7f7f7" : null
          }}
        >
          <FaCircle size={9} className="mr-1" /> دردشة للجميع
        </h6>
        {/* Insert condition here */}

        <UsersList courseId={this.props.courseId} />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeChannel: state.chat.channel,
    activeChannelId: state.chat.id,
    twilio: state.twilio
  };
}

const mapDispatchToProps = {
  changeChannel: changeChannel
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatList);
