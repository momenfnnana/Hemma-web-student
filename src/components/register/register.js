import React, { Component } from "react";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { Field, reduxForm } from "redux-form";
import { required } from "../../validators";

import { FaRegUser, FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = "هذه الخانة لا يمكن أن تكون فارغة";
  } else if (values.username.length > 15) {
    errors.username = "Must be 15 characters or less";
  }
  return errors;
};

function myFormHandler() {
  console.log("hi");
}

const renderField = props => {
  let inputClass = props.className;
  if (props.meta.touched && props.meta.error) {
    inputClass += " input-error";
  }
  return (
    <React.Fragment>
      <input
        {...props.input}
        type={props.type}
        className={inputClass}
        placeholder={props.placeholder}
      />
      {props.meta.touched && props.meta.error && (
        <small className="w-100">{props.meta.error}</small>
      )}
    </React.Fragment>
  );
};

const RegisterComponent = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  console.log(props);

  return (
    <form className="centered" onSubmit={handleSubmit(myFormHandler)}>
      <div className="input-group mb-3 input-error">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <FaRegUser />
          </div>
        </div>
        <Field
          name="username"
          type="text"
          component={renderField}
          className="form-control border-left-0 pl-0"
          placeholder="الاسم الكامل"
        />
        {/* <small className="w-100">الاسم الكامل يجب ألا يحتوي رموز خاصة</small> */}
      </div>

      <label className="pr-2 dark-silver-text">أنا: </label>

      <div className="custom-control custom-radio custom-control-inline mb-3">
        <Field
          name="gender"
          value="male"
          type="radio"
          component="input"
          className="custom-control-input"
        />
        <label className="custom-control-label dark-text small d-flex align-items-center">
          <FaRegUser className="mr-1" />
          ذكر
        </label>
      </div>
      <div className="custom-control custom-radio custom-control-inline mb-3">
        <Field
          name="gender"
          value="female"
          type="radio"
          component="input"
          className="custom-control-input"
        />
        <label className="custom-control-label dark-text small d-flex align-items-center">
          <FaRegUser className="mr-1" />
          أنثى
        </label>
      </div>

      <div className="input-group mb-3">
        <IntlTelInput
          containerClassName="intl-tel-input"
          inputClassName="form-control"
          defaultCountry="sa"
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <MdLockOutline />
          </div>
        </div>
        <Field
          name="password"
          type="password"
          component="input"
          className="form-control border-left-0 pl-0 ltr-input"
          placeholder="كلمة المرور"
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <MdLockOutline />
          </div>
        </div>
        <Field
          name="confirmPassword"
          type="password"
          component="input"
          className="form-control border-left-0 pl-0 ltr-input"
          placeholder="تأكيد كلمة المرور"
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <FaRegEnvelope />
          </div>
        </div>
        <Field
          name="email"
          type="email"
          component="input"
          className="form-control border-left-0 pl-0 ltr-input"
          placeholder="البريد الإلكتروني"
        />
      </div>
      <button
        type="submit"
        className="btn dark-outline-btn w-100"
        disabled={submitting}
      >
        تسجيل الدخول
      </button>
    </form>
  );
};

export const Register = reduxForm({
  form: "Register",
  validate
})(RegisterComponent);
