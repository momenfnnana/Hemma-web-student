import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { inputField } from "../../../../shared/inputs/inputField";
import { textareaField } from "../../../../shared/inputs/textareaField";
import { withRouter } from "react-router-dom";

export class NewInstallmentComponent extends Component {
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
        width: "35%",
        height: "40%",
        borderWidth: 0
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 2
      }
    };
    const {
      isInstallmentOpen,
      closeInstallmentModal,
      handleSubmit,
      submitting
    } = this.props;

    return (
      <React.Fragment>
        <Modal
          style={customStyles}
          ariaHideApp={false}
          isOpen={isInstallmentOpen}
          onRequestClose={closeInstallmentModal}
        >
          <div className="container h-100 d-flex align-items-center">
            <div className="row">
              <div className="col-12 text-center">
                <h6 className="light-text mb-4 mt-0">طلب سداد جديد</h6>
              </div>

              <div className="col-12 d-flex align-items-center flex-column justify-content-center">
                <form>
                  <div className="form-group d-flex align-items-center justify-content-center">
                    <label className="smaller dark-text mt-0 mb-0 mr-3">
                      القيمة التي تريد دفعها
                    </label>
                    <input
                      type="number"
                      className="form-control en-text w-20 mt-0 mb-0 mr-3 text-center"
                      placeholder="200"
                    />
                    <label className="small dark-text mt-0 mb-0">ريال</label>
                  </div>
                </form>

                <div className="box-layout light-silver-bg d-flex align-items-center justify-content-center flex-column w-100 mt-2 mb-4 h-80">
                  <h6 className="dark-text small mb-1 mt-0">
                    القيمة المتبقية:{" "}
                    <span className="light-text en-text">150</span>{" "}
                    <span className="light-text"> ريال </span>
                  </h6>
                  <h6 className="dark-text small mb-0">
                    الوقت المتبقي لإتمام الدفعات:{" "}
                    <span className="light-text en-text">3</span>{" "}
                    <span className="light-text"> أيام </span>
                  </h6>
                </div>
                <button className="btn light-outline-btn w-50 mx-auto">
                  إنشاء
                </button>
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
    formValues: state.form.NewInstallment && state.form.NewInstallment.values
  };
}

NewInstallmentComponent = reduxForm({
  form: "NewInstallment"
  // validate
})(NewInstallmentComponent);

NewInstallmentComponent = connect(mapStateToProps)(NewInstallmentComponent);

export const Checkout = withRouter(NewInstallmentComponent);
