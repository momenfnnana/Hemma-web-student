import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import swal from "@sweetalert/with-react";
import axios from "axios";
import { MdLockOutline } from "react-icons/md";
import { inputField } from "../shared/inputs/inputField";
import { phoneField } from "../shared/inputs/phoneField";
import jwt from "jsonwebtoken";
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

class LoginComponent extends Component {
  myFormHandler = values => {
    let data = {
      countryCode: values.phone.countryCode,
      phoneNumber: values.phone.phoneNumber,
      password: values.password
    };
    axios
      .post("https://api.staging.hemma.sa/api/v1/auth/login_with_phone", data)
      .then(response => {
        localStorage.setItem("token", response.data.data.token);
      })
      .then(res => {
        let token = localStorage.getItem("token");
        let jwtToken = jwt.decode(token);
        localStorage.setItem("jwtToken", jwtToken);
        if (jwtToken.phoneConfirmed == "False") {
          let headers = {
            Authorization: `Bearer ${token}`
          };
          axios
            .post(
              "https://api.staging.hemma.sa/api/v1/auth/phone/send_token",
              null,
              { headers }
            )
            .then(response => {
              this.props.history.push("/verify");
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.props.history.push("/");
        }
      })
      .catch(error => {
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
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form className="centered" onSubmit={handleSubmit(this.myFormHandler)}>
        <Field
          fieldName="phone"
          name="phone"
          component={phoneField}
          containerClassName="intl-tel-input"
          inputClassName="form-control"
          defaultCountry="sa"
        />

        <Field
          name="password"
          type="password"
          component={inputField}
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
  }
}

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

export const Login = withRouter(LoginComponent);
