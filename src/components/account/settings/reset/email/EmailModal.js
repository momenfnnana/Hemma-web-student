import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { inputField } from "../../../../shared/inputs/inputField";
import { withRouter } from "react-router-dom";
import { getProfile } from "../../../../../actions";
import { apiBaseUrl } from "../../../../../api/helpers";
import axios from "axios";

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "يجب تعبئة هذه الخانة";
  } else if (!values.password) {
    errors.password = "يجب تعبئة هذه الخانة";
  }
  return errors;
};

export class ResetEmailComponent extends Component {
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

  submitEmail = values => {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    let data = {
      email: values.email,
      password: values.password
    };
    axios
      .put(`${apiBaseUrl}/auth/email`, data, {
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
      isResetEmailOpen,
      closeResetEmailModal,
      handleSubmit,
      submitting
    } = this.props;

    return (
      <React.Fragment>
        <Modal
          style={customStyles}
          ariaHideApp={false}
          isOpen={isResetEmailOpen}
          onRequestClose={this.closeResetEmailModal}
          closeResetEmailModal={closeResetEmailModal}
        >
          <i
            className="fa fa-times dark-text clickable"
            onClick={closeResetEmailModal}
          />
          <div className="container pt-2 pb-2">
            <div className="row">
              <div className="col-md-12 col-12">
                <h6 className="light-text mb-2 text-center">
                  تغيير البريد الإلكتروني
                </h6>

                <h6 className="dark-text smaller mb-4 text-center">
                  يرجى تعبئة المعلومات التالية لاتمام العملية
                </h6>
                <form onSubmit={handleSubmit(this.submitEmail)}>
                  <Field
                    name="email"
                    type="email"
                    component={inputField}
                    className="form-control border-left-0 pl-0 ltr-input"
                    placeholder="البريد الإلكتروني"
                  />

                  <Field
                    name="password"
                    type="password"
                    component={inputField}
                    className="form-control border-left-0 pl-0 ltr-input"
                    placeholder="كلمة المرور"
                  />

                  <div className="text-center">
                    <button className="btn light-outline-btn mt-2 w-50">
                      حفظ التعديلات
                    </button>
                  </div>
                </form>
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
    formValues: state.form.ResetEmail && state.form.ResetEmail.values,
    initialValues: state.profile,
    entireState: state
  };
}

ResetEmailComponent = reduxForm({
  form: "ResetEmail",
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false
})(ResetEmailComponent);

ResetEmailComponent = connect(
  mapStateToProps,
  { getProfile }
)(ResetEmailComponent);

export const ResetEmail = withRouter(ResetEmailComponent);
