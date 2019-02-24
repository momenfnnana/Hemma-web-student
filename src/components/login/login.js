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

function myFormHandler(props) {
  let data = {
    countryCode: props.phone.countryCode,
    phoneNumber: props.phone.phoneNumber,
    password: props.password
  };
  axios
    .post("https://api.staging.hemma.sa/api/v1/auth/login_with_phone", data)
    .then(function(response) {
      console.log("got response ", response);
    })
    .catch(function(error) {
      switch (error.response.data && error.response.data.error) {
        case "InvalidCredentials":
          swal("عفواً", "يرجى التحقق من البيانات المدخلة", "error", {
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

let LoginComponent = props => {
  const { handleSubmit, submitting } = props;
  return (
    <form className="centered" onSubmit={handleSubmit(myFormHandler)}>
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

function mapStateToProps(state) {
  return {
    formValues: state.form.Login && state.form.Login.values
  };
}

LoginComponent = reduxForm({
  form: "Login",
  validate
})(LoginComponent);

LoginComponent = connect(mapStateToProps)(LoginComponent);

export const Login = LoginComponent;
