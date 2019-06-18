import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { inputField } from "../../../shared/inputs/inputField";
import { textareaField } from "../../../shared/inputs/textareaField";
import { withRouter } from "react-router-dom";
import ReactPlayer from "react-player";

export class SpeedUpModalComponent extends Component {
  myFormHandler = values => {
    console.log(values);
  };
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
        height: "auto",
        borderWidth: 0,
        padding: 0
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 2
      }
    };
    const {
      isSpeedUpOpen,
      closeSpeedUpModal,
      handleSubmit,
      submitting
    } = this.props;
    return (
      <React.Fragment>
        <Modal
          style={customStyles}
          ariaHideApp={false}
          isOpen={isSpeedUpOpen}
          onRequestClose={closeSpeedUpModal}
          closeRefundModal={closeSpeedUpModal}
        >
          <ReactPlayer
            url="https://hemma.ams3.cdn.digitaloceanspaces.com/videos/videos/20a57d73-a232-417b-bcdd-e5bdef18cca0.mp4"
            playing={false}
            controls={false}
            width="100%"
            height="100%"
          />

          {/* <img
            src={process.env.PUBLIC_URL + "/assets/images/course1.png"}
            alt="Speed up image"
            width="100%"
            height="auto"
          /> */}
        </Modal>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.SpeedUpModal && state.form.SpeedUpModal.values
  };
}

SpeedUpModalComponent = reduxForm({
  form: "SpeedUp"
  // validate
})(SpeedUpModalComponent);

SpeedUpModalComponent = connect(mapStateToProps)(SpeedUpModalComponent);

export const SpeedUpModal = withRouter(SpeedUpModalComponent);
