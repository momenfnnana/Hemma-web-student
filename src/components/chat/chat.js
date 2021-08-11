import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurrentChannel } from "../../actions";
import MessagesHeader from "./messages/messages-header";
import Messages from "./messages/messages";
import firebase from "../../firebase";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-spin-fade-loader.scss";
class UsersChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    if(this.props.forceInternalChat == true)
    this.setState('channelRef',firebase.database().ref(`channels/${props.chatChannelSid}`));
  }

  componentDidMount() {
    if(this.props.forceInternalChat == true)
        this.addListeners();
  }

  componentWillUnmount() {
    this.props.setCurrentChannel(null);
  }

  addListeners = () => {
    this.state.channelRef.once("value", (snapshot) =>
      this.props.setCurrentChannel(snapshot.val())
    ).then(() => {
      this.setState({
        loading: false,
      });
    });
  };

  render() {
    const { messagesRef, loading } = this.state;
    const { channel, user, forceInternalChat, active } = this.props;
    return (
      <React.Fragment>
        {forceInternalChat ?
          <>
            {loading ? (
              <div className="box-layout shadow-sm w-100">
                <div className="row no-gutters">
                  <div className="col-md-12">
                    <MessagesHeader />
                    <div className="chat-window">
                      <div className="chat-history d-flex justify-content-center align-items-center">
                        <Loader type="ball-spin-fade-loader" className="dark-loader" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
                <>
                  {channel && (
                    <div className="box-layout shadow-sm w-100">
                      <div className="row no-gutters">
                        <div className="col-md-12">
                          <MessagesHeader />
                          <div className="chat-window">
                            <Messages
                              messagesRef={messagesRef}
                              channel={channel}
                              user={user}
                              active={active}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
          </>
          :
          <div
            className="chat-title bg-white border h-55 d-flex align-items-center justify-content-center mb-4 rounded shadow-sm clickable"
            onClick={() =>
              window.open(this.props.externalChannelUrl, "_blank")
            }
          >
            <h6 className="media chat-item mb-0 d-flex align-items-center light-text small cursor-poiner">
              رابط مجموعة التيليجرام
            </h6>
          </div>
        }
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    channel: state.channel.currentChannel,
    user: state.user,
  };
}

const mapDispatchToProps = {
  setCurrentChannel,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersChatComponent);
