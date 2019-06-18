import React, { Component } from "react";
import { Field, reduxForm, Fields } from "redux-form";
import { connect } from "react-redux";
import swal from "@sweetalert/with-react";
import axios from "axios";
import { inputField } from "../../shared/inputs/inputField";
import { editPhoneField } from "../../shared/inputs/editPhoneField";
import { withRouter, Link } from "react-router-dom";
import "./styles.sass";
import { FaRegUser } from "react-icons/fa";
import { getProfile } from "../../../actions";
import { FaRegEnvelope } from "react-icons/fa";
import { apiBaseUrl } from "../../../api/helpers";
import {
  Tooltip,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";
import { emailField } from "../../shared/inputs/emailField";
import { EmailToken } from "./reset/email/EmailToken";
import { PhoneToken } from "./reset/phone/PhoneToken";

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "يجب تعبئة هذه الخانة";
  } else if (
    !/^[\u0621-\u064Aa-zA-Z]{2,}(\s[\u0621-\u064Aa-zA-Z]{2,})+$/.test(
      values.name
    )
  ) {
    errors.name = "الاسم يجب أن يحتوي على مقطعين على الأقل";
  }
  return errors;
};

class EditAccountComponent extends Component {
  constructor(props) {
    super(props);

    this.togglePhone = this.togglePhone.bind(this);
    this.toggleEmail = this.toggleEmail.bind(this);
    this.state = {
<<<<<<< HEAD
      phoneTooltip: false,
      emailTooltip: false
=======
      phonePopover: false,
      emailPopover: false,
      isEmailTokenOpen: false,
      isPhoneTokenOpen: false
>>>>>>> staging
    };
  }

  togglePhone() {
    this.setState({
      phoneTooltip: !this.state.phoneTooltip
    });
  }

  toggleEmail() {
    this.setState({
      emailTooltip: !this.state.emailTooltip
    });
  }

<<<<<<< HEAD
=======
  openPhoneTokenModal = () => {
    this.setState({ isPhoneTokenOpen: true, phonePopover: false });
  };
  closePhoneTokenModal = () => {
    this.setState({ isPhoneTokenOpen: false });
  };

  openEmailTokenModal = () => {
    this.setState({ isEmailTokenOpen: true, emailPopover: false });
  };
  closeEmailTokenModal = () => {
    this.setState({ isEmailTokenOpen: false });
  };

>>>>>>> staging
  componentDidMount() {
    this.props.getProfile();

    console.log(this.props);
  }

  myFormHandler = values => {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    let data = {
      name: values.name
    };
    axios
      .put(`${apiBaseUrl}/users/me`, data, {
        headers
      })
      .then(response => {
        this.setState({
          isEmailTokenOpen: false,
          emailPopover: false,
          isPhoneTokenOpen: false,
          phonePopover: false
        });

        swal("تنبيه", "تم تعديل بياناتك بنجاح", "success", {
          button: "متابعة"
        });
      })
      .catch(error => {
        this.setState({
          isEmailTokenOpen: false,
          emailPopover: false,
          isPhoneTokenOpen: false,
          phonePopover: false
        });

        switch (error.response.data && error.response.data.error) {
          case "ValidationError":
            swal("عفواً", "يرجى التحقق من البيانات المدخلة", "error", {
              button: "متابعة"
            });
            break;

          default:
            console.log("other error");
        }
      });
  };

<<<<<<< HEAD
=======
  verifyEmail = values => {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    let data = {
      email: values.email
    };
    axios
      .post(`${apiBaseUrl}/auth/email/send_token`, data, {
        headers
      })
      .then(response => {
        this.setState({ isEmailTokenOpen: true, emailPopover: false });
      })
      .catch(error => {
        this.setState({
          isEmailTokenOpen: false,
          emailPopover: false,
          isPhoneTokenOpen: false,
          phonePopover: false
        });

        switch (error.response.data && error.response.data.error) {
          case "ValidationError":
            swal("عفواً", "يرجى التحقق من البيانات المدخلة", "error", {
              button: "متابعة"
            });
            break;
          case "AlreadyVerified":
            swal("عفواً", "تم توثيق الحساب سابقاً", "error", {
              button: "متابعة"
            });
            break;
          case "InvalidConfirmationToken":
            swal("عفواً", "الرمز المدخل خاطئ", "error", {
              button: "متابعة"
            });
            break;
          case "VerificationTokenExpired":
            swal("عفواً", "انتهت صلاحية الرمز المدخل", "error", {
              button: "متابعة"
            });
            break;

          default:
            console.log("other error");
        }
      });
  };

