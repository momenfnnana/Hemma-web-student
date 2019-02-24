import React, { Component } from "react";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import swal from "@sweetalert/with-react";

import axios from "axios";

import { FaRegUser, FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = "يجب تعبئة هذه الخانة";
  }
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
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "يرجى إدخال البريد الإلكتروني بصيغة صحيحة";
  }

  return errors;
};

function myFormHandler(props) {
  let data = {
    countryCode: props.phone.countryCode,
    phoneNumber: props.phone.phoneNumber,
    email: props.email,
    password: props.password,
    name: props.username,
    gender: props.gender
  };
  axios
    .post("https://api.staging.hemma.sa/api/v1/auth/register", data)
    .then(function(response) {
      console.log("got response ", response);
    })
    .catch(function(error) {
      switch (error.response.data && error.response.data.error) {
        case "Duplicate":
          swal("عفواً", "هذا المستخدم مسجل سابقاً", "error", {
            button: "متابعة"
          });
          break;

        default:
          console.log("other error");
      }
    });
}

const renderField = props => {
  let inputClass = props.className;
  let wrapperClass = "input-group mb-3";
  if (props.meta.touched && props.meta.error) {
    wrapperClass += " input-error";
  } else if (props.meta.touched && props.meta.valid) {
    wrapperClass += " input-success";
  }
  return (
    <React.Fragment>
      <div className={wrapperClass}>
        <div className="input-group-prepend">
          <div className="input-group-text">{props.children}</div>
        </div>
        <input
          {...props.input}
          type={props.type}
          className={inputClass}
          placeholder={props.placeholder}
        />
        {props.meta.touched && props.meta.error && (
          <small className="w-100">{props.meta.error}</small>
        )}
      </div>
    </React.Fragment>
  );
};

const renderPhoneField = props => {
  let inputClass = props.inputClassName;
  let containerClass = props.containerClassName;
  let countryCode = props.defaultCountry;
  let inputName = props.fieldName;
  let wrapperClass = "input-group mb-3";
  if (props.meta.touched && props.meta.error) {
    wrapperClass += " input-error";
  } else if (props.meta.touched && props.meta.valid) {
    wrapperClass += " input-success";
  }

  const handleBlur = (valid, value, country) => {
    props.input.onBlur({
      phoneNumber: value,
      countryCode: country.iso2
    });
  };

  const handleChange = (valid, value, country) => {
    props.input.onChange({
      phoneNumber: value,
      countryCode: country.iso2
    });
  };

  return (
    <React.Fragment>
      <div className={wrapperClass}>
        <IntlTelInput
          {...props.IntlTelInput}
          type={props.type}
          fieldName={inputName}
          containerClassName={containerClass}
          inputClassName={inputClass}
          defaultCountry={countryCode}
          onPhoneNumberBlur={handleBlur}
          onPhoneNumberChange={handleChange}
        />
        {props.meta.touched && props.meta.error && (
          <small className="w-100">{props.meta.error}</small>
        )}
      </div>
    </React.Fragment>
  );
};

let RegisterComponent = props => {
  const { handleSubmit, submitting } = props;
  return (
    <form className="centered" onSubmit={handleSubmit(myFormHandler)}>
      <Field
        name="username"
        type="text"
        component={renderField}
        className="form-control border-left-0 pl-0"
        placeholder="الاسم الكامل"
      >
        <FaRegUser />
      </Field>

      <label className="pr-2 dark-silver-text">أنا: </label>
      <div className="form-check form-check-inline mb-3">
        <Field
          className="form-check-input"
          type="radio"
          name="gender"
          value="0"
          component="input"
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
          value="1"
          component="input"
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

      <Field
        fieldName="phone"
        name="phone"
        component={renderPhoneField}
        containerClassName="intl-tel-input"
        inputClassName="form-control"
        defaultCountry="sa"
      />

      <Field
        name="password"
        type="password"
        component={renderField}
        className="form-control border-left-0 pl-0 ltr-input"
        placeholder="كلمة المرور"
      >
        <MdLockOutline />
      </Field>

      <Field
        name="confirmPassword"
        type="password"
        component={renderField}
        className="form-control border-left-0 pl-0 ltr-input"
        placeholder="تأكيد كلمة المرور"
      >
        <MdLockOutline />
      </Field>

      <Field
        name="email"
        type="email"
        component={renderField}
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
        تسجيل
      </button>
    </form>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.Register && state.form.Register.values
  };
}

RegisterComponent = reduxForm({
  form: "Register",
  validate
})(RegisterComponent);

RegisterComponent = connect(mapStateToProps)(RegisterComponent);

export const Register = RegisterComponent;
