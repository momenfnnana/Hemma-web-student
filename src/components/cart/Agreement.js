import React, { Component } from "react";
import axios from "axios";
import Modal from "react-modal";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link, withRouter } from "react-router-dom";
import swal from "@sweetalert/with-react";
import { apiBaseUrl } from "../../api/helpers";
import "./index.scss"

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
    this.scrollToBottom();
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

  scrollToBottom = () => {
    this.divEnd &&
      this.divEnd.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start"
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
                <h6 className="light-text font-size-20">الشروط والأحكام</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="py-3 rounded rules-wrapper">
                  <h6 className="dark-text mb-4 font-weight-bold">عزيزي المتدرب/ة ، يشرفنا اختيارك لمنصتنا، و للضروة يُرجى قراءة الشروط التالية بعناية قبل الضغط على متابعة:</h6>
                  <p className="light-font-text dark-text  text-break">
                    ١- الاشتراك في الدورة فردي وخاص بمشترك واحد فقط (وفي حال تم استخدام الحساب من أكثر من شخص فسيتم إيقاف الحساب تلقائيًا
                  </p>
                  <p className="light-font-text dark-text  text-break">
                  ٢-( لا نحلل ) نشر محتويات الدورة ومرفقاتها أو الاستفادة منها من قبل إي شخص آخر (و لا نسمح بنظام القطة) في حساب واحد
                  </p>
                  <p className="light-font-text dark-text  text-break">
                    ٣- تسجيل المحاضرات وحفظها (غير مسموح)
                  </p>
                  <p className="light-font-text dark-text  text-break">
                    4- لكل دورة مدة اشتراك موضحة في معلومات الدورة، (وتحذف تلقائيًا بعد انتهاء المدة)
                  </p>
                  <p className="light-font-text dark-text  text-break">
                    ٥-لا يمكن الانسحاب من الدورة او استرجاع رسومها بعد بداية الدورة او بعد إتاحة الملازم
                  </p>
                  <p className="light-font-text dark-text  text-break">
                    ٦- لا يمكن إلغاء طلب الملزمة المطبوعة أو استرجاع رسومها.
                  </p>
                  <p className="light-font-text dark-text  text-break">
                    ٧- الملزمة مخصصة للمشترك في الدورة فقط ولايسمح بنشرها او
                    بيعها او الاستفادة منها مادياً
                  </p>
                  <p className="light-font-text dark-text  text-break">
                    ٨- طلب الدورة والاشتراك بها تعني موافقتك على الشروط.
                  </p>
                  <p className="light-font-text dark-text  text-break">
                  الدورة تتطلب وجود اتصال (نت قوي).
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
                  <label className="form-check-label  dark-text">
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
          <div
            ref={el => {
              this.divEnd = el;
            }}
          />
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
