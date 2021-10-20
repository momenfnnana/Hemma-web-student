import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { inputField } from "../../../shared/inputs/inputField";
import { textareaField } from "../../../shared/inputs/textareaField";
import { withRouter } from "react-router-dom";
import { apiBaseUrl } from "../../../../api/helpers";
import axios from "axios";
import swal from "@sweetalert/with-react";
import { FaTimes } from "react-icons/fa";

const required = value => (value ? undefined : "يجب تعبئة هذه الخانة");

class RefundComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      disabled: false,
      isModalOpen: false
    };
    this.myFormHandler = this.myFormHandler.bind(this);
  }

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
      leavingReason: values.leavingReason,
      IBAN : values.ibanNumber
    };
    this.setState({ loading: true, disabled: true });
    axios
      .post(`${apiBaseUrl}/FullRefunds`, data, {
        headers
      })
      .then(async response => {
        this.setState({ loading: false, disabled: false });
        this.props.closeRefundModal();
        this.setState({ isModalOpen: true });
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
                    لا يمكن تقديم طلبات الانسحاب لهذه الدورة
                  </h6>
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
    const smallModalStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "30%",
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
          <div className="container py-2">
            <div className="row">
              <div className="col-md-6 col-12">
                <FaTimes
                  className="dark-text clickable"
                  onClick={closeRefundModal}
                />
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
                    name="ibanNumber"
                    type="text"
                    component={inputField}
                    className="form-control border-left-0 pl-0"
                    placeholder="رقم الايبان"
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
                  <button disabled={this.state.disabled} className="btn light-outline-btn mt-4 w-100">
                    استرجاع الرسوم
                  </button>
                </form>
              </div> 
              <div className="col-md-6 col-12 text-center d-flex align-items-center justify-content-center flex-column">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/refund-art.png"}
                  width="80%"
                  className="contain-img d-none d-md-block"
                />
                <div className="box-layout light-silver-bg h-65 d-flex align-items-center mt-4 px-1">
                  <h6 className="dark-text small mb-0 mt-0 w-75 mx-auto">
                    سيتم استرجاع المبلغ خلال أسبوع من وصول الطلب
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          style={smallModalStyles}
          ariaHideApp={false}
          isOpen={this.state.isModalOpen}
          closeRefundModal={this.state.isModalOpen}
        >
          <div className="container py-2">
            <div className="row">
              <div className="col-12 d-flex flex-column align-items-center justify-content-center">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/success-alert.png"
                  }
                  className="mb-3"
                  height="45"
                />
                <h6 className="dark-text mb-0">وصل طلب الاسترداد بنجاح </h6>
                <button
                  className="custom-swal-btn mt-4"
                  onClick={() => {
                    this.setState({ isModalOpen: false });
                    this.props.history.push("/course/content");
                  }}
                >
                  متابعة
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
    formValues: state.form.Refund && state.form.Refund.values
  };
}

RefundComponent = reduxForm({
  form: "Refund"
})(RefundComponent);

RefundComponent = connect(mapStateToProps)(RefundComponent);

export const Refund = withRouter(RefundComponent);
