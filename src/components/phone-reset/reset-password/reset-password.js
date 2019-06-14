import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { MdLockOutline } from "react-icons/md";
import { inputField } from "../../shared/inputs/inputField";
import swal from "@sweetalert/with-react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { apiBaseUrl } from "../../../api/helpers";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-clip-rotate.scss";

const validate = values => {
  const errors = {};
  if (!values.password) {
    errors.password = "يجب تعبئة هذه الخانة";
  } else if (values.password.length < 4) {
    errors.password = "كلمة المرور يجب أن لا تقل عن 4 أحرف";
  } else if (values.password.length > 10) {
    errors.password = "كلمة المرور يجب أن لا تزيد عن 10 أحرف";
  }
  return errors;
};

class resetPasswordComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
      password: "",
      loading: false,
      disabled: false
    };
    this.togglePasswordShow = this.togglePasswordShow.bind(this);
  }

  togglePasswordShow() {
    this.setState({ hidden: !this.state.hidden });
  }
  myFormHandler = values => {
    const { userData } = this.props.location;
    let data = {
      countryCode: userData.countryCode,
      phoneNumber: userData.phoneNumber,
      token: userData.token,
      password: values.password
    };
    this.setState({ loading: true, disabled: true });

    axios
      .post(`${apiBaseUrl}/auth/password/reset/phone/set_new`, data)
      .then(response => {
        this.setState({ loading: false, disabled: false });
        this.props.history.push("/auth/login");
        swal(
          "تنبيه",
          "لقد تم تغيير كلمة المرور بنجاح، يمكنك تسجيل الدخول إلى حسابك الآن",
          "success",
          {
            button: "متابعة"
          }
        );
      })
      .catch(error => {
        this.setState({ loading: false, disabled: false });
        switch (error.response.data && error.response.data.error) {
          case "ValidationError":
            swal("عفواً", "يرجى التحقق من البيانات المدخلة", "error", {
              button: "متابعة"
            });
            break;
          case "UserNotFound":
            swal("عفواً", "هذا المستخدم غير موجود", "error", {
              button: "متابعة"
            });
            break;
          case "InvalidConfirmationToken":
            swal("عفواً", "الرمز المدخل غير صحيح", "error", {
              button: "متابعة"
            });
            break;
          case "VerificationTokenExpired":
            swal("عفواً", "انتهت صلاحية الرمز المدخل", "error", {
              button: "متابعة"
            });
            break;
          default:
            console.log(error);
        }
      });
  };
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="container pt-5 pb-5">
        <div
          className="row align-items-center justify-content-center"
          style={{ minHeight: 550 }}
        >
          <div className="col-md-6 col-12 order-md-1 order-2">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/reset-artwork.png"}
              height="350"
              className="artwork-img"
            />
          </div>
          <div className="col-md-6 col-12 order-md-2 order-1">
            <div className="text-center mb-3">
              <h6 className="light-text small">تم التحقق من الرمز</h6>
              <h6 className="dark-text small">قم بتعيين كلمة مرور جديدة</h6>
            </div>
            <form
              className="centered"
              onSubmit={handleSubmit(this.myFormHandler)}
            >
              <div className="position-relative">
                <Field
                  name="password"
                  type={this.state.hidden ? "text" : "password"}
                  component={inputField}
                  className="form-control border-left-0 pl-0 ltr-input pw-input"
                  placeholder="كلمة المرور"
                >
                  <MdLockOutline />
                </Field>
                {this.state.hidden ? (
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/closed-eye.png"
                    }
                    width="100%"
                    width="20"
                    className="position-absolute left-input-icon"
                    onClick={this.togglePasswordShow}
                  />
                ) : (
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/eye.png"}
                    width="100%"
                    width="20"
                    className="position-absolute left-input-icon custom-top"
                    onClick={this.togglePasswordShow}
                  />
                )}
              </div>

              <button
                type="submit"
                className="btn dark-outline-btn w-100"
                disabled={this.state.disabled}
              >
                {this.state.loading == true ? (
                  <Loader type="ball-clip-rotate" />
                ) : (
                  "إرسال"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.resetPassword && state.form.resetPassword.values
  };
}

resetPasswordComponent = reduxForm({
  form: "resetPassword",
  validate
})(resetPasswordComponent);

resetPasswordComponent = connect(mapStateToProps)(resetPasswordComponent);

export const resetPassword = withRouter(resetPasswordComponent);
