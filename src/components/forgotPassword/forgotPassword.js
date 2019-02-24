import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { phoneField } from "../shared/inputs/phoneField";

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

function myFormHandler(props) {}

let forgotPasswordComponent = props => {
  const { handleSubmit, submitting } = props;
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
            <h6 className="light-text">نسيت كلمة المرور؟</h6>
            <h6 className="dark-text">ادخل رقم جوالك لارسال رمز التحقق </h6>
          </div>
          <form className="centered" onSubmit={handleSubmit(myFormHandler)}>
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

          <div className="text-center pt-4">
            <a href="" className="dark-text small">
              لم يصلك رمز التحقق؟{" "}
              <a href="" className="light-text">
                إعادة إرسال
              </a>{" "}
            </a>
          </div>
          <div className="text-center pt-1">
            <a href="" className="dark-text small light-text">
              استعادة كلمة المرور باستخدام البريد الإلكتروني
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

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

export const forgotPassword = forgotPasswordComponent;
