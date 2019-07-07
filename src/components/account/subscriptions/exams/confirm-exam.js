import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

export class ConfirmExamComponent extends Component {
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
      isConfirmExamOpen,
      closeConfirmExam,
      handleSubmit,
      submitting
    } = this.props;

    return (
      <React.Fragment>
        <Modal
          style={customStyles}
          ariaHideApp={false}
          isOpen={isConfirmExamOpen}
          onRequestClose={closeConfirmExam}
          closeConfirmExam={closeConfirmExam}
        >
          <div className="container h-100 pt-3 pb-3 w-75 mx-auto">
            <div className="row">
              <div className="col-12 d-flex align-items-center justify-content-center flex-column text-center">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/not-verified.png"
                  }
                  height="50"
                  width="50"
                  className="contain-img mb-3"
                />
                <h6 className="dark-text mb-4 mt-0">
                  هناك سؤالين لم تقم بالاجابة عليهما هل أنت متأكد من أنك تريد
                  ارسال الاجابات؟
                </h6>

                <button className="btn light-outline-btn w-75">
                  اعتمد الاجابة
                </button>
                <h6
                  className="dark-silver-text small mt-3 mb-0 clickable"
                  onClick={closeConfirmExam}
                >
                  إلغاء
                </h6>
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
    formValues: state.form.ConfirmExam && state.form.ConfirmExam.values
  };
}

ConfirmExamComponent = reduxForm({
  form: "ConfirmExam"
})(ConfirmExamComponent);

ConfirmExamComponent = connect(mapStateToProps)(ConfirmExamComponent);

export const ConfirmExam = withRouter(ConfirmExamComponent);
