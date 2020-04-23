import React, { Component } from "react";
import Modal from "react-modal";
import ReactPlayer from "react-player";

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
      this.setState({ recordingUrl: nextProps.recordingUrl });
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
      <Modal
        style={customStyles}
        ariaHideApp={false}
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.props.toggleRecordingModal}
        toggle={this.props.toggleRecordingModal}
      >
        <ReactPlayer
          url={this.props.recordingUrl}
          playing={true}
          controls={true}
          width="100%"
          height="100%"
        />
      </Modal>
    );
  }
}
