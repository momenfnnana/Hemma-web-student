import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { inputField } from "../../shared/inputs/inputField";
import swal from "@sweetalert/with-react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { FaRegEnvelope } from "react-icons/fa";
import { apiBaseUrl } from "../../../api/helpers";

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
      email: values.email
    };
    axios
      .post(
        `${apiBaseUrl}/auth/password/reset/email/send_token`,
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
        <div className="row align-items-center h-100">
          <div className="col-md-6 col-12">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/verify-artwork.png"}
              width="100%"
            />
          </div>
          <div className="col-md-6 col-12">
            <div className="text-center mb-3">
              <h6 className="light-text small">نسيت كلمة المرور؟</h6>
              <h6 className="dark-text small">
                ادخل بريدك الإلكتروني لإرسال رمز التحقق
              </h6>
            </div>
            <form
              className="centered"
              onSubmit={handleSubmit(this.myFormHandler)}
            >
              <Field
                name="email"
                type="email"
                component={inputField}
                className="form-control border-left-0 pl-0 ltr-input"
                placeholder="البريد الإلكتروني"
              >
                <FaRegEnvelope />
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
    formValues: state.form.forgotPassword && state.form.forgotPassword.values
  };
}

forgotPasswordComponent = reduxForm({
  form: "forgotPassword",
  validate
})(forgotPasswordComponent);

forgotPasswordComponent = connect(mapStateToProps)(forgotPasswordComponent);

export const forgotPassword = withRouter(forgotPasswordComponent);
