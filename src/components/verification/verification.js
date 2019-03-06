import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import swal from "@sweetalert/with-react";
import axios from "axios";
import { VerificationField } from "../shared/inputs/verificationField";

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

class VerificationComponent extends Component {
  myFormHandler = values => {
    let token = localStorage.getItem("token");
    let data = {
      token: values.token
    };
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .post("https://api.staging.hemma.sa/api/v1/auth/phone/verify", data, {
        headers
      })
      .then(response => {
        localStorage.setItem("verifiedToken", response.data.data.token);
      })
      .catch(error => {
        console.log(error);
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
              <h6 className="light-text">تأكيد حسابك</h6>
              <h6 className="dark-text">
                أدخل رمز التحقق الذي أرسلناه إلى جوالك
              </h6>
            </div>

            <form
              className="centered"
              onSubmit={handleSubmit(this.myFormHandler)}
            >
              <div className="mb-3">
                <Field name="token" component={VerificationField} />
              </div>

              <button type="submit" className="btn dark-outline-btn w-50">
                تحقق من الرمز{" "}
              </button>
            </form>

            <div className="text-center pt-4">
              <a href="" className="dark-text small">
                لم يصلك رمز التحقق؟{" "}
              </a>
              <a href="" className="light-text">
                إعادة إرسال
              </a>{" "}
            </div>
            <div className="text-center pt-1">
              <a href="" className="dark-text small light-text">
                تخطى تأكيد الحساب{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.Verification && state.form.Verification.values
  };
}

VerificationComponent = reduxForm({
  form: "Verification",
  validate
})(VerificationComponent);

VerificationComponent = connect(mapStateToProps)(VerificationComponent);

export const Verification = VerificationComponent;
