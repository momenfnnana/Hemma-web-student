import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { MdLockOutline } from "react-icons/md";
import { inputField } from "../../shared/inputs/inputField";
import swal from "@sweetalert/with-react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { apiBaseUrl } from "../../../api/helpers";

const validate = values => {
  const errors = {};
  if (!values.password) {
    errors.password = "يجب تعبئة هذه الخانة";
  } else if (values.password.length < 8) {
    errors.password = "كلمة المرور يجب أن لا تقل عن ٨ أحرف";
  } else if (values.password.length > 24) {
    errors.password = "كلمة المرور يجب أن لا تزيد عن ٢٤ حرف";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
      values.password
    )
  ) {
    errors.password =
      "كلمة المرور يجب أن تحتوي على أحرف كبيرة، أحرف صغيرة، رموز، و أرقام";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "يجب تعبئة هذه الخانة";
  } else if (values.confirmPassword.length < 8) {
    errors.confirmPassword = "كلمة المرور يجب أن لا تقل عن ٨ أحرف";
  } else if (values.confirmPassword.length > 24) {
    errors.confirmPassword = "كلمة المرور يجب أن لا تزيد عن ٢٤ حرف";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
      values.confirmPassword
    )
  ) {
    errors.confirmPassword =
      "كلمة المرور يجب أن تحتوي على أحرف كبيرة، أحرف صغيرة، رموز، و أرقام";
  }
  if (values.password !== values.confirmPassword) {
    errors.password = "كلمة المرور غير متطابقة";
    errors.confirmPassword = "كلمة المرور غير متطابقة";
  }
  return errors;
};

class resetPasswordComponent extends Component {
  myFormHandler = values => {
    const { userData } = this.props.location;
    let data = {
      countryCode: userData.countryCode,
      phoneNumber: userData.phoneNumber,
      token: userData.token,
      password: values.password
    };
    axios
      .post(
        `${apiBaseUrl}/auth/password/reset/phone/set_new`,
        data
      )
      .then(response => {
        swal("تنبيه", "لقد تم تغيير كلمة المرور بنجاح", "success", {
          button: "متابعة"
        });
      })
      .catch(error => {
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
            console.log("other error");
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
              <Field
                name="password"
                type="password"
                component={inputField}
                className="form-control border-left-0 pl-0 ltr-input"
                placeholder="كلمة المرور"
              >
                <MdLockOutline />
              </Field>

              <Field
                name="confirmPassword"
                type="password"
                component={inputField}
                className="form-control border-left-0 pl-0 ltr-input"
                placeholder="تأكيد كلمة المرور"
              >
                <MdLockOutline />
              </Field>

              <button
                type="submit"
                className="btn dark-outline-btn w-100"
                disabled={submitting}
              >
                إرسال
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
