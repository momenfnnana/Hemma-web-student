import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { inputField } from "../../../../shared/inputs/inputField";
import { withRouter } from "react-router-dom";
import { getProfile } from "../../../../../actions";
import { apiBaseUrl } from "../../../../../api/helpers";
import axios from "axios";
import { editPhoneField } from "../../../../shared/inputs/editPhoneField";
import { phoneField } from "../../../../shared/inputs/phoneField";

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "يجب تعبئة هذه الخانة";
  } else if (!values.password) {
    errors.password = "يجب تعبئة هذه الخانة";
  }
  return errors;
};

export class ResetPhoneComponent extends Component {
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

  handleSubmit(values) {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    let data = {
      countryCode: values.phoneNumber.countryCode,
      phoneNumber: values.phoneNumber.phoneNumber,
      password: values.password
    };
    axios
      .put(`${apiBaseUrl}/auth/phone`, data, {
        headers
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
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
      isResetPhoneOpen,
      closeResetPhoneModal,
      handleSubmit,
      submitting
    } = this.props;

    return (
      <React.Fragment>
        <Modal
          style={customStyles}
          ariaHideApp={false}
          isOpen={isResetPhoneOpen}
          onRequestClose={this.closeResetPhoneModal}
          closeResetPhoneModal={closeResetPhoneModal}
        >
          <i
            className="fa fa-times dark-text clickable"
            onClick={closeResetPhoneModal}
          />
          <div className="container pt-2 pb-2">
            <div className="row">
              <div className="col-md-12 col-12">
                <h6 className="light-text mb-2 text-center">
                  تغيير رقم الهاتف
                </h6>

                <h6 className="dark-text smaller mb-4 text-center">
                  يرجى تعبئة المعلومات التالية لاتمام العملية
                </h6>
                <form
                  onSubmit={this.props.handleSubmit(
                    this.handleSubmit.bind(this)
                  )}
                >
                  <Field
                    fieldName="phoneNumber"
                    name="phoneNumber"
                    // names={["phoneNumber", "countryCode"]}
                    component={phoneField}
                    containerClassName="intl-tel-input"
                    inputClassName="form-control"
                    defaultCountry="sa"
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
    formValues: state.form.ResetPhone && state.form.ResetPhone.values,
    initialValues: state.profile,
    entireState: state
  };
}

ResetPhoneComponent = reduxForm({
  form: "ResetPhone",
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false
})(ResetPhoneComponent);

ResetPhoneComponent = connect(
  mapStateToProps,
  { getProfile }
)(ResetPhoneComponent);

export const ResetPhone = withRouter(ResetPhoneComponent);
