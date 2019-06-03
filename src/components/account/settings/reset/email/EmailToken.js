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

export class EmailTokenComponent extends Component {
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

  submitEmailToken = values => {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    let data = {
      token: values.token
    };
    axios
      .post(`${apiBaseUrl}/auth/email/verify`, data, {
        headers
      })
      .then(response => {
        console.log(response);
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
      isEmailTokenOpen,
      closeEmailTokenModal,
      handleSubmit,
      submitting
    } = this.props;

    return (
      <React.Fragment>
        <Modal
          style={customStyles}
          ariaHideApp={false}
          isOpen={isEmailTokenOpen}
          onRequestClose={this.closeEmailTokenModal}
          closeEmailTokenModal={closeEmailTokenModal}
        >
          <i
            className="fa fa-times dark-text clickable"
            onClick={closeEmailTokenModal}
          />
          <div className="container pt-2 pb-2">
            <div className="row">
              <div className="col-md-12 col-12">
                <h6 className="light-text mb-2 text-center">
                  التحقق من البريد الإلكتروني
                </h6>

                <h6 className="dark-text smaller mb-4 text-center">
                  أدخل رمز التحقق المكون من ستة خانات والمرسل على البريد
                </h6>
                <form
                  onSubmit={handleSubmit(this.submitEmailToken)}
                  className="text-center"
                >
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
    formValues: state.form.EmailToken && state.form.EmailToken.values,
    initialValues: state.profile,
    entireState: state
  };
}

EmailTokenComponent = reduxForm({
  form: "EmailToken",
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false
})(EmailTokenComponent);

EmailTokenComponent = connect(
  mapStateToProps,
  { getProfile }
)(EmailTokenComponent);

export const EmailToken = withRouter(EmailTokenComponent);
