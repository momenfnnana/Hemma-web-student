import React, { Component } from "react";
import axios from "axios";
import Modal from "react-modal";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link, withRouter } from "react-router-dom";
import swal from "@sweetalert/with-react";
import { apiBaseUrl } from "../../api/helpers";

class AgreementFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publication: {},
      numPages: null,
      pageNumber: 1,
      option: "",
      isDisabled: true,
      checked: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({ checked: !this.state.checked });
    if (this.state.checked) {
      this.setState({ isDisabled: true });
    } else this.setState({ isDisabled: false });
  }

  handleCartCheckout() {
    const cart = this.props.cart;
    const cartAmount = cart && cart.total;

    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    if (cartAmount == 0) {
      let data = {
        url: "No_PAYMENT",
        originBankName: "No_PAYMENT",
        destinationBankName: "No_PAYMENT",
        accountHolderName: "No_PAYMENT",
        accountNumber: "No_PAYMENT",
        amount: 0,
        date: new Date()
      };
      axios
        .post(`${apiBaseUrl}/cart/checkout_with_bank_transfer`, data, {
          headers
        })
        .then(response => {
          this.props.history.push("/course/content");
        })
        .catch(error => {
          swal("عفواً", "خدث خطأ ما", "error", {
            button: "متابعة"
          });
        });
    } else {
      this.props.history.push("/cart/checkout");
    }
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
        height: "auto",
        borderWidth: 0
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
          onRequestClose={this.props.onClose}
        >
          <div className="container pt-3 pb-3">
            <div className="row">
              <div className="col-12">
                <h6 className="light-text">الشروط والأحكام</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="silver-bg p-3 rounded mt-3">
                  <h6 className="dark-text small">شروط الاشتراك في الدورة</h6>
                  <p className="light-font-text dark-text smaller">
                    ١- الدورة لشخص واحد فقط لانسمح بنظام (القطه) او الاشتراك
                    بحساب واحد
                  </p>
                  <p className="light-font-text dark-text smaller">
                    ٢- يمنع دخول أكثر من شخص أو أكثر من مستفيد إلى الحساب
                  </p>
                  <p className="light-font-text dark-text smaller">
                    ٣- الدورة online تتطلب وجود اتصال ممتاز ، ولانتحمل مسوؤلية
                    غير ذلك
                  </p>
                  <p className="light-font-text dark-text smaller">
                    ٤-لانسمح بتسجيل المحاضرات او حفظها .
                  </p>
                  <p className="light-font-text dark-text smaller">
                    ٥-الدورة بنظام الاشتراك وتبقى لفترة محددة.
                  </p>
                  <p className="light-font-text dark-text smaller">
                    ٦-لايمكن استرجاع الرسوم بعد بداية الدورة ، وفي حال تم طلب
                    الملزمة قبل بداية الدورة لايمكن استرجاع رسوم الدورة والملزمة
                    .
                  </p>
                  <p className="light-font-text dark-text smaller">
                    ٧- الملزمة مخصصة للمشترك في الدورة فقط ولايسمح بنشرها او
                    بيعها او الاستفادة منها مادياً
                  </p>
                  <p className="light-font-text dark-text smaller">
                    ٨- طلب الدورة والاشتراك بها تعني موافقتك على الشروط.
                  </p>
                </div>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-12">
                <div className="form-check mb-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={event => this.handleChange(event)}
                    checked={this.state.checked}
                  />
                  <label className="form-check-label smaller dark-text">
                    أوافق على الشروط والأحكام{" "}
                  </label>
                </div>
              </div>
            </div>
            <div className="row mt-4 text-center">
              <div className="col-12">
                {this.state.isDisabled == true ? (
                  <button className="btn light-outline-btn w-50" disabled>
                    متابعة
                  </button>
                ) : (
                  <button
                    className="btn light-outline-btn w-50"
                    onClick={() => this.handleCartCheckout()}
                  >
                    متابعة
                  </button>
                )}
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
    cart: state.cart
  };
}

AgreementFormComponent = connect(mapStateToProps)(AgreementFormComponent);

export const AgreementForm = withRouter(AgreementFormComponent);
