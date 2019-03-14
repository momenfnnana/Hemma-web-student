import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { MdLockOutline } from "react-icons/md";
import { inputField } from "../shared/inputs/inputField";
import swal from "@sweetalert/with-react";
import axios from "axios";
import { withRouter } from "react-router-dom";

const validate = values => {
  const errors = {};
  if (
    !values.phone ||
    !values.phone.phoneNumber ||
    values.phone.phoneNumber.trim() === ""
  ) {
    errors.phone = "يجب تعبئة هذه الخانة";
  } else if (values.phone.phoneNumber.length < 8) {
    errors.phone = "ادخل رقم هاتف صحيح";
  }
  return errors;
};

class resetPasswordComponent extends Component {
  myFormHandler = values => {
    let data = {
      countryCode: values.phone.countryCode,
      phoneNumber: values.phone.phoneNumber,
      token: values.token,
      password: values.password
    };
    axios
      .post(
        "https://api.staging.hemma.sa/api/v1/auth/password/reset/phone/set_new",
        data
      )
      .then(response => {
        swal("تنبيه", "لقد تم تغيير كلمة المرور بنجاح", "error", {
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
            swal("عفواً", "يرجى التحقق من البيانات المدخلة", "error", {
              button: "متابعة"
            });
            break;
          case "VerificationTokenExpired":
            swal("عفواً", "حصل خطأ ما", "error", {
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
        <div className="row align-items-center h-100">
          <div className="col-md-6 col-12">
            <img
              src={
                process.env.PUBLIC_URL + "/assets/images/identity-artwork.png"
              }
              width="100%"
            />
          </div>
          <div className="col-md-6 col-12">
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
                name="password"
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
