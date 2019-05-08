import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { inputField } from "../../../../shared/inputs/inputField";
import { textareaField } from "../../../../shared/inputs/textareaField";
import { withRouter } from "react-router-dom";

export class RefundComponent extends Component {
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
        height: "65%",
        borderWidth: 0
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 2
      }
    };
    const { handleSubmit, submitting } = this.props;

    return (
      <React.Fragment>
        <Modal
          style={customStyles}
          ariaHideApp={false}
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.props.onClose}
        >
          <div className="container pt-4">
            <div className="row">
              <div className="col-md-6 col-12 text-center">
                <h6 className="light-text mb-4">طلب استرداد الرسوم</h6>

                <h6 className="dark-text smaller mb-2">
                  يرجى تعبئة المعلومات التالية لاتمام العملية
                </h6>
                <form onSubmit={handleSubmit(this.myFormHandler)}>
                  <Field
                    name="bankName"
                    type="text"
                    component={inputField}
                    className="form-control border-left-0 pl-0"
                    placeholder="اسم البنك"
                  />
                  <Field
                    name="accountNumber"
                    type="text"
                    component={inputField}
                    className="form-control border-left-0 pl-0"
                    placeholder="رقم الحساب"
                  />
                  <Field
                    name="accountNumber"
                    type="text"
                    component={inputField}
                    className="form-control border-left-0 pl-0"
                    placeholder="اسم صاحب الحساب"
                  />
                  <Field
                    name="accountNumber"
                    type="text"
                    component={textareaField}
                    className="form-control"
                    placeholder="سبب الانسحاب"
                    rows="5"
                  />
                  <button className="btn light-outline-btn mt-4 w-100">
                    استرجاع الرسوم
                  </button>
                </form>
              </div>
              <div className="col-md-6 col-12 text-center d-flex align-items-center justify-content-center flex-column">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/refund-art.png"}
                  width="80%"
                  className="contain-img"
                />
                <div className="box-layout light-silver-bg h-65 d-flex align-items-center mt-4">
                  <h6 className="dark-text small mb-0 mt-0 w-75 mx-auto">
                    سيتم استرجاع مبلغ:{" "}
                    <span className="light-text en-text">150</span>{" "}
                    <span className="light-text"> ريال </span> خلال أسبوع من
                    وصول الطلب
                  </h6>
                </div>
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
    formValues: state.form.Refund && state.form.Refund.values
  };
}

RefundComponent = reduxForm({
  form: "Refund"
  // validate
})(RefundComponent);

RefundComponent = connect(mapStateToProps)(RefundComponent);

export const Checkout = withRouter(RefundComponent);