  verifyPhone = values => {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    let data = {
      countryCode: values.phoneNumber && values.phoneNumber.countryCode,
      phoneNumber: values.phoneNumber && values.phoneNumber.phoneNumber
    };
    axios
      .post(`${apiBaseUrl}/auth/phone/send_token`, data, {
        headers
      })
      .then(response => {
        this.setState({ isPhoneTokenOpen: true, phonePopover: false });
      })
      .catch(error => {
        this.setState({
          isEmailTokenOpen: false,
          emailPopover: false,
          isPhoneTokenOpen: false,
          phonePopover: false
        });

        switch (error.response.data && error.response.data.error) {
          case "ValidationError":
            swal("عفواً", "يرجى التحقق من البيانات المدخلة", "error", {
              button: "متابعة"
            });
            break;
          case "AlreadyVerified":
            swal("عفواً", "تم توثيق الحساب سابقاً", "error", {
              button: "متابعة"
            });
            break;
          case "InvalidConfirmationToken":
            swal("عفواً", "الرمز المدخل خاطئ", "error", {
              button: "متابعة"
            });
            break;
          case "VerificationTokenExpired":
            swal("عفواً", "انتهت صلاحية الرمز المدخل", "error", {
              button: "متابعة"
            });
            break;

          default:
            console.log("other error");
        }
      });
  };

>>>>>>> staging
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <React.Fragment>
<<<<<<< HEAD
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h3 className="dark-text">الملف الشخصي</h3>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <div className="bg-white box-layout w-100 p-5 d-flex align-items-center justify-content-center flex-column">
                  <img src={avatarImg} height="110" className="mb-4" />

                  <form
                    className="w-25"
                    onSubmit={handleSubmit(this.myFormHandler)}
                  >
                    <Field
                      name="name"
                      type="text"
                      component={inputField}
                      className="form-control border-left-0 pl-0"
                      placeholder="الاسم الكامل"
                    >
                      <FaRegUser />
                    </Field>

                    <div className="position-relative">
                      <Field
                        fieldName="phoneNumber"
                        name="phoneNumber"
                        // names={["phoneNumber", "countryCode"]}
                        component={editPhoneField}
                        containerClassName="intl-tel-input"
                        inputClassName="form-control"
                        defaultCountry="sa"
                        disabled={true}
                      />
                      {this.props.initialValues.phoneNumberConfirmed ==
                      false ? (
                        <React.Fragment>
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/not-verified.png"
                            }
                            width="100%"
                            width="20"
                            className="position-absolute right-input-icon"
                            id="phone-tooltip"
                          />
                          <Tooltip
                            placement="right"
                            isOpen={this.state.phoneTooltip}
                            target="phone-tooltip"
                            toggle={this.togglePhone}
                            style={{
                              backgroundColor: "#f2fdfe",
                              color: "#4b3a85",
                              height: 35,
                              display: "flex",
                              alignItems: "center"
                            }}
                          >
                            <h6 className="light-font-text small mb-0">
                              رقم الهاتف غير محقق
                            </h6>
                          </Tooltip>
                        </React.Fragment>
                      ) : null}
                    </div>

                    <label className="pr-2 dark-silver-text">أنا: </label>
                    <div className="form-check form-check-inline mb-3">
                      <Field
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value={this.props.initialValues.gender}
                        component="input"
                        disabled={true}
                        checked={(this.props.initialValues.gender = "Male")}
                      />
                      <label className="form-check-label dark-text small">
                        <img
                          src={
                            process.env.PUBLIC_URL + "/assets/images/male.png"
                          }
                          width="100%"
                          className="mr-1"
                          width="12"
                        />
                        ذكر
                      </label>
                    </div>
                    <div className="form-check form-check-inline mb-3">
                      <Field
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value={this.props.initialValues.gender}
                        component="input"
                        disabled={true}
                        checked={(this.props.initialValues.gender = "Female")}
                      />
                      <label className="form-check-label dark-text small">
                        <img
                          src={
                            process.env.PUBLIC_URL + "/assets/images/female.png"
                          }
                          width="100%"
                          className="mr-1"
                          width="12"
                        />
                        أنثى
                      </label>
                    </div>

                    <div className="position-relative">
                      <Field
                        name="email"
                        type="email"
                        component={inputField}
                        className="form-control border-left-0 pl-0 ltr-input"
                        placeholder="البريد الإلكتروني"
                        disabled={true}
                      >
                        <FaRegEnvelope />
                      </Field>
                      {this.props.initialValues.emailConfirmed == false ? (
                        <React.Fragment>
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/not-verified.png"
                            }
                            width="100%"
                            width="20"
                            className="position-absolute left-input-icon"
                            id="email-tooltip"
                          />
                          <Tooltip
                            placement="left"
                            isOpen={this.state.emailTooltip}
                            target="email-tooltip"
                            toggle={this.toggleEmail}
                            style={{
                              backgroundColor: "#f2fdfe",
                              color: "#4b3a85",
                              height: 35,
                              display: "flex",
                              alignItems: "center"
                            }}
                          >
                            <h6 className="light-font-text small mb-0">
                              البريد الإلكتروني غير محقق
                            </h6>
                          </Tooltip>
                        </React.Fragment>
                      ) : null}
                    </div>
                    <Link
                      to="/account/reset-password"
                      className="light-text smaller"
                    >
                      تعديل كلمة المرور
                    </Link>
                    <button
                      type="submit"
                      className="btn dark-outline-btn w-100 mt-3"
                      disabled={submitting}
                    >
                      حفظ التعديلات{" "}
                    </button>
                  </form>
                </div>
              </div>
