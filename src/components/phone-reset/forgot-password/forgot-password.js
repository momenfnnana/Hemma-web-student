import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { phoneField } from "../../shared/inputs/phoneField";
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

class forgotPasswordComponent extends Component {
  myFormHandler = values => {
    let data = {
      countryCode: values.phone.countryCode,
      phoneNumber: values.phone.phoneNumber
    };
    axios
      .post(
        "https://api.staging.hemma.sa/api/v1/auth/password/reset/phone/send_token",
        data
      )
      .then(response => {
        this.props.history.push({
          pathname: "/verify/identity",
          userInfo: data
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
          case "TooManyFailedAttempts":
            swal(
              "عفواً",
              "لقد استنفذت عدد المرات الممكن استعادة حسابك بها ",
              "error",
              {
                button: "متابعة"
              }
            );
            break;
          case "TokenIssuanceInRefractoryPeriod":
            swal("عفواً", "يرجى التحقق من البيانات المدخلة", "error", {
              button: "متابعة"
            });
            break;
          case "FailedToSend":
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
        <div
          className="row align-items-center justify-content-center"
          style={{ height: 550 }}
        >
          <div className="col-md-6 col-12">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/forgot-artwork.png"}
              height="350"
            />
          </div>
          <div className="col-md-6 col-12">
            <div className="text-center mb-3">
              <h6 className="light-text small">نسيت كلمة المرور؟</h6>
              <h6 className="dark-text small">
                ادخل رقم جوالك لارسال رمز التحقق{" "}
              </h6>
            </div>
            <form
              className="centered"
              onSubmit={handleSubmit(this.myFormHandler)}
            >
              <Field
                fieldName="phone"
                name="phone"
                component={phoneField}
                containerClassName="intl-tel-input"
                inputClassName="form-control"
                defaultCountry="sa"
              />

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
    formValues: state.form.forgotPassword && state.form.forgotPassword.values
  };
}

forgotPasswordComponent = reduxForm({
  form: "forgotPassword",
  validate
})(forgotPasswordComponent);

forgotPasswordComponent = connect(mapStateToProps)(forgotPasswordComponent);

export const forgotPassword = withRouter(forgotPasswordComponent);
