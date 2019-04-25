import React, { Component } from "react";
import axios from "axios";
import Modal from "react-modal";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";

class AgreementFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publication: {},
      numPages: null,
      pageNumber: 1,
      checked: false
    };
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
        height: "65%",
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
          {/* <button onClick={this.props.onClose}>close</button> */}
          <div className="container pt-3">
            <div className="row">
              <div className="col-12">
                <h6 className="light-text">الشروط والأحكام</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="silver-bg p-3 rounded mt-3">
                  <h6 className="dark-text small">قيود استخدام مواد الموقع</h6>
                  <p className="light-font-text dark-text smaller">
                    لصفحة وليس مقاطع النشر دليل المقروء صار. ألدوس توزيعاَ قرون
                    إصدار ليتراسيت. أيضاً للنص ما الشكل وليس مقاطع مقاطع هذا هذا
                    بل مستخدماً. لصفحة وليس مقاطع النشر دليل المقروء صار. ألدوس
                    توزيعاَ قرون إصدارليتراسيت. أيضاً للنص ما الشكل وليس مقاطع
                    مقاطع هذا هذا بل مستخدماً. لصفحة وليس مقاطع النشر دليل
                    المقروء صار. ألدوس توزيعاَ قرون إصدار ليتراسيت. أيضاً للنص
                    ما الشكل وليس مقاطع مقاطع هذا هذا بل مستخدماً. لصفحة وليس
                    مقاطع النشر دليل المقروء صار. ألدوس توزيعاَ قرون
                    إصدارليتراسيت. أيضاً للنص ما الشكل وليس مقاطع مقاطع هذا هذا
                    بل مستخدماً.
                  </p>
                  <h6 className="dark-text small">قيود استخدام مواد الموقع</h6>
                  <p className="light-font-text dark-text smaller">
                    لصفحة وليس مقاطع النشر دليل المقروء صار. ألدوس توزيعاَ قرون
                    إصدار ليتراسيت. أيضاً للنص ما الشكل وليس مقاطع مقاطع هذا هذا
                    بل مستخدماً. لصفحة وليس مقاطع النشر دليل المقروء صار. ألدوس
                    توزيعاَ قرون إصدارليتراسيت. أيضاً للنص ما الشكل وليس مقاطع
                    مقاطع هذا هذا بل مستخدماً. لصفحة وليس مقاطع النشر دليل
                    المقروء صار. ألدوس توزيعاَ قرون إصدار ليتراسيت. أيضاً للنص
                    ما الشكل وليس مقاطع مقاطع هذا هذا بل مستخدماً. لصفحة وليس
                    مقاطع النشر دليل المقروء صار. ألدوس توزيعاَ قرون
                    إصدارليتراسيت. أيضاً للنص ما الشكل وليس مقاطع مقاطع هذا هذا
                    بل مستخدماً.
                  </p>
                  <h6 className="dark-text small">قيود استخدام مواد الموقع</h6>
                  <p className="light-font-text dark-text smaller">
                    لصفحة وليس مقاطع النشر دليل المقروء صار. ألدوس توزيعاَ قرون
                    إصدار ليتراسيت. أيضاً للنص ما الشكل وليس مقاطع مقاطع هذا هذا
                    بل مستخدماً. لصفحة وليس مقاطع النشر دليل المقروء صار. ألدوس
                    توزيعاَ قرون إصدارليتراسيت. أيضاً للنص ما الشكل وليس مقاطع
                    مقاطع هذا هذا بل مستخدماً. لصفحة وليس مقاطع النشر دليل
                    المقروء صار. ألدوس توزيعاَ قرون إصدار ليتراسيت. أيضاً للنص
                    ما الشكل وليس مقاطع مقاطع هذا هذا بل مستخدماً. لصفحة وليس
                    مقاطع النشر دليل المقروء صار. ألدوس توزيعاَ قرون
                    إصدارليتراسيت. أيضاً للنص ما الشكل وليس مقاطع مقاطع هذا هذا
                    بل مستخدماً.
                  </p>
                </div>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-12">
                <div className="form-check mb-1">
                  <input className="form-check-input" type="checkbox" />
                  <label className="form-check-label smaller dark-text">
                    أوافق على الشروط والأحكام{" "}
                  </label>
                </div>
              </div>
            </div>
            <div className="row mt-4 text-center">
              <div className="col-12">
                <Link
                  to="/cart/checkout"
                  className="btn light-outline-btn w-50"
                >
                  متابعة
                </Link>
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
    cart: state.cart,
    formValues: state.form.cart && state.form.cart.values
  };
}

export const AgreementForm = connect(mapStateToProps)(
  reduxForm({ form: "cart", destroyOnUnmount: false })(AgreementFormComponent)
);
