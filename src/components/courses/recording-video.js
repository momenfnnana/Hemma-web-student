import React, { Component } from "react";
import Modal from "react-modal";
import ReactPlayer from "react-player";
import { Api } from "../../api";

export default class RecordingVideo extends Component {
  state = {
    recordingUrl: ""
  };
  shouldComponentUpdate(nextProps) {
    if (
      nextProps &&
      this.props.recordingUrl !== nextProps.recordingUrl &&
      nextProps.recordingUrl !== null
    ) {
      this.setState({
        recordingUrl: nextProps.recordingUrl
      });
      Api.getUnAuthenticatedAxios()
        .get(`Lectures/${nextProps.selectedLecture}/vdocipher_token`, {})
        .then(response => {
          const videoID = nextProps.recordingUrl;
          if (videoID) {
            new window.VdoPlayer({
              otp: response.data.data.otp,
              playbackInfo: btoa(
                JSON.stringify({
                  videoId: videoID
                })
              ),
              theme: "9ae8bbe8dd964ddc9bdb932cca1cb59a",
              // the container can be any DOM element on website
              container: document.querySelector("#embedBox")
            });
          }
        });
    }
    return true;
  }
  render() {
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        height: "50%",
        borderWidth: 0,
        padding: 10
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 2
      }
    };
    return (
      <React.Fragment>
        <Modal
          style={customStyles}
          ariaHideApp={false}
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.props.toggleRecordingModal}
          toggle={this.props.toggleRecordingModal}
        >
          <button
            className="btn close-modal"
            onClick={this.props.toggleRecordingModal}
          >
            <img
              src={process.env.PUBLIC_URL + "/assets/images/close.png"}
              height="12"
              alt="close"
            />
          </button>
          {this.state.recordingUrl && (
            <div id="embedBox" style={{ height: "100%", width: "100%" }}></div>
          )}
        </Modal>
      </React.Fragment>
    );
  }
}
