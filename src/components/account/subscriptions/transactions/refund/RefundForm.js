import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { inputField } from "../../../../shared/inputs/inputField";
import { textareaField } from "../../../../shared/inputs/textareaField";
import { withRouter } from "react-router-dom";
import { apiBaseUrl } from "../../../../../api/helpers";
import axios from "axios";
import swal from "@sweetalert/with-react";

const required = value => (value ? undefined : "يجب تعبئة هذه الخانة");

export class RefundComponent extends Component {
  state = {
    loading: false,
    disabled: false
  };

  myFormHandler = values => {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    let data = {
      courseId: this.props.courseId,
      bankName: values.bankName,
      accountNumber: values.accountNumber,
      accountOwnerName: values.accountOwnerName,
      leavingReason: values.leavingReason
    };
    this.setState({ loading: true, disabled: true });
    axios
      .post(`${apiBaseUrl}/FullRefunds`, data, {
        headers
      })
      .then(async response => {
        this.setState({ loading: false, disabled: false });
        this.props.closeRefundModal();
        swal({
          button: "متابعة",
          content: (
            <div>
              <img
                src={
                  process.env.PUBLIC_URL + "/assets/images/success-alert.png"
                }
                className="mb-3"
                height="45"
              />
              <h6 className="dark-text mb-0">وصل طلب الاسترداد بنجاح </h6>
            </div>
          )
        });
      })
      .catch(error => {
        this.setState({ loading: false, disabled: false });
        this.props.closeRefundModal();
        switch (error.response.data && error.response.data.message) {
          default:
            swal({
              button: "متابعة",
              content: (
                <div>
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/fail-alert.png"
                    }
                    className="mb-3"
                    height="45"
                  />
                  <h6 className="dark-text">
                    يتعذر استرجاع الرسوم لأحد الأسباب التالية
                  </h6>
                  <ul className="list-unstyled mb-0">
                    <li className="light-font-text dark-text small">
                      - لا يمكنك استرجاع الرسوم بعد مرور درسين على الأقل من
                      الدورة
                    </li>
                    <li className="light-font-text dark-text small">
                      - لا يمكنك استرجاع الرسوم بعد شراء الملزمة
                    </li>
                    <li className="light-font-text dark-text small">
                      - لا يمكنك إرسال طلب استرجاع رسوم أكثر من مرة
                    </li>
                  </ul>
                </div>
              )
            });
            break;
        }
      });
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
        borderWidth: 0
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 2
      }
    };
    const {
      isRefundOpen,
      closeRefundModal,
      handleSubmit,
      submitting
    } = this.props;
    return (
      <React.Fragment>
        <Modal
          style={customStyles}
          ariaHideApp={false}
          isOpen={isRefundOpen}
          onRequestClose={closeRefundModal}
          closeRefundModal={closeRefundModal}
        >
          <div className="container pt-4 pb-2">
            <div className="row">
              <div className="col-md-6 col-12">
                <h6 className="light-text text-center">طلب استرداد الرسوم</h6>
                <h6 className="dark-text smaller mb-3 text-center">
                  يرجى تعبئة المعلومات التالية لاتمام العملية
                </h6>
                <form onSubmit={handleSubmit(this.myFormHandler)}>
                  <Field
                    name="bankName"
                    type="text"
                    component={inputField}
                    className="form-control border-left-0 pl-0"
                    placeholder="اسم البنك"
                    validate={required}
                  />
                  <Field
                    name="accountNumber"
                    type="text"
                    component={inputField}
                    className="form-control border-left-0 pl-0"
                    placeholder="رقم الحساب"
                    validate={required}
                  />
                  <Field
                    name="accountOwnerName"
                    type="text"
                    component={inputField}
                    className="form-control border-left-0 pl-0"
                    placeholder="اسم صاحب الحساب"
                    validate={required}
                  />
                  <Field
                    name="leavingReason"
                    type="text"
                    component={textareaField}
                    className="form-control"
                    placeholder="سبب الانسحاب"
                    rows="5"
                    validate={required}
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
                    سيتم استرجاع المبلغ خلال أسبوع من وصول الطلب
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
})(RefundComponent);

RefundComponent = connect(mapStateToProps)(RefundComponent);

export const Checkout = withRouter(RefundComponent);