=======
        <h3 className="dark-text">الملف الشخصي</h3>
        <div className="bg-white box-layout w-100 p-5 d-flex align-items-center justify-content-center flex-column mt-3">
          <form className="w-35" onSubmit={handleSubmit(this.myFormHandler)}>
            <Field
              name="name"
              type="text"
              component={inputField}
              className="form-control border-left-0 pl-0"
              placeholder="الاسم الكامل"
            >
              <FaRegUser />
            </Field>

            <div className="position-relative">
              <Field
                fieldName="phoneNumber"
                name="phoneNumber"
                props={{
                  initialCountry:
                    this.props.initialValues &&
                    this.props.initialValues.countryCode,
                  initialPhone:
                    this.props.initialValues &&
                    this.props.initialValues.phoneNumber
                }}
                component={editPhoneField}
                containerClassName="intl-tel-input"
                inputClassName="form-control"
                defaultCountry="sa"
                disabled={true}
              />

              {this.props.initialValues.phoneNumberConfirmed == false ? (
                <React.Fragment>
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/not-verified.png"
                    }
                    width="20"
                    width="20"
                    className="position-absolute right-input-icon"
                    id="phone-popover"
                  />

                  <Popover
                    placement="right"
                    isOpen={this.state.phonePopover}
                    target="phone-popover"
                    toggle={this.togglePhone}
                  >
                    <PopoverBody className="d-flex flex-column align-items-center justify-content-center">
                      <h6 className="dark-text smaller">رقم الهاتف غير محقق</h6>
                      <h6
                        className="light-text smaller mb-0 clickable"
                        onClick={this.verifyPhone}
                      >
                        <u>تأكيد رقم الهاتف</u>
                      </h6>
                    </PopoverBody>
                  </Popover>
                </React.Fragment>
              ) : null}
            </div>

            <label className="pr-2 dark-silver-text">أنا: </label>
            <div className="form-check form-check-inline mb-3">
              <Field
                className="form-check-input"
                type="radio"
                name="gender"
                value={this.props.initialValues.gender}
                component="input"
                disabled={true}
                checked={(this.props.initialValues.gender = "Male")}
              />
              <label className="form-check-label dark-text small">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/male.png"}
                  width="100%"
                  className="mr-1"
                  width="12"
                />
                ذكر
              </label>
            </div>
            <div className="form-check form-check-inline mb-3">
              <Field
                className="form-check-input"
                type="radio"
                name="gender"
                value={this.props.initialValues.gender}
                component="input"
                disabled={true}
                checked={(this.props.initialValues.gender = "Female")}
              />
              <label className="form-check-label dark-text small">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/female.png"}
                  width="100%"
                  className="mr-1"
                  width="12"
                />
                أنثى
              </label>
            </div>

            <div className="position-relative">
              <Field
                name="email"
                type="email"
                component={emailField}
                className="form-control border-right-0 pr-0 pr-1 left-radius-0 ltr-input"
                // placeholder="البريد الإلكتروني"
                disabled={true}
              >
                <FaRegEnvelope />
              </Field>

              {this.props.initialValues.emailConfirmed == false &&
              this.props.initialValues.email !== undefined ? (
                <React.Fragment>
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/not-verified.png"
                    }
                    width="20"
                    width="20"
                    className="position-absolute right-input-icon clickable"
                    id="email-popover"
                  />

                  <Popover
                    placement="right"
                    isOpen={this.state.emailPopover}
                    target="email-popover"
                    toggle={this.toggleEmail}
                  >
                    <PopoverBody className="d-flex flex-column align-items-center justify-content-center">
                      <h6 className="dark-text smaller">
                        البريد الإلكتروني غير محقق
                      </h6>
                      <h6
                        className="light-text smaller mb-0 clickable"
                        onClick={this.verifyEmail}
                      >
                        <u>تأكيد البريد الإلكتروني</u>
                      </h6>
                    </PopoverBody>
                  </Popover>
                </React.Fragment>
              ) : null}
>>>>>>> staging
            </div>

            <EmailToken
              isEmailTokenOpen={this.state.isEmailTokenOpen}
              closeEmailTokenModal={this.closeEmailTokenModal}
            />
            <PhoneToken
              isPhoneTokenOpen={this.state.isPhoneTokenOpen}
              closePhoneTokenModal={this.closePhoneTokenModal}
            />
            <button
              type="submit"
              className="btn dark-outline-btn w-100 mt-3"
              disabled={submitting}
            >
              حفظ التعديلات{" "}
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    initialValues: state.profile,
    entireState: state
  };
}

EditAccountComponent = reduxForm({
  form: "EditAccount",
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false
})(EditAccountComponent);

EditAccountComponent = connect(
  mapStateToProps,
  { getProfile }
)(EditAccountComponent);

export const EditAccount = withRouter(EditAccountComponent);
