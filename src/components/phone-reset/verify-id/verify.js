import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import swal from "@sweetalert/with-react";
import axios from "axios";
import { VerificationField } from "../../shared/inputs/verificationField";

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
  return errors;
};

class VerifyIdComponent extends Component {
  myFormHandler = values => {
    const { userInfo } = this.props.location;
    let data = {
      countryCode: userInfo.countryCode,
      phoneNumber: userInfo.phoneNumber,
      token: values.token
    };
    axios
      .post(
        "https://api.staging.hemma.sa/api/v1/auth/password/reset/phone/check_token",
        data
      )
      .then(response => {
        this.props.history.push({
          pathname: "/reset-password",
          userData: data
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
    const { userInfo } = this.props.location;
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="container pt-5 pb-5">
        <div
          className="row align-items-center justify-content-center"
          style={{ minHeight: 550 }}
        >
          <div className="col-md-6 col-12 order-md-1 order-2">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/verify-artwork.png"}
              height="350"
              className="artwork-img"
            />
          </div>
          <div className="col-md-6 col-12 order-md-2 order-1">
            <div className="text-center mb-3">
              <h6 className="light-text">التحقق من الهوية</h6>
              <h6 className="dark-text w-50 small mx-auto">
                أدخل رمز التحقق المكون من ستة خانات والمرسل على الرقم{" "}
                <span className="en-text">{userInfo.phoneNumber}</span>
              </h6>
            </div>

            <form
              className="centered"
              onSubmit={handleSubmit(this.myFormHandler)}
            >
              <div className="mb-3">
                <Field name="token" component={VerificationField} />
              </div>

              <button type="submit" className="btn dark-outline-btn w-100">
                تحقق من الرمز{" "}
              </button>
            </form>

            <div className="text-center pt-4">
              <a href="" className="dark-text small">
                لم يصلك رمز التحقق؟{" "}
              </a>
              <a href="" className="light-text small">
                إعادة إرسال
              </a>{" "}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.VerifyId && state.form.VerifyId.values
  };
}

VerifyIdComponent = reduxForm({
  form: "VerifyId",
  validate
})(VerifyIdComponent);

VerifyIdComponent = connect(mapStateToProps)(VerifyIdComponent);

export const VerifyId = VerifyIdComponent;
