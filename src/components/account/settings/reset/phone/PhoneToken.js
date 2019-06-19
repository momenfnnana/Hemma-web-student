import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { inputField } from "../../../../shared/inputs/inputField";
import { withRouter } from "react-router-dom";
import { getProfile } from "../../../../../actions";
import { apiBaseUrl } from "../../../../../api/helpers";
import axios from "axios";
import { VerificationField } from "../../../../shared/inputs/verificationField";

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "يجب تعبئة هذه الخانة";
  } else if (!values.password) {
    errors.password = "يجب تعبئة هذه الخانة";
  }
  return errors;
};

export class PhoneTokenComponent extends Component {
  async componentDidMount() {
    if (this.props.authenticated) {
      this.props.getProfile();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.authenticated && this.props.authenticated) {
      this.props.getProfile();
    }
  }

  submitPhoneToken = values => {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    let data = {
      token: values.token
    };
    axios
      .post(`${apiBaseUrl}/auth/phone/verify`, data, {
        headers
      })
      .then(response => {
        localStorage.setItem("token", response.data.data.token);
      })
      .catch(error => {
        console.log(error);
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
        width: "30%",
        height: "auto",
        borderWidth: 0
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 2,
        zIndex: 20
      }
    };
    const {
      isPhoneTokenOpen,
      closePhoneTokenModal,
      handleSubmit,
      submitting
    } = this.props;

    return (
      <React.Fragment>
        <Modal
          style={customStyles}
          ariaHideApp={false}
          isOpen={isPhoneTokenOpen}
          onRequestClose={this.closePhoneTokenModal}
          closePhoneTokenModal={closePhoneTokenModal}
        >
          <i
            className="fa fa-times dark-text clickable"
            onClick={closePhoneTokenModal}
          />
          <div className="container pt-2 pb-2">
            <div className="row">
              <div className="col-md-12 col-12 text-center">
                <h6 className="light-text mb-2">التحقق من الهوية</h6>

                <h6 className="dark-text smaller mb-4">
                  أدخل رمز التحقق المكون من ستة خانات والمرسل على الرقم{" "}
                </h6>
                <form onSubmit={handleSubmit(this.submitPhoneToken)}>
                  <Field name="token" component={VerificationField} />

                  <button className="btn light-outline-btn mt-2 w-50 unset-height mt-4 mb-2">
                    تحقق من الرمز
                  </button>
                </form>
                <div className="text-center small">
                  <span className="dark-text small">لم يصلك رمز التحقق؟ </span>
                  <a href="" className="light-text small">
                    إعادة إرسال
                  </a>{" "}
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
    formValues: state.form.PhoneToken && state.form.PhoneToken.values,
    initialValues: state.profile,
    entireState: state
  };
}

PhoneTokenComponent = reduxForm({
  form: "PhoneToken",
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false
})(PhoneTokenComponent);

PhoneTokenComponent = connect(
  mapStateToProps,
  { getProfile }
)(PhoneTokenComponent);

export const PhoneToken = withRouter(PhoneTokenComponent);
