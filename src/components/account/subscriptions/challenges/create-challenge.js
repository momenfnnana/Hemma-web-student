import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { inputField } from "../../../shared/inputs/inputField";
import { selectField } from "../../../shared/inputs/selectField";
import { textareaField } from "../../../shared/inputs/textareaField";
import { withRouter } from "react-router-dom";

export class ChallengeComponent extends Component {
  render() {
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "35%",
        height: "auto",
        borderWidth: 0,
        padding: 20
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 2
      }
    };
    const {
      isChallengeOpen,
      closeChallenge,
      handleSubmit,
      submitting
    } = this.props;

    return (
      <React.Fragment>
        <Modal
          style={customStyles}
          ariaHideApp={false}
          isOpen={isChallengeOpen}
          onRequestClose={closeChallenge}
          closeChallenge={closeChallenge}
        >
          <div className="container h-100 pt-3 pb-3 w-75 mx-auto">
            <div className="row">
              <div className="col-12 d-flex align-items-center justify-content-center flex-column">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/searching.png"}
                  height="50"
                  width="50"
                  className="contain-img mb-3"
                />
                <h6 className="mid-text mb-4 mt-0">جار البحث عن منافس</h6>

                <button className="btn light-btn w-50">أرغب بتحدي نفسي</button>
                <h6 className="mid-text small mt-4">إلغاء التحدي</h6>
              </div>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.Challenge && state.form.Challenge.values
  };
}

ChallengeComponent = reduxForm({
  form: "Challenge"
})(ChallengeComponent);

ChallengeComponent = connect(mapStateToProps)(ChallengeComponent);

export const Challenge = withRouter(ChallengeComponent);
